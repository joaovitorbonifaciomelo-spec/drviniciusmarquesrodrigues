/**
 * CENA — Encerramento
 * O painel azul se expande de bloco a ambiente e a Linha de Orientação desce
 * do topo e dobra até o CTA: todas as linhas do site conduzem a este ponto.
 */
import { $ } from '../core/env.js';
import { marginPx } from '../core/tokens.js';

export function initClosing(mm) {
  const root = $('[data-scene="closing"]');
  if (!root) return;
  const { gsap, ScrollTrigger } = window;
  const panel = $('[data-closing-panel]', root);
  const line = $('[data-closing-line]', root);
  const branch = $('[data-closing-branch]', root);
  const cta = $('[data-closing-cta] .cta', root);

  // Geometria: desktop — desce até o centro do CTA e dobra até ele;
  // mobile — desce pela margem até pouco acima do CTA.
  // Offsets (não sofrem transform): medida estável mesmo durante reveals/magnetismo
  const within = (el) => {
    let x = 0;
    let y = 0;
    for (let n = el; n && n !== panel; n = n.offsetParent) {
      x += n.offsetLeft;
      y += n.offsetTop;
    }
    return { x, y };
  };
  const measure = () => {
    const c = within(cta);
    const bent = getComputedStyle(branch).display !== 'none';
    const h = bent ? c.y + cta.offsetHeight / 2 : c.y - 20;
    root.style.setProperty('--closing-line-h', `${Math.max(0, h)}px`);
    root.style.setProperty('--closing-branch-w', `${Math.max(0, c.x - line.offsetLeft - 14)}px`);
  };
  measure();
  window.addEventListener('resize', measure, { passive: true });
  ScrollTrigger?.addEventListener('refreshInit', measure);

  if (!mm) return; // sem movimento: só a geometria estática
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const inset = () => `inset(0px ${marginPx()}px 0px ${marginPx()}px)`;
    gsap.fromTo(
      panel,
      { clipPath: inset },
      { clipPath: 'inset(0px 0px 0px 0px)', ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 10%', scrub: true, invalidateOnRefresh: true } }
    );
    gsap
      .timeline({ scrollTrigger: { trigger: panel, start: 'top 55%', end: 'top -10%', scrub: 0.6 } })
      .fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 0.72 })
      .fromTo(branch, { scaleX: 0 }, { scaleX: 1, ease: 'orient', duration: 0.28 });
  });
}
