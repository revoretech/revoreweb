/**
 * REVORE TECH - 03 / PROCESS PIPELINE
 * Split Two Halves 3D Sticky Scroll Showcase
 */

import { MotionTokens, isReducedMotion } from './motion.js';

export const initPipeline = () => {
  if (isReducedMotion() || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const section = document.querySelector('.pipeline-section');
  const cards = document.querySelectorAll('.pipeline-step-card');
  if (!section || !cards.length) return;

  const stageIdxEl = document.getElementById('pipeline-stage-idx');
  const vizStatusEl = document.getElementById('pipeline-viz-status');
  const holoSymbols = document.querySelectorAll('.holo-symbol');
  const trackNodes = document.querySelectorAll('.track-node');
  const trackFills = document.querySelectorAll('.track-fill');

  const stageData = {
    1: {
      status: 'STAGE 01 / SCAN',
      op: 'SCAN MATERIAL',
      core: 'Multi-Spectral Optical Array',
      out: 'Raw Optical Volumetric Mesh'
    },
    2: {
      status: 'STAGE 02 / IDENTIFY',
      op: 'ANALYZE SIGNALS',
      core: 'Spectral Edge Neural Classifier',
      out: 'Categorized Material Profile'
    },
    3: {
      status: 'STAGE 03 / GRADE',
      op: 'EVALUATE QUALITY',
      core: 'Surface Density & Purity Engine',
      out: 'Verified Scrap Grade (ISRI Spec)'
    },
    4: {
      status: 'STAGE 04 / VALUE',
      op: 'ESTIMATE VALUE',
      core: 'Dynamic Recovery Yield Modeler',
      out: 'Real-Time Settlement Valuation'
    },
    5: {
      status: 'STAGE 05 / STORE',
      op: 'DIGITAL RECORD',
      core: 'Structured Data Manifest Vault',
      out: 'Verifiable Digital Manifest ID'
    },
    6: {
      status: 'STAGE 06 / MOVE',
      op: 'SUPPLY CHAIN FLOW',
      core: 'Ecosystem Dispatch Router',
      out: 'Verified Chain of Custody Packet'
    }
  };

  const updateStage = (step) => {
    const data = stageData[step];
    if (!data) return;

    // Update active card
    cards.forEach(c => {
      const cStep = parseInt(c.dataset.step, 10);
      if (cStep === step) {
        c.classList.add('is-active');
      } else {
        c.classList.remove('is-active');
      }
    });

    // Update header telemetry
    if (stageIdxEl) stageIdxEl.textContent = String(step).padStart(2, '0');
    if (vizStatusEl) vizStatusEl.textContent = data.status;

    // 3D Hologram symbol transition
    holoSymbols.forEach(h => {
      const hStage = parseInt(h.dataset.stage, 10);
      if (hStage === step) {
        h.classList.add('active');
      } else {
        h.classList.remove('active');
      }
    });

    // Update progress track nodes and connecting lines
    trackNodes.forEach(node => {
      const nStep = parseInt(node.dataset.step, 10);
      if (nStep <= step) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });

    trackFills.forEach((fill, idx) => {
      if (idx < step - 1) {
        fill.classList.add('filled');
      } else {
        fill.classList.remove('filled');
      }
    });
  };

  // ScrollTrigger for each card on the right
  cards.forEach((card) => {
    const step = parseInt(card.dataset.step, 10);

    ScrollTrigger.create({
      trigger: card,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => updateStage(step),
      onEnterBack: () => updateStage(step)
    });

    // Also allow clicking cards directly to trigger stage animation
    card.addEventListener('click', () => updateStage(step));
  });

  // Ensure Stage 1 is active on initial load
  updateStage(1);

  // Section headline reveal
  const header = section.querySelector('.pipeline-header');
  if (header) {
    gsap.from(header, {
      opacity: 0,
      y: 35,
      duration: 1.0,
      ease: MotionTokens.easings.expoOut,
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }
};
