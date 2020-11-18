'use strict';

let intervalId;
let timeOnSite = 0;

const setZeroTime = () => {
    timeOnSite = 0;
};

const setTimeByLocalStorage = () => {
    if (localStorage.getItem('gameTimer')) {
        timeOnSite = +localStorage.getItem('gameTimer');
    } else {
        timeOnSite = 0;
    }
};

const addZero = (n) => {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
};

const startTimer = (gameTimer) => {

    if (localStorage.getItem('timeOnSite') !== null && localStorage.getItem('timeOnSite') !== '') {
        timeOnSite = localStorage.getItem('timeOnSite');
    }

    let secondsTotal = timeOnSite / 1000;
    let minutes = Math.floor(secondsTotal / 60);
    let seconds = Math.floor(secondsTotal) % 60;

    gameTimer.innerHTML = "Time " + addZero(minutes) + ":" + addZero(seconds);

    intervalId = setInterval(function () {
        timeOnSite += 1000;
        secondsTotal = timeOnSite / 1000;
        minutes = Math.floor(secondsTotal / 60);
        seconds = Math.floor(secondsTotal) % 60;

        gameTimer.innerHTML = "Time " + addZero(minutes) + ":" + addZero(seconds);
    }, 1000);

};

export {startTimer,addZero,setZeroTime,setTimeByLocalStorage,intervalId,timeOnSite};