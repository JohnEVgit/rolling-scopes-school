'use strict';

import {categoryes, cards} from "./cards.js";
import getMainHTML from "./renderMainHTML.js";

const handleLoad = () => {

    const bodyElem = document.body;

    const config = {
        mode: false
    };

    bodyElem.insertAdjacentHTML('afterBegin', getMainHTML());

    const mainContentElem = bodyElem.querySelector('.main-content-block');

    playMode((mode) => {
        config.mode = mode;
    });

    renderMenu(mainContentElem,config);

    loadMainPage(mainContentElem,config);

    mobileMenuOpenClose();

};

const renderMainLiElem = (menuHtml,mainContentElem,config) => {
    const menuLinkElem = document.createElement('a');
    menuLinkElem.classList.add('btn', 'active');
    menuLinkElem.setAttribute('href', '#');
    menuLinkElem.textContent = 'Main Page';

    menuLinkElem.addEventListener('click', function () {
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
            loadCategoryPage(that,mainContentElem,config);
        });

        const menuLiElem = document.createElement('li');
        menuLiElem.appendChild(menuLinkElem);

        menuHtml.appendChild(menuLiElem);
    });

    document.querySelector('.main-nav ul').appendChild(menuHtml);
};


const loadMainPage = (mainContentElem,config) => {
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



const loadCategoryPage = (that,mainContentElem,config) => {

    const pageCardsList = cards[that.dataset.id];
    const containerHtml = document.createElement('div');
    const cardListFragment = document.createDocumentFragment();

    containerHtml.classList.add('main-categories', 'main-categories-cards');
    document.querySelector('.page-title').textContent = categoryes[that.dataset.id].category;

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
};

const renderCard = (cardLinkElem,item) => {
    cardLinkElem.innerHTML = `
        <div class="category-front">
            <div class="category-img-cont">
                <img class="category-img" src="${item.image}" alt="${item.word}">
            </div>
            <div class="category-title category-title-front">
                <span>${item.word}</span>
                <button class="category-rotate" type="button" aria-label="rotate"></button>
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
            console.log(true);
            // TODO play mode card click
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

const leaveCard = (cardLinkElem) => {
    cardLinkElem.addEventListener('mouseleave', function () {
        let that = this;
        if (that.classList.contains('rotate')) {
            that.classList.remove('rotate')
        }
    });
};


const playMode = (callback) => {
    const bodyElem = document.body;
    const thisElem = bodyElem.querySelector('.switch-mode-js');
    thisElem.addEventListener('change', () => {
        if (thisElem.checked) {
            callback(true);
            bodyElem.classList.add('switch-mode-body-play');
        } else {
            callback(false);
            bodyElem.classList.remove('switch-mode-body-play');
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
