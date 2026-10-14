/**
 * Mapa visível por padrão — carregado quando a seção entra perto da
 * viewport (não no load inicial: custo zero de LCP para quem não rola
 * até lá, mas sem exigir clique de quem chega).
 */
export function initMap() {
  const mount = (box) => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.google.com/maps?q=${box.dataset.map}&output=embed`;
    iframe.title = 'Mapa de localização';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    box.replaceChildren(iframe);
  };
  const boxes = document.querySelectorAll('[data-map]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          mount(e.target);
          obs.unobserve(e.target);
        });
      },
      { rootMargin: '400px 0px' }
    );
    boxes.forEach((box) => io.observe(box));
  } else {
    boxes.forEach(mount);
  }
}
