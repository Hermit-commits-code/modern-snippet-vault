document.addEventListener('DOMContentLoaded', () => {
  const stepNodes = document.querySelectorAll('.vlt-timeline-step');
  const activeLineWire = document.getElementById('timeline-indicator-wire');
  const prevActionBtn = document.getElementById('prev-step-btn');
  const nextActionBtn = document.getElementById('next-step-btn');

  let currentActiveIndex = 1; // Default starting index track reference

  function updateWizardTimelineUI() {
    // 1. Synchronize individual state classes across circle nodes
    stepNodes.forEach((node, nodeIdx) => {
      const stepValue = nodeIdx + 1;

      if (stepValue < currentActiveIndex) {
        node.className = 'vlt-timeline-step complete';
      } else if (stepValue === currentActiveIndex) {
        node.className = 'vlt-timeline-step active';
      } else {
        node.className = 'vlt-timeline-step';
      }
    });

    // 2. Compute timeline connection track line widths mathematically
    const completedStepsCount = document.querySelectorAll('.vlt-timeline-step.complete').length;
    const pathStretchPercentage = (completedStepsCount / (stepNodes.length - 1)) * 100;

    if (activeLineWire) {
      activeLineWire.style.width = pathStretchPercentage + '%';
    }

    // 3. Manage control button disabling boundaries safely
    if (prevActionBtn && nextActionBtn) {
      prevActionBtn.disabled = currentActiveIndex === 1;

      if (currentActiveIndex === stepNodes.length) {
        nextActionBtn.innerText = 'Finish';
      } else {
        nextActionBtn.innerText = 'Next Step';
      }
    }
  }

  // Bind interaction event listeners to action elements
  if (nextActionBtn && prevActionBtn) {
    nextActionBtn.addEventListener('click', () => {
      if (currentActiveIndex < stepNodes.length) {
        currentActiveIndex++;
        updateWizardTimelineUI();
      }
    });

    prevActionBtn.addEventListener('click', () => {
      if (currentActiveIndex > 1) {
        currentActiveIndex--;
        updateWizardTimelineUI();
      }
    });
  }
});
