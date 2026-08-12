import { $ } from '../utils/dom.js';

const EMAIL = 'cskadys@gmail.com';

export function initContact() {
  const button = $('[data-copy-email]');
  const feedback = $('[data-copy-feedback]');
  if (!button || !feedback) return;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      feedback.textContent = 'E-mail copiado. Agora é só colar na sua mensagem.';
      button.textContent = 'E-mail copiado ✓';
    } catch {
      feedback.textContent = `Copie este endereço: ${EMAIL}`;
    }
  });
}
