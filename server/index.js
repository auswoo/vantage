import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'
import { parseRSS } from './rssParser.js'
import { enrichWithTMDB } from './tmdbEnricher.js'

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env file from the project root
const envPath = join(__dirname, '..', '.env')
const result = dotenv.config({ path: envPath })

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.post('/api/parse-rss', async (req, res) => {
  try {
    let { rssUrl } = req.body

    if (!rssUrl) {
      return res.status(400).json({ error: 'RSS URL or username is required' })
    }

    // Clean and validate the input
    rssUrl = rssUrl.trim()

    // Robust URL construction
    if (rssUrl.includes('letterboxd.com') && rssUrl.endsWith('/rss/')) {
      // It's already a valid RSS URL, just ensure https
      if (!rssUrl.startsWith('http')) {
        rssUrl = 'https://' + rssUrl;
      }
    } else if (rssUrl.includes('letterboxd.com')) {
      // It's a profile URL, extract the username
      let urlToParse = rssUrl.startsWith('http') ? rssUrl : 'https://' + rssUrl;
      try {
        const urlObj = new URL(urlToParse);
        const pathParts = urlObj.pathname.split('/').filter(Boolean);
        if (pathParts.length > 0) {
          const username = pathParts[0];
          rssUrl = `https://letterboxd.com/${username}/rss/`;
        } else {
          return res.status(400).json({ error: 'Could not find username in URL' })
        }
      } catch (e) {
        return res.status(400).json({ error: 'Invalid Letterboxd URL format' })
      }
    } else {
      // It's just a plain username
      const username = rssUrl.replace(/^\/+|\/+$/g, '').trim()
      if (!username) {
        return res.status(400).json({ error: 'Invalid username' })
      }
      rssUrl = `https://letterboxd.com/${encodeURIComponent(username)}/rss/`
    }

    // Validate URL format
    try {
      new URL(rssUrl)
    } catch (e) {
      return res.status(400).json({ error: 'Invalid URL format', message: e.message })
    }

    console.log('Fetching RSS from:', rssUrl)

    // Parse RSS feed
    const rssData = await parseRSS(rssUrl)

    console.log(`Parsed ${rssData.movies.length} movies from RSS feed`)

    if (rssData.movies.length === 0) {
      return res.status(400).json({
        error: 'No movies found',
        message: 'No movies found in RSS feed. Make sure your Letterboxd profile is public and has watch history.'
      })
    }

    // Enrich with TMDB data
    // Enrich with TMDB data
    const enrichedData = await enrichWithTMDB(rssData)

    res.json(enrichedData)
  } catch (error) {
    console.error('Error processing RSS feed:', error)
    res.status(500).json({
      error: 'Failed to process RSS feed',
      message: error.message
    })
  }
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

export default app;
