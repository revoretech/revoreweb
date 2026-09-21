/**
 * REVORE TECH - SECTION 06: INDUSTRY INTEGRATION
 * Immersive Central Circle Radial Progression with Sequential Scroll Discovery
 * Built strictly according to the six-stage recycling ecosystem workflow.
 */

export function initEcosystem() {
  const section = document.getElementById('ecosystem');
  const stage = document.getElementById('eco-viewport-stage');
  const activePath = document.getElementById('eco-active-path');
  if (!section || !stage || !activePath) return;

  // Metadata for the 6 Industry Stages
  const stepsData = [
    {
      step: 1,
      id: 'eco-entity-1',
      markerId: 'marker-node-1',
      tag: '01 · YARDS INTAKE',
      title: 'SCRAP DEALERS',
      target: { x: 0, y: 0 }
    },
    {
      step: 2,
      id: 'eco-entity-2',
      markerId: 'marker-node-2',
      tag: '02 · FOUNDRIES RECYCLE',
      title: 'RECYCLING & PROCESSING',
      target: { x: 0, y: 0 }
    },
    {
      step: 3,
      id: 'eco-entity-3',
      markerId: 'marker-node-3',
      tag: '03 · MANUFACTURING',
      title: 'MANUFACTURERS',
      target: { x: 0, y: 0 }
    },
    {
      step: 4,
      id: 'eco-entity-4',
      markerId: 'marker-node-4',
      tag: '04 · COLLECTION NODES',
      title: 'COLLECTION CENTERS',
      target: { x: 0, y: 0 }
    },
    {
      step: 5,
      id: 'eco-entity-5',
      markerId: 'marker-node-5',
      tag: '05 · BULK RECOVERY',
      title: 'WASTE MANAGEMENT',
      target: { x: 0, y: 0 }
    },
    {
      step: 6,
      id: 'eco-entity-6',
      markerId: 'marker-node-6',
      tag: '06 · COMMODITY TRADE',
      title: 'TRADERS & AGGREGATORS',
      target: { x: 0, y: 0 }
    }
  ];

  // DOM references
  const counterVal = document.getElementById('eco-active-idx');
  const coreStatusText = document.getElementById('core-status-text');
  const navBtns = document.querySelectorAll('.eco-nav-btn');
  const entities = document.querySelectorAll('.eco-info-entity');
  const markers = document.querySelectorAll('.eco-svg-marker');

  // Measure SVG Path Length for dynamic scroll drawing
  const pathLength = activePath.getTotalLength();
  activePath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  activePath.style.strokeDashoffset = `${pathLength}`;

  let currentStep = 1;

  // Update UI Elements to reflect the active step
  function updateStepUI(activeStep) {
    if (activeStep === currentStep && entities[activeStep - 1]?.classList.contains('is-active')) {
      return;
    }
    currentStep = activeStep;

    const data = stepsData[activeStep - 1];
    if (!data) return;

    // 1. Counter in header
    if (counterVal) {
      counterVal.textContent = String(activeStep).padStart(2, '0');
    }

    // 2. Central Circle dynamic status tag
    if (coreStatusText) {
      coreStatusText.textContent = data.tag;
    }

    // 3. Bottom Navigation Pills
    navBtns.forEach((btn, idx) => {
      const stepNum = idx + 1;
      btn.classList.toggle('active', stepNum === activeStep);
      btn.classList.toggle('completed', stepNum < activeStep);
      btn.setAttribute('aria-selected', stepNum === activeStep ? 'true' : 'false');
    });

    // 4. SVG Markers
    markers.forEach((marker, idx) => {
      const stepNum = idx + 1;
      marker.classList.toggle('active', stepNum === activeStep);
      marker.classList.toggle('completed', stepNum < activeStep);
    });

    // 5. Entities Status Tags
    entities.forEach((entity, idx) => {
      const stepNum = idx + 1;
      const statusTag = document.getElementById(`status-tag-${stepNum}`);
      if (statusTag) {
        if (stepNum === activeStep) {
          statusTag.textContent = 'ACTIVE INDUSTRY';
        } else if (stepNum < activeStep) {
          statusTag.textContent = 'COMPLETED';
        } else {
          statusTag.textContent = 'UPCOMING';
        }
      }
    });
  }

  // Setup GSAP Timeline with Pin and Scrub
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Precise cumulative fraction of total path length to each of the 6 markers:
    // Marker 1 (920, 210): 20.27% (Center -> Marker 1)
    // Marker 2 (980, 400): 31.20% (Marker 1 -> Marker 2)
    // Marker 3 (920, 590): 42.10% (Marker 2 -> Marker 3)
    // Marker 4 (280, 590): 78.16% (Marker 3 -> Marker 4 across bottom)
    // Marker 5 (220, 400): 89.07% (Marker 4 -> Marker 5)
    // Marker 6 (280, 210): 100.0% (Marker 5 -> Marker 6)
    const markerFractions = [0.2027, 0.3120, 0.4210, 0.7816, 0.8907, 1.0000];
    const targetOffsets = markerFractions.map(f => pathLength * (1 - f));

    // Master Timeline with ScrollTrigger Pinning
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        id: 'ecosystem-scroll',
        trigger: section,
        start: 'top top',
        end: '+=450%', // Generous scroll distance for smooth discovery
        pin: stage,
        scrub: 0.7,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Progress is 0.0 to 1.0 across 6 stages
          const currentProgressTime = progress * 6;
          const stepIndex = Math.min(Math.floor(currentProgressTime) + 1, 6);
          updateStepUI(stepIndex);
        }
      }
    });

    // Reset initial state for all info boxes (hidden, zero overlap)
    entities.forEach((entity) => {
      gsap.set(entity, {
        opacity: 0,
        scale: 0.92,
        y: 12,
        filter: 'blur(8px)',
        pointerEvents: 'none'
      });
    });

    // Sequential Six-Stage Progression (CENTER → LINE → 01 → 02 → 03 → 04 → 05 → 06)
    // Total timeline duration = 6 units (1.0 unit per step)
    stepsData.forEach((item, idx) => {
      const entity = document.getElementById(item.id);
      if (!entity) return;

      const startTime = idx; // 0, 1, 2, 3, 4, 5

      // 1. Line draws continuously to the exact target marker for this step
      masterTimeline.to(activePath, {
        strokeDashoffset: targetOffsets[idx],
        ease: 'none',
        duration: 0.65
      }, startTime);

      // 2. Info box emerges cleanly right as the line arrives at the marker
      masterTimeline.to(entity, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        pointerEvents: 'auto',
        duration: 0.32,
        ease: 'power2.out',
        onStart: () => {
          entity.classList.add('is-active');
          entity.classList.remove('is-completed');
        },
        onReverseComplete: () => {
          entity.classList.remove('is-active');
        }
      }, startTime + 0.42);

      // 3. Resting Plateau: from (startTime + 0.74) to (startTime + 1.0),
      // the card is 100% visible, steady, and readable with zero flicker.

      // 4. When scrolling into the next step, this card fades out completely
      // BEFORE the next card appears, guaranteeing ZERO OVERLAPPING!
      if (idx < 5) {
        masterTimeline.to(entity, {
          opacity: 0,
          scale: 0.94,
          y: -10,
          filter: 'blur(6px)',
          pointerEvents: 'none',
          duration: 0.25,
          ease: 'power1.in',
          onStart: () => {
            entity.classList.remove('is-active');
            entity.classList.add('is-completed');
          },
          onReverseComplete: () => {
            entity.classList.add('is-active');
            entity.classList.remove('is-completed');
          }
        }, startTime + 1.0);
      }
    });

    // Helper to calculate target scroll for step resting plateau
    const scrollToStep = (step) => {
      const st = masterTimeline.scrollTrigger;
      if (!st) return;
      // Land in the middle of each step's reading plateau (0.85, 1.85, 2.85...)
      const targetProgress = (step - 0.15) / 6;
      const targetScroll = st.start + (st.end - st.start) * Math.min(Math.max(targetProgress, 0), 1);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    };

    // Quick-jump navigation via Bottom Control Pills
    navBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const step = parseInt(btn.getAttribute('data-step'), 10);
        scrollToStep(step);
      });
    });

    // Quick-jump navigation via SVG Marker Nodes
    markers.forEach((marker) => {
      marker.addEventListener('click', () => {
        const step = parseInt(marker.getAttribute('data-step'), 10);
        scrollToStep(step);
      });
    });
  }

  // Initialize initial state at Step 01
  updateStepUI(1);
}
