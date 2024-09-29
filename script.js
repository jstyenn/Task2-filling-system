const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const fileList = document.getElementById('fileList');
const uploadBox = document.getElementById('uploadBox');
const selectedFileDisplay = document.createElement('ul'); // Element to display selected files

let uploadedFiles = [];

// Add the selectedFileDisplay to the uploadBox
uploadBox.appendChild(selectedFileDisplay);

// Drag-and-drop feature
uploadBox.addEventListener('click', () => {
    fileInput.click();
});

uploadBox.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadBox.classList.add('dragging');
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('dragging');
});

uploadBox.addEventListener('drop', (event) => {
    event.preventDefault();
    uploadBox.classList.remove('dragging');
    const files = event.dataTransfer.files;
    handleFileSelection(files);
});

// When files are selected through input
fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    handleFileSelection(files);
});

// Handle multiple file selections (preview them before upload)
function handleFileSelection(files) {
    selectedFileDisplay.innerHTML = ''; // Clear previous list
    Array.from(files).forEach(file => {
        const fileItem = document.createElement('li');
        fileItem.textContent = file.name;
        selectedFileDisplay.appendChild(fileItem);
    });
}

// Event listener for the upload button
uploadButton.addEventListener('click', () => {
    const files = fileInput.files;
    if (files.length > 0) {
        handleFileUpload(files);
        clearUploadSection(); // Clear the upload section after uploading
    }
});

// Handle multiple file uploads (push them to the list)
function handleFileUpload(files) {
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const fileData = {
                name: file.name,
                content: event.target.result
            };
            uploadedFiles.push(fileData);
            updateFileList();
        };
        reader.readAsDataURL(file);
    });
}

// Clear the upload section after uploading
function clearUploadSection() {
    selectedFileDisplay.innerHTML = ''; // Clear the displayed list in the upload section
    fileInput.value = ''; // Reset the input field to allow re-uploading the same files later
}

function updateFileList() {
    fileList.innerHTML = '';
    uploadedFiles.forEach((file, index) => {
        const listItem = document.createElement('li');

        const fileLink = document.createElement('a');
        fileLink.textContent = file.name;
        fileLink.href = file.content;
        fileLink.download = file.name;
        fileLink.target = '_blank';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', () => {
            deleteFile(index);
        });

        listItem.appendChild(fileLink);
        listItem.appendChild(deleteButton);
        fileList.appendChild(listItem);
    });
}

function deleteFile(index) {
    uploadedFiles.splice(index, 1);
    updateFileList();
}
