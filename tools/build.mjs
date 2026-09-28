/**
 * Build estático — Node puro, sem dependências.
 *
 *   node tools/build.mjs          → gera /dist
 *   node tools/build.mjs --dev    → idem, com live-reload injetado (usado por serve.mjs)
 *
 * Páginas: src/pages/*.mjs exportam `default () => [{ path, html }]`.
 * CSS:     cada src/styles/*.css é um bundle (main.css = site, bio.css = /bio/);
 *          @import locais concatenados. Bundles ficam também em __BUILD__.css
 *          para páginas que os embutem inline (CSS crítico).
 * JS:      módulos ES nativos copiados como estão (sem bundler).
 */
import { readdir, readFile, writeFile, mkdir, rm, cp, stat } from 'node:fs/promises';
import { dirname, join, resolve, relative, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');

const log = (...a) => console.log('\x1b[2m[build]\x1b[0m', ...a);

async function inlineCss(file, seen = new Set()) {
  if (seen.has(file)) return '';
  seen.add(file);
  const css = await readFile(file, 'utf8');
  const parts = [];
  for (const line of css.split(/\r?\n/)) {
    const m = line.match(/^\s*@import\s+["'](.+?)["'];?\s*$/);
    if (m) parts.push(await inlineCss(resolve(dirname(file), m[1]), seen));
    else parts.push(line);
  }
  return parts.join('\n');
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

export async function build({ dev = false } = {}) {
  const t0 = performance.now();
  const version = Date.now().toString(36);
  globalThis.__BUILD__ = { dev, version };

  // Retentativas: o Google Drive pode segurar arquivos por instantes (EBUSY)
  await rm(DIST, { recursive: true, force: true, maxRetries: 8, retryDelay: 200 });
  await mkdir(DIST, { recursive: true });

  // Módulos de conteúdo/templating são reimportados a cada build (watch).
  const bust = `?v=${version}`;
  const { placeholderRegistry } = await import(pathToFileURL(join(ROOT, 'tools/lib/html.mjs')).href);
  placeholderRegistry.clear();

  // 1. CSS (antes das páginas: algumas embutem o bundle inline)
  await mkdir(join(DIST, 'assets/css'), { recursive: true });
  globalThis.__BUILD__.css = {};
  let cssKb = [];
  for (const f of (await readdir(join(SRC, 'styles'))).filter((f) => f.endsWith('.css'))) {
    // bundle = arquivo de nível superior composto por @import (tokens.css, base.css… são parciais)
    if (!/^\s*@import/m.test(await readFile(join(SRC, 'styles', f), 'utf8'))) continue;
    const css = await inlineCss(join(SRC, 'styles', f));
    globalThis.__BUILD__.css[f.replace(/\.css$/, '')] = css;
    await writeFile(join(DIST, 'assets/css', f), css);
    cssKb.push(`${f} ${(css.length / 1024).toFixed(1)} kB`);
  }

  // 2. Páginas
  const pageFiles = (await readdir(join(SRC, 'pages'))).filter((f) => f.endsWith('.mjs'));
  let count = 0;
  for (const f of pageFiles) {
    const mod = await import(pathToFileURL(join(SRC, 'pages', f)).href + bust);
    for (const page of await mod.default()) {
      const target =
        page.path === '/404'
          ? join(DIST, '404.html')
          : join(DIST, ...page.path.split('/').filter(Boolean), 'index.html');
      await mkdir(dirname(target), { recursive: true });
      let out = '<!doctype html>\n' + String(page.html);
      if (dev) out = out.replace('</body>', `<script>new EventSource('/__reload').onmessage=()=>location.reload()</script></body>`);
      await writeFile(target, out);
      count++;
    }
  }

  // 3. JS + vendor + public
  await cp(join(SRC, 'scripts'), join(DIST, 'assets/js'), { recursive: true });
  await cp(join(SRC, 'vendor'), join(DIST, 'assets/vendor'), { recursive: true });
  await cp(join(ROOT, 'public'), DIST, { recursive: true });

  const ms = Math.round(performance.now() - t0);
  log(`${count} páginas · CSS: ${cssKb.join(', ')} · ${ms} ms`);
  if (placeholderRegistry.size) {
    log(`\x1b[33m${placeholderRegistry.size} placeholders de conteúdo a substituir:\x1b[0m`);
    for (const p of [...placeholderRegistry].sort()) console.log('         · ' + p);
  }
  return { version };
}

/** Assinatura simples do estado dos arquivos (para watch por polling —
 *  fs.watch não é confiável no drive virtual do Google Drive). */
export async function snapshot() {
  const files = [...(await walk(SRC)), ...(await walk(join(ROOT, 'public'))), ...(await walk(join(ROOT, 'tools')))];
  const stats = await Promise.all(files.map((f) => stat(f).then((s) => `${relative(ROOT, f).split(sep).join('/')}:${s.mtimeMs}:${s.size}`)));
  return stats.join('|');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  build({ dev: process.argv.includes('--dev') }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
