/**
 * Documento base.
 *  · layout()      — site: header, menu, footer, GSAP + main.js
 *  · bareLayout()  — micro-experiências (ex.: /bio/): sem cromo do site,
 *                    CSS do bundle embutido inline, um único módulo JS.
 */
import { html, raw, attrs, text } from '../../tools/lib/html.mjs';
import { site, bookingHref } from '../content/site.mjs';
import { wordmark, wordmarkSprite } from './wordmark.mjs';
import { cta, icon, contactLink } from './ui.mjs';

const v = () => globalThis.__BUILD__?.version ?? '0';

/* Detecta JS, preferência de movimento e condição de palco ANTES da pintura
 * (html.stage — evita troca de layout após o carregamento, CLS). Estados iniciais
 * de reveal só existem sob html.motion. Se os scripts não confirmarem em
 * 4 s (falha de rede, erro), a classe é removida e tudo fica visível. */
const STAGE_QUERY = '(min-width: 1024px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)';
const bootScript = `(function(d){var h=d.documentElement;h.classList.replace('no-js','js');try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){h.classList.add('motion');setTimeout(function(){if(!window.__motionReady)h.classList.remove('motion')},4000)}var m=matchMedia('${STAGE_QUERY}'),f=function(){h.classList.toggle('stage',m.matches)};f();m.addEventListener&&m.addEventListener('change',f)}catch(e){}})(document)`;

/**
 * @param {{ title: string, description: string, path: string, bundle?: string, inline?: boolean, preloads?: any }} p
 */
const head = ({ title, description, path, bundle = 'main', inline = false, preloads = '' }) => html`<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${site.url}${path}">
<meta name="theme-color" content="#163447">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${site.url}${path}">
<link rel="icon" href="/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/newsreader-latin-500-opsz.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
${preloads}
<script>${raw(bootScript)}</script>
${inline
  ? html`<style>${raw(globalThis.__BUILD__?.css?.[bundle] ?? '')}</style>`
  : html`<link rel="stylesheet" href="/assets/css/${bundle}.css?v=${v()}">`}
</head>`;

const header = ({ tone }) => html`<header class="hd" data-tone="${tone}" data-hd>
  <div class="hd__bar">
    <a class="hd__brand" href="/" aria-label="Dr. Vinicius Marques Rodrigues — página inicial">${wordmark({ layout: 'stack', cls: 'hd__wm' })}</a>
    <p class="hd__chapter" aria-hidden="true"><span class="hd__chapter-line"></span><span class="hd__chapter-text" data-chapter-text></span></p>
    <nav class="hd__nav" aria-label="Principal">
      <ul>
        ${site.nav.map((n) => html`<li><a href="${n.href}" data-nav="${n.chapter}"><span>${n.label}</span></a></li>`)}
      </ul>
    </nav>
    ${cta({ href: bookingHref(), text: site.booking.label, variant: 'ghost', cls: 'hd__cta', magnetic: false })}
    <button class="hd__menu" type="button" aria-expanded="false" aria-controls="menu" data-menu-toggle>
      <span class="hd__menu-label" data-menu-label>Menu</span>
      <span class="hd__menu-icon" aria-hidden="true"><i></i><i></i></span>
    </button>
  </div>
</header>`;

const menu = () => html`<div class="menu" id="menu" data-menu hidden>
  <div class="menu__inner">
    <nav class="menu__nav" aria-label="Menu">
      <ol>
        ${site.nav.map((n, i) => html`<li style="--i:${i}"><a href="${n.href}" data-menu-link><span class="menu__link-text">${n.label}</span>${icon.arrow()}</a></li>`)}
      </ol>
    </nav>
    <div class="menu__foot">
      ${cta({ href: bookingHref(), text: site.booking.label, variant: 'light', magnetic: false, attrs: { 'data-menu-link': '' } })}
      <p class="menu__contact">${contactLink(site.contact.whatsapp)}<span aria-hidden="true"> · </span>${contactLink(site.contact.phone)}</p>
    </div>
  </div>
</div>`;

export const registryLine = () =>
  html`<span class="registry"><span class="registry__item">${site.registry.crm}</span>${site.registry.rqe.map((r) => html`<span class="registry__sep" aria-hidden="true"> · </span><span class="registry__item">${r.number} <span class="registry__spec">${r.specialty}</span></span>`)}</span>`;

const footer = () => html`<footer class="ft" data-header-tone="light">
  <div class="ft__rule">
    <span class="oline oline--x ft__line" data-line="draw" aria-hidden="true"></span>
    <a class="ft__top" href="#top" data-top><span>Voltar ao início</span>${icon.arrowUp()}</a>
  </div>
  <div class="ft__grid">
    <a class="ft__brand" href="/" aria-label="Dr. Vinicius Marques Rodrigues — página inicial">${wordmark({ layout: 'stack', cls: 'ft__wm' })}</a>
    <nav class="ft__nav" aria-label="Rodapé">
      <ul>${site.footerNav.map((n) => html`<li><a href="${n.href}">${n.label}</a></li>`)}</ul>
    </nav>
    <div class="ft__meta">
      <p>${registryLine()}</p>
    </div>
    ${site.contact.instagram.href
      ? html`<a class="ft__social" href="${site.contact.instagram.href}" target="_blank" rel="noopener" aria-label="Instagram de ${site.name}">${icon.instagram()}<span class="sr-only"> (abre em nova aba)</span></a>`
      : ''}
    <div class="ft__legal">
      <p>© ${new Date().getFullYear()} ${site.name}</p>
      <a href="/privacidade/">Política de Privacidade</a>
    </div>
  </div>
</footer>`;

/**
 * @param {{ title: string, description?: string, path: string, tone?: 'dark'|'light', page?: string, body: any }} p
 */
export const layout = ({ title, description = site.description, path, tone = 'light', page = 'page', body }) => html`<html lang="${site.lang}" class="no-js" data-page="${page}">
${head({ title: text(title), description, path })}
<body>
${wordmarkSprite()}
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<span id="top" tabindex="-1"></span>
${header({ tone })}
${menu()}
<main id="conteudo" tabindex="-1">
${body}
</main>
${footer()}
<script src="/assets/vendor/gsap.min.js?v=${v()}" defer></script>
<script src="/assets/vendor/ScrollTrigger.min.js?v=${v()}" defer></script>
<script src="/assets/vendor/CustomEase.min.js?v=${v()}" defer></script>
<script src="/assets/vendor/lenis.min.js?v=${v()}" defer></script>
<script type="module" src="/assets/js/main.js?v=${v()}"></script>
</body>
</html>`;

/**
 * Micro-experiência: documento mínimo para chegada via redes sociais.
 * CSS crítico inteiro inline (1 requisição a menos no caminho do LCP),
 * nenhuma biblioteca de animação — só o módulo da página.
 * @param {{ title: string, description?: string, path: string, page: string, bundle: string, script: string, preloads?: any, body: any }} p
 */
export const bareLayout = ({ title, description = site.description, path, page, bundle, script, preloads = '', body }) => html`<html lang="${site.lang}" class="no-js" data-page="${page}">
${head({ title: text(title), description, path, bundle, inline: true, preloads })}
<body>
${wordmarkSprite()}
${body}
<script type="module" src="/assets/js/${script}?v=${v()}"></script>
</body>
</html>`;
