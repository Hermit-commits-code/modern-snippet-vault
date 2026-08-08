document.addEventListener('DOMContentLoaded', () => {
  const dropdownWrapper = document.querySelector('.vlt-dropdown-container');
  const triggerBtn = document.getElementById('dropdown-toggle');

  if (dropdownWrapper && triggerBtn) {
    // 1. Toggle visibility states on button clicks
    triggerBtn.addEventListener('click', (event) => {
      event.stopPropagation(); // Stops immediate bubble up trigger loops
      const isOpen = dropdownWrapper.classList.contains('open');

      if (isOpen) {
        dropdownWrapper.classList.remove('open');
        triggerBtn.setAttribute('aria-expanded', 'false');
      } else {
        dropdownWrapper.classList.add('open');
        triggerBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // 2. Automatically shut panel when clicking anywhere outside container fields
    document.addEventListener('click', (event) => {
      if (!dropdownWrapper.contains(event.target)) {
        dropdownWrapper.classList.remove('open');
        triggerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // 3. Close panel when escape key is pressed for keyboard parity
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        dropdownWrapper.classList.remove('open');
        triggerBtn.setAttribute('aria-expanded', 'false');
        triggerBtn.focus();
      }
    });
  }
});
