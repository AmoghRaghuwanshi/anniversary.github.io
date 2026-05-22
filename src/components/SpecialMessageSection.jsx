import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * SpecialMessageSection — Heartfelt message from son to parents
 * 
 * TO CUSTOMIZE: Replace the message text below with your own heartfelt message
 */

// REPLACE: Write your own heartfelt message to your parents here
const MESSAGE_TEXT = `Dear Mumma & Papa,

There are no words that can truly capture what you both mean to me. 
You've shown me what real love looks like — not just in grand gestures, 
but in the quiet moments, the sacrifices made in silence, and the 
endless patience you've given each other and our family.

Mumma, your warmth is the foundation of our home. 
Papa, your strength is the pillar we all lean on.

Together, you've built not just a family — but a legacy of love, 
kindness, and togetherness that I carry with me every single day.

On this special day, I want you to know: 
I am endlessly grateful. Endlessly proud. Endlessly yours.

Happy Anniversary. Today and always.

With all my love,
Your Son ❤️`;

export default function SpecialMessageSection() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="message" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(183,110,121,0.08), transparent 60%)' }} />
      </div>

      <div className="section-container relative z-10 max-w-4xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          
          {/* Section label */}
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: 'var(--gold)' }}>From the Heart</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>
              A Letter of <span className="text-gradient-rose italic">Love</span>
            </h2>
            <div className="divider-ornament">
              <span style={{ color: 'var(--rose-gold)', opacity: 0.5, fontSize: '0.75rem' }}>♥</span>
            </div>
          </div>

          {/* Message Card */}
          <motion.div
            className="glass-rose rounded-2xl p-8 md:p-12 lg:p-16 relative"
            style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.3), 0 0 40px rgba(183,110,121,0.05)' }}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Decorative corner */}
            <div className="absolute top-4 left-4 w-12 h-12 opacity-20"
              style={{ borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
            <div className="absolute bottom-4 right-4 w-12 h-12 opacity-20"
              style={{ borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />

            {/* Opening quote */}
            <div className="text-center mb-8">
              <span className="text-6xl md:text-7xl leading-none" style={{ fontFamily: 'var(--font-script)', color: 'var(--rose-gold)', opacity: 0.3 }}>"</span>
            </div>

            {/* Message text with handwritten feel */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
            >
              {MESSAGE_TEXT.split('\n').map((line, i) => (
                <motion.p
                  key={i}
                  className={`mb-2 ${line.trim() === '' ? 'mb-6' : ''}`}
                  style={{
                    fontFamily: line.startsWith('Dear') || line.startsWith('Your') || line.startsWith('With')
                      ? 'var(--font-handwritten)' : 'var(--font-display)',
                    fontSize: line.startsWith('Dear') ? '1.5rem' : line.startsWith('Happy') ? '1.3rem' : '1.05rem',
                    color: line.startsWith('Happy') ? 'var(--rose-gold)' : 'var(--cream)',
                    opacity: line.trim() === '' ? 0 : 0.85,
                    fontStyle: 'italic',
                    fontWeight: 300,
                    lineHeight: 1.9,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: line.trim() === '' ? 0 : 0.85, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* Closing quote */}
            <div className="text-center mt-6">
              <span className="text-6xl md:text-7xl leading-none" style={{ fontFamily: 'var(--font-script)', color: 'var(--rose-gold)', opacity: 0.3 }}>"</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
