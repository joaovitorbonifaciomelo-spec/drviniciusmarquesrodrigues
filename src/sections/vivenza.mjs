/**
 * VIVENZA — estrutura + sustentação.
 * A marca pessoal lidera; Vivenza entra como contexto/endosso: nome em
 * Inter caixa-alta (sem logotipo — a identidade da Vivenza não integra
 * este sistema), fotografia de arquitetura e informação prática.
 *
 * Endereço, telefone e mapa confirmados em 2026-09-27. O mapa carrega
 * quando a seção se aproxima da viewport (scripts/ui/map.js) — visível
 * por padrão, sem custo de LCP para quem não chega até aqui.
 */
import { html, lines } from '../../tools/lib/html.mjs';
import { vivenza } from '../content/home.mjs';
import { site } from '../content/site.mjs';
import { mediaFor } from '../components/media.mjs';
import { icon, contactLink } from '../components/ui.mjs';

export const vivenzaSection = () => {
  const q = vivenza.address.mapsQuery;
  const directions = q ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}` : null;
  const phone = site.contact.phone;
  return html`<section class="vivenza" id="local" data-chapter="${vivenza.chapter}" data-header-tone="light" aria-labelledby="vivenza-title">
  <div class="vivenza__grid">
    <div class="vivenza__text">
      <p class="label" data-reveal="fade">${vivenza.label}</p>
      <h2 class="h1 vivenza__title" id="vivenza-title" data-reveal="lines">${lines(vivenza.title)}</h2>
      <p class="lead vivenza__copy" data-reveal="fade">${vivenza.copy}</p>
    </div>

    <figure class="vivenza__media" data-reveal="media">
      <div class="vivenza__media-inner" data-parallax="0.06">${mediaFor('vivenza', { sizes: '(min-width: 1024px) 58vw, 100vw' })}</div>
    </figure>

    <div class="vivenza__info">
      <p class="vivenza__brand" data-reveal="fade"><span class="vivenza__brand-name">${vivenza.brand}</span><span class="vivenza__brand-role">Estrutura de atendimento</span></p>
      <dl class="vivenza__list">
        <div class="vivenza__row" data-reveal="row">
          <span class="oline oline--x" data-line="draw" aria-hidden="true"></span>
          <dt>Endereço</dt>
          <dd><address>${vivenza.address.building}<br>${vivenza.address.line1}<br>${vivenza.address.line2}</address></dd>
        </div>
        <div class="vivenza__row" data-reveal="row">
          <span class="oline oline--x" data-line="draw" aria-hidden="true"></span>
          <dt>Telefone</dt>
          <dd>${contactLink(phone)}</dd>
        </div>
        ${vivenza.details.map(
          (d) => html`<div class="vivenza__row" data-reveal="row">
          <span class="oline oline--x" data-line="draw" aria-hidden="true"></span>
          <dt>${d.label}</dt>
          <dd>${d.value}</dd>
        </div>`
        )}
      </dl>
      <div class="vivenza__actions" data-reveal="fade">
        ${directions
          ? html`<a class="link-arrow" href="${directions}" target="_blank" rel="noopener"><span class="link-arrow__text">${vivenza.cta}</span><span class="link-arrow__icon">${icon.arrowOut()}</span><span class="sr-only"> (Google Maps, abre em nova aba)</span></a>`
          : html`<span class="link-arrow is-disabled" aria-disabled="true"><span class="link-arrow__text">${vivenza.cta}</span><span class="link-arrow__icon">${icon.arrowOut()}</span></span><span class="ph" data-placeholder>[link do mapa após confirmar endereço]</span>`}
        ${phone.href
          ? html`<a class="link-arrow" href="${phone.href}"><span class="link-arrow__text">${vivenza.call}</span><span class="link-arrow__icon">${icon.arrow()}</span></a>`
          : ''}
      </div>
    </div>

    <div class="vivenza__map" data-reveal="fade">
      ${q
        ? html`<div class="map" data-map="${encodeURIComponent(q)}" role="img" aria-label="Mapa de localização — ${vivenza.fullName}"></div>`
        : html`<div class="map map--pending" role="img" aria-label="Mapa indisponível: endereço a confirmar"><span class="map__grid" aria-hidden="true"></span><span class="map__note-pending">Mapa — inserido após confirmação do endereço</span></div>`}
    </div>
  </div>
</section>`;
};

