document.addEventListener('DOMContentLoaded', () => {
  const triggerBtn = document.getElementById('open-panel-btn');
  const closeBtn = document.getElementById('close-panel-btn');
  const drawerShell = document.getElementById('side-drawer');
  const overlayBackdrop = document.getElementById('drawer-backdrop');

  function showDrawer() {
    if (!drawerShell) return;
    drawerShell.classList.add('active');
    drawerShell.setAttribute('aria-hidden', 'false');
  }

  function hideDrawer() {
    if (!drawerShell) return;
    drawerShell.classList.remove('active');
    drawerShell.setAttribute('aria-hidden', 'true');
  }

  if (triggerBtn && closeBtn && overlayBackdrop) {
    triggerBtn.addEventListener('click', showDrawer);
    closeBtn.addEventListener('click', hideDrawer);
    overlayBackdrop.addEventListener('click', hideDrawer);
  }
});
