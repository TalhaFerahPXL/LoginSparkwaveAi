



    function uploadImages() {
    const files = document.getElementById('fileInput').files;
    const settingsDiv = document.querySelector('.Settings');

    settingsDiv.innerHTML = '';

    Array.from(files).forEach(file => {
    const reader = new FileReader();

    reader.onload = function(e) {
    const imgElement = document.createElement('img');
    imgElement.src = e.target.result;
    imgElement.style.width = '100px';
    imgElement.style.height = 'auto';
    imgElement.style.margin = '10px';
    settingsDiv.appendChild(imgElement);
};

    reader.readAsDataURL(file);
});
}

