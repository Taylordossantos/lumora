# 🎬 Lumora — Streaming Platform

A fictional streaming platform built with HTML, CSS and Vanilla JavaScript, integrated with the TMDB API to display real movie data in Brazilian Portuguese.

![Lumora Preview](https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1200)

## 🚀 Live Demo

> [lumora-kappa-peach.vercel.app](https://lumora-kappa-peach.vercel.app/)

## ✨ Features

- 🎥 Dynamic hero section with random now playing movie
- 🎞️ Movie carousels with Swiper.js (Popular, Action, Top Rated, Upcoming)
- 🔍 Real-time search with genre, year and rating filters
- 🎬 Movie detail page with cast, synopsis and metadata
- ▶️ Real trailer player via YouTube embed
- 🔔 Toast notifications with Toastify.js
- 💫 Smooth page transitions with Animate.css
- ⚡ Loading spinner on startup

## 🛠️ Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Tailwind CSS (via CDN)
- Swiper.js — carousels
- Toastify.js — notifications
- Animate.css — animations
- Lucide Icons
- TMDB API — real movie data

## 📁 Project Structure

lumora/
├── index.html
├── config.js # API config (not versioned)
├── assets/
│ ├── css/
│ │ └── styles.css
│ └── js/
│ ├── data.js # TMDB API integration
│ ├── render.js # UI rendering
│ ├── navigation.js # Page navigation
│ ├── search.js # Search engine
│ ├── player.js # Video player
│ └── main.js # App initialization
└── README.md

## ⚙️ Setup

1. Clone the repository

```bash
git clone https://github.com/Taylordossantos/lumora.git
```

2. Create a `config.js` file in the root:

```javascript
const CONFIG = {
  TMDB_API_KEY: "your_api_key_here",
  TMDB_BASE_URL: "https://api.themoviedb.org/3",
  TMDB_IMAGE_URL: "https://image.tmdb.org/t/p/w500",
  TMDB_BACKDROP_URL: "https://image.tmdb.org/t/p/original",
  TMDB_LANGUAGE: "pt-BR",
};
```

3. Get your free API key at [themoviedb.org](https://www.themoviedb.org/settings/api)

4. Open `index.html` with Live Server

## 📝 License

MIT License — feel free to use this project for your own portfolio.
