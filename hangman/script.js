const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

getRandomWord();

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

async function getRandomWord() {
	fetch("https://random-word-api.herokuapp.com/word?number=4")
    .then(res => res.json())
    .then(data => {
		words.splice(0, words.length, ...data)
		//console.log(words) - Use for debugging
		//console.log(data) - Use for debugging
	})
}

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;

	const innerWord = wordEl.innerText.toLowerCase().replace(/[ \n]/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You won! 😃';
		finalMessageRevealWord.innerText = '';
		popup.style.display = 'flex';

		playable = false;
	}
}

// Update the wrong letters
function updateWrongLettersEl() {
	// Display wrong letters
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p class="wrong-letters-container__title">Wrong Letters:</p>' : ''}
    ${wrongLetters.map(letter => `<span class="wrong-letters-container__letters"> ${letter}</span>`)}
  `;

	// Display parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately you lost. 😕';
		finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
		popup.style.display = 'flex';

		playable = false;
	}
}

// Show notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

// Keydown letter press
window.addEventListener('keydown', (e) => {
	const regex = /^[A-Za-z]$/
	if (playable) {
		if (regex.test(e.key)) {
			const letter = e.key.toLowerCase();

			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();
				} else {
					showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersEl();
				} else {
					showNotification();
				}
			}
		}
	}
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
	playable = true;

	//  Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();

	updateWrongLettersEl();

	getRandomWord();

	popup.style.display = 'none';
});


displayWord();
