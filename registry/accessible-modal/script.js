// Native DOM Interaction Handler
document.addEventListener('click', (event) => {
  // Capture clicks targeting trigger actions
  const triggerButton = event.target.closest('[data-modal-target]');
  if (triggerButton) {
    const targetModalId = triggerButton.getAttribute('data-modal-target');
    const modalElement = document.getElementById(targetModalId);
    if (modalElement) {
      modalElement.showModal(); // Built-in method that locks focus safely
    }
  }

  // Capture close clicks inside active dialog sheets
  if (
    event.target.closest('.vlt-dialog-close-btn') ||
    event.target.closest('.vlt-dialog-close-action')
  ) {
    const openModal = event.target.closest('dialog');
    if (openModal) {
      openModal.close(); // Built-in method that releases layout focuses
    }
  }
});
