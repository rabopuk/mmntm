let languages = document.querySelector('.language');


function setWidgets() {
    let language = languages.textContent;
    let defaultActiveWidgets = ['Player', 'Time', 'Date', 'Weather', 'Greeting'];
    for (let i = 0; i < defaultActiveWidgets.length; i++) {
        if (!localStorage.getItem(defaultActiveWidgets[i])) {
            localStorage.setItem(defaultActiveWidgets[i], 'true');
        }
    }
};


function initSettings() {
    let isOpen = 'false';
    setWidgets();
};