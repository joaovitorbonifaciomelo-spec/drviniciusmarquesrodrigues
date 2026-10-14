/**
 * Ambiente: media queries compartilhadas por cenas, reveals e UI.
 * "stage" = experiência completa (palcos sticky). Abaixo disso, o site é
 * reinterpretado — scroll natural, sem cenas presas — não apenas encolhido.
 */
export const MQ = {
  stage: '(min-width: 1024px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)',
  flow: '((max-width: 1023px) or (max-height: 559px)) and (prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine)',
};

export const matches = (q) => window.matchMedia(q).matches;

export const html = document.documentElement;

/** Motion confirmada: classe do boot + bibliotecas carregadas. */
export const motionReady = () =>
  html.classList.contains('motion') && typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
