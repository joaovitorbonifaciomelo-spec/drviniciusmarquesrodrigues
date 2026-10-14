/**
 * Scroll: Lenis (suavização leve, só roda/trackpad — toque permanece nativo)
 * sincronizado ao ticker do GSAP/ScrollTrigger. Sem Lenis (movimento
 * reduzido ou falha de script), tudo cai no scroll nativo.
 */
let lenis = null;
const listeners = new Set();

export function initScroll() {
  const { Lenis, gsap, ScrollTrigger } = window;
  if (Lenis) {
    lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });
    // Lenis move a janela nativamente: o listener nativo abaixo já notifica os assinantes.
    lenis.on('scroll', () => ScrollTrigger?.update());
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  return lenis;
}

export const getLenis = () => lenis;

let ticking = false;
function emit() {
  for (const fn of listeners) fn(window.scrollY);
}
function onNative() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    emit();
  });
}
window.addEventListener('scroll', onNative, { passive: true });

/** Assinatura de scroll (rAF-throttled). Retorna função de cancelamento. */
export function onScroll(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function scrollToY(y, { immediate = false } = {}) {
  const top = Math.max(0, y);
  if (lenis) {
    lenis.scrollTo(top, {
      immediate,
      duration: immediate ? 0 : Math.min(2.2, 0.9 + Math.abs(top - window.scrollY) / 4000),
      easing: (t) => 1 - Math.pow(1 - t, 4),
      force: true,
    });
  } else {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: immediate || reduce ? 'auto' : 'smooth' });
  }
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
