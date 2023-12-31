const rulesBtn = document.getElementById('rules-btn');
const leaderboardBtn = document.getElementById('leaderboard-btn');
const howToCloseBtn = document.getElementById('how-to-close-btn');
const leaderboardEl = document.getElementById('leaderboard');
const leaderboardCloseBtn = document.getElementById('leaderboard-close-btn');
const rulesEl = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const leaderboardList = document.getElementById("leaderboard-list");
const endgameEl = document.getElementById("end-game-container");
const paused = document.getElementById('paused');

let score = 0;
var endGameFlag = 0;
var pauseGameFlag = 0;
var flag = 0;

const brickRowCount = 9;
const brickColumnCount = 5;
const delay = 500; //delay to reset the game

var breakoutLeaderboard = [																									
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
  let leaderboard = JSON.parse(localStorage.getItem("breakoutLeaderboard"));
  if (leaderboard === null){
    localStorage.setItem("breakoutLeaderboard", JSON.stringify(breakoutLeaderboard));
  } else {
    return;
  }
}

setLeaderboard();

// Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
  visible: true
};

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 90, //base length: 80
  h: 10,
  speed: 10,
  dx: 0,
  visible: true
};

// Create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
};

// Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// Draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = ball.visible ? '#b3171a' : 'transparent';
  ctx.fill();
  ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = paddle.visible ? '#00527b' : 'transparent';
  ctx.fill();
  ctx.closePath();
}

// Draw score on canvas
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw bricks on canvas
function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#00527b' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  // Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
    }
}

// Move ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision (right/left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // ball.dx = ball.dx * -1
  }

  // Wall collision (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // console.log(ball.x, ball.y);

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // Brick collision
  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          // ball.dy *= 0; 
          // ball.dx *= 0;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  // Hit bottom wall - Lose
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    ball.dx = 0;
    ball.dy = 0;
    gameOver();
    endGameFlag++;
    // score = 0;
  }
}

// Increase score
function increaseScore() {
  score++;
  //Redraw board and add extra points for clearing the whole map; also increase ball speed for extra difficulty
  if (score % (brickRowCount * brickColumnCount) === 0) {
      score += 10;
      ball.visible = true;
      paddle.visible = true;
      showAllBricks();
      paddle.x = canvas.width / 2 - 40;
      paddle.y = canvas.height - 20;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      // ball.dy *= 1.3;
      // ball.dx *= 1.3;

      //After 0.5 sec restart the game
      // setTimeout(function () {
      //     showAllBricks();
      //     score = 0;
      //     paddle.x = canvas.width / 2 - 40;
      //     paddle.y = canvas.height - 20;
      //     ball.x = canvas.width / 2;
      //     ball.y = canvas.height / 2;
      //     ball.visible = true;
      //     paddle.visible = true;
      // },delay)
  }
}

// Make all bricks appear
function showAllBricks() {
  bricks.forEach(column => {
    column.forEach(brick => (brick.visible = true));
  });
}

// Draw everything
function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Update canvas drawing and animation
function update() {
  movePaddle();
  moveBall();

  // Draw everything
  draw();
  if (endGameFlag === 0 && pauseGameFlag === 0) {
    requestAnimationFrame(update);
  }
}

update();

// Sort Leaderboard based on high score (most points) - descending order
function breakoutLeaderboardSort (leaderboard){
  leaderboard.sort((a,b) => {
    return b.points - a.points;
  });
}			


// Game over, show end screen																									
function gameOver() {
  localStorage.getItem(breakoutLeaderboard);
  const lowestScore = breakoutLeaderboard[9].points;
  if(score > lowestScore){
    endgameEl.innerHTML = `
    <h2 class="end-game-container__title">You lost, but...</h2>
    <h3 class="end-game-container__subtitle">New high score!</h3>
      <p class="end-game-container__final-score">Your final score is: ${score}</p>
      <div class="high-score__name">Your name:
        <input class="high-score__input" id="high-score__input" type="text" minlength="2" maxlength="20" required>
        <button class="submit-button" id="submit-button">Submit</button>
      </div>
      <button class="button" onclick="location.reload()">Reload</button>
    `;																									
                                                      
    endgameEl.style.display = "flex";
  } else {
    endgameEl.innerHTML = `
    <h2 class="end-game-container__title">You lost...</h2>
    <h3 class="end-game-container__subtitle">No new high score...</h3>
      <p class="end-game-container__final-score">Your final score is: ${score}</p>
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
    const storedLeaderboard = JSON.parse(localStorage.getItem("breakoutLeaderboard")) || [];
    storedLeaderboard.push({ name: highScoreName, points: score.toString() });
    breakoutLeaderboardSort(storedLeaderboard);
    storedLeaderboard.splice(10, 12); // removes lowest score (so only top 10 are displayed)
    localStorage.setItem("breakoutLeaderboard", JSON.stringify(storedLeaderboard));
    location.reload();
  });
}	

//---------------------- Events ----------------------------------//

// Keydown event
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

// Keyup event
function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}

//Pause functionality
document.addEventListener("keydown", (e) => {
  if (e.key === 'p' && pauseGameFlag === 0 && endGameFlag === 0){
    pauseGameFlag++;
    paused.classList.add('show');
  } else if ( e.key === 'p' && pauseGameFlag > 0){
    pauseGameFlag--;
    paused.classList.remove('show');
    update();
  }
})



// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rulesEl.classList.add('show'));
howToCloseBtn.addEventListener('click', () => rulesEl.classList.remove('show'));
leaderboardCloseBtn.addEventListener('click', () => leaderboardEl.classList.remove('show'));

//High Score button - show leaderboard																									
leaderboardBtn.addEventListener("click", () => {																								
  leaderboardEl.classList.add('show');
  var i = 0;
  const baseLeaderboard = JSON.parse(localStorage.getItem("breakoutLeaderboard")) || [];
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