/**
 * REVORE TECH - SUPPLY CHAIN INTERACTIVE FLOW
 */

import { isReducedMotion } from './motion.js';

export const initSupplyChain = () => {
  if (isReducedMotion()) return;

  const nodes = document.querySelectorAll('.supply-node');
  if (!nodes.length) return;

  let currentIdx = 0;
  setInterval(() => {
    nodes.forEach((n, i) => {
      n.classList.toggle('highlight', i === currentIdx);
    });
    currentIdx = (currentIdx + 1) % nodes.length;
  }, 2000);
};
