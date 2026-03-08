(function() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const btn = nav.querySelector('.nav-toggle');
  const menu = nav.querySelector('#primary-menu');
  if (!btn || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    menu.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  };

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    if (isOpen) closeMenu(); else openMenu();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('open')) return;
    if (nav.contains(e.target)) return; // click inside nav
    closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();
