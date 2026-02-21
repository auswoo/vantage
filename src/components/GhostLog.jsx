import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOG_MESSAGES = [
    "[SYS_INIT] : VANTAGE_BOOT",
    "[DATA_INFRA] : CONNECTING_TO_RSS",
    "[META_v2] : TMDB_ENRICHMENT_PASS",
    "[UI_GRID] : RECALIBRATING_WARP",
    "[AUTH] : VALIDATING_TOKEN",
    "[STREAM] : DOWNLOADING_MANIFEST",
    "[SYS] : CHECKING_INTEGRITY",
    "[MEM] : ALLOCATING_VRAM",
    "[NET] : SIGNAL_LATENCY_12ms",
    "[RENDER] : INITIATING_WEBGL",
    "[RSS] : PARSING_XML_NODES",
    "[SEC] : ENFORCING_PROTOCOL"
];

export default function GhostLog() {
    const [logs, setLogs] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Initial boot sequence
        const bootSequence = [
            { id: Date.now(), text: "[SYS_INIT] : SEQUENCE_START" }
        ];
        setLogs(bootSequence);

        const interval = setInterval(() => {
            const msg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
            setLogs(prev => {
                const newLogs = [...prev, { id: Date.now(), text: msg }];
                if (newLogs.length > 20) {
                    return newLogs.slice(newLogs.length - 20);
                }
                return newLogs;
            });
        }, 2200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Emulate hover without blocking click events (pointer-events: none)
        const handleMouseMove = (e) => {
            if (e.clientX > window.innerWidth - 180) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed top-0 right-0 h-full w-[180px] pt-8 pr-6 pb-20 flex flex-col justify-end pointer-events-none z-50 overflow-hidden">
            <div
                className="flex flex-col items-end gap-[6px] w-full text-right transition-opacity duration-300"
                style={{ opacity: isHovered ? 0.8 : 0.3 }}
            >
                <AnimatePresence initial={false}>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ color: '#FF4F00', opacity: 0, x: 20 }}
                            animate={{ color: '#A0A0A0', opacity: 1, x: 0 }}
                            transition={{
                                color: { duration: 1.5, ease: "easeOut", delay: 0.1 },
                                opacity: { duration: 0.3 },
                                x: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                            }}
                            className="font-mono text-[9px] uppercase tracking-widest w-full"
                        >
                            {log.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
