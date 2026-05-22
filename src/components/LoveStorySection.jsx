import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import photos from '../utils/photoLoader';

/**
 * LoveStorySection — Emotional storytelling with alternating layouts
 * 
 * TO CUSTOMIZE: Update the story entries below with your parents' real story
 */
const storyChapters = [
  {
    id: 'how-they-met',
    title: 'How It All Began',
    subtitle: 'The First Meeting',
    text: 'Some stories begin with a glance, others with a smile. Theirs began with destiny. Two souls, meant to find each other, crossed paths and the world shifted — quietly, beautifully, forever.',
    imageKey: 'howTheyMet',
  },
  {
    id: 'early-days',
    title: 'The Early Days',
    subtitle: 'Falling in Love',
    text: 'Every conversation felt like coming home. Every shared laugh, every stolen glance built the foundation of something extraordinary. These were the days that turned two individuals into one beautiful pair.',
    imageKey: 'earlyDays',
  },
  {
    id: 'marriage',
    title: 'A Sacred Bond',
    subtitle: 'The Wedding',
    text: 'With seven rounds around the sacred fire, they made promises that would last lifetimes. Surrounded by love, blessings, and joy — two families became one, two hearts beat as one.',
    imageKey: 'marriage',
  },
  {
    id: 'family',
    title: 'Building a Family',
    subtitle: 'Growing Together',
    text: 'Their love multiplied with every new addition. From two to a family full of love, laughter, and endless memories. Every challenge faced together only made them stronger.',
    imageKey: 'family',
  },
  {
    id: 'memories',
    title: 'Beautiful Memories',
    subtitle: 'Moments That Matter',
    text: 'From quiet Sunday mornings to grand celebrations, from simple dinner conversations to adventurous trips — every moment woven with love became a treasure to hold forever.',
    imageKey: 'memories',
  },
  {
    id: 'present',
    title: 'And The Story Continues',
    subtitle: 'Present Day',
    text: 'Today, their love stands as a testament to patience, sacrifice, and unwavering commitment. A love that has weathered storms and basked in sunshine — still growing, still glowing, still beautiful.',
    imageKey: 'presentDay',
  },
];

function StoryBlock({ chapter, index }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15 });
  const isReversed = index % 2 !== 0;
  const imageSrc = photos.loveStory[chapter.imageKey];

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16 mb-24 md:mb-32`}
      initial={{ opacity: 0, y: 60 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image */}
      <motion.div className="w-full md:w-1/2" whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }}>
        <div className="photo-frame rounded-2xl overflow-hidden aspect-[4/3]"
          style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 30px rgba(183,110,121,0.08)' }}>
          <img src={imageSrc} alt={chapter.title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(${isReversed ? '90deg' : '270deg'}, rgba(10,10,10,0.3), transparent 50%)`
          }} />
        </div>
      </motion.div>

      {/* Text */}
      <div className={`w-full md:w-1/2 ${isReversed ? 'md:text-right' : 'md:text-left'} text-center`}>
        <motion.span className="text-xs tracking-[0.3em] uppercase block mb-3"
          style={{ color: 'var(--gold)', opacity: 0.7 }}
          initial={{ opacity: 0 }} animate={isVisible ? { opacity: 0.7 } : {}} transition={{ delay: 0.3 }}>
          {chapter.subtitle}
        </motion.span>
        <motion.h3 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}
          initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}>
          {chapter.title}
        </motion.h3>
        <motion.div className={`w-16 h-px mb-6 ${isReversed ? 'md:ml-auto' : ''} mx-auto md:mx-0`}
          style={{ background: 'linear-gradient(90deg, var(--rose-gold), var(--gold))' }}
          initial={{ scaleX: 0 }} animate={isVisible ? { scaleX: 1 } : {}} transition={{ delay: 0.4, duration: 0.6 }} />
        <motion.p className="text-base md:text-lg font-light leading-relaxed max-w-lg"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--cream)', opacity: 0.8 }}
          initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 0.8, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.6 }}>
          {chapter.text}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function LoveStorySection() {
  const [titleRef, titleVisible] = useScrollReveal();

  return (
    <section id="love-story" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, var(--black) 0%, var(--burgundy-deep) 50%, var(--black) 100%)', opacity: 0.4
      }} />
      <div className="section-container relative z-10">
        <motion.div ref={titleRef} className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 40 }} animate={titleVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: 'var(--rose-gold)' }}>A Love Story</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>
            Written in the <span className="text-gradient-gold italic">Stars</span>
          </h2>
          <div className="divider-ornament">
            <span style={{ color: 'var(--gold)', opacity: 0.5, fontSize: '0.75rem' }}>✦</span>
          </div>
        </motion.div>
        {storyChapters.map((chapter, index) => (
          <StoryBlock key={chapter.id} chapter={chapter} index={index} />
        ))}
      </div>
    </section>
  );
}
