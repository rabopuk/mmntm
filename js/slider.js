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
    function getSlideNumber(randomNumGlobal) {
        let randomNum = randomNumGlobal;
        return randomNum
    };


    prevSlideButton.addEventListener('click', getSlidePrev);
    nextSlideButton.addEventListener('click', getSlideNext);


    function getSlidePrev() {
        (randomNumGlobal === 1) ? randomNumGlobal = 20 : randomNumGlobal--;
        getSlideNumber(randomNumGlobal);
        setBG();
    };


    function getSlideNext() {
        (randomNumGlobal === 20) ? randomNumGlobal = 1 : randomNumGlobal++;
        getSlideNumber(randomNumGlobal);
        setBG();
    };


    function setBG() {
        let random = (String(getSlideNumber(randomNumGlobal))).padStart(2, "0");
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${showPartOfDay()}/${random}.jpg`;
        img.onload = () => {
            body.style.backgroundImage = `url(${img.src})`;
        };
    };
    setBG();
};
BackgroundSlider();