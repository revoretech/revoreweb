/**
 * REVORE TECH - MAIN APPLICATION ENTRY POINT
 */

import { initSmoothScroll, getLenis } from './smooth-scroll.js';
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

// EmailJS Configuration
// Replace placeholders with your actual credentials from https://dashboard.emailjs.com/
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_cysjrhn',
  TEMPLATE_ID: 'template_2fd3nxp',
  PUBLIC_KEY: 'PAS_qmi9IsSIYioe2'
};

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
  const statusMsg = document.getElementById('form-status-msg');

  const openModal = () => {
    modalOverlay?.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    const lenis = getLenis();
    if (lenis) lenis.stop();
    if (statusMsg) {
      statusMsg.className = 'form-status-msg';
      statusMsg.textContent = '';
    }
  };

  const closeModal = () => {
    modalOverlay?.classList.remove('is-active');
    document.body.style.overflow = '';
    const lenis = getLenis();
    if (lenis) lenis.start();
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

  // EmailJS Form Submission Handler
  let isSubmitting = false;

  scanForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // 1. Preserve existing validation
    if (!scanForm.checkValidity()) {
      scanForm.reportValidity();
      return;
    }

    const submitBtn = scanForm.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    // Clear previous status
    if (statusMsg) {
      statusMsg.className = 'form-status-msg';
      statusMsg.textContent = '';
    }

    // 2. Map form fields to exact EmailJS variables
    const contactPerson = document.getElementById('form-name')?.value.trim() || '';
    const company = document.getElementById('form-company')?.value.trim() || '';

    const facilitySelect = document.getElementById('form-facility');
    const facilityType = facilitySelect?.options[facilitySelect.selectedIndex]?.text || facilitySelect?.value || '';

    // Multiple Materials: collect all checked checkboxes and join as readable string
    const selectedCheckboxes = scanForm.querySelectorAll('input[name="materials"]:checked');
    const selectedMaterials = Array.from(selectedCheckboxes).map(cb => {
      const label = cb.closest('label')?.querySelector('span')?.textContent?.trim();
      return label || cb.value;
    });
    const materials = selectedMaterials.join(', ') || 'None selected';

    const contact = document.getElementById('form-email')?.value.trim() || '';

    const templateParams = {
      contact_person: contactPerson,
      company: company,
      facility_type: facilityType,
      materials: materials,
      contact: contact
    };

    // 4. Disable submit button & 5. Show "Submitting..."
    isSubmitting = true;
    submitBtn.disabled = true;
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Submitting...</span>';

    try {
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS SDK not loaded.');
      }

      // Check if credentials are configured
      const isConfigured =
        EMAILJS_CONFIG.SERVICE_ID &&
        EMAILJS_CONFIG.TEMPLATE_ID &&
        EMAILJS_CONFIG.PUBLIC_KEY &&
        !EMAILJS_CONFIG.SERVICE_ID.includes('ENTER') &&
        !EMAILJS_CONFIG.TEMPLATE_ID.includes('ENTER') &&
        !EMAILJS_CONFIG.PUBLIC_KEY.includes('ENTER');

      if (!isConfigured) {
        console.warn('EmailJS credentials are not configured. Please check EMAILJS_CONFIG in js/main.js.');
        throw new Error('EmailJS credentials not configured.');
      }

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // 7. On success, show confirmation
      if (statusMsg) {
        statusMsg.className = 'form-status-msg is-success';
        statusMsg.textContent = 'Pilot request submitted successfully. Our engineering team will get back to you.';
      }

      // 8. Reset the form only after successful submission
      scanForm.reset();
    } catch (err) {
      // 11. Log technical error to console, never expose raw error to user
      console.error('EmailJS submission error:', err);

      // 9. On failure, preserve all entered values and show friendly message
      if (statusMsg) {
        statusMsg.className = 'form-status-msg is-error';
        statusMsg.textContent = "We couldn't submit your request. Please try again or contact RevOre directly.";
      }
    } finally {
      // 10. Restore the button after success or failure
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      isSubmitting = false;
    }
  });

  console.log('Revore Tech - Material Intelligence Layer initialized.');
});
