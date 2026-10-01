/**
 * Primitivas de interface.
 * Setas desenhadas com traço de 1px — o mesmo peso da Linha de Orientação.
 */
import { html, attrs, isPh } from '../../tools/lib/html.mjs';

export const icon = {
  /** → navegação interna */
  arrow: () => html`<svg class="i i--arrow" viewBox="0 0 24 12" aria-hidden="true" focusable="false"><path d="M0 6h22.5M17.5 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1"/></svg>`,
  /** ↗ ação / saída */
  arrowOut: () => html`<svg class="i i--out" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M1.5 12.5 12.5 1.5M4.5 1.5h8v8" fill="none" stroke="currentColor" stroke-width="1"/></svg>`,
  /** ↑ topo */
  arrowUp: () => html`<svg class="i i--up" viewBox="0 0 12 24" aria-hidden="true" focusable="false"><path d="M6 23.5V1.5M1 6.5l5-5 5 5" fill="none" stroke="currentColor" stroke-width="1"/></svg>`,
  /** + / − (acordeão): as duas linhas são animadas em CSS */
  plus: () => html`<svg class="i i--plus" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path class="i__h" d="M0 8h16" stroke="currentColor" stroke-width="1"/><path class="i__v" d="M8 0v16" stroke="currentColor" stroke-width="1"/></svg>`,
  play: () => html`<svg class="i i--play" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 1.5v9l7.5-4.5z" fill="currentColor"/></svg>`,
  pause: () => html`<svg class="i i--pause" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M3 1.5v9M9 1.5v9" stroke="currentColor" stroke-width="1.5"/></svg>`,
  instagram: () => html`<svg class="i i--instagram" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="17.6" cy="6.4" r="0.9" fill="currentColor"/></svg>`,
};

/** Micro-label em Inter caixa-alta. */
export const label = (text, cls = '') => html`<p class="label ${cls}">${text}</p>`;

/**
 * CTA principal — derivado do MARCADOR do Brandbook (cápsula + seta).
 * O preenchimento cresce da esquerda (a seta "conduz" o gesto).
 */
export const cta = ({ href, text, external, variant = 'solid', cls = '', magnetic = true, attrs: extra = {} }) => {
  // Link absoluto (http...) = sai do site (WhatsApp, Instagram, Maps...) — nova aba.
  // Âncora/rota interna nunca começa com "http", então isso nunca falsa-positiva.
  const out = external ?? href?.startsWith('http');
  return html`<a${attrs({
    class: `cta cta--${variant} ${cls}`.trim(),
    href,
    'data-magnetic': magnetic || null,
    ...(out ? { target: '_blank', rel: 'noopener' } : {}),
    ...extra,
  })}><span class="cta__fill" aria-hidden="true"></span><span class="cta__text">${text}</span><span class="cta__icon">${icon.arrowOut()}</span>${out ? html`<span class="sr-only"> (abre em nova aba)</span>` : ''}</a>`;
};

/** Link editorial com seta — a linha da seta se estende no hover. */
export const linkArrow = ({ href, text, cls = '', attrs: extra = {} }) =>
  html`<a${attrs({ class: `link-arrow ${cls}`.trim(), href, ...extra })}><span class="link-arrow__text">${text}</span><span class="link-arrow__icon">${icon.arrow()}</span></a>`;

/**
 * Linha de Orientação — elemento base.
 * axis: 'x' | 'y' · mode: 'draw' (desenha ao entrar) | 'static' | 'scrub' (controlada por cena)
 */
export const oline = ({ axis = 'x', mode = 'draw', cls = '', origin = null } = {}) =>
  html`<span${attrs({
    class: `oline oline--${axis} ${cls}`.trim(),
    'data-line': mode,
    'data-origin': origin,
    'aria-hidden': 'true',
  })}></span>`;

/** Contato: renderiza link se houver href; placeholder marcado se não. */
export const contactLink = (c, cls = '') =>
  c.href && !isPh(c.label) ? html`<a class="${cls}" href="${c.href}">${c.label}</a>` : html`<span class="${cls}">${c.label}</span>`;
