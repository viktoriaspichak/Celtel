document.addEventListener('DOMContentLoaded', function() {
    const textAndButton = document.querySelector('.text-and-button');
    let timerValue = 0;
    let timerInterval;
    let currentIndex = 0;


    function showContent(text, header) {
        textAndButton.innerHTML = `
            <span id="hours" style="display: inline-block; width: 40px; height: 40px; line-height: 40px; font-size: 24px; text-align: center; background-color: #7B1FA2; color: #FFFFFF; margin-right: 5px;border-radius: 7px"></span> :
            <span id="minutes" style="display: inline-block; width: 40px; height: 40px; line-height: 40px; font-size: 24px; text-align: center; background-color: #7B1FA2; color: #FFFFFF; margin: 0 5px;border-radius: 7px"></span> :
            <span id="seconds" style="display: inline-block; width: 40px; height: 40px; line-height: 40px; font-size: 24px; text-align: center; background-color: #7B1FA2; color: #FFFFFF; margin-left: 5px;border-radius: 7px"></span>
            <h2>${header}</h2>
            <button id="yesButton" style="background-color: #7B1FA2; margin-right: 7px;">Si</button>
            <button id="noButton" style="background-color: #FFFFFF; border: solid 1px #7B1FA2; color: #7B1FA2; margin-left: 7px;">No</button>
        `;

        startTimer();

        document.getElementById('yesButton').addEventListener('click', handleYesButtonClick);
        document.getElementById('noButton').addEventListener('click', handleNoButtonClick);
    }

    function handleYesButtonClick() {
        if (currentIndex === 0) {
            showContent('¿Tienes más de 18 <br> años?', '¿Tienes más de <br> 18 años?', 'Continuar');
            currentIndex++;
        } else if (currentIndex === 1) {
            showFinalPage();
        }
    }

    function handleNoButtonClick() {
        textAndButton.innerHTML = '<p style="height: 170px;">Sorry, bye</p>';
    }

    function showFinalPage() {
        textAndButton.innerHTML = `
            <h1>Enhorabuena!</h1>
            <p>Sus <span style="font-size: 35px ;font-weight: 900;font-family: Source Sans Pro, sans-serif"> 100 GB </span>gratuitos le<br> esperan!</p>
            <button id="continueButton">Continuar</button>
        `;
        document.getElementById('continueButton').addEventListener('click', function() {
            currentIndex = 0;
            window.location.reload();
        });
    }

    function startTimer() {
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        function updateTimer() {
            timerValue++;
            const hours = Math.floor(timerValue / 3600);
            const minutes = Math.floor((timerValue % 3600) / 60);
            const seconds = timerValue % 60;

            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }

        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }

    document.getElementById('changeContentButton').addEventListener('click', function() {
        clearInterval(timerInterval);
        timerValue = 0;
        showContent('', '¿Utiliza Internet a menudo?', '');
    });
});
