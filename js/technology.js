/**
 * REVORE TECH - ENGINEERING SCHEMATIC ANIMATION
 */

import { isReducedMotion } from './motion.js';

export const initTechnology = () => {
  if (isReducedMotion()) return;

  const nodes = document.querySelectorAll('.schematic-node');
  if (!nodes.length) return;

  let currentIndex = 0;

  setInterval(() => {
    nodes.forEach((node, i) => {
      node.classList.toggle('active-node', i === currentIndex);
    });
    currentIndex = (currentIndex + 1) % nodes.length;
  }, 1600);
};
