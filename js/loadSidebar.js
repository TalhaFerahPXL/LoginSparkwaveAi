// Dit is loadSidebar.js
document.addEventListener("DOMContentLoaded", function() {
    const sidebarContainer = document.getElementById('sidebar');
    if (sidebarContainer) {
        fetch('Sidebar.html')
            .then(response => response.text())
            .then(data => sidebarContainer.innerHTML = data);
    }
});
