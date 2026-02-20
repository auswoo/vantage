import { motion } from 'framer-motion'
import GenreChart from './dashboard/GenreChart'
import TimeCapsule from './dashboard/TimeCapsule'
import DirectorSpotlight from './dashboard/DirectorSpotlight'
import VisualGallery from './dashboard/VisualGallery'
import CountryChart from './dashboard/CountryChart'
import MonthlyActivity from './dashboard/MonthlyActivity'
import KeywordInsights from './dashboard/KeywordInsights'
import BrutalStats from './dashboard/BrutalStats'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
}

const Dashboard = ({ data, onReset }) => {
  if (!data || !data.movies || data.movies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-paper">
        <div className="border-2 border-ink p-16 max-w-2xl text-center">
          <h2 className="text-6xl font-serif italic mb-6 tracking-tighter">Archive Empty.</h2>
          <p className="font-sans font-bold text-ink/40 mb-12 uppercase tracking-widest text-sm">
            The metadata sequence could not be established. Ensure host profile is set to public.
          </p>
          <button
            onClick={onReset}
            className="stamp-button"
          >
            Re-Initialize Buffer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper py-12 px-6 lg:px-12 selection:bg-lb-orange selection:text-ink">
      <div className="max-w-[1600px] mx-auto">
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full border-b-2 border-ink pb-8 mb-16 flex flex-col md:flex-row justify-between items-baseline gap-8"
        >
          <div className="space-y-2">
            <h1 className="text-7xl lg:text-9xl font-serif font-black tracking-[calc(-0.04em)] leading-[0.8] mb-4">
              Metadata <span className="italic font-normal">Synthesis.</span>
            </h1>
            <div className="flex gap-4 items-center">
              <span className="font-sans font-black uppercase text-[10px] tracking-[0.3em] bg-lb-green px-2 py-0.5">Verified Archive</span>
              <span className="font-sans font-bold uppercase text-[10px] tracking-[0.2em] opacity-40">Compiled from {data.movies.length} data points</span>
            </div>
          </div>
          <button
            onClick={onReset}
            className="font-sans font-black uppercase tracking-widest text-[10px] border-2 border-ink px-6 py-3 hover:bg-lb-orange transition-all"
          >
            Purge & Re-Initialize
          </button>
        </motion.div>

        {/* Bento Grid: Editorial Manifesto Style */}
        <motion.div
          className="grid grid-cols-12 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Visual Gallery - Very Wide */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8">
            <VisualGallery data={data} />
          </motion.div>

          {/* Genre Chart */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-4">
            <GenreChart data={data} />
          </motion.div>

          {/* INSERT BRUTAL STATS HERO BLOCKS */}
          <motion.div variants={itemVariants} className="col-span-12 my-12">
            <BrutalStats data={data} />
          </motion.div>

          <div className="col-span-12 editorial-divider !my-4" />

          {/* Monthly Activity */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-4">
            <MonthlyActivity data={data} />
          </motion.div>

          {/* Country Chart */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-4">
            <CountryChart data={data} />
          </motion.div>

          {/* Keyword Insights */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-4">
            <KeywordInsights data={data} />
          </motion.div>

          <div className="col-span-12 editorial-divider !my-4" />

          {/* Time Capsule */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-5 border-r border-ink/10 pr-8">
            <TimeCapsule data={data} />
          </motion.div>

          {/* Director Spotlight */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-7">
            <DirectorSpotlight data={data} />
          </motion.div>
        </motion.div>

        <footer className="mt-32 pt-12 border-t border-ink flex justify-between items-center opacity-30">
          <span className="font-sans font-black uppercase tracking-[0.4em] text-[10px]">Confidential Cinematic Intel</span>
          <span className="font-serif italic text-sm">Fin.</span>
        </footer>
      </div>
    </div>
  )
}

export default Dashboard
