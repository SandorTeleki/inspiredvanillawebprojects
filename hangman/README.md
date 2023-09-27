## Hangman Game

Select a letter to figure out a hidden word in a set amount of chances

## Project Specifications

- Display hangman pole and figure using SVG
- Generate a random word
- Display word in UI with correct letters
- Display wrong letters
- Show notification when select a letter twice
- Show popup on win or lose
- Play again button to reset game

## Changes:
- Refactor CSS to BEM style
- Minor HTML/CSS tweaks (header navigation to return to main page, tweaked some colors, etc.)
- Using https://random-word-api.herokuapp.com/home we grab random words each time a new game starts (replacing default word set)
- Changed wrong letters and correct letters to display as uppercase for better visibility (input not impacted)

## Possible future improvements:
- Press enter on popup to play again
