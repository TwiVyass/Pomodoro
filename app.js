const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const session = document.querySelector('.minutes'); 
let myInterval; 
let state = true;
let isPaused = false;
let totalSeconds = 25 * 60;

const updateSeconds = () => {
    const minuteDiv = document.querySelector('.minutes');
    const secondDiv = document.querySelector('.seconds');
    
    totalSeconds--;
    
    let minutesLeft = Math.floor(totalSeconds/60);
    let secondsLeft = totalSeconds % 60;
    
    if(secondsLeft < 10) {
        secondDiv.textContent = '0' + secondsLeft;
    } else {
        secondDiv.textContent = secondsLeft;
    }
    minuteDiv.textContent = `${minutesLeft}`
    if(minutesLeft === 0 && secondsLeft === 0) {
        bells.play()
        clearInterval(myInterval);
        state = true;
        isPaused = false;
        totalSeconds = 25 * 60;
    }
}

const appTimer = () => {
    if(state) {
        state = false;
        totalSeconds = Number.parseInt(session.textContent) * 60;
        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Session has already started.')
    }
}

const pauseTimer = () => {
    if(!state) {
        if(!isPaused) {
            clearInterval(myInterval);
            isPaused = true;
        } else {
            myInterval = setInterval(updateSeconds, 1000);
            isPaused = false;
        }
    }
}

const resetTimer = () => {
    clearInterval(myInterval);
    state = true;
    isPaused = false;
    totalSeconds = 25 * 60;
    document.querySelector('.minutes').textContent = '25';
    document.querySelector('.seconds').textContent = '00';
}

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
