import { motion } from 'framer-motion'

const CountryChart = ({ data }) => {
    const movies = data?.movies ?? []

    const countryCounts = {}
    movies.forEach(movie => {
        const countries = movie.countries || []
        countries.forEach(country => {
            countryCounts[country] = (countryCounts[country] || 0) + 1
        })
    })

    const topCountries = Object.entries(countryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)

    return (
        <div className="bg-paper border-2 border-ink p-8 h-full flex flex-col">
            <div className="mb-8">
                <h3 className="text-xs font-sans font-black uppercase tracking-[0.2em] text-ink/30 mb-1 leading-none">Geographic Audit</h3>
                <h2 className="text-4xl font-serif italic tracking-tighter">Origin Index</h2>
            </div>

            <div className="flex-1 space-y-6">
                {topCountries.length > 0 ? (
                    topCountries.map(([name, count], idx) => (
                        <div key={name} className="space-y-3 pb-4 border-b border-ink/5">
                            <div className="flex justify-between items-baseline">
                                <span className="font-sans font-black text-[11px] uppercase tracking-widest">{name}</span>
                                <span className="font-serif italic text-lg opacity-40">{count}</span>
                            </div>
                            <div className="h-4 w-full bg-ink/[0.03] overflow-hidden">
                                <motion.div
                                    className="h-full bg-lb-green"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(count / topCountries[0][1]) * 100}%` }}
                                    transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full text-ink/10 text-center">
                        <p className="font-serif italic text-xl">Geographic Data Missing.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CountryChart
