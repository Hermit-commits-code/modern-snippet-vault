// ==========================================
// 1. Core Application State Variables
// ==========================================
let registry = []; // Holds the full array of components from json
let activeComponent = null; // Stores the currently selected component object
let activeTab = 'html'; // Keeps track of which code file extension is open
let loadedFiles = {
  // Caches the raw text code string for the preview
  html: '',
  css: '',
  js: '',
};

// ==========================================
// 2. Initial Application Boot Engine
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Read the central component manifest database file
    const response = await fetch('registry.json');
    const data = await response.json();
    registry = data.items;

    // Initial render showing all registered components in the menu
    renderComponentMenu('all');
    setupEventListeners();
  } catch (error) {
    console.error('Failed to initialize system registry library:', error);
  }
});

// ==========================================
// 3. UI Component Menu Filter Engine
// ==========================================
function renderComponentMenu(categoryFilter, searchString = '') {
  const menuContainer = document.getElementById('components-list');
  menuContainer.innerHTML = ''; // Wipe old elements before rebuilding

  // Filter components by active category tab AND keyword input search string
  const filteredItems = registry.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchString.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchString.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Regenerate list items dynamically onto the sidebar
  filteredItems.forEach((item) => {
    const componentButton = document.createElement('button');
    componentButton.className = 'comp-btn';
    componentButton.innerText = item.title;

    // Highlight the active button indicator state cleanly
    if (activeComponent && activeComponent.id === item.id) {
      componentButton.classList.add('active');
    }

    // Set click handler even targeting component loads
    componentButton.onclick = () => {
      // Toggle button active classes visually across sibling choices
      document.querySelectorAll('.comp-btn').forEach((btn) => btn.classList.remove('active'));
      componentButton.classList.add('active');
      loadComponent(item);
    };
    menuContainer.appendChild(componentButton);
  });
}

// ==========================================
// 4. File Reader & Sandbox Loading Engine
// ==========================================
async function loadComponent(item) {
  activeComponent = item;

  // Clear file caches completely between asset switches
  loadedFiles = { html: '', css: '', js: '' };

  // Update dashboard workspace header elements
  document.getElementById('active-title').innerText = item.title;
  document.getElementById('download-btn').disabled = false;

  // Process and pull code source buffers simultaneously from directory structures.
  const fileFetchPromises = item.files.map(async (fileName) => {
    const extension = fileName.split('.').pop(); // Resolves to 'html', 'css', 'js'
    try {
      const fileUrl = `registry/${item.id}/${fileName}`;
      const response = await fetch(fileUrl);
      loadedFiles[extension] = await response.text();
    } catch (error) {
      console.warn(`System missing file output stream at ${fileName}:`, error);
    }
  });
  // Wait until all assets resolve cleanly, then build representation.
  await Promise.all(fileFetchPromises);
  updateSandboxPreview();
  renderCodeTab();
}

function updateSandboxPreview() {
  const iframeElement = document.getElementById('sandbox-iframe');

  // Compile raw components into a temporary runtime bundle string
  const customDocumentString = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset='UTF-8'>
        <style>
          body{margin: 1rem; font-family: system-ui, sans-serif; background: #fafafa; color: #000;}
          ${loadedFiles.css}
        </style>
      </head>
      <body>
        ${loadedFiles.html}
        <script>${loadedFiles.js}</script>
      </body>
    <html>
  `;

  // Inject generated documents securely inside target isolated environments
  iframeElement.srcdoc = customDocumentString;
}

function renderCodeTab() {
  const codeBlockElement = document.getElementById('code-block');

  // Pull current language block from state cache memory
  const dynamicSourceCode = loadedFiles[activeTab];

  if (dynamicSourceCode) {
    codeBlockElement.innerText = dynamicSourceCode;
  } else {
    codeBlockElement.innerText = `/* No dedicated .${activeTab.toUpperCase()} code logic written for this asset */`;
  }
}

// ==========================================
// 5. Automated Zip Package Bundle Engine
// ==========================================
async function downloadComponentBundle() {
  if (!activeComponent) return;

  // Instantiate standard global class imported from Cloudflare JSZIP CDN
  const zipper = new JSZip();
  const componentFolder = zipper.folder(activeComponent.id);

  // Read current configuration matrices to pack targe bundle folders
  activeComponent.files.forEach((fileName) => {
    const extension = fileName.split('.').pop();
    const sourceStringData = loadedFiles[extension];

    // Inject files straight into the zip sub-archives dynamically
    if (sourceStringData) {
      componentFolder.file(fileName, sourceStringData);
    }
  });

  // Finalize raw folder packaging streams asynchronously inside browser layouts
  const generatedBlob = await zipper.generateAsync({ type: 'blob' });
  const temporaryDownloadUrl = URL.createObjectURL(generatedBlob);

  // Fire off automatic user machine disk saving pipelines safely
  const virtualAnchorLink = document.createElement('a');
  virtualAnchorLink.href = temporaryDownloadUrl;
  virtualAnchorLink.download = `${activeComponent.id}.zip`;
  virtualAnchorLink.click();

  // Clear runtime reference allocation records completely
  URL.revokeObjectURL(temporaryDownloadUrl);
}

// ==========================================
// 6. Global Action Event Binding Listeners
// ==========================================
function setupEventListeners() {
  // Real-time keyboard query string filter listeners
  document.getElementById('search-bar').addEventListener('input', (event) => {
    const currentActiveCategory = document.querySelector('.nav-item.active').dataset.cat;
    renderComponentMenu(currentActiveCategory, event.target.value);
  });

  // Component bundle downloading click element listener
  document.getElementById('download-btn').onclick = downloadComponentBundle;
  // Base sidebar navigation category switching handlers
  document.querySelectorAll('.nav-item').forEach((categoryButton) => {
    categoryButton.onclick = (event) => {
      // Manage visual configuration states across menu systems
      document.querySelectorAll('.nav-item').forEach((btn) => btn.classList.remove('active'));
      event.target.classList.add('active');

      // Re-filter menus based on selected criteria reset conditions
      const currentCategory = event.target.dataset.cat;
      const currentSearchString = document.getElementById('search-bar').value;
      renderComponentMenu(currentCategory, currentSearchString);
    };
  });

  // Source viewer code navigation tab layout elements
  document.querySelectorAll('.tab-btn').forEach((tabButton) => {
    tabButton.onclick = (event) => {
      document.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.remove('active'));
      event.target.classList.add('active');

      // Update global focus file extensions and force immediate string prints
      activeTab = event.target.dataset.file;
      renderCodeTab();
    };
  });
}
