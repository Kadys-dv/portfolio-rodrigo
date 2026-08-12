import { $ } from '../utils/dom.js';

const STORAGE_KEY = 'portfolio-theme';

export function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;

  const button = $('[data-theme-toggle]');
  const label = $('[data-theme-label]');
  const updateButtonState = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    button?.setAttribute('aria-pressed', String(dark));
    button?.setAttribute('aria-label', `Tema atual: ${dark ? 'escuro' : 'claro'}. Ativar tema ${dark ? 'claro' : 'escuro'}.`);
    if (label) label.textContent = dark ? 'Tema escuro' : 'Tema claro';
  };

  updateButtonState();
  button?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(STORAGE_KEY, nextTheme);
    updateButtonState();
  });
}
