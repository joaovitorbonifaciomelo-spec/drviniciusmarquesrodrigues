/**
 * CENA — Pausa editorial
 * Movimento extremamente lento: a fotografia se abre de um recorte estreito
 * (o olhar é convidado a desacelerar); as frases chegam uma a uma e as
 * anteriores recuam levemente. Scrub com mais inércia = sensação de calma.
 *
 * Uma única linha do tempo, em unidades de altura de viewport, cobre da
 * aproximação (0→1, a seção subindo) ao fim do palco (1→1+DIST): nenhum
 * outro tween disputa o recorte.
 */
import { MQ, $, $$ } from '../core/env.js';

export function initPause(mm) {
  const root = $('[data-scene="pause"]');
  if (!root) return;
  const { gsap } = window;
  const media = $('[data-pause-media]', root);
  const inner = $('[data-pause-inner]', root);
  const shade = $('.pause__shade', root);
  const phrases = $$('[data-pause-phrase]', root);

  mm.add(MQ.stage, () => {
    const DIST = parseFloat(getComputedStyle(root).getPropertyValue('--pause-dist')) / 100; // fonte: CSS
    phrases.forEach((p) => gsap.set(p.querySelectorAll('.ln__i'), { yPercent: 130, y: 0 }));
    gsap.set(shade, { opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root,
        start: 'top bottom',
        end: () => `+=${(DIST + 1) * window.innerHeight}`,
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(media, { clipPath: 'inset(38% 34% 38% 34%)' }, { clipPath: 'inset(22% 18% 22% 18%)', duration: 1 }, 0)
      .fromTo(inner, { scale: 1.32 }, { scale: 1.18, duration: 1 }, 0)
      .to(media, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'inout' }, 1)
      .to(inner, { scale: 1.05, duration: 0.7, ease: 'inout' }, 1)
      .to(inner, { scale: 1, duration: DIST - 0.7 }, 1.7)
      .to(shade, { opacity: 1, duration: 0.4 }, 1.4);

    phrases.forEach((p, i) => {
      const at = 1.75 + i * 0.48;
      tl.to(p.querySelectorAll('.ln__i'), { yPercent: 0, duration: 0.34, ease: 'calm', stagger: 0.05 }, at);
      if (i > 0) tl.to(phrases[i - 1], { opacity: 0.5, duration: 0.3, ease: 'calm' }, at);
    });
    tl.to({}, { duration: 0.01 }, 1 + DIST - 0.01);

  });
}
