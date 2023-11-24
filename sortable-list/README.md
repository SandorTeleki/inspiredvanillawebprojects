## Sortable List

Display a scrambled list that can be sorted with drag and drop

## Project Specifications

- Create an ordered list (Top 10 richest people) -> Changed to top 10 medalist countries in the 1956 summer olympics
- Scramble list items randomly
- Allow user to drag and drop an item to a different position
- Button to check if items are in correct order
- Show green for correct order and red for wrong order

## Changes:
- Fully converted CSS to use BEM methodology
- Updated JS to user new BEM classes and not rely on stacking specificity
- Minor CSS tweaks (added navigation to return to main page, tweaked some colors, etc.)
- Rearranging correct list items properly updates right/wrong color
- dragDrop() refactored so that it doesn't run checkOrder before the button was clicked at least once

## To Do:
