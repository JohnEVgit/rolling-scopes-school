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


let pets = [];
const request = new XMLHttpRequest();
request.open('GET', './pets.json');
request.onload = () => {console.log(request.response)};
fetch('./pets.json').then(res => res.json()).then(list => {
    pets = list;
});


var support = { animations : true },
    onEndAnimation = function( el, callback ) {
        var onEndCallbackFn = function( ev ) {
            if( support.animations ) {
                if( ev.target != this ) return;
                this.removeEventListener( 'animationend', onEndCallbackFn );
            }
            if( callback && typeof callback === 'function' ) { callback.call(); }
        };
        if( support.animations ) {
            el.addEventListener( 'animationend', onEndCallbackFn );
        }
        else {
            onEndCallbackFn();
        }
    };


function extend( a, b ) {
    for( var key in b ) {
        if( b.hasOwnProperty( key ) ) {
            a[key] = b[key];
        }
    }
    return a;
}

function DialogFx( el, options ) {
    this.el = el;
    this.options = extend( {}, this.options );
    extend( this.options, options );
    this.ctrlClose = this.el.querySelector( '[data-dialog-close]' );
    this.isOpen = false;
    this._initEvents();
}

DialogFx.prototype.options = {
    // callbacks
    onOpenDialog : function() { return false; },
    onCloseDialog : function() { return false; }
}

DialogFx.prototype._initEvents = function() {
    var self = this;

    // close action
    this.ctrlClose.addEventListener( 'click', this.toggle.bind(this) );

    // esc key closes dialog
    document.addEventListener( 'keydown', function( ev ) {
        var keyCode = ev.keyCode || ev.which;
        if( keyCode === 27 && self.isOpen ) {
            self.toggle();
        }
    } );

    this.el.querySelector( '.dialog__overlay' ).addEventListener( 'click', this.toggle.bind(this) );
}

DialogFx.prototype.toggle = function() {
    var self = this;
    if( this.isOpen ) {
        this.el.classList.remove('dialog--open');
        self.el.classList.add('dialog--close');

        onEndAnimation( this.el.querySelector( '.dialog__content' ), function() {
            //classie.remove( self.el, 'dialog--close' );
            self.el.classList.remove('dialog--close');
            document.querySelector('body').classList.remove('body-dialog-open');
        } );

        // callback on close
        this.options.onCloseDialog( this );
    }
    else {
        // debugger
        this.el.classList.add('dialog--open');
        document.querySelector('body').classList.add('body-dialog-open');
        // let pet = pets.find(petEl => petEl.name === userItemElem.querySelector('.pets-elem-title').innerText);
        // this.el.querySelector('.dialog__pet-img-js').src = pet.img;
        // this.el.querySelector('.dialog__pet-name-js').innerText = pet.name;
        // this.el.querySelector('.dialog__pet-type-js').innerText = pet.type;
        // this.el.querySelector('.dialog__pet-breed-js').innerText = pet.breed;
        // this.el.querySelector('.dialog__pet-description-js').innerText = pet.description;
        // this.el.querySelector('.dialog__pet-age-js').innerText = pet.age;
        // this.el.querySelector('.dialog__pet-inoculations-js').innerText = pet.inoculations.join(', ');
        // this.el.querySelector('.dialog__pet-diseases-js').innerText = pet.diseases.join(', ');
        // this.el.querySelector('.dialog__pet-parasites-js').innerText = pet.parasites.join(', ');
        // callback on open
        this.options.onOpenDialog( this );
    }
    this.isOpen = !this.isOpen;
};

// add to global namespace
window.DialogFx = DialogFx;

var dlgtrigger = document.querySelectorAll( '[data-dialog]' ),
    somedialog = document.getElementById( dlgtrigger[0].getAttribute( 'data-dialog' ) ),
    dlg = new DialogFx( somedialog );

// let userItemElem;
// document.addEventListener('click', function(event) {
//     if (event.target.classList.value === 'pets-elem') { //
//         userItemElem = event.target.closest('.pets-elem');
//     }
//     if (event.target.closest('.pets-elem')) { //
//         userItemElem = event.target.closest('.pets-elem');
//     }
// });
dlgtrigger.forEach(function(userItem) {
    userItem.addEventListener( 'click', dlg.toggle.bind(dlg) );
});