import { motion } from 'framer-motion'
import { useEffect } from 'react'

const LoadingOverlay = ({ message = 'Synthesizing...' }) => {
  useEffect(() => {
    // Lock scroll
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    // Cleanup - restore scroll
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 bg-paper z-[100] flex flex-col items-center justify-center p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-md w-full text-center">
        <div className="mb-12 relative h-1 bg-ink/5 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-ink"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="space-y-4">
          <motion.p
            className="text-5xl font-serif italic tracking-tighter text-ink"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message}
          </motion.p>
          <motion.p
            className="font-sans font-black uppercase tracking-[0.4em] text-[10px] text-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Archive Protocol in Progress
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingOverlay
