//Register START
function registerUser() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value


    };



    fetch('https://localhost:7236/api/Register/Register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            let passbox = document.getElementById("txtPassword")
            passbox.innerText = data;
            passbox.style.color = 'red';

            loginUser()

        })
        .catch((error) => {
            console.error('Error:', error);

        });
}
//Register END



//Login START
function loginUser() {
    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };


    fetch('https://localhost:7236/api/Login', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            if (data) {

                fetch('http://localhost:3000/store-apiToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: data }),
                    credentials: 'include'
                })
                    .then(response => response.json())
                    .then(data => {


                        if (data) {
                            window.location.href = 'Dashboard.html';

                        } else {
                            console.error('Error: Token not stored successfully');

                        }
                    })
                    .catch(error => console.error('Error storing token:', error));

            } else {
                throw new Error('Token not received');
            }
        })
        .catch((error) => {
            console.error('Login Error:', error);
            let errortxtx = document.getElementById("errortxt")
            errortxtx.innerText = error;
            errortxtx.style.color = 'red'
        });
}

//Login END


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
