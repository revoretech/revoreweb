/**
 * REVORE TECH - EVERY MATERIAL CARRIES DATA HORIZONTAL SCROLL
 * Smooth Right-to-Left Scroll Motion
 */

import { isReducedMotion } from './motion.js';

export const initDataMoment = () => {
  if (isReducedMotion() || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const section = document.querySelector('.data-moment-section');
  const track = document.querySelector('.data-kinetic-track');
  const ticker = document.querySelector('.material-ticker-bar');

  if (!section || !track) return;

  // Responsive scroll pin distance
  const isMobile = window.innerWidth <= 768;
  const pinDistance = isMobile ? 1000 : 1600;

  // Dynamic calculation for smooth Right-to-Left motion across any screen size
  // Starts on the right half, smoothly glides to the left as user scrolls down
  const getStartX = () => Math.round(window.innerWidth * 0.4);
  const getEndX = () => {
    const textWidth = track.scrollWidth || track.offsetWidth;
    return -Math.round(textWidth - window.innerWidth * 0.15);
  };

  // GSAP Pinned Horizontal Scroll Scrub
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: `+=${pinDistance}`,
      pin: true,
      scrub: 1.1,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  // Text scrolls smoothly from RIGHT to LEFT as the user scrolls down
  tl.fromTo(track,
    { x: () => getStartX() },
    { x: () => getEndX(), ease: 'none' }
  );

  // Subtle counter-drift for the bottom material ticker
  if (ticker) {
    tl.fromTo(ticker,
      { xPercent: -4 },
      { xPercent: 6, ease: 'none' },
      0
    );
  }
};
