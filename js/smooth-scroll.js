/**
 * REVORE TECH - SMOOTH SCROLL (LENIS + GSAP SYNC)
 */

import { isReducedMotion } from './motion.js';

let lenisInstance = null;

export const initSmoothScroll = () => {
  if (isReducedMotion() || typeof Lenis === 'undefined') {
    return null;
  }

  try {
    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenisInstance.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  } catch (err) {
    console.warn('Lenis smooth scroll initialization skipped:', err);
  }

  return lenisInstance;
};

export const getLenis = () => lenisInstance;
