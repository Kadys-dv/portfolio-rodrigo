import { $, $$ } from '../utils/dom.js';

export function initNavigation() {
  const header = $('[data-header]');
  const updateHeader = () => header?.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', updateHeader, {passive: true});
  updateHeader();

  const menuButton = $('[data-menu-button]');
  const menu = $('[data-menu]');
  menuButton?.addEventListener('click', () => {
    const open = menu?.classList.toggle('open') ?? false;
    menuButton.setAttribute('aria-expanded', String(open));
  });
  $$('[data-menu] a').forEach(link => link.addEventListener('click', () => {
    menu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));
}
