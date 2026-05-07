/* =============================================================
   script.js — Personal Website Interactions
   =============================================================
   This file adds three small behaviours to the page:
     1. Navbar shadow appears when the user scrolls down
     2. Mobile hamburger menu toggles open / closed
     3. Sections fade in as they scroll into view
     4. Contact form shows a success message on submit
   ============================================================= */


/* ─── 1. NAVBAR: add a shadow when the user scrolls down ───── */

const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  // If the user has scrolled more than 20px, add the "scrolled" CSS class
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Run the function whenever the user scrolls
window.addEventListener('scroll', handleNavbarScroll);


/* ─── 2. MOBILE MENU: toggle open / closed ──────────────────── */

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', function () {
  // Toggle the "open" class on both elements
  // CSS uses this class to show/hide the menu and animate the hamburger icon
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close the mobile menu when a link is clicked
// (so the user doesn't have to manually close it)
navLinks.querySelectorAll('.nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ─── 3. ACTIVE NAV LINK: highlight the current section ─────── */
//
// As the user scrolls, we track which section is on screen and
// add the "active" class to the matching nav link.

const sections  = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function setActiveNavLink() {
  let currentSection = '';

  sections.forEach(function (section) {
    // If the top of the section is above the middle of the viewport,
    // that section is considered "active"
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinkEls.forEach(function (link) {
    link.classList.remove('active');
    // Match the link's href (e.g. "#about") with the current section id
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNavLink);
// Also run on page load in case the user loads mid-page
setActiveNavLink();


/* ─── 4. SCROLL REVEAL: fade in sections as they appear ─────── */
//
// Every element with the "reveal" CSS class starts invisible.
// When it enters the viewport, we add "visible" to fade it in.
//
// To use this on any element, just add class="reveal" to it in HTML.

const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  revealElements.forEach(function (el) {
    // getBoundingClientRect() tells us where the element is on screen
    const rect = el.getBoundingClientRect();

    // If the top of the element is above 90% of the viewport height,
    // it's visible enough — reveal it
    const isVisible = rect.top < window.innerHeight * 0.9;

    if (isVisible) {
      el.classList.add('visible');
    }
  });
}

// Run on scroll and also immediately on page load
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();


/* ─── 5. CONTACT FORM: show success message on submit ────────── */
//
// NOTE: This does NOT actually send an email.
// To send real emails, sign up at formspree.io, get your form URL,
// and add  action="https://formspree.io/f/yourcode"  to the <form> tag.
// Formspree will handle the email sending for free.

const contactForm   = document.getElementById('contact-form');
const formSuccess   = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    // Prevent the default browser form submission (which would reload the page)
    event.preventDefault();

    // Grab the submit button so we can give feedback
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Show a "sending..." state on the button
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    // Simulate a short delay (like waiting for a server response)
    // Replace this block with real fetch() code if using Formspree
    setTimeout(function () {
      // Reset the form fields
      contactForm.reset();

      // Show the success message
      formSuccess.classList.add('visible');

      // Restore the button
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;

      // Hide the success message after 5 seconds
      setTimeout(function () {
        formSuccess.classList.remove('visible');
      }, 5000);

    }, 1200); // 1.2 second simulated delay
  });
}


/* =============================================================
   OPTIONAL: Add the "reveal" class automatically to key elements
   so they animate in without editing index.html.
   ============================================================= */
(function addRevealClasses() {
  const autoReveal = [
    '.about-grid',
    '.projects-grid',
    '.contact-grid',
    '.project-card',
    '.section-title',
    '.section-label',
  ];

  autoReveal.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.classList.add('reveal');
    });
  });

  // Re-run reveal check now that we've added classes
  revealOnScroll();
})();
