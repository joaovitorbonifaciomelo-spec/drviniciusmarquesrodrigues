/**
 * Tokens de motion lidos do CSS (styles/tokens.css) — uma única fonte.
 * As curvas cubic-bezier viram eases nomeados do GSAP: 'orient', 'inout', 'calm'.
 */
const root = document.documentElement;

export const cssVar = (name) => getComputedStyle(root).getPropertyValue(name).trim();

/** Duração em segundos: dur(3) → --dur-3 */
export const dur = (n) => parseFloat(cssVar(`--dur-${n}`)) / 1000 || 0.6;

export function registerEases() {
  const { CustomEase, gsap } = window;
  if (!CustomEase) return;
  gsap.registerPlugin(CustomEase);
  for (const name of ['orient', 'inout', 'calm']) {
    const m = cssVar(`--ease-${name}`).match(/cubic-bezier\(([^)]+)\)/);
    if (!m) continue;
    const [a, b, c, d] = m[1].split(',').map((n) => parseFloat(n));
    CustomEase.create(name, `M0,0 C${a},${b} ${c},${d} 1,1`);
  }
}

/** Margem lateral atual em px (para recortes que respeitam o grid). */
export const marginPx = () => {
  const probe = document.createElement('div');
  probe.style.cssText = 'position:absolute;visibility:hidden;width:var(--margin)';
  document.body.appendChild(probe);
  const w = probe.getBoundingClientRect().width;
  probe.remove();
  return w;
};
