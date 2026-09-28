/** CONTEÚDOS — índice (S05) + página de artigo (S07). */
import { html } from '../../tools/lib/html.mjs';
import { layout } from '../components/layout.mjs';
import { pageIntro } from '../components/page-intro.mjs';
import { mediaFor } from '../components/media.mjs';
import { cta, linkArrow, icon } from '../components/ui.mjs';
import { articles, formatDate } from '../content/articles.mjs';
import { site, bookingHref } from '../content/site.mjs';
import { articleMeta } from '../sections/articles.mjs';

const index = () => html`
  ${pageIntro({ label: 'Conteúdos', title: ['Informação para ajudar', 'você a entender melhor.'], crumb: { href: '/', label: 'Início' } })}
  <section class="archive" aria-label="Todos os conteúdos">
    <ul class="archive__list">
      ${articles.map(
        (a) => html`<li class="archive__item" data-reveal="row">
        <span class="oline oline--x" data-line="draw" aria-hidden="true"></span>
        <a class="archive__link" href="/conteudos/${a.slug}/">
          <span class="archive__date">${formatDate(a.date)}</span>
          <span class="archive__main">${articleMeta(a)}<span class="archive__title">${a.title}</span><span class="archive__dek">${a.dek}</span></span>
          <span class="archive__go" aria-hidden="true">${icon.arrow()}</span>
        </a>
      </li>`
      )}
    </ul>
  </section>
`;

const block = (b) => {
  if (b.p) return html`<p>${b.p}</p>`;
  if (b.h2) return html`<h2>${b.h2}</h2>`;
  if (b.quote) return html`<p class="prose__pull">${b.quote}</p>`;
  if (b.list) return html`<ul>${b.list.map((i) => html`<li>${i}</li>`)}</ul>`;
  return '';
};

const article = (a) => {
  const next = articles[(articles.indexOf(a) + 1) % articles.length];
  return html`
  <article class="post">
    <header class="post__head" data-header-tone="light">
      <nav class="pintro__crumb" aria-label="Você está em"><a href="/conteudos/">Conteúdos</a></nav>
      <div data-reveal="fade">${articleMeta(a)}</div>
      <h1 class="h1 post__title" data-reveal="fade">${a.title}</h1>
      <p class="lead post__dek" data-reveal="fade">${a.dek}</p>
      <p class="post__byline" data-reveal="fade">Por ${site.name} <span aria-hidden="true">·</span> <time datetime="${a.date}">${formatDate(a.date)}</time></p>
    </header>
    <figure class="post__media" data-reveal="media"><div class="post__media-inner">${mediaFor(a.media, { sizes: '100vw' })}</div></figure>
    <div class="post__body">
      <span class="oline oline--y post__line" data-line="draw" aria-hidden="true"></span>
      ${a.placeholder ? html`<p class="note">Texto demonstrativo — o conteúdo final será escrito e revisado pelo Dr. Vinicius.</p>` : ''}
      <div class="prose">${a.body.map(block)}</div>
      <aside class="post__cta" aria-label="Agendamento">
        <p class="h3">Quer entender a sua situação?</p>
        ${cta({ href: bookingHref(), text: 'Agendar consulta', variant: 'solid' })}
      </aside>
    </div>
    <nav class="post__next" aria-label="Próxima leitura">
      <p class="label">Próxima leitura</p>
      ${linkArrow({ href: `/conteudos/${next.slug}/`, text: next.title, cls: 'post__next-link' })}
    </nav>
  </article>
`;
};

export default () => [
  {
    path: '/conteudos/',
    html: layout({ title: `Conteúdos — ${site.name}`, path: '/conteudos/', body: index() }),
  },
  ...articles.map((a) => ({
    path: `/conteudos/${a.slug}/`,
    html: layout({ title: `${a.title} — ${site.name}`, description: a.dek, path: `/conteudos/${a.slug}/`, page: 'article', body: article(a) }),
  })),
];

