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

// const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

//Set maximum birthday date to current (local) day
currentDateString = currentYear + '-' + ('0'+ currentMonth).slice(-2) + '-' + ('0'+ currentDay).slice(-2);
//Set max date for input date field
birthdayInput.setAttribute("max", currentDateString);

//Pull info from local storage
const myBDay = JSON.parse(localStorage.getItem("myBDay")) || '';
const regEx = /^(\d+)\-(\d+)\-(\d+)/
const bDayMatch = myBDay.match(regEx);

const bDayYear = bDayMatch[1];
const bDayMonth = bDayMatch[2];
const bDayDay = bDayMatch[3];
const thisYearBday = +currentYear;
const nextYearBDay = +currentYear + 1;
const thisYearBirthday = new Date (`${thisYearBday},${bDayMonth} , ${bDayDay}`);
const nextYearBirthday = new Date(`${nextYearBDay} ,${bDayMonth} , ${bDayDay}`);

//Calculate age
const yearsOld = (currentYear - bDayYear) + 1;
// Set background age
year.innerText = (yearsOld !== 1 ? `left until you turn ${yearsOld} years old!`: `left until you turn ${yearsOld} year old!`);

// Update countdown time
function updateCountdown() {
  const currentTime = new Date();
  const nextBirthday = ((thisYearBirthday - currentTime) < 0 ? nextYearBirthday - currentTime : thisYearBirthday - currentTime);
  const diff = nextBirthday;

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
}, 1000);

// Run every second
setInterval(updateCountdown, 1000);

submitBtn.addEventListener('click', () => {
  const myBDay = birthdayInput.value;
  console.log(myBDay);
  localStorage.setItem("myBDay", JSON.stringify(myBDay));
  location.reload();
})