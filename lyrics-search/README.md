## LyricsSearch App

Find songs, artists and lyrics using the [lyrics.ovh](https://lyrics.ovh) API

## Project Specifications

- Display UI with song/artist input
- Fetch songs/artists and put in DOM
- Add pagination
- Add get lyrics functionality and display in DOM

## Changes:
- Fully converted CSS to use BEM methodology
- Updated JS to user new BEM classes and not rely on stacking specificity
- Minor CSS tweaks (added header navigation to return to main page, tweaked some colors, etc.)
- Fixed original projects button CSS issue (button would increase in size with longer song titles)

## To Do:
- Fix API issues (next/previous doesn't work like it previously did)

## Note
- Oringal API broke - no longer returns lyrics. Ditto for next/previous page functionality. 
- Cors-anywhere has also been limited, and needs to be manually toggled (https://github.com/Rob--W/cors-anywhere/issues/301)

