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
console.log('📁 Looking for .env at:', envPath)
console.log('📄 File exists:', existsSync(envPath))

const result = dotenv.config({ path: envPath })

if (result.error) {
  console.error('❌ Error loading .env file:', result.error)
} else {
  console.log('✅ .env file loaded successfully')
}

console.log('🔑 TMDB API Key loaded:', process.env.TMDB_API_KEY ? `Yes (${process.env.TMDB_API_KEY.substring(0, 8)}...)` : 'No')

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

    // If it's just a username (no http/https), construct the RSS URL
    if (!rssUrl.startsWith('http://') && !rssUrl.startsWith('https://')) {
      // Remove any leading/trailing slashes and spaces
      const username = rssUrl.replace(/^\/+|\/+$/g, '').trim()
      if (!username) {
        return res.status(400).json({ error: 'Invalid username or URL' })
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
    console.log('Enriching with TMDB data...')
    const enrichedData = await enrichWithTMDB(rssData)

    console.log(`Enrichment complete. ${enrichedData.movies.length} movies processed.`)

    if (enrichedData.movies.length > 0) {
      const sample = enrichedData.movies[0]
      console.log('Sample enriched movie keys:', Object.keys(sample))
      console.log('Sample analytics - Countries:', sample.countries, 'Keywords:', sample.keywords?.slice(0, 3), 'WatchDate:', sample.watchedDate)
    }

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
