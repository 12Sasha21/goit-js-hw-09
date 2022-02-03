import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');

const input = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dayface = document.querySelector('.value[data-days]');
const hourface = document.querySelector('.value[data-hours]');
const minuteface = document.querySelector('.value[data-minutes]');
const secondface = document.querySelector('.value[data-seconds  ]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    if (selectedDates) {
      startBtn.disabled = false;
    }
  },
};

const fp = flatpickr(input, options);

const timer = {
  isActive: false,
  timerId: null,
  startTimer() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    const endTime = fp.selectedDates[0];
    this.timerId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = endTime - startTime;
      const timeFace = convertMs(deltaTime);
      updateTimeface(timeFace);
      if (deltaTime <= 0) {
        clearInterval(this.timerId);
        this.isActive = false;
        const time = convertMs(0);
        updateTimeface(time);
      }
    }, 1000);
  },
};

startBtn.addEventListener('click', () => {
  timer.startTimer();
  startBtn.disabled = true;
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimeface({ days, hours, minutes, seconds }) {
  dayface.innerHTML = `${days}`;
  hourface.innerHTML = `${hours}`;
  minuteface.innerHTML = `${minutes}`;
  secondface.innerHTML = `${seconds}`;
}
