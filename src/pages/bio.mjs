/**
 * /bio/ — interface entre intenção e ação.
 *
 * Uma tela imersiva única: o vídeo vertical é o ambiente inteiro da página
 * (full-bleed, 100svh), não um recorte ao lado da interface. A UI — nome,
 * especialidades, pergunta e três destinos — fica sobre o filme, legível
 * por um véu cinematográfico (mais forte embaixo, quase ausente no meio,
 * onde o rosto precisa respirar), nunca por um painel opaco.
 *
 * PRESENÇA → IDENTIFICAÇÃO → AÇÃO. A Linha de Orientação nasce perto do
 * nome, atravessa a pergunta e organiza os três destinos, apontando o que
 * a pessoa toca — sem competir com o vídeo. Nada disso atrasa a navegação
 * (scripts/bio.js).
 */
import { html, attrs } from '../../tools/lib/html.mjs';
import { bareLayout, registryLine } from '../components/layout.mjs';
import { wordmark } from '../components/wordmark.mjs';
import { mediaFor } from '../components/media.mjs';
import { icon } from '../components/ui.mjs';
import { bio } from '../content/bio.mjs';
import { site } from '../content/site.mjs';

const seg = () => html`<span class="bseg" aria-hidden="true"><span class="bseg__fill"></span></span>`;

/** Miolo do item — idêntico para o link real e para o botão que abre o sheet. */
const actionInner = (a) => html`
    <span class="bact__tick" aria-hidden="true"></span>
    <span class="bact__text">
      <span class="bact__title">${a.title}</span>
      <span class="bact__detail">${a.detail}</span>
    </span>
    <span class="bact__go" aria-hidden="true"><span class="bact__stem"></span>${a.external ? icon.arrowOut() : icon.arrow()}</span>
    ${a.opens ? html`<span class="sr-only"> (${a.opens})</span>` : ''}`;

const action = (a, i) => {
  const el = a.sheet
    ? html`<button${attrs({
        type: 'button',
        class: 'bact__link',
        'data-dest': a.id,
        'data-dest-at': 'actions',
        'data-sheet-open': a.id,
        'aria-haspopup': 'dialog',
        'aria-expanded': 'false',
        'aria-controls': `sheet-${a.id}`,
      })}>${actionInner(a)}</button>`
    : html`<a${attrs({
        class: 'bact__link',
        href: a.href || a.fallback,
        'data-dest': a.id,
        'data-dest-at': 'actions',
        'data-pending': a.href ? null : '',
      })}>${actionInner(a)}</a>`;
  return html`<li class="bact${a.primary ? ' bact--primary' : ''}" data-row="${i + 1}">${seg()}${el}</li>`;
};

/** Bottom sheet local — hoje só "Como chegar" (Vivenza). Não navega. */
const sheet = (a) => {
  if (!a.sheet) return '';
  const p = a.panel;
  const q = p.mapsQuery;
  return html`<div class="bsheet" id="sheet-${a.id}" data-sheet="${a.id}" hidden>
  <div class="bsheet__backdrop" data-sheet-close aria-hidden="true"></div>
  <div class="bsheet__panel" role="dialog" aria-modal="true" aria-labelledby="sheet-${a.id}-title" tabindex="-1">
    <span class="bsheet__handle" aria-hidden="true"></span>
    <button class="bsheet__close" type="button" data-sheet-close aria-label="Fechar">
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M1.5 1.5l13 13M14.5 1.5l-13 13" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>
    </button>

    <p class="label bsheet__label">${p.label}</p>
    <h2 class="bsheet__brand" id="sheet-${a.id}-title">${p.brand}</h2>

    <div class="bsheet__block">
      <span class="oline oline--y bsheet__rule" aria-hidden="true"></span>
      <address class="bsheet__address">${p.address.building}<br>${p.address.line1}<br>${p.address.line2}</address>
      ${p.phone.href
        ? html`<a class="bsheet__phone" href="${p.phone.href}"${attrs({ 'data-dest': 'phone', 'data-dest-at': 'sheet' })}>${p.phone.label}</a>`
        : html`<p class="bsheet__phone">${p.phone.label}</p>`}
    </div>

    ${q
      ? html`<div class="bsheet__map" data-sheet-map data-maps-query="${encodeURIComponent(q)}"></div>`
      : html`<div class="bsheet__map bsheet__map--pending" role="img" aria-label="Mapa indisponível: endereço a confirmar"></div>`}

    <div class="bsheet__actions">
      ${p.directionsHref
        ? html`<a class="bsheet__cta bsheet__cta--primary" href="${p.directionsHref}" target="_blank" rel="noopener"${attrs({ 'data-dest': a.id, 'data-dest-at': 'sheet-maps' })}><span>Abrir no Google Maps</span>${icon.arrowOut()}<span class="sr-only"> (abre em nova aba)</span></a>`
        : html`<span class="bsheet__cta bsheet__cta--primary" aria-disabled="true"><span>Abrir no Google Maps</span>${icon.arrowOut()}</span>`}
      ${p.phone.href
        ? html`<a class="bsheet__cta bsheet__cta--ghost" href="${p.phone.href}"${attrs({ 'data-dest': 'phone', 'data-dest-at': 'sheet-call' })}><span>Ligar</span>${icon.arrow()}</a>`
        : ''}
    </div>
  </div>
</div>`;
};

const body = () => html`<div class="bio" id="top" tabindex="-1" data-bio>
<a class="skip" href="#acoes">Pular para as ações</a>

<div class="bio-stage" data-video-host aria-hidden="true">
  <div class="bio-stage__inner">${mediaFor('bioVideo', { priority: true, sizes: '100vw' })}</div>
  <span class="bio-veil" aria-hidden="true"></span>
</div>

<main class="bio-main">

  <header class="bio-top">
    <a class="bio-brand" href="/" aria-label="Dr. Vinicius Marques Rodrigues — site"${attrs({ 'data-dest': 'website', 'data-dest-at': 'brand' })}>${wordmark({ layout: 'stack', cls: 'bio-wm' })}</a>
    <p class="bio-specialties" aria-label="Especialidades">
      ${bio.specialties.map((s, i) => html`${i ? html`<span class="bio-specialties__dot" aria-hidden="true">•</span>` : ''}<span>${s}</span>`)}
    </p>
  </header>

  <p class="bio-context" aria-hidden="true">
    ${bio.actions.map((a) => html`<span data-for="${a.id}">${a.context}</span>`)}
  </p>

  <div class="bio-pin">
    <section class="bio-decide" id="acoes" aria-labelledby="bio-q" tabindex="-1">
      <h1 class="bio-q" id="bio-q">${seg()}<span class="bio-q__tick" aria-hidden="true"></span>${bio.question}</h1>
      <nav aria-label="Ações">
        <ul class="bio-actions">${bio.actions.map(action)}</ul>
      </nav>
    </section>

    <footer class="bio-foot">
      <p class="bio-registry">${registryLine()}</p>
      <p class="bio-copy">© ${new Date().getFullYear()} ${site.name}. Todos os direitos reservados.</p>
    </footer>
  </div>

</main>

<button class="bio-toggle" type="button" data-video-toggle aria-pressed="false">
  <span class="bio-toggle__icon bio-toggle__icon--pause">${icon.pause()}</span>
  <span class="bio-toggle__icon bio-toggle__icon--play">${icon.play()}</span>
  <span class="sr-only" data-video-toggle-label>Pausar vídeo</span>
</button>

${bio.actions.map(sheet)}

</div>`;

export default () => [
  {
    path: bio.path,
    html: bareLayout({
      title: bio.title,
      description: bio.description,
      path: bio.path,
      page: 'bio',
      bundle: 'bio',
      script: 'bio.js',
      body: body(),
    }),
  },
];
