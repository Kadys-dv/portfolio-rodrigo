import { $ } from './utils/dom.js';
import { initNavigation } from './modules/navigation.js';
import { initTheme } from './modules/theme.js';
import { initShowcase } from './modules/showcase.js';
import { initCertifications } from './modules/certifications.js';
import { initReveal } from './modules/reveal.js';

document.documentElement.classList.add('js');

initNavigation();
initTheme();
initShowcase();
initCertifications();
initReveal();

const year = $('[data-year]');
if (year) year.textContent = new Date().getFullYear();
