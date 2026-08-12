function typeCode(pre) {
  if (pre.dataset.typingReady === 'true') return;
  pre.dataset.typingReady = 'true';
  const source = pre.textContent ?? '';
  const richCode = pre.innerHTML;
  const startedAt = performance.now();
  pre.setAttribute('aria-label', source.trim());
  pre.classList.add('is-typing');

  const frame = now => {
    const progress = Math.min((now - startedAt) / 2600, 1);
    pre.textContent = source.slice(0, Math.max(1, Math.floor(source.length * progress)));
    if (progress < 1) requestAnimationFrame(frame);
    else {
      pre.innerHTML = richCode;
      pre.classList.remove('is-typing');
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
