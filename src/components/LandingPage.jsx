import { motion } from 'framer-motion'
import { useState } from 'react'
import DataScanner from './DataScanner'

const LandingPage = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (url) onSubmit(url)
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center px-6 lg:px-24 py-20 selection:bg-lb-orange selection:text-ink">
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex justify-between items-baseline mb-32 border-b border-ink pb-4 relative overflow-hidden"
      >
        <DataScanner />
        <span className="font-sans font-black uppercase tracking-[0.4em] text-[10px]">SCHEMA: VANTAGE_PROD</span>
        <span className="font-sans font-bold uppercase tracking-widest text-[10px]">BUILD_ENV: PROD.VERCEL</span>
      </motion.div>

      <div className="max-w-6xl w-full">
        {/* FILMSET Masked Cinematic Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 flex flex-col items-center justify-center w-full"
        >
          <h1
            className="w-full text-center font-sans font-black uppercase leading-none"
            style={{
              fontSize: '18vw',
              letterSpacing: '-0.05em',
              background: `url('https://media.giphy.com/media/l41K3o5TzvmhZwd4A/giphy.gif') center/cover, #111`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: '#111',
              filter: url.length > 0 ? 'brightness(1.5) contrast(1.2)' : 'brightness(1) contrast(1)',
              transition: 'filter 0.5s ease',
            }}
          >
            VANTAGE
          </h1>

          {/* Data Sub-Header (Clinical Status Line) */}
          <div className="font-mono text-xs opacity-60 mt-4 tracking-widest text-center mb-16">
            INDEX_REF: {url || '[USER_INPUT]'} // BATCH_SZ: 50 // ENRICHMENT: TMDB_v2.1
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
            <p className="flex-1 font-sans text-xl lg:text-2xl font-bold tracking-tight leading-snug">
              VANTAGE [vän-tij] — A singular coordinate for cinematic analysis. Synthesized via Letterboxd metadata. Decoded for the modern cinephile.
            </p>
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter Username"
                  className="stark-input"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !url}
                  className="stamp-button w-full"
                >
                  {loading ? "Synthesizing Archive..." : "Initialize Analysis"}
                </button>
              </form>
              <p className="mt-4 font-sans text-[10px] font-bold uppercase tracking-widest opacity-40">
                Authorized Use Only. Metadata processing requires public profile status.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Manifesto Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-ink pt-12 mt-32 h-auto opacity-100 visible">
          <div className="space-y-4">
            <h3 className="text-3xl font-serif italic">I. Geographic</h3>
            <p className="font-sans text-sm font-medium leading-relaxed">Mapping the origin of every frame. A global overview of your visual diet, categorized by production borders.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-serif italic">II. Temporal</h3>
            <p className="font-sans text-sm font-medium leading-relaxed">Historical trends and decade distributions. Understanding the era that defined your taste through longitudinal data.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-serif italic">III. Semantic</h3>
            <p className="font-sans text-sm font-medium leading-relaxed">Clustering motifs and keywords. Uncovering the hidden themes that connect your disparate viewings into a singular narrative.</p>
          </div>
        </div>
      </div>

      {/* Background grain simulation */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] grayscale bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  )
}

export default LandingPage
