/* ============================================================
   Xander75_DJ — main.js
   ============================================================ */

// ── Nav: add .scrolled class after scrolling 50px
const nav = document.querySelector('.site-nav');
function updateNav() {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Mobile nav toggle
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Active nav section highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

function setActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= 100) current = section.id;
  });
  navItems.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', setActiveNav, { passive: true });

// ── Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Animate waveform bars on page load
const waveBars = document.querySelectorAll('.wave-bar');
waveBars.forEach((bar, i) => {
  const heights = [20, 38, 55, 70, 90, 80, 60, 45, 72, 85, 50, 30, 65, 88, 40, 75, 92, 55, 35, 68, 82, 48, 22, 76];
  bar.style.height = `${heights[i % heights.length]}%`;
  bar.style.opacity = '0.5';
  bar.style.animation = `wave-pulse 1.8s ease-in-out ${(i * 0.06).toFixed(2)}s infinite alternate`;
});

// Inject keyframe if not present
if (!document.getElementById('wave-keyframes')) {
  const style = document.createElement('style');
  style.id = 'wave-keyframes';
  style.textContent = `
    @keyframes wave-pulse {
      from { transform: scaleY(0.4); opacity: 0.35; }
      to   { transform: scaleY(1);   opacity: 0.75; }
    }
    @media (prefers-reduced-motion: reduce) {
      .wave-bar { animation: none !important; }
    }
  `;
  document.head.appendChild(style);
}

// ── BPM live pulse on hero
// Adds a subtle flash to the BPM readout at a 130 BPM rhythm
const bpmValues = document.querySelectorAll('.bpm-value');
if (bpmValues.length) {
  const bpmInterval = 60000 / 130; // ~461ms
  setInterval(() => {
    bpmValues.forEach(el => {
      el.style.transition = 'opacity 0.05s';
      el.style.opacity = '0.5';
      setTimeout(() => { el.style.opacity = '1'; }, 80);
    });
  }, bpmInterval);
}

// ── Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Duplicate ticker for seamless loop
// (Duplicates the genre ticker content so the CSS animation loops cleanly)
const ticker = document.querySelector('.genre-ticker');
if (ticker) {
  const clone = ticker.innerHTML;
  ticker.innerHTML += clone; // duplicate for seamless loop
}
