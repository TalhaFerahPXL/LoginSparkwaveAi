

document.getElementById("Buy").addEventListener("click", ()=>{




    if(isVerifiedUser == 'False'){
        document.getElementById("MessageRed").style.display = 'block'
        MakeFetch();
    } else {
        document.getElementById("MessageGreen").style.display = 'block'

    }





})


function MakeFetch() {

    fetch('https://localhost:7236/SendConfirmationMail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Mail: email })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Netwerkantwoord was niet ok.');
            }
            return response.json();
        })
        .then(data => {

        })
        .catch(error => {
            console.error('Fout bij het verzenden van de bevestigingsmail:', error);

        });



}



