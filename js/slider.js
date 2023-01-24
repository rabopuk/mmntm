let randomNumGlobal = getRandomNum(20);
const prevSlideButton = document.querySelector('.slide-prev');
const nextSlideButton = document.querySelector('.slide-next');
const body = document.querySelector('body');
const img = new Image();


function getRandomNum(max) {
    return Math.floor(Math.random() * max + 1);
}

function showPartOfDay() {
    const timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
    const currentDate = new Date();
    const hours = currentDate.getHours();
    return timeOfDay[Math.floor(hours / 6)];
}

function BackgroundSlider() {
    function getSliderNumber(randomNumGlobal) {
        let randomNum = randomNumGlobal;
        return randomNum;
    }


    prevSlideButton.addEventListener('click', getSlidePrev)
    nextSlideButton.addEventListener('click', getSlideNext)


    function getSlidePrev() {
        (randomNumGlobal == 1) ? randomNumGlobal = 20 : randomNumGlobal--;
        getSliderNumber(randomNumGlobal);
        setBG()
    }


    function getSlideNext() {
        (randomNumGlobal == 20) ? randomNumGlobal = 1 : randomNumGlobal++;
        getSliderNumber(randomNumGlobal);
        setBG()
    }


    function setBG() {
        let random = (String(getSliderNumber(randomNumGlobal))).padStart(2, "0");
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${showPartOfDay()}/${random}.jpg`
        img.onload = () => {
            body.style.backgroundImage = `url(${img.src})`
        };
    }
    setBG();
}