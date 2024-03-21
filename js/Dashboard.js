

document.addEventListener('DOMContentLoaded', function() {

    const response = {
        "eta": "2024-03-21T12:34:00.000Z",
        "started_training_at": "2024-03-21T12:15:00.000Z"
    };

    const startedAt = new Date(response.started_training_at);
    const eta = new Date(response.eta);
    const totalTime = eta - startedAt;

    function updateProgress() {
        const now = new Date();
        let timeElapsed = now - startedAt;
        let timeLeft = eta - now;

        if (timeLeft < 0) {
            timeLeft = 0;
            timeElapsed = totalTime;
        }

        const minutesLeft = Math.round(timeLeft / 60000);

        const timeLeftTxt = document.getElementById('TimeLeftTxt');
        if(minutesLeft > 1) {
            timeLeftTxt.textContent = `${minutesLeft} mins Left`;
        } else if (minutesLeft === 1) {
            timeLeftTxt.textContent = `${minutesLeft} min Left`;
        } else {
            document.querySelector('.GeneratingFrame').style.display = 'none';
            const generatingDoneElement = document.querySelector('.GeneratingFrameDone');
            if (generatingDoneElement) {
                generatingDoneElement.style.display = 'flex';
                return
            }
        }

        const progressPercentage = (timeElapsed / totalTime) * 100;
        const newWidth = Math.min(progressPercentage * (177 / 100), 177);

        const timeBoxIn = document.querySelector('.TimeBox .TimeBoxIn');
        timeBoxIn.style.width = `${newWidth}px`;
    }

    setInterval(updateProgress, 1000);
});




//Time Left END