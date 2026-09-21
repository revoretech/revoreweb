/**
 * REVORE TECH - MAIN APPLICATION ENTRY POINT
 */

import { initSmoothScroll } from './smooth-scroll.js';
import { initNavigation } from './navigation.js';
import { initHero } from './hero.js';
import { initProblem } from './problem.js';
import { initScanner } from './scanner.js';
import { initMaterials } from './materials.js';
import { initValueEquation } from './value.js';
import { initSupplyChain } from './supply-chain.js';
import { initDataMoment } from './data-moment.js';
import { initPipeline } from './pipeline.js';
import { initEcosystem } from './ecosystem.js';
import { initPositioning } from './positioning.js';
import { initFounders } from './founders.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lenis Smooth Scrolling
  initSmoothScroll();

  // Initialize Navigation & Mobile Drawer
  initNavigation();

  // Initialize Core Narrative Sections
  initHero();
  initProblem();
  initDataMoment();
  initScanner();
  initPipeline();
  initMaterials();
  initValueEquation();
  initPositioning();
  initEcosystem();
  initSupplyChain();
  initFounders();

  // Setup Modal Interactions (Request a Scan)
  const modalOverlay = document.getElementById('scan-modal');
  const modalOpenBtns = document.querySelectorAll('.trigger-scan-modal');
  const modalCloseBtn = document.querySelector('.modal-close');
  const scanForm = document.getElementById('pilot-scan-form');

  const openModal = () => {
    modalOverlay?.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay?.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  modalOpenBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  modalCloseBtn?.addEventListener('click', closeModal);

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('is-active')) {
      closeModal();
    }
  });

  scanForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = scanForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'SENDING...';
      submitBtn.disabled = true;

      setTimeout(() => {
        scanForm.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--accent-lime); margin-bottom: 0.75rem;">
              REQUEST RECEIVED
            </div>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; max-width: 44ch; margin: 0 auto 1.5rem;">
              Thank you. Our engineering team will reach out shortly to learn about your materials and arrange a trial scan on your site.
            </p>
            <button class="btn btn-outline" id="modal-ack-btn" style="margin-top: 1rem;">DONE</button>
          </div>
        `;
        document.getElementById('modal-ack-btn')?.addEventListener('click', closeModal);
      }, 1000);
    }
  });

  console.log('Revore Tech - Material Intelligence Layer initialized.');
});
