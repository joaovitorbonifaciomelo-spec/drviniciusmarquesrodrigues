/**
 * PERGUNTAS DO PACIENTE — mudança de perspectiva.
 * A voz passa a ser do paciente (Newsreader itálico). A pergunta mais
 * próxima do centro da tela fica em foco; as demais perdem contraste
 * (sem cair abaixo de 3:1 — texto grande). Um marcador na linha à
 * esquerda acompanha a pergunta ativa. Não é um FAQ.
 */
import { html, lines } from '../../tools/lib/html.mjs';
import { questions } from '../content/home.mjs';

export const questionsSection = () => html`<section class="questions" id="perguntas" data-scene="questions" data-chapter="${questions.chapter}" data-header-tone="light" data-bg="warm" aria-labelledby="questions-title">
  <div class="questions__head">
    <p class="label" data-reveal="fade">${questions.label}</p>
    <h2 class="h1 questions__title" id="questions-title" data-reveal="lines">${lines(questions.title)}</h2>
  </div>

  <div class="questions__body">
    <span class="questions__rail" aria-hidden="true">
      <span class="oline oline--y questions__rail-line" data-line="draw"></span>
      <span class="questions__marker" data-q-marker></span>
    </span>
    <ul class="questions__list">
      ${questions.items.map(
        (q) => html`<li class="question" data-q>
        <p class="question__text">${lines(q)}</p>
      </li>`
      )}
    </ul>
    <p class="questions__closing h1" data-q data-q-closing>${lines(questions.closing)}</p>
  </div>
</section>`;
