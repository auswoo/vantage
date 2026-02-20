import { motion } from 'framer-motion'

const DirectorSpotlight = ({ data }) => {
  const directorCounts = {}
  const movies = data?.movies ?? []

  movies.forEach(movie => {
    const director = movie.director
    if (director && typeof director === 'string') {
      if (!directorCounts[director]) {
        directorCounts[director] = {
          name: director,
          count: 0,
          movies: [],
        }
      }
      directorCounts[director].count++
      directorCounts[director].movies.push(movie)
    }
  })

  const topDirectors = Object.values(directorCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)

  return (
    <div className="bg-paper border-2 border-ink p-8 h-full flex flex-col">
      <div className="mb-8 flex justify-between items-end border-b border-ink pb-4">
        <div>
          <h3 className="text-xs font-sans font-black uppercase tracking-[0.2em] text-ink/30 mb-1 leading-none">Auteur Prevalence</h3>
          <h2 className="text-4xl font-serif italic tracking-tighter">Director Registry</h2>
        </div>
        <div className="font-sans text-[9px] font-black italic opacity-20">TOP CONTRIBUTORS</div>
      </div>

      {topDirectors.length > 0 ? (
        <div className="space-y-8">
          {topDirectors.map((director, idx) => (
            <div
              key={director.name}
              className="group"
            >
              <div className="flex justify-between items-baseline mb-4">
                <div className="flex flex-col">
                  <h3 className="text-3xl font-serif font-bold tracking-tighter group-hover:text-lb-orange transition-colors">
                    {director.name}
                  </h3>
                  <p className="font-sans text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-1">
                    {director.count} Archive {director.count === 1 ? 'Entry' : 'Entries'}
                  </p>
                </div>
                <div className="font-serif italic text-2xl text-ink/10">0{idx + 1}</div>
              </div>

              <div className="flex gap-2">
                {director.movies.slice(0, 6).map((movie, movieIdx) => (
                  movie.posterPath && (
                    <div
                      key={movieIdx}
                      className="w-12 h-16 bg-paper border border-ink/5"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w185${movie.posterPath}`}
                        alt={movie.title}
                        className="w-full h-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                      />
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 py-12 text-ink/10 text-center">
          <p className="font-serif italic text-xl italic">Auteur Data Pending.</p>
        </div>
      )}
    </div>
  )
}

export default DirectorSpotlight
