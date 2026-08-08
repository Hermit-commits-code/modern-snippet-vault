document.addEventListener('DOMContentLoaded', () => {
  const dropZoneElement = document.getElementById('drop-zone-container');
  const hiddenFileInput = document.getElementById('raw-file-input');
  const outputFeedList = document.getElementById('file-output-feed-list');

  if (dropZoneElement && hiddenFileInput && outputFeedList) {
    // 1. Delegate click actions straight into the hidden file input element channel
    dropZoneElement.addEventListener('click', () => hiddenFileInput.click());

    // 2. Intercept browser defaults for dragging operations
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      dropZoneElement.addEventListener(eventName, (event) => event.preventDefault());
    });

    // 3. Mount visual highlighting states on drag entering parameters
    ['dragenter', 'dragover'].forEach((eventName) => {
      dropZoneElement.addEventListener(eventName, () => {
        dropZoneElement.classList.add('drag-over-highlight');
      });
    });

    // 4. Wipe visual highlighting states on drag leaving exit streams
    ['dragleave', 'drop'].forEach((eventName) => {
      dropZoneElement.addEventListener(eventName, () => {
        dropZoneElement.classList.remove('drag-over-highlight');
      });
    });

    // 5. Extract file data blocks on screen landing drops
    dropZoneElement.addEventListener('drop', (event) => {
      const droppedFiles = event.dataTransfer.files;
      processUploadedFiles(droppedFiles);
    });

    // 6. Extract file data blocks on standard file system manual clicks
    hiddenFileInput.addEventListener('change', (event) => {
      const selectedFiles = event.target.files;
      processUploadedFiles(selectedFiles);
    });
  }

  function processUploadedFiles(fileList) {
    if (!outputFeedList) return;

    Array.from(fileList).forEach((file) => {
      // Build metadata list item tracking row parameters
      const fileRowNode = document.createElement('li');
      fileRowNode.className = 'vlt-uploaded-file-node';

      // Compute human-readable file size dimensions mathematically (KB outputs)
      const computedFileSizeKb = (file.size / 1024).toFixed(1);

      fileRowNode.innerHTML = `
        <span>📄 ${file.name}</span>
        <span class="vlt-file-node-meta-size">${computedFileSizeKb} KB</span>
      `;

      outputFeedList.appendChild(fileRowNode);
    });
  }
});
