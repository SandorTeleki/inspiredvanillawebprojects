const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const mute = document.getElementById('mute');
const muteIcon = document.getElementById('mute-icon');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const volumeLevel = document.getElementById('volume-level');

// Play & pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Add ability to pause video by pressing space

// update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// Update progress & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  // Get the minutes
  let mins = Math.floor(video.currentTime / 60);
  if(mins < video.duration){
    mins = '0' + String(mins);
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if(secs < video.duration){
    // secs = '0' + String(secs); - need to refactor, since this doesn't round off seconds (allows you to have 00:010 seconds etc.)
    secs = secs.toString().padStart(2, "0"); //padstart allows to set size to 2 digits
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Mute function
function toggleVolume() {
  if(video.volume !== 0) {
    video.volume = 0;
    volumeLevel.value = 0;
    mute.classList.add('muted');
  } else {
    video.volume = 1;
    volumeLevel.value = 100;
    mute.classList.remove('muted');
  }
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
mute.addEventListener('click', toggleVolume)

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);
// Press 'space' to play/pause video. Using 'k' just like YouTube does
document.addEventListener("keydown", (e) => {
  if (e.code === 'Space' || e.key === 'k'){
    toggleVideoStatus();
  }
})
// Press 's' to stop the video (and return to 0:00)
document.addEventListener("keydown", (e) => {
  if (e.key === 's'){
    stopVideo();
  }
})

// Press "m" to toggle mute
document.addEventListener("keydown", (e) => {
  if (e.key === 'm'){
    toggleVolume();
  }
})

volumeLevel.addEventListener("change", (e) => {
  var loudness = volumeLevel.value;
  video.volume = loudness;
  if (video.volume === 0){
    mute.classList.add('muted');
  } else {
    mute.classList.remove('muted');
  }
})

//change input step to 0.01