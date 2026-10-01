/**
 * COMO CUIDAMOS — percurso em cinco etapas.
 *
 * Fallback/mobile: lista vertical com a Linha de Orientação à esquerda.
 * Desktop com movimento: palco sticky; o título ativo ocupa o centro, o
 * anterior sobe e perde contraste, o próximo espera abaixo; imagens entram
 * por recorte; o trilho à esquerda mostra onde você está no raciocínio.
 */
import { html } from '../../tools/lib/html.mjs';
import { care } from '../content/home.mjs';
import { mediaFor, mediaMeta } from '../components/media.mjs';
import { cta } from '../components/ui.mjs';
import { bookingHref } from '../content/site.mjs';

/* O frame segue a foto, não o contrário: cada etapa tem seu master com
   proporção própria (ver content/media.mjs), então o aspect-ratio do
   .care__figure vem de custom properties por instância em vez de um
   valor fixo compartilhado entre as cinco etapas. */
const figureRatioVars = (s) => {
  const m = mediaMeta(s.media);
  const d = `${m.width} / ${m.height}`;
  const mb = m.mobile ? `${m.mobile.width} / ${m.mobile.height}` : d;
  return `--figure-ratio-desktop:${d};--figure-ratio-mobile:${mb}`;
};

export const careSection = () => html`<section class="care" id="como-cuidamos" data-scene="care" data-scene-desktop data-chapter="${care.chapter}" data-header-tone="dark" aria-labelledby="care-title">
  <div class="care__panel" data-care-panel>
    <div class="care__track" data-care-track>
      <div class="care__stage" data-care-stage>

        <div class="care__head">
          <h2 class="label care__label" id="care-title" data-reveal="fade">${care.label}</h2>
          <p class="care__intro" data-reveal="fade">${care.intro}</p>
        </div>

        <nav class="care__rail" aria-label="Etapas do percurso">
          <span class="care__rail-track" aria-hidden="true"><span class="care__rail-fill" data-care-fill></span></span>
          <ol>
            ${care.steps.map(
              (s, i) => html`<li><a href="#cuidado-${i + 1}" data-care-jump="${i}"><span class="care__rail-tick" aria-hidden="true"></span><span class="care__rail-text">${s.short}</span></a></li>`
            )}
          </ol>
        </nav>

        <ol class="care__steps">
          ${care.steps.map(
            (s, i) => html`<li class="care__step" id="cuidado-${i + 1}" data-care-step>
            <span class="care__stem" aria-hidden="true"><span class="care__stem-fill" data-care-stem></span></span>
            <span class="care__node" aria-hidden="true"></span>
            <h3 class="care__title" data-care-title data-reveal="line"><span class="ln"><span class="ln__i">${s.title}</span></span></h3>
            <div class="care__body" data-care-body>
              <p class="care__text" data-reveal="fade">${s.text}</p>
              ${s.cta ? html`<div class="care__cta" data-reveal="fade">${cta({ href: bookingHref(), text: 'Agendar consulta', variant: 'light' })}</div>` : ''}
            </div>
            <figure class="care__figure" data-care-figure data-reveal="media" style="${figureRatioVars(s)}">
              <div class="care__figure-inner">${mediaFor(s.media, { sizes: '(min-width: 1024px) 34vw, 100vw' })}</div>
            </figure>
          </li>`
          )}
        </ol>

      </div>
    </div>
  </div>
</section>`;
