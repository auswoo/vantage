import { motion } from 'framer-motion'
import { useEffect } from 'react'

const FilmSlate = ({ onComplete }) => {
    useEffect(() => {
        // Lock scroll
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    return (
        <div className="fixed inset-0 z-[100] flex flex-col pointer-events-none">
            {/* Top Bar (Stick) */}
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: "-100%" }}
                transition={{
                    delay: 0.4,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    type: "spring",
                    stiffness: 200,
                    damping: 25
                }}
                onAnimationComplete={() => onComplete && onComplete()}
                className="flex-1 bg-black relative flex flex-col justify-end overflow-hidden"
            >
                <div className="h-20 w-full slate-zebra border-b-2 border-white/20" />
            </motion.div>

            {/* Center Label Overlay */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.1 }}
                className="absolute inset-0 flex items-center justify-center z-[110]"
            >
                <div className="bg-black px-6 py-2 border border-white/40">
                    <span className="font-mono text-white text-[10px] tracking-[0.5em] font-bold">
                        SCENE: 01 | ROLL: RSS_50
                    </span>
                </div>
            </motion.div>

            {/* Bottom Bar */}
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: "100%" }}
                transition={{
                    delay: 0.4,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    type: "spring",
                    stiffness: 200,
                    damping: 25
                }}
                className="flex-1 bg-black border-t-2 border-white/20"
            />
        </div>
    )
}

export default FilmSlate
