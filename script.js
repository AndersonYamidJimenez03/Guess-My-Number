'use strict';

const btnAgain = document.querySelector('.again');
const inputNumber = document.querySelector('.numberInput');
const btnCheck = document.querySelector('.check');
const userFeedback = document.querySelector('.user-feedback');
const NumberToFind = document.querySelector('.number-to-guess');
const score = document.querySelector('.score__value');

const LIMIT_NUMBER = 20;

/* || VARIABLES */
let highScore = 0;
let scoreValue = 20;
let secretNumber;

/* || INIT FUNCTION TO START AND RELOAD THE GAME */
const init = function(){
    secretNumber = Math.trunc((Math.random() * LIMIT_NUMBER) + 1);

    userFeedback.textContent = 'Start guessing...';
    document.body.style.setProperty('background-color', 'black');
    NumberToFind.textContent = '?';
    scoreValue = 20;
    score.textContent = scoreValue;
    inputNumber.value = '';
    document.querySelector('.highscore__value').textContent = highScore;  
}

init();


const displayMessage = function(message){
    userFeedback.textContent = message;
}

/* || EVENT LISTENER WHEN THE BTN CHECK IS CLICKED */
btnCheck.addEventListener('click', function(){
    let guessNumber = Number(inputNumber.value);

    if(!guessNumber) displayMessage('🚩please key a Number');

    if(guessNumber <= 0 || guessNumber > LIMIT_NUMBER){
        displayMessage(`🚩please a positive number between 1 to ${LIMIT_NUMBER}`);
    } else{
        check(guessNumber);
    }
});

/* || CHECK HELPS TO VALIDATE IF THE NUMBER WAS GUESSED OR NOT */
const check = function(guessNumber){
    if(guessNumber === secretNumber){
        displayMessage('🎊 Congratulation you won');
        document.body.style.setProperty('background-color', 'green');
        NumberToFind.textContent = `${secretNumber}`;

        if(scoreValue > highScore){
            highScore = scoreValue;
            document.querySelector('.highscore__value') = highScore;
        }

    }else if(scoreValue > 1) {
        displayMessage(inputNumber.value < secretNumber ? '📉Too low' : '📈Too high');
        scoreValue--;
        score.textContent = scoreValue;
    }else{
        displayMessage('Sorry you lost 💥💥💥');
        score.textContent = 0;
    }
};

btnAgain.addEventListener('click', function(){
    init();
})