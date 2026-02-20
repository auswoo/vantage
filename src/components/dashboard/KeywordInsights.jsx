import { useMemo } from 'react'

const KeywordInsights = ({ data }) => {
    const movies = data?.movies ?? []

    const topKeywords = useMemo(() => {
        const counts = {}
        movies.forEach(movie => {
            const keywords = movie.keywords || []
            keywords.forEach(k => {
                counts[k] = (counts[k] || 0) + 1
            })
        })
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 15)
    }, [movies])

    return (
        <div className="bg-paper border-2 border-ink p-8 h-full flex flex-col">
            <div className="mb-8">
                <h3 className="text-xs font-sans font-black uppercase tracking-[0.2em] text-ink/30 mb-1 leading-none">Thematic Analysis</h3>
                <h2 className="text-4xl font-serif italic tracking-tighter">Narrative Focus</h2>
            </div>

            <div className="flex flex-wrap gap-2 flex-1 content-start">
                {topKeywords.length > 0 ? (
                    topKeywords.map(([word, count]) => (
                        <div
                            key={word}
                            className="px-4 py-2 bg-ink text-paper border border-ink text-[10px] font-black uppercase tracking-widest hover:bg-lb-orange hover:text-ink transition-all cursor-crosshair"
                        >
                            {word} <span className="opacity-40 ml-2">/ {count}</span>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-ink/10 text-center">
                        <p className="font-serif italic text-xl">Semantic Clusters Empty.</p>
                    </div>
                )}
            </div>

            <div className="mt-8 pt-4 border-t border-ink/5">
                <p className="font-sans text-[9px] font-bold uppercase tracking-widest opacity-20">Extracted via TMDB metadata sequencing.</p>
            </div>
        </div>
    )
}

export default KeywordInsights
