import { $ } from '../utils/dom.js';

export function initVideoAutoplay() {
  const video = $('[data-demo-autoplay]');
  if (!video) return;

  // Reforça a repetição em navegadores móveis que restauram o estado antigo
  // do elemento de vídeo a partir do cache da página.
  video.loop = true;

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
  video.addEventListener('ended', () => {
    video.currentTime = 0;
    video.play().catch(() => {});
  });

  if (!('IntersectionObserver' in window)) {
    visible = true;
    attemptPlay();
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      visible = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.2);
      if (!visible) return;
      attemptPlay();
    },
    { threshold: [0.2] },
  );

  observer.observe(video);
}
