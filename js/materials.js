/**
 * REVORE TECH - MATERIALS SECTION INTERACTIONS
 */

export const initMaterials = () => {
  const materialCards = document.querySelectorAll('.material-card');
  if (!materialCards.length) return;

  materialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Optional focus transition
      materialCards.forEach(c => c.classList.remove('is-hovered'));
      card.classList.add('is-hovered');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('is-hovered');
    });
  });
};
