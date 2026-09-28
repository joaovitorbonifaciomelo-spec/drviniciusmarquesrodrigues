/**
 * Template helpers — zero dependências.
 *
 * `html` é um tagged template que escapa todo valor interpolado,
 * exceto os marcados com `raw()` (HTML já confiável, ex.: outro `html`).
 * Arrays são concatenados; null/undefined/false não renderizam nada.
 */

export class Raw {
  constructor(value) {
    this.value = String(value);
  }
  toString() {
    return this.value;
  }
}

export const raw = (value) => new Raw(value);

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);

const render = (v) => {
  if (v === null || v === undefined || v === false) return '';
  if (v instanceof Raw) return v.value;
  if (Array.isArray(v)) return v.map(render).join('');
  if (typeof v === 'object' && v.__placeholder) return placeholderMarkup(v).value;
  return esc(v);
};

export const html = (strings, ...values) =>
  raw(strings.reduce((out, s, i) => out + s + (i < values.length ? render(values[i]) : ''), ''));

/** Atributos opcionais: attrs({ id: 'x', hidden: true, 'aria-label': null }) */
export const attrs = (obj) =>
  raw(
    Object.entries(obj)
      .filter(([, v]) => v !== null && v !== undefined && v !== false)
      .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`))
      .join('')
  );

/* ------------------------------------------------------------------ *
 * Placeholders de conteúdo factual
 * Qualquer dado que ainda não foi fornecido/confirmado é declarado com
 * `ph('descrição')`. Ele renderiza visualmente identificado no site e
 * é listado no relatório de build (`npm run build` → "Placeholders").
 * ------------------------------------------------------------------ */
export const placeholderRegistry = new Set();

export const ph = (label) => ({ __placeholder: true, label });
export const isPh = (v) => Boolean(v && typeof v === 'object' && v.__placeholder);

export const placeholderMarkup = (p) => {
  placeholderRegistry.add(p.label);
  return raw(`<span class="ph" data-placeholder title="Placeholder — substituir">[${esc(p.label)}]</span>`);
};

/** Texto puro de um valor que pode ser placeholder (para atributos/meta). */
export const text = (v) => (isPh(v) ? `[${v.label}]` : String(v ?? ''));

/** Divide um array de linhas autorais em spans com máscara (reveal por linha). */
export const lines = (arr, cls = '') =>
  html`${arr.map(
    (l, i) =>
      html`<span class="ln ${cls}"><span class="ln__i">${l}</span></span>${i < arr.length - 1 ? raw(' ') : ''}`
  )}`;
