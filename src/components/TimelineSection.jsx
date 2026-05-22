import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import photos from '../utils/photoLoader';

/**
 * TimelineCard — Single timeline entry
 * Even index: Photo LEFT | Text RIGHT
 * Odd index:  Text LEFT  | Photo RIGHT
 */
function TimelineCard({ item, index, onImageClick }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15 });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative mb-12 md:mb-0">
      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] items-center min-h-[420px]">
        {/* LEFT COLUMN */}
        <div className={`flex ${isEven ? 'justify-end pr-8' : 'justify-end pr-8'}`}>
          {isEven ? (
            /* Photo on left */
            <motion.div
              className="relative group cursor-pointer"
              initial={{ opacity: 0, x: -60 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03 }}
              onClick={() => onImageClick(item)}
            >
              <div className="w-72 h-96 rounded-xl overflow-hidden relative"
                style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                <img src={item.src} alt={item.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.5) 100%)' }} />
              </div>
              <div className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{ background: 'linear-gradient(135deg, rgba(183,110,121,0.2), rgba(201,169,110,0.2))', filter: 'blur(15px)' }} />
            </motion.div>
          ) : (
            /* Text on left */
            <motion.div
              className="text-right max-w-sm"
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs tracking-[0.3em] uppercase block mb-3" style={{ color: 'var(--gold)' }}>{item.year}</span>
              <p className="text-xl font-light italic" style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>"{item.caption}"</p>
            </motion.div>
          )}
        </div>

        {/* CENTER — Timeline line + dot */}
        <div className="flex flex-col items-center justify-center relative h-full">
          <div className="absolute top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, var(--burgundy), var(--rose-gold), var(--burgundy))' }} />
          <motion.div
            className="w-4 h-4 rounded-full relative z-10"
            style={{ background: 'var(--rose-gold)', boxShadow: '0 0 15px rgba(183,110,121,0.5)' }}
            animate={isVisible ? { scale: [0, 1.3, 1] } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div className="absolute inset-0 rounded-full"
              style={{ border: '2px solid rgba(183,110,121,0.3)' }}
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }} />
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={`flex ${isEven ? 'justify-start pl-8' : 'justify-start pl-8'}`}>
          {isEven ? (
            /* Text on right */
            <motion.div
              className="text-left max-w-sm"
              initial={{ opacity: 0, x: 40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs tracking-[0.3em] uppercase block mb-3" style={{ color: 'var(--gold)' }}>{item.year}</span>
              <p className="text-xl font-light italic" style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>"{item.caption}"</p>
            </motion.div>
          ) : (
            /* Photo on right */
            <motion.div
              className="relative group cursor-pointer"
              initial={{ opacity: 0, x: 60 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03 }}
              onClick={() => onImageClick(item)}
            >
              <div className="w-72 h-96 rounded-xl overflow-hidden relative"
                style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                <img src={item.src} alt={item.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.5) 100%)' }} />
              </div>
              <div className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{ background: 'linear-gradient(135deg, rgba(183,110,121,0.2), rgba(201,169,110,0.2))', filter: 'blur(15px)' }} />
            </motion.div>
          )}
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden">
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Mobile dot */}
          <div className="w-3 h-3 rounded-full" style={{ background: 'var(--rose-gold)', boxShadow: '0 0 10px rgba(183,110,121,0.4)' }} />

          {/* Mobile year label */}
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>{item.year}</span>

          {/* Mobile photo */}
          <div className="relative group cursor-pointer" onClick={() => onImageClick(item)}>
            <div className="w-60 h-72 sm:w-72 sm:h-80 rounded-xl overflow-hidden"
              style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.4)' }}>
              <img src={item.src} alt={item.caption} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.5) 100%)' }} />
            </div>
          </div>

          {/* Mobile caption */}
          <p className="text-base font-light italic text-center max-w-xs px-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>
            "{item.caption}"
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Lightbox — Fullscreen photo modal
 */
function Lightbox({ item, onClose }) {
  if (!item) return null;
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)' }} />
        <motion.div className="relative z-10 max-w-3xl w-full"
          initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}>
          <img src={item.src} alt={item.caption}
            className="max-w-full max-h-[75vh] object-contain rounded-lg mx-auto block"
            style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }} />
          <div className="text-center mt-5">
            <p className="text-lg italic font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>"{item.caption}"</p>
            <span className="text-xs tracking-[0.2em] uppercase mt-2 block" style={{ color: 'var(--gold)', opacity: 0.6 }}>{item.year}</span>
          </div>
          <button onClick={onClose}
            className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-0"
            style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(201,169,110,0.3)', color: 'var(--gold)', fontSize: '16px' }}>
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * TimelineSection — Main timeline component
 */
export default function TimelineSection() {
  const [titleRef, titleVisible] = useScrollReveal();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="timeline" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(107,29,42,0.2), transparent 60%)' }} />

      <div className="section-container relative z-10">
        {/* Section Title */}
        <motion.div ref={titleRef} className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={titleVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}>
          <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: 'var(--gold)' }}>Through the Years</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>
            Our Memory <span className="text-gradient-rose italic">Timeline</span>
          </h2>
          <div className="divider-ornament">
            <span style={{ color: 'var(--rose-gold)', opacity: 0.5, fontSize: '0.75rem' }}>♥</span>
          </div>
        </motion.div>

        {/* Timeline entries */}
        <div className="relative">
          {photos.timeline.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} onImageClick={setSelectedImage} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && <Lightbox item={selectedImage} onClose={() => setSelectedImage(null)} />}
    </section>
  );
}
