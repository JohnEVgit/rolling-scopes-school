'use strict';

import {categoryes, cards} from "./cards.js";
import getMainHTML from "./renderMainHTML.js";

const handleLoad = () => {

    const bodyElem = document.body;

    const config = {
        mode: false,
        game: false,
        category: null,
        orderArr: [],
        errorCount: 0,
        clickCardCount: 0
    };

    bodyElem.insertAdjacentHTML('afterBegin', getMainHTML());

    const mainContentElem = bodyElem.querySelector('.main-content-block');

    playMode((mode) => {
        config.mode = mode;
    },config);

    renderMenu(mainContentElem,config);

    loadMainPage(mainContentElem,config);

    mobileMenuOpenClose();

};

const doActiveMenuLink = (elem) => {

    const menuList = document.querySelectorAll('.main-nav ul li');

    menuList.forEach((item) => {
        if (item.querySelector('.active')) {
            item.querySelector('.active').classList.remove('active');
        }
    });

    if (elem.classList.contains('category-item')) {
        document.querySelector('.main-nav ul li a[data-id="' + elem.dataset.id + '"]').classList.add('active');
    } else {
        elem.classList.add('active');
    }

};

const renderMainLiElem = (menuHtml,mainContentElem,config) => {

    const menuLinkElem = document.createElement('a');
    menuLinkElem.classList.add('btn', 'active');
    menuLinkElem.setAttribute('href', '#');
    menuLinkElem.textContent = 'Main Page';

    menuLinkElem.addEventListener('click', function () {
        doActiveMenuLink(menuLinkElem);
        loadMainPage(mainContentElem,config);
    });

    const menuLiElem = document.createElement('li');
    menuLiElem.appendChild(menuLinkElem);

    menuHtml.appendChild(menuLiElem);
};

const renderMenu = (mainContentElem,config) => {
    const menuHtml = document.createDocumentFragment();

    renderMainLiElem(menuHtml,mainContentElem,config);

    categoryes.forEach((item,i) => {
        const menuLinkElem = document.createElement('a');
        menuLinkElem.classList.add('btn');
        menuLinkElem.setAttribute('href', '#');
        menuLinkElem.dataset.id = i;
        menuLinkElem.textContent = item.category;

        menuLinkElem.addEventListener('click', function () {
            let that = this;
            doActiveMenuLink(that);
            loadCategoryPage(that,mainContentElem,config);
        });

        const menuLiElem = document.createElement('li');
        menuLiElem.appendChild(menuLinkElem);

        menuHtml.appendChild(menuLiElem);
    });

    document.querySelector('.main-nav ul').appendChild(menuHtml);
};


const loadMainPage = (mainContentElem,config) => {

    config.game = false;
    config.category = null;
    config.orderArr = [];
    config.errorCount = 0;
    document.body.classList.remove('start-game-body-play');

    const containerHtml = document.createElement('div');
    containerHtml.classList.add('main-categories');

    const categoryListFragment = document.createDocumentFragment();

    document.querySelector('.page-title').textContent = 'Choose category';

    categoryes.forEach((item,i) => {

        const categoryLinkElem = document.createElement('a');
        categoryLinkElem.classList.add('category-item');
        categoryLinkElem.setAttribute('href', '#');
        categoryLinkElem.dataset.id = i;

        categoryLinkElem.addEventListener('click', function () {
            let that = this;
            doActiveMenuLink(that);
            loadCategoryPage(that,mainContentElem,config);
        });

        categoryLinkElem.innerHTML += `
            <div class="category-img-cont">
                <img class="category-img" src="${item.image}" alt="${item.category}">
            </div>
            <p class="category-title">${item.category}</p>
        `;

        categoryListFragment.appendChild(categoryLinkElem);
    });

    containerHtml.appendChild(categoryListFragment);

    mainContentElem.innerHTML = '';
    mainContentElem.appendChild(containerHtml);
};


const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
};

const loadCategoryPage = (that,mainContentElem,config) => {

    config.game = false;
    config.category = null;
    config.orderArr = [];
    config.errorCount = 0;
    document.body.classList.remove('start-game-body-play');

    const pageCardsList = cards[that.dataset.id];
    const containerHtml = document.createElement('div');
    const cardListFragment = document.createDocumentFragment();

    containerHtml.classList.add('main-categories', 'main-categories-cards');
    document.querySelector('.page-title').textContent = categoryes[that.dataset.id].category;
    config.category = that.dataset.id;

    let categoryCardNumArr = [...Array(cards[config.category].length).keys()];
    shuffle(categoryCardNumArr);
    config.orderArr = categoryCardNumArr;

    pageCardsList.forEach((item,i) => {

        const cardLinkElem = document.createElement('div');
        cardLinkElem.classList.add('category-item');
        cardLinkElem.dataset.id = i;

        renderCard(cardLinkElem,item);
        clickCard(cardLinkElem,item,config);
        leaveCard(cardLinkElem);

        cardListFragment.appendChild(cardLinkElem);
    });

    containerHtml.appendChild(cardListFragment);

    mainContentElem.innerHTML = '';
    mainContentElem.appendChild(containerHtml);

    renderGameControl(mainContentElem,config);

    startGame((game) => {
        config.game = game;
    },config);

};

const renderCard = (cardLinkElem,item) => {
    cardLinkElem.innerHTML = `
        <div class="category-front">
            <div class="category-img-cont">
                <img class="category-img" src="${item.image}" alt="${item.word}">
            </div>
            <div class="category-title category-title-front">
                <span>${item.word}</span>
                <button class="category-rotate rotate-background" type="button" aria-label="rotate"></button>
            </div>
        </div>
        <div class="category-back">
            <div class="category-img-cont">
                <img class="category-img" src="${item.image}" alt="${item.word}">
            </div>
            <p class="category-title">${item.translation}</p>
        </div>
    `;
};

const clickCard = (cardLinkElem,item,config) => {
    const cardFront = cardLinkElem.querySelector('.category-front');
    cardFront.addEventListener('click', function (e) {
        let that = this;

        if (config.mode) {

            if (config.game) {

                let isGoodStar;
                const lastOrderArrNumber = config.orderArr.length - 1;
                const lastOrderArrItem = config.orderArr[lastOrderArrNumber];
                const isCorrectCard = cards[config.category][lastOrderArrItem].audioSrc === item.audioSrc;
                const isCardLinkElemNotActive = !cardLinkElem.classList.contains('active');

                if ( isCorrectCard && isCardLinkElemNotActive ) {
                    isGoodStar = true;
                    cardLinkElem.classList.add('active');
                    soundCorrect();
                    addStar(isGoodStar,config);
                    setTimeout(() => {
                        config.orderArr.pop();

                        if (config.orderArr.length) {
                            soundCurrent(config);
                        } else {
                            gameOver(config);
                        }
                    }, 1000);

                } else if (isCardLinkElemNotActive) {
                    isGoodStar = false;
                    soundError();
                    addStar(isGoodStar,config);
                    config.errorCount++;
                }
            }

        } else {

            if ( e.target.classList.contains('category-rotate') ) {
                that.closest('.category-item').classList.add('rotate')
            } else {
                const audio = new Audio(item.audioSrc);
                audio.play();
            }

        }
    });
};

const addStar = (isGoodStar,config) => {
    config.clickCardCount++;
    const gameStarsCont = document.querySelector('.game-progress-stars');
    const gameStar = document.createElement('div');

    if (config.clickCardCount > 20) {
        delete gameStarsCont.firstChild;
    }
    gameStar.classList.add('star-item');
    if (!isGoodStar) {
        gameStar.classList.add('incorrect');
    }
    gameStarsCont.appendChild(gameStar);
};


const gameOverFailHTML = (config) => {
   return `
            <div class="game-over-cont">
                <img class="game-over-image" src="./assets/img/icon-sad.svg" alt="Печалька...">
                <h2 class="game-over-title">Ups...</h2>
                <p class="game-over-text">You made ${config.errorCount} mistakes</p>
            </div>
        `
};
const gameOverSuccessHTML = () => {
    return `
            <div class="game-over-cont">
                <img class="game-over-image" src="./assets/img/icon-happy.svg" alt="Ура!!!">
                <h2 class="game-over-title">Hooray!!!</h2>
                <p class="game-over-text">You did it</p>
            </div>
        `
};
const gameOver = (config) => {
    const mainContElem = document.querySelector('.main-content-block');
    let soundFile = '';

    if (config.errorCount) {
        mainContElem.innerHTML = gameOverFailHTML(config);
        soundFile = './assets/audio/sound-fail.mp3';
    } else {
        mainContElem.innerHTML = gameOverSuccessHTML();
        soundFile = './assets/audio/sound-success.mp3';
    }

    const audio = new Audio(soundFile);
    audio.play();

    setTimeout(() => loadMainPage(mainContElem,config), 3000);

};

const leaveCard = (cardLinkElem) => {
    cardLinkElem.addEventListener('mouseleave', function () {
        let that = this;
        if (that.classList.contains('rotate')) {
            that.classList.remove('rotate')
        }
    });
};

const renderGameControl = (mainContentElem,config) => {

    const gameControlCont = document.createElement('div');
    gameControlCont.classList.add('game-control');

    gameControlCont.innerHTML = `
        <button class="btn game-start-btn rotate-background" type="submit" ${config.mode? "" : "disabled"}>Start game</button>
        <div class="game-progress-stars"></div>
    `;

    mainContentElem.appendChild(gameControlCont);

};

const startGame = (callback,config) => {

    const bodyElem = document.body;
    const thisElem = bodyElem.querySelector('.game-start-btn');

    let blockquoteRot = -360;

    if (thisElem) {
        thisElem.addEventListener('click', () => {

            if (!bodyElem.classList.contains('start-game-body-play')) {

                callback(true);
                bodyElem.classList.add('start-game-body-play');

                shuffleCard(bodyElem);

            } else {
                thisElem.style.transform = 'rotate(' + blockquoteRot + 'deg)';
                blockquoteRot -= 360;
            }

            soundCurrent(config);

        })
    }

};

const soundCurrent = (config) => {
    const lastOrderArrNumber = config.orderArr.length - 1;
    const lastOrderArrItem = config.orderArr[lastOrderArrNumber];
    const audio = new Audio(cards[config.category][lastOrderArrItem].audioSrc);
    audio.play();
};
const soundError = () => {
    const audio = new Audio('./assets/audio/sound-error.mp3');
    audio.play();
};
const soundCorrect = () => {
    const audio = new Audio('./assets/audio/sound-correct.mp3');
    audio.play();
};

const shuffleCard = (bodyElem) => {
    const cardElemCont = bodyElem.querySelector('.main-categories-cards');
    const cardElems = cardElemCont.querySelectorAll('.category-item');

    cardElems.forEach( function (elem,i) {
        cardElemCont.appendChild(cardElems[Math.random() * i | 0])
    });

};

const playMode = (callback,config) => {
    const bodyElem = document.body;
    const thisElem = bodyElem.querySelector('.switch-mode-js');

    thisElem.addEventListener('change', () => {

        const gameStartBtn = bodyElem.querySelector('.game-start-btn');

        if (thisElem.checked) {

            callback(true);
            bodyElem.classList.add('switch-mode-body-play');

            if (gameStartBtn) {
                gameStartBtn.disabled = false;
            }

        } else {

            callback(false);
            bodyElem.classList.remove('switch-mode-body-play');

            if (gameStartBtn) {
                gameStartBtn.disabled = true;
            }

            if (config.game) {
                setTimeout(() => {
                    bodyElem.querySelector('.main-nav ul li a.active').click();
                }, 500);
            }

        }
    })
};

const mobileMenuOpenClose = () => {
    const openMobileMenu = () => {
        const headerElem = document.querySelector('.page-header');
        headerElem.classList.add('mob-menu-open');
    };
    const closeMobileMenu = () => {
        const headerElem = document.querySelector('.page-header');
        headerElem.classList.remove('mob-menu-open');
    };

    const headerMobMenuBtn = document.querySelector('.btn-menu');
    headerMobMenuBtn.addEventListener("click", openMobileMenu);

    const headerNavLink = document.querySelectorAll('.btn-close-menu, .main-nav li a, .page-header-menu-shadow');
    headerNavLink.forEach(function (button) {
        button.addEventListener("click", closeMobileMenu);
    });
};


handleLoad();
