







//Time Left START
document.addEventListener('DOMContentLoaded', function() {
    const startedAt = new Date();
    const eta = new Date(startedAt.getTime() + 1 * 60000);
    const totalTime = eta - startedAt;

    function updateProgress() {
        const now = new Date();
        let timeLeft = eta - now;
        if (timeLeft < 0) {
            timeLeft = 0;
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
            }
            return;
        }


        const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;
        const timeBoxIn = document.querySelector('.TimeBox .TimeBoxIn');
        const newWidth = Math.min(progressPercentage * (177 / 100), 177);
        timeBoxIn.style.width = `${newWidth}px`;
    }


    setInterval(updateProgress, 1000);
});


//Time Left END