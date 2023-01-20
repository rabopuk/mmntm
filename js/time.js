const time = document.querySelector('.time');


function showTime() {
    const dates = new Date;
    const currentTime = dates.toLocaleTimeString();
    time.innerHTML = currentTime;
    setTimeout(showTime, 1000);

    showDate();
    showGreeting();
};
showTime();