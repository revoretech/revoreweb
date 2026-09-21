/**
 * REVORE TECH - BRAND POSITIONING STATEMENT
 * Premium Typographic Scroll-to-Reveal Animation
 * "Object Recognition ≠ Material Understanding"
 */

import { isReducedMotion } from './motion.js';

export const initPositioning = () => {
  const section = document.querySelector('#positioning');
  if (!section) return;

  // Respect user preference for reduced motion
  if (isReducedMotion()) return;

  const runAnimation = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(runAnimation, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const meta = section.querySelector('.positioning-reveal-meta');
    const line1 = section.querySelector('.pos-line-1');
    const line2 = section.querySelector('.pos-line-2');
    const strikeLine = section.querySelector('.strikethrough-line');
    const buildLabel = section.querySelector('.positioning-build-label');
    const limeLabel = section.querySelector('.positioning-lime-label');

    // Create a snappy, buttery-smooth ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // 1. Meta tag reveal
    if (meta) {
      tl.fromTo(meta,
        { opacity: 0, y: 18, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }
      );
    }

    // 2. Main title Line 1: "OUR AMBITION IS NOT TO BUILD"
    if (line1) {
      tl.fromTo(line1,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' },
        '-=0.35'
      );
    }

    // 3. Main title Line 2: "AN OBJECT SCANNER."
    if (line2) {
      tl.fromTo(line2,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' },
        '-=0.45'
      );
    }

    // 4. Strikethrough line swift draw across "OBJECT SCANNER."
    if (strikeLine) {
      tl.fromTo(strikeLine,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.55, ease: 'power2.out' },
        '-=0.25'
      );
    }

    // 5. Accent block: "We are building"
    if (buildLabel) {
      tl.fromTo(buildLabel,
        { opacity: 0, y: 32, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' },
        '-=0.35'
      );
    }

    // 6. Accent block: "Material Intelligence." (Electric lime bloom)
    if (limeLabel) {
      tl.fromTo(limeLabel,
        { opacity: 0, y: 32, filter: 'blur(6px)', scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          duration: 0.65,
          ease: 'power3.out'
        },
        '-=0.45'
      );
    }
  };

  runAnimation();
};
