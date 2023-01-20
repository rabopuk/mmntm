const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
let languages = document.querySelector('.language');


const placeHolder = {
    en: '[Enter your name]',
    ru: '[Введите ваше имя]',
};

function getTimeOfDay() {
    let language = languages.textContent;
    let partOfDay = {
        en: ['night', 'morning', 'afternoon', 'evening'],
        ru: ['ночи,', 'утро,', 'день,', 'вечер,']
    };
    let greetingDate = new Date();
    let hours = Number(greetingDate.getHours());

    return (partOfDay[language][(Math.floor(hours / 6))]);
}

function showGreeting() {
    let language = languages.textContent;
    let greetingText = '';
    if (language == 'en') {
        greetingText = `Good ${getTimeOfDay()}`;
    } else {
        if (getTimeOfDay() == 'ночи,') {
            greetingText = `Доброй ${getTimeOfDay()}`
        } else if (getTimeOfDay() == 'утро,') {
            greetingText = `Доброе ${getTimeOfDay()}`
        } else
            greetingText = `Добрый ${getTimeOfDay()}`
    };

    nameInput.setAttribute('placeholder', placeHolder[language]);
    return greeting.innerHTML = greetingText;
}