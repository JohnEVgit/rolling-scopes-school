'use strict';

const handleLoad = () => {
    const config = {
        mode: false
    };

    englishMode((mode) => {
        config.mode = mode;
    })
};



const englishMode = (callback) => {
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

handleLoad();


// Mobile menu open/close
function openMobileMenu() {
    const headerElem = document.querySelector('.page-header');
    headerElem.classList.add('mob-menu-open');
}
function closeMobileMenu() {
    const headerElem = document.querySelector('.page-header');
    headerElem.classList.remove('mob-menu-open');
}

const headerMobMenuBtn = document.querySelector('.btn-menu');
headerMobMenuBtn.addEventListener("click", openMobileMenu);

const headerNavLink = document.querySelectorAll('.btn-close-menu, .main-nav li a, .page-header-menu-shadow');
headerNavLink.forEach(function (button) {
    button.addEventListener("click", closeMobileMenu);
});

