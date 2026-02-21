# Vantage 🎬

Vantage is a high-end, brutalist movie analytics manifest that transforms your Letterboxd history into a clinical, data-driven synthesis. It decodes your cinematic diet through metadata sequencing and visualizes it with a stark, editorial aesthetic.

## Features

- **Brutalist Paper Aesthetic**: A stark, archival interface inspired by clinical data registries, featuring high-contrast "ink on paper" design.
- **Cinematic Masked Header**: A massive, clamped typography header featuring responsive film-grain video masking and a realistic CRT scanner glitch effect.
- **GhostLog Data Stream**: A right-aligned, interactive system event log that simulates background processing streams globally across the interface.
- **Brutal Metrics**:
  - **Volume Audit**: Track cumulative minutes of cinematic consumption.
  - **Narrative Dominance**: Identify the genre clusters that rule your archive.
  - **Globalist Profile**: Audit the geographic production borders your viewing habits have crossed.
- **Categorical Classification**: Breakdown of genre spectrums using interactive Recharts modules.
- **Chronological Catalog**: A horizontal visual history of your most recent 50 entries.
- **Auteur Prevalence**: Spotlight your most-watched directors (The Director Registry).

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Recharts
- **Backend**: Node.js, Express.js
- **Data Processing**: Letterboxd RSS Parsing & TMDB Metadata Enrichment
- **Typography**: Instrument Serif, Inter, Public Sans

## Installation

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file in the root directory:
   ```env
   TMDB_API_KEY=your_tmdb_api_key_here
   ```
   *(Get an API key from [TheMovieDB](https://www.themoviedb.org/))*

3. **Initalize Local Servers**:
   ```bash
   # Terminal 1: Backend Protocol
   npm run server

   # Terminal 2: Frontend Instance
   npm run dev
   ```

## Usage

1. Open Vantage at `http://localhost:3000`.
2. Input your Letterboxd **Username** or **RSS URL**.
3. Click `INITIALIZE ANALYSIS` to begin metadata synthesis.
4. Explore the manifest.

## Project Architecture

```
Letterboxd Site/
├── public/                     # Static brutalist `.png` and `.svg` favicons
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx     # Clinical entry protocol
│   │   ├── GhostLog.jsx        # Right-margin system event stream
│   │   ├── ...                 # Recharts and UI Modules
│   ├── App.jsx                 # Core Routing and Interface Shell
│   └── index.css               # Global Tailwind directives and CSS Keyframes
├── server/
│   ├── index.js                # Core Express API Junction
│   ├── rssParser.js            # RSS XML Decoding
│   └── tmdbEnricher.js         # TMDB Metadata Sequencing
├── api/
│   └── index.js                # Vercel Serverless Function Wrapper
├── vercel.json                 # Vercel Deployment Configuration
└── package.json
```

## Vercel Deployment

Vantage is pre-configured for zero-config Serverless deployment on Vercel.
1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add your `TMDB_API_KEY` to the Vercel Environment Variables.
4. Deploy. The configurations in `vercel.json` and `api/index.js` will automatically route backend requests to the Serverless functions.

## License
MIT
