/**
 * ENCERRAMENTO — não um banner: o ponto de chegada.
 * Todas as aparições da Linha de Orientação conduzem para cá: ela desce
 * do topo do painel e termina no CTA.
 */
import { html, lines } from '../../tools/lib/html.mjs';
import { closing } from '../content/home.mjs';
import { site } from '../content/site.mjs';
import { mediaFor } from '../components/media.mjs';
import { cta, contactLink } from '../components/ui.mjs';

export const closingSection = () => html`<section class="closing" id="contato" data-scene="closing" data-chapter="${closing.chapter}" data-header-tone="dark" aria-labelledby="closing-title">
  <div class="closing__panel" data-closing-panel>
    <div class="closing__bg" aria-hidden="true">${mediaFor('closing', { decorative: true })}</div>
    <span class="closing__line" data-closing-line aria-hidden="true"></span>
    <span class="closing__branch" data-closing-branch aria-hidden="true"></span>
    <div class="closing__inner">
      <h2 class="display closing__title" id="closing-title" data-reveal="lines">${lines(closing.title)}</h2>
      <p class="lead closing__copy" data-reveal="fade">${closing.copy}</p>
      <div class="closing__cta" data-reveal="fade" data-closing-cta>${cta({ href: site.booking.href || '#contato-canais', text: closing.cta, variant: 'light', cls: 'cta--large' })}</div>
      <ul class="closing__channels" id="contato-canais" data-reveal="fade">
        <li><span class="closing__channel-label">WhatsApp</span>${contactLink(site.contact.whatsapp)}</li>
        <li><span class="closing__channel-label">Telefone</span>${contactLink(site.contact.phone)}</li>
      </ul>
    </div>
  </div>
</section>`;

