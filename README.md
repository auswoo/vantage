# Vantage 🎬

Vantage is a high-end, brutalist movie analytics manifest that transforms your Letterboxd history into a clinical, data-driven synthesis. It decodes your cinematic diet through metadata sequencing and visualizes it with a stark, editorial aesthetic.

## Features

- **Paper Mode Aesthetic**: A stark, archival interface inspired by clinical data registries and high-end editorial design.
- **DataScanner Visualizer**: Active Letterboxd-green pixel sweeps that signal background processing and metadata synchronization.
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
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx     # Archival Landing Protocol
│   │   ├── Dashboard.jsx       # The Analytics Manifest
│   │   ├── DataScanner.jsx     # Live Metadata Visualizer
│   │   ├── FilmSlate.jsx       # Intro Animation
│   │   └── dashboard/          # Specialized Analysis Modules
├── server/
│   ├── index.js                # Core API Junction
│   ├── rssParser.js            # RSS XML Decoding
│   └── tmdbEnricher.js         # TMDB Metadata Sequencing
└── package.json
```

## License
MIT
