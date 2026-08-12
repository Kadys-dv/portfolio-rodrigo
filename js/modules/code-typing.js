function createTypingLayer(pre) {
  if (pre.dataset.typingReady === 'true') return null;
  pre.dataset.typingReady = 'true';
  const layer = document.createElement('pre');
  layer.className = 'typing-layer';
  layer.setAttribute('aria-hidden', 'true');
  pre.insertAdjacentElement('afterend', layer);
  return layer;
}

function typeCode(pre) {
  const layer = createTypingLayer(pre);
  if (!layer) return;
  const source = pre.textContent ?? '';
  const richCode = pre.innerHTML;
  const startedAt = performance.now();
  pre.classList.add('typing-source');
  layer.classList.add('is-typing');
  const frame = now => {
    const progress = Math.min((now - startedAt) / 2600, 1);
    layer.textContent = source.slice(0, Math.max(1, Math.floor(source.length * progress)));
    if (progress < 1) requestAnimationFrame(frame);
    else {
      layer.innerHTML = richCode;
      layer.classList.remove('is-typing');
    }
  };
  requestAnimationFrame(frame);
}

export function initCodeTyping() {
  const blocks = [...document.querySelectorAll('.code-card pre, .code-window pre')];
  if (!blocks.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      typeCode(entry.target);
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.35 });
  blocks.forEach(block => observer.observe(block));
}
