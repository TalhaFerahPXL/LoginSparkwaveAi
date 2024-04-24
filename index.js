function onSignIn(credentialResponse) {
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
                console.log(data);
                console.log(credentialResponse.credential)

                window.location.href = 'Html/Dashboard.html';
            });
    } else {
        console.log("Er is iets misgegaan");
    }
}



