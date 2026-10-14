/**
 * Mídia responsiva a partir do manifesto (content/media.mjs).
 *
 *  ready: true  → <picture> AVIF + JPG com srcset/sizes e dimensões (sem CLS)
 *                 ou <video> com fontes desktop/mobile + poster
 *  ready: false → "cena" tonal: placeholder com direção de arte + briefing
 *
 * Notas de briefing sobre os placeholders podem ser ocultadas com
 * HIDE_MEDIA_NOTES=1 no build (ex.: para apresentar ao cliente).
 */
import { html, attrs } from '../../tools/lib/html.mjs';
import { media as manifest } from '../content/media.mjs';

const SHOW_NOTES = !process.env.HIDE_MEDIA_NOTES;
const base = (m) => `/media/${m.file}`;
/* Cache-busting: sem isso, trocar o conteúdo de um arquivo mantendo o
   mesmo nome (comum — ver histórico de correções de imagem) deixa quem
   já visitou o site preso numa cópia antiga em cache (navegador/CDN),
   igual ao bug que já existiu com os módulos JS internos (ver
   tools/build.mjs → copyScripts). No vídeo a versão vai em `data-v`,
   porque video.js concatena a extensão depois do nome. */
const v = () => globalThis.__BUILD__?.version ?? '0';

/* Vídeo com recorte vertical próprio: escolhido pela ORIENTAÇÃO da tela,
   não pela largura — o vídeo cobre a tela inteira (object-fit: cover), e
   um 16:9 num tablet em pé (768×1024) mostraria só ~42% da largura.
   A mesma query decide o pôster (<source media>) e a fonte (video.js lê
   `data-mobile-query`), senão a troca pôster→vídeo mudaria de quadro. */
const VIDEO_MOBILE_QUERY = '(max-aspect-ratio: 1/1)';
/** "1920x1080@30" — video.js pergunta ao navegador se essa variante roda
 * lisa neste aparelho antes de escolher entre a versão cheia e a leve. */
const dims = (mm) => `${mm.width}x${mm.height}@${mm.fps || 30}`;

/** Direção de arte: quando `m.mobile` existe, é um recorte diferente do
 * desktop (não o mesmo crop redimensionado) — troca por <source media>,
 * sem custo de CLS (o container já reserva o espaço; object-fit: cover
 * não depende das dimensões intrínsecas da fonte escolhida). */
function picture(m, { sizes = '100vw', priority = false, decorative = false }) {
  const ws = m.widths || [1200];
  const set = (mm, ext) => (mm.widths || ws).map((w) => `${base(mm)}-${w}.${ext}?v=${v()} ${w}w`).join(', ');
  const bp = m.mobile?.breakpoint ?? 767;
  return html`<picture class="media__pic">
    ${m.mobile
      ? html`<source media="(max-width: ${bp}px)" type="image/avif" srcset="${set(m.mobile, 'avif')}" sizes="100vw">
    <source media="(max-width: ${bp}px)" srcset="${set(m.mobile, 'jpg')}" sizes="100vw">`
      : ''}
    <source type="image/avif" srcset="${set(m, 'avif')}" sizes="${sizes}">
    <img${attrs({
      src: `${base(m)}-${ws[ws.length - 1]}.jpg?v=${v()}`,
      srcset: set(m, 'jpg'),
      sizes,
      width: m.width,
      height: m.height,
      alt: decorative ? '' : m.alt,
      loading: priority ? 'eager' : 'lazy',
      fetchpriority: priority ? 'high' : null,
      decoding: 'async',
    })}>
  </picture>`;
}

/**
 * Vídeo = pôster responsivo (<picture>, é ele que pinta primeiro e conta
 * como LCP) + <video> sem fonte. ui/video.js decide se e quando carregar
 * (viewport, movimento reduzido, economia de dados, rede lenta) e só
 * revela o vídeo por cima do pôster quando ele de fato está tocando.
 */
function video(m, { sizes = '100vw', priority = false } = {}) {
  const pw = m.posterWidths || [720, 1080];
  const set = (mm, ext) =>
    (mm.posterWidths || pw).map((w) => `${base(mm)}-poster-${w}.${ext}?v=${v()} ${w}w`).join(', ');
  const mob = m.mobile;
  return html`<picture class="media__pic media__poster">
    ${mob
      ? html`<source media="${VIDEO_MOBILE_QUERY}" type="image/avif" srcset="${set(mob, 'avif')}" sizes="100vw">
    <source media="${VIDEO_MOBILE_QUERY}" srcset="${set(mob, 'jpg')}" sizes="100vw">`
      : ''}
    <source type="image/avif" srcset="${set(m, 'avif')}" sizes="${sizes}">
    <img${attrs({
      src: `${base(m)}-poster-${pw[pw.length - 1]}.jpg?v=${v()}`,
      srcset: set(m, 'jpg'),
      sizes,
      width: m.width,
      height: m.height,
      alt: '',
      loading: priority ? 'eager' : 'lazy',
      fetchpriority: priority ? 'high' : null,
      decoding: 'async',
    })}>
  </picture>
  <video${attrs({
    class: 'media__video',
    muted: true,
    loop: true,
    playsinline: true,
    preload: 'none',
    'data-video': '',
    'data-src-desktop': base(m),
    'data-src-mobile': base(mob || m),
    'data-dims-desktop': dims(m),
    'data-dims-mobile': dims(mob || m),
    'data-mobile-query': mob ? VIDEO_MOBILE_QUERY : null,
    'data-v': v(),
    'aria-hidden': 'true',
  })}></video>`;
}

function scene(m, { decorative = false }) {
  const tag = m.kind === 'video' ? 'Vídeo' : 'Foto';
  decorative = decorative || !m.alt; // sem alt no manifesto = mídia decorativa
  return html`<div${attrs({
    class: `scene scene--${m.variant}`,
    role: decorative ? null : 'img',
    'aria-label': decorative ? null : m.alt,
    'aria-hidden': decorative ? 'true' : null,
    'data-placeholder-media': m.file,
  })}>
    <span class="scene__light" aria-hidden="true"></span>
    <span class="scene__grain" aria-hidden="true"></span>
    ${SHOW_NOTES && m.brief && !m.hideBrief ? html`<span class="scene__note" aria-hidden="true"><b>${tag}</b> ${m.brief}</span>` : ''}
  </div>`;
}

/**
 * @param {keyof typeof manifest} key
 * @param {{ sizes?: string, priority?: boolean, decorative?: boolean }} opts
 */
export function mediaFor(key, opts = {}) {
  const m = manifest[key];
  if (!m) throw new Error(`Mídia desconhecida: ${key}`);
  if (!m.ready) return scene(m, opts);
  return m.kind === 'video' ? video(m, opts) : picture(m, opts);
}

export const mediaMeta = (key) => manifest[key];
