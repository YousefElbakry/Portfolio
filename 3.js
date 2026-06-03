// Theme toggle (dark/light)
const themeToggle = document.getElementById('themeToggle');
const rootEl = document.documentElement;
const STORAGE_KEY = 'portfolio-theme';

function applyTheme(theme) {
  if (!theme) return;
  rootEl.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (_) {}

  if (themeToggle) {
    const pressed = theme === 'light';
    themeToggle.setAttribute('aria-pressed', String(pressed));
    themeToggle.textContent = pressed ? '☀' : '☾';
  }
}

if (themeToggle) {
  const stored = (() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  })();

  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = stored || (prefersLight ? 'light' : 'dark');
  applyTheme(initial);

  themeToggle.addEventListener('click', () => {
    const current = rootEl.dataset.theme === 'light' ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
}

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

// Close mobile menu on Escape
if (navToggle && navMenu) {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    }
  });
}

// Scroll reveal (IntersectionObserver)
(function () {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nodes = document.querySelectorAll('.reveal');
  if (!nodes.length) return;

  // If reduced-motion: skip animations but still show content.
  if (reduce) {
    nodes.forEach(n => n.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  nodes.forEach(n => {
    // ensure initial state
    n.classList.add('reveal');
    io.observe(n);
  });
})();

// Hover tilt interaction
(function () {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = document.querySelectorAll('.tilt');
  if (!cards.length || reduce) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const px = (x / r.width) * 2 - 1;
      const py = (y / r.height) * 2 - 1;
      const rx = (-py * 6).toFixed(2);
      const ry = (px * 10).toFixed(2);
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
})();
