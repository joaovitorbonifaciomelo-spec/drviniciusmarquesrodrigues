/** ÁREA DE ATUAÇÃO (S08) — uma página por especialidade. */
import { html, lines } from '../../tools/lib/html.mjs';
import { layout } from '../components/layout.mjs';
import { pageIntro } from '../components/page-intro.mjs';
import { mediaFor } from '../components/media.mjs';
import { cta, linkArrow } from '../components/ui.mjs';
import { areas } from '../content/areas.mjs';
import { questions } from '../content/home.mjs';
import { site, bookingHref } from '../content/site.mjs';

const page = (a) => {
  const others = areas.filter((x) => x !== a);
  return html`
    ${pageIntro({ label: 'Área de atuação', title: a.title, lead: a.lead, crumb: { href: '/#atuacao', label: 'Áreas de atuação' } })}
    <section class="spec" aria-labelledby="spec-sit">
      <figure class="spec__media" data-reveal="media"><div class="spec__media-inner">${mediaFor(a.media, { sizes: '(min-width: 1024px) 40vw, 100vw' })}</div></figure>
      <div class="spec__body">
        <p class="spec__summary" data-reveal="fade">${a.summary}</p>
        <h2 class="label" id="spec-sit" data-reveal="fade">Situações em que uma avaliação pode ajudar</h2>
        <ul class="spec__list">
          ${a.situations.map((s) => html`<li data-reveal="row"><span class="oline oline--x" data-line="draw" aria-hidden="true"></span>${s}</li>`)}
        </ul>
        ${a.review ? html`<p class="note" data-reveal="fade">Conteúdo informativo em revisão clínica. Não substitui avaliação médica individual.</p>` : ''}
        <div class="spec__cta" data-reveal="fade">${cta({ href: bookingHref(), text: 'Agendar consulta', variant: 'solid' })}</div>
      </div>
    </section>
    <section class="spec-next" aria-label="Outras áreas">
      <p class="spec-next__q h2" data-reveal="lines">${lines(questions.closing)}</p>
      <ul class="spec-next__list">
        ${others.map((o) => html`<li data-reveal="row">${linkArrow({ href: `/atuacao/${o.slug}/`, text: o.title })}</li>`)}
      </ul>
    </section>
  `;
};

export default () =>
  areas.map((a) => ({
    path: `/atuacao/${a.slug}/`,
    html: layout({
      title: `${a.title} — ${site.name}`,
      description: a.summary,
      path: `/atuacao/${a.slug}/`,
      body: page(a),
    }),
  }));
