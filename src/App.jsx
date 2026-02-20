import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import LoadingOverlay from './components/LoadingOverlay'

function App() {
  const [rssUrl, setRssUrl] = useState(null)
  const [movieData, setMovieData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleRssSubmit = async (url) => {
    setLoading(true)
    setError(null)
    setRssUrl(url)

    try {
      const response = await fetch('/api/parse-rss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rssUrl: url }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to parse RSS feed')
      }

      const data = await response.json()

      console.log('Received data:', data)
      console.log('Movies count:', data.movies?.length)

      if (!data.movies || data.movies.length === 0) {
        throw new Error('No movies found in RSS feed. Make sure your Letterboxd profile is public and has watch history.')
      }

      setMovieData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message || 'Failed to load data. Please check your RSS URL and try again.')
      setRssUrl(null)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setRssUrl(null)
    setMovieData(null)
    setError(null)
  }

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingOverlay message="Analyzing your watch history..." />}
      </AnimatePresence>

      {error && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[60] bg-ink text-paper p-6 max-w-lg shadow-2xl">
          <div className="flex items-start gap-4">
            <span className="text-xl">⚠️</span>
            <div className="flex-1">
              <p className="font-sans font-black uppercase text-[10px] tracking-widest mb-1 opacity-50">Archive Protocol Error</p>
              <p className="font-serif italic text-lg leading-tight">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-4 font-sans font-black uppercase tracking-widest text-[10px] border-b border-paper hover:border-lb-orange hover:text-lb-orange transition-all"
              >
                Dismiss Warning
              </button>
            </div>
          </div>
        </div>
      )}

      {!rssUrl || !movieData ? (
        <LandingPage onSubmit={handleRssSubmit} loading={loading} />
      ) : (
        <Dashboard data={movieData} onReset={handleReset} />
      )}
    </>
  )
}

export default App
