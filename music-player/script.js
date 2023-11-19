const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const songPicker = document.getElementById('song-picker');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Set initial drop down list selected song to the first song
window.onload = function () {
  songPicker.value = 'ukulele';
}

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
  //Updates selected song value from drop down list - so it always matches to the currently playing/shown song
  songPicker.value = songs[songIndex];
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Play/Pause song by pressing 'space'
document.addEventListener("keydown", (e) => {
	const isPlaying = musicContainer.classList.contains('play');

	if (e.code === 'Space' && isPlaying){
		pauseSong();
	} else {
		playSong();
	}
}) 

// Change song with arrow keys
document.addEventListener("keydown", (e) => {
  if (e.code === 'ArrowRight'){
    nextSong();
  } else if (e.code === 'ArrowLeft'){
    prevSong();
  }
})

// Dynamically add songs to DOM
songs.forEach((song) => {
  const songOption = document.createElement('option');
  songOption.innerHTML = `
   <option value="${song}">${song}</option>
  `;
 songPicker.appendChild(songOption);
})

// Not checking selected song yet... (playing current song instead regardless of what you change input to)
songPicker.addEventListener('change', () => {
  loadSong(songPicker.value);
  playSong();
});


