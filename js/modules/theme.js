import { $ } from '../utils/dom.js';

const STORAGE_KEY = 'portfolio-theme';

export function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;

  const button = $('[data-theme-toggle]');
  const updateButtonState = () => button?.setAttribute(
    'aria-pressed',
    String(document.documentElement.dataset.theme === 'dark'),
  );

  updateButtonState();
  button?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(STORAGE_KEY, nextTheme);
    updateButtonState();
  });
}
