/**
 * CENA — Perguntas do paciente
 * Foco progressivo: a pergunta mais próxima do centro da tela fica em foco;
 * as outras perdem contraste; o marcador na linha à esquerda vai até ela.
 * Sem GSAP — cálculo por scroll (5 elementos) + transições CSS; vale também
 * com movimento reduzido (as mudanças ficam instantâneas).
 */
import { $, $$ } from '../core/env.js?v=mura6kw8';
import { onScroll } from '../core/scroll.js?v=mura6kw8';

export function initQuestions() {
  const root = $('[data-scene="questions"]');
  if (!root) return;
  const items = $$('[data-q]', root);
  const body = $('.questions__body', root);
  const marker = $('[data-q-marker]', root);
  let active = null;

  const moveMarker = (el) => {
    const b = body.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    marker.style.transform = `translate3d(0, ${r.top - b.top + r.height / 2 - marker.offsetHeight / 2}px, 0)`;
  };

  const setActive = (el) => {
    if (el === active) return;
    active = el;
    items.forEach((it) => it.classList.toggle('is-active', it === el));
    root.classList.toggle('has-active', Boolean(el));
    if (el) moveMarker(el);
  };

  const update = () => {
    const vh = window.innerHeight;
    const b = body.getBoundingClientRect();
    // Só há foco enquanto o corpo da seção atravessa o centro da tela
    if (b.top > vh * 0.55 || b.bottom < vh * 0.35) return setActive(null);
    let best = null;
    let dist = Infinity;
    for (const it of items) {
      const r = it.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - vh * 0.5);
      if (d < dist) {
        dist = d;
        best = it;
      }
    }
    setActive(best);
  };

  onScroll(update);
  window.addEventListener('resize', () => {
    update();
    if (active) moveMarker(active);
  }, { passive: true });
  update();
}
