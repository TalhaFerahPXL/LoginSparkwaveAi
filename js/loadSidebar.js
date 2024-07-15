
document.addEventListener("DOMContentLoaded", function() {
    const sidebarContainer = document.getElementById('sidebar');
    if (sidebarContainer) {
        fetch('Sidebar.html')
            .then(response => response.text())
            .then(data => {
                sidebarContainer.innerHTML = data;




                let footer = document.getElementById("Footer");
                let footerContent = document.getElementById("Footer-Content");
                footerContent.style.display = "none";

                function hideFooterContent() {
                    footerContent.style.display = "none";
                    footer.style.borderRadius = "0";
                    footer.style.background = "";
                    document.getElementById("ChevronDown").style.display = "block";
                    document.getElementById("ChevronUp").style.display = "none";
                }


                footer.addEventListener("click", function(event) {
                    if (footerContent.style.display === "none") {
                        footerContent.style.display = "block";
                        footer.style.borderRadius = "9px";
                        footer.style.background = "#EDEDED";
                        document.getElementById("ChevronDown").style.display = "none";
                        document.getElementById("ChevronUp").style.display = "block";
                    } else {
                        hideFooterContent();
                    }
                    event.stopPropagation();
                });



                document.addEventListener("click", function(event) {
                    let isClickInsideFooterContent = footerContent.contains(event.target);

                    if (!isClickInsideFooterContent && footerContent.style.display === "block") {
                        hideFooterContent();
                    }
                });


                document.getElementById("BtnSignOut").addEventListener("click", ()=>{
                    window.location.href = "../index.html"
                })






                //Create new team START
                function createNewTeam(teamName) {
                    var teamsContainer = document.getElementById('teamsContainer');
                    var teamItem = document.createElement('div');
                    teamItem.className = 'TeamItem';
                    teamItem.setAttribute('data-team-name', teamName);
                    teamItem.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
    <path opacity="0.12" d="M1.83579 7.96078C1.6196 7.7446 1.5115 7.6365 1.4342 7.51036C1.36566 7.39852 1.31516 7.27658 1.28454 7.14904C1.25 7.00518 1.25 6.85231 1.25 6.54657L1.25 4.76593C1.25 4.46019 1.25 4.30732 1.28454 4.16346C1.31516 4.03591 1.36566 3.91398 1.4342 3.80214C1.5115 3.676 1.6196 3.5679 1.83579 3.35171L2.85171 2.33579C3.0679 2.1196 3.176 2.0115 3.30214 1.9342C3.41398 1.86566 3.53592 1.81516 3.66346 1.78454C3.80732 1.75 3.96019 1.75 4.26593 1.75L6.04657 1.75C6.35231 1.75 6.50518 1.75 6.64904 1.78454C6.77658 1.81516 6.89851 1.86566 7.01035 1.9342C7.1365 2.0115 7.2446 2.1196 7.46078 2.33579L12.2537 7.12868C12.9962 7.87121 13.3675 8.24248 13.5066 8.67059C13.6289 9.04717 13.6289 9.45282 13.5066 9.8294C13.3675 10.2575 12.9962 10.6288 12.2537 11.3713L10.8713 12.7537C10.1288 13.4962 9.75752 13.8675 9.3294 14.0066C8.95282 14.1289 8.54717 14.1289 8.17059 14.0066C7.74247 13.8675 7.37121 13.4962 6.62868 12.7537L1.83579 7.96078Z" fill="#3ABEF7"/>
    <path d="M5 5.5H5.00625M2.85171 2.33579L1.83579 3.35171C1.6196 3.5679 1.5115 3.676 1.4342 3.80214C1.36566 3.91398 1.31516 4.03591 1.28454 4.16346C1.25 4.30732 1.25 4.46019 1.25 4.76593L1.25 6.54657C1.25 6.85231 1.25 7.00518 1.28454 7.14904C1.31516 7.27658 1.36566 7.39852 1.4342 7.51036C1.5115 7.6365 1.6196 7.7446 1.83579 7.96078L6.62868 12.7537C7.37121 13.4962 7.74247 13.8675 8.17059 14.0066C8.54717 14.1289 8.95282 14.1289 9.3294 14.0066C9.75752 13.8675 10.1288 13.4962 10.8713 12.7537L12.2537 11.3713C12.9962 10.6288 13.3675 10.2575 13.5066 9.8294C13.6289 9.45282 13.6289 9.04717 13.5066 8.67059C13.3675 8.24248 12.9962 7.87121 12.2537 7.12868L7.46078 2.33579C7.2446 2.1196 7.1365 2.0115 7.01035 1.9342C6.89851 1.86566 6.77658 1.81516 6.64904 1.78454C6.50518 1.75 6.35231 1.75 6.04657 1.75L4.26593 1.75C3.96019 1.75 3.80732 1.75 3.66346 1.78454C3.53592 1.81516 3.41398 1.86566 3.30214 1.9342C3.176 2.0115 3.0679 2.1196 2.85171 2.33579ZM5.3125 5.5C5.3125 5.67259 5.17259 5.8125 5 5.8125C4.82741 5.8125 4.6875 5.67259 4.6875 5.5C4.6875 5.32741 4.82741 5.1875 5 5.1875C5.17259 5.1875 5.3125 5.32741 5.3125 5.5Z" stroke="#3ABEF7" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        <h3>${teamName}</h3> 
    `;

                    teamItem.addEventListener("click", function () {
                        window.location.href = "Team.html?name=" + encodeURIComponent(teamName);
                    });


                    if (teamsContainer.firstChild) {
                        teamsContainer.insertBefore(teamItem, teamsContainer.firstChild);
                    } else {
                        teamsContainer.appendChild(teamItem);
                    }
                }

                var createTeamButton = document.getElementById('BtnCreateNewTeam');
                createTeamButton.addEventListener('click', function () {
                    var teamName = prompt("Voer de naam van het nieuwe team in:");
                    if (teamName) {
                        createNewTeam(teamName);
                    }
                });

                //Create new team END


                document.getElementById("BtnSignOut").addEventListener("click", ()=>{

                    fetch('http://localhost:3000/logout', {
                        method: 'GET',
                        credentials: 'include'
                    })
                        .then(response => {
                            if (response.redirected) {
                                window.location.href = response.url;
                            }
                        })
                        .catch(error => console.error('Fout bij het uitloggen:', error));

                })


            });
    }
});



window.addEventListener('load', function() {
    var preloader = document.getElementById('preloader');
    preloader.style.display = 'none';

    document.getElementById("main").style.display = 'flex'


});

let email;
let isVerifiedUser;
let isGoogleUser;
window.onload = function() {

    fetch('http://localhost:3000/dashboard', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {

            let name = data.name

            isVerifiedUser = data.isVerified
            isGoogleUser = data.isGoogleUser
            email = data.email

            document.getElementById("FooterEmailTxt").textContent = email;
            document.getElementById("FooterNameTxt").textContent = name;

            let footerEllipse = document.getElementById("Footer-Ellipse");
            if (data.profilePicture){

                footerEllipse.style.backgroundImage = `url("${data.profilePicture}")`
                footerEllipse.style.backgroundSize = 'cover'
                footerEllipse.style.backgroundRepeat = 'no-repeat'

            } else {
                footerEllipse.textContent = name.substring(0, 2).toUpperCase()
            }


        })
        .catch(error => {
            console.error('Fout bij het ophalen van e-mailgegevens:', error);
        });
}


