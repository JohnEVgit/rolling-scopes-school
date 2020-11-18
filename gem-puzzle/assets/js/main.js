'use strict';

import {startTimer,addZero,setZeroTime,setTimeByLocalStorage,intervalId,timeOnSite} from "./timer.js";

let animating = false;
let playSound = true;

const createGame = () => {

    const fragment = document.createDocumentFragment();
    const bodyElem = document.body;

    const getBodyHTML = () => {
        return `
        <audio src="assets/audio/sound.mp3"></audio>
        <div class="game-body game-body-menu-open">
            <div class="game-info"></div>
            <div class="game-field-cont">
                <div class="game-field"></div>
                <div class="game-over-text"></div>
                <div class="game-menu"></div>
                <div class="best-score-cont"></div>
            </div>
        </div>
    `
    };
    bodyElem.innerHTML = getBodyHTML();

    const gameBody = bodyElem.querySelector('.game-body');
    const gameField = bodyElem.querySelector('.game-field');
    const gameAudio = bodyElem.querySelector('audio');
    const gameOver = bodyElem.querySelector('.game-over-text');
    const gameInfo = bodyElem.querySelector('.game-info');
    const gameMenu = bodyElem.querySelector('.game-menu');
    const bestScoreCont = bodyElem.querySelector('.best-score-cont');

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

    gameField.appendChild(fragment);

    renderInfo(gameInfo,gameBody,gameOver);

    const gameTimer = gameBody.querySelector('.game-timer');
    const gameStepsCount = gameBody.querySelector('.game-steps-count');

    renderBestScore(bestScoreCont);

    const bestScoreBack = gameBody.querySelector('.game-go-back');
    const bestScoreBlock = gameBody.querySelector('.best-score-block');

    bestScoreBack.addEventListener('click', function () {
        gameBody.classList.add('game-body-menu-open');
        gameBody.classList.remove('game-body-best-score');
        bestScoreBlock.textContent = '';
    });

    renderMenu(gameMenu,gameBody,gameField,gameTimer,gameStepsCount,bestScoreBlock);

};

const renderMenu = (gameMenu,gameBody,gameField,gameTimer,gameStepsCount,bestScoreBlock) => {
    const getMenuHTML = () => {
        return `
        <button type="button" class="game-start">Start new game</button>
        <button type="button" class="game-resume">Resume game</button>
        <button type="button" class="game-save">Save game</button>
        <button type="button" class="game-load">Load game</button>
        <button type="button" class="game-sound">Sound on</button>
        <button type="button" class="game-score">Best scores</button>
    `
    };

    gameMenu.innerHTML = getMenuHTML();

    const startGameBtn = gameMenu.querySelector('.game-start');
    const resumeGameBtn = gameMenu.querySelector('.game-resume');
    const saveGameBtn = gameMenu.querySelector('.game-save');
    const loadGameBtn = gameMenu.querySelector('.game-load');
    const soundGameBtn = gameMenu.querySelector('.game-sound');
    const scoreGameBtn = gameMenu.querySelector('.game-score');

    startGameBtn.addEventListener('click', function () {
        debugger
        startGame(gameBody,gameField,gameTimer,gameStepsCount);
    });
    resumeGameBtn.addEventListener('click', function () {
        resumeGame(gameBody,gameTimer);
    });
    saveGameBtn.addEventListener('click', function () {
        saveGame(gameBody,gameField,gameTimer,gameStepsCount);
    });
    if (localStorage.getItem('gameField') && localStorage.getItem('gameTimer') && localStorage.getItem('gameStepsCount')) {
        gameBody.classList.add('game-body-load-btn');
    }
    loadGameBtn.addEventListener('click', function () {
        loadGame(gameBody,gameField,gameTimer,gameStepsCount);
    });
    soundGameBtn.addEventListener('click', function () {
        if (playSound) {
            playSound = false;
            soundGameBtn.textContent = 'Sound off';
        } else {
            playSound = true;
            soundGameBtn.textContent = 'Sound on';
        }
    });
    scoreGameBtn.addEventListener('click', function () {
        bestScores(gameBody,gameField,gameTimer,gameStepsCount,bestScoreBlock);
    });

};

const renderInfo = (gameInfo,gameBody,gameOver) => {

    const getInfoHTML = () => {
        return `
        <p class="game-timer">Time 00:00</p>
        <p class="game-steps">Moves <span class="game-steps-count">0</span></p>
        <button class="game-menu-btn" type="button">Open menu</button>
        `
    };

    gameInfo.innerHTML = getInfoHTML();

    const gameMenuBtn = gameBody.querySelector('.game-menu-btn');

    gameMenuBtn.addEventListener('click', function () {
        showMenu(gameBody,intervalId,gameOver);
    });

};

const renderBestScore = (bestScoreCont) => {

    const getBestScoreHTML = () => {
        return `
            <div>Best scores</div>
            <div class="best-score-block"></div>
            <button type="button" class="game-go-back">go back</button>
        `
    };

    bestScoreCont.innerHTML = getBestScoreHTML();
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





