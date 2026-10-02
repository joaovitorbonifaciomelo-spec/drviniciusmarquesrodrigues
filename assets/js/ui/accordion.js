/**
 * Acordeão das áreas (dispositivos de toque). Um item aberto por vez.
 * Sem JS, todos os painéis ficam abertos (conteúdo sempre acessível).
 * Fechado = `inert`: fora da ordem de tabulação e da árvore de acessibilidade.
 */
export function initAccordion() {
  const items = Array.from(document.querySelectorAll('[data-acc]'));
  if (!items.length) return;

  const set = (item, open) => {
    const btn = item.querySelector('[data-acc-btn]');
    const panel = item.querySelector('[data-acc-panel]');
    btn.setAttribute('aria-expanded', String(open));
    item.classList.toggle('is-open', open);
    panel.inert = !open;
  };

  items.forEach((item) => {
    set(item, false);
    item.querySelector('[data-acc-btn]').addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      items.forEach((other) => other !== item && set(other, false));
      set(item, willOpen);
    });
  });
}
