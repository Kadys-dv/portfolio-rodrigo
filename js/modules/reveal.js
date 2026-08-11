import { $$ } from '../utils/dom.js';

export function initReveal() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $$('.reveal').forEach(element => element.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }), {threshold: .12});
  $$('.reveal').forEach(element => observer.observe(element));
}
