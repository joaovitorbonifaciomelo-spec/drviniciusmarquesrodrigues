/**
 * Vídeo de presença (hero do site, abertura do /bio/).
 *  · o pôster (<picture>) pinta primeiro; o vídeo nunca disputa o LCP:
 *    com { defer: true } só começa a baixar depois do load, em tempo ocioso;
 *  · não carrega com movimento reduzido, economia de dados ou rede lenta
 *    (2G/3G) — a experiência continua completa com o pôster;
 *  · fonte por viewport (mobile/desktop), WebM + MP4;
 *  · só cobre o pôster quando está de fato tocando (.is-playing); erro → pôster;
 *  · toca apenas quando visível e quando nenhuma cena o suspendeu;
 *  · botão Pausar/Reproduzir (WCAG 2.2.2) — também controla a cena
 *    placeholder enquanto o vídeo final não existe.
 */
const html = document.documentElement;
const state = { userPaused: false, suspended: false, visible: true, video: null };

function sync() {
  const { video, userPaused, suspended, visible } = state;
  const shouldPlay = !userPaused && !suspended && visible;
  html.classList.toggle('video-paused', !shouldPlay);
  if (!video || !video.currentSrc) return;
  if (shouldPlay) video.play().catch(() => {});
  else video.pause();
}

/** Cenas podem suspender o vídeo quando ele sai de cena (ex.: crossfade). */
export function setVideoSuspended(v) {
  if (state.suspended === v) return;
  state.suspended = v;
  sync();
}

/** Rede/economia: vale a pena baixar vídeo? */
export function canStream() {
  const c = navigator.connection;
  if (!c) return true;
  return !c.saveData && !/(^|-)(2g|3g)$/.test(c.effectiveType || '');
}

function load(video) {
  const base = window.innerWidth >= 768 ? video.dataset.srcDesktop : video.dataset.srcMobile;
  for (const [ext, type] of [['webm', 'video/webm'], ['mp4', 'video/mp4']]) {
    const s = document.createElement('source');
    s.src = `${base}.${ext}`;
    s.type = type;
    video.appendChild(s);
  }
  video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
  video.addEventListener('error', () => video.remove(), { once: true, capture: true });
  video.preload = 'auto';
  video.load();
  video.addEventListener('canplay', sync, { once: true });
}

const whenIdle = (fn) => {
  const go = () => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200));
  if (document.readyState === 'complete') go();
  else window.addEventListener('load', go, { once: true });
};

export function initVideo({ defer = false } = {}) {
  const video = document.querySelector('[data-video]');
  const btn = document.querySelector('[data-video-toggle]');
  const label = document.querySelector('[data-video-toggle-label]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stream = canStream();
  // Sem download automático (movimento reduzido, Save-Data, rede lenta): o botão
  // oferece "Reproduzir" e o vídeo só é baixado se a pessoa pedir.
  state.userPaused = reduce || Boolean(video && !stream);
  state.video = video;

  if (video && !reduce && stream) {
    if (defer) whenIdle(() => load(video));
    else load(video);
  }

  const host = document.querySelector('[data-video-host]') || video || document.querySelector('.scene--hero');
  if (host && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      state.visible = e.isIntersecting;
      sync();
    }).observe(host);
  }

  if (btn) {
    const render = () => {
      btn.setAttribute('aria-pressed', String(state.userPaused));
      label.textContent = state.userPaused ? 'Reproduzir vídeo' : 'Pausar vídeo';
    };
    btn.addEventListener('click', () => {
      state.userPaused = !state.userPaused;
      // Movimento reduzido/rede lenta: o vídeo só é baixado se a pessoa pedir.
      if (!state.userPaused && video && !video.querySelector('source')) load(video);
      render();
      sync();
    });
    render();
  }
  sync();
}
