## Breakout! Game

Game where you control a paddle with the arrow keys to bounce a ball up to break bricks. This app uses the HTML5 canvas element and API

## Project Specifications

- Draw elements on canvas
- Use canvas paths to draw shapes
- Add animation with requestAnimationFrame(cb)
- Move paddle on arrow key press
- Add collision detection
- Keep score
- Add rules button with slider

## Changes:
- Fully converted CSS to use BEM methodology
- Updated JS to user new BEM classes and not rely on stacking specificity
- Minor CSS tweaks (added navigation to return to main page, tweaked some colors, etc.)
- Add high score functionality 
- Added ability to play a new game after clearing all bricks (gives bonus points and resets the board instead of starting a new game like in the default version)
- Added pause functionality (press 'p')

## To Do/Potential future improvements: 
- Have bricks be multi-colored (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors)
- Add sticky paddle functionality
- Double check paddle/bricks hitboxes on edges