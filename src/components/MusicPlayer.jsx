import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MusicPlayer — Floating romantic music control
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * TO ADD YOUR OWN MUSIC:
 * 1. Place your .mp3 file in the public/ folder
 * 2. Update the MUSIC_SRC constant below
 * 
 * Recommended: Soft romantic piano instrumental
 */

// REPLACE: Path to your romantic instrumental music file
// Use relative path or base path logic
const MUSIC_SRC = './music.mp3';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => setShowTooltip(false), 5000);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasInteracted) {
      setHasInteracted(true);
      setShowTooltip(false);
    }

    if (isPlaying) {
      // Fade out
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          audio.pause();
          audio.volume = 0.3;
          clearInterval(fadeOut);
        }
      }, 50);
      setIsPlaying(false);
    } else {
      audio.volume = 0;
      audio.play().then(() => {
        // Fade in
        const fadeIn = setInterval(() => {
          if (audio.volume < 0.3) {
            audio.volume = Math.min(0.3, audio.volume + 0.03);
          } else {
            clearInterval(fadeIn);
          }
        }, 50);
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked — user needs to interact
        console.log('Autoplay blocked. Click the music button to play.');
      });
    }
  }, [isPlaying, hasInteracted]);

  return (
    <div className="fixed bottom-8 right-8 z-[100]" id="music-player">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <div
              className="glass px-4 py-2 rounded-full text-xs tracking-wider"
              style={{ color: 'var(--rose-gold-light)' }}
            >
              ♫ Play romantic music
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Button */}
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer border-0 outline-none"
        style={{
          background: 'rgba(10, 10, 10, 0.6)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${isPlaying ? 'rgba(183, 110, 121, 0.4)' : 'rgba(201, 169, 110, 0.2)'}`,
          boxShadow: isPlaying
            ? '0 0 20px rgba(183, 110, 121, 0.2), 0 0 40px rgba(183, 110, 121, 0.05)'
            : '0 0 20px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.4s ease',
        }}
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
      >
        {/* Animated ring when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid rgba(183, 110, 121, 0.3)' }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Icon */}
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--rose-gold)" strokeWidth="1.5">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
            {/* Sound waves */}
            <motion.path
              d="M22 8c0 0 2 1.5 2 4s-2 4-2 4"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
            <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" opacity="0.5" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
