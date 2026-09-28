/**
 * ÁREAS DE ATUAÇÃO — lista editorial.
 *
 * Duas interações, escolhidas pela capacidade do dispositivo (não só largura):
 *  · ponteiro fino + hover → lista de links; o item ativo desloca, a linha
 *    se desenha e uma imagem vertical acompanha o item (sem perseguir o cursor).
 *  · toque → acordeão acessível (botão + painel), com link para a página.
 * Os dois blocos existem no HTML; CSS mostra um ou outro.
 */
import { html, lines } from '../../tools/lib/html.mjs';
import { areasIntro } from '../content/home.mjs';
import { areas } from '../content/areas.mjs';
import { mediaFor } from '../components/media.mjs';
import { icon, linkArrow } from '../components/ui.mjs';

export const areasSection = () => html`<section class="areas" id="atuacao" data-scene="areas" data-chapter="${areasIntro.chapter}" data-header-tone="light" aria-labelledby="areas-title">
  <div class="areas__head">
    <p class="label" data-reveal="fade">${areasIntro.label}</p>
    <h2 class="h1 areas__title" id="areas-title" data-reveal="lines">${lines(areasIntro.title)}</h2>
  </div>

  <div class="areas__list areas__list--pointer" data-areas-pointer>
    <ul>
      ${areas.map(
        (a, i) => html`<li class="area" data-area="${i}" data-reveal="row">
        <a class="area__link" href="/atuacao/${a.slug}/" data-area-link="${i}" aria-describedby="area-desc-${i}">
          <span class="oline oline--x area__rule" data-line="draw" aria-hidden="true"></span>
          <span class="area__rule-active" aria-hidden="true"></span>
          <span class="area__title">${a.title}</span>
          <span class="area__go" aria-hidden="true"><span class="area__go-line"></span>${icon.arrow()}</span>
        </a>
        <p class="sr-only" id="area-desc-${i}">${a.summary}</p>
      </li>`
      )}
    </ul>
    <span class="oline oline--x area__rule area__rule--last" data-line="draw" aria-hidden="true"></span>
    <div class="areas__visual" data-areas-visual aria-hidden="true">
      ${areas.map((a, i) => html`<div class="areas__img" data-area-img="${i}">${mediaFor(a.media, { sizes: '18vw', decorative: true })}</div>`)}
      <div class="areas__detail">
        ${areas.map((a, i) => html`<p data-area-desc="${i}">${a.summary}</p>`)}
      </div>
    </div>
  </div>

  <div class="areas__list areas__list--touch" data-areas-touch>
    ${areas.map(
      (a, i) => html`<div class="acc" data-acc>
      <span class="oline oline--x acc__rule" data-line="draw" aria-hidden="true"></span>
      <h3 class="acc__heading">
        <button class="acc__btn" type="button" aria-expanded="false" aria-controls="area-panel-${i}" id="area-btn-${i}" data-acc-btn>
          <span class="acc__title">${a.title}</span>
          <span class="acc__icon">${icon.plus()}</span>
        </button>
      </h3>
      <div class="acc__panel" id="area-panel-${i}" role="region" aria-labelledby="area-btn-${i}" data-acc-panel>
        <div class="acc__panel-inner">
          <div class="acc__media">${mediaFor(a.media, { sizes: '100vw' })}</div>
          <p class="acc__desc">${a.summary}</p>
          ${linkArrow({ href: `/atuacao/${a.slug}/`, text: `Sobre ${a.title.toLowerCase()}` })}
        </div>
      </div>
    </div>`
    )}
    <span class="oline oline--x acc__rule" data-line="draw" aria-hidden="true"></span>
  </div>
</section>`;
