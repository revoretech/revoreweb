/**
 * REVORE TECH - NAVIGATION & MOBILE DRAWER
 */

import { getLenis } from './smooth-scroll.js';

export const initNavigation = () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll State Tracking
  let lastScrollY = window.scrollY || 0;
  const scrollThreshold = 8;
  const topThreshold = 20;
  let isMenuOpen = false;

  // Header scroll detection: hide on scroll down, show on scroll up
  const handleScroll = () => {
    if (isMenuOpen) {
      header?.classList.remove('nav-hidden');
      return;
    }

    const currentScrollY = window.scrollY || 0;

    // Top threshold: always visible & un-scrolled
    if (currentScrollY <= topThreshold) {
      header?.classList.remove('nav-hidden');
      header?.classList.remove('scrolled');
      lastScrollY = currentScrollY;
      return;
    }

    header?.classList.add('scrolled');

    const diff = currentScrollY - lastScrollY;

    if (Math.abs(diff) >= scrollThreshold) {
      if (diff > 0 && currentScrollY > 70) {
        // Scrolling DOWN -> hide navbar
        header?.classList.add('nav-hidden');
      } else if (diff < 0) {
        // Scrolling UP -> reveal navbar
        header?.classList.remove('nav-hidden');
      }
      lastScrollY = currentScrollY;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Menu Toggle
  const toggleMenu = (open) => {
    isMenuOpen = typeof open === 'boolean' ? open : !isMenuOpen;
    menuToggle?.classList.toggle('is-open', isMenuOpen);
    mobileDrawer?.classList.toggle('is-open', isMenuOpen);
    menuToggle?.setAttribute('aria-expanded', isMenuOpen);

    if (isMenuOpen) {
      header?.classList.remove('nav-hidden');
      document.body.style.overflow = 'hidden';
      const lenis = getLenis();
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      const lenis = getLenis();
      if (lenis) lenis.start();
      lastScrollY = window.scrollY || 0;
    }
  };

  menuToggle?.addEventListener('click', () => toggleMenu());

  // Close drawer on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu(false);
    }
  });

  // Close drawer when clicking nav links & smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (isMenuOpen) toggleMenu(false);

          header?.classList.remove('nav-hidden');

          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -70 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // Active section indicator via IntersectionObserver
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
  }

  // Footer Back to Top button & footer links smooth scroll
  const backToTopBtn = document.querySelector('#footer-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      header?.classList.remove('nav-hidden');
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  const footerLinks = document.querySelectorAll('.footer-links a');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          header?.classList.remove('nav-hidden');
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -70 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });
};
