/**
 * REVORE TECH - MOTION TOKENS & GSAP CONFIG
 */

export const MotionTokens = {
  durations: {
    instant: 0.1,
    fast: 0.25,
    normal: 0.6,
    slow: 1.0,
    cinematic: 1.6
  },
  easings: {
    expoOut: 'expo.out',
    power3Out: 'power3.out',
    power2InOut: 'power2.inOut',
    elasticSubtle: 'elastic.out(1, 0.75)',
    none: 'none'
  },
  staggers: {
    rapid: 0.05,
    normal: 0.12,
    slow: 0.2
  }
};

export const isReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
