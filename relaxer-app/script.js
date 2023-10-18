const container = document.getElementById('container');
const text = document.getElementById('text');
const voicesSelect = document.getElementById('voices');
const muteButton = document.getElementById('mute');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;


// let breatheIn = new SpeechSynthesisUtterance('Breathe In!')
// window.speechSynthesis.speak(breatheIn);


// Mute should be a toggle button/function


// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);
// Change voice
voicesSelect.addEventListener('change', setVoice);

getVoices();


// Mute button
muteButton.addEventListener('click', () => {
  if(message.volume === 1) {
    message.volume = 0;
    muteButton.innerText = "Unmute";
    muteButton.style.backgroundColor = 'green';
  } else {
    message.volume = 1;
    muteButton.innerText = "Mute";
    muteButton.style.backgroundColor = 'red';
  }
});


// Animation moved to the end, so that voices can initialize properly (text is added dynamically)

breathAnimation();

function breathAnimation() {
  text.innerText = 'Breathe In!';
  container.className = 'container grow';
  setTextMessage(text.textContent);
  speakText(text.textContent);

  setTimeout(() => {
    text.innerText = 'Hold';
    setTextMessage(text.textContent);
    speakText();

    setTimeout(() => {
      text.innerText = 'Breathe Out!';
      container.className = 'container shrink';
      setTextMessage(text.textContent);
      speakText();
    }, holdTime);
  }, breatheTime);
}

setInterval(breathAnimation, totalTime);
