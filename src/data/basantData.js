// ============================================================
// Edit Basant's facts here. Everything on the site is generated
// from this file + the quiz question lists below.
// ============================================================

export const BASANT = {
  name: 'Basant',
  hobbies: ['Cycling', 'Chess', 'Martial Arts', 'Trekking', 'Travelling / exploring'],
  foods: ['Pizza', 'Pasta', 'Biryani'],
  color: 'Warm White',
  anime: 'Naruto',
  song: 'Puche Jo Koi Toh Tera Naam Dun',
  games: ['Chess', 'Free Fire'],
  places: ['Nainital', 'Almora'],
  weekend: 'Going out / exploring',
  dreamDestination: 'Japan',
  tech: 'Hacking / Cybersecurity',
  funnyHabit: 'Texting his crush',
  secretCode: 'TANNU26',
}

// Photos live in /public/photos — referenced by filename only.
// tannu1: outdoor traditional, tannu2: night event, tannu3: yellow saree,
// tannu4: pink saree candid, tannu5: school trip.
export const PHOTOS = {
  normal: ['photos/tannu1.jpg', 'photos/tannu5.jpg'],
  funny: ['photos/tannu2.jpg', 'photos/tannu4.jpg'],
  cute: ['photos/tannu3.jpg', 'photos/tannu1.jpg', 'photos/tannu4.jpg'],
  best: 'photos/tannu3.jpg',
}

export function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ---------- ROUND 1: Basant Quiz (multiple choice) ----------
export const BASANT_QUIZ = [
  {
    q: "Let's start easy... Basant's favourite food?",
    options: ['Pizza 🍕', 'Pasta 🍝', 'Biryani 🍛', 'All three because choosing one is impossible 😂'],
    correct: 3,
    reaction: 'Okay, food is clearly a serious topic here 😂',
  },
  {
    q: 'What would Basant most likely do on a free weekend?',
    options: ['Sleep all day', 'Go somewhere / explore 🚗', 'Study for 12 hours', 'Become a professional gamer'],
    correct: 1,
  },
  {
    q: 'Which activity sounds MOST like Basant?',
    options: ['Cycling 🚴', 'Trekking 🏔️', 'Martial Arts 🥋', 'All of the above'],
    correct: 3,
  },
  {
    q: "Basant's dream destination?",
    options: ['Paris', 'Dubai', 'Japan 🇯🇵', 'Goa'],
    correct: 2,
    reaction: 'Japan arc loading... 🇯🇵🍥',
  },
  {
    q: "Anime test. Basant's favourite anime?",
    options: ['One Piece', 'Naruto 🍥', 'Demon Slayer', 'Attack on Titan'],
    correct: 1,
  },
  {
    q: 'Which games does Basant like?',
    options: ['Chess', 'Free Fire', 'Both', 'Candy Crush 😂'],
    correct: 2,
  },
  {
    q: "Basant's favourite colour?",
    options: ['Black', 'Blue', 'Warm White 🤍', 'Red'],
    correct: 2,
  },
  {
    q: 'Which places are favourites?',
    options: ['Nainital', 'Almora', 'Both', 'Las Vegas 😂'],
    correct: 2,
  },
  {
    q: 'What kind of tech interests Basant?',
    options: ['Graphic design', 'Hacking / Cybersecurity 💻', 'Video editing', 'Social media management'],
    correct: 1,
  },
  {
    q: "Pick Basant's most accurate combo:",
    options: ['Cycling + Trekking', 'Martial Arts + Chess', 'Travelling + Exploring', 'Basically all of these'],
    correct: 3,
  },
  {
    q: "What is Basant's funny habit?",
    options: ['Sleeping all day', 'Talking to himself', 'Texting his crush 👀', "Buying things he doesn't need"],
    correct: 2,
    reaction: "Well... at least he's honest 😂",
  },
  {
    q: "Basant suddenly says: 'Chal ghoomne chalte hain.' What is most likely happening?",
    options: ['He changed his mind', "He's planning a random adventure", 'He wants to study', 'He wants to stay home'],
    correct: 1,
  },
  {
    q: "Basant's perfect day probably includes...",
    options: ['Good food', 'Exploring somewhere', 'Cycling/adventure', 'All of these'],
    correct: 3,
  },
  {
    q: "If Basant had one hour completely free with no plans, what would he do?",
    options: ['Play chess against himself', 'Plan a random trip nobody asked for', 'Text his crush 👀', 'All three, in that exact order'],
    correct: 3,
    reaction: 'This tracks disturbingly well 😂',
  },
  {
    q: 'Be honest Tannu... how much do you actually know about Basant?',
    options: ['Bas thoda sa 😌', 'Kaafi kuch 👀', 'Maybe more than you think 😏', 'I know EVERYTHING 😂'],
    correct: -1, // no wrong answer
  },
]

// ---------- ROUND 2: Memory Test (free text, fuzzy match) ----------
export const MEMORY_TEST = [
  { q: "What is Basant's dream destination?", answers: ['japan'] },
  { q: "What is Basant's favourite anime?", answers: ['naruto'] },
  { q: "Name ONE of Basant's favourite hill-station places.", answers: ['nainital', 'almora'] },
  { q: "What is Basant's favourite colour?", answers: ['warm white', 'white'] },
  { q: "What is Basant's funny habit?", answers: ['texting his crush', 'texting crush', 'crush'] },
]

// ---------- ROUND 3: Truth or Trap ----------
export const TRUTH_OR_TRAP = [
  {
    q: 'What would Basant choose?',
    options: ['Pizza 🍕', 'Cycling 🚴', 'Japan 🇯🇵', 'Talking to Tannu 👀'],
    correct: 2, // Japan — the tempting flirty option is a trap here
  },
  {
    q: "It's a free Sunday. What's Basant actually doing?",
    options: ['Going out to explore 🚗', 'Playing chess all day', 'Texting Tannu the whole day 👀', 'Sleeping till noon'],
    correct: 0,
  },
  {
    q: "Basant's biggest weakness is...",
    options: ['Pizza 🍕', 'Overthinking texts to his crush 👀', 'Losing at chess', 'Waking up early'],
    correct: 1, // here the flirty option genuinely IS correct — keep them guessing
  },
]

// ---------- ROUND 7: Predict Basant ----------
export const PREDICT_BASANT = [
  { q: 'Mountains or Beach?', options: ['Mountains 🏔️', 'Beach 🏖️'], correct: 0 },
  { q: 'Pizza or Biryani?', options: ['Pizza 🍕', 'Biryani 🍛'], correct: 0 },
  { q: 'Cycling or Gaming?', options: ['Cycling 🚴', 'Gaming 🎮'], correct: 0 },
  { q: 'Chess or Free Fire?', options: ['Chess ♟️', 'Free Fire 🔫'], correct: 0 },
  { q: 'Japan or Europe?', options: ['Japan 🇯🇵', 'Europe 🇪🇺'], correct: 0 },
  { q: 'Planned trip or random adventure?', options: ['Planned trip 📋', 'Random adventure 🎒'], correct: 1 },
]

// ---------- ROUND 4: Tannu Rapid Fire (collects her preferences) ----------
export const RAPID_FIRE = [
  { key: 'food', q: 'Favourite food?', options: ['Pizza 🍕', 'Biryani 🍛', 'Pasta 🍝', 'Something else 🍽️'] },
  { key: 'colour', q: 'Favourite colour?', options: ['Pink 🩷', 'Black 🖤', 'White 🤍', 'Blue 💙'] },
  { key: 'music', q: 'Favourite music type?', options: ['Bollywood 🎵', 'Lo-fi 🎧', 'Punjabi 🔥', 'Anything with a beat 💃'] },
  { key: 'dream', q: 'Dream destination?', options: ['Japan 🇯🇵', 'Europe 🇪🇺', 'Bali 🏝️', 'Somewhere in the mountains ⛰️'] },
  { key: 'mtnBeach', q: 'Mountains or beach?', options: ['Mountains 🏔️', 'Beach 🏖️'] },
  { key: 'time', q: 'Morning or night?', options: ['Morning ☀️', 'Night 🌙'] },
  { key: 'contact', q: 'Call or text?', options: ['Call 📞', 'Text 💬'] },
  { key: 'plans', q: 'Stay home or go out?', options: ['Stay home 🏠', 'Go out 🚗'] },
  { key: 'pizzaBiryani', q: 'Pizza or biryani?', options: ['Pizza 🍕', 'Biryani 🍛'] },
  { key: 'tripStyle', q: 'Planned trip or random adventure?', options: ['Planned trip 📋', 'Random adventure 🎒'] },
  { key: 'hobby', q: 'Favourite hobby?', options: ['Dancing 💃', 'Reading 📚', 'Music 🎶', 'Exploring 🗺️'] },
  { key: 'movie', q: 'Favourite movie / anime vibe?', options: ['Rom-com 🎬', 'Action 💥', 'Anime 🍥', 'Comedy 😂'] },
  { key: 'weekend', q: 'Perfect weekend?', options: ['Adventure trip 🎒', 'Netflix + snacks 🍿', 'Hanging with friends 👯', 'Sleeping in 😴'] },
]

// ---------- Achievements ----------
export const ACHIEVEMENT_POOL = [
  { id: 'bronze', label: '🥉 Beginner Detective', condition: () => true },
  { id: 'specialist', label: '🥈 Basant Specialist', condition: (s) => s.quizScore >= 8 },
  { id: 'expert', label: '🥇 Basant Lore Expert', condition: (s) => s.quizScore >= 12 },
  { id: 'classified', label: '🔐 Classified-Level Knowledge', condition: (s) => s.secretUnlocked },
  { id: 'detective', label: '🕵️ Tannu Detective', condition: (s) => s.eggsFound >= 5 },
  { id: 'chaos', label: '🎮 Chaos Survivor', condition: (s) => s.chaosClicks >= 5 },
]

export function quizVerdict(score) {
  if (score <= 4) return 'We may need another introduction 😂'
  if (score <= 8) return 'Not bad 👀'
  if (score <= 11) return 'Okayyy, you have been paying attention.'
  if (score <= 14) return 'Damn. You know me REALLY well.'
  return 'This is suspicious 😂❤️'
}

export function generateTitle(state) {
  const titles = []
  if (state.quizScore >= 13) titles.push('Certified Basant Expert')
  if (state.eggsFound >= 5) titles.push('Professional Basant Detective')
  if (state.quizScore >= 9 && state.quizScore < 13) titles.push('Basant Lore Specialist')
  if (state.chaosClicks >= 5) titles.push('Part-Time Chaos Manager')
  if (state.predictScore <= 2) titles.push('Adventure Department Intern 😂')
  if (titles.length === 0) titles.push('Honorary Basant Historian')
  return randomFrom(titles)
}
