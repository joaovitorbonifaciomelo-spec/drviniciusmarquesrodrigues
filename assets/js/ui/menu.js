/**
 * Menu (telas < 1180px): diálogo de navegação com foco preso, ESC,
 * conteúdo de fundo inerte e scroll suspenso.
 */
import { stopScroll, startScroll } from '../core/scroll.js?v=mux8gq7l';

export function initMenu() {
  const btn = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!btn || !menu) return;
  const label = btn.querySelector('[data-menu-label]');
  const html = document.documentElement;
  const background = [document.querySelector('main'), document.querySelector('footer'), document.querySelector('.skip')].filter(Boolean);
  let open = false;

  const focusables = () => [btn, ...menu.querySelectorAll('a[href], button:not([disabled])')];

  function setOpen(next, { restoreFocus = true } = {}) {
    if (next === open) return;
    open = next;
    btn.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Fechar' : 'Menu';
    html.classList.toggle('menu-open', open);
    background.forEach((el) => (el.inert = open));
    document.dispatchEvent(new CustomEvent('menu:change', { detail: { open } }));

    if (open) {
      stopScroll();
      menu.hidden = false;
      menu.classList.remove('is-closing');
      requestAnimationFrame(() => {
        menu.classList.add('is-open');
        menu.querySelector('a[href]')?.focus({ preventScroll: true });
      });
    } else {
      startScroll();
      menu.classList.remove('is-open');
      menu.classList.add('is-closing');
      const done = () => {
        if (open) return;
        menu.classList.remove('is-closing');
        menu.hidden = true;
      };
      menu.addEventListener('transitionend', done, { once: true });
      setTimeout(done, 900);
      if (restoreFocus) btn.focus({ preventScroll: true });
    }
  }

  btn.addEventListener('click', () => setOpen(!open));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('[data-menu-link]')) setOpen(false, { restoreFocus: false });
  });
  document.addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'Tab') {
      const f = focusables();
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && i === f.length - 1) {
        e.preventDefault();
        f[0].focus();
      }
    }
  });
  window.matchMedia('(min-width: 1180px)').addEventListener('change', (e) => e.matches && setOpen(false, { restoreFocus: false }));
}
