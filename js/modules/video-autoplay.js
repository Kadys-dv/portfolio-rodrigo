import { $ } from '../utils/dom.js';

export function initVideoAutoplay() {
  const video = $('[data-demo-autoplay]');
  if (!video) return;

  let visible = false;
  let started = false;
  let observer;

  const attemptPlay = async () => {
    if (!visible || started) return;
    video.muted = true;
    try {
      await video.play();
      started = true;
      observer?.unobserve(video);
    } catch {
      // O navegador pode recusar enquanto os metadados ainda estão carregando.
      // O evento canplay abaixo fará uma nova tentativa.
    }
  };

  video.addEventListener('canplay', attemptPlay);

  if (!('IntersectionObserver' in window)) {
    visible = true;
    attemptPlay();
    return;
  }

  observer = new IntersectionObserver((entries) => {
    visible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.2);
    if (!visible) return;
    attemptPlay();
  }, { threshold: [0.2] });

  observer.observe(video);
}
