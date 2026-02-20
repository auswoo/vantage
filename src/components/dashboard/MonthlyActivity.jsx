import { useMemo } from 'react'
import { BarChart, Bar, ResponsiveContainer, Tooltip, Cell } from 'recharts'

const MonthlyActivity = ({ data }) => {
    const movies = data?.movies ?? []

    const monthlyData = useMemo(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const counts = months.map(m => ({ month: m, count: 0 }))

        movies.forEach(movie => {
            if (movie.watchedDate) {
                const date = new Date(movie.watchedDate)
                if (!isNaN(date.getTime())) {
                    const monthIdx = date.getMonth()
                    counts[monthIdx].count++
                }
            }
        })
        return counts
    }, [movies])

    const maxVal = Math.max(...monthlyData.map(d => d.count))

    return (
        <div className="bg-paper border-2 border-ink p-8 h-full flex flex-col">
            <div className="mb-8">
                <h3 className="text-xs font-sans font-black uppercase tracking-[0.2em] text-ink/30 mb-1 leading-none">Temporal Distribution</h3>
                <h2 className="text-4xl font-serif italic tracking-tighter">Watch Calendar</h2>
            </div>

            <div className="flex-1 h-[200px]">
                {maxVal > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-ink text-paper p-3 shadow-2xl">
                                                <p className="font-sans font-black text-[10px] uppercase tracking-widest mb-1">{payload[0].payload.month}</p>
                                                <p className="font-serif italic text-xl">{payload[0].value} Entries</p>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Bar dataKey="count" radius={0}>
                                {monthlyData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.count === maxVal ? '#00e054' : '#000000'}
                                        fillOpacity={entry.count === 0 ? 0.05 : 1}
                                        className="transition-all duration-300"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-ink/10 text-center">
                        <p className="font-serif italic text-xl">Temporal Data Unavailable.</p>
                    </div>
                )}
            </div>

            <div className="mt-6 flex justify-between font-sans text-[10px] font-black uppercase tracking-[0.3em] opacity-40 border-t border-ink/10 pt-4">
                <span>JAN</span>
                <span>JUN</span>
                <span>DEC</span>
            </div>
        </div>
    )
}

export default MonthlyActivity
