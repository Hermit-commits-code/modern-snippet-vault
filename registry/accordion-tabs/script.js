document.addEventListener('DOMContentLoaded', () => {
  const accordionContainer = document.querySelector('.vlt-accordion');

  if (accordionContainer) {
    accordionContainer.addEventListener('click', (event) => {
      const triggerButton = event.target.closest('.vlt-accordion-trigger');
      if (!triggerButton) return;

      const currentItem = triggerButton.closest('.vlt-accordion-item');
      const allItems = accordionContainer.querySelectorAll('.vlt-accordion-item');
      const isCurrentlyOpen = currentItem.classList.contains('open');

      // 1. Collapse all open panel siblings smoothly
      allItems.forEach((item) => {
        item.classList.remove('open');
        const btn = item.querySelector('.vlt-accordion-trigger');
        const content = item.querySelector('.vlt-accordion-content');
        if (btn && content) {
          btn.setAttribute('aria-expanded', 'false');
          content.setAttribute('aria-hidden', 'true');
        }
      });

      // 2. Toggle active focus state on targeted elements
      if (!isCurrentlyOpen) {
        currentItem.classList.add('open');
        triggerButton.setAttribute('aria-expanded', 'true');
        const activeContent = currentItem.querySelector('.vlt-accordion-content');
        if (activeContent) {
          activeContent.setAttribute('aria-hidden', 'false');
        }
      }
    });
  }
});
