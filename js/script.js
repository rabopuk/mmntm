"use strict";


const body = document.body;
let languages = document.querySelector('.language');





// DATE

const date = document.querySelector('.date');


function showDate() {
    let language = languages.textContent;
    const newDate = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        timeZone: 'UTC',
    };
    const currentDate = newDate.toLocaleDateString(language, options);

    date.innerHTML = currentDate;
};





// GREETINGS

const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');

const placeHolder = {
    en: '[Enter your name]',
    ru: '[Введите ваше имя]',
};


function getTimeOfDay() {
    let language = languages.textContent;

    let partOfDay = {
        en: ['night', 'morning', 'afternoon', 'evening'],
        ru: ['ночи,', 'утро,', 'день,', 'вечер,'],
    };

    let greetingDate = new Date();
    let hours = Number(greetingDate.getHours());

    return (partOfDay[language][(Math.floor(hours / 6))]);

};


function showGreeting() {
    let language = languages.textContent;
    let greetingText = '';

    if (language === 'en') {
        greetingText = `Good ${getTimeOfDay()}, `;
    } else {
        if (getTimeOfDay() === 'ночи,') {
            greetingText = `Доброй ${getTimeOfDay()}, `;
        } else if (getTimeOfDay() === 'утро,') {
            greetingText = `Доброе ${getTimeOfDay()}, `;
        } else
            greetingText = `Добрый ${getTimeOfDay()}, `;
    }

    nameInput.setAttribute('placeholder', placeHolder[language]);
    return greeting.innerHTML = greetingText;
};





// name в local storage

window.addEventListener('beforeunload', setLocalStorageName);
window.addEventListener('load', getLocalStorageName);


function setLocalStorageName() {
    localStorage.setItem('name', nameInput.value);
};

function getLocalStorageName() {
    if (localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }
};





// ВИДЖЕТ ПОГОДЫ

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherWind = document.querySelector('.wind');
const weatherHumidity = document.querySelector('.humidity');
const weatherInfo = document.querySelector('.weather__info');


async function getWeather() {
    let language = languages.textContent;

    if (city.textContent.length !== 0) {
        let nameCity = localStorage.getItem('city');
        let defaultCity = 'Yerevan';

        weatherInfo.style.display = 'flex';
        city.type = "text";
        city.classList.add('city');

        if (nameCity) {
            if (nameCity == 0) {
                city.textContent = defaultCity;
            } else {
                city.textContent = nameCity;
            }
        } else {
            city.textContent = defaultCity;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=${language}&appid=2f2592ae855fd76b18c0ad41ea108736&units=metric`;
        const res = await fetch(url);
        const data = await res.json();

        weatherIcon.classList.add(`owf-${data.weather[0].id}`);

        let translation = {
            wind: {
                ru: "Скорость ветра: ",
                en: "Wind speed: ",
            },
            humidity: {
                ru: "Влажность: ",
                en: "Humidity: ",
            },
            speed: {
                ru: " м/c",
                en: " m/s",
            },
        };

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.innerHTML = `${data.weather[0].description}`;
        weatherWind.innerHTML = `${translation.wind[language]} ${Math.round(data.wind.speed)} ${translation.speed[language]}`;
        weatherHumidity.innerHTML = `${translation.humidity[language]} ${data.main.humidity.toFixed(0)} %`;
    }
};


function setLocalStorageCity() {
    localStorage.setItem('city', city.textContent);
};
function getLocalStorageCity() {
    if (localStorage.getItem('city')) {
        city.textContent = localStorage.getItem('city');
    }
};


function sendCity() {
    function setCity(event) {
        if (event.code === 'Enter') {
            setLocalStorageCity();
            getWeather();
            city.blur();
        }
    };

    document.addEventListener('DOMContentLoaded', getWeather);
    city.addEventListener('keypress', setCity);
    document.addEventListener('click', (e) => {
        const withinBoundaries = e.composedPath().includes(city);

        if (!withinBoundaries) {
            setLocalStorageCity();
            getWeather();
            city.blur();
        }
    });
};


function initWeather() {
    window.addEventListener('beforeunload', setLocalStorageCity);
    window.addEventListener('load', getLocalStorageCity);
    sendCity();
    getWeather();
};
initWeather();





// QUOTES

const textOfQuote = document.querySelector('.quote');
const authorOfQuote = document.querySelector('.author');
const buttonChangeQuote = document.querySelector('.change-quote');


function getRandomNum(max) {
    return Math.floor(Math.random() * max)
};


function getQuotes() {
    const quotes = 'data.json';
    fetch(quotes)
        .then(res => res.json())
        .then(data => {
            let language = languages.textContent;
            textOfQuote.innerHTML = data[language][getRandomNum(data[language].length)].text;
            authorOfQuote.innerHTML = data[language][getRandomNum(data[language].length)].author;
        });
};


function changeQuotes() {
    getQuotes();
    buttonChangeQuote.addEventListener('click', getQuotes);
};
changeQuotes();




// SLIDER

const prevSlideButton = document.querySelector('.slide-prev');
const nextSlideButton = document.querySelector('.slide-next');
const img = new Image();


function getRandomNumSlide(max) {
    return Math.floor(Math.random() * max + 1)
};


let randomNumGlobal = getRandomNumSlide(20);


function showPartOfDay() {
    const timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
    const currentDate = new Date();
    const hours = currentDate.getHours();
    return timeOfDay[Math.floor(hours / 6)];
};


function BackgroundSlider() {
    function getSliderNumber(randomNumGlobal) {
        let randomNum = randomNumGlobal;
        return randomNum
    };


    prevSlideButton.addEventListener('click', getSlidePrev);
    nextSlideButton.addEventListener('click', getSlideNext);

    function getSlidePrev() {
        (randomNumGlobal == 1) ? randomNumGlobal = 20 : randomNumGlobal--;
        getSliderNumber(randomNumGlobal);
        setBG();
    };


    function getSlideNext() {
        (randomNumGlobal == 20) ? randomNumGlobal = 1 : randomNumGlobal++;
        getSliderNumber(randomNumGlobal);
        setBG();
    };


    function setBG() {
        let random = (String(getSliderNumber(randomNumGlobal))).padStart(2, "0");
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${showPartOfDay()}/${random}.jpg`;
        img.onload = () => {
            body.style.backgroundImage = `url(${img.src})`;
        };
    };

    setBG();
};





// TIME

const time = document.querySelector('.time');


function showTime() {
    const newDate = new Date();
    const currentTime = newDate.toLocaleTimeString();

    time.innerHTML = currentTime;

    setTimeout(showTime, 1000);

    showDate();
    showGreeting();
};
showTime();