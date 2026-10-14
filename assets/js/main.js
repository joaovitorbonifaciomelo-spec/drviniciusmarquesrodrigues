/**
 * Entrada. Ordem importa:
 *  1. UI essencial (funciona sem motion): header, menu, vídeo, acordeão, mapa, âncoras;
 *  2. se o movimento for permitido e as bibliotecas carregaram: scroll suave,
 *     cenas (palcos) e primitivas de reveal — todas dentro de um único
 *     gsap.matchMedia, que desfaz e refaz tudo ao cruzar breakpoints,
 *     mudar orientação ou ativar "reduzir movimento" no sistema;
 *  3. fontes carregadas → recalcula geometrias → aplica deep link.
 */
import { motionReady, html } from './core/env.js?v=mv8a9ccf';
import { registerEases } from './core/tokens.js?v=mv8a9ccf';
import { initScroll } from './core/scroll.js?v=mv8a9ccf';
import { initAnchors, applyInitialHash } from './core/anchors.js?v=mv8a9ccf';
import { initHeader } from './ui/header.js?v=mv8a9ccf';
import { initMenu } from './ui/menu.js?v=mv8a9ccf';
import { initVideo } from './ui/video.js?v=mv8a9ccf';
import { initAccordion } from './ui/accordion.js?v=mv8a9ccf';
import { initMap } from './ui/map.js?v=mv8a9ccf';
import { initReveals } from './motion/reveal.js?v=mv8a9ccf';
import { initMagnetic, initParallax } from './motion/interaction.js?v=mv8a9ccf';
import { initHeroAuthority } from './scenes/hero-authority.js?v=mv8a9ccf';
import { initCare } from './scenes/care.js?v=mv8a9ccf';
import { initPause } from './scenes/pause.js?v=mv8a9ccf';
import { initAreas } from './scenes/areas.js?v=mv8a9ccf';
import { initQuestions } from './scenes/questions.js?v=mv8a9ccf';
import { initClosing } from './scenes/closing.js?v=mv8a9ccf';

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
