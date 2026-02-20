import axios from 'axios'

// Support both VITE_ prefix (for frontend) and regular env vars (for backend)
function getTMDBApiKey() {
  return process.env.TMDB_API_KEY || process.env.VITE_TMDB_API_KEY
}

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

async function searchMovie(title, year = null) {
  const apiKey = getTMDBApiKey()
  if (!apiKey) throw new Error('TMDB API key not configured')

  try {
    const searchUrl = `${TMDB_BASE_URL}/search/movie`
    const params = { api_key: apiKey, query: title, language: 'en-US' }
    if (year) params.year = year
    const response = await axios.get(searchUrl, { params })
    return response.data.results?.[0] || null
  } catch (error) {
    console.error(`Error searching movie "${title}":`, error.message)
    return null
  }
}

async function getMovieDetails(movieId) {
  const apiKey = getTMDBApiKey()
  if (!apiKey) throw new Error('TMDB API key not configured')

  try {
    const detailsUrl = `${TMDB_BASE_URL}/movie/${movieId}`
    const params = {
      api_key: apiKey,
      language: 'en-US',
      append_to_response: 'credits,keywords',
    }
    const response = await axios.get(detailsUrl, { params })
    return response.data
  } catch (error) {
    console.error(`Error fetching details for ID ${movieId}:`, error.message)
    return null
  }
}

export async function enrichWithTMDB(rssData) {
  const apiKey = getTMDBApiKey()
  if (!apiKey) return rssData

  const enrichedMovies = []

  for (let i = 0; i < rssData.movies.length; i++) {
    const movie = rssData.movies[i]

    try {
      let details = null
      let movieId = movie.tmdbId

      if (movieId) {
        details = await getMovieDetails(movieId)
      } else {
        const searchResult = await searchMovie(movie.title, movie.year)
        if (searchResult) {
          movieId = searchResult.id
          details = await getMovieDetails(movieId)
        }
      }

      if (details) {
        enrichedMovies.push({
          ...movie,
          tmdbId: details.id,
          posterPath: details.poster_path,
          backdropPath: details.backdrop_path,
          overview: details.overview,
          genres: details.genres?.map(g => g.name) || [],
          runtime: details.runtime || 0,
          director: details.credits?.crew?.find(p => p.job === 'Director')?.name || null,
          releaseDate: details.release_date,
          rating: details.vote_average,
          countries: details.production_countries?.map(c => c.name) || [],
          keywords: details.keywords?.keywords?.map(k => k.name) || [],
          tagline: details.tagline,
        })
      } else {
        // No TMDB matches at all
        enrichedMovies.push({
          ...movie,
          tmdbId: null,
          posterPath: null,
          genres: [],
          runtime: 0,
          director: null,
          countries: [],
          keywords: [],
        })
      }

      if (i < rssData.movies.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 250))
      }
    } catch (error) {
      console.error(`Error enriching "${movie.title}":`, error.message)
      enrichedMovies.push({ ...movie, tmdbId: null, genres: [], runtime: 0 })
    }
  }

  return { ...rssData, movies: enrichedMovies }
}
