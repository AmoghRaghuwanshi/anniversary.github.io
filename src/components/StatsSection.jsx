import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * StatsSection — Animated counters showing years, memories, etc.
 */
const stats = [
  { label: 'Years Together', value: new Date().getFullYear() - 2005, suffix: '' },
  { label: 'Memories Made', value: 7665, suffix: '+' },
  { label: 'Adventures Shared', value: 100, suffix: '+' },
  { label: 'Years of Smiles', value: new Date().getFullYear() - 2005, suffix: '' },
];

function AnimatedCounter({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span className="text-gradient-gold">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });

  return (
    <section id="stats" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 glass-dark" />
      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-light mb-2"
                style={{ fontFamily: 'var(--font-display)' }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <div className="text-xs tracking-[0.2em] uppercase"
                style={{ color: 'var(--rose-gold)', opacity: 0.7 }}>
                {stat.label}
              </div>
              {/* Heartbeat pulse dot */}
              <motion.div
                className="w-1.5 h-1.5 rounded-full mx-auto mt-3"
                style={{ background: 'var(--rose-gold)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
