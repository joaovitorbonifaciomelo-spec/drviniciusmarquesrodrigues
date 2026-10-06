/**
 * Primitivas de revelação — uma implementação para o site inteiro.
 *
 *   data-reveal="fade"   opacidade + leve subida           (texto de apoio)
 *   data-reveal="lines"  linhas autorais sobem da máscara  (títulos)
 *   data-reveal="line"   idem, para um único .ln            (título de uma linha)
 *   data-reveal="row"    linha de lista: a Linha de Orientação se desenha
 *                        e o conteúdo aparece junto        (listas, tabelas)
 *   data-reveal="media"  recorte abre de baixo para cima + imagem assenta
 *   data-line="draw"     Linha de Orientação isolada se desenha
 *
 * Função de cada uma: revelar hierarquia na ordem em que deve ser lida.
 * Elementos dentro de palcos ([data-scene-desktop]) são coreografados pela
 * própria cena no desktop; no fluxo (mobile) voltam a usar estas primitivas.
 */
import { MQ } from '../core/env.js?v=mux8gq7l';

const START = 'top 88%';

function play(el) {
  const { gsap } = window;
  const type = el.dataset.reveal;
  const delay = parseFloat(el.dataset.revealDelay || 0);

  if (type === 'fade') {
    return gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, ease: 'orient', delay, clearProps: 'transform' });
  }
  if (type === 'lines' || type === 'line') {
    const inner = el.querySelectorAll('.ln__i');
    // y: 0 explícito — o GSAP lê o translateY(130%) do CSS como px e o somaria ao yPercent
    return gsap.fromTo(inner, { yPercent: 130, y: 0 }, { yPercent: 0, y: 0, duration: 1.25, ease: 'orient', stagger: 0.1, delay });
  }
  if (type === 'row') {
    const lines = el.querySelectorAll('[data-line="draw"]');
    const tl = gsap.timeline({ delay });
    tl.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1, ease: 'orient', clearProps: 'transform' }, 0);
    lines.forEach((l) => tl.fromTo(l, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'orient' }, 0));
    return tl;
  }
  if (type === 'media') {
    const inner = el.firstElementChild;
    const tl = gsap.timeline({ delay });
    tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'inout' }, 0);
    if (inner) tl.fromTo(inner, { scale: 1.14 }, { scale: 1, duration: 2, ease: 'orient' }, 0);
    return tl;
  }
  return null;
}

function drawLine(el) {
  const axis = el.classList.contains('oline--y') ? 'scaleY' : 'scaleX';
  return window.gsap.fromTo(el, { [axis]: 0 }, { [axis]: 1, duration: 1.6, ease: 'orient' });
}

/** Revela um grupo que entra no mesmo quadro com leve escalonamento. */
function batch(els, fn) {
  els.forEach((el, i) => {
    const t = fn(el);
    if (t && i) t.delay(t.delay() + i * 0.08);
  });
}

export function initReveals(mm) {
  const { ScrollTrigger, gsap } = window;

  const setup = (inStage) => {
    const skip = (el) => inStage && el.closest('[data-scene-desktop]');
    const reveals = Array.from(document.querySelectorAll('[data-reveal]')).filter((el) => !skip(el));
    const lines = Array.from(document.querySelectorAll('[data-line="draw"]')).filter(
      (el) => !skip(el) && !el.closest('[data-reveal="row"]')
    );

    ScrollTrigger.batch(reveals, { start: START, once: true, onEnter: (els) => batch(els, play) });
    ScrollTrigger.batch(lines, { start: 'top 92%', once: true, onEnter: (els) => batch(els, drawLine) });

    // Deep link / reload no meio da página: o que já ficou para trás aparece pronto.
    requestAnimationFrame(() => {
      [...reveals, ...lines].forEach((el) => {
        if (el.getBoundingClientRect().bottom < 0) {
          gsap.set(el, { opacity: 1, y: 0, clipPath: 'none', scaleX: 1, scaleY: 1 });
          gsap.set(el.querySelectorAll('.ln__i'), { yPercent: 0, y: 0 });
          el.querySelectorAll('[data-line="draw"]').forEach((l) => gsap.set(l, { scaleX: 1 }));
        }
      });
    });
  };

  mm.add(MQ.stage, () => setup(true));
  mm.add(MQ.flow, () => setup(false));
}
