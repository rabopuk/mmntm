/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/date.js":
/*!***************************!*\
  !*** ./assets/js/date.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
});
                const date = document.querySelector('.date');
                let languages = document.querySelector('.language');


                function showDate() {
                    let language = languages.textContent
                    const newDate = new Date;
                    const options = { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' };
                    const currentDate = newDate.toLocaleDateString(language, options);
                    date.innerHTML = currentDate;
                }


    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showDate);


                /***/
}),

    /***/ "./assets/js/greeting.js":
    /*!*******************************!*\
      !*** ./assets/js/greeting.js ***!
      \*******************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
});
                const greeting = document.querySelector('.greeting');
                const name = document.querySelector('.name');
                let languages = document.querySelector('.language');


                const placeHolder = {
                    en: '[Enter your name]',
                    ru: '[Введите ваше имя]',
                }

                function getTimeOfDay() {
                    let language = languages.textContent
                    let partOfDay = {
                        en: ['night', 'morning', 'afternoon', 'evening'],
                        ru: ['ночи,', 'утро,', 'день,', 'вечер,']
                    };
                    let greetingDate = new Date();
                    let hours = Number(greetingDate.getHours());

                    return (partOfDay[language][(Math.floor(hours / 6))]);
                }

                function showGreeting() {
                    let language = languages.textContent
                    console.log(languages.textContent)
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

                    name.setAttribute('placeholder', placeHolder[language]);
                    return greeting.innerHTML = greetingText;
                }

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showGreeting);

                window.addEventListener('beforeunload', setLocalStorage);
                window.addEventListener('load', getLocalStorage)

                function setLocalStorage() {
                    localStorage.setItem('name', name.value);
                }

                function getLocalStorage() {
                    if (localStorage.getItem('name')) {
                        name.value = localStorage.getItem('name');
                    }
                }



                /***/
}),

    /***/ "./assets/js/player.js":
    /*!*****************************!*\
      !*** ./assets/js/player.js ***!
      \*****************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
});
    /* harmony import */ var _playlist_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlist.js */ "./assets/js/playlist.js");



                const audio = new Audio();
                let audioVolume = document.querySelector('.volume-line');
                let musicTitle = document.querySelector('.music__title');
                let audioMute = document.querySelector('.audio-mute');
                let musicPlayList = document.querySelector('.play-list');
                let musicButtonPlay = document.querySelector('.play');
                let musicButtonNext = document.querySelector('.play-next');
                let musicButtonPrev = document.querySelector('.play-prev');
                let timeline = document.querySelector('.timeline');
                let currentBar = document.querySelector('.current')
                let progressBar = document.querySelector(".progress")
                let audioLength = document.querySelector(".length")
                let currentVolume;
                let currentTimeGlobal = 0;
                let isPlay = false;
                let musicNumber = 0;
                let listItem;
                let miniBtn;


                function initPlayList() {
                    _playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(function (el) {
                        const li = document.createElement('li');
                        const miniBtn = document.createElement('span');
                        miniBtn.classList.add('play-mini');
                        miniBtn.classList.add('mini-btn');

                        li.classList.add('play-item');
                        li.innerHTML = el.title;
                        musicPlayList.append(li);
                        li.append(miniBtn);
                    }
                    )
                    listItem = document.querySelectorAll('.play-item');
                    miniBtn = document.querySelectorAll('.mini-btn');
                }


                function getTimeCodeFromNum(num) {
                    let seconds = parseInt(num);
                    let minutes = parseInt(seconds / 60);
                    seconds -= minutes * 60;
                    const hours = parseInt(minutes / 60);
                    minutes -= hours * 60;

                    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
                    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
                }


                function setDurationTime(duration) {
                    audioLength.innerHTML = getTimeCodeFromNum(duration);
                }

                function setIntervalAudio() {
                    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
                    currentTimeGlobal = audio.currentTime;
                    currentBar.innerHTML = getTimeCodeFromNum(currentTimeGlobal);
                    setTimeout(setIntervalAudio, 500);
                };

                function setTime() {
                    currentTimeGlobal = audio.currentTime;
                    currentBar.innerHTML = getTimeCodeFromNum(currentTimeGlobal);
                }

                function playMusic() {
                    audio.src = _playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"][musicNumber].src;
                    audio.currentTime = currentTimeGlobal;
                    setDurationTime(_playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"][musicNumber].duration);
                    if (isPlay == false) {
                        musicTitle.innerHTML = _playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"][musicNumber].title;
                        audio.volume = audioVolume.value / 100;
                        isPlay = true;
                        audio.play();
                        musicButtonPlay.classList.add('pause');
                        listItem[musicNumber].classList.add('item-active');
                        miniBtn[musicNumber].classList.add('pause-mini');
                    } else {
                        audio.pause();
                        musicButtonPlay.classList.remove('pause');
                        isPlay = false;
                        listItem[musicNumber].classList.remove('item-active');
                        miniBtn[musicNumber].classList.remove('pause-mini');
                        setTime();
                    };
                }


                function changeAudio() {
                    for (let i = 0; i < listItem.length; i++) {
                        listItem[i].addEventListener('click', function () {
                            if (i == musicNumber && isPlay) {
                                listItem[musicNumber].classList.add('item-active');
                                miniBtn[musicNumber - 1].classList.remove('pause-mini');
                                isPlay = true;
                                currentTimeGlobal = 0;
                                playMusic();
                            } else {
                                listItem[musicNumber].classList.remove('item-active');
                                miniBtn[musicNumber].classList.remove('pause-mini');
                                listItem.forEach((item) => item.classList.remove('pause'))
                                musicNumber = i;
                                isPlay = false;
                                currentTimeGlobal = 0;
                                playMusic();
                            }
                        })
                    }
                }


                function changeAudioOnBtn() {
                    for (let i = 0; i < miniBtn.length; i++) {
                        miniBtn[i].addEventListener('click', function () {
                            currentTimeGlobal = audio.currentTime;
                            if (i == musicNumber && isPlay) {
                                isPlay = false;
                                setTime();
                                console.log(currentTimeGlobal)
                                miniBtn[i].classList.remove('pause-mini');
                                playMusic();
                            } else {
                                miniBtn.forEach((item) => item.classList.remove('pause-mini'))
                                miniBtn[i].classList.add('pause-mini');
                                musicNumber = i;
                                isPlay = true;
                                playMusic();
                            }
                        })
                    }
                }

                //click to prev song
                function playPrev() {
                    currentTimeGlobal = 0;
                    isPlay = false;
                    listItem[musicNumber].classList.remove('item-active');
                    if (musicNumber == 0) {
                        miniBtn[musicNumber].classList.remove('pause-mini');
                        musicNumber = _playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"].length - 1;
                    } else {
                        miniBtn[musicNumber].classList.remove('pause-mini');
                        musicNumber--;
                    }
                    if (!musicButtonPlay.classList.contains('pause')) {
                        musicButtonPlay.classList.add('pause');
                    }
                    playMusic();
                }

                //click to next song
                function playNext() {
                    currentTimeGlobal = 0;
                    isPlay = false;
                    listItem[musicNumber].classList.remove('item-active');
                    if (musicNumber == _playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"].length - 1) {
                        miniBtn[musicNumber].classList.remove('pause-mini');
                        musicNumber = 0;
                    } else {
                        miniBtn[musicNumber].classList.remove('pause-mini');
                        musicNumber++;
                    }
                    if (!musicButtonPlay.classList.contains('pause')) {
                        musicButtonPlay.classList.add('pause');
                    }
                    playMusic();
                }

                //click on timeline
                function movetimeline(e) {
                    if (!isFinite()) {
                        const timelineWidth = window.getComputedStyle(timeline).width;
                        console.log(timelineWidth)
                        const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
                        console.log(e.offsetX)
                        audio.currentTime = timeToSeek;
                    } else false;
                }



                //value

                function setValue() {
                    audio.volume = audioVolume.value / 100;
                }

                function muteAudio() {
                    if (audioVolume.value > 0) {
                        currentVolume = audioVolume.value;
                        audioVolume.value = 0;
                        setValue();
                    } else {
                        audioVolume.value = currentVolume;
                        setValue();
                    }
                }


                function startPlayList() {
                    initPlayList();
                    musicButtonPlay.addEventListener('click', playMusic);
                    // music.addEventListener('ended', playNext);
                    musicButtonNext.addEventListener('click', playNext);
                    musicButtonPrev.addEventListener('click', playPrev);
                    timeline.addEventListener('click', movetimeline)
                    audioVolume.addEventListener('input', setValue);
                    audioMute.addEventListener('click', muteAudio);
                    changeAudio();
                    changeAudioOnBtn()
                    setIntervalAudio()
                }

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startPlayList);




                /***/
}),

    /***/ "./assets/js/playlist.js":
    /*!*******************************!*\
      !*** ./assets/js/playlist.js ***!
      \*******************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
});
                const playList = [
                    {
                        title: 'Aqua Caelestis',
                        src: '../assets/sounds/Aqua Caelestis.mp3',
                        duration: 39,
                    },

                    {
                        title: 'Ennio Morricone',
                        src: '../assets/sounds/Ennio Morricone.mp3',
                        duration: 97,
                    },

                    {
                        title: 'River Flows In You',
                        src: '../assets/sounds/River Flows In You.mp3',
                        duration: 97
                    },

                    {
                        title: 'Summer Wind',
                        src: '../assets/sounds/Summer Wind.mp3',
                        duration: 39
                    },

                ]

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playList);

                /***/
}),

    /***/ "./assets/js/quotes.js":
    /*!*****************************!*\
      !*** ./assets/js/quotes.js ***!
      \*****************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
});
                const textOfQuote = document.querySelector('.quote');
                const authorOfQuote = document.querySelector('.author');
                const buttonChangeQuote = document.querySelector('.change-quote');
                let languages = document.querySelector('.language');


                function getRandomNum(max) {
                    return Math.floor(Math.random() * max);
                }


                function getQuotes() {
                    const quotes = '/momentum/data.json';
                    fetch(quotes)
                        .then(res => res.json())
                        .then(data => {
                            let language = languages.textContent
                            textOfQuote.innerHTML = data[language][getRandomNum(data[language].length)].text;
                            authorOfQuote.innerHTML = data[language][getRandomNum(data[language].length)].author;
                        });
                }

                function changeQuotes() {
                    getQuotes()
                    buttonChangeQuote.addEventListener('click', getQuotes);
                }
                changeQuotes()
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (changeQuotes);

                /***/
}),

    /***/ "./assets/js/settinglist.js":
    /*!**********************************!*\
      !*** ./assets/js/settinglist.js ***!
      \**********************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (/* binding */ initPanel)
                    /* harmony export */
});
                const settingItemTitle = document.querySelectorAll('.setting__text');
                const widgetItemText = document.querySelectorAll('.widget__name');
                const settingsBtn = document.querySelector('.settings-img');
                const settingsBlock = document.querySelector('.settings');
                let languages = document.querySelector('.language');


                let isOpen = 'false';

                const wordsForTitle = {
                    en: ['Apllication Language', 'Image Source', 'Widgets'],
                    ru: ['Язык приложения', 'Источник фотографий', 'Виджеты'],
                }

                const wordsForText = {
                    en: ['Player', 'Time', 'Date', 'Weather', 'Greeting'],
                    ru: ['Плеер', 'Время', 'Дата', 'Погода', 'Приветствие'],
                }

                function openSettings() {
                    if (isOpen == 'false') {
                        settingsBlock.classList.add('settings-open')
                        settingsBlock.classList.remove('settings-close')
                        isOpen = 'true';
                    } else {
                        settingsBlock.classList.remove('settings-open')
                        settingsBlock.classList.add('settings-close')
                        isOpen = 'false';
                    }
                }



                function initPanel() {
                    settingsBtn.addEventListener('click', openSettings);


                    for (let i = 0; i < settingItemTitle.length; i++) {
                        let language = languages.textContent
                        settingItemTitle[i].innerHTML = wordsForTitle[language][i];
                    }
                    for (let i = 0; i < widgetItemText.length; i++) {
                        let language = languages.textContent
                        widgetItemText[i].innerHTML = wordsForText[language][i];
                    }
                    return
                }

                /***/
}),

    /***/ "./assets/js/settings.js":
    /*!*******************************!*\
      !*** ./assets/js/settings.js ***!
      \*******************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
});
                let languages = document.querySelector('.language');


                function setWidjets() {
                    let language = languages.textContent
                    let defaultActiveWidjets = ['Player', 'Time', 'Date', 'Weather', 'Greeting'];
                    for (let i = 0; i < defaultActiveWidjets.length; i++) {
                        if (!localStorage.getItem(defaultActiveWidjets[i])) {
                            localStorage.setItem(defaultActiveWidjets[i], 'true');
                        }
                    }
                }

                function initSettings() {
                    let isOpen = 'false';
                    setWidjets()
                }

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initSettings);



                /***/
}),

    /***/ "./assets/js/slider.js":
    /*!*****************************!*\
      !*** ./assets/js/slider.js ***!
      \*****************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
});

                let randomNumGlobal = getRandomNum(20);
                const prevSlideButtom = document.querySelector('.slide-prev');
                const nextSlideButtom = document.querySelector('.slide-next');
                const body = document.querySelector('body');
                const img = new Image();


                function getRandomNum(max) {
                    return Math.floor(Math.random() * max + 1);
                }

                function showPartOfDay() {
                    const timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
                    const currentDate = new Date;
                    const hours = currentDate.getHours();
                    return timeOfDay[Math.floor(hours / 6)];
                }

                function BackgroungSlaider() {

                    function getSlaiderNumber(randomNumGlobal) {
                        let randomNum = randomNumGlobal;
                        return randomNum;
                    }


                    prevSlideButtom.addEventListener('click', getSlidePrev)
                    nextSlideButtom.addEventListener('click', getSlideNext)

                    function getSlidePrev() {
                        (randomNumGlobal == 1) ? randomNumGlobal = 20 : randomNumGlobal--;
                        getSlaiderNumber(randomNumGlobal);
                        setBG()
                    }
                    function getSlideNext() {
                        (randomNumGlobal == 20) ? randomNumGlobal = 1 : randomNumGlobal++;
                        getSlaiderNumber(randomNumGlobal);
                        setBG()
                    }


                    function setBG() {
                        let random = (String(getSlaiderNumber(randomNumGlobal))).padStart(2, "0");
                        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${showPartOfDay()}/${random}.jpg`
                        img.onload = () => {
                            body.style.backgroundImage = `url(${img.src})`
                        };
                    }

                    //   async function setBgUnsplah() {
                    //     const img = new Image();
                    //     const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${showPartOfDay()}&client_id=lESpxNVnT20zj4Odjhq4i2a5hdm8-JdfPGMmgOXLGDw`;
                    //     const res = await fetch(url);
                    //     const data = await res.json();
                    //     img.src = data.urls.regular;
                    //     img.onload = () => {
                    //         body.style.backgroundImage = `url(${img.src})`;
                    //     }
                    // }
                    // async function setBgUnsplah() {
                    //   const img = new Image();
                    //   const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b698b1387ff6c0bd891e30f016959b55&tags=${showPartOfDay()}&extras=url_l&format=json&nojsoncallback=1`;
                    //   const res = await fetch(url);
                    //   const data = await res.json();
                    //   img.src = data.photos.photo[getRandomNum(100)].url_l;
                    //   img.onload = () => {
                    //       body.style.backgroundImage = `url(${img.src})`;
                    //   }
                    // }


                    //   let linkSetting = localStorage.getItem('link');
                    //   switch(linkSetting) {
                    //       case 'github':
                    //           setBgFromGitHub(random)
                    //           break;
                    //       case 'unsplash':
                    //           setBgFromUnsplah();
                    //           break;
                    //       case 'flickr':
                    //           setBgFromFLickR()
                    //           break;
                    //   }
                    // }
                    setBG()
                }

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackgroungSlaider);


                /***/
}),

    /***/ "./assets/js/time.js":
    /*!***************************!*\
      !*** ./assets/js/time.js ***!
      \***************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (/* binding */ showTime)
                    /* harmony export */
});
    /* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date.js */ "./assets/js/date.js");

                const time = document.querySelector('.time');


                (0, _date_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

                function showTime() {
                    const dates = new Date;
                    const currentTime = dates.toLocaleTimeString();
                    time.innerHTML = currentTime;
                    setTimeout(showTime, 1000);
                    setTimeout(_date_js__WEBPACK_IMPORTED_MODULE_0__["default"], 1000);
                }

                /***/
}),

    /***/ "./assets/js/translate.js":
    /*!********************************!*\
      !*** ./assets/js/translate.js ***!
      \********************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
});
    /* harmony import */ var _greeting_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./greeting.js */ "./assets/js/greeting.js");
    /* harmony import */ var _weather_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weather.js */ "./assets/js/weather.js");
    /* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./date.js */ "./assets/js/date.js");
    /* harmony import */ var _quotes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./quotes.js */ "./assets/js/quotes.js");

                let setingsLanguage = document.querySelectorAll('.settings');
                let language = document.querySelector('.language');







                function initLAnguage() {
                    let nameCity = localStorage.getItem('lang');
                    language.type = "text";
                    if (nameCity) {
                        if (nameCity == 0) {
                            localStorage.setItem('lang', language.textContent);
                        } else {
                            language.textContent = localStorage.getItem('lang');
                        }
                    } else {
                        localStorage.setItem('lang', language.textContent);
                    }
                }
                console.log(language.textContent)


                function getLanguage() {
                    initLAnguage();
                    for (let i = 0; i < setingsLanguage.length; i++) {
                        setingsLanguage[i].addEventListener('click', function (event) {
                            let ev = event.target;
                            language.textContent = ev.id;
                            localStorage.setItem('lang', language.textContent);
                            location.reload()
                        })
                    }
                    (0, _greeting_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
                    (0, _weather_js__WEBPACK_IMPORTED_MODULE_1__["default"])()
                        ; (0, _date_js__WEBPACK_IMPORTED_MODULE_2__["default"])()
                        ; (0, _quotes_js__WEBPACK_IMPORTED_MODULE_3__["default"])()
                }


    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getLanguage);



                /***/
}),

    /***/ "./assets/js/weather.js":
    /*!******************************!*\
      !*** ./assets/js/weather.js ***!
      \******************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
});
                const weatherIcon = document.querySelector('.weather-icon');
                const temperature = document.querySelector('.temperature');
                const weatherDescription = document.querySelector('.weather-description');
                const city = document.querySelector('.city');
                const weatherWind = document.querySelector('.wind');
                const weatherHumidity = document.querySelector('.humidity');
                const weatherInfo = document.querySelector('.weather__info');
                let languages = document.querySelector('.language');



                async function getWeather() {
                    let language = languages.textContent
                    if (city.textContent.length !== 0) {
                        weatherInfo.style.display = 'flex';
                        let nameCity = localStorage.getItem('city');
                        let defaultCity = 'Minsk';
                        city.type = "text";
                        city.classList.add('city');
                        if (nameCity) {
                            if (nameCity == 0) {
                                city.textContent = defaultCity;
                            } else {
                                city.value = localStorage.getItem('city');
                            }
                        } else {
                            city.value = defaultCity;
                        }
                        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=${language}&appid=aa5a4f124612c42ba55c337a61534ec7&units=metric`;
                        const res = await fetch(url);
                        const data = await res.json();

                        weatherIcon.classList.add(`owf-${data.weather[0].id}`);

                        let translation = {
                            wind: {
                                ru: "Скорость ветра: ",
                                en: "Wind speed: "
                            },
                            humidity: {
                                ru: "Влажность: ",
                                en: "Humidity: "
                            },
                            speed: {
                                ru: " м/c",
                                en: " m/s"
                            },
                        }
                        weatherIcon.className = 'weather-icon owf';
                        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
                        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
                        weatherDescription.textContent = data.weather[0].description;
                        weatherWind.innerHTML = `${translation.wind[language]} ${Math.round(data.wind.speed)} ${translation.speed[language]}`;
                        weatherHumidity.innerHTML = `${translation.humidity[language]} ${data.main.humidity.toFixed(0)} %`;
                        weatherDescription.innerHTML = data.weather[0].description;
                    }
                };


                function setLocalStorage() {
                    localStorage.setItem('city', city.textContent);
                }
                function getLocalStorage() {
                    if (localStorage.getItem('city')) {
                        city.textContent = localStorage.getItem('city');
                    }
                }

                function sendCity() {
                    function setCity(event) {
                        if (event.code === 'Enter') {
                            setLocalStorage()
                            getWeather();
                            city.blur();
                        }
                    }

                    document.addEventListener('click', (e) => {
                        const withinBondaries = e.composedPath().includes(city);
                        if (!withinBondaries) {
                            setLocalStorage()
                            getWeather();
                            city.blur();
                        }
                    })


                    document.addEventListener('DOMContentLoaded', getWeather);
                    city.addEventListener('keypress', setCity);

                }


                function initWeather() {
                    getWeather()
                    window.addEventListener('beforeunload', setLocalStorage);
                    window.addEventListener('load', getLocalStorage)
                    sendCity();
                    getWeather()

                }

                getWeather()
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initWeather);


                /***/
}),

    /***/ "./css/owfont-regular.css":
    /*!********************************!*\
      !*** ./css/owfont-regular.css ***!
      \********************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
                // extracted by mini-css-extract-plugin


                /***/
}),

    /***/ "./css/style.css":
    /*!***********************!*\
      !*** ./css/style.css ***!
      \***********************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
                // extracted by mini-css-extract-plugin


                /***/
})

        /******/
});
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/ 		// Check if module is in cache
    /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
    /******/ 		if (cachedModule !== undefined) {
    /******/ 			return cachedModule.exports;
            /******/
}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = __webpack_module_cache__[moduleId] = {
    /******/ 			// no module.id needed
    /******/ 			// no module.loaded needed
    /******/ 			exports: {}
            /******/
};
    /******/
    /******/ 		// Execute the module function
    /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
        /******/
}
    /******/
    /************************************************************************/
    /******/ 	/* webpack/runtime/define property getters */
    /******/ 	(() => {
    /******/ 		// define getter functions for harmony exports
    /******/ 		__webpack_require__.d = (exports, definition) => {
    /******/ 			for (var key in definition) {
    /******/ 				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
    /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                    /******/
}
                /******/
}
            /******/
};
        /******/
})();
    /******/
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/ 	(() => {
    /******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
        /******/
})();
    /******/
    /******/ 	/* webpack/runtime/make namespace object */
    /******/ 	(() => {
    /******/ 		// define __esModule on exports
    /******/ 		__webpack_require__.r = (exports) => {
    /******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                /******/
}
    /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
            /******/
};
        /******/
})();
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
        /*!****************************!*\
          !*** ./assets/js/index.js ***!
          \****************************/
        __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _css_owfont_regular_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css/owfont-regular.css */ "./css/owfont-regular.css");
    /* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css/style.css */ "./css/style.css");
    /* harmony import */ var _settinglist_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settinglist.js */ "./assets/js/settinglist.js");
    /* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.js */ "./assets/js/settings.js");
    /* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./time.js */ "./assets/js/time.js");
    /* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./date.js */ "./assets/js/date.js");
    /* harmony import */ var _greeting_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./greeting.js */ "./assets/js/greeting.js");
    /* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./slider.js */ "./assets/js/slider.js");
    /* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./player.js */ "./assets/js/player.js");
    /* harmony import */ var _quotes_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./quotes.js */ "./assets/js/quotes.js");
    /* harmony import */ var _weather_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./weather.js */ "./assets/js/weather.js");
    /* harmony import */ var _translate_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./translate.js */ "./assets/js/translate.js");





        (0, _settinglist_js__WEBPACK_IMPORTED_MODULE_2__["default"])()

            ;
        (0, _settings_js__WEBPACK_IMPORTED_MODULE_3__["default"])()

            ;
        (0, _time_js__WEBPACK_IMPORTED_MODULE_4__["default"])();


        (0, _date_js__WEBPACK_IMPORTED_MODULE_5__["default"])();


        (0, _greeting_js__WEBPACK_IMPORTED_MODULE_6__["default"])();


        (0, _slider_js__WEBPACK_IMPORTED_MODULE_7__["default"])();


        (0, _player_js__WEBPACK_IMPORTED_MODULE_8__["default"])();


        (0, _quotes_js__WEBPACK_IMPORTED_MODULE_9__["default"])()

            ;


        (0, _translate_js__WEBPACK_IMPORTED_MODULE_11__["default"])()











    })();

    /******/
})()
    ;
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05xQztBQUNUO0FBQzVCO0FBQ0E7QUFDd0M7QUFDeEMsMkRBQVM7QUFDVDtBQUNBLENBQXdDO0FBQ3hDLHdEQUFZO0FBQ1o7QUFDQSxDQUFpQztBQUNqQyxvREFBUTtBQUNSO0FBQ2lDO0FBQ2pDLG9EQUFRO0FBQ1I7QUFDeUM7QUFDekMsd0RBQVk7QUFDWjtBQUNnQztBQUNoQyxzREFBSztBQUNMO0FBQ3dDO0FBQ3hDLHNEQUFhO0FBQ2I7QUFDdUM7QUFDdkMsc0RBQVk7QUFDWjtBQUNBLENBQXVDO0FBQ3ZDO0FBQ3lDO0FBQ3pDLDBEQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy9kYXRlLmpzIiwid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL2dyZWV0aW5nLmpzIiwid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy9wbGF5bGlzdC5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy9xdW90ZXMuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvc2V0dGluZ2xpc3QuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvc2xpZGVyLmpzIiwid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL3RpbWUuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvdHJhbnNsYXRlLmpzIiwid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9jc3Mvb3dmb250LXJlZ3VsYXIuY3NzPzMwYTQiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9jc3Mvc3R5bGUuY3NzP2VhNzgiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhdGUnKTtcclxubGV0IGxhbmd1YWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYW5ndWFnZScpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHNob3dEYXRlKCkge1xyXG4gIGxldCBsYW5ndWFnZSA9IGxhbmd1YWdlcy50ZXh0Q29udGVudFxyXG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZTtcclxuICBjb25zdCBvcHRpb25zID0geyB3ZWVrZGF5OiAnbG9uZycsIGRheTogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCB0aW1lWm9uZTogJ1VUQycgfTtcclxuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ld0RhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKGxhbmd1YWdlLCBvcHRpb25zKTtcclxuICBkYXRlLmlubmVySFRNTCA9IGN1cnJlbnREYXRlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2hvd0RhdGU7XHJcbiIsImNvbnN0IGdyZWV0aW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWV0aW5nJyk7XHJcbmNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmFtZScpO1xyXG5sZXQgbGFuZ3VhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxhbmd1YWdlJyk7XHJcblxyXG5cclxuY29uc3QgcGxhY2VIb2xkZXIgPSB7IFxyXG4gIGVuOiAnW0VudGVyIHlvdXIgbmFtZV0nLFxyXG4gIHJ1OiAnW9CS0LLQtdC00LjRgtC1INCy0LDRiNC1INC40LzRj10nLFxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUaW1lT2ZEYXkoKSB7XHJcbiAgbGV0IGxhbmd1YWdlID0gbGFuZ3VhZ2VzLnRleHRDb250ZW50XHJcbiAgbGV0IHBhcnRPZkRheSA9IHtcclxuICAgIGVuOiBbJ25pZ2h0JywgJ21vcm5pbmcnLCAnYWZ0ZXJub29uJywgJ2V2ZW5pbmcnXSxcclxuICAgIHJ1OiBbJ9C90L7Rh9C4LCcsICfRg9GC0YDQviwnLCAn0LTQtdC90YwsJywgJ9Cy0LXRh9C10YAsJ11cclxuICB9O1xyXG5sZXQgZ3JlZXRpbmdEYXRlID0gbmV3IERhdGUoKTtcclxubGV0IGhvdXJzID0gTnVtYmVyKGdyZWV0aW5nRGF0ZS5nZXRIb3VycygpKTtcclxuXHJcbnJldHVybiAocGFydE9mRGF5W2xhbmd1YWdlXVsoTWF0aC5mbG9vcihob3Vycy82KSldKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0dyZWV0aW5nKCl7XHJcbmxldCBsYW5ndWFnZSA9IGxhbmd1YWdlcy50ZXh0Q29udGVudFxyXG5jb25zb2xlLmxvZyhsYW5ndWFnZXMudGV4dENvbnRlbnQpXHJcbmxldCBncmVldGluZ1RleHQgPScnO1xyXG5pZiAobGFuZ3VhZ2UgPT0gJ2VuJyl7XHJcbiAgICBncmVldGluZ1RleHQgPSBgR29vZCAke2dldFRpbWVPZkRheSgpfWA7XHJcbn0gZWxzZSB7IFxyXG4gICAgaWYoZ2V0VGltZU9mRGF5KCkgPT0gJ9C90L7Rh9C4LCcpe1xyXG4gICAgICAgIGdyZWV0aW5nVGV4dCA9IGDQlNC+0LHRgNC+0LkgJHtnZXRUaW1lT2ZEYXkoKX1gXHJcbiAgICB9ZWxzZSBpZiAoZ2V0VGltZU9mRGF5KCkgPT0gJ9GD0YLRgNC+LCcpe1xyXG4gICAgICAgIGdyZWV0aW5nVGV4dCA9IGDQlNC+0LHRgNC+0LUgJHtnZXRUaW1lT2ZEYXkoKX1gXHJcbiAgICB9IGVsc2VcclxuICAgIGdyZWV0aW5nVGV4dCA9IGDQlNC+0LHRgNGL0LkgJHtnZXRUaW1lT2ZEYXkoKX1gXHJcbn07XHJcblxyXG4gIG5hbWUuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIHBsYWNlSG9sZGVyW2xhbmd1YWdlXSk7IFxyXG4gIHJldHVybiBncmVldGluZy5pbm5lckhUTUwgPSBncmVldGluZ1RleHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNob3dHcmVldGluZztcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBzZXRMb2NhbFN0b3JhZ2UpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGdldExvY2FsU3RvcmFnZSlcclxuXHJcbmZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZSgpIHtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFtZScsIG5hbWUudmFsdWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2UoKSB7XHJcbiAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWUnKSkge1xyXG4gICAgbmFtZS52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lJyk7XHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgcGxheUxpc3QgZnJvbSBcIi4vcGxheWxpc3QuanNcIjtcclxuXHJcblxyXG5jb25zdCBhdWRpbyA9IG5ldyBBdWRpbygpO1xyXG5sZXQgYXVkaW9Wb2x1bWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudm9sdW1lLWxpbmUnKTtcclxubGV0IG11c2ljVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXVzaWNfX3RpdGxlJyk7XHJcbmxldCBhdWRpb011dGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXVkaW8tbXV0ZScpO1xyXG5sZXQgbXVzaWNQbGF5TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWxpc3QnKTtcclxubGV0IG11c2ljQnV0dG9uUGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5Jyk7XHJcbmxldCBtdXNpY0J1dHRvbk5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1uZXh0Jyk7XHJcbmxldCBtdXNpY0J1dHRvblByZXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1wcmV2Jyk7XHJcbmxldCB0aW1lbGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xyXG5sZXQgY3VycmVudEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50JylcclxubGV0IHByb2dyZXNzQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc1wiKVxyXG5sZXQgYXVkaW9MZW5ndGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxlbmd0aFwiKVxyXG5sZXQgY3VycmVudFZvbHVtZTtcclxubGV0IGN1cnJlbnRUaW1lR2xvYmFsID0gMDtcclxubGV0IGlzUGxheSA9IGZhbHNlO1xyXG5sZXQgbXVzaWNOdW1iZXIgPSAwO1xyXG5sZXQgbGlzdEl0ZW07XHJcbmxldCBtaW5pQnRuO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRQbGF5TGlzdCgpIHtcclxuICAgIHBsYXlMaXN0LmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIGNvbnN0IG1pbmlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgbWluaUJ0bi5jbGFzc0xpc3QuYWRkKCdwbGF5LW1pbmknKTtcclxuICAgICAgICBtaW5pQnRuLmNsYXNzTGlzdC5hZGQoJ21pbmktYnRuJyk7XHJcblxyXG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3BsYXktaXRlbScpO1xyXG4gICAgICAgIGxpLmlubmVySFRNTCA9IGVsLnRpdGxlO1xyXG4gICAgICAgIG11c2ljUGxheUxpc3QuYXBwZW5kKGxpKTtcclxuICAgICAgICBsaS5hcHBlbmQobWluaUJ0bik7XHJcbiAgICAgICAgfVxyXG4gICAgKVxyXG4gICAgbGlzdEl0ZW0gPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXktaXRlbScpO1xyXG4gICAgbWluaUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5taW5pLWJ0bicpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0VGltZUNvZGVGcm9tTnVtKG51bSkge1xyXG4gICAgbGV0IHNlY29uZHMgPSBwYXJzZUludChudW0pO1xyXG4gICAgbGV0IG1pbnV0ZXMgPSBwYXJzZUludChzZWNvbmRzIC8gNjApO1xyXG4gICAgc2Vjb25kcyAtPSBtaW51dGVzICogNjA7XHJcbiAgICBjb25zdCBob3VycyA9IHBhcnNlSW50KG1pbnV0ZXMgLyA2MCk7XHJcbiAgICBtaW51dGVzIC09IGhvdXJzICogNjA7XHJcbiAgXHJcbiAgICBpZiAoaG91cnMgPT09IDApIHJldHVybiBgJHttaW51dGVzfToke1N0cmluZyhzZWNvbmRzICUgNjApLnBhZFN0YXJ0KDIsIDApfWA7XHJcbiAgICByZXR1cm4gYCR7U3RyaW5nKGhvdXJzKS5wYWRTdGFydCgyLCAwKX06JHttaW51dGVzfToke1N0cmluZyhzZWNvbmRzICUgNjApLnBhZFN0YXJ0KDIsIDApfWA7XHJcbiAgfVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNldER1cmF0aW9uVGltZShkdXJhdGlvbikge1xyXG4gICAgYXVkaW9MZW5ndGguaW5uZXJIVE1MID0gZ2V0VGltZUNvZGVGcm9tTnVtKGR1cmF0aW9uKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0SW50ZXJ2YWxBdWRpbygpe1xyXG4gICAgcHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBhdWRpby5jdXJyZW50VGltZSAvIGF1ZGlvLmR1cmF0aW9uICogMTAwICsgXCIlXCI7XHJcbiAgICBjdXJyZW50VGltZUdsb2JhbCA9IGF1ZGlvLmN1cnJlbnRUaW1lO1xyXG4gICAgY3VycmVudEJhci5pbm5lckhUTUwgPSBnZXRUaW1lQ29kZUZyb21OdW0oY3VycmVudFRpbWVHbG9iYWwpO1xyXG4gICAgc2V0VGltZW91dChzZXRJbnRlcnZhbEF1ZGlvLCA1MDApO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0VGltZSgpIHtcclxuICBjdXJyZW50VGltZUdsb2JhbCA9IGF1ZGlvLmN1cnJlbnRUaW1lO1xyXG4gIGN1cnJlbnRCYXIuaW5uZXJIVE1MID0gZ2V0VGltZUNvZGVGcm9tTnVtKGN1cnJlbnRUaW1lR2xvYmFsKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxheU11c2ljKCl7XHJcbiAgICBhdWRpby5zcmMgPSBwbGF5TGlzdFttdXNpY051bWJlcl0uc3JjO1xyXG4gICAgYXVkaW8uY3VycmVudFRpbWUgPSBjdXJyZW50VGltZUdsb2JhbDtcclxuICAgIHNldER1cmF0aW9uVGltZShwbGF5TGlzdFttdXNpY051bWJlcl0uZHVyYXRpb24pO1xyXG4gICAgaWYoaXNQbGF5ID09IGZhbHNlKSB7XHJcbiAgICAgICAgbXVzaWNUaXRsZS5pbm5lckhUTUwgPSBwbGF5TGlzdFttdXNpY051bWJlcl0udGl0bGU7XHJcbiAgICAgICAgYXVkaW8udm9sdW1lID0gYXVkaW9Wb2x1bWUudmFsdWUvMTAwO1xyXG4gICAgICAgIGlzUGxheSA9IHRydWU7XHJcbiAgICAgICAgYXVkaW8ucGxheSgpO1xyXG4gICAgICAgIG11c2ljQnV0dG9uUGxheS5jbGFzc0xpc3QuYWRkKCdwYXVzZScpO1xyXG4gICAgICAgIGxpc3RJdGVtW211c2ljTnVtYmVyXS5jbGFzc0xpc3QuYWRkKCdpdGVtLWFjdGl2ZScpO1xyXG4gICAgICAgIG1pbmlCdG5bbXVzaWNOdW1iZXJdLmNsYXNzTGlzdC5hZGQoJ3BhdXNlLW1pbmknKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXVkaW8ucGF1c2UoKTtcclxuICAgICAgICBtdXNpY0J1dHRvblBsYXkuY2xhc3NMaXN0LnJlbW92ZSgncGF1c2UnKTtcclxuICAgICAgICBpc1BsYXkgPSBmYWxzZTtcclxuICAgICAgICBsaXN0SXRlbVttdXNpY051bWJlcl0uY2xhc3NMaXN0LnJlbW92ZSgnaXRlbS1hY3RpdmUnKTtcclxuICAgICAgICBtaW5pQnRuW211c2ljTnVtYmVyXS5jbGFzc0xpc3QucmVtb3ZlKCdwYXVzZS1taW5pJyk7XHJcbiAgICAgICAgc2V0VGltZSgpO1xyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZUF1ZGlvICgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpPGxpc3RJdGVtLmxlbmd0aDsgaSsrKXsgICAgICAgIFxyXG4gICAgICAgIGxpc3RJdGVtW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09IG11c2ljTnVtYmVyICYmIGlzUGxheSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW1bbXVzaWNOdW1iZXJdLmNsYXNzTGlzdC5hZGQoJ2l0ZW0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtaW5pQnRuW211c2ljTnVtYmVyLTFdLmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlLW1pbmknKTtcclxuICAgICAgICAgICAgICAgIGlzUGxheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZUdsb2JhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICBwbGF5TXVzaWMoKTtcclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW1bbXVzaWNOdW1iZXJdLmNsYXNzTGlzdC5yZW1vdmUoJ2l0ZW0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtaW5pQnRuW211c2ljTnVtYmVyXS5jbGFzc0xpc3QucmVtb3ZlKCdwYXVzZS1taW5pJyk7XHJcbiAgICAgICAgICAgICAgICBsaXN0SXRlbS5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlJykpXHJcbiAgICAgICAgICAgICAgICBtdXNpY051bWJlciA9IGk7XHJcbiAgICAgICAgICAgICAgICBpc1BsYXkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lR2xvYmFsID0gMDtcclxuICAgICAgICAgICAgICAgIHBsYXlNdXNpYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZUF1ZGlvT25CdG4oKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaTxtaW5pQnRuLmxlbmd0aDsgaSsrKXsgICAgICAgIFxyXG4gICAgICAgIG1pbmlCdG5baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3VycmVudFRpbWVHbG9iYWwgPSBhdWRpby5jdXJyZW50VGltZTtcclxuICAgICAgICAgICAgaWYgKGkgPT0gbXVzaWNOdW1iZXIgJiYgaXNQbGF5KSB7XHJcbiAgICAgICAgICAgICAgICBpc1BsYXkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRUaW1lR2xvYmFsKVxyXG4gICAgICAgICAgICAgICAgbWluaUJ0bltpXS5jbGFzc0xpc3QucmVtb3ZlKCdwYXVzZS1taW5pJyk7XHJcbiAgICAgICAgICAgICAgICBwbGF5TXVzaWMoKTtcclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgbWluaUJ0bi5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlLW1pbmknKSlcclxuICAgICAgICAgICAgICAgIG1pbmlCdG5baV0uY2xhc3NMaXN0LmFkZCgncGF1c2UtbWluaScpO1xyXG4gICAgICAgICAgICAgICAgbXVzaWNOdW1iZXIgPSBpO1xyXG4gICAgICAgICAgICAgICAgaXNQbGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHBsYXlNdXNpYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuLy9jbGljayB0byBwcmV2IHNvbmdcclxuZnVuY3Rpb24gcGxheVByZXYoKXtcclxuICAgIGN1cnJlbnRUaW1lR2xvYmFsID0gMDtcclxuICAgIGlzUGxheSA9IGZhbHNlO1xyXG4gICAgbGlzdEl0ZW1bbXVzaWNOdW1iZXJdLmNsYXNzTGlzdC5yZW1vdmUoJ2l0ZW0tYWN0aXZlJyk7XHJcbiAgICBpZiAobXVzaWNOdW1iZXI9PTApIHtcclxuICAgICAgICBtaW5pQnRuW211c2ljTnVtYmVyXS5jbGFzc0xpc3QucmVtb3ZlKCdwYXVzZS1taW5pJyk7XHJcbiAgICAgICAgbXVzaWNOdW1iZXIgPSBwbGF5TGlzdC5sZW5ndGgtMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWluaUJ0blttdXNpY051bWJlcl0uY2xhc3NMaXN0LnJlbW92ZSgncGF1c2UtbWluaScpO1xyXG4gICAgICAgIG11c2ljTnVtYmVyLS07ICAgIFxyXG4gICAgfVxyXG4gICAgaWYgKCFtdXNpY0J1dHRvblBsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYXVzZScpKSB7XHJcbiAgICAgICAgbXVzaWNCdXR0b25QbGF5LmNsYXNzTGlzdC5hZGQoJ3BhdXNlJyk7XHJcbiAgICB9XHJcbiAgICBwbGF5TXVzaWMoKTtcclxufVxyXG5cclxuLy9jbGljayB0byBuZXh0IHNvbmdcclxuZnVuY3Rpb24gcGxheU5leHQoKXtcclxuICAgIGN1cnJlbnRUaW1lR2xvYmFsID0gMDtcclxuICAgIGlzUGxheSA9IGZhbHNlO1xyXG4gICAgbGlzdEl0ZW1bbXVzaWNOdW1iZXJdLmNsYXNzTGlzdC5yZW1vdmUoJ2l0ZW0tYWN0aXZlJyk7XHJcbiAgICBpZiAobXVzaWNOdW1iZXI9PXBsYXlMaXN0Lmxlbmd0aC0xKSB7XHJcbiAgICAgICAgbWluaUJ0blttdXNpY051bWJlcl0uY2xhc3NMaXN0LnJlbW92ZSgncGF1c2UtbWluaScpO1xyXG4gICAgICAgIG11c2ljTnVtYmVyID0gMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWluaUJ0blttdXNpY051bWJlcl0uY2xhc3NMaXN0LnJlbW92ZSgncGF1c2UtbWluaScpO1xyXG4gICAgICAgIG11c2ljTnVtYmVyKys7ICAgIFxyXG4gICAgfVxyXG4gICAgaWYgKCFtdXNpY0J1dHRvblBsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYXVzZScpKSB7XHJcbiAgICAgICAgbXVzaWNCdXR0b25QbGF5LmNsYXNzTGlzdC5hZGQoJ3BhdXNlJyk7XHJcbiAgICB9XHJcbiAgICBwbGF5TXVzaWMoKTtcclxufVxyXG5cclxuLy9jbGljayBvbiB0aW1lbGluZVxyXG5mdW5jdGlvbiBtb3ZldGltZWxpbmUoZSl7XHJcbiAgICBpZighaXNGaW5pdGUoKSl7XHJcbiAgICBjb25zdCB0aW1lbGluZVdpZHRoID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGltZWxpbmUpLndpZHRoO1xyXG4gICAgY29uc29sZS5sb2codGltZWxpbmVXaWR0aClcclxuICAgIGNvbnN0IHRpbWVUb1NlZWsgPSBlLm9mZnNldFggLyBwYXJzZUludCh0aW1lbGluZVdpZHRoKSAqIGF1ZGlvLmR1cmF0aW9uO1xyXG4gICAgY29uc29sZS5sb2coZS5vZmZzZXRYKVxyXG4gICAgYXVkaW8uY3VycmVudFRpbWUgPSB0aW1lVG9TZWVrO1xyXG4gIH0gZWxzZSBmYWxzZTtcclxufVxyXG5cclxuXHJcblxyXG4vL3ZhbHVlXHJcblxyXG5mdW5jdGlvbiBzZXRWYWx1ZSgpIHtcclxuICAgIGF1ZGlvLnZvbHVtZSA9IGF1ZGlvVm9sdW1lLnZhbHVlLzEwMDtcclxufVxyXG5cclxuZnVuY3Rpb24gbXV0ZUF1ZGlvKCkge1xyXG4gICAgaWYgKGF1ZGlvVm9sdW1lLnZhbHVlID4gMCkge1xyXG4gICAgICAgIGN1cnJlbnRWb2x1bWUgPSBhdWRpb1ZvbHVtZS52YWx1ZTtcclxuICAgICAgICBhdWRpb1ZvbHVtZS52YWx1ZSA9IDA7XHJcbiAgICAgICAgc2V0VmFsdWUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXVkaW9Wb2x1bWUudmFsdWUgPSBjdXJyZW50Vm9sdW1lO1xyXG4gICAgICAgIHNldFZhbHVlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzdGFydFBsYXlMaXN0KCkgeyAgXHJcbiAgICBpbml0UGxheUxpc3QoKTsgXHJcbiAgICBtdXNpY0J1dHRvblBsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5TXVzaWMpO1xyXG4gICAgLy8gbXVzaWMuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBwbGF5TmV4dCk7XHJcbiAgICBtdXNpY0J1dHRvbk5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5TmV4dCk7XHJcbiAgICBtdXNpY0J1dHRvblByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5UHJldik7XHJcbiAgICB0aW1lbGluZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG1vdmV0aW1lbGluZSlcclxuICAgIGF1ZGlvVm9sdW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgc2V0VmFsdWUpO1xyXG4gICAgYXVkaW9NdXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbXV0ZUF1ZGlvKTtcclxuICAgIGNoYW5nZUF1ZGlvKCk7XHJcbiAgICBjaGFuZ2VBdWRpb09uQnRuKClcclxuICAgIHNldEludGVydmFsQXVkaW8oKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdGFydFBsYXlMaXN0XHJcblxyXG5cclxuIiwiY29uc3QgcGxheUxpc3QgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdBcXVhIENhZWxlc3RpcycsXHJcbiAgICAgICAgc3JjOiAnLi4vYXNzZXRzL3NvdW5kcy9BcXVhIENhZWxlc3Rpcy5tcDMnLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzOSxcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHtcclxuICAgICAgICB0aXRsZTogJ0VubmlvIE1vcnJpY29uZScsXHJcbiAgICAgICAgc3JjOiAnLi4vYXNzZXRzL3NvdW5kcy9Fbm5pbyBNb3JyaWNvbmUubXAzJyxcclxuICAgICAgICBkdXJhdGlvbjogOTcsXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICB7ICAgICAgXHJcbiAgICAgICAgdGl0bGU6ICdSaXZlciBGbG93cyBJbiBZb3UnLFxyXG4gICAgICAgIHNyYzogJy4uL2Fzc2V0cy9zb3VuZHMvUml2ZXIgRmxvd3MgSW4gWW91Lm1wMycsXHJcbiAgICAgICAgZHVyYXRpb246IDk3XHJcbiAgICB9LFxyXG5cclxuICAgIHsgICAgICBcclxuICAgICAgICB0aXRsZTogJ1N1bW1lciBXaW5kJyxcclxuICAgICAgICBzcmM6ICcuLi9hc3NldHMvc291bmRzL1N1bW1lciBXaW5kLm1wMycsXHJcbiAgICAgICAgZHVyYXRpb246IDM5XHJcbiAgICB9LFxyXG5cclxuXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGxheUxpc3Q7IiwiY29uc3QgdGV4dE9mUXVvdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVvdGUnKTtcclxuY29uc3QgYXV0aG9yT2ZRdW90ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRob3InKTtcclxuY29uc3QgYnV0dG9uQ2hhbmdlUXVvdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhbmdlLXF1b3RlJyk7XHJcbmxldCBsYW5ndWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGFuZ3VhZ2UnKTtcclxuXHJcblxyXG5mdW5jdGlvbiBnZXRSYW5kb21OdW0obWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldFF1b3RlcygpIHtcclxuICAgIGNvbnN0IHF1b3RlcyA9ICcvbW9tZW50dW0vZGF0YS5qc29uJztcclxuICAgIGZldGNoKHF1b3RlcylcclxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgIC50aGVuKGRhdGEgPT4geyBcclxuICAgICAgICBsZXQgbGFuZ3VhZ2UgPSBsYW5ndWFnZXMudGV4dENvbnRlbnRcclxuICAgICAgICB0ZXh0T2ZRdW90ZS5pbm5lckhUTUwgPSBkYXRhW2xhbmd1YWdlXVtnZXRSYW5kb21OdW0oZGF0YVtsYW5ndWFnZV0ubGVuZ3RoKV0udGV4dDtcclxuICAgICAgICBhdXRob3JPZlF1b3RlLmlubmVySFRNTCA9IGRhdGFbbGFuZ3VhZ2VdW2dldFJhbmRvbU51bShkYXRhW2xhbmd1YWdlXS5sZW5ndGgpXS5hdXRob3I7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlUXVvdGVzKCkge1xyXG4gIGdldFF1b3RlcygpXHJcbiAgYnV0dG9uQ2hhbmdlUXVvdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZXRRdW90ZXMpO1xyXG59XHJcbmNoYW5nZVF1b3RlcygpXHJcbmV4cG9ydCBkZWZhdWx0IGNoYW5nZVF1b3RlczsiLCJjb25zdCBzZXR0aW5nSXRlbVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNldHRpbmdfX3RleHQnKTtcclxuY29uc3Qgd2lkZ2V0SXRlbVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud2lkZ2V0X19uYW1lJyk7XHJcbmNvbnN0IHNldHRpbmdzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzLWltZycpO1xyXG5jb25zdCBzZXR0aW5nc0Jsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzJyk7XHJcbmxldCBsYW5ndWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGFuZ3VhZ2UnKTtcclxuXHJcblxyXG5sZXQgaXNPcGVuID0gJ2ZhbHNlJztcclxuXHJcbmNvbnN0IHdvcmRzRm9yVGl0bGUgPSB7XHJcbiAgICBlbjogWydBcGxsaWNhdGlvbiBMYW5ndWFnZScsICdJbWFnZSBTb3VyY2UnLCAnV2lkZ2V0cyddLFxyXG4gICAgcnU6IFsn0K/Qt9GL0Log0L/RgNC40LvQvtC20LXQvdC40Y8nLCAn0JjRgdGC0L7Rh9C90LjQuiDRhNC+0YLQvtCz0YDQsNGE0LjQuScsICfQktC40LTQttC10YLRiyddLFxyXG59XHJcblxyXG5jb25zdCB3b3Jkc0ZvclRleHQgPSB7XHJcbiAgICBlbjogWydQbGF5ZXInLCAnVGltZScsICdEYXRlJywgJ1dlYXRoZXInLCAnR3JlZXRpbmcnXSxcclxuICAgIHJ1OiBbJ9Cf0LvQtdC10YAnLCAn0JLRgNC10LzRjycsICfQlNCw0YLQsCcsICfQn9C+0LPQvtC00LAnLCAn0J/RgNC40LLQtdGC0YHRgtCy0LjQtSddLFxyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuU2V0dGluZ3MoKSB7XHJcbiAgICBpZiAoaXNPcGVuID09ICdmYWxzZScpe1xyXG4gICAgICAgIHNldHRpbmdzQmxvY2suY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3Mtb3BlbicpXHJcbiAgICAgICAgc2V0dGluZ3NCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdzZXR0aW5ncy1jbG9zZScpXHJcbiAgICAgICAgaXNPcGVuID0gJ3RydWUnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzZXR0aW5nc0Jsb2NrLmNsYXNzTGlzdC5yZW1vdmUoJ3NldHRpbmdzLW9wZW4nKVxyXG4gICAgICAgIHNldHRpbmdzQmxvY2suY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3MtY2xvc2UnKVxyXG4gICAgICAgIGlzT3BlbiA9ICdmYWxzZSc7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdFBhbmVsKCkge1xyXG4gICAgc2V0dGluZ3NCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuU2V0dGluZ3MpO1xyXG5cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaTxzZXR0aW5nSXRlbVRpdGxlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBsZXQgbGFuZ3VhZ2UgPSBsYW5ndWFnZXMudGV4dENvbnRlbnRcclxuICAgICAgICBzZXR0aW5nSXRlbVRpdGxlW2ldLmlubmVySFRNTCA9IHdvcmRzRm9yVGl0bGVbbGFuZ3VhZ2VdW2ldO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8d2lkZ2V0SXRlbVRleHQubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIGxldCBsYW5ndWFnZSA9IGxhbmd1YWdlcy50ZXh0Q29udGVudFxyXG4gICAgICAgIHdpZGdldEl0ZW1UZXh0W2ldLmlubmVySFRNTCA9IHdvcmRzRm9yVGV4dFtsYW5ndWFnZV1baV07XHJcbiAgICB9XHJcbiAgICByZXR1cm5cclxufSIsImxldCBsYW5ndWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGFuZ3VhZ2UnKTtcclxuXHJcblxyXG5mdW5jdGlvbiBzZXRXaWRqZXRzKCkge1xyXG4gIGxldCBsYW5ndWFnZSA9IGxhbmd1YWdlcy50ZXh0Q29udGVudFxyXG4gICAgbGV0IGRlZmF1bHRBY3RpdmVXaWRqZXRzID0gWydQbGF5ZXInLCAnVGltZScsICdEYXRlJywgJ1dlYXRoZXInLCAnR3JlZXRpbmcnXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVmYXVsdEFjdGl2ZVdpZGpldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKGRlZmF1bHRBY3RpdmVXaWRqZXRzW2ldKSkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShkZWZhdWx0QWN0aXZlV2lkamV0c1tpXSwgJ3RydWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRTZXR0aW5ncygpIHtcclxuICAgIGxldCBpc09wZW4gPSAnZmFsc2UnO1xyXG4gICAgc2V0V2lkamV0cygpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluaXRTZXR0aW5ncztcclxuXHJcbiIsIlxyXG5sZXQgcmFuZG9tTnVtR2xvYmFsID0gZ2V0UmFuZG9tTnVtKDIwKTtcclxuY29uc3QgcHJldlNsaWRlQnV0dG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlLXByZXYnKTtcclxuY29uc3QgbmV4dFNsaWRlQnV0dG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlLW5leHQnKTtcclxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0UmFuZG9tTnVtKG1heCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXggKyAxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1BhcnRPZkRheSgpe1xyXG4gIGNvbnN0IHRpbWVPZkRheSA9IFsnbmlnaHQnLCAnbW9ybmluZycsICdhZnRlcm5vb24nLCAnZXZlbmluZyddO1xyXG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGU7XHJcbiAgY29uc3QgaG91cnMgPSBjdXJyZW50RGF0ZS5nZXRIb3VycygpO1xyXG4gIHJldHVybiB0aW1lT2ZEYXlbTWF0aC5mbG9vcihob3VycyAvIDYpXTtcclxufVxyXG5cclxuZnVuY3Rpb24gQmFja2dyb3VuZ1NsYWlkZXIoKXtcclxuXHJcbiAgZnVuY3Rpb24gZ2V0U2xhaWRlck51bWJlcihyYW5kb21OdW1HbG9iYWwpe1xyXG4gICBsZXQgcmFuZG9tTnVtID0gcmFuZG9tTnVtR2xvYmFsO1xyXG4gICByZXR1cm4gcmFuZG9tTnVtO1xyXG4gIH1cclxuICBcclxuICAgIFxyXG4gIHByZXZTbGlkZUJ1dHRvbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdldFNsaWRlUHJldilcclxuICBuZXh0U2xpZGVCdXR0b20uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZXRTbGlkZU5leHQpXHJcblxyXG4gIGZ1bmN0aW9uIGdldFNsaWRlUHJldigpe1xyXG4gICAgKHJhbmRvbU51bUdsb2JhbCA9PSAxKSA/IHJhbmRvbU51bUdsb2JhbCA9IDIwIDogcmFuZG9tTnVtR2xvYmFsLS07XHJcbiAgICBnZXRTbGFpZGVyTnVtYmVyKHJhbmRvbU51bUdsb2JhbCk7XHJcbiAgICBzZXRCRygpXHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGdldFNsaWRlTmV4dCgpe1xyXG4gICAgKHJhbmRvbU51bUdsb2JhbCA9PSAyMCkgPyByYW5kb21OdW1HbG9iYWwgPSAxIDogcmFuZG9tTnVtR2xvYmFsKys7XHJcbiAgICBnZXRTbGFpZGVyTnVtYmVyKHJhbmRvbU51bUdsb2JhbCk7XHJcbiAgICBzZXRCRygpXHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gc2V0QkcoKXtcclxuICAgIGxldCByYW5kb20gPSAoU3RyaW5nKGdldFNsYWlkZXJOdW1iZXIocmFuZG9tTnVtR2xvYmFsKSkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgIGltZy5zcmMgPSBgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3JvbGxpbmctc2NvcGVzLXNjaG9vbC9zdGFnZTEtdGFza3MvYXNzZXRzL2ltYWdlcy8ke3Nob3dQYXJ0T2ZEYXkoKX0vJHtyYW5kb219LmpwZ2BcclxuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7ICAgICAgXHJcbiAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2ltZy5zcmN9KWAgXHJcbiAgICB9OyBcclxuICB9XHJcblxyXG4vLyAgIGFzeW5jIGZ1bmN0aW9uIHNldEJnVW5zcGxhaCgpIHtcclxuLy8gICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4vLyAgICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvcmFuZG9tP29yaWVudGF0aW9uPWxhbmRzY2FwZSZxdWVyeT0ke3Nob3dQYXJ0T2ZEYXkoKX0mY2xpZW50X2lkPWxFU3B4TlZuVDIwemo0T2RqaHE0aTJhNWhkbTgtSmRmUEdNbWdPWExHRHdgO1xyXG4vLyAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKTtcclxuLy8gICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xyXG4vLyAgICAgaW1nLnNyYyA9IGRhdGEudXJscy5yZWd1bGFyO1xyXG4vLyAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuLy8gICAgICAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpbWcuc3JjfSlgO1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGFzeW5jIGZ1bmN0aW9uIHNldEJnVW5zcGxhaCgpIHtcclxuLy8gICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuLy8gICBjb25zdCB1cmwgPSBgaHR0cHM6Ly93d3cuZmxpY2tyLmNvbS9zZXJ2aWNlcy9yZXN0Lz9tZXRob2Q9ZmxpY2tyLnBob3Rvcy5zZWFyY2gmYXBpX2tleT1iNjk4YjEzODdmZjZjMGJkODkxZTMwZjAxNjk1OWI1NSZ0YWdzPSR7c2hvd1BhcnRPZkRheSgpfSZleHRyYXM9dXJsX2wmZm9ybWF0PWpzb24mbm9qc29uY2FsbGJhY2s9MWA7XHJcbi8vICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKTtcclxuLy8gICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuLy8gICBpbWcuc3JjID0gZGF0YS5waG90b3MucGhvdG9bZ2V0UmFuZG9tTnVtKDEwMCldLnVybF9sO1xyXG4vLyAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbi8vICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2ltZy5zcmN9KWA7XHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG5cclxuLy8gICBsZXQgbGlua1NldHRpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGluaycpO1xyXG4vLyAgIHN3aXRjaChsaW5rU2V0dGluZykge1xyXG4vLyAgICAgICBjYXNlICdnaXRodWInOiBcclxuLy8gICAgICAgICAgIHNldEJnRnJvbUdpdEh1YihyYW5kb20pXHJcbi8vICAgICAgICAgICBicmVhaztcclxuLy8gICAgICAgY2FzZSAndW5zcGxhc2gnOiBcclxuLy8gICAgICAgICAgIHNldEJnRnJvbVVuc3BsYWgoKTtcclxuLy8gICAgICAgICAgIGJyZWFrO1xyXG4vLyAgICAgICBjYXNlICdmbGlja3InOlxyXG4vLyAgICAgICAgICAgc2V0QmdGcm9tRkxpY2tSKClcclxuLy8gICAgICAgICAgIGJyZWFrO1xyXG4vLyAgIH1cclxuLy8gfVxyXG5zZXRCRygpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhY2tncm91bmdTbGFpZGVyO1xyXG4iLCJcclxuY29uc3QgdGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lJyk7XHJcblxyXG5pbXBvcnQgc2hvd0RhdGUgZnJvbSBcIi4vZGF0ZS5qc1wiO1xyXG5zaG93RGF0ZSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hvd1RpbWUoKSB7XHJcbiAgY29uc3QgZGF0ZXMgPSBuZXcgRGF0ZTtcclxuICBjb25zdCBjdXJyZW50VGltZSA9IGRhdGVzLnRvTG9jYWxlVGltZVN0cmluZygpO1xyXG4gIHRpbWUuaW5uZXJIVE1MID0gY3VycmVudFRpbWU7XHJcbiAgc2V0VGltZW91dChzaG93VGltZSwgMTAwMCk7XHJcbiAgc2V0VGltZW91dChzaG93RGF0ZSwgMTAwMCk7XHJcbn0iLCJcclxubGV0IHNldGluZ3NMYW5ndWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZXR0aW5ncycpOyBcclxubGV0IGxhbmd1YWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxhbmd1YWdlJyk7IFxyXG5pbXBvcnQgc2hvd0dyZWV0aW5nIGZyb20gXCIuL2dyZWV0aW5nLmpzXCI7XHJcbmltcG9ydCBpbml0V2VhdGhlciBmcm9tIFwiLi93ZWF0aGVyLmpzXCI7XHJcbmltcG9ydCBzaG93RGF0ZSBmcm9tIFwiLi9kYXRlLmpzXCI7XHJcbmltcG9ydCBjaGFuZ2VRdW90ZXMgZnJvbSBcIi4vcXVvdGVzLmpzXCI7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRMQW5ndWFnZSgpe1xyXG5sZXQgbmFtZUNpdHkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZycpO1xyXG5sYW5ndWFnZS50eXBlID0gXCJ0ZXh0XCI7XHJcbmlmIChuYW1lQ2l0eSkge1xyXG4gICAgaWYgKG5hbWVDaXR5ID09IDApIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFuZycsIGxhbmd1YWdlLnRleHRDb250ZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGFuZ3VhZ2UudGV4dENvbnRlbnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZycpO1xyXG4gICAgfVxyXG59IGVsc2Uge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhbmcnLCBsYW5ndWFnZS50ZXh0Q29udGVudCk7XHJcbn1cclxufVxyXG5jb25zb2xlLmxvZyhsYW5ndWFnZS50ZXh0Q29udGVudClcclxuXHJcblxyXG5mdW5jdGlvbiBnZXRMYW5ndWFnZSgpe1xyXG4gICAgaW5pdExBbmd1YWdlKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaTxzZXRpbmdzTGFuZ3VhZ2UubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIHNldGluZ3NMYW5ndWFnZVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgbGV0IGV2ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICBsYW5ndWFnZS50ZXh0Q29udGVudCA9IGV2LmlkO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFuZycsIGxhbmd1YWdlLnRleHRDb250ZW50KTtcclxuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc2hvd0dyZWV0aW5nKCk7XHJcbiAgICBpbml0V2VhdGhlcigpXHJcbiAgICBzaG93RGF0ZSgpXHJcbiAgICBjaGFuZ2VRdW90ZXMoKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2V0TGFuZ3VhZ2U7XHJcblxyXG4iLCJjb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLWljb24nKTtcclxuY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcGVyYXR1cmUnKTtcclxuY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXItZGVzY3JpcHRpb24nKTtcclxuY29uc3QgY2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXR5Jyk7XHJcbmNvbnN0IHdlYXRoZXJXaW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmQnKTtcclxuY29uc3Qgd2VhdGhlckh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmh1bWlkaXR5Jyk7XHJcbmNvbnN0IHdlYXRoZXJJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXJfX2luZm8nKTtcclxubGV0IGxhbmd1YWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYW5ndWFnZScpO1xyXG5cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKCkge1xyXG4gIGxldCBsYW5ndWFnZSA9IGxhbmd1YWdlcy50ZXh0Q29udGVudCAgXHJcbiAgaWYgKGNpdHkudGV4dENvbnRlbnQubGVuZ3RoICE9PSAwKXtcclxuICB3ZWF0aGVySW5mby5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gIGxldCBuYW1lQ2l0eSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaXR5Jyk7XHJcbiAgbGV0IGRlZmF1bHRDaXR5PSdNaW5zayc7XHJcbiAgY2l0eS50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgY2l0eS5jbGFzc0xpc3QuYWRkKCdjaXR5Jyk7XHJcbiAgaWYgKG5hbWVDaXR5KSB7XHJcbiAgICAgIGlmIChuYW1lQ2l0eSA9PSAwKSB7XHJcbiAgICAgICAgICBjaXR5LnRleHRDb250ZW50ID0gZGVmYXVsdENpdHk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjaXR5LnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NpdHknKTtcclxuICAgICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAgIGNpdHkudmFsdWUgPSBkZWZhdWx0Q2l0eTtcclxuICB9XHJcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5LnRleHRDb250ZW50fSZsYW5nPSR7bGFuZ3VhZ2V9JmFwcGlkPWFhNWE0ZjEyNDYxMmM0MmJhNTVjMzM3YTYxNTM0ZWM3JnVuaXRzPW1ldHJpY2A7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKTtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuXHJcbiAgd2VhdGhlckljb24uY2xhc3NMaXN0LmFkZChgb3dmLSR7ZGF0YS53ZWF0aGVyWzBdLmlkfWApO1xyXG4gIFxyXG4gIGxldCB0cmFuc2xhdGlvbiA9IHtcclxuICAgIHdpbmQ6IHtcclxuICAgICAgICBydTogXCLQodC60L7RgNC+0YHRgtGMINCy0LXRgtGA0LA6IFwiLFxyXG4gICAgICAgIGVuOiBcIldpbmQgc3BlZWQ6IFwiXHJcbiAgICB9LFxyXG4gICAgaHVtaWRpdHk6IHtcclxuICAgICAgcnU6IFwi0JLQu9Cw0LbQvdC+0YHRgtGMOiBcIixcclxuICAgICAgZW46IFwiSHVtaWRpdHk6IFwiXHJcbiAgICB9LFxyXG4gICAgc3BlZWQ6IHtcclxuICAgICAgICBydTogXCIg0LwvY1wiLFxyXG4gICAgICAgIGVuOiBcIiBtL3NcIlxyXG4gICAgfSxcclxuICB9ICBcclxuICB3ZWF0aGVySWNvbi5jbGFzc05hbWUgPSAnd2VhdGhlci1pY29uIG93Zic7XHJcbiAgd2VhdGhlckljb24uY2xhc3NMaXN0LmFkZChgb3dmLSR7ZGF0YS53ZWF0aGVyWzBdLmlkfWApO1xyXG4gIHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7ZGF0YS5tYWluLnRlbXAudG9GaXhlZCgwKX3CsENgO1xyXG4gIHdlYXRoZXJEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcclxuICB3ZWF0aGVyV2luZC5pbm5lckhUTUwgPSBgJHt0cmFuc2xhdGlvbi53aW5kW2xhbmd1YWdlXX0gJHtNYXRoLnJvdW5kKGRhdGEud2luZC5zcGVlZCl9ICR7dHJhbnNsYXRpb24uc3BlZWRbbGFuZ3VhZ2VdfWA7XHJcbiAgd2VhdGhlckh1bWlkaXR5LmlubmVySFRNTCA9IGAke3RyYW5zbGF0aW9uLmh1bWlkaXR5W2xhbmd1YWdlXX0gJHtkYXRhLm1haW4uaHVtaWRpdHkudG9GaXhlZCgwKX0gJWA7XHJcbiAgd2VhdGhlckRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcclxuICB9XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gc2V0TG9jYWxTdG9yYWdlKCkge1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjaXR5JywgY2l0eS50ZXh0Q29udGVudCk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlKCkge1xyXG4gIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaXR5JykpIHtcclxuICAgIGNpdHkudGV4dENvbnRlbnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2l0eScpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZENpdHkoKXtcclxuZnVuY3Rpb24gc2V0Q2l0eShldmVudCkge1xyXG4gIGlmIChldmVudC5jb2RlID09PSAnRW50ZXInKSB7XHJcbiAgICBzZXRMb2NhbFN0b3JhZ2UoKVxyXG4gICAgZ2V0V2VhdGhlcigpO1xyXG4gICAgY2l0eS5ibHVyKCk7XHJcbiAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xyXG4gIGNvbnN0IHdpdGhpbkJvbmRhcmllcyA9IGUuY29tcG9zZWRQYXRoKCkuaW5jbHVkZXMoY2l0eSk7XHJcbiAgaWYgKCF3aXRoaW5Cb25kYXJpZXMpe1xyXG4gICAgc2V0TG9jYWxTdG9yYWdlKClcclxuICAgIGdldFdlYXRoZXIoKTtcclxuICAgIGNpdHkuYmx1cigpO1xyXG4gIH1cclxuIH0pXHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGdldFdlYXRoZXIpO1xyXG5jaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgc2V0Q2l0eSk7XHJcblxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaW5pdFdlYXRoZXIoKXtcclxuICBnZXRXZWF0aGVyKClcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgc2V0TG9jYWxTdG9yYWdlKTtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGdldExvY2FsU3RvcmFnZSlcclxuICBzZW5kQ2l0eSgpO1xyXG4gIGdldFdlYXRoZXIoKVxyXG5cclxufVxyXG5cclxuZ2V0V2VhdGhlcigpXHJcbmV4cG9ydCBkZWZhdWx0IGluaXRXZWF0aGVyO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vLi4vY3NzL293Zm9udC1yZWd1bGFyLmNzcydcclxuaW1wb3J0ICcuLi8uLi9jc3Mvc3R5bGUuY3NzJ1xyXG5cclxuXHJcbmltcG9ydCBpbml0UGFuZWwgZnJvbSBcIi4vc2V0dGluZ2xpc3QuanNcIlxyXG5pbml0UGFuZWwoKVxyXG5cclxuaW1wb3J0IGluaXRTZXR0aW5ncyBmcm9tIFwiLi9zZXR0aW5ncy5qc1wiXHJcbmluaXRTZXR0aW5ncygpXHJcblxyXG5pbXBvcnQgc2hvd1RpbWUgZnJvbSBcIi4vdGltZS5qc1wiO1xyXG5zaG93VGltZSgpO1xyXG5cclxuaW1wb3J0IHNob3dEYXRlIGZyb20gXCIuL2RhdGUuanNcIjtcclxuc2hvd0RhdGUoKTtcclxuXHJcbmltcG9ydCBzaG93R3JlZXRpbmcgZnJvbSBcIi4vZ3JlZXRpbmcuanNcIjtcclxuc2hvd0dyZWV0aW5nKCk7XHJcblxyXG5pbXBvcnQgc2V0QkcgZnJvbSBcIi4vc2xpZGVyLmpzXCI7XHJcbnNldEJHKCk7XHJcblxyXG5pbXBvcnQgc3RhcnRQbGF5TGlzdCBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcclxuc3RhcnRQbGF5TGlzdCgpO1xyXG5cclxuaW1wb3J0IGNoYW5nZVF1b3RlcyBmcm9tIFwiLi9xdW90ZXMuanNcIjtcclxuY2hhbmdlUXVvdGVzKClcclxuXHJcbmltcG9ydCBpbml0V2VhdGhlciBmcm9tIFwiLi93ZWF0aGVyLmpzXCI7XHJcblxyXG5pbXBvcnQgZ2V0TGFuZ3VhZ2UgZnJvbSBcIi4vdHJhbnNsYXRlLmpzXCI7XHJcbmdldExhbmd1YWdlKClcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==