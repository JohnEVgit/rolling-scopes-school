'use strict';

// Mobile menu open/close
function toggleMobileMenu() {
    console.log(1);
    const headerElem = document.querySelector('.page-header');
    if ( headerElem.classList.contains('mob-menu-open') ) {
        headerElem.classList.remove('mob-menu-open');
        this.setAttribute('aria-label', 'Menu open');
    } else {
        headerElem.classList.add('mob-menu-open');
        this.setAttribute('aria-label', 'Close open');
    }
};
function closeMobileMenu() {
    const headerElem = document.querySelector('.page-header');
    if ( headerElem.classList.contains('mob-menu-open') ) {
        headerElem.classList.remove('mob-menu-open');
        this.setAttribute('aria-label', 'Menu open');
    }
};

const headerMobMenuBtn = document.querySelector('.header-mob-menu-btn');
headerMobMenuBtn.addEventListener("click", toggleMobileMenu);

const headerNavLink = document.querySelectorAll('.header-nav-ul li a');
headerNavLink.forEach(function (button) {
    button.addEventListener("click", closeMobileMenu);
});
const pageHeaderMenuShadow = document.querySelector('.page-header-menu-shadow');
pageHeaderMenuShadow.addEventListener("click", closeMobileMenu);