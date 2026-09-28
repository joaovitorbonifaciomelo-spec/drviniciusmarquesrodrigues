/**
 * DR. VINICIUS — desacelerar.
 * Fotografia editorial grande + trajetória como informação estruturada:
 * linhas, grid e tipografia (sem cards, sem ícones de diploma).
 */
import { html, lines } from '../../tools/lib/html.mjs';
import { doctor } from '../content/home.mjs';
import { trajectory } from '../content/trajectory.mjs';
import { mediaFor } from '../components/media.mjs';
import { linkArrow } from '../components/ui.mjs';
import { registryLine } from '../components/layout.mjs';

export const factRows = (rows = trajectory, { withRegistry = true } = {}) => html`<dl class="facts">
  ${rows.map(
    (r) => html`<div class="facts__row" data-reveal="row">
    <span class="oline oline--x facts__line" data-line="draw" aria-hidden="true"></span>
    <dt class="facts__term">${r.area}</dt>
    <dd class="facts__desc"><span class="facts__detail">${r.detail}</span>${r.place ? html`<span class="facts__place">${r.place}</span>` : ''}${r.year ? html`<span class="facts__year">${r.year}</span>` : ''}</dd>
  </div>`
  )}
  ${withRegistry
    ? html`<div class="facts__row" data-reveal="row">
    <span class="oline oline--x facts__line" data-line="draw" aria-hidden="true"></span>
    <dt class="facts__term">Registro</dt>
    <dd class="facts__desc facts__desc--registry">${registryLine()}</dd>
  </div>`
    : ''}
</dl>`;

export const doctorSection = () => html`<section class="doctor" id="trajetoria" data-chapter="${doctor.chapter}" data-header-tone="light" aria-labelledby="doctor-title">
  <div class="doctor__grid">
    <figure class="doctor__portrait" data-reveal="media">
      <div class="doctor__portrait-inner" data-parallax="0.08">${mediaFor('portrait', { sizes: '(min-width: 1024px) 45vw, 100vw' })}</div>
    </figure>
    <div class="doctor__text">
      <p class="label" data-reveal="fade">${doctor.label}</p>
      <h2 class="h1 doctor__title" id="doctor-title" data-reveal="lines">${lines(doctor.title)}</h2>
      <p class="lead doctor__intro" data-reveal="fade">${doctor.intro}</p>
      ${factRows()}
      <div class="doctor__cta" data-reveal="fade">${linkArrow({ href: '/trajetoria/', text: doctor.cta })}</div>
    </div>
  </div>
</section>`;
