/**
 * Assinatura — Dr. Vinicius Marques Rodrigues.
 *
 * Dois símbolos (nome + sobrenome) permitem as duas configurações oficiais
 * do Brandbook ("Uma assinatura. Diferentes contextos."):
 *   · principal  → empilhada (data-layout="stack")
 *   · horizontal → em linha, sobrenome reduzido e alinhado à linha de base (data-layout="row")
 * A troca é feita só com transform (ver components/wordmark.css), então o
 * header pode "reorganizar" a assinatura ao compactar sem redesenhá-la.
 * Cor: currentColor (Azul Profundo sobre Marfim / Marfim sobre Azul Profundo).
 */
import { html, raw, attrs } from '../../tools/lib/html.mjs';
import { NAME_D, SUB_D } from './wordmark-paths.mjs';

/** Sprite inserido uma vez por página (logo após <body>). */
export const wordmarkSprite = () => html`<svg class="sprite" width="0" height="0" aria-hidden="true" focusable="false">
  <symbol id="wm-name" viewBox="267.39 0 1558.99 221.71"><path fill="currentColor" d="${raw(NAME_D)}"/></symbol>
  <symbol id="wm-sub" viewBox="14.78 326.72 2061.15 119.33"><path fill="currentColor" d="${raw(SUB_D)}"/></symbol>
</svg>`;

export const wordmark = ({ layout = 'stack', cls = '', label = 'Dr. Vinicius Marques Rodrigues', flip = false } = {}) => html`<span${attrs({
  class: `wm ${cls}`.trim(),
  'data-layout': layout,
  role: 'img',
  'aria-label': label,
})}>
  <svg${attrs({ class: 'wm__name', viewBox: '0 0 1558.99 221.71', 'aria-hidden': 'true', focusable: 'false', 'data-flip': flip || null })}><use href="#wm-name" width="1558.99" height="221.71"/></svg>
  <svg${attrs({ class: 'wm__sub', viewBox: '0 0 2061.15 119.33', 'aria-hidden': 'true', focusable: 'false', 'data-flip': flip || null })}><use href="#wm-sub" width="2061.15" height="119.33"/></svg>
</span>`;
