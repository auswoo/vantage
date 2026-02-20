import { motion } from 'framer-motion'

const DataScanner = () => {
    return (
        <div className="absolute inset-x-0 h-px pointer-events-none z-10 overflow-hidden">
            <motion.div
                className="w-full h-full bg-lb-green shadow-[0_0_10px_#00E054]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    opacity: 0.4
                }}
            />
        </div>
    )
}

export default DataScanner
