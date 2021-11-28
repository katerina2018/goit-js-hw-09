const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
};

refs.start.addEventListener('click', startAction);
refs.stop.addEventListener('click', stopAction);

let timeId = null;

function startAction() {
    timeId = setInterval(() => {
        const currentColor = getRandomHexColor();
        document.body.style.backgroundColor = currentColor;
    }, 1000);

    refs.start.setAttribute('disabled', '');
}

function stopAction() {
    clearInterval(timeId);

    refs.start.removeAttribute('disabled');
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}