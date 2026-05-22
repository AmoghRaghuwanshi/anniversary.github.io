import { useEffect, useRef } from 'react';

/**
 * Custom hook for cursor glow effect
 * Creates a subtle ambient glow that follows the mouse
 */
export function useCursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return;

    const glow = glowRef.current;
    if (!glow) return;

    let animFrame;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);
      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;
      animFrame = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return glowRef;
}

export default useCursorGlow;
