import { $ } from '../utils/dom.js';

export function initCertifications() {
  const grid = $('[data-cert-grid]');
  const button = $('[data-cert-more]');
  button?.addEventListener('click', () => {
    const expanded = grid?.classList.toggle('expanded') ?? false;
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? 'Mostrar menos certificados' : 'Ver todos os 18 certificados';
  });
}
