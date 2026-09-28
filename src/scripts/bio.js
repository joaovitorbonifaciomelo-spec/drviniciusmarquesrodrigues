/**
 * /bio/ — único script da página. Sem bibliotecas.
 *
 *  1. vídeo: presença; carrega só depois do load, em tempo ocioso, com rede
 *     adequada (ui/video.js);
 *  2. intenção: toque, hover ou foco num destino marca [data-intent] na
 *     página — a linha se redireciona, a imagem muda o enquadramento, os
 *     outros destinos cedem contraste (tudo em CSS, styles/bio/bio.css).
 *     A navegação nunca espera: o feedback acontece junto do gesto;
 *  3. analytics-ready: cada destino emite `dv:navigate` (ver README).
 */
import { initVideo } from './ui/video.js';

window.__motionReady = true; // a página não depende de html.motion (ver layout.mjs)
initVideo({ defer: true });

/* ---------------------------------------------------------------- 2. intenção */

const root = document.querySelector('[data-bio]');
const rows = root ? Array.from(root.querySelectorAll('.bact')) : [];
let clearTimer = 0;

function setIntent(row) {
  clearTimeout(clearTimer);
  rows.forEach((r) => r.classList.toggle('is-intent', r === row));
  if (row) {
    root.dataset.intent = row.querySelector('[data-dest]').dataset.dest;
    root.dataset.intentRow = row.dataset.row;
  } else {
    delete root.dataset.intent;
    delete root.dataset.intentRow;
  }
}
const clearSoon = (ms) => {
  clearTimeout(clearTimer);
  clearTimer = setTimeout(() => setIntent(null), ms);
};

if (root) {
  // Toque: 40 ms de espera — se o gesto virar scroll, o navegador cancela antes
  // e nada pisca. Mouse: imediato (o hover já sinalizou a intenção).
  root.addEventListener(
    'pointerdown',
    (e) => {
      const row = e.target.closest('.bact');
      if (!row || e.button > 0) return;
      if (e.pointerType === 'mouse') return setIntent(row);
      const t = setTimeout(() => setIntent(row), 40);
      const end = () => {
        clearTimeout(t);
        clearSoon(220);
        window.removeEventListener('pointerup', end);
        window.removeEventListener('pointercancel', end);
      };
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
    },
    { passive: true }
  );

  root.addEventListener('pointerover', (e) => {
    if (e.pointerType !== 'mouse') return;
    const row = e.target.closest('.bact');
    if (row) setIntent(row);
  });
  root.addEventListener('pointerout', (e) => {
    if (e.pointerType !== 'mouse') return;
    const row = e.target.closest('.bact');
    if (row && !row.contains(e.relatedTarget)) clearSoon(140);
  });

  // Teclado: o foco visível também é intenção
  root.addEventListener('focusin', (e) => {
    const row = e.target.closest('.bact');
    if (row && e.target.matches(':focus-visible')) setIntent(row);
  });
  root.addEventListener('focusout', (e) => {
    if (!e.relatedTarget?.closest?.('.bact')) clearSoon(140);
  });

  // Voltando do WhatsApp/Maps/site (bfcache): a página reabre em repouso
  window.addEventListener('pageshow', () => setIntent(null));
}

// Safari iOS só aplica :active com um listener de toque registrado
document.addEventListener('touchstart', () => {}, { passive: true });

/* ---------------------------------------------------------------- 3. bottom sheet */
/* "Como chegar" não navega: abre um painel local (endereço, telefone, mapa).
 * Diálogo acessível — foco preso, ESC, clique fora, fundo inerte — e o mapa
 * só é montado no DOM quando o painel abre (o toque em "Como chegar" já é
 * a intenção clara; nada carrega antes disso). */

function initSheets() {
  const bioRoot = document.querySelector('[data-bio]');
  for (const sheetEl of document.querySelectorAll('[data-sheet]')) {
    const id = sheetEl.dataset.sheet;
    const panel = sheetEl.querySelector('.bsheet__panel');
    const openers = document.querySelectorAll(`[data-sheet-open="${id}"]`);
    const mapBox = sheetEl.querySelector('[data-sheet-map]');
    let lastFocus = null;
    let mapMounted = false;
    let closeTimer = 0;

    const focusables = () => Array.from(panel.querySelectorAll('a[href], button:not([disabled])'));

    const mountMap = () => {
      if (mapMounted || !mapBox) return;
      mapMounted = true;
      const q = mapBox.dataset.mapsQuery;
      if (!q) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.google.com/maps?q=${q}&output=embed`;
      iframe.title = 'Mapa de localização — Vivenza Centro Médico';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      // Fora da ordem de tabulação: um iframe de terceiros tem sua própria
      // sequência interna de foco, que escaparia da armadilha de foco do
      // sheet (Esc/Tab parariam de funcionar assim que o foco entrasse
      // nele). "Abrir no Google Maps" já é o caminho acessível ao mapa real.
      iframe.tabIndex = -1;
      mapBox.appendChild(iframe);
    };

    const onKeydown = (e) => {
      if (e.key === 'Escape') return close();
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) return;
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && i === f.length - 1) {
        e.preventDefault();
        f[0].focus();
      }
    };

    function open(trigger) {
      clearTimeout(closeTimer);
      lastFocus = trigger || document.activeElement;
      document.documentElement.classList.add('sheet-open');
      for (const child of bioRoot.children) if (child !== sheetEl) child.inert = true;
      sheetEl.hidden = false;
      sheetEl.classList.remove('is-closing');
      requestAnimationFrame(() => {
        sheetEl.classList.add('is-open');
        panel.focus({ preventScroll: true });
      });
      openers.forEach((o) => o.setAttribute('aria-expanded', 'true'));
      mountMap();
      document.addEventListener('keydown', onKeydown);
    }

    function close() {
      sheetEl.classList.remove('is-open');
      sheetEl.classList.add('is-closing');
      document.documentElement.classList.remove('sheet-open');
      for (const child of bioRoot.children) if (child !== sheetEl) child.inert = false;
      openers.forEach((o) => o.setAttribute('aria-expanded', 'false'));
      document.removeEventListener('keydown', onKeydown);
      const done = () => {
        if (sheetEl.classList.contains('is-open')) return;
        sheetEl.classList.remove('is-closing');
        sheetEl.hidden = true;
      };
      panel.addEventListener('transitionend', done, { once: true });
      closeTimer = setTimeout(done, 600);
      lastFocus?.focus({ preventScroll: true });
    }

    openers.forEach((o) => o.addEventListener('click', () => open(o)));
    sheetEl.querySelectorAll('[data-sheet-close]').forEach((el) => el.addEventListener('click', close));
  }
}
initSheets();

/* ---------------------------------------------------------------- 4. analytics-ready */

// Contrato: document → CustomEvent('dv:navigate', { detail: { dest, at, href, label, pending } }).
// Para instrumentar depois, basta ouvir o evento (ou definir window.dvTrack).
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-dest]');
  if (!a) return;
  const detail = {
    dest: a.dataset.dest,
    at: a.dataset.destAt || null,
    href: a.getAttribute('href'),
    label: (a.querySelector('.bact__title') || a).textContent.replace(/\s+/g, ' ').trim(),
    pending: 'pending' in a.dataset, // destino ainda no fallback (dado real ausente)
  };
  document.dispatchEvent(new CustomEvent('dv:navigate', { detail }));
  if (typeof window.dvTrack === 'function') window.dvTrack(detail);
});
