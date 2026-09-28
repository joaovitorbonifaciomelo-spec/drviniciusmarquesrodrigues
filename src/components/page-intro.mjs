/**
 * Abertura de páginas internas: label + título + linha que desce até o
 * conteúdo (a mesma Linha de Orientação, em versão curta).
 */
import { html, lines } from '../../tools/lib/html.mjs';

export const pageIntro = ({ label, title, lead = null, crumb = null }) => html`<header class="pintro" data-header-tone="light">
  ${crumb ? html`<nav class="pintro__crumb" aria-label="Você está em"><a href="${crumb.href}">${crumb.label}</a></nav>` : ''}
  <p class="label" data-reveal="fade">${label}</p>
  <h1 class="h1 pintro__title" data-reveal="lines">${lines(Array.isArray(title) ? title : [title])}</h1>
  ${lead ? html`<p class="lead pintro__lead" data-reveal="fade">${lead}</p>` : ''}
  <span class="oline oline--y pintro__line" data-line="draw" aria-hidden="true"></span>
</header>`;
