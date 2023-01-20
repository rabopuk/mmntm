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
};
console.log(language.textContent);


function getLanguage() {
    initLAnguage();

    for (let i = 0; i < setingsLanguage.length; i++) {
        setingsLanguage[i].addEventListener('click', function (event) {
            let ev = event.target;
            language.textContent = ev.id;
            localStorage.setItem('lang', language.textContent);
            location.reload();
        })
    };
};