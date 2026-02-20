import { motion } from 'framer-motion'

const Marquee = ({ text, color = "text-ink/5" }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center">
            <motion.div
                className={`whitespace-nowrap text-[15rem] font-serif font-black italic uppercase italic ${color}`}
                animate={{ x: [0, -1000] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {text} {text} {text} {text}
            </motion.div>
        </div>
    )
}

const BrutalStats = ({ data }) => {
    const movies = data?.movies ?? []

    // Calculate Volume
    const totalMinutes = movies.reduce((sum, movie) => sum + (Number(movie.runtime) || 0), 0)

    // Calculate Dominance (Top Genre %)
    const genreCounts = {}
    movies.forEach(m => {
        const genres = Array.isArray(m.genres) ? m.genres : []
        genres.forEach(g => {
            const name = typeof g === 'string' ? g : g?.name
            if (name) genreCounts[name] = (genreCounts[name] || 0) + 1
        })
    })
    const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])
    const topGenre = sortedGenres[0]?.[0] || "N/A"
    const topGenreCount = sortedGenres[0]?.[1] || 0
    const dominancePct = movies.length > 0 ? Math.round((topGenreCount / movies.length) * 100) : 0

    // Calculate Globalist
    const uniqueCountries = new Set()
    movies.forEach(m => {
        const countries = m.countries || []
        countries.forEach(c => uniqueCountries.add(c))
    })

    return (
        <div className="w-full space-y-0 my-16">
            {/* Volume Block */}
            <section className="relative w-full border-y-[6px] border-ink bg-paper py-20 px-6 lg:px-12 overflow-hidden">
                <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col items-center lg:items-start">
                    <span className="font-sans font-black text-xs tracking-[0.4em] mb-6 bg-lb-orange px-3 py-1 text-ink uppercase">Subject: Volume Audit</span>
                    <h2 className="text-7xl md:text-[10rem] font-serif font-black tracking-tighter leading-none text-ink text-center lg:text-left">
                        {totalMinutes.toLocaleString()} <span className="italic font-normal opacity-20 text-[6rem] md:text-[8rem]">Minutes</span>
                    </h2>
                    <p className="font-sans font-black uppercase tracking-widest text-sm mt-8 opacity-40">OF ANALYZED CINEMATIC CONSUMPTION</p>
                </div>
            </section>

            {/* Dominance Block with Marquee */}
            <section className="relative w-full border-b-[6px] border-ink bg-lb-orange py-24 px-6 lg:px-12 overflow-hidden">
                <Marquee text={topGenre} />
                <div className="relative z-10 max-w-[1600px] mx-auto flex justify-between items-center">
                    <div className="w-full">
                        <span className="font-sans font-black text-xs tracking-[0.4em] mb-6 inline-block border-2 border-ink px-3 py-1 text-ink uppercase">Metric: Narrative Dominance</span>
                        <h2 className="text-7xl md:text-[12rem] font-serif font-bold tracking-tighter leading-[0.8] text-ink uppercase">
                            {dominancePct}%
                        </h2>
                        <p className="font-serif italic text-4xl mt-4 text-ink">Is classified as {topGenre}.</p>
                    </div>
                    <div className="hidden lg:block transform rotate-90 origin-right">
                        <span className="font-sans font-black text-[10px] tracking-[1em] opacity-40 uppercase">Statistical Certainty Verified</span>
                    </div>
                </div>
            </section>

            {/* Globalist Block */}
            <section className="relative w-full border-b-[6px] border-ink bg-ink py-20 px-6 lg:px-12 overflow-hidden">
                <div className="relative z-10 max-w-[1600px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="flex-1">
                            <span className="font-sans font-black text-xs tracking-[0.4em] mb-8 inline-block bg-lb-green px-3 py-1 text-ink uppercase">Status: Globalist Profile</span>
                            <h2 className="text-7xl md:text-[10rem] font-serif font-black tracking-tighter leading-none text-paper italic">
                                {uniqueCountries.size}
                            </h2>
                            <p className="font-sans font-black text-2xl tracking-tighter text-paper mt-6 uppercase leading-none">
                                Distinct Borders Crossed
                            </p>
                        </div>
                        <div className="flex-1 border-l-2 border-paper/10 pl-8 pb-4">
                            <p className="font-sans text-paper/40 text-sm font-medium leading-relaxed max-w-sm">
                                Your archive demonstrates a geographic reach covering {uniqueCountries.size} unique production territories. This signature suggests a {uniqueCountries.size > 10 ? 'highly diversified' : 'regionally focused'} visual diet.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BrutalStats
