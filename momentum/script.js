// DOM Elements
const time = document.querySelector('.time'),
    dateElem = document.querySelector('.date'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');

// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        date = today.toLocaleString('ru', {weekday: 'long', day: 'numeric', month: 'long'});

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    // Output Date
    dateElem.innerHTML = date;

    // update bg every hour
    if (min === 0 && sec === 0) {
        showBgGreet(hour);
        getWeather();
    }

    // update random array images every day
    if (hour === 0 && min === 0 && sec === 0) {
        localStorage.setItem('images', shuffle(images));
    }

    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    showBgGreet(hour);
}


// images array
let images = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20'];

// shuffle images
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
shuffle(images);


let base;
let count;
function showBgGreet(hour) {
    count = hour % 6;
    if (hour < 6) {
        // Night
        base = 'assets/images/night/';
        getImage();
        greeting.textContent = 'Доброй ночи, ';
    } else if (hour < 12) {
        // Morning
        base = 'assets/images/morning/';
        getImage();
        greeting.textContent = 'Доброе утро, ';
    } else if (hour < 18) {
        // Afternoon
        base = 'assets/images/day/';
        getImage();
        greeting.textContent = 'Добрый день, ';
    } else {
        // Evening
        base = 'assets/images/evening/';
        getImage();
        greeting.textContent = 'Добрый вечер, ';
    }
}

// Smooth image change
function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src + '.jpg';
    img.onload = () => {
        body.style.backgroundImage = `url('${src}.jpg')`;
    };
}
function getImage() {
    const index = count % images.length;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
}

// Smooth image change by button click
const btn = document.querySelector('.change-image-btn');
let changeImageRot = 360;
btn.addEventListener('click', getImageClick);
function getImageClick() {
    btn.style.transform = 'rotate(' + changeImageRot + 'deg)';
    changeImageRot += 360;
    ++count;
    if (base === 'assets/images/night/' && count > 5) {
        base = 'assets/images/morning/';
        count = 0
    }
    if (base === 'assets/images/morning/' && count > 5) {
        base = 'assets/images/day/';
        count = 0
    }
    if (base === 'assets/images/day/' && count > 5) {
        base = 'assets/images/evening/';
        count = 0
    }
    if (base === 'assets/images/evening/' && count > 5) {
        base = 'assets/images/night/';
        count = 0
    }
    getImage();
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
        name.textContent = '[Введите имя]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
let nameText = '';
function setName(e) {
    if (e.type === 'focus') {
        if (e.target.innerText) {
            nameText = e.target.innerText;
        }
        e.target.innerText = '';
    }
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    }
    if (e.type === 'blur') {
        if (e.target.innerText === '' || e.target.innerText.trim().length === 0) {
            localStorage.setItem('name', nameText);
            e.target.innerText = nameText;
        } else {
            localStorage.setItem('name', e.target.innerText);
        }
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
        focus.textContent = '[Введите цель]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
let focusText = '';
function setFocus(e) {
    if (e.type === 'focus') {
        focus.focus();
        if (e.target.innerText) {
            focusText = e.target.innerText;
        }
        e.target.innerText = '';
    }
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    }
    if (e.type === 'blur') {
        if (e.target.innerText === '' || e.target.innerText.trim().length === 0) {
            localStorage.setItem('focus', focusText);
            e.target.innerText = focusText;
        } else {
            localStorage.setItem('focus', e.target.innerText);
        }
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('focus', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('focus', setFocus);

// blockquote widget
const blockquote = document.querySelector('.quote-text');
const figcaption = document.querySelector('.author-text');
const quoteBtn = document.querySelector('.new-quote-btn');
let blockquoteRot = 360;
async function getQuote(e) {
    if (e) {
        quoteBtn.style.transform = 'rotate(' + blockquoteRot + 'deg)';
        blockquoteRot += 360;
    }
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;

    if (!blockquote.classList.contains('active')) {
        blockquote.classList.add('active');
    }
}
quoteBtn.addEventListener('click', getQuote);


// weather widget
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');

function getStartWeather() {
    if (localStorage.getItem('city') === '' || localStorage.getItem('city') === null) {
        city.textContent = 'Минск';
        localStorage.setItem('city', 'Минск');
    } else {
        city.textContent = localStorage.getItem('city');
    }
}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=4d94a9de516ddaf00d932526ee6bb7cd&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === '404') {
        weatherError.textContent = 'Город не найден';
        weatherError.classList.add('show');
        city.textContent = localStorage.getItem('city');
        city.blur();
    } else {
        localStorage.setItem('city', city.innerText);
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;

        windSpeed.textContent = `Скорость ветра: ${data.wind.speed}м/с`;
        humidity.textContent = `Относительная влажность воздуха: ${data.main.humidity}%`;

        weatherDescription.textContent = data.weather[0].description;
    }
}

function setCity(e) {
    weatherError.classList.remove('show');
    weatherError.textContent = '';
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText === '' || e.target.innerText.trim().length === 0) {
                city.textContent = localStorage.getItem('city');
                city.blur();
            } else {
                getWeather();
                city.blur();
            }

        }
    }
}

city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('focus', setCity);


// Run
showTime();
setBgGreet();
getName();
getFocus();
getQuote();
getStartWeather();
getWeather();