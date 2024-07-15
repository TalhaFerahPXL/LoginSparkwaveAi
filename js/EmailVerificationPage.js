document.addEventListener('DOMContentLoaded', function() {
    function getTokenFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('token');
    }

    const token = getTokenFromUrl();

    if (!token) {
        document.getElementById('Emailverify').textContent = 'Something went wrong';
        return;
    }

    fetch('https://localhost:7236/api/checkConfirmationToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Token: token.toString() })
    })

        .then(response => {
            if (response.ok) {


                return response.json();
            } else if (response.status === 404) {
                throw new Error('Token not found or is invalid.');
            } else {
                throw new Error('Netwerkantwoord was niet ok. Status: ' + response.status);
            }
        })
        .then(data => {
            updateVerificationStatus()
            window.location.href = '../Html/Dashboard.html';
        })
        .catch(error => {
            console.error('Fout bij het verifiëren van de token:', error);

            document.getElementById('Emailverify').textContent = 'Something went wrong.';
            alert('Er is een fout opgetreden: ' + error.message);
        });
});


function updateVerificationStatus() {
    fetch('http://localhost:3000/updateVerification', {
        method : 'POST',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log(data.message);

            } else {
                console.error(data.message);
            }
        })
        .catch(error => {
            console.error('Fout bij het bijwerken van de verificatiestatus:', error);
        });
}