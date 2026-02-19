// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Close menu after clicking a link (mobile)
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      }
    });
  });
}

// Back-to-top reveal on scroll
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (!toTop) return;
  const show = window.scrollY > 600;
  toTop.style.opacity = show ? '1' : '0.4';
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Simple contact form validation
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

// Small helpers
function isEmail(v) {
  // Simple email check; good enough for client-side
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function showError(el, msg) {
  el.textContent = msg;
}

function clearErrors() {
  [nameError, emailError, messageError].forEach(e => e.textContent = '');
  formSuccess.textContent = '';
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let ok = true;

    if (!nameInput.value.trim()) {
      showError(nameError, 'Please enter your name.');
      ok = false;
    }

    if (!emailInput.value.trim()) {
      showError(emailError, 'Please enter your email.');
      ok = false;
    } else if (!isEmail(emailInput.value.trim())) {
      showError(emailError, 'Please enter a valid email.');
      ok = false;
    }

    if (!messageInput.value.trim()) {
      showError(messageError, 'Please enter a message.');
      ok = false;
    }

    if (!ok) return;

    // Simulate successful send
    formSuccess.textContent = 'Thanks! Your message was sent.';
    form.reset();
  });
}

// Enhance in-page anchor focus for accessibility
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      setTimeout(() => target.removeAttribute('tabindex'), 300);
    }
  });
});