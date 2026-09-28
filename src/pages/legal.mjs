/** Política de Privacidade + 404. */
import { html, ph } from '../../tools/lib/html.mjs';
import { layout } from '../components/layout.mjs';
import { pageIntro } from '../components/page-intro.mjs';
import { linkArrow } from '../components/ui.mjs';
import { site } from '../content/site.mjs';

export default () => [
  {
    path: '/privacidade/',
    html: layout({
      title: `Política de Privacidade — ${site.name}`,
      path: '/privacidade/',
      body: html`
        ${pageIntro({ label: 'Institucional', title: 'Política de Privacidade', crumb: { href: '/', label: 'Início' } })}
        <section class="legal prose">
          <p>${ph('Texto da Política de Privacidade (LGPD) — fornecido pelo responsável jurídico')}</p>
        </section>
      `,
    }),
  },
  {
    path: '/404',
    html: layout({
      title: `Página não encontrada — ${site.name}`,
      path: '/404',
      body: html`
        ${pageIntro({ label: 'Erro 404', title: ['Esta página', 'não foi encontrada.'], lead: 'O endereço pode ter mudado. O caminho de volta é simples.' })}
        <section class="legal">${linkArrow({ href: '/', text: 'Voltar ao início' })}</section>
      `,
    }),
  },
];
