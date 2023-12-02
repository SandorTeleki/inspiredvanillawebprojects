const word = document.getElementById("word");																									
const text = document.getElementById("text");																									
const scoreEl = document.getElementById("score");																									
const timeEl = document.getElementById("time");																									
const endgameEl = document.getElementById("end-game-container");																									
const settingsBtn = document.getElementById("settings-btn");																									
const leaderboardBtn = document.getElementById("leaderboard-btn");																									
																									
const settings = document.getElementById("settings");																									
const settingsForm = document.getElementById("settings-form");																									
const leaderboardContainer = document.getElementById("leaderboard");																									
const leaderboardList = document.getElementById("leaderboard-list");																									
const difficultySelect = document.getElementById("difficulty");																									
																				
// List of base words for the game																									
const words = [																									
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];																									
																									
var baseLeaderboard = [																									
  {																									
    name: "Amerikai Cowboy",																									
    points: "121",																									
  },																									
  {																									
    name: "Irving Washington",																									
    points: "101",																									
  },																									
  {																									
    name: "Washington Irving",																									
    points: "100",																									
  },																									
  {																									
    name: "Major Major",																									
    points: "92",																									
  },																									
  {																									
    name: "John Cena",																									
    points: "80",																									
  },																									
  {																									
    name: "Hulk Hogan",																									
    points: "74",																									
  },																									
  {																									
    name: "That random kid",																									
    points: "68",																									
  },																									
  {																									
    name: "Typing McTyping Face",																									
    points: "66",																									
  },																									
  {																									
    name: "OG Typist",																									
    points: "51",																									
  },		
  {																									
    name: "Lamp McLamp",																									
    points: "43",																									
  },																																												
]

// Set default leaderboard based on made up players and scores
function setLeaderboard(){
  let leaderboard = JSON.parse(localStorage.getItem("baseLeaderboard"));
  if (leaderboard === null){
    localStorage.setItem("baseLeaderboard", JSON.stringify(baseLeaderboard));
  } else {
    return;
  }
}

setLeaderboard();


var flag = 0;
// Sort Leaderboard based on high score (most points) - descending order
function baseLeaderboardSort (leaderboard){
  leaderboard.sort((a,b) => {
    return b.points - a.points;
  });
}																	


//Add words from random word API to word bank (improve replayability)																									
getRandomWords(20);																									
var wordCount = 0;																									
																									
async function getRandomWords(amount) {																									
  fetch(`https://random-word-api.herokuapp.com/word?number=${amount}`)																									
  .then((res) => res.json())																									
  .then((data) => {																									
  words.push(...data);																									
  });																									
}																									
																									
// Init word																									
let randomWord;																									
																									
// Init score																									
let score = 150;																							
if (score > 15) {																									
  getRandomWords();																									
}																									
																									
// Init time																									
let time = 10;																									
																									
// Set difficulty to value in ls or medium																									
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";																									
																									
// Set difficulty select value																									
difficultySelect.value = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";																									
																									
// Focus on text on start																									
text.focus();																									
																									
// Start counting down																									
const timeInterval = setInterval(updateTime, 1000);																									
																									
// Generate random word from array																									
function getRandomWord() {																									
  return words[Math.floor(Math.random() * words.length)];																									
}																									
																									
// Add word to DOM																									
function addWordToDOM() {																									
  randomWord = getRandomWord();																									
  word.innerHTML = randomWord;																									
}																									
																									
// Update score																									
function updateScore() {																									
  score++;																									
  wordCount++;																									
  scoreEl.innerHTML = score;																									
  if (score % 10 === 0) {																									
    getRandomWords(10);																									
  }																									
  if (time > 30) {																									
    score++;																									
  }																									
  if (time > 60) {																									
    score++;																									
  }			
}																									
																									
// Update time																									
function updateTime() {																									
  time--;																									
  timeEl.innerHTML = time + "s";																									
  if (time === 0) {																									
  clearInterval(timeInterval);																									
  // end game																									
  gameOver();																									
  }																									
}																									
																									
// Game over, show end screen																									
function gameOver() {
  localStorage.getItem(baseLeaderboard);
  const lowestScore = baseLeaderboard[9].points;
  if(score > lowestScore){
    endgameEl.innerHTML = `
    <h2 class="end-game-container__title">Time ran out</h2>
    <h3 class="end-game-container__subtitle">New high score!</h3>
      <p class="end-game-container__final-score">Your final score is: ${score}</p>
      <p class="end-game-container__final-word-count">You typed ${wordCount} words correctly </p>
      <div class="high-score__name">Your name:
        <input class="high-score__input" id="high-score__input" type="text" minlength="2" maxlength="20" required>
        <button class="submit-button" id="submit-button">Submit</button>
      </div>
      <button class="button" onclick="location.reload()">Reload</button>
    `;																									
                                                      
    endgameEl.style.display = "flex";
  } else {
    endgameEl.innerHTML = `
    <h2 class="end-game-container__title">Time ran out</h2>
    <h3 class="end-game-container__subtitle">No new high score...</h3>
      <p class="end-game-container__final-score">Your final score is: ${score}</p>
      <p class="end-game-container__final-word-count">You typed ${wordCount} words correctly </p>
        <button class="submit-button submit-button_hide" id="submit-button">Submit</button>
      <button class="button" onclick="location.reload()">Reload</button>
    `;																									
                                                      
    endgameEl.style.display = "flex";
  };
  
  const submitBtn = document.getElementById("submit-button");																									
  submitBtn.addEventListener('click', () => {
    const highScoreInput = document.getElementById('high-score__input');
    const highScoreName = highScoreInput.value;
    if(highScoreName.length < 2){
      alert('Name is too short!');
      return;
    }
    const storedLeaderboard = JSON.parse(localStorage.getItem("baseLeaderboard")) || [];
    storedLeaderboard.push({ name: highScoreName, points: score.toString() });
    baseLeaderboardSort(storedLeaderboard);
    storedLeaderboard.splice(10, 12); // removes lowest score (so only top 10 are displayed)
    localStorage.setItem("baseLeaderboard", JSON.stringify(storedLeaderboard));
    location.reload();
  });
}																									
																									
addWordToDOM();																									
																									
// Event listeners																									
																									
// Typing																									
text.addEventListener("input", (e) => {																									
const insertedText = e.target.value;																									
																									
if (insertedText === randomWord) {																									
  addWordToDOM();																									
  updateScore();																									
                                                    
  // Clear																									
  e.target.value = "";																									
                                                    
  if (difficulty === "hard") {																									
  time += 2;																									
  } else if (difficulty === "medium") {																									
  time += 3;																									
  } else {																									
  time += 5;																									
  }																									
                                                    
  updateTime();																									
  }																									
});																									
																									
// Settings btn click																									
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));																									
																									
// Settings select																									
settingsForm.addEventListener("change", (e) => {																									
  difficulty = e.target.value;																									
  localStorage.setItem("difficulty", difficulty);																									
});																									
																									
//High Score button - show leaderboard																									
leaderboardBtn.addEventListener("click", () => {																								
  leaderboardContainer.classList.toggle("show");																								
  var i = 0;
  const baseLeaderboard = JSON.parse(localStorage.getItem("baseLeaderboard")) || [];
  if ( flag === 0) {
    flag++;
    baseLeaderboard.forEach((item) => {																									
      i++;																									
      leaderboardList.innerHTML += `																									
      <li class="leaderboard__item"><span class="leaderboard__span">${i}. ${item.name}</span> <span class="leaderboard__span">${item.points}</span></li>																									
      `;																									
    });		
  }																				
});								
