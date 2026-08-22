import { initCertifications } from './modules/certifications.js';
import { initCodeTyping } from './modules/code-typing.js?v=20260812-3';
import { initContact } from './modules/contact.js?v=20260815-1';
import { initEngineeringRefresh } from './modules/engineering-refresh.js?v=20260822-1';
import { initMotion } from './modules/motion.js?v=20260815-1';
import { initNavigation } from './modules/navigation.js';
import { initReveal } from './modules/reveal.js';
import { initServiceStatus } from './modules/service-status.js?v=20260812-1';
import { initShowcase } from './modules/showcase.js';
import { initTheme } from './modules/theme.js?v=20260811-2';
import { initVideoAutoplay } from './modules/video-autoplay.js?v=20260811-3';
import { $ } from './utils/dom.js';

document.documentElement.classList.add('js');

initNavigation();
initTheme();
initShowcase();
initCertifications();
initEngineeringRefresh();
initReveal();
initVideoAutoplay();
initServiceStatus();
initCodeTyping();
initContact();
initMotion();

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

const dashboardHeroImage = document.querySelector(
  '.project-page .case-hero .case-cover img[src*="matchhub/dashboard.png"]',
);
if (dashboardHeroImage) {
  document.body.classList.add('matchhub-dashboard-study');
  dashboardHeroImage.src = '../assets/matchhub/dashboard-login.png';
  dashboardHeroImage.alt = 'Tela de login segura do MatchHub Dashboard';
  dashboardHeroImage.classList.add('study-dashboard-screen');
}

const dashboardStudyImages = [
  ...document.querySelectorAll(
    '.project-page .case-section .case-cover img[src*="matchhub/dashboard.png"]',
  ),
];
if (dashboardStudyImages.length) {
  const screens = [
    { src: '../assets/matchhub/dashboard.png', alt: 'Visão geral do MatchHub Dashboard' },
    {
      src: '../assets/matchhub/dashboard-login.png',
      alt: 'Tela de login segura do MatchHub Dashboard',
    },
    { src: '../assets/matchhub/partidas.png', alt: 'Gestão de partidas no MatchHub Dashboard' },
    { src: '../assets/matchhub/atletas.png', alt: 'Gestão de atletas no MatchHub Dashboard' },
    { src: '../assets/matchhub/moderacao.png', alt: 'Área de moderação no MatchHub Dashboard' },
    {
      src: '../assets/matchhub/relatorios.png',
      alt: 'Relatórios operacionais no MatchHub Dashboard',
    },
  ];
  dashboardStudyImages.forEach((image) => {
    let current = 0;
    image.src = screens[current].src;
    image.alt = screens[current].alt;
    image.classList.add('study-dashboard-screen');
    setInterval(() => {
      image.classList.add('is-switching');
      window.setTimeout(() => {
        current = (current + 1) % screens.length;
        image.src = screens[current].src;
        image.alt = screens[current].alt;
        image.classList.remove('is-switching');
      }, 180);
    }, 3600);
  });
}

const year = $('[data-year]');
if (year) year.textContent = new Date().getFullYear();
