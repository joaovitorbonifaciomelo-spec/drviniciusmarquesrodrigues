/**
 * Entrada. Ordem importa:
 *  1. UI essencial (funciona sem motion): header, menu, vídeo, acordeão, mapa, âncoras;
 *  2. se o movimento for permitido e as bibliotecas carregaram: scroll suave,
 *     cenas (palcos) e primitivas de reveal — todas dentro de um único
 *     gsap.matchMedia, que desfaz e refaz tudo ao cruzar breakpoints,
 *     mudar orientação ou ativar "reduzir movimento" no sistema;
 *  3. fontes carregadas → recalcula geometrias → aplica deep link.
 */
import { motionReady, html } from './core/env.js?v=mura6kw8';
import { registerEases } from './core/tokens.js?v=mura6kw8';
import { initScroll } from './core/scroll.js?v=mura6kw8';
import { initAnchors, applyInitialHash } from './core/anchors.js?v=mura6kw8';
import { initHeader } from './ui/header.js?v=mura6kw8';
import { initMenu } from './ui/menu.js?v=mura6kw8';
import { initVideo } from './ui/video.js?v=mura6kw8';
import { initAccordion } from './ui/accordion.js?v=mura6kw8';
import { initMap } from './ui/map.js?v=mura6kw8';
import { initReveals } from './motion/reveal.js?v=mura6kw8';
import { initMagnetic, initParallax } from './motion/interaction.js?v=mura6kw8';
import { initHeroAuthority } from './scenes/hero-authority.js?v=mura6kw8';
import { initCare } from './scenes/care.js?v=mura6kw8';
import { initPause } from './scenes/pause.js?v=mura6kw8';
import { initAreas } from './scenes/areas.js?v=mura6kw8';
import { initQuestions } from './scenes/questions.js?v=mura6kw8';
import { initClosing } from './scenes/closing.js?v=mura6kw8';

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
