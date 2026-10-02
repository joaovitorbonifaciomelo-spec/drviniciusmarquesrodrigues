/**
 * CENA — Áreas de atuação (ponteiro fino)
 *
 * Hover/foco em um item: o título se desloca, a linha superior se desenha,
 * a seta se estende e um painel (imagem vertical + descrição) desliza até
 * a altura do item ativo — reage ao ITEM, não persegue o cursor.
 * Implementado com classes + transições CSS: funciona igual com movimento
 * reduzido (as transições caem para instantâneas).
 */
import { $, $$, clamp } from '../core/env.js?v=mura6kw8';

export function initAreas() {
  const list = $('[data-areas-pointer]');
  if (!list) return;
  const items = $$('[data-area]', list);
  const visual = $('[data-areas-visual]', list);
  const imgs = $$('[data-area-img]', list);
  const descs = $$('[data-area-desc]', list);
  let active = null;
  let leaveTimer = 0;

  const place = (i, instant) => {
    const row = items[i];
    const vh = visual.offsetHeight;
    const y = clamp(row.offsetTop + row.offsetHeight / 2 - vh / 2, -vh * 0.15, list.offsetHeight - vh * 0.85);
    if (instant) {
      visual.style.transition = 'none';
      visual.style.transform = `translate3d(0, ${y}px, 0)`;
      visual.getBoundingClientRect();
      visual.style.transition = '';
    } else {
      visual.style.transform = `translate3d(0, ${y}px, 0)`;
    }
  };

  const activate = (i) => {
    clearTimeout(leaveTimer);
    if (i === active) return;
    const prev = active;
    active = i;
    list.classList.toggle('has-active', i !== null);
    items.forEach((it, k) => it.classList.toggle('is-active', k === i));
    descs.forEach((d, k) => d.classList.toggle('is-active', k === i));

    imgs.forEach((img, k) => {
      img.style.zIndex = k === i ? 2 : 1;
      if (k === i) {
        img.classList.remove('is-leaving');
        img.classList.add('is-active');
      } else if (k === prev) {
        img.classList.remove('is-active');
        img.classList.add('is-leaving');
        setTimeout(() => {
          if (active !== k) {
            img.style.transition = 'none';
            img.classList.remove('is-leaving');
            img.getBoundingClientRect();
            img.style.transition = '';
          }
        }, 1000);
      }
    });
    if (i !== null) place(i, prev === null);
  };

  const deactivateSoon = () => {
    clearTimeout(leaveTimer);
    leaveTimer = setTimeout(() => activate(null), 160);
  };

  items.forEach((it, i) => {
    const link = $('[data-area-link]', it);
    link.addEventListener('pointerenter', () => activate(i));
    link.addEventListener('focus', () => activate(i));
  });
  list.addEventListener('pointerleave', deactivateSoon);
  list.addEventListener('focusout', (e) => {
    if (!list.contains(e.relatedTarget)) deactivateSoon();
  });
  window.addEventListener('resize', () => active !== null && place(active, true), { passive: true });
}
