# English Janala

English Janala is a responsive English vocabulary learning web app. Learners can browse vocabulary by lesson, search for words, view word details and synonyms, listen to pronunciations, and save words to a favourites view.

**Live site:** [arnnikislam.github.io/english-janala](https://arnnikislam.github.io/english-janala/)

## Features

- Loads vocabulary lessons dynamically
- Shows vocabulary cards for each selected lesson
- Searches across all available words
- Opens a detailed word modal with meaning, example sentence, and synonyms
- Uses the browser's speech-synthesis feature for pronunciation
- Lets users add words to a favourites view
- Includes loading, empty-state, and search feedback UI
- Responsive layout for mobile and desktop screens

## Built with

- HTML5
- CSS3
- JavaScript (ES6+)
- [Tailwind CSS](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)
- [Font Awesome](https://fontawesome.com/)
- [Programming Hero Open API](https://openapi.programming-hero.com/)

## Run locally

1. Clone or download this repository.
2. Open `index.html` in a modern web browser.

The application fetches lesson and vocabulary data from an external API, so an internet connection is required. Pronunciation also depends on browser support for the Web Speech API.

## Project structure

```text
English-Janala/
├── assets/           # Images and visual assets
├── js/
│   └── script.js     # App logic and API requests
├── styles/
│   └── style.css     # Custom styles
└── index.html        # Application entry point
```

## API endpoints used

- `GET /api/levels/all` — lesson list
- `GET /api/level/{level}` — words for a lesson
- `GET /api/word/{id}` — individual word details
- `GET /api/words/all` — searchable word collection

Base URL: `https://openapi.programming-hero.com`
