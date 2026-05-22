import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';

// Components
import LoadingScreen from './components/LoadingScreen';
import ParticleCanvas from './components/ParticleCanvas';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import TimelineSection from './components/TimelineSection';
import LoveStorySection from './components/LoveStorySection';
import SpecialMessageSection from './components/SpecialMessageSection';
import GallerySection from './components/GallerySection';
import FinalSection from './components/FinalSection';

// Hooks
import useCursorGlow from './hooks/useCursorGlow';

/**
 * Navigation Dots — Side navigation for section scrolling
 */
function NavigationDots() {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'stats', label: 'Stats' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'love-story', label: 'Love Story' },
    { id: 'message', label: 'Message' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'finale', label: 'Finale' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="nav-dots" aria-label="Section navigation">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={activeSection === s.id ? 'active' : ''}
          title={s.label}
          aria-label={`Navigate to ${s.label}`}
        />
      ))}
    </nav>
  );
}

/**
 * Main App — Anniversary Website
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const cursorGlowRef = useCursorGlow();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Cursor Glow Effect (desktop only) */}
      <div ref={cursorGlowRef} className="cursor-glow" />

      {/* Floating Particles */}
      <ParticleCanvas />

      {/* Music Player */}
      <MusicPlayer />

      {/* Navigation Dots */}
      {!isLoading && <NavigationDots />}

      {/* Main Content */}
      <main>
        <HeroSection />

        <div className="section-separator" />
        <StatsSection />

        <div className="section-separator" />
        <TimelineSection />

        <div className="section-separator" />
        <LoveStorySection />

        <div className="section-separator" />
        <SpecialMessageSection />

        <div className="section-separator" />
        <GallerySection />

        <div className="section-separator" />
        <FinalSection />
      </main>
    </>
  );
}
