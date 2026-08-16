export function initContact() {
  const section = document.querySelector('#contato');
  if (!section) return;

  const heading = section.querySelector('h2');
  const description = section.querySelector('.contact-card > p:not(.eyebrow)');
  const emailLink = section.querySelector('[data-email-link]');

  if (heading) heading.textContent = 'Vamos conversar?';
  if (description)
    description.textContent =
      'Estou disponível para oportunidades em desenvolvimento web, mobile e backend.';
  if (emailLink) {
    emailLink.href = 'mailto:cskadys@gmail.com?subject=Contato%20pelo%20portf%C3%B3lio';
    emailLink.removeAttribute('target');
    emailLink.removeAttribute('rel');
  }
}
