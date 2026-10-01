/**
 * HERO → AUTORIDADE PRÓXIMA
 *
 * Um único "palco". Sem JS / movimento reduzido / mobile: duas partes em
 * fluxo normal (hero 100svh + seção editorial). Desktop com movimento: o palco
 * fica sticky e a cena (scripts/scenes/hero-authority.js) transforma o vídeo
 * do hero no recorte da direita — o mesmo elemento, não uma troca de seção.
 *
 * A Linha de Orientação nasce aqui: o indicador de scroll do hero É o trilho
 * do percurso Conhecimento → Compreensão → Critério → Direção.
 */
import { html, lines } from '../../tools/lib/html.mjs';
import { hero, authority } from '../content/home.mjs';
import { mediaFor } from '../components/media.mjs';
import { cta, icon } from '../components/ui.mjs';
import { bookingHref } from '../content/site.mjs';

export const heroAuthority = () => html`<section class="ha" id="inicio" data-scene="hero-authority" data-scene-desktop aria-labelledby="hero-title">
  <div class="ha__stage" data-ha-stage>

    <div class="ha__hero" data-header-tone="dark" data-chapter="">
      <div class="ha__media" data-ha-media data-header-tone="dark">
        <div class="ha__media-inner" data-ha-media-inner>${mediaFor('heroVideo', { priority: true })}</div>
        <div class="ha__shade" data-ha-shade aria-hidden="true"></div>
      </div>

      <div class="ha__content">
        <p class="label ha__eyebrow" data-ha-eyebrow>${hero.eyebrow.map((e, i) => html`${i ? html`<span class="ha__dot" aria-hidden="true">•</span>` : ''}<span>${e}</span>`)}</p>
        <h1 class="display ha__title" id="hero-title" data-ha-title>${lines(hero.title)}</h1>
        <div class="ha__foot" data-ha-foot>
          <p class="ha__lead">${hero.lead}</p>
          ${cta({ href: bookingHref(), text: hero.cta, variant: 'light', cls: 'ha__cta' })}
        </div>
      </div>

      <span class="ha__cue" aria-hidden="true"><span class="ha__cue-run"></span></span>
      <button class="ha__toggle" type="button" data-video-toggle aria-pressed="false">
        <span class="ha__toggle-icon ha__toggle-icon--pause">${icon.pause()}</span>
        <span class="ha__toggle-icon ha__toggle-icon--play">${icon.play()}</span>
        <span class="ha__toggle-label" data-video-toggle-label>Pausar vídeo</span>
      </button>
    </div>

    <div class="ha__auth" id="autoridade" data-header-tone="light" data-chapter="${authority.chapter}" aria-labelledby="auth-title">
      <div class="ha__auth-grid">
        <div class="ha__auth-text">
          <p class="label ha__auth-label" data-ha-label data-reveal="fade">${authority.label}</p>
          <h2 class="h1 ha__auth-title" id="auth-title">
            <span class="ln" data-ha-a data-reveal="line"><span class="ln__i">${authority.titleA}</span></span>
            <span class="ln ha__auth-b" data-ha-b data-reveal="line"><span class="ln__i">${authority.titleB}</span></span>
          </h2>
          <p class="lead ha__auth-copy" data-ha-copy data-reveal="fade">${authority.copy}</p>
        </div>

        <div class="path" data-path>
          <span class="path__track" aria-hidden="true" data-path-track>
            <span class="path__fill" data-path-fill></span>
            <span class="path__hint" data-path-hint></span>
          </span>
          <ol class="path__list" aria-label="Da profundidade à direção">
            ${authority.path.map(
              (step, i, all) => html`<li class="path__item${i === all.length - 1 ? ' path__item--end' : ''}" data-path-item>
              <span class="path__tick" aria-hidden="true"></span>
              <span class="path__text">${step}</span>
              ${i === all.length - 1 ? html`<span class="path__marker" aria-hidden="true">${icon.arrow()}</span>` : ''}
            </li>`
            )}
          </ol>
        </div>

        <figure class="ha__figure" data-ha-slot data-reveal="media">
          <div class="ha__figure-inner">${mediaFor('listening', { sizes: '(min-width: 1024px) 40vw, 100vw' })}</div>
        </figure>
      </div>
    </div>

  </div>
</section>`;
