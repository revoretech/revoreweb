/**
 * REVORE TECH - 01 / THE PROBLEM SECTION
 * Physical Sticky Notes Investigation Board (Dense Visual Problem Map)
 * Scroll-driven tactile placement of 7 upstream bottleneck notes
 */

import { MotionTokens, isReducedMotion } from './motion.js';

export const initProblem = () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const problemSection = document.querySelector('.problem-section');
  if (!problemSection) return;

  const leftHeadline = document.querySelector('.problem-headline-left');
  const rightHeadline = document.querySelector('.problem-headline-right');
  const boardWrapper = document.querySelector('.investigation-board-wrapper');
  const board = document.querySelector('#investigation-board');
  const notes = document.querySelectorAll('.sticky-note');
  const counterEl = document.getElementById('board-placed-num');
  const threads = document.querySelectorAll('.thread-path');

  // 1. Dual Headline Reveals
  if (leftHeadline) {
    gsap.from(leftHeadline, {
      opacity: 0,
      y: 45,
      duration: 1.1,
      ease: MotionTokens.easings.expoOut,
      scrollTrigger: {
        trigger: leftHeadline,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  if (rightHeadline) {
    gsap.from(rightHeadline, {
      opacity: 0,
      x: 40,
      duration: 1.1,
      ease: MotionTokens.easings.expoOut,
      scrollTrigger: {
        trigger: rightHeadline,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  // Check reduced motion preference
  if (isReducedMotion()) {
    gsap.set(notes, { opacity: 1, scale: 1, y: 0 });
    gsap.set(threads, { opacity: 1 });
    if (counterEl) counterEl.textContent = '07';
    return;
  }

  // 2. Physical Sticky Notes Investigation Board Placement
  // 2. Responsive Animation using GSAP matchMedia
  const mm = gsap.matchMedia();

  // DESKTOP (> 768px): Pinned Investigation Board Stage
  mm.add("(min-width: 769px)", () => {
    gsap.set(notes, {
      opacity: 0,
      scale: 1.35,
      y: -75,
      filter: 'blur(3px)'
    });
    gsap.set(threads, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: boardWrapper,
        start: 'top 12%',
        end: '+=2600',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (!counterEl) return;
          const count = Math.min(7, Math.max(1, Math.ceil(self.progress * 7.2)));
          counterEl.textContent = String(count).padStart(2, '0');
        }
      }
    });

    notes.forEach((note, idx) => {
      tl.to(note, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'back.out(1.5)'
      }, idx * 0.7);

      if (threads[idx]) {
        tl.to(threads[idx], {
          opacity: 1,
          duration: 0.45,
          ease: 'power1.out'
        }, idx * 0.7 + 0.35);
      }
    });

    tl.to({}, { duration: 1.4 });

    return () => {
      gsap.set(notes, { clearProps: 'all' });
      gsap.set(threads, { clearProps: 'all' });
    };
  });

  // MOBILE (<= 768px): Unpinned, Natural Smooth Scroll with Dynamic Node Counter
  mm.add("(max-width: 768px)", () => {
    // Ensure all notes are visible and positioned cleanly
    gsap.set(notes, {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'none',
      clearProps: 'transform,filter'
    });
    gsap.set(threads, { opacity: 0 });

    if (counterEl) counterEl.textContent = '01';

    // Reveal notes smoothly as the user scrolls naturally down the page
    notes.forEach((note, idx) => {
      gsap.from(note, {
        opacity: 0.15,
        y: 28,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: note,
          start: 'top 92%',
          toggleActions: 'play none none reverse'
        }
      });

      // Update the tactical header counter bi-directionally
      ScrollTrigger.create({
        trigger: note,
        start: 'top 65%',
        end: 'bottom 35%',
        onEnter: () => {
          if (counterEl) counterEl.textContent = String(idx + 1).padStart(2, '0');
        },
        onEnterBack: () => {
          if (counterEl) counterEl.textContent = String(idx + 1).padStart(2, '0');
        }
      });
    });

    return () => {
      gsap.set(notes, { clearProps: 'all' });
    };
  });
};
