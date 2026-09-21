/**
 * REVORE TECH - HERO SECTION GSAP STORYTELLING
 */

import { MotionTokens, isReducedMotion } from './motion.js';

export const initHero = () => {
  if (isReducedMotion() || typeof gsap === 'undefined') return;

  const heroSection = document.querySelector('.hero-section');
  const heroTitle = document.querySelector('.hero-title');
  const heroBgImg = document.querySelector('.hero-bg-image');
  const heroMeta = document.querySelector('.hero-meta-bar');
  const heroBottom = document.querySelector('.hero-bottom-bar');
  const hudCard = document.querySelector('.hud-card');
  const reticles = document.querySelectorAll('.hero-reticle');

  if (!heroSection) return;

  // Initial Load Reveal
  const tl = gsap.timeline({
    defaults: { ease: MotionTokens.easings.expoOut }
  });

  tl.from(heroBgImg, {
    scale: 1.12,
    filter: 'contrast(1.4) brightness(0.4) grayscale(0.6)',
    duration: 1.8
  }, 0)
    .from(heroMeta, {
      opacity: 0,
      y: -15,
      duration: 0.8
    }, 0.2)
    .from('.hero-title-line', {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 1.2
    }, 0.3)
    .from(heroBottom, {
      opacity: 0,
      y: 20,
      duration: 0.9
    }, 0.6)
    .from(hudCard, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.8
    }, 0.7)
    .from(reticles, {
      opacity: 0,
      scale: 0.5,
      stagger: 0.2,
      duration: 0.6
    }, 0.8);

  // ScrollTrigger Parallax & Scan Interaction
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.to(heroBgImg, {
      y: '18%',
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.hero-title', {
      y: '-25%',
      opacity: 0.7,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
};
