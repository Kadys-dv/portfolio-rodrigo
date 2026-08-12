import { $ } from '../utils/dom.js';

export function initVideoAutoplay() {
  const video = $('[data-demo-autoplay]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!video || reducedMotion || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.2);
    if (!visible) return;

    video.muted = true;
    video.play().catch(() => {});
    observer.unobserve(video);
  }, { threshold: [0.2] });

  observer.observe(video);
}
