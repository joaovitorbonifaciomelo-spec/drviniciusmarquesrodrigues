/**
 * HOME — um filme editorial navegável.
 *
 * IMPACTO → SILÊNCIO → RITMO → HUMANO → RESPIRO → FUNÇÃO → EMPATIA
 * → CONHECIMENTO → LUGAR → AÇÃO
 */
import { html } from '../../tools/lib/html.mjs';
import { layout } from '../components/layout.mjs';
import { site } from '../content/site.mjs';
import { heroAuthority } from '../sections/hero-authority.mjs';
import { careSection } from '../sections/care.mjs';
import { doctorSection } from '../sections/doctor.mjs';
import { pauseSection } from '../sections/pause.mjs';
import { areasSection } from '../sections/areas.mjs';
import { questionsSection } from '../sections/questions.mjs';
import { articlesSection } from '../sections/articles.mjs';
import { vivenzaSection } from '../sections/vivenza.mjs';
import { closingSection } from '../sections/closing.mjs';

export default () => [
  {
    path: '/',
    html: layout({
      title: `${site.name} — Cardiologia, arritmias e eletrofisiologia`,
      path: '/',
      tone: 'dark',
      page: 'home',
      body: html`
        ${heroAuthority()}
        ${careSection()}
        ${doctorSection()}
        ${pauseSection()}
        ${areasSection()}
        ${questionsSection()}
        ${articlesSection()}
        ${vivenzaSection()}
        ${closingSection()}
      `,
    }),
  },
];
