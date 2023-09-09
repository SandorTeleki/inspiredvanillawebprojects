const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.seat__occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const screen = document.getElementById('screen');

populateUI();
populateScreen();

let ticketPrice = +movieSelect.value;

// Set screen based on current movie 
function setScreen(movieIndex) {
  if (movieIndex === 0) {
    screen.classList.add('screen__avengers')
  }
  if (movieIndex === 1) {
    screen.classList.add('screen__joker')
  }
  if (movieIndex === 2) {
    screen.classList.add('screen__toy-story')
  }
  if (movieIndex === 3) {
    screen.classList.add('screen__lion-king')
  }
}

// Remove screen class when swapping to another movie (to avoid CSS issues)
function removeScreen(movieIndex) {
  if (movieIndex !== 0) {
    screen.classList.remove('screen__avengers')
  }
  if (movieIndex !== 1) {
    screen.classList.remove('screen__joker')
  }
  if (movieIndex !== 2) {
    screen.classList.remove('screen__toy-story')
  }
  if (movieIndex !== 3) {
    screen.classList.remove('screen__lion-king')
  }
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.seat__selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('seat__selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Populate Screen function (to have screen come loaded with a movie picture)
function populateScreen() {
  const selectedMovieIndex = +localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex === 0) {
    screen.classList.add('screen__avengers')
  }
  if (selectedMovieIndex === 1) {
    screen.classList.add('screen__joker')
  }
  if (selectedMovieIndex === 2) {
    screen.classList.add('screen__toy-story')
  }
  if (selectedMovieIndex === 3) {
    screen.classList.add('screen__lion-king')
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
  removeScreen(e.target.selectedIndex);
  setScreen(e.target.selectedIndex);
});

// Seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('seat__occupied')
  ) {
    e.target.classList.toggle('seat__selected');

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
