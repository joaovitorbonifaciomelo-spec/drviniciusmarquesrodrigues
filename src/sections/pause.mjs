/**
 * PAUSA EDITORIAL — respiro de marca.
 * Sem CTA, sem card, sem explicação. A fotografia se abre a partir de um
 * recorte estreito; as três frases chegam devagar.
 */
import { html, lines } from '../../tools/lib/html.mjs';
import { pause } from '../content/home.mjs';
import { mediaFor } from '../components/media.mjs';

export const pauseSection = () => html`<section class="pause" data-scene="pause" data-scene-desktop data-header-tone="light" aria-label="${pause.label}">
  <div class="pause__track" data-pause-track>
    <div class="pause__stage" data-pause-stage>
      <div class="pause__media" data-pause-media data-header-tone="dark" data-reveal="media">
        <div class="pause__media-inner" data-pause-inner>${mediaFor('pause', { sizes: '100vw' })}</div>
        <div class="pause__shade" aria-hidden="true"></div>
      </div>
      <div class="pause__phrases">
        ${pause.phrases.map((p, i) => html`<p class="pause__phrase pause__phrase--${i + 1}" data-pause-phrase data-reveal="lines">${lines(p)}</p>`)}
      </div>
    </div>
  </div>
</section>`;
