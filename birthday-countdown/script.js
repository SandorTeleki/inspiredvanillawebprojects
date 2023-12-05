const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const birthdayInput = document.getElementById('birthday-input');
const submitBtn = document.getElementById('birthday-submit');

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();
const currentHour = new Date().getHours();
const currentMinutes = new Date().getMinutes();
const currentSeconds = new Date().getSeconds();


const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

//Set maximum birthday date to current (local) day
currentDateString = currentYear + '-' + ('0'+ currentMonth).slice(-2) + '-' + ('0'+ currentDay).slice(-2);

// Set background year
//year.innerText = currentYear + 1;

//Set max date
birthdayInput.setAttribute("max", currentDateString);

//Pull info from local storage
const myBDay = JSON.parse(localStorage.getItem("myBDay")) || '';
const regEx = /^(\d+)\-(\d+)\-(\d+)/
const bDayMatch = myBDay.match(regEx);
const nextYearBirthday = +bDayMatch[1] + 1;
const bDayMonth = bDayMatch[2];
const bDayDay = bDayMatch[3];

const newBirthdayTime = nextYearBirthday + '-' + bDayMonth + '-' + bDayDay + '-' + '00' + '00' + '00';

const currentTime2 = currentYear + '-' + ('0'+ currentMonth).slice(-2)  + '-' + ('0'+ currentDay).slice(-2) + '-' + ('0'+ currentHour).slice(-2) + '-' + ('0'+ currentMinutes).slice(-2) + '-' + ('0'+ currentSeconds).slice(-2);
console.log(currentTime2);

const diff2 = newBirthdayTime - currentTime2;
console.log(diff2);

// Update countdown time
function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  // Add values to DOM
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
}

// Show spinner before countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 2000);

// Run every second
setInterval(updateCountdown, 1000);

submitBtn.addEventListener('click', () => {
  const myBDay = birthdayInput.value;
  localStorage.setItem("myBDay", JSON.stringify(myBDay));
  location.reload();
})