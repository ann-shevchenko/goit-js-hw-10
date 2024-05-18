import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("button[data-start]");
const daysEl = document.querySelector("span[data-days]");
const hoursEl = document.querySelector("span[data-hours]");
const minutesEl = document.querySelector("span[data-minutes]");
const secondsEl = document.querySelector("span[data-seconds]");

let userSelectedDate = null;

function toggleClass(element, className, present){
    if(present){
        element.classList.add(className);
    } else{
        element.classList.remove(className);
    }
}

function toggleInput(active) {
    toggleClass(input, "input-active", active);
}

function toggleBtnStart(active) {
    toggleClass(btnStart, "btn-active", active);
    btnStart.disabled = !active;
}


function addLeadingZero(value){
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
function refreshTimer(period) {
    daysEl.textContent = addLeadingZero(period.days);
    hoursEl.textContent = addLeadingZero(period.hours);
    minutesEl.textContent = addLeadingZero(period.minutes);
    secondsEl.textContent = addLeadingZero(period.seconds);
}
const startTimer = () => {
    toggleBtnStart(false); 
    toggleInput(false);
    input.disabled = true;

   const intervalTimer = setInterval(() => {
    const periodMs = userSelectedDate - new Date();
    if(periodMs < 0){
        clearInterval(intervalTimer);
        refreshTimer({ days:0, hours:0, minutes:0, seconds:0 });
    }
    const period = convertMs(periodMs);
    refreshTimer(period);
    }, 1000);

}

toggleBtnStart(false);
btnStart.addEventListener("click", startTimer);


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      const valid = userSelectedDate > new Date();
      toggleBtnStart(valid);
      toggleInput(valid);
      if(!valid) {
        iziToast.show({
            title: 'Error',
            message: 'Please choose a date in the future',
            color: '#EF4040',
            position: 'topRight',
            messageColor: '#FFF',
            titleColor: '#FFF',
            iconUrl: '../img/bi_x-octagon.svg',
        });
        userSelectedDate = null;
        return;
      } 
    },
  };


const fp = flatpickr("#datetime-picker", options);
