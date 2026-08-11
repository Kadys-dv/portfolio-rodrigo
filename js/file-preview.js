if (location.protocol === 'file:') {
  document.documentElement.classList.add('js');

  addEventListener('DOMContentLoaded', () => {
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

    $$('.reveal').forEach(element => element.classList.add('visible'));
    $('[data-year]').textContent = new Date().getFullYear();

    const menu = $('[data-menu]');
    const menuButton = $('[data-menu-button]');
    menuButton?.addEventListener('click', () => {
      const open = menu?.classList.toggle('open') ?? false;
      menuButton.setAttribute('aria-expanded', String(open));
    });

    $('[data-theme]')?.addEventListener('click', () => {
      const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = nextTheme;
    });

    const screen = $('[data-screen]');
    $$('[data-image]').forEach(button => button.addEventListener('click', () => {
      if (!screen) return;
      screen.src = button.dataset.image;
      screen.alt = button.dataset.alt;
      $$('[data-image]').forEach(item => item.classList.toggle('active', item === button));
    }));

    const certGrid = $('[data-cert-grid]');
    const certButton = $('[data-cert-more]');
    certButton?.addEventListener('click', () => {
      const expanded = certGrid?.classList.toggle('expanded') ?? false;
      certButton.setAttribute('aria-expanded', String(expanded));
      certButton.textContent = expanded ? 'Mostrar menos certificados' : 'Ver todos os 18 certificados';
    });
  });
}
