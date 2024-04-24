

//Time Left Start

document.addEventListener('DOMContentLoaded', function() {


    const response = {
        "eta": "2024-04-17T15:55:00.000Z",
        "started_training_at": "2024-04-17T15:40:00.000Z"
    };

    const startedAt = new Date(response.started_training_at);
    const eta = new Date(response.eta);


    const totalTime = eta - startedAt;



    const currentDate = new Date();
    const newDate = new Date(currentDate);
    newDate.setHours(currentDate.getHours());

    console.log(newDate)



    function updateProgress() {
        const currentDate = new Date();
        const now = new Date(currentDate);
        now.setHours(currentDate.getHours() +2);
        let timeLeft = eta - now;

        if (timeLeft < 0) {
            timeLeft = 0;
        }

        const minutesLeft = Math.round(timeLeft / 60000);

        const timeLeftTxt = document.getElementById('TimeLeftTxt');
        if (minutesLeft > 1) {
            timeLeftTxt.textContent = `${minutesLeft} mins left`;
        } else if (minutesLeft === 1) {
            timeLeftTxt.textContent = `${minutesLeft} min left`;
        } else {
            document.querySelector('.GeneratingFrame').style.display = 'none';
            const generatingDoneElement = document.querySelector('.GeneratingFrameProcessing');
            if (generatingDoneElement) {
                generatingDoneElement.style.display = 'flex';
            }
        }



        const progressPercentage = Math.max(0, Math.min(100, (now - startedAt) / totalTime * 100));
        const newWidth = progressPercentage * (177 / 100);

        const timeBoxIn = document.querySelector('.TimeBox .TimeBoxIn');
        timeBoxIn.style.width = `${newWidth}px`;
    }


    setInterval(updateProgress, 1000);




});

//Time Left END

// footerEvents.js




// let footer = document.getElementById("Footer");
// footer.addEventListener("click", ()=>{
//     alert()
// })
// let footerContent = document.getElementById("Footer-Content");
//
//
// function hideFooterContent() {
//     footerContent.style.display = "none";
//     footer.style.borderRadius = "0";
//     footer.style.background = "";
//     document.getElementById("ChevronDown").style.display = "block";
//     document.getElementById("ChevronUp").style.display = "none";
// }
//
//
// footer.addEventListener("click", function(event) {
//     if (footerContent.style.display === "none") {
//         footerContent.style.display = "block";
//         footer.style.borderRadius = "9px";
//         footer.style.background = "#EDEDED";
//         document.getElementById("ChevronDown").style.display = "none";
//         document.getElementById("ChevronUp").style.display = "block";
//     } else {
//         hideFooterContent();
//     }
//     event.stopPropagation();
// });
//
//
//
// document.addEventListener("click", function(event) {
//     let isClickInsideFooterContent = footerContent.contains(event.target);
//
//     if (!isClickInsideFooterContent && footerContent.style.display === "block") {
//         hideFooterContent();
//     }
// });




