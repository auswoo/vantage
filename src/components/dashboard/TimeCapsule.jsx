import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'

const TimeCapsule = ({ data }) => {
  const [displayMinutes, setDisplayMinutes] = useState(0)
  const movies = data?.movies ?? []

  const totalMinutes = useMemo(() =>
    movies.reduce((sum, movie) => sum + (Number(movie.runtime) || 0), 0)
    , [movies])

  const chartData = useMemo(() => {
    const yearCounts = {}
    movies.forEach(movie => {
      const year = movie.year || 'Unknown'
      yearCounts[year] = (yearCounts[year] || 0) + 1
    })
    return Object.entries(yearCounts)
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => a.year - b.year)
      .slice(-15)
  }, [movies])

  useEffect(() => {
    const duration = 1000
    const steps = 60
    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      setDisplayMinutes(Math.floor(totalMinutes * (currentStep / steps)))
      if (currentStep >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [totalMinutes])

  return (
    <div className="bg-paper p-8 h-full flex flex-col relative group">
      <div className="mb-8 flex justify-between items-baseline border-b border-ink pb-4">
        <div>
          <h3 className="text-xs font-sans font-black uppercase tracking-[0.2em] text-ink/30 mb-1 leading-none">Historical Analysis</h3>
          <h2 className="text-4xl font-serif italic tracking-tighter">Era Distribution</h2>
        </div>
        <div className="font-serif italic text-xl opacity-30">{(totalMinutes / 60).toFixed(0)} Hours</div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div className="h-[200px] w-full mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-ink text-paper p-3 shadow-2xl">
                        <p className="font-sans font-black text-[10px] uppercase tracking-widest mb-1">{payload[0].payload.year}</p>
                        <p className="font-serif italic text-xl">{payload[0].value} Films Released</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="stepAfter"
                dataKey="count"
                stroke="#000000"
                strokeWidth={1}
                fill="#000000"
                fillOpacity={0.05}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-12 pt-8 border-t border-ink/5">
          <div className="space-y-4">
            <p className="font-sans text-[10px] font-black uppercase tracking-[0.2em] opacity-30">CUMULATIVE DURATION</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-serif font-bold italic tracking-tighter">{Math.floor(displayMinutes / 60)}</span>
              <span className="font-sans font-black text-[10px] uppercase opacity-40">HOURS</span>
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-sans text-[10px] font-black uppercase tracking-[0.2em] opacity-30">TOTAL DATA POINTS</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-serif font-bold tracking-tighter text-lb-orange">{movies.length}</span>
              <span className="font-sans font-black text-[10px] uppercase opacity-40">ENTRIES</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeCapsule
