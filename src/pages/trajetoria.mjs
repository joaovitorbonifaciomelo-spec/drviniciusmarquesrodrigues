/** TRAJETÓRIA (S04)
 *
 * No mobile, a sequência editorial é foto → título → texto (uma única
 * leitura contínua). No desktop é a mesma composição de sempre: crumb +
 * label + título em largura cheia, depois retrato (sticky) e texto lado a
 * lado. Uma única grade (.traj) com `order` no mobile e grid-column/row no
 * desktop evita redesenhar a página — só reordena visualmente.
 */
import { html, lines, ph } from '../../tools/lib/html.mjs';
import { layout } from '../components/layout.mjs';
import { mediaFor } from '../components/media.mjs';
import { cta } from '../components/ui.mjs';
import { factRows } from '../sections/doctor.mjs';
import { site, bookingHref } from '../content/site.mjs';

export default () => [
  {
    path: '/trajetoria/',
    html: layout({
      title: `Trajetória — ${site.name}`,
      path: '/trajetoria/',
      body: html`
        <section class="traj" data-header-tone="light" aria-label="Trajetória">
          <nav class="pintro__crumb traj__crumb" aria-label="Você está em"><a href="/">Início</a></nav>
          <figure class="bio__portrait traj__portrait" data-reveal="media"><div class="bio__portrait-inner">${mediaFor('portrait', { sizes: '(min-width: 1024px) 40vw, 100vw' })}</div></figure>
          <p class="label traj__label" data-reveal="fade">Trajetória</p>
          <h1 class="h1 pintro__title traj__title" data-reveal="lines">${lines(['Uma trajetória', 'construída com profundidade.'])}</h1>
          <span class="oline oline--y pintro__line traj__line" data-line="draw" aria-hidden="true"></span>
          <div class="bio__text traj__text">
            <div class="prose" data-reveal="fade">
              <p>${ph('Biografia editorial — escrever a partir de informações confirmadas pelo Dr. Vinicius (formação, percurso, atuação atual, produção científica quando houver)')}</p>
            </div>
            <h2 class="label bio__label" data-reveal="fade">Formação e atuação</h2>
            ${factRows()}
            <div class="bio__cta" data-reveal="fade">${cta({ href: bookingHref(), text: 'Agendar consulta', variant: 'solid' })}</div>
          </div>
        </section>
      `,
    }),
  },
];
