/**
 * Entrada. Ordem importa:
 *  1. UI essencial (funciona sem motion): header, menu, vídeo, acordeão, mapa, âncoras;
 *  2. se o movimento for permitido e as bibliotecas carregaram: scroll suave,
 *     cenas (palcos) e primitivas de reveal — todas dentro de um único
 *     gsap.matchMedia, que desfaz e refaz tudo ao cruzar breakpoints,
 *     mudar orientação ou ativar "reduzir movimento" no sistema;
 *  3. fontes carregadas → recalcula geometrias → aplica deep link.
 */
import { motionReady, html } from './core/env.js?v=mux8gq7l';
import { registerEases } from './core/tokens.js?v=mux8gq7l';
import { initScroll } from './core/scroll.js?v=mux8gq7l';
import { initAnchors, applyInitialHash } from './core/anchors.js?v=mux8gq7l';
import { initHeader } from './ui/header.js?v=mux8gq7l';
import { initMenu } from './ui/menu.js?v=mux8gq7l';
import { initVideo } from './ui/video.js?v=mux8gq7l';
import { initAccordion } from './ui/accordion.js?v=mux8gq7l';
import { initMap } from './ui/map.js?v=mux8gq7l';
import { initReveals } from './motion/reveal.js?v=mux8gq7l';
import { initMagnetic, initParallax } from './motion/interaction.js?v=mux8gq7l';
import { initHeroAuthority } from './scenes/hero-authority.js?v=mux8gq7l';
import { initCare } from './scenes/care.js?v=mux8gq7l';
import { initPause } from './scenes/pause.js?v=mux8gq7l';
import { initAreas } from './scenes/areas.js?v=mux8gq7l';
import { initQuestions } from './scenes/questions.js?v=mux8gq7l';
import { initClosing } from './scenes/closing.js?v=mux8gq7l';

const header = initHeader();
initMenu();
initVideo();
initAccordion();
initMap();
initAnchors();
initAreas();
initQuestions();

if (motionReady()) {
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  registerEases();
  ScrollTrigger.config({ ignoreMobileResize: true });
  initScroll();

  const mm = gsap.matchMedia();
  // Cenas primeiro (marcam seus palcos), depois as primitivas.
  initHeroAuthority(mm);
  initCare(mm);
  initPause(mm);
  initClosing(mm);
  initReveals(mm);
  initParallax(mm);
  initMagnetic(mm);

  window.__motionReady = true;
  html.classList.add('motion-ready');

  document.fonts?.ready.then(() => {
    ScrollTrigger.refresh();
    header?.update();
    applyInitialHash();
  });
} else {
  // Sem movimento: layout estático completo, nenhum estado oculto.
  html.classList.remove('motion');
  html.classList.add('intro-done');
  initClosing(null);
  window.__motionReady = true;
  document.fonts?.ready.then(applyInitialHash);
}
