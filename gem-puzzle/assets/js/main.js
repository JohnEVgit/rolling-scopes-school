'use strict';

import {startTimer,addZero,setZeroTime,setTimeByLocalStorage,intervalId,timeOnSite} from "./timer.js";

let animating = false;

const createGame = () => {
    let playSound = true;

    const fragment = document.createDocumentFragment();

    const gameBody = document.createElement('div');
    const gameField = document.createElement('div');
    const gameFieldCont = document.createElement('div');
    const gameAudio = document.createElement('audio');

    // game info
    const gameInfo = document.createElement('div');
    const gameTimer = document.createElement('p');
    const gameSteps = document.createElement('p');
    const gameStepsCount = document.createElement('span');
    const gameMenuBtn = document.createElement('button');

    // game menu
    const gameMenu = document.createElement('div');
    const startGameBtn = document.createElement('button');
    const resumeGameBtn = document.createElement('button');
    const saveGameBtn = document.createElement('button');
    const loadGameBtn = document.createElement('button');
    const soundGameBtn = document.createElement('button');
    const scoreGameBtn = document.createElement('button');

    const gameOver = document.createElement('div');
    const bestScoreBlock = document.createElement('div');
    const bestScoreCont = document.createElement('div');
    const bestScoreTitle = document.createElement('div');
    const bestScoreBack = document.createElement('button');


    gameAudio.setAttribute('src', 'assets/audio/sound.mp3');
    document.body.appendChild(gameAudio);

    let gameFieldSize = 16;
    let gameFieldSizeArr = [...Array(gameFieldSize).keys()];

    gameFieldSizeArr.forEach(function(item, i) {

        const keyElement = document.createElement('button');
        keyElement.setAttribute('type', 'button');
        keyElement.setAttribute('data-id', i);

        keyElement.style.backgroundPosition = -100 * (i % 4) + '% ' + -100 * ((i / 4) ^ 0) + '%';

        if (i === 15) {
            keyElement.classList.add('empty');
        } else {
            keyElement.classList.add('chip');
            keyElement.textContent = (i + 1).toString();
        }

        keyElement.addEventListener('click', function () {
            let that = this;
            moveChip(gameBody,gameField,that,gameStepsCount,gameAudio,playSound,gameOver);
        });

        fragment.appendChild(keyElement);

    });

    // game menu
    gameMenu.classList.add('game-menu');
    gameFieldCont.appendChild(gameMenu);

    // game menu [Start new game]
    startGameBtn.setAttribute('type', 'button');
    startGameBtn.classList.add('game-start');
    startGameBtn.textContent = 'Start new game';
    gameMenu.appendChild(startGameBtn);
    startGameBtn.addEventListener('click', function () {
        startGame(gameBody,gameField,gameTimer,gameStepsCount);
    });

    // game menu [Resume game]
    resumeGameBtn.setAttribute('type', 'button');
    resumeGameBtn.classList.add('game-resume');
    resumeGameBtn.textContent = 'Resume game';
    gameMenu.appendChild(resumeGameBtn);
    resumeGameBtn.addEventListener('click', function () {
        resumeGame(gameBody,gameTimer);
    });

    // game menu [Save game]
    saveGameBtn.setAttribute('type', 'button');
    saveGameBtn.classList.add('game-save');
    saveGameBtn.textContent = 'Save game';
    gameMenu.appendChild(saveGameBtn);
    saveGameBtn.addEventListener('click', function () {
        saveGame(gameBody,gameField,gameTimer,gameStepsCount);
    });

    // game menu [Load game]
    loadGameBtn.setAttribute('type', 'button');
    loadGameBtn.classList.add('game-load');
    loadGameBtn.textContent = 'Load game';
    gameMenu.appendChild(loadGameBtn);

    if (localStorage.getItem('gameField') && localStorage.getItem('gameTimer') && localStorage.getItem('gameStepsCount')) {
        gameBody.classList.add('game-body-load-btn');
    }
    loadGameBtn.addEventListener('click', function () {
        loadGame(gameBody,gameField,gameTimer,gameStepsCount);
    });

    // game menu [Sound on]
    soundGameBtn.setAttribute('type', 'button');
    soundGameBtn.classList.add('game-sound');
    soundGameBtn.textContent = 'Sound on';
    gameMenu.appendChild(soundGameBtn);

    soundGameBtn.addEventListener('click', function () {
        if (playSound) {
            playSound = false;
            soundGameBtn.textContent = 'Sound off';
        } else {
            playSound = true;
            soundGameBtn.textContent = 'Sound on';
        }
    });

    // game menu [Best scores]
    scoreGameBtn.setAttribute('type', 'button');
    scoreGameBtn.classList.add('game-score');
    scoreGameBtn.textContent = 'Best scores';
    gameMenu.appendChild(scoreGameBtn);
    scoreGameBtn.addEventListener('click', function () {
        bestScores(gameBody,gameField,gameTimer,gameStepsCount,bestScoreBlock);
    });

    bestScoreTitle.textContent = 'Best scores';

    bestScoreBack.setAttribute('type', 'button');
    bestScoreBack.classList.add('game-go-back');
    bestScoreBack.textContent = 'go back';
    bestScoreBack.addEventListener('click', function () {
        gameBody.classList.add('game-body-menu-open');
        gameBody.classList.remove('game-body-best-score');
        bestScoreBlock.textContent = '';
    });

    bestScoreBlock.classList.add('best-score-block');
    bestScoreCont.classList.add('best-score-cont');
    bestScoreCont.appendChild(bestScoreTitle);
    bestScoreCont.appendChild(bestScoreBlock);
    bestScoreCont.appendChild(bestScoreBack);
    gameFieldCont.appendChild(bestScoreCont);


    // game info
    gameInfo.classList.add('game-info');
    gameBody.appendChild(gameInfo);

    gameTimer.classList.add('game-timer');
    gameTimer.innerText = 'Time 00:00';
    gameInfo.appendChild(gameTimer);

    gameSteps.classList.add('game-steps');
    gameSteps.innerText = 'Moves ';
    gameInfo.appendChild(gameSteps);
    gameStepsCount.classList.add('game-steps-count');
    gameStepsCount.innerText = '0';
    gameSteps.appendChild(gameStepsCount);

    gameMenuBtn.classList.add('game-menu-btn');
    gameMenuBtn.innerText = 'Open menu';
    gameInfo.appendChild(gameMenuBtn);
    gameMenuBtn.addEventListener('click', function () {
        showMenu(gameBody,intervalId,gameOver);
    });

    // game field cont
    gameFieldCont.classList.add('game-field-cont');
    gameBody.appendChild(gameFieldCont);

    // game field
    gameBody.classList.add('game-body','game-body-menu-open');
    document.body.appendChild(gameBody);

    gameField.classList.add('game-field');
    gameFieldCont.appendChild(gameField);
    gameField.appendChild(fragment);


    // game over message
    gameOver.classList.add('game-over-text');
    gameFieldCont.appendChild(gameOver);
};

const showMenu = (gameBody,intervalId,gameOver) => {
    clearInterval(intervalId);
    gameBody.classList.add('game-body-menu-open');
    gameOver.classList.remove('active');
};

const startGame = (gameBody,parent,gameTimer,gameStepsCount) => {

    let numArr = [...Array(16).keys()];

    shuffle(numArr);

    let numArrObj = {...numArr};
    let numArrObjSort = Object.keys(numArrObj).sort(function(a,b){return numArrObj[a]-numArrObj[b]});

    let hasSolutionCount = 0;

    numArrObjSort.forEach(function(item, i, arr) {
        if (+item === 15) {
            hasSolutionCount += 1 + ((i / 4) ^ 0);
        } else {
            for (let j = i + 1; j < arr.length; j++){
                if (+arr[j] < +arr[i] && +arr[j] !== 15){
                    hasSolutionCount++;
                }
            }
        }
    });

    if ( hasSolutionCount % 2 ) {
        startGame(gameBody,parent,gameTimer,gameStepsCount);
        return;
    }

    const chipsList = [...parent.children];
    chipsList.forEach(function(item, i) {
        item.style.order = numArr[i];
    });

    gameStepsCount.textContent = 0;

    setZeroTime();

    startTimer(gameTimer);
    gameBody.classList.remove('game-body-menu-open');
    gameBody.classList.add('game-body-resume-btn');
};

const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
};

const resumeGame = (gameBody,gameTimer) => {
    startTimer(gameTimer);
    gameBody.classList.remove('game-body-menu-open');
};

const saveGame = (gameBody,gameField,gameTimer,gameStepsCount) => {
    let gameFieldOrderList = [].map.call(gameField.children, function(obj) {
        return obj.style.order;
    });

    localStorage.setItem('gameField', gameFieldOrderList);
    localStorage.setItem('gameTimer', timeOnSite);
    localStorage.setItem('gameStepsCount', gameStepsCount.textContent);

    startTimer(gameTimer);
    gameBody.classList.remove('game-body-menu-open');
    gameBody.classList.add('game-body-load-btn');
};

const bestScores = (gameBody,gameField,gameTimer,gameStepsCount,bestScoreBlock) => {

    if (localStorage.getItem('bestScores')) {
        let bestScoresArr = localStorage.getItem('bestScores').split(',');
        const maxScoresRowCount = 10;

        bestScoresArr.sort(function (a, b) {
            let first = a.split('Moves ');
            let last = b.split('Moves ');
            return first[1] - last[1];
        });

        bestScoresArr.forEach(function(item, i) {
            if (i < maxScoresRowCount) {
                const bestScoreRow = document.createElement('p');
                bestScoreRow.innerText = i + 1 + ') ' + item;
                bestScoreBlock.appendChild(bestScoreRow);
            }
        });
    }

    gameBody.classList.remove('game-body-menu-open');
    gameBody.classList.add('game-body-best-score');
};


const loadGame = (gameBody,gameField,gameTimer,gameStepsCount) => {

    const chipsList = [...gameField.children];
    let numArr = [];

    if (localStorage.getItem('gameField')) {
        numArr = localStorage.getItem('gameField').split(',');
    } else {
        numArr = [...Array(16).keys()];
        shuffle(numArr);
    }

    chipsList.forEach(function(item, i) {
        item.style.order = numArr[i];
    });

    setTimeByLocalStorage();

    if (localStorage.getItem('gameStepsCount')) {
        gameStepsCount.textContent = localStorage.getItem('gameStepsCount');
    } else {
        gameStepsCount.textContent = 0;
    }

    startTimer(gameTimer);
    gameBody.classList.remove('game-body-menu-open');
    gameBody.classList.add('game-body-resume-btn');
};

const moveChip = (gameBody,gameField,that,gameStepsCount,gameAudio,playSound,gameOver) => {

    if (animating) {return;}

    const currentElemId = +that.style.order;
    const currentElem = that;

    const emptyElem = gameField.querySelector('.empty');
    const emptyElemPosition = +emptyElem.style.order;

    if ( ( emptyElemPosition === currentElemId - 4 || emptyElemPosition === currentElemId + 4 ) ||
        ( currentElemId % 4 === 0 && emptyElemPosition === currentElemId + 1 ) ||
        ( currentElemId % 4 === 3 && emptyElemPosition === currentElemId - 1 ) ||
        ( currentElemId % 4 === 1 && emptyElemPosition === currentElemId - 1 ) ||
        ( currentElemId % 4 === 1 && emptyElemPosition === currentElemId + 1 ) ||
        ( currentElemId % 4 === 2 && emptyElemPosition === currentElemId - 1 ) ||
        ( currentElemId % 4 === 2 && emptyElemPosition === currentElemId + 1 ) ) {

        if (playSound) {
            gameAudio.currentTime = 0;
            gameAudio.play();
        }

        currentElem.style.transition = 'top 0.2s ease-out, left 0.2s ease-out';
        if (currentElemId < emptyElemPosition && (emptyElemPosition - currentElemId) % 4 === 0) {
            currentElem.style.top = '6.25em';
        } else if (currentElemId > emptyElemPosition && (emptyElemPosition - currentElemId) % 4 === 0) {
            currentElem.style.top = '-6.25em';
        } else if (currentElemId > emptyElemPosition) {
            currentElem.style.left = '-6.25em';
        } else {
            currentElem.style.left = '6.25em';
        }

        gameStepsCount.textContent = +gameStepsCount.textContent + 1;

        currentElem.addEventListener('transitionstart', function() {
            animating = true;
        });

        const gameFieldList = [...gameField.children];

        currentElem.addEventListener('transitionend', function() {
            animating = false;
            currentElem.style.transition = "none";
            currentElem.style.top = 0;
            currentElem.style.left = 0;
            currentElem.style.order = emptyElemPosition;
            emptyElem.style.order = currentElemId;

            let isGameOver = true;

            gameFieldList.forEach(function(item, i) {
                if ( item.dataset.id !== item.style.order ) {
                    isGameOver = false;
                }
            });

            if ( isGameOver && !gameOver.classList.contains('active') ) {
                gameOver.classList.add('active');
                gameBody.classList.remove('game-body-resume-btn');
                let secondsTotal = timeOnSite / 1000;
                let minutes = Math.floor(secondsTotal / 60);
                let seconds = Math.floor(secondsTotal) % 60;
                clearInterval(intervalId);
                gameOver.textContent = 'Hooray! You solved the puzzle in ' + addZero(minutes) + ":" + addZero(seconds) + ' and ' + gameStepsCount.textContent + ' moves';
                if (localStorage.getItem('bestScores')) {
                    localStorage.setItem('bestScores', localStorage.getItem('bestScores') + ',Time ' + addZero(minutes) + ":" + addZero(seconds) + '. Moves ' + gameStepsCount.textContent);
                } else {
                    localStorage.setItem('bestScores', 'Time ' + addZero(minutes) + ":" + addZero(seconds) + '. Moves ' + gameStepsCount.textContent);
                }

            }

        });
    }

    gameField.querySelector('.empty');
};


document.addEventListener('DOMContentLoaded', function(){
    createGame();
});





