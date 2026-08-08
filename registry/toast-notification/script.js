document.addEventListener('DOMContentLoaded', () => {
  const triggerButton = document.getElementById('trigger-toast-btn');
  const containerAnchor = document.getElementById('toast-anchor-zone');

  if (triggerButton && containerAnchor) {
    triggerButton.addEventListener('click', () => {
      createToastNotification('Action successfully completed.');
    });
  }

  function createToastNotification(messageText) {
    // 1. Build the outer wrapper div container
    const toastNode = document.createElement('div');
    toastNode.className = 'vlt-toast-item';

    // 2. Populate structure with embedded vector templates and dynamic string interpolation
    toastNode.innerHTML = `
      <div class="vlt-toast-content">
        <svg class="vlt-toast-icon-check" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        <span>${messageText}</span>
      </div>
      <button class="vlt-toast-close-x" aria-label="Dismiss message">&times;</button>
    </header>
    `;

    // 3. Mount close button interaction loops straight onto this specific notification
    const closeBtn = toastNode.querySelector('.vlt-toast-close-x');
    closeBtn.addEventListener('click', () => dismissToast(toastNode));

    // 4. Append child object directly inside active display zones
    containerAnchor.appendChild(toastNode);

    // 5. Establish automatic fallback lifetime limits (4000ms duration)
    setTimeout(() => {
      dismissToast(toastNode);
    }, 4000);
  }

  function dismissToast(toastElement) {
    // Safety break to check if element has already been dropped
    if (!toastElement || toastElement.classList.contains('exit')) return;

    // Attach exit transition styling trigger rules
    toastElement.classList.add('exit');

    // Wait for the exit animation duration before wiping element records completely
    toastElement.addEventListener('animationend', (event) => {
      if (event.animationName === 'vltToastFadeOut') {
        toastElement.remove();
      }
    });
  }
});
