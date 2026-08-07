document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.vlt-navbar-toggle');
  const closeBtn = document.querySelector('.vlt-drawer-close-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.querySelector('.vlt-drawer-backdrop');

  function openMenu() {
    drawer.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    drawer.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  }

  // Bind click target execution streams securely
  if (toggleBtn && closeBtn && drawer && backdrop) {
    toggleBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
  }
});
