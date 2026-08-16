const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCounter(element) {
  const target = Number(element.dataset.countTo);
  const suffix = element.dataset.countSuffix ?? '';
  if (!Number.isFinite(target)) return;
  if (reducedMotion()) {
    element.textContent = `${target}${suffix}`;
    return;
  }

  const startedAt = performance.now();
  const duration = 620;
  const render = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    element.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(render);
  };
  element.textContent = `0${suffix}`;
  requestAnimationFrame(render);
}

function initCounters() {
  const counters = [...document.querySelectorAll('[data-count-to]')];
  if (!counters.length) return;
  if (reducedMotion() || !('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }),
    { threshold: 0.7 },
  );
  counters.forEach((counter) => observer.observe(counter));
}

function initProjectSequence() {
  const projects = document.querySelectorAll(
    '.case-study, .api-case, .helpdesk-case, .ritmorax-case',
  );
  projects.forEach((project) => {
    const copy = project.querySelector('.case-copy, .api-copy, .helpdesk-copy, .ritmorax-copy');
    if (!copy) return;
    [...copy.querySelectorAll('h3, h4, .project-metrics, .project-links')].forEach(
      (element, index) => {
        element.classList.add('motion-step');
        element.style.setProperty('--motion-delay', `${index * 85}ms`);
      },
    );
  });
}

function initTimeline() {
  const items = [...document.querySelectorAll('.career-timeline li')];
  if (!items.length || reducedMotion() || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-active');
        observer.unobserve(entry.target);
      }),
    { threshold: 0.45 },
  );
  items.forEach((item) => observer.observe(item));
}

export function initMotion() {
  if (reducedMotion()) return;
  document.documentElement.classList.add('motion-ready');
  initProjectSequence();
  initCounters();
  initTimeline();
}
