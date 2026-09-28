/**
 * Servidor local.
 *
 *   node tools/serve.mjs          → dev: build + watch (polling) + live-reload
 *   node tools/serve.mjs --static → apenas serve /dist (preview de produção)
 *
 * Porta: PORT (padrão 4321).
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { snapshot } from './build.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PORT = Number(process.env.PORT || 4321);
const STATIC = process.argv.includes('--static');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
};

const clients = new Set();

const runBuild = () =>
  new Promise((ok) => {
    const args = ['tools/build.mjs'];
    if (!STATIC) args.push('--dev');
    const child = spawn(process.execPath, args, { cwd: ROOT, stdio: 'inherit' });
    child.on('exit', (code) => ok(code === 0));
  });

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^([/\\])+/, '');
  let file = join(DIST, clean);
  if (!file.startsWith(DIST)) return null;
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = join(file, 'index.html');
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  if (req.url === '/__reload') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write(': ok\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    // Sem isto, um RST abrupto (ex.: browser de teste fechado no meio de
    // uma conexão SSE) emite 'error' sem listener e derruba o processo inteiro.
    res.on('error', () => clients.delete(res));
    return;
  }
  const file = await resolveFile(req.url);
  if (!file) {
    const nf = await readFile(join(DIST, '404.html')).catch(() => 'Not found');
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    return res.end(nf);
  }
  const body = await readFile(file);
  const type = TYPES[extname(file).toLowerCase()] || 'application/octet-stream';

  // Suporte a Range (necessário para <video> em Safari)
  const range = req.headers.range;
  if (range && type.startsWith('video/')) {
    const [s, e] = range.replace('bytes=', '').split('-');
    const start = Number(s);
    const end = e ? Number(e) : body.length - 1;
    res.writeHead(206, {
      'Content-Type': type,
      'Content-Range': `bytes ${start}-${end}/${body.length}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
    });
    return res.end(body.subarray(start, end + 1));
  }
  res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
  res.end(body);
});

await runBuild();
server.listen(PORT, () => console.log(`\n  → http://localhost:${PORT}\n`));

if (!STATIC) {
  let last = await snapshot();
  let busy = false;
  setInterval(async () => {
    if (busy) return;
    const now = await snapshot().catch(() => last);
    if (now === last) return;
    busy = true;
    last = now;
    const ok = await runBuild();
    if (ok)
      for (const c of clients) {
        try {
          c.write('data: reload\n\n');
        } catch {
          clients.delete(c);
        }
      }
    last = await snapshot().catch(() => last);
    busy = false;
  }, 900);
}
