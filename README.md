# 🎂 Tannu's Birthday Mission

A mobile-first, interactive birthday website built with React + Vite. No backend,
no database — everything runs in the browser and progress is saved to
`localStorage` so a refresh won't lose Tannu's spot.

## 1. Project structure

```
tannu-birthday/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── photos/            ← Tannu's photos (tannu1.jpg … tannu5.jpg)
│   └── music/              ← optional theme.mp3 goes here
└── src/
    ├── main.jsx
    ├── App.jsx             ← stage order lives here
    ├── index.css           ← theme, glass cards, buttons, animations
    ├── data/
    │   └── basantData.js   ← ALL Basant facts + quiz questions live here
    ├── utils/
    │   ├── store.js        ← localStorage-backed app state
    │   └── confetti.js
    ├── components/
    │   ├── UI.jsx          ← GlassCard, buttons, progress bar
    │   ├── FloatingParticles.jsx
    │   └── MusicToggle.jsx
    └── stages/              ← one file per screen, in flow order
        ├── Intro.jsx
        ├── Mission.jsx
        ├── Rules.jsx
        ├── BasantQuiz.jsx
        ├── MemoryTest.jsx
        ├── TruthOrTrap.jsx
        ├── RapidFire.jsx
        ├── PredictBasant.jsx
        ├── Profile.jsx
        ├── DetectiveMode.jsx
        ├── CharacterCard.jsx
        ├── ChaosButton.jsx
        ├── FakeAnalysis.jsx
        ├── SecretFile.jsx
        ├── EggHunt.jsx
        ├── MiniGame.jsx
        ├── AdventureGenerator.jsx
        ├── ChaosCalculator.jsx
        ├── ScoreAchievements.jsx
        ├── FinalResultCard.jsx
        ├── BirthdayReveal.jsx
        └── FinalQuestion.jsx
```

## 2. Installation

You need [Node.js](https://nodejs.org) 18+ installed. Then, inside the project folder:

```bash
npm install
```

## 3. Run it locally

```bash
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`) — best viewed by resizing
your browser to a phone width, or open it on your actual phone if it's on the
same Wi-Fi network (Vite will print a "Network" URL you can use).

To build a production version:

```bash
npm run build
npm run preview   # serves the built version locally
```

## 4. How to add / change photos

1. Drop your images into `public/photos/`.
2. Open `src/data/basantData.js` and edit the `PHOTOS` object at the top:

```js
export const PHOTOS = {
  normal: ['/photos/tannu1.jpg', '/photos/tannu5.jpg'],
  funny:  ['/photos/tannu2.jpg', '/photos/tannu4.jpg'],
  cute:   ['/photos/tannu3.jpg', '/photos/tannu1.jpg', '/photos/tannu4.jpg'],
  best:   '/photos/tannu3.jpg', // used in the final birthday reveal
}
```

Just point each array at whichever filenames you want used for that mood.

## 5. How to edit the quiz questions

Everything about Basant and every quiz round lives in one file:
`src/data/basantData.js`.

- `BASANT` — his facts (hobbies, food, favourite colour, etc.)
- `BASANT_QUIZ` — the 15 main multiple-choice questions
- `MEMORY_TEST` — free-text recall questions
- `TRUTH_OR_TRAP` — the "tempting wrong answer" round
- `PREDICT_BASANT` — the this-or-that prediction round
- `RAPID_FIRE` — Tannu's own preference questions

Each question is a plain JS object — add, remove, or edit entries directly.
No other file needs to change.

## 6. How to change the secret code

In `src/data/basantData.js`:

```js
export const BASANT = {
  ...
  secretCode: 'TANNU26',
}
```

Change the string to whatever you like. The hint shown on the Secret File
screen is written directly inside `src/stages/SecretFile.jsx` if you want to
update the wording of the hint too.

## 7. Adding background music (optional)

Music never autoplays. To enable the toggle:

1. Add an MP3 file at `public/music/theme.mp3`.
2. That's it — the speaker icon in the top-right corner will play/pause it.

## 8. Deploying it for free

Any static host works since this is a fully static site. Two easy options:

### Option A — Vercel
1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), "Add New Project", import the repo.
3. Framework preset: Vite. Click Deploy. Done — you get a free `*.vercel.app` link.

### Option B — Netlify (drag & drop, no GitHub needed)
1. Run `npm run build` locally.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag the generated `dist/` folder onto the page. You instantly get a live link.

### Option C — GitHub Pages
1. `npm install -D gh-pages`
2. Add to `package.json` scripts: `"deploy": "vite build && gh-pages -d dist"`
3. Run `npm run deploy` after pushing the repo to GitHub, then enable Pages in
   the repo settings.

## Notes on privacy

- Nothing is ever sent to a server — all of Tannu's answers stay in her own
  browser's `localStorage`.
- The "secret code" is purely a fun local game mechanic, not real security.
- The final result card is only saved as an image to her own device; sharing
  it with Basant is entirely her choice via the download/share button.
