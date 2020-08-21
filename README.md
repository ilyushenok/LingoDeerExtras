# LingoDeerExtras
Extras for LingoDeer web app. Greasemonkey/Tampermonkey script.

# Installation
Add script by URL: `https://raw.githubusercontent.com/ilyushenok/LingoDeerExtras/master/UserScript.js`

# Features
- Keyboard controls:
  - Press 'Space' to play audio
  - Press '1'-'9' or '0' to select options 1 through 10. Holding 'Shift' while pressing enables selecting options 11 through 20.
- Numbered options (see above)
- Audio autoplay on correct answer

# Building
Before building you need to install dependencies:
```
npm ci
```
To build a new `UserScript.js` file, simply run:
```
npm run-script release
```
