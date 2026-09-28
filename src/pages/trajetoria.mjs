/** TRAJETÓRIA (S04) */
import { html, ph } from '../../tools/lib/html.mjs';
import { layout } from '../components/layout.mjs';
import { pageIntro } from '../components/page-intro.mjs';
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
        ${pageIntro({
          label: 'Trajetória',
          title: ['Uma trajetória', 'construída com profundidade.'],
          crumb: { href: '/', label: 'Início' },
        })}
        <section class="bio" aria-label="Formação e atuação">
          <figure class="bio__portrait" data-reveal="media"><div class="bio__portrait-inner">${mediaFor('portrait', { sizes: '(min-width: 1024px) 40vw, 100vw' })}</div></figure>
          <div class="bio__text">
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
