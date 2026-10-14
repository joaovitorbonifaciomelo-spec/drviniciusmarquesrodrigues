/**
 * Vídeo de presença (hero do site, abertura do /bio/).
 *  · o pôster (<picture>) pinta primeiro; o vídeo nunca disputa o LCP:
 *    com { defer: true } só começa a baixar depois do load, em tempo ocioso;
 *  · não carrega com movimento reduzido, economia de dados ou rede lenta
 *    (2G/3G) — a experiência continua completa com o pôster;
 *  · fonte por orientação da tela (vertical/horizontal), WebM VP9 + MP4 H.264;
 *  · versão cheia ou leve conforme o aparelho dá conta (ver "qualidade");
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

/* ------------------------------------------------------------ qualidade
 * Versão cheia (resolução/fps do original, WebM VP9 + MP4 H.264) ou leve
 * (<base>-lite.mp4: 720p, 30 fps, H.264 — decodificada por hardware em
 * praticamente qualquer PC). A cheia num PC antigo trava: VP9 1080p sem
 * aceleração por hardware cai inteiro no processador.
 *  1. antes de baixar: o navegador diz, por formato, se aquela variante
 *     roda lisa e com aceleração (Media Capabilities); a cheia só entra
 *     com um formato que este aparelho dá conta — e o acelerado vem
 *     primeiro (PC antigo sem VP9 por hardware, mas com H.264: MP4 cheio);
 *  2. tocando: se a cheia perder quadros (>15%) ou travar na rede, troca
 *     pela leve, recomeçando do quadro 0 (= pôster, a troca não salta);
 *  3. a decisão por perda de quadros fica lembrada neste aparelho; a por
 *     rede, só nesta sessão (a rede muda, o hardware não). */
/* `type` com codecs: um navegador que aceita o contêiner mas não o codec
   descarta a fonte sem baixar nada. `probe` = string completa exigida
   pela Media Capabilities. */
const FULL = [
  { ext: 'webm', type: 'video/webm; codecs="vp9"', probe: 'video/webm; codecs="vp09.00.41.08"' },
  { ext: 'mp4', type: 'video/mp4; codecs="avc1.64002A"', probe: 'video/mp4; codecs="avc1.64002A"' }, // High@4.2 (1080p60)
];
const LITE = [{ ext: 'mp4', suffix: '-lite', type: 'video/mp4; codecs="avc1.64001F"' }]; // High@3.1 (720p30)
const TIER_KEY = 'dv-video-tier';

function remembered() {
  try {
    return localStorage.getItem(TIER_KEY) || sessionStorage.getItem(TIER_KEY);
  } catch {
    return null;
  }
}
function remember(persist) {
  try {
    (persist ? localStorage : sessionStorage).setItem(TIER_KEY, 'lite');
  } catch {}
}

async function pickFormats(dims) {
  if (remembered() === 'lite') return LITE;
  const [, w, h, fps] = /^(\d+)x(\d+)@(\d+)$/.exec(dims || '') || [];
  const cores = navigator.hardwareConcurrency || 0;
  const mc = navigator.mediaCapabilities;
  // Sem a API (navegador antigo): 4 núcleos ou menos ≈ PC fraco.
  if (!mc || !mc.decodingInfo || !w) return cores && cores <= 4 ? LITE : FULL;
  const rated = await Promise.all(
    FULL.map((f) =>
      mc
        .decodingInfo({ type: 'file', video: { contentType: f.probe, width: +w, height: +h, framerate: +fps, bitrate: 8e6 } })
        .then((r) => ({ f, r }), () => ({ f, r: null }))
    )
  );
  // Sem aceleração por hardware, só um processador folgado (8+ núcleos)
  // segura a versão cheia.
  const ok = rated.filter(({ r }) => r && r.supported && r.smooth && (r.powerEfficient || cores >= 8));
  if (!ok.length) return LITE;
  ok.sort((a, b) => Number(b.r.powerEfficient) - Number(a.r.powerEfficient));
  return ok.map(({ f }) => f);
}

/** Sinais de que a versão cheia não está dando conta (só observados nela). */
function watch(video, toLite, alive) {
  // Rede: 9 s depois de pedir, ainda sem dados para tocar.
  setTimeout(() => {
    if (alive() && video.isConnected && video.readyState < 3) toLite(false);
  }, 9000);
  // Rede: travou para carregar duas vezes depois de já ter começado.
  let started = false;
  let stalls = 0;
  video.addEventListener('playing', () => (started = true));
  video.addEventListener('waiting', () => {
    if (alive() && started && ++stalls >= 2) toLite(false);
  });
  // Aparelho: perdendo quadros (a decodificação não acompanha).
  if (!video.getVideoPlaybackQuality) return;
  let calm = 0;
  const id = setInterval(() => {
    if (!alive() || !video.isConnected) return clearInterval(id);
    if (video.paused || video.readyState < 3) return;
    const q = video.getVideoPlaybackQuality();
    if (q.totalVideoFrames < 120) return;
    if (q.droppedVideoFrames > q.totalVideoFrames * 0.15) {
      clearInterval(id);
      toLite(true);
    } else if (++calm >= 8) clearInterval(id); // ~8 s tocando liso: confia
  }, 1000);
}

let generation = 0;

function attach(video, base, v, formats) {
  const gen = ++generation;
  const alive = () => gen === generation;
  const lite = formats === LITE;
  video.dataset.tier = lite ? 'lite' : 'full';
  video.classList.remove('is-playing'); // numa troca, volta ao pôster até a leve tocar
  video.querySelectorAll('source').forEach((s) => s.remove());
  const sources = formats.map((f) => {
    const s = document.createElement('source');
    s.src = `${base}${f.suffix || ''}.${f.ext}${v ? `?v=${v}` : ''}`;
    s.type = f.type;
    return video.appendChild(s);
  });
  const toLite = (persist) => {
    if (!alive() || lite) return;
    remember(persist);
    attach(video, base, v, LITE);
  };
  // Uma fonte que falha (formato recusado, 404) só passa a vez à próxima.
  // Se a última da versão cheia falhar, tenta a leve; se a leve falhar, o
  // vídeo sai de cena e o pôster fica.
  const fail = () => {
    if (!alive()) return;
    if (!lite) return toLite(false);
    video.remove();
    if (state.video === video) state.video = null;
  };
  sources[sources.length - 1].addEventListener('error', fail, { once: true });
  video.addEventListener('error', fail, { once: true });
  video.addEventListener('playing', () => alive() && video.classList.add('is-playing'), { once: true });
  video.addEventListener('canplay', () => alive() && sync(), { once: true });
  video.preload = 'auto';
  video.load();
  if (!lite) watch(video, toLite, alive);
}

let loading = false;

async function load(video) {
  if (loading) return;
  loading = true;
  const { srcDesktop, srcMobile, dimsDesktop, dimsMobile, mobileQuery, v } = video.dataset;
  // Mesma query do <source media> do pôster (components/media.mjs).
  const mobile = Boolean(mobileQuery && matchMedia(mobileQuery).matches);
  const formats = await pickFormats(mobile ? dimsMobile : dimsDesktop);
  attach(video, mobile ? srcMobile : srcDesktop, v, formats);
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
