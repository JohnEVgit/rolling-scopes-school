const Keyboard = {
    elements: {
        textarea: null,
        main: null,
        keysContainer: null,
        keys: [],
        textKeys: [],
        shiftTextKeys: [],
        textRuKeys: [],
        shiftTextRuKeys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: '',
        cursorPosition: 0,
        capsLock: false,
        shift: false,
        rus: false,
        sound: false
    },

    init() {
        this.elements.textarea = document.querySelector('.use-keyboard-input');
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        this.elements.main.classList.add('keyboard', 'keyboard--hidden');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll('.use-keyboard-input').forEach(element => {
            element.addEventListener('focus', () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
            element.addEventListener('input', () => {
                this.properties.value = element.value;
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
            'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", "\\", 'enter',
            'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'lang',
            'sound', 'space', 'left', 'right', 'done'
        ];
        const shiftKeyLayout = [
            '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}',
            'caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', "|", 'enter',
            'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'lang',
            'sound', 'space', 'left', 'right', 'done'
        ];

        const keyRuLayout = [
            'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
            'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', "э", "\\", 'enter',
            'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'lang',
            'sound', 'space', 'left', 'right', 'done'
        ];
        const shiftKeyRuLayout = [
            'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace',
            'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ',
            'caps', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', "/", 'enter',
            'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'lang',
            'sound', 'space', 'left', 'right', 'done'
        ];

        this.elements.textKeys = keyLayout;
        this.elements.shiftTextKeys = shiftKeyLayout;

        this.elements.textRuKeys = keyRuLayout;
        this.elements.shiftTextRuKeys = shiftKeyRuLayout;

        const createIconHTML = (icon_name) => {
            return `<i class='material-icons'>${icon_name}</i>`;
        };

        for (let i = 0; i < keyLayout.length; i++) {

            const keyElement = document.createElement('button');
            const insertLineBreak = ['backspace', ']', 'enter', 'lang'].indexOf(keyLayout[i]) !== -1;

            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key');

            switch (keyLayout[i]) {
                case 'backspace':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('backspace');

                    keyElement.addEventListener('click', () => {

                        this._playSound(keyLayout[i]);

                        this.properties.cursorPosition = this.elements.textarea.selectionStart;

                        let valueStart = this.properties.value.slice(0, this.properties.cursorPosition - 1);
                        let valueFinish = this.properties.value.slice(this.properties.cursorPosition);

                        this.properties.value = valueStart + valueFinish;
                        this._triggerEvent('oninput');
                        this.elements.textarea.focus();

                        this.properties.cursorPosition -= 1;

                        this.elements.textarea.selectionStart = this.properties.cursorPosition;
                        this.elements.textarea.selectionEnd = this.properties.cursorPosition;
                    });

                    break;

                case 'caps':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                    keyElement.innerHTML = createIconHTML('keyboard_capslock');

                    keyElement.addEventListener('click', () => {

                        this._playSound(keyLayout[i]);

                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
                        this.elements.textarea.focus();
                    });

                    break;

                case 'enter':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('keyboard_return');

                    keyElement.addEventListener('click', () => {

                        this._playSound(keyLayout[i]);

                        this.properties.cursorPosition = this.elements.textarea.selectionStart;

                        let valueStart = this.properties.value.slice(0, this.properties.cursorPosition);
                        let valueFinish = this.properties.value.slice(this.properties.cursorPosition);

                        this.properties.value = valueStart + '\n' + valueFinish;
                        this._triggerEvent('oninput');
                        this.elements.textarea.focus();

                        this.properties.cursorPosition += 1;

                        this.elements.textarea.selectionStart = this.properties.cursorPosition;
                        this.elements.textarea.selectionEnd = this.properties.cursorPosition;
                    });

                    break;

                case 'Shift':
                    keyElement.textContent = keyLayout[i];
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable', 'keyboard__key--shift');
                    keyElement.addEventListener('click', () => {

                        this._playSound(keyLayout[i]);

                        this._toggleShift();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.shift);
                        this.elements.textarea.focus();
                    });

                    break;

                case 'lang':
                    keyElement.textContent = keyLayout[i];

                    keyElement.innerHTML = '<span>en</span>/<span>ru</span>';

                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--language');

                    keyElement.addEventListener('click', () => {

                        this._playSound(keyLayout[i]);

                        this._toggleLanguage();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.rus);
                        this.elements.textarea.focus();
                    });

                    break;

                case 'space':
                    keyElement.classList.add('keyboard__key--extra-wide');
                    keyElement.innerHTML = createIconHTML('space_bar');

                    keyElement.addEventListener('click', () => {

                        this._playSound(keyLayout[i]);

                        this.properties.cursorPosition = this.elements.textarea.selectionStart;

                        let valueStart = this.properties.value.slice(0, this.properties.cursorPosition);
                        let valueFinish = this.properties.value.slice(this.properties.cursorPosition);

                        this.properties.value = valueStart + ' ' + valueFinish;

                        this._triggerEvent('oninput');
                        this.elements.textarea.focus();

                        this.properties.cursorPosition += 1;

                        this.elements.textarea.selectionStart = this.properties.cursorPosition;
                        this.elements.textarea.selectionEnd = this.properties.cursorPosition;
                    });

                    break;

                case 'left':
                    keyElement.innerHTML = createIconHTML('keyboard_arrow_left');

                    keyElement.addEventListener('click', () => {

                        this._playSound(keyLayout[i]);

                        this.elements.textarea.focus();
                        if (this.properties.cursorPosition > 0) {
                            this.properties.cursorPosition -= 1;
                            this.elements.textarea.selectionStart = this.properties.cursorPosition;
                            this.elements.textarea.selectionEnd = this.properties.cursorPosition;
                        }
                    });

                    break;


                case 'right':
                    keyElement.innerHTML = createIconHTML('keyboard_arrow_right');

                    keyElement.addEventListener('click', () => {

                        this._playSound(keyLayout[i]);

                        this.elements.textarea.focus();
                        if (this.properties.cursorPosition < this.properties.value.length) {
                            this.properties.cursorPosition += 1;
                            this.elements.textarea.selectionStart = this.properties.cursorPosition;
                            this.elements.textarea.selectionEnd = this.properties.cursorPosition;
                        }
                    });

                    break;

                case 'sound':
                    keyElement.innerHTML = createIconHTML('volume_up');
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                    keyElement.addEventListener('click', () => {
                        this.properties.sound = !this.properties.sound;
                        this._playSound(keyLayout[i]);

                        keyElement.classList.toggle('keyboard__key--active', this.properties.sound);
                        this.elements.textarea.focus();
                    });

                    break;

                case 'done':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
                    keyElement.innerHTML = createIconHTML('check_circle');

                    keyElement.addEventListener('click', () => {

                        this._playSound(keyLayout[i]);

                        this.close();
                        this._triggerEvent('onclose');
                    });

                    break;

                default:
                    keyElement.textContent = keyLayout[i].toLowerCase();

                    keyElement.addEventListener('click', () => {

                        this._playSound(keyLayout[i]);

                        this.properties.cursorPosition = this.elements.textarea.selectionStart;

                        let valueStart = this.properties.value.slice(0, this.properties.cursorPosition);
                        let valueFinish = this.properties.value.slice(this.properties.cursorPosition);
                        let valueChar = '';

                        if (this.properties.shift) {
                            if (this.properties.rus) {
                                valueChar = this.properties.capsLock ? shiftKeyRuLayout[i].toLowerCase() : shiftKeyRuLayout[i].toUpperCase();
                            } else {
                                valueChar = this.properties.capsLock ? shiftKeyLayout[i].toLowerCase() : shiftKeyLayout[i].toUpperCase();
                            }
                        } else {
                            if (this.properties.rus) {
                                valueChar = this.properties.capsLock ? keyRuLayout[i].toUpperCase() : keyRuLayout[i].toLowerCase();
                            } else {
                                valueChar = this.properties.capsLock ? keyLayout[i].toUpperCase() : keyLayout[i].toLowerCase();
                            }
                        }

                        this.properties.value = valueStart + valueChar + valueFinish;

                        if (this.properties.shift) {
                            this._toggleShift();
                            document.querySelector('.keyboard__key--shift').classList.toggle('keyboard__key--active', this.properties.shift);
                        }

                        this._triggerEvent('oninput');
                        this.elements.textarea.focus();

                        this.properties.cursorPosition += 1;

                        this.elements.textarea.selectionStart = this.properties.cursorPosition;
                        this.elements.textarea.selectionEnd = this.properties.cursorPosition;
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement('br'))
            }
        }

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof  this.eventHandlers[handlerName] == 'function') {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0 && key.textContent.length === 1) {
                if (this.properties.shift) {
                    key.textContent = this.properties.capsLock ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
                } else {
                    key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                }
            }
        }
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        for (const [i, key] of this.elements.keys.entries()) {
            if (key.childElementCount === 0 && key.textContent.length === 1) {
                if (this.properties.rus) {
                    if (this.properties.capsLock) {
                        key.textContent = this.properties.shift ? key.textContent = this.elements.shiftTextRuKeys[i].toLowerCase() : key.textContent = this.elements.textRuKeys[i].toUpperCase();
                    } else {
                        key.textContent = this.properties.shift ? key.textContent = this.elements.shiftTextRuKeys[i] : key.textContent = this.elements.textRuKeys[i];
                    }
                } else {
                    if (this.properties.capsLock) {
                        key.textContent = this.properties.shift ? key.textContent = this.elements.shiftTextKeys[i].toLowerCase() : key.textContent = this.elements.textKeys[i].toUpperCase();
                    } else {
                        key.textContent = this.properties.shift ? key.textContent = this.elements.shiftTextKeys[i] : key.textContent = this.elements.textKeys[i];
                    }
                }
            }
        }
    },

    _toggleLanguage() {
        this.properties.rus = !this.properties.rus;

        for (const [i, key] of this.elements.keys.entries()) {
            if (key.childElementCount === 0 && key.textContent.length === 1) {
                if (this.properties.rus) {
                    if (this.properties.capsLock) {
                        key.textContent = this.properties.shift ? key.textContent = this.elements.shiftTextRuKeys[i].toLowerCase() : key.textContent = this.elements.textRuKeys[i].toUpperCase();
                    } else {
                        key.textContent = this.properties.shift ? key.textContent = this.elements.shiftTextRuKeys[i] : key.textContent = this.elements.textRuKeys[i];
                    }
                } else {
                    if (this.properties.capsLock) {
                        key.textContent = this.properties.shift ? key.textContent = this.elements.shiftTextKeys[i].toLowerCase() : key.textContent = this.elements.textKeys[i].toUpperCase();
                    } else {
                        key.textContent = this.properties.shift ? key.textContent = this.elements.shiftTextKeys[i] : key.textContent = this.elements.textKeys[i];
                    }
                }

            }
        }
    },

    _playSound(button) {
        if (this.properties.sound) {
            let audio;
            let langSound = '';
            if (this.properties.rus) {
                langSound = 'ru-'
            }
            if (button === 'backspace' || button === 'caps' || button === 'enter' || button === 'Shift' || button === 'lang'
                || button === 'space' || button === 'left' || button === 'right' || button === 'done' || button === 'sound') {
                audio = document.querySelector('audio[data-key="' + langSound + button + '"]');
            } else {
                audio = document.querySelector('audio[data-key="' + langSound + 'default"]');
            }
            audio.currentTime = 0;
            audio.play();
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard--hidden');
        this.elements.textarea.classList.add('textarea-focus');
    },

    close() {
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard--hidden');
        this.elements.textarea.classList.remove('textarea-focus');
    }

};

window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();
});