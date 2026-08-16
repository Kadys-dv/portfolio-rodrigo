import { $, $$ } from '../utils/dom.js';

export function initShowcase() {
  const screen = $('[data-screen]');
  $$('[data-image]').forEach((button) =>
    button.addEventListener('click', () => {
      if (!screen) return;
      screen.src = button.dataset.image;
      screen.alt = button.dataset.alt;
      $$('[data-image]').forEach((item) => item.classList.toggle('active', item === button));
    }),
  );
}
