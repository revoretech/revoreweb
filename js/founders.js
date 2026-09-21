/**
 * REVORE TECH - SECTION 10: FOUNDERS SCROLL REVEAL & 3D INTERACTIVITY
 * Architectural, high-precision scroll-triggered reveals and tactile micro-tilt
 */

export function initFounders() {
  const foundersSection = document.getElementById('founders');
  if (!foundersSection) return;

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const header = foundersSection.querySelector('.founders-header');
  const leftCol = foundersSection.querySelector('.col-left');
  const rightCol = foundersSection.querySelector('.col-right');
  const divider = foundersSection.querySelector('.founders-split-divider');
  const cards = foundersSection.querySelectorAll('.founder-card-pro');

  // Master timeline for synchronized, cinematic scroll reveal
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: foundersSection,
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  // 1. Header reveal
  if (header) {
    tl.from(header.children, {
      y: 35,
      opacity: 0,
      duration: 0.85,
      stagger: 0.12,
      ease: 'power3.out'
    });
  }

  // 2. Central hairline divider draw
  if (divider) {
    tl.from(divider, {
      scaleY: 0,
      transformOrigin: 'top center',
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out'
    }, '-=0.6');
  }

  // 3. Staggered 3D Perspective Card Entrance
  if (leftCol && rightCol) {
    tl.from([leftCol, rightCol], {
      y: 50,
      opacity: 0,
      rotateX: 8,
      transformPerspective: 1200,
      duration: 1.05,
      stagger: 0.18,
      ease: 'power3.out'
    }, '-=0.7');

    // 4. Staggered internal content bloom for each card
    cards.forEach((card) => {
      const topbar = card.querySelector('.founder-card-topbar');
      const identity = card.querySelector('.founder-identity-block');
      const innerDivider = card.querySelector('.card-inner-divider');
      const bio = card.querySelector('.founder-bio');

      tl.from([topbar, identity, innerDivider, bio].filter(Boolean), {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out'
      }, '-=0.8');
    });
  }

  // 5. Subtle Tactile 3D Cursor Parallax (Desktop Only)
  if (window.innerWidth > 960) {
    cards.forEach((card) => {
      let bounds;

      const onMouseEnter = () => {
        bounds = card.getBoundingClientRect();
      };

      const onMouseMove = (e) => {
        if (!bounds) bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const xPct = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
        const yPct = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

        gsap.to(card, {
          rotateY: xPct * 4,
          rotateX: -yPct * 4,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power1.out'
        });
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      };

      card.addEventListener('mouseenter', onMouseEnter);
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
    });
  }
}
