/**
 * Photo Loader — Real Family Photos (Anniversary Enhanced)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * All photos have been professionally enhanced with:
 * - Warm romantic golden color grading
 * - Cinematic light leaks and glow
 * - Elegant vignette
 * - Premium anniversary atmosphere
 */

// ━━ HERO SECTION — Best romantic couple portrait ━━
import heroBg from '../assets/photos/hero-bg.png';
import heroCouple from '../assets/photos/hero-couple.png';

// ━━ COUPLE PORTRAITS (Enhanced) ━━
import romanticPortrait from '../assets/photos/romantic-portrait.png';
import coupleEmbrace from '../assets/photos/couple-embrace.png';
import candidMoment from '../assets/photos/candid-moment.png';
import templeVisit from '../assets/photos/temple-visit.png';
import winterCouple from '../assets/photos/winter-couple.png';
import homeSelfie from '../assets/photos/home-selfie.png';
import couchTogether from '../assets/photos/couch-together.png';

// ━━ FAMILY PHOTOS (Enhanced) ━━
import familyLove from '../assets/photos/family-love.png';
import familyTogether from '../assets/photos/family-together.png';
import familyPark from '../assets/photos/family-park.png';

// ━━ ORIGINALS (CSS-enhanced on display) ━━
import relaxingCouple from '../assets/photos/relaxing-couple.jpg';
import homeCozy from '../assets/photos/home-cozy.jpg';

/**
 * Organized photo data for intelligent placement
 */
export const photos = {
  hero: {
    background: heroBg,
    portrait: heroCouple,
  },

  // Timeline — chronological story of their journey
  timeline: [
    {
      id: 1,
      src: romanticPortrait,
      caption: "The day two souls became one",
      year: "Together Forever",
      category: "celebration",
    },
    {
      id: 2,
      src: templeVisit,
      caption: "Seeking blessings together",
      year: "Spiritual Journey",
      category: "travel",
    },
    {
      id: 3,
      src: familyPark,
      caption: "When our family grew with love",
      year: "Family Adventures",
      category: "family",
    },
    {
      id: 4,
      src: coupleEmbrace,
      caption: "Still holding on, still in love",
      year: "Timeless Love",
      category: "couple",
    },
    {
      id: 5,
      src: candidMoment,
      caption: "The warmth of being together",
      year: "Cozy Moments",
      category: "candid",
    },
    {
      id: 6,
      src: familyLove,
      caption: "A family bound by love",
      year: "Our Bond",
      category: "family",
    },
  ],

  // Gallery — all photos for masonry grid
  gallery: [
    { id: 1, src: heroCouple, caption: "Our love story", category: "couple" },
    { id: 2, src: romanticPortrait, caption: "Together forever", category: "celebration" },
    { id: 3, src: familyPark, caption: "Family adventures", category: "family" },
    { id: 4, src: coupleEmbrace, caption: "Timeless embrace", category: "couple" },
    { id: 5, src: templeVisit, caption: "Spiritual journey", category: "travel" },
    { id: 6, src: familyLove, caption: "Family love", category: "family" },
    { id: 7, src: candidMoment, caption: "Candid moments", category: "candid" },
    { id: 8, src: winterCouple, caption: "Winter warmth", category: "couple" },
    { id: 9, src: homeSelfie, caption: "Home together", category: "candid" },
    { id: 10, src: couchTogether, caption: "Cozy evenings", category: "candid" },
    { id: 11, src: relaxingCouple, caption: "Relaxed together", category: "couple" },
    { id: 12, src: familyTogether, caption: "Our family", category: "family" },
    { id: 13, src: homeCozy, caption: "Together at home", category: "couple" },
  ],

  // Love story section — each chapter gets a specific photo
  loveStory: {
    howTheyMet: winterCouple,
    earlyDays: templeVisit,
    marriage: romanticPortrait,
    family: familyPark,
    memories: candidMoment,
    presentDay: coupleEmbrace,
  },

  // Final section centerpiece
  final: {
    centerpiece: familyTogether,
    couple: heroCouple,
  },
};

export default photos;
