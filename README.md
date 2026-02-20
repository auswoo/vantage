# CineMetric 🎬

A high-end movie analytics dashboard that transforms your Letterboxd RSS feed into beautiful, interactive data visualizations.

## Features

- **Dark-themed UI**: Beautiful dark mode interface with glassmorphism effects
- **Genre Analytics**: Visual breakdown of your viewing habits
- **Time Capsule**: Track total viewing time in the last month
- **Director Spotlight**: Discover your most-watched directors
- **Visual Gallery**: Horizontal scrolling gallery of your recent films

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Recharts
- **Backend**: Express.js, Node.js
- **APIs**: Letterboxd RSS, TMDB API

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Get a TMDB API Key**:
   - Sign up at [TMDB](https://www.themoviedb.org/)
   - Get your API key from [Settings > API](https://www.themoviedb.org/settings/api)
   - Create a `.env` file in the root directory:
     ```
     TMDB_API_KEY=your_api_key_here
     ```

3. **Start the development server**:
   ```bash
   # Terminal 1: Start backend server
   npm run server

   # Terminal 2: Start frontend dev server
   npm run dev
   ```

4. **Open your browser**:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## Usage

1. Get your Letterboxd RSS URL:
   - Go to `https://letterboxd.com/yourusername/rss/`
   - Copy the URL

2. Enter the RSS URL in the CineMetric dashboard

3. Wait for the analysis to complete (this may take a minute as it fetches data from TMDB)

4. Explore your movie analytics!

## Project Structure

```
cinemetric/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   └── dashboard/
│   │       ├── GenreChart.jsx
│   │       ├── TimeCapsule.jsx
│   │       ├── DirectorSpotlight.jsx
│   │       └── VisualGallery.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── index.js
│   ├── rssParser.js
│   └── tmdbEnricher.js
├── package.json
└── vite.config.js
```

## License

MIT
