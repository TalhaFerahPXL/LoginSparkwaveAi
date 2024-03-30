
document.addEventListener("DOMContentLoaded", function() {
    const sidebarContainer = document.getElementById('sidebar');
    if (sidebarContainer) {
        fetch('Sidebar.html')
            .then(response => response.text())
            .then(data => sidebarContainer.innerHTML = data);
    }
});


window.addEventListener('load', function() {
    var preloader = document.getElementById('preloader');
    preloader.style.display = 'none';

    document.getElementById("main").style.display = 'flex'


});


