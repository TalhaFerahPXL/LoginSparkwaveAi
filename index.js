window.onSignIn = function(credentialResponse) {
    if (credentialResponse.credential) {


        fetch('http://localhost:3000/store-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: credentialResponse.credential}),
            credentials: 'include'
        }).then(response => response.json())
            .then(data => {

                fetch('https://localhost:7236/api/Login/GoogleValidation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: data.email,
                        name: data.name,
                        token: credentialResponse.credential
                    })
                }).then(response => response.json())
                    .then(data => {
                        if (data) {
                            window.location.href = 'Html/StartScreen.html';
                        } else {
                            console.error('Fout bij het valideren met Google:', data);
                        }
                    })
                    .catch(error => {
                        console.error('Fout bij het verbinden met de API:', error);
                    });
            })
            .catch(error => {
                console.error('Fout bij het opslaan van de token:', error);
            });

    } else {
        console.log("Er is iets misgegaan");
    }
}


function checkLoginStatus() {
    fetch('http://localhost:3000/loginStatus', { credentials: 'include' })
        .then(response => {
            console.log('Response received, redirected:', response.redirected, 'URL:', response.url);
            if (response.redirected) {
                window.location.href = response.url;
            } else {
                console.log('Gebruiker is niet ingelogd');
            }
        })
        .catch(error => console.error('Fout bij het controleren van de loginstatus:', error));
}


window.onload = function() {
    checkLoginStatus();
};


document.getElementById("BtnEmail").addEventListener("click", ()=>{
    window.location.href = 'Html/Register.html'
})


document.getElementById("BtnGoogle").addEventListener("click", ()=>{
    document.querySelector('.g_id_signin div[role=button]').click();

})
