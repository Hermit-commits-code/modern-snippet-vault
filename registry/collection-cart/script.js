document.addEventListener('DOMContentLoaded', () => {
  const panelOpenBtn = document.getElementById('deck-toggle-action');
  const panelCloseBtn = document.getElementById('deck-close-btn');
  const panelBackdrop = document.getElementById('deck-backdrop-close');
  const drawerPanelContainer = document.getElementById('deck-drawer-panel');

  function openDrawerPanel() {
    if (!drawerPanelContainer) return;
    drawerPanelContainer.classList.add('open');
    drawerPanelContainer.setAttribute('aria-hidden', 'false');
    // For demo purposes, we automatically append a sample list item if the cart dashboard layout is empty
    mockAddItemToDeck();
  }

  function closeDrawerPanel() {
    if (!drawerPanelContainer) return;
    drawerPanelContainer.classList.remove('open');
    drawerPanelContainer.setAttribute('aria-hidden', 'true');
  }

  if (panelOpenBtn && panelCloseBtn && panelBackdrop) {
    panelOpenBtn.addEventListener('click', openDrawerPanel);
    panelCloseBtn.addEventListener('click', closeDrawerPanel);
    panelBackdrop.addEventListener('click', closeDrawerPanel);
  }

  // ==========================================================================
  // CARD DECK STATE DATA ITERATORS (MOCK SYSTEM FLOWS)
  // ==========================================================================
  let activeItemsList = [];

  function mockAddItemToDeck() {
    if (activeItemsList.length > 0) return;
    activeItemsList.push({ id: 'item-cyber', title: 'Cyberpunk Review Code' });
    syncDeckUI();
  }

  function syncDeckUI() {
    const itemsTarget = document.getElementById('deck-items-target');
    const emptyMsg = document.getElementById('deck-empty-message');
    const counterBadge = document.getElementById('deck-counter');
    const counterSummary = document.getElementById('deck-summary-count');

    if (!itemsTarget || !counterBadge || !counterSummary) return;

    // Update session counts
    counterBadge.innerText = activeItemsList.length;
    counterSummary.innerText = activeItemsList.length;

    // Clear and rebuild nodes
    const nodeItems = itemsTarget.querySelectorAll('.vlt-cart-item-node');
    nodeItems.forEach((n) => n.remove());

    if (activeItemsList.length === 0) {
      if (emptyMsg) emptyMsg.style.display = 'block';
      return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';

    activeItemsList.forEach((item) => {
      const rowItem = document.createElement('div');
      rowItem.className = 'vlt-cart-item-node';
      rowItem.innerHTML = `
        <span>📄 ${item.title}</span>
        <button class="vlt-cart-item-remove-btn" type="button">&times;</button>
      `;

      rowItem.querySelector('.vlt-cart-item-remove-btn').onclick = () => {
        activeItemsList = activeItemsList.filter((i) => i.id !== item.id);
        syncDeckUI();
      };
      itemsTarget.appendChild(rowItem);
    });
  }

  const clearBtn = document.getElementById('deck-clear-action');
  if (clearBtn) {
    clearBtn.onclick = () => {
      activeItemsList = [];
      syncDeckUI();
    };
  }
});
