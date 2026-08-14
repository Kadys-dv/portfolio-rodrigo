import { $ } from './utils/dom.js';
import { initNavigation } from './modules/navigation.js';
import { initTheme } from './modules/theme.js?v=20260811-2';
import { initShowcase } from './modules/showcase.js';
import { initCertifications } from './modules/certifications.js';
import { initReveal } from './modules/reveal.js';
import { initVideoAutoplay } from './modules/video-autoplay.js?v=20260811-3';
import { initServiceStatus } from './modules/service-status.js?v=20260812-1';
import { initCodeTyping } from './modules/code-typing.js?v=20260812-3';

document.documentElement.classList.add('js');

initNavigation();
initTheme();
initShowcase();
initCertifications();
initReveal();
initVideoAutoplay();
initServiceStatus();
initCodeTyping();

const ritmoraxShowcase = document.querySelector('[data-ritmorax-showcase]');
if (ritmoraxShowcase) {
  const screens = [...ritmoraxShowcase.querySelectorAll('.ritmorax-screen')];
  let current = 0;
  setInterval(() => {
    screens[current].classList.remove('active');
    current = (current + 1) % screens.length;
    screens[current].classList.add('active');
  }, 3200);
}

const year = $('[data-year]');
if (year) year.textContent = new Date().getFullYear();
