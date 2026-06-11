/* =============================================================
   script.js — Parker Dao
   =============================================================
     1. Navbar shadow on scroll
     2. Mobile hamburger menu
     3. Active nav link (IntersectionObserver)
     4. Scroll reveal (IntersectionObserver)
     5. Scroll-driven motion (buttons + hero drift on scroll)
     6. Contact form success message
   ============================================================= */

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ─── 1. NAVBAR SHADOW ──────────────────────────────────────── */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();


/* ─── 2. MOBILE MENU ────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ─── 3. ACTIVE NAV LINK ────────────────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navLinkEls  = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }   // fires when a section sits mid-screen
);
sections.forEach(function (section) { navObserver.observe(section); });


/* ─── 4. SCROLL REVEAL ──────────────────────────────────────── */
// Auto-tag elements so the HTML stays clean.
const autoReveal  = ['.about-text', '.section-title', '.section-label', '.contact-info', '.contact-form-wrap'];
const autoStagger = ['.about-sidebar', '.projects-grid', '.background-grid'];

autoReveal.forEach(function (sel) {
  document.querySelectorAll(sel).forEach(function (el) { el.classList.add('reveal'); });
});
autoStagger.forEach(function (sel) {
  document.querySelectorAll(sel).forEach(function (el) { el.classList.add('reveal', 'stagger'); });
});

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);   // reveal once, then stop watching
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });


/* ─── 5. SCROLL-DRIVEN MOTION ───────────────────────────────── */
// The hero buttons, name, and background blob drift at different speeds
// as you scroll, which gives the page a layered, parallax feel.
// Everything runs inside requestAnimationFrame so it stays smooth.

const heroButtons    = document.getElementById('hero-buttons');
const heroDecoration = document.getElementById('hero-decoration');
const heroName       = document.querySelector('.hero-name');

let ticking = false;

function applyScrollMotion() {
  const y = window.scrollY;

  // Buttons drift up and ease slightly to the right as you scroll.
  if (heroButtons) {
    heroButtons.style.transform =
      'translate(' + (y * 0.04) + 'px, ' + (-y * 0.18) + 'px)';
  }

  // Name moves up a touch slower for depth.
  if (heroName) {
    heroName.style.transform = 'translateY(' + (-y * 0.08) + 'px)';
  }

  // Background blob floats the opposite way.
  if (heroDecoration) {
    heroDecoration.style.transform = 'translateY(' + (y * 0.25) + 'px)';
  }

  ticking = false;
}

function onScrollMotion() {
  if (!ticking) {
    window.requestAnimationFrame(applyScrollMotion);
    ticking = true;
  }
}

if (!prefersReducedMotion) {
  window.addEventListener('scroll', onScrollMotion, { passive: true });
  applyScrollMotion();
}


/* ─── 6. CONTACT FORM ───────────────────────────────────────── */
// NOTE: This does NOT actually send email.
// Sign up at formspree.io, get your form URL, and add
// action="https://formspree.io/f/yourcode" to the <form> tag to go live.

const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(function () {
      contactForm.reset();
      formSuccess.classList.add('visible');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;

      setTimeout(function () {
        formSuccess.classList.remove('visible');
      }, 5000);
    }, 1200);
  });
}
