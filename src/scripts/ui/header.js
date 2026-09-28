/**
 * Header contextual.
 *  · compacta após o primeiro gesto de scroll (assinatura: principal → horizontal);
 *  · o tom segue o que está POR TRÁS dele (amostragem do ponto sob o header —
 *    funciona com palcos sticky e recortes animados sem configuração extra);
 *  · capítulo atual: rótulo discreto (telas largas) + item de navegação ativo.
 */
import { onScroll } from '../core/scroll.js';

export function initHeader() {
  const hd = document.querySelector('[data-hd]');
  if (!hd) return;
  const chapterBox = hd.querySelector('.hd__chapter');
  const chapterText = hd.querySelector('[data-chapter-text]');
  const navLinks = Array.from(hd.querySelectorAll('[data-nav]'));
  const html = document.documentElement;

  let compact = null;
  let tone = hd.dataset.tone;
  let chapter = null;
  let swapTimer = 0;

  const sample = (x, y, attr) => {
    const els = document.elementsFromPoint(x, y);
    for (const el of els) {
      if (hd.contains(el)) continue;
      const host = el.closest(`[${attr}]`);
      if (host) return host;
    }
    return null;
  };

  function setChapter(el) {
    const name = el?.dataset.chapter || '';
    const id = el?.id || '';
    if (name === chapter) return;
    chapter = name;
    navLinks.forEach((a) => a.classList.toggle('is-current', a.dataset.nav === id && id !== ''));
    if (!chapterText) return;
    clearTimeout(swapTimer);
    chapterText.classList.add('is-swapping');
    swapTimer = setTimeout(() => {
      chapterText.textContent = name;
      chapterBox.classList.toggle('has-text', Boolean(name));
      chapterText.classList.remove('is-swapping');
    }, 180);
  }

  function update() {
    const c = window.scrollY > 24;
    if (c !== compact) {
      compact = c;
      hd.classList.toggle('is-compact', c);
    }
    const h = hd.getBoundingClientRect().height;
    let t = sample(window.innerWidth / 2, h / 2, 'data-header-tone')?.dataset.headerTone || 'light';
    if (html.classList.contains('menu-open')) t = 'dark';
    if (t !== tone) {
      tone = t;
      hd.dataset.tone = t;
    }
    setChapter(sample(window.innerWidth / 2, window.innerHeight * 0.42, 'data-chapter'));
  }

  // As cenas usam scrub (inércia): recortes continuam se movendo depois que o
  // scroll para. O header reavalia por quadro até tudo assentar.
  let settleUntil = 0;
  let settling = false;
  const settle = () => {
    update();
    if (performance.now() < settleUntil) requestAnimationFrame(settle);
    else settling = false;
  };
  onScroll(() => {
    settleUntil = performance.now() + 1600;
    if (!settling) {
      settling = true;
      requestAnimationFrame(settle);
    }
  });
  window.addEventListener('resize', update, { passive: true });
  document.addEventListener('menu:change', update);
  update();
  return { update };
}
