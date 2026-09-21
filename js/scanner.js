/**
 * REVORE TECH - INTERACTIVE MATERIAL SCANNER
 */

const MATERIAL_DATABASE = {
  copper: {
    name: 'Non-Ferrous Metal (Copper)',
    grade: 'Grade A ',
    weight: '342.8 kg',
    recovery: '98.4%',
    value: '₹2,46,800',
    confidence: '99.2%',
    image: 'assets/images/copper-nonferrous.jpg',
    targetCoords: { x: '42%', y: '48%' }
  },
  aluminium: {
    name: 'Non-Ferrous (Alloy 6063)',
    grade: 'Architectural Clean / Unpainted',
    weight: '184.2 kg',
    recovery: '93.6%',
    value: '₹36,800',
    confidence: '96.8%',
    image: 'assets/images/hero-scrap-conveyor.jpg',
    targetCoords: { x: '58%', y: '36%' }
  },
  lead: {
    name: 'Heavy Elemental Lead (Battery Plates)',
    grade: 'Industrial Chemical Lead (Pb >96%)',
    weight: '512.0 kg',
    recovery: '89.2%',
    value: '₹89,600',
    confidence: '97.4%',
    image: 'assets/images/lead-plates.jpg',
    targetCoords: { x: '35%', y: '55%' }
  },
  steel: {
    name: 'Ferrous Metal (HMS 1)',
    grade: 'Heavy Melting Steel (>6mm Clean)',
    weight: '1,420.0 kg',
    recovery: '94.8%',
    value: '₹58,200',
    confidence: '98.6%',
    image: 'assets/images/ferrous-steel.jpg',
    targetCoords: { x: '50%', y: '45%' }
  }
};

export const initScanner = () => {
  const tabButtons = document.querySelectorAll('.material-tab-btn');
  const feedImg = document.querySelector('.camera-feed-img');
  const feedLaser = document.querySelector('.feed-scan-laser');

  const valType = document.getElementById('scan-val-type');
  const valGrade = document.getElementById('scan-val-grade');
  const valWeight = document.getElementById('scan-val-weight');
  const valRecovery = document.getElementById('scan-val-recovery');
  const valEst = document.getElementById('scan-val-est');
  const valConfidence = document.getElementById('scan-val-confidence');

  if (!tabButtons.length || !feedImg) return;

  const updateScanner = (materialKey) => {
    const data = MATERIAL_DATABASE[materialKey];
    if (!data) return;

    // Active tab styling
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.material === materialKey);
    });

    // Image transition & scan beam pulse
    feedImg.style.opacity = '0.3';
    if (feedLaser) {
      feedLaser.style.animation = 'none';
      feedLaser.offsetHeight; // trigger reflow
      feedLaser.style.animation = 'feedLaser 2s ease-in-out';
    }

    setTimeout(() => {
      feedImg.src = data.image;
      feedImg.style.opacity = '1';

      if (valType) valType.textContent = data.name;
      if (valGrade) valGrade.textContent = data.grade;
      if (valWeight) valWeight.textContent = data.weight;
      if (valRecovery) valRecovery.textContent = data.recovery;
      if (valEst) valEst.textContent = data.value;
      if (valConfidence) valConfidence.textContent = `CONFIDENCE: ${data.confidence}`;
    }, 200);
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const material = btn.dataset.material;
      if (material) updateScanner(material);
    });
  });
};
