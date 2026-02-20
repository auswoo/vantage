import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const GenreChart = ({ data }) => {
  const genreCounts = {}
  const movies = data?.movies ?? []

  movies.forEach(movie => {
    const raw = movie.genres
    const list = Array.isArray(raw)
      ? raw.map(g => (typeof g === 'string' ? g : g?.name)).filter(Boolean)
      : []
    list.forEach(genre => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1
    })
  })

  const chartData = Object.entries(genreCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  const COLORS = ['#000000', '#FF8000', '#00E054', '#cccccc', '#666666']

  return (
    <div className="bg-paper border-2 border-ink p-8 h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-xs font-sans font-black uppercase tracking-[0.2em] text-ink/30 mb-1 leading-none">Categorical Classification</h3>
        <h2 className="text-4xl font-serif italic tracking-tighter">Genre Spectrum</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {chartData.length > 0 ? (
          <div className="space-y-8">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="95%"
                    paddingAngle={0}
                    dataKey="value"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        className="outline-none"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-ink text-paper p-3 border-none rounded-none shadow-2xl">
                            <p className="font-sans font-black text-[10px] uppercase tracking-widest mb-1">{payload[0].name}</p>
                            <p className="font-serif italic text-xl">{payload[0].value} Cataloged Films</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {chartData.map((item, idx) => (
                <div key={item.name} className="flex justify-between items-center border-b border-ink/5 pb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 block"
                      style={{ backgroundColor: COLORS[idx] }}
                    />
                    <span className="font-sans text-[11px] font-black uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="font-serif italic text-lg opacity-40">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12 text-ink/10 text-center">
            <p className="font-serif italic text-xl">Classification Pending.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GenreChart
