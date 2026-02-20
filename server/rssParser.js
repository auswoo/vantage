import axios from 'axios'
import xml2js from 'xml2js'

export async function parseRSS(rssUrl) {
  try {
    // Validate URL
    if (!rssUrl || typeof rssUrl !== 'string') {
      throw new Error('Invalid RSS URL provided')
    }

    // Protocol Hardening: Force https if missing
    let finalUrl = rssUrl.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    console.log('Fetching RSS from URL:', finalUrl)

    // Fetch RSS feed
    const response = await axios.get(finalUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      timeout: 8000, // 8 second timeout buffer for Vercel
      validateStatus: function (status) {
        return status >= 200 && status < 300
      },
    })

    console.log('AXIOS_STATUS:', response.status);
    console.log('HEADERS:', response.headers);
    console.log('TYPE_OF_DATA:', typeof response.data);

    if (typeof response.data === 'string') {
      console.log(`Response preview (500 chars):\n${response.data.substring(0, 500)}`);
    } else {
      console.log('Response preview: data is not a string');
    }

    console.log('RSS feed fetched, length:', response.data?.length)

    // Parse XML with proper namespace handling
    const parser = new xml2js.Parser({
      explicitArray: false,
      mergeAttrs: true,
      explicitCharkey: false,
      ignoreAttrs: false,
      xmlns: false,
      tagNameProcessors: [xml2js.processors.stripPrefix],
    })

    const result = await parser.parseStringPromise(response.data)

    console.log('RSS parsed. Channel:', result.rss?.channel?.title)
    console.log('Sample item structure:', JSON.stringify(result.rss?.channel?.item?.[0] || result.rss?.channel?.item, null, 2))

    // Extract items from RSS feed - handle different XML structures
    let items = result.rss?.channel?.item || []

    // Handle both array and single item cases
    const itemsArray = Array.isArray(items) ? items : (items ? [items] : [])

    console.log(`Found ${itemsArray.length} items in RSS feed`)

    // Parse each item - Letterboxd uses namespaced elements
    const movies = itemsArray
      .map((item, idx) => {
        if (!item) return null

        // Try different ways to access Letterboxd namespaced elements
        // After stripPrefix, namespaces might be removed or kept
        let filmTitle = item['letterboxd:filmTitle'] ||
          item['filmTitle'] ||
          item['letterboxd_filmTitle'] ||
          item.filmTitle ||
          item['film-title'] ||
          item['film_title']

        let watchedDate = item['letterboxd:watchedDate'] ||
          item['watchedDate'] ||
          item['letterboxd_watchedDate'] ||
          item.watchedDate ||
          item['watched-date'] ||
          item['watched_date'] ||
          item['pubDate'] ||
          item['pubdate']

        let filmYear = item['letterboxd:filmYear'] ||
          item['filmYear'] ||
          item['letterboxd_filmYear'] ||
          item.filmYear ||
          item['film-year'] ||
          item['film_year']

        let movieTmdbId = item['tmdb:movieId'] ||
          item['movieId'] ||
          item['tmdb_movieId'] ||
          item.movieId

        // Handle different XML structures (string, object with _ property, etc.)
        const extractValue = (val) => {
          if (!val) return null
          if (Array.isArray(val)) return val.length > 0 ? extractValue(val[0]) : null
          if (typeof val === 'string') return val.trim()
          if (typeof val === 'object') {
            // Try various ways to extract text from XML objects
            return val._ || val.$?.text || val.text || val['#text'] || val['$text'] ||
              (Object.keys(val).length === 1 ? Object.values(val)[0] : null)
          }
          return String(val).trim()
        }

        const title = extractValue(filmTitle)
        const date = extractValue(watchedDate)
        const year = extractValue(filmYear)
        const tmdbId = extractValue(movieTmdbId)

        if (!title) {
          return null
        }

        return {
          title,
          watchedDate: date,
          year: year ? parseInt(year) : null,
          tmdbId: tmdbId ? parseInt(tmdbId) : null,
        }
      })
      .filter(movie => movie && movie.title) // Filter out null/empty titles
      .slice(0, 50) // Limit to last 50 films

    console.log(`Successfully parsed ${movies.length} movies`)

    return {
      movies,
      totalCount: movies.length,
    }
  } catch (error) {
    console.error('Error parsing RSS:', error)
    console.error('Error details:', error.response?.data || error.message)
    throw new Error(`Failed to parse RSS feed: ${error.message}`)
  }
}
