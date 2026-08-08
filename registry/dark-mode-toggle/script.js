// Target the button directly using global window click listeners inside the frame
document.addEventListener('click', (event) => {
  const switchTrigger = event.target.closest('#theme-switcher-action');
  if (!switchTrigger) return;

  // Track the immediate component card box container node
  const cardContainer = event.target.closest('#theme-card-wrapper');
  if (!cardContainer) return;

  const matchesSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const hasManualDark = cardContainer.classList.contains('dark-override');
  const hasManualLight = cardContainer.classList.contains('light-override');

  // Simple state switching logic right on the component card classList array
  if ((matchesSystemDark && !hasManualLight) || hasManualDark) {
    cardContainer.classList.remove('dark-override');
    cardContainer.classList.add('light-override');
  } else {
    cardContainer.classList.remove('light-override');
    cardContainer.classList.add('dark-override');
  }
});
