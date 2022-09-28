import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs= {
    startBtn: document.querySelector('[data-start]'),
    days : document.querySelector('[data-days]'),
    hours : document.querySelector('[data-hours]'),
    minutes:document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds'),
}
let intervalId = null;
let deadline = null;
refs.startBtn.disabled = true

flatpickr("#datetime-picker",{
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      deadline = selectedDates[0]
      if (deadline.getTime() <= Date.now()) {
          Notify.failure("Please choose a date in the future");
          return;         
      }
       refs.startBtn.disabled = false
    }
})
refs.startBtn.addEventListener("click", () => {
    Notify.success("let's go")
    intervalId = setInterval(() => {
    const diff = deadline.getTime() - Date.now()
        const data = convertMs(diff)

        Object.entries(data).forEach(([name, value]) => {
            refs[name].textContent = addLeadingZezo(value)
            

    })
}, 1000)
      
})
function addLeadingZezo(value) {
    return String(value).padStart(2, 0)
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
