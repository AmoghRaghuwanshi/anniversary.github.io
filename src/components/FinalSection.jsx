import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import photos from '../utils/photoLoader';

/**
 * FinalSection — Cinematic emotional ending
 */

function ConfettiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    class LightParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = -Math.random() * 0.5 - 0.2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.fadeDir = 1;
        const colors = ['201,169,110', '183,110,121', '232,180,184', '245,230,211'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.fadeDir * this.fadeSpeed;
        if (this.opacity >= 0.6 || this.opacity <= 0.05) this.fadeDir *= -1;
        if (this.y < -10) { this.y = canvas.height + 10; this.x = Math.random() * canvas.width; }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity * 0.1})`;
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      const count = window.innerWidth < 768 ? 25 : 50;
      particles = Array.from({ length: count }, () => new LightParticle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animFrame = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animFrame); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
}

export default function FinalSection() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="finale" className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32">
      {/* Deep burgundy ambient */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(107,29,42,0.2), var(--black) 70%)'
      }} />

      <ConfettiCanvas />

      {/* Floating light orbs */}
      <motion.div className="absolute top-20 left-20 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.08), transparent 70%)', filter: 'blur(40px)' }}
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-20 right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(183,110,121,0.08), transparent 70%)', filter: 'blur(40px)' }}
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />

      <div ref={ref} className="section-container relative z-20 text-center max-w-4xl mx-auto px-6">
        {/* Anniversary label */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }} className="mb-8">
          <span className="inline-block glass px-6 py-2.5 rounded-full text-xs md:text-sm tracking-[0.3em] uppercase"
            style={{ color: 'var(--gold-light)' }}>
            ✦ Celebrating a Lifetime of Love ✦
          </span>
        </motion.div>

        {/* Main heading — glowing */}
        <motion.h2 initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-6 glow-text-gold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>
          Happy Anniversary
        </motion.h2>

        {/* Script subtext */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl mb-12"
          style={{ fontFamily: 'var(--font-script)', color: 'var(--rose-gold)' }}>
          Mumma & Papa
        </motion.p>

        {/* Divider */}
        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }} className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
          <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="var(--rose-gold)"
            animate={{ scale: [1, 1.15, 1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>
          <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
        </motion.div>

        {/* Family centerpiece photo */}
        <motion.div initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mb-14 w-64 sm:w-80 md:w-96">
          <div className="w-full rounded-2xl overflow-hidden aspect-[3/4] relative"
            style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(183,110,121,0.1), 0 0 80px rgba(201,169,110,0.05)' }}>
            <img src={photos.final.centerpiece} alt="Our Family"
              className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.5) 100%)'
            }} />
          </div>
          {/* Glowing border effect */}
          <div className="absolute -inset-1 rounded-2xl -z-10 opacity-40"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--rose-gold), var(--gold))', filter: 'blur(12px)' }} />
        </motion.div>

        {/* Final quote */}
        <motion.blockquote initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="max-w-2xl mx-auto mb-8 text-center">
          <p className="text-lg md:text-xl lg:text-2xl font-light italic leading-relaxed text-center"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', opacity: 0.85 }}>
            "The greatest thing you'll ever learn is just to love and be loved in return."
          </p>
        </motion.blockquote>

        {/* Made with love note */}
        <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 0.4 } : {}}
          transition={{ delay: 1.8, duration: 1 }} className="mt-16">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--rose-gold)' }}>
            Made with ♥ by your loving son
          </p>
        </motion.div>
      </div>
    </section>
  );
}
