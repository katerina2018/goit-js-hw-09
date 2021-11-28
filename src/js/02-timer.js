// es modules are recommended, if available, especially for typescript
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const refs = {
    btn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // console.log(selectedDates[0]);
        let intervalId = null;
        if (selectedDates[0] - options.defaultDate <= 0) {
            Notiflix.Notify.failure('Please choose a date in the future');
            return;
        }
        refs.btn.removeAttribute('disabled');

        refs.btn.addEventListener('click', spendTime);
        stopTime();

        function spendTime() {
            if (intervalId) {
                selectedDates = [];
                stopTime();
                return;
            }
            intervalId = setInterval(() => {
                const currentTime = Date.now();
                const calculatePeriod = selectedDates[0] - currentTime;

                if (calculatePeriod <= 0) {
                    stopTime();
                    Notiflix.Notify.success('time finished');
                    return;
                }

                const { days, hours, minutes, seconds } = convertMs(calculatePeriod);
                refs.days.textContent = days;
                refs.hours.textContent = hours;
                refs.minutes.textContent = minutes;
                refs.seconds.textContent = seconds;
            }, 1000);

            disabledBtn();
        }

        function stopTime() {
            clearInterval(intervalId);
        }
    },

    onChange(selectedDates) {
        if (selectedDates[0] - options.defaultDate <= 0) {
            disabledBtn();
            return;
        }
        refs.btn.removeAttribute('disabled');
    },
};

flatpickr('input#datetime-picker', options);

disabledBtn();

function disabledBtn() {
    refs.btn.setAttribute('disabled', '');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}