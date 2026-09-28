/**
 * CONTEÚDOS — composição de revista, não grid de cards.
 * Um conteúdo dominante (imagem + título grande) e uma coluna de leituras
 * secundárias só tipográficas, separadas por linhas.
 */
import { html, lines } from '../../tools/lib/html.mjs';
import { articlesIntro } from '../content/home.mjs';
import { articles, readingTime } from '../content/articles.mjs';
import { mediaFor } from '../components/media.mjs';
import { linkArrow, icon } from '../components/ui.mjs';

export const articleMeta = (a) =>
  html`<p class="meta"><span class="meta__cat">${a.category}</span><span class="meta__sep" aria-hidden="true"></span><span>${readingTime(a)}</span></p>`;

export const articlesSection = () => {
  const featured = articles.find((a) => a.featured) || articles[0];
  const rest = articles.filter((a) => a !== featured).slice(0, 3);
  return html`<section class="articles" id="conteudos" data-chapter="${articlesIntro.chapter}" data-header-tone="light" aria-labelledby="articles-title">
  <div class="articles__head">
    <p class="label" data-reveal="fade">${articlesIntro.label}</p>
    <h2 class="h1 articles__title" id="articles-title" data-reveal="lines">${lines(articlesIntro.title)}</h2>
  </div>

  <div class="articles__grid">
    <article class="feature" data-reveal="fade">
      <a class="feature__link" href="/conteudos/${featured.slug}/">
        <div class="feature__media" data-reveal="media"><div class="feature__media-inner">${mediaFor(featured.media, { sizes: '(min-width: 1024px) 55vw, 100vw', decorative: true })}</div></div>
        <div class="feature__text">
          ${articleMeta(featured)}
          <h3 class="feature__title">${featured.title}</h3>
          <p class="feature__dek">${featured.dek}</p>
          <span class="feature__go" aria-hidden="true">${icon.arrow()}</span>
        </div>
      </a>
    </article>

    <ul class="reads">
      ${rest.map(
        (a) => html`<li class="read" data-reveal="row">
        <span class="oline oline--x read__rule" data-line="draw" aria-hidden="true"></span>
        <a class="read__link" href="/conteudos/${a.slug}/">
          ${articleMeta(a)}
          <h3 class="read__title">${a.title}</h3>
          <span class="read__go" aria-hidden="true">${icon.arrow()}</span>
        </a>
      </li>`
      )}
      <li class="reads__all" data-reveal="fade">${linkArrow({ href: '/conteudos/', text: articlesIntro.cta })}</li>
    </ul>
  </div>
</section>`;
};
