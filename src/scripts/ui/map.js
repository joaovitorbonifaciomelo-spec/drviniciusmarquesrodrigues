/**
 * Mapa sob demanda: o iframe do Google Maps só é carregado quando o
 * visitante pede (privacidade — LGPD — e nenhum custo no carregamento).
 */
export function initMap() {
  document.querySelectorAll('[data-map]').forEach((box) => {
    const btn = box.querySelector('[data-map-load]');
    btn?.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.google.com/maps?q=${box.dataset.map}&output=embed`;
      iframe.title = 'Mapa de localização';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      box.replaceChildren(iframe);
    });
  });
}
