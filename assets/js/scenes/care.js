/**
 * CENA — Como cuidamos
 *
 * O usuário deve SENTIR que avança por um raciocínio:
 *  · o painel azul entra como um bloco recortado e se expande (e se fecha
 *    na saída) — a seção vira ambiente, não caixa;
 *  · palco: o título ativo ocupa o centro; o anterior sobe e perde contraste
 *    (o raciocínio fica "atrás" de você); o mais antigo sai;
 *  · as imagens entram por recorte, empilhando-se;
 *  · o trilho à esquerda (Linha de Orientação) mostra progresso e permite
 *    saltar para qualquer etapa.
 *  · fluxo (mobile): lista natural; a linha entre as etapas se preenche
 *    conforme a leitura.
 */
import { MQ, $, $$, clamp } from '../core/env.js?v=mux8gq7l';
import { registerAnchor } from '../core/anchors.js?v=mux8gq7l';
import { scrollToY } from '../core/scroll.js?v=mux8gq7l';
import { marginPx } from '../core/tokens.js?v=mux8gq7l';

export function initCare(mm) {
  const root = $('[data-scene="care"]');
  if (!root) return;
  const { gsap } = window;
  const q = (s) => $(s, root);

  const panel = q('[data-care-panel]');
  const head = q('.care__head');
  const rail = q('.care__rail');
  const railFill = q('[data-care-fill]');
  const railLinks = $$('[data-care-jump]', root);
  const parts = $$('[data-care-step]', root).map((step) => ({
    step,
    title: $('[data-care-title]', step),
    titleInner: $('[data-care-title] .ln__i', step),
    body: $('[data-care-body]', step),
    fig: $('[data-care-figure]', step),
    figInner: $('.care__figure-inner', step),
    stem: $('[data-care-stem]', step),
  }));
  const n = parts.length;

  /* Painel: bloco → ambiente (todas as larguras, com movimento) */
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const inset = () => `inset(0px ${marginPx()}px 0px ${marginPx()}px)`;
    gsap.fromTo(
      panel,
      { clipPath: inset },
      { clipPath: 'inset(0px 0px 0px 0px)', ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 12%', scrub: true, invalidateOnRefresh: true } }
    );
    gsap.fromTo(
      panel,
      { clipPath: 'inset(0px 0px 0px 0px)' },
      { clipPath: inset, ease: 'none', immediateRender: false, scrollTrigger: { trigger: root, start: 'bottom bottom', end: 'bottom 10%', scrub: true, invalidateOnRefresh: true } }
    );
  });

  /* ------------------------------------------------------------ PALCO */
  mm.add(MQ.stage, () => {
    const FIRST = 1.0; // entrada da primeira etapa
    const STEP = 1.6; // intervalo entre etapas
    const HOLD = 1.1;
    const GAP = 20;
    const DIST = () => parseFloat(getComputedStyle(root).getPropertyValue('--care-dist')) / 100; // fonte: CSS

    const h = (i) => parts[i].title.offsetHeight;

    parts.forEach((p, i) => {
      gsap.set(p.titleInner, { yPercent: 130, y: 0 });
      gsap.set(p.body, { opacity: 0, y: 18 });
      gsap.set(p.fig, { clipPath: 'inset(100% 0% 0% 0%)', zIndex: i + 1 });
      gsap.set(p.figInner, { scale: 1.16 });
    });
    gsap.set(rail, { opacity: 0 });

    let active = -1;
    const setActive = (i) => {
      if (i === active) return;
      active = i;
      parts.forEach((p, k) => p.step.classList.toggle('is-active', k === i));
      railLinks.forEach((a, k) => {
        a.classList.toggle('is-active', k === i);
        if (k === i) a.setAttribute('aria-current', 'step');
        else a.removeAttribute('aria-current');
      });
    };

    const tl = gsap.timeline({
      defaults: { ease: 'inout' },
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: () => `+=${DIST() * window.innerHeight}`,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
      onUpdate() {
        const t = this.time();
        // etapa i é a atual desde pouco antes de sua entrada (s_i − 0.3) até a próxima
        setActive(clamp(Math.floor((t - FIRST + 0.3) / STEP), 0, n - 1));
      },
    });

    tl.to(head, { opacity: 0, y: -48, duration: 0.8 }, 0.3)
      .to(rail, { opacity: 1, duration: 0.6 }, 0.7)
      .fromTo(railFill, { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: (n - 1) * STEP }, FIRST + 0.5);

    parts.forEach((p, i) => {
      const s = FIRST + i * STEP;
      // O anterior abre caminho primeiro; o novo sobe pela própria máscara em seguida
      // (os dois nunca disputam o mesmo espaço no meio da transição).
      if (i > 0) {
        const prev = parts[i - 1];
        tl.to(prev.title, { y: () => -(h(i) + GAP), opacity: 0.16, duration: 0.9 }, s - 0.25).to(prev.body, { opacity: 0, y: -16, duration: 0.45 }, s - 0.25);
      }
      if (i > 1) {
        tl.to(parts[i - 2].title, { y: () => -(h(i) + h(i - 1) + GAP * 2), opacity: 0, duration: 0.9 }, s - 0.25);
      }
      tl.to(p.fig, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2 }, s - 0.1)
        .to(p.figInner, { scale: 1, duration: 1.7, ease: 'orient' }, s - 0.1)
        .to(p.titleInner, { yPercent: 0, duration: 1, ease: 'orient' }, i === 0 ? s : s + 0.35)
        .to(p.body, { opacity: 1, y: 0, duration: 0.9, ease: 'orient' }, s + 0.55);
    });
    tl.to({}, { duration: HOLD });

    const pos = (t) => {
      const st = tl.scrollTrigger;
      return st.start + (st.end - st.start) * (t / tl.duration());
    };
    const offs = [registerAnchor('como-cuidamos', () => pos(0))];
    parts.forEach((_, i) => offs.push(registerAnchor(`cuidado-${i + 1}`, () => pos(FIRST + i * STEP + 1.05))));

    const onJump = (e) => {
      const a = e.target.closest('[data-care-jump]');
      if (!a) return;
      e.preventDefault();
      scrollToY(pos(FIRST + Number(a.dataset.careJump) * STEP + 1.05));
    };
    rail.addEventListener('click', onJump);

    // Teclado: o foco dentro do palco leva o scroll até a etapa (nada focado fica invisível)
    const onFocus = (e) => {
      const jump = e.target.closest('[data-care-jump]');
      const step = e.target.closest('[data-care-step]');
      const i = jump ? Number(jump.dataset.careJump) : step ? parts.findIndex((p) => p.step === step) : -1;
      if (i >= 0 && i !== active) scrollToY(pos(FIRST + i * STEP + 1.05), { immediate: true });
      else if (i === 0 && tl.time() < FIRST) scrollToY(pos(FIRST + 1.05), { immediate: true });
    };
    root.addEventListener('focusin', onFocus);
    setActive(0);

    return () => {
      offs.forEach((off) => off());
      rail.removeEventListener('click', onJump);
      root.removeEventListener('focusin', onFocus);
      parts.forEach((p) => p.step.classList.remove('is-active'));
    };
  });

  /* ------------------------------------------------------------ FLUXO */
  mm.add(MQ.flow, () => {
    parts.forEach((p) => {
      if (!p.stem) return;
      gsap.fromTo(
        p.stem,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: p.step, start: 'top 62%', end: 'bottom 62%', scrub: true } }
      );
    });
  });
}
