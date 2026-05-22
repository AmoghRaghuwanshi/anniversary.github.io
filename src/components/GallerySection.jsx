import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import photos from '../utils/photoLoader';

/**
 * GallerySection — Premium masonry photo gallery
 */
export default function GallerySection() {
  const [titleRef, titleVisible] = useScrollReveal();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Masonry height classes for visual variety
  const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-64', 'h-80', 'h-72', 'h-64'];

  return (
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        background: 'radial-gradient(ellipse at 70% 30%, rgba(201,169,110,0.1), transparent 60%)'
      }} />

      <div className="section-container relative z-10">
        {/* Title */}
        <motion.div ref={titleRef} className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: 'var(--gold)' }}>Captured Moments</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>
            Photo <span className="text-gradient-gold italic">Gallery</span>
          </h2>
          <div className="divider-ornament">
            <span style={{ color: 'var(--gold)', opacity: 0.5, fontSize: '0.75rem' }}>✦</span>
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
          {photos.gallery.map((photo, index) => {
            const [cardRef, cardVisible] = useScrollReveal({ threshold: 0.1 });
            return (
              <motion.div
                key={photo.id}
                ref={cardRef}
                className={`mb-4 md:mb-6 break-inside-avoid`}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={cardVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="group relative cursor-pointer rounded-xl overflow-hidden"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className={`${heights[index % heights.length]} overflow-hidden`}>
                    <img src={photo.src} alt={photo.caption} loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                    <div>
                      <p className="text-sm font-light tracking-wide" style={{ color: 'var(--cream)', fontFamily: 'var(--font-display)' }}>
                        {photo.caption}
                      </p>
                      <span className="text-[10px] tracking-[0.2em] uppercase mt-1 block" style={{ color: 'var(--gold)', opacity: 0.7 }}>
                        {photo.category}
                      </span>
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(201,169,110,0.2), 0 10px 40px rgba(0,0,0,0.3)' }} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Preview */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPhoto(null)}>
            <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(30px)' }} />
            <motion.div className="relative z-10" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}>
              <img src={selectedPhoto.src} alt={selectedPhoto.caption}
                className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
                style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }} />
              <p className="text-center mt-4 text-lg italic font-light"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>"{selectedPhoto.caption}"</p>
              <button onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-0"
                style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(201,169,110,0.3)', color: 'var(--gold)' }}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
