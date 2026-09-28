/**
 * Microinterações de movimento:
 *  · magnetic — CTAs acompanham o ponteiro por poucos pixels (resposta ao gesto,
 *    nunca deslocamento que dificulte o clique). Só ponteiro fino.
 *  · parallax — imagens grandes deslizam dentro do próprio recorte
 *    (profundidade sutil; o recorte não se move).
 */
import { MQ } from '../core/env.js';

export function initMagnetic(mm) {
  const { gsap } = window;
  mm.add(`${MQ.finePointer} and (prefers-reduced-motion: no-preference)`, () => {
    const cleanups = [];
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const text = el.querySelector('.cta__text');
      const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'orient' });
      const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'orient' });
      const tx = text && gsap.quickTo(text, 'x', { duration: 0.6, ease: 'orient' });
      const MAX = 6;
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        x(dx * MAX);
        y(dy * MAX * 0.6);
        tx?.(dx * 2);
      };
      const leave = () => {
        x(0);
        y(0);
        tx?.(0);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
        gsap.set([el, text].filter(Boolean), { clearProps: 'transform' });
      });
    });
    return () => cleanups.forEach((fn) => fn());
  });
}

export function initParallax(mm) {
  const { gsap } = window;
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const amount = parseFloat(el.dataset.parallax) || 0.06;
      gsap.fromTo(
        el,
        { yPercent: -amount * 50 },
        {
          yPercent: amount * 50,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    });
  });
}
