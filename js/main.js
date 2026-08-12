import { $ } from './utils/dom.js';
import { initNavigation } from './modules/navigation.js';
import { initTheme } from './modules/theme.js';
import { initShowcase } from './modules/showcase.js';
import { initCertifications } from './modules/certifications.js';
import { initReveal } from './modules/reveal.js';
import { initVideoAutoplay } from './modules/video-autoplay.js?v=20260811-3';

document.documentElement.classList.add('js');

initNavigation();
initTheme();
initShowcase();
initCertifications();
initReveal();
initVideoAutoplay();

const year = $('[data-year]');
if (year) year.textContent = new Date().getFullYear();
