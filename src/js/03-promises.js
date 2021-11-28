import Notiflix from 'notiflix';

const btnRef = document.querySelector('[type="submit"]');
const formRef = document.querySelector('.form');

btnRef.addEventListener('click', startPromise);

function startPromise(event) {
    event.preventDefault();
    const { delay, step, amount } = dataForm();
    let newDelay = delay;

    for (let i = 1; i <= amount; i += 1) {
        createPromise(i, newDelay)
            .then(({ position, delayPromise }) => {
                Notiflix.Notify.success(` Fulfilled promise ${position} in ${delayPromise}ms`);
            })
            .catch(({ position, delayPromise }) => {
                Notiflix.Notify.failure(` Rejected promise ${position} in ${delayPromise}ms`);
            });
        newDelay += step;
    }
}

function dataForm() {
    const valueForm = new FormData(formRef);
    const obj = {};
    valueForm.forEach((value, key) => {
        obj[key] = Number(value);
    });
    return obj;
}

function createPromise(position, delayPromise) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldResolve = Math.random() > 0.3;

            if (shouldResolve) {
                resolve({ position, delayPromise });
            }
            reject({ position, delayPromise });
        }, delayPromise);
    });
}