document.addEventListener('DOMContentLoaded', function() {

    var urlParams = new URLSearchParams(window.location.search);

    var teamName = urlParams.get('name');


    if (teamName) {

        var teamNameElement = document.getElementById('teamName');

        teamNameElement.textContent = teamName;
    }
});

