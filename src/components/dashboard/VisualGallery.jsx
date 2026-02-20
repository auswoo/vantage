import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'

const VisualGallery = ({ data }) => {
  const scrollRef = useRef(null)
  const movies = data?.movies ?? []
  const recentMovies = movies.slice(0, 50)

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += e.deltaY
      }
    }
    const container = scrollRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel)
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div className="bg-paper border-2 border-ink p-8 relative flex flex-col group h-full">
      <div className="flex justify-between items-baseline mb-8 border-b border-ink/10 pb-4">
        <div>
          <h2 className="text-4xl font-serif italic tracking-tighter">Chronological Catalog</h2>
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mt-1">Archived Visual History</p>
        </div>
        <div className="font-sans text-[11px] font-black uppercase tracking-widest bg-ink text-paper px-3 py-1">
          {recentMovies.length} ENTRIES
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto pb-6 scrollbar-hide flex-1"
      >
        {recentMovies.map((movie, idx) => (
          <motion.div
            key={idx}
            className="flex-shrink-0 group/poster cursor-crosshair relative"
          >
            <div className="relative w-40 h-60 overflow-hidden bg-ink/5 border border-ink/10 transition-all duration-300 group-hover/poster:border-lb-orange">
              {movie.posterPath ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={movie.title}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover/poster:grayscale-0"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-paper p-4 text-center">
                  <span className="text-[10px] font-black uppercase tracking-tighter leading-none">{movie.title}</span>
                </div>
              )}

              <div className="absolute inset-0 bg-lb-orange/0 group-hover/poster:bg-lb-orange/10 transition-colors pointer-events-none" />
            </div>

            {/* Minimalist vertical title */}
            <div className="mt-3">
              <h4 className="font-sans font-black text-[9px] uppercase tracking-tighter truncate w-40">{movie.title}</h4>
              <p className="font-serif italic text-xs opacity-40 tracking-tight">{movie.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default VisualGallery
