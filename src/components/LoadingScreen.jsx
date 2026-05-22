import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LoadingScreen — Elegant cinematic loading experience
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onComplete?.(), 800);
          }, 400);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient background glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(107, 29, 42, 0.4), transparent 70%)',
              }}
            />
          </div>

          {/* Heart icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 mb-8"
          >
            <motion.svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              className="loading-heart"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#b76e79"
              />
            </motion.svg>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl md:text-3xl font-light tracking-wider mb-2 z-10"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}
          >
            Loading Your Love Story
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm tracking-widest uppercase mb-12 z-10"
            style={{ color: 'var(--rose-gold)', fontFamily: 'var(--font-body)' }}
          >
            Preparing memories...
          </motion.p>

          {/* Progress bar */}
          <div className="relative w-48 h-[2px] bg-white/10 rounded-full overflow-hidden z-10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--burgundy), var(--rose-gold), var(--gold))',
                width: `${Math.min(progress, 100)}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
