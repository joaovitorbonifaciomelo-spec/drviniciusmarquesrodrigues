/**
 * Navegação ancorada + deep linking.
 *
 * Cenas com palco sticky registram "resolvedores": a posição de scroll em
 * que aquele conteúdo está de fato visível (ex.: #autoridade só existe
 * visualmente no meio da transformação do hero). Sem resolvedor, usa-se a
 * posição do elemento menos a altura do header compacto.
 */
import { scrollToY } from './scroll.js?v=mura6kw8';

const resolvers = new Map();

export const registerAnchor = (id, fn) => {
  resolvers.set(id, fn);
  return () => resolvers.delete(id);
};

const headerOffset = () => {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--hd-h-compact');
  const probe = document.createElement('div');
  probe.style.cssText = `position:absolute;visibility:hidden;height:${v || '4rem'}`;
  document.body.appendChild(probe);
  const h = probe.getBoundingClientRect().height;
  probe.remove();
  return h;
};

export function resolveAnchor(id) {
  if (id === 'top' || id === '') return 0;
  if (resolvers.has(id)) return resolvers.get(id)();
  const el = document.getElementById(id);
  if (!el) return null;
  return el.getBoundingClientRect().top + window.scrollY - headerOffset();
}

export function goTo(id, { immediate = false, push = true } = {}) {
  const y = resolveAnchor(id);
  if (y === null) return false;
  scrollToY(y, { immediate });
  if (push) history.pushState(null, '', id === 'top' ? location.pathname : `#${id}`);
  const target = id === 'top' ? document.getElementById('top') : document.getElementById(id);
  if (target) {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
  return true;
}

export function initAnchors() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank') return;
    const url = new URL(a.getAttribute('href'), location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const id = decodeURIComponent(url.hash.slice(1));
    if (goTo(id)) e.preventDefault();
  });

  window.addEventListener('popstate', () => {
    const id = decodeURIComponent(location.hash.slice(1));
    goTo(id || 'top', { push: false });
  });
}

/** Deep link na carga: chamado depois que cenas e fontes estabilizam. */
export function applyInitialHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (id) goTo(id, { immediate: true, push: false });
}
