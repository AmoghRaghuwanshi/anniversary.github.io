import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMouseParallax } from '../hooks/useScrollReveal';
import photos from '../utils/photoLoader';

/**
 * HeroSection — Breathtaking cinematic landing
 */

// Anniversary date: May 23
const ANNIVERSARY_DATE = "May 23, 2005";
const YEARS_TOGETHER = new Date().getFullYear() - 2005;

export default function HeroSection() {
  const mouseParallax = useMouseParallax(0.015);
  const bgRef = useRef(null);

  // Slow Ken Burns zoom effect
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    let scale = 1;
    const maxScale = 1.15;
    const speed = 0.00003;

    const animate = () => {
      scale += speed;
      if (scale >= maxScale) scale = 1;
      bg.style.transform = `scale(${scale})`;
      requestAnimationFrame(animate);
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const wordVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const wordItemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Split into lines to control wrapping
  const titleLine1 = "Two Hearts.";
  const titleLine2 = "One Beautiful Journey.";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Ken Burns */}
      <div className="absolute inset-0 z-0">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${photos.hero.background})`,
            transform: `translate(${mouseParallax.x}px, ${mouseParallax.y}px)`,
          }}
        />
        {/* Overlay gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, 
                rgba(10,10,10,0.4) 0%, 
                rgba(10,10,10,0.6) 40%, 
                rgba(10,10,10,0.85) 100%
              )
            `,
          }}
        />
        {/* Burgundy ambient glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(107, 29, 42, 0.15), transparent 70%)',
          }}
        />
      </div>

      {/* Light leak effects */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.3), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 10, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(183, 110, 121, 0.3), transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 20, -10, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Anniversary Date Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span
            className="inline-block glass px-6 py-2.5 rounded-full text-xs md:text-sm tracking-[0.3em] uppercase"
            style={{ color: 'var(--gold-light)' }}
          >
            ✦ {ANNIVERSARY_DATE} — {YEARS_TOGETHER} Years of Love ✦
          </span>
        </motion.div>

        {/* Main Title — Word by word animation, two controlled lines */}
        <motion.h1
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          className="font-light mb-6 leading-tight"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--cream)',
          }}
        >
          {/* Line 1: "Two Hearts." */}
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            {titleLine1.split(' ').map((word, i) => (
              <motion.span
                key={`l1-${i}`}
                variants={wordItemVariants}
                className="inline-block glow-text-gold"
                style={{ marginRight: '0.3em' }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          {/* Line 2: "One Beautiful Journey." — stays on one line */}
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mt-2">
            {titleLine2.split(' ').map((word, i) => (
              <motion.span
                key={`l2-${i}`}
                variants={wordItemVariants}
                className="inline-block glow-text-gold"
                style={{ marginRight: '0.3em' }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 my-8"
        >
          <div
            className="h-px w-16 md:w-24"
            style={{ background: 'linear-gradient(90deg, transparent, var(--gold))' }}
          />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--rose-gold)" opacity="0.7">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div
            className="h-px w-16 md:w-24"
            style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
          />
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="text-lg md:text-xl lg:text-2xl font-light tracking-wide max-w-2xl mx-auto"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            color: 'var(--rose-gold-light)',
          }}
        >
          A celebration of love, memories, and togetherness.
        </motion.p>

        {/* Years Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          <span
            className="text-5xl md:text-7xl font-light text-gradient-gold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {YEARS_TOGETHER}
          </span>
          <div className="text-left">
            <div
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: 'var(--gold)' }}
            >
              Beautiful
            </div>
            <div
              className="text-sm tracking-[0.15em] uppercase"
              style={{ color: 'var(--cream)' }}
            >
              Years Together
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'var(--gold)', opacity: 0.6 }}
        >
          Scroll to explore
        </span>
        <motion.div
          className="w-5 h-8 rounded-full flex justify-center pt-2"
          style={{ border: '1px solid rgba(201, 169, 110, 0.3)' }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: 'var(--gold)' }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
