# Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- A TMDB API key (free at https://www.themoviedb.org/settings/api)
- Your Letterboxd RSS URL (found at `https://letterboxd.com/yourusername/rss/`)

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy `.env.example` to `.env`
   - Add your TMDB API key:
     ```
     TMDB_API_KEY=your_api_key_here
     ```

## Running the Application

You need to run two servers simultaneously:

### Terminal 1 - Backend Server
```bash
npm run server
```
This starts the Express server on `http://localhost:3001`

### Terminal 2 - Frontend Server
```bash
npm run dev
```
This starts the Vite dev server on `http://localhost:3000`

## Using CineMetric

1. Open `http://localhost:3000` in your browser
2. Enter your Letterboxd RSS URL in the input field
3. Click "Generate Dashboard"
4. Wait for the analysis to complete (this may take 1-2 minutes as it fetches data from TMDB)
5. Explore your movie analytics!

## Troubleshooting

### "Failed to parse RSS feed"
- Verify your RSS URL is correct
- Make sure the URL is accessible (try opening it in a browser)
- Check that your Letterboxd profile is public

### "No movies found"
- Ensure your RSS feed contains recent watch history
- Check that your Letterboxd account has logged films

### TMDB API Errors
- Verify your API key is correct in `.env`
- Check that you haven't exceeded TMDB rate limits (wait a few minutes)
- Ensure your API key has proper permissions

### Server Connection Issues
- Make sure both servers are running
- Check that ports 3000 and 3001 are not in use
- Verify the proxy configuration in `vite.config.js`

## Production Build

To build for production:

```bash
npm run build
```

The built files will be in the `dist` directory.
