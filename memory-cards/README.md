## Memory Cards

Flash card app for learning. Display, add and remove memory cards with questions and answers

## Project Specifications

- Create flip cards using CSS
- Create "Add new card" overlay with form
- Display question cards and flip for answer
- View prev and next cards
- Add new cards to local storage
- Clear all cards from local storage

## Changes:
- Fully converted CSS to use BEM methodology
- Updated JS to user new BEM classes and not rely on stacking specificity
- Minor CSS tweaks (added header navigation to return to main page, tweaked some colors, etc.)
- Navigation with arrow keys between cards
- Added alert in case question and/or answer text box were left blank

## To Do:
- Refactor all the button classes 
- Delete button for each card (remove card from array and DOM, then resave the array to local storage)
