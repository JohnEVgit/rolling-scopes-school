'use strict';

let intervalId;
let timeOnSite = 0;
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

    const gameOver = document.createElement('div');

    gameAudio.setAttribute('src', 'assets/audio/sound.mp3');
    document.body.appendChild(gameAudio);

    for (let i = 0; i < 16; i++) {

        const keyElement = document.createElement('button');
        keyElement.setAttribute('type', 'button');
        keyElement.setAttribute('data-id', i);

        if (i === 15) {
            keyElement.classList.add('empty');
        } else {
            keyElement.classList.add('chip');
            keyElement.textContent = (i + 1).toString();
        }

        keyElement.addEventListener('click', function () {
            let that = this;
            moveChip(gameField,that,gameStepsCount,gameAudio,playSound,gameOver);
        });

        fragment.appendChild(keyElement);
    }

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

// Add Zeros
const addZero = (n) => {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
};

const showMenu = (gameBody,intervalId,gameOver) => {
    clearInterval(intervalId);
    gameBody.classList.add('game-body-menu-open');
    gameOver.classList.remove('active');
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

const startGame = (gameBody,parent,gameTimer,gameStepsCount) => {

    let numArr = [...Array(16).keys()];
    shuffle(numArr);

    let hasSolutionCount = 0;
    for (let i = 1, len = numArr.length-1; i < len; i++){
        for (let j = i-1; j >= 0; j--){
            if (numArr[j] > numArr[i]){
                hasSolutionCount++;
            }
        }
    }
    if ( !(hasSolutionCount % 2) ) {
        startGame(gameBody,parent,gameTimer,gameStepsCount);
        return;
    }

    for (let i = 0; i < parent.children.length; i++) {
        parent.children[i].style.order = numArr[i];
    }

    gameStepsCount.textContent = 0;
    timeOnSite = 0;
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

const loadGame = (gameBody,gameField,gameTimer,gameStepsCount) => {

    if (localStorage.getItem('gameField')) {
        let numArr = localStorage.getItem('gameField').split(',');
        for (let i = 0; i < gameField.children.length; i++) {
            gameField.children[i].style.order = numArr[i];
        }
    } else {
        let numArr = [...Array(16).keys()];
        shuffle(numArr);

        for (let i = 0; i < gameField.children.length; i++) {
            gameField.children[i].style.order = numArr[i];
        }
    }

    if (localStorage.getItem('gameTimer')) {
        timeOnSite = +localStorage.getItem('gameTimer');
    } else {
        timeOnSite = 0;
    }

    if (localStorage.getItem('gameStepsCount')) {
        gameStepsCount.textContent = localStorage.getItem('gameStepsCount');
    } else {
        gameStepsCount.textContent = 0;
    }

    startTimer(gameTimer);
    gameBody.classList.remove('game-body-menu-open');
    gameBody.classList.add('game-body-resume-btn');
};

const moveChip = (gameField,that,gameStepsCount,gameAudio,playSound,gameOver) => {

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
            currentElem.style.top = '100px';
        } else if (currentElemId > emptyElemPosition && (emptyElemPosition - currentElemId) % 4 === 0) {
            currentElem.style.top = '-100px';
        } else if (currentElemId > emptyElemPosition) {
            currentElem.style.left = '-100px';
        } else {
            currentElem.style.left = '100px';
        }

        gameStepsCount.textContent = +gameStepsCount.textContent + 1;

        currentElem.addEventListener('transitionstart', function() {
            animating = true;
        });

        let gameFieldList = gameField.children;

        currentElem.addEventListener('transitionend', function() {
            animating = false;
            currentElem.style.cssText = "transition: none; top: 0; left: 0; order: " + emptyElemPosition + ";";
            emptyElem.style.order = currentElemId;

            let isGameOver = true;

            for (let item of gameFieldList) {
                if ( item.dataset.id !== item.style.order ) {
                    isGameOver = false;
                }
            }

            if ( isGameOver ) {
                gameOver.classList.add('active');
                let secondsTotal = timeOnSite / 1000;
                let minutes = Math.floor(secondsTotal / 60);
                let seconds = Math.floor(secondsTotal) % 60;
                clearInterval(intervalId);
                gameOver.textContent = 'Hooray! You solved the puzzle in ' + addZero(minutes) + ":" + addZero(seconds) + ' and ' + gameStepsCount.textContent + ' moves';
            }

        });
    }

    gameField.querySelector('.empty');
};


document.addEventListener('DOMContentLoaded', function(){
    createGame();
});





