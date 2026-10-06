/**
 * CENA — Hero → Autoridade Próxima  (o teste de qualidade do projeto)
 *
 * Uma transformação, não duas seções:
 *   1. o título reage primeiro (sai pela própria máscara);
 *   2. apoio e CTA saem em seguida;
 *   3. o vídeo NÃO some — o quadro se reduz e ancora à direita, virando o
 *      recorte editorial da Autoridade Próxima (continuidade espacial);
 *   4. o Marfim aparece por trás; o overlay azul se dissolve;
 *   5. o indicador de scroll sobe e se torna o trilho do percurso;
 *   6. "Profundidade médica." → "Presença humana." — e o quadro passa do
 *      médico trabalhando ao médico escutando (as duas ideias se conectam);
 *   7. Conhecimento → Compreensão → Critério → Direção: a linha preenche
 *      e cada etapa acende quando é alcançada.
 *
 * Fluxo (mobile/telas baixas): scroll natural; o hero recua e o percurso
 * acompanha a leitura. Movimento reduzido: layout estático completo.
 */
import { MQ, $, $$ } from '../core/env.js?v=mux8gq7l';
import { registerAnchor } from '../core/anchors.js?v=mux8gq7l';
import { setVideoSuspended } from '../ui/video.js?v=mux8gq7l';

export function initHeroAuthority(mm) {
  const root = $('[data-scene="hero-authority"]');
  if (!root) return;
  const { gsap } = window;
  const q = (s) => $(s, root);

  const el = {
    stage: q('[data-ha-stage]'),
    hero: q('.ha__hero'),
    media: q('[data-ha-media]'),
    inner: q('[data-ha-media-inner]'),
    shade: q('[data-ha-shade]'),
    eyebrow: q('[data-ha-eyebrow]'),
    title: q('[data-ha-title]'),
    titleMasks: $$('[data-ha-title] .ln', root),
    titleLines: $$('[data-ha-title] .ln__i', root),
    foot: q('[data-ha-foot]'),
    toggle: q('[data-video-toggle]'),
    cue: q('.ha__cue'),
    slot: q('[data-ha-slot]'),
    label: q('[data-ha-label]'),
    a: q('[data-ha-a] .ln__i'),
    b: q('[data-ha-b] .ln__i'),
    copy: q('[data-ha-copy]'),
    path: q('[data-path]'),
    list: q('.path__list'),
    track: q('[data-path-track]'),
    fill: q('[data-path-fill]'),
    hint: q('[data-path-hint]'),
    items: $$('[data-path-item]', root),
  };

  /* ------------------------------------------------------------ ENTRADA
   * Sem loader: a imagem emerge do Azul Profundo e o título sobe da máscara.
   * Alvos distintos dos da saída por scroll (máscaras/containers) para que
   * rolar durante a entrada nunca gere conflito. */
  const intro = gsap.timeline({ delay: 0.05, onComplete: () => document.documentElement.classList.add('intro-done') });
  intro
    .fromTo(el.inner, { opacity: 0 }, { opacity: 1, duration: 1.8, ease: 'calm' }, 0)
    .fromTo(el.titleLines, { yPercent: 130, y: 0 }, { yPercent: 0, y: 0, duration: 1.3, ease: 'orient', stagger: 0.12 }, 0.1)
    .fromTo(el.eyebrow.children, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9, ease: 'orient', stagger: 0.07 }, 0.3)
    .fromTo(el.foot.children, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1, ease: 'orient', stagger: 0.1 }, 0.55)
    .fromTo(el.cue, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 1.2, ease: 'orient' }, 0.8);

  /** Etapas do percurso acendem quando o preenchimento da linha as alcança. */
  const setPath = (p) => {
    const n = el.items.length;
    el.items.forEach((it, i) => it.classList.toggle('is-on', p > 0.01 && p >= (i / (n - 1)) * 0.985));
  };

  /* ------------------------------------------------------------ PALCO */
  mm.add(MQ.stage, () => {
    const DIST = () => parseFloat(getComputedStyle(root).getPropertyValue('--ha-dist')) / 100; // fonte: CSS
    el.path.setAttribute('data-path-live', '');

    // Geometria relativa ao palco — recalculada a cada refresh (resize/orientação)
    const rel = (node) => {
      const s = el.stage.getBoundingClientRect();
      const r = node.getBoundingClientRect();
      return { top: r.top - s.top, left: r.left - s.left, right: s.right - r.right, bottom: s.bottom - r.bottom, width: r.width, height: r.height };
    };
    const frame = () => {
      const g = rel(el.slot);
      return `inset(${g.top}px ${g.right}px ${g.bottom}px ${g.left}px)`;
    };
    const frameOrigin = () => {
      const g = rel(el.slot);
      return `${g.left + g.width / 2}px ${g.top + g.height / 2}px`;
    };
    // Trilho: posição natural (offsets não sofrem transform) × posição do indicador
    const trackHome = () => {
      const p = rel(el.path);
      return { top: p.top + el.track.offsetTop, left: p.left + el.track.offsetLeft, height: el.track.offsetHeight };
    };
    // Indicador medido por offsets (imune ao scaleY da entrada); o hero cobre o palco (inset 0)
    const cue = () => ({ top: el.cue.offsetTop, left: el.cue.offsetLeft, height: el.cue.offsetHeight });

    gsap.set(el.slot, { clipPath: 'none' });
    gsap.set([el.label, el.copy], { opacity: 0, y: 16 });
    gsap.set([el.a, el.b], { yPercent: 130 });
    gsap.set(el.list, { opacity: 0 });
    gsap.set(el.fill, { scaleY: 0 });
    setPath(0);

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: () => `+=${DIST() * window.innerHeight}`,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
      onUpdate() {
        setPath(gsap.getProperty(el.fill, 'scaleY'));
        setVideoSuspended(gsap.getProperty(el.media, 'opacity') < 0.05);
      },
    });

    tl
      // 1–2 · o título reage primeiro; o restante acompanha
      .to(el.titleMasks[0], { y: -56, opacity: 0, duration: 1.1, ease: 'inout' }, 0)
      .to(el.titleMasks[1], { y: -56, opacity: 0, duration: 1.1, ease: 'inout' }, 0.16)
      .to(el.eyebrow, { y: -24, opacity: 0, duration: 0.9, ease: 'inout' }, 0.06)
      .to(el.foot, { y: -32, opacity: 0, duration: 1, ease: 'inout' }, 0.24)
      .to([el.toggle, el.hint].filter(Boolean), { opacity: 0, duration: 0.45 }, 0)

      // 3–4 · o quadro se reduz e ancora à direita; o Marfim aparece
      .fromTo(el.media, { clipPath: 'inset(0px 0px 0px 0px)' }, { clipPath: frame, duration: 3.8, ease: 'inout' }, 0.35)
      .fromTo(el.inner, { scale: 1, transformOrigin: frameOrigin }, { scale: 0.86, duration: 3.8, ease: 'inout' }, 0.35)
      .to(el.shade, { opacity: 0, duration: 2.8, ease: 'inout' }, 0.9)

      // 5 · o indicador de scroll sobe e vira o trilho do percurso
      .fromTo(
        el.track,
        {
          x: () => cue().left - trackHome().left,
          y: () => cue().top - trackHome().top,
          scaleY: () => cue().height / trackHome().height,
          color: 'rgba(244, 240, 232, 0.35)',
        },
        { x: 0, y: 0, scaleY: 1, color: 'rgba(43, 43, 43, 0.2)', duration: 3.6, ease: 'inout' },
        0.45
      )

      // 6 · Profundidade médica. → Presença humana. (trabalho → escuta)
      .to(el.label, { opacity: 1, y: 0, duration: 0.9, ease: 'orient' }, 3.1)
      .to(el.a, { yPercent: 0, duration: 1.2, ease: 'orient' }, 3.3)
      .to(el.b, { yPercent: 0, duration: 1.2, ease: 'orient' }, 5.0)
      .to(el.media, { opacity: 0, duration: 1.1, ease: 'inout' }, 5.15)
      .to(el.copy, { opacity: 1, y: 0, duration: 1, ease: 'orient' }, 5.9)

      // 7 · Conhecimento → Compreensão → Critério → Direção
      .to(el.list, { opacity: 1, duration: 0.6 }, 6.6)
      .to(el.fill, { scaleY: 1, duration: 2.6 }, 7.0)
      .to({}, { duration: 0.8 }, 9.6);

    const pos = (t) => {
      const st = tl.scrollTrigger;
      return st.start + (st.end - st.start) * (t / tl.duration());
    };
    const off = registerAnchor('autoridade', () => pos(6.9));

    return () => {
      off();
      el.path.removeAttribute('data-path-live');
      setPath(0);
      setVideoSuspended(false);
    };
  });

  /* ------------------------------------------------------------ FLUXO */
  mm.add(MQ.flow, () => {
    el.path.setAttribute('data-path-live', '');

    // O hero recua: o conteúdo sai primeiro, a imagem é "recortada" pela página
    gsap
      .timeline({ scrollTrigger: { trigger: el.hero, start: 'top top', end: 'bottom top', scrub: true } })
      .to([el.eyebrow, el.title, el.foot], { y: -48, opacity: 0, stagger: 0.04, ease: 'none' }, 0)
      .fromTo(el.media, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 22% 0%)', ease: 'none' }, 0)
      .to(el.inner, { yPercent: 10, ease: 'none' }, 0);

    // O percurso acompanha a leitura
    gsap.fromTo(
      el.fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el.path,
          start: 'top 78%',
          end: 'bottom 52%',
          scrub: true,
          onUpdate: (self) => setPath(self.progress),
        },
      }
    );

    return () => {
      el.path.removeAttribute('data-path-live');
      setPath(0);
    };
  });
}
