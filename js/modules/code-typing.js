const escapeHtml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function highlightCode(value) {
  const tokenPattern =
    /('(?:\\.|[^'])*'|"(?:\\.|[^"])*"|<[^>\n]+>|\b(?:const|let|var|return|async|await|new|class|import|from|Bearer)\b|\b[\p{L}_$][\p{L}\p{N}_$]*(?=\s*:)|\b(?:true|false|null|undefined)\b|\b\d+\b|HTTP\/\d(?:\.\d)?\s+\d{3}\s+[A-Z]+|[={}[\]():,;])/gu;
  let output = '';
  let cursor = 0;
  for (const match of value.matchAll(tokenPattern)) {
    output += escapeHtml(value.slice(cursor, match.index));
    const token = match[0];
    let type = 'punctuation';
    if (/^['"]/.test(token)) {
      const remainder = value.slice(match.index + token.length);
      type = /^\s*:/.test(remainder) ? 'property' : 'string';
    } else if (/^</.test(token)) type = 'placeholder';
    else if (/^(?:const|let|var|return|async|await|new|class|import|from|Bearer)$/.test(token))
      type = 'keyword';
    else if (/^(?:true|false|null|undefined)$/.test(token)) type = 'literal';
    else if (/^\d+$/.test(token)) type = 'number';
    else if (/^HTTP\//.test(token)) type = 'status';
    else if (/^[\p{L}_$]/u.test(token)) type = 'property';
    output += `<span class="token-${type}">${escapeHtml(token)}</span>`;
    cursor = match.index + token.length;
  }
  return output + escapeHtml(value.slice(cursor));
}

function typeCode(pre) {
  if (pre.dataset.typingReady === 'true') return;
  pre.dataset.typingReady = 'true';
  const source = pre.dataset.typingCode ?? pre.textContent ?? '';
  const richCode = pre.innerHTML;
  const startedAt = performance.now();
  pre.setAttribute('aria-label', source.trim());
  pre.classList.add('is-typing');

  const frame = (now) => {
    const progress = Math.min((now - startedAt) / 2600, 1);
    const visibleCode = source.slice(0, Math.max(1, Math.floor(source.length * progress)));
    pre.innerHTML = highlightCode(visibleCode);
    if (progress < 1) requestAnimationFrame(frame);
    else {
      if (richCode.trim()) pre.innerHTML = richCode;
      else pre.innerHTML = highlightCode(source);
      pre.classList.remove('is-typing');
    }
  };
  requestAnimationFrame(frame);
}

export function initCodeTyping() {
  const blocks = [...document.querySelectorAll('.code-card pre, .code-window pre')];
  if (!blocks.length) return;
  if (
    matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    blocks.forEach((block) => {
      if (block.dataset.typingCode) block.innerHTML = highlightCode(block.dataset.typingCode);
    });
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        typeCode(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.35 },
  );
  blocks.forEach((block) => observer.observe(block));
}
