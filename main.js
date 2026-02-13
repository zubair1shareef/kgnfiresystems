/* ================================================
   KGN FIRE SYSTEMS — MAIN JavaScript
   ================================================ */

// ── STICKY NAV SCROLL EFFECT ──
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ── MOBILE HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');
if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  // Close nav when clicking a link
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      mainNav.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

// ── INTERSECTION OBSERVER: Fade-in animations ──
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => observer.observe(el));
}

// ── AUTO ADD FADE-IN to sections ──
document.querySelectorAll(
  '.service-card, .industry-card, .project-card, .testimonial-card, ' +
  '.why-point, .expertise-card, .gallery-card, .process-step, .value-item'
).forEach((el, i) => {
  el.classList.add('fade-in');
  // Stagger delay based on position within parent
  const siblings = Array.from(el.parentElement.children);
  const idx = siblings.indexOf(el) % 4;
  el.classList.add(`fade-in-delay-${idx}`);
});

// ── CONTACT FORM SUBMISSION ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Request Sent!';
      btn.style.background = '#16a34a';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1200);
  });
}

// ── PROJECT FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryCards = document.querySelectorAll('.gallery-card');
if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ── SMOOTH SCROLL for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── SET ACTIVE NAV LINK ──
(function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
