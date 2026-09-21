/**
 * REVORE TECH - SECTION 04 / VALUE
 * Premium Typographic Scroll-to-Reveal Animation
 */

export const initValueEquation = () => {
  const section = document.querySelector('#value-equation');
  if (!section) return;

  // Wait for GSAP and ScrollTrigger
  const runAnimation = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(runAnimation, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const badge = section.querySelector('.value-badge');
    const headingItems = section.querySelectorAll('.value-heading .val-reveal-item');
    const subheading = section.querySelector('.value-subheading');
    const termsAndOps = section.querySelectorAll('.val-term-item');
    const arrow = section.querySelector('.equation-arrow-row');
    const outcome = section.querySelector('.equation-result-row');
    const closing = section.querySelector('.value-closing-block');

    // Create a dedicated ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // 1. Badge reveal
    if (badge) {
      tl.fromTo(badge,
        { opacity: 0, y: 25, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out' }
      );
    }

    // 2. Heading lines reveal
    if (headingItems.length) {
      tl.fromTo(headingItems,
        { opacity: 0, y: 45, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.85, stagger: 0.14, ease: 'power3.out' },
        '-=0.4'
      );
    }

    // 3. Subheading reveal
    if (subheading) {
      tl.fromTo(subheading,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
        '-=0.5'
      );
    }

    // 4. Equation terms & mathematical operators reveal sequentially
    if (termsAndOps.length) {
      tl.fromTo(termsAndOps,
        { opacity: 0, y: 32, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.3)' },
        '-=0.3'
      );
    }

    // 5. Downward flow arrow
    if (arrow) {
      tl.fromTo(arrow,
        { opacity: 0, y: -20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.6)' },
        '-=0.2'
      );
    }

    // 6. Estimated Value result card
    if (outcome) {
      tl.fromTo(outcome,
        { opacity: 0, y: 35, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'back.out(1.4)' },
        '-=0.2'
      );
    }

    // 7. Concluding statement
    if (closing) {
      tl.fromTo(closing,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.35'
      );
    }
  };

  runAnimation();
};
