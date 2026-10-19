const burger = document.getElementById('burger');
const nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => observer.observe(el));

const billingToggle = document.getElementById('billingToggle');
const priceValues = document.querySelectorAll('.price span');

billingToggle.addEventListener('change', () => {
  const yearly = billingToggle.checked;
  priceValues.forEach((el) => {
    const value = yearly ? el.dataset.yearly : el.dataset.monthly;
    animateNumber(el, Number(value));
  });
});

function animateNumber(el, target) {
  const start = Number(el.textContent.replace(/[^0-9.]/g, '')) || 0;
  const duration = 350;
  const t0 = performance.now();

  function frame(now) {
    const progress = Math.min((now - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    el.textContent = '$' + current;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const t0 = performance.now();

      function frame(now) {
        const progress = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((el) => counterObserver.observe(el));

const ctaForm = document.getElementById('ctaForm');
const emailInput = document.getElementById('emailInput');
const ctaMsg = document.getElementById('ctaMsg');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

ctaForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = emailInput.value.trim();

  if (!EMAIL_RE.test(value)) {
    emailInput.classList.add('invalid');
    ctaMsg.textContent = 'Please enter a valid email address.';
    ctaMsg.className = 'cta-msg err';
    return;
  }

  emailInput.classList.remove('invalid');
  ctaMsg.textContent = `Thanks! We sent a confirmation to ${value}.`;
  ctaMsg.className = 'cta-msg ok';
  ctaForm.reset();
});

emailInput.addEventListener('input', () => {
  emailInput.classList.remove('invalid');
  ctaMsg.textContent = '';
  ctaMsg.className = 'cta-msg';
});

document.getElementById('year').textContent = new Date().getFullYear();
