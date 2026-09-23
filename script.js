/* =============================================
   Supply Sistemas — Script Principal
   ============================================= */

// ── Header sticky com glassmorphism ──
const header = document.getElementById('site-header');
const setHeader = () => {
  if (window.scrollY > 12) {
    header.classList.add('bg-white/90', 'backdrop-blur-md', 'border-b', 'border-gray-100', 'shadow-sm');
  } else {
    header.classList.remove('bg-white/90', 'backdrop-blur-md', 'border-b', 'border-gray-100', 'shadow-sm');
  }
};
setHeader();
window.addEventListener('scroll', setHeader);

// ── Menu mobile ──
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
menuBtn.addEventListener('click', () => mobileNav.classList.toggle('hidden'));
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.add('hidden'));
});

// ── Fade-in ao scroll (IntersectionObserver) ──
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in, .fade-in-delay').forEach(el => fadeObserver.observe(el));

// ── Contador animado ──
const animateCounter = (el) => {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (el.dataset.suffix || '+');
    if (current >= target) clearInterval(timer);
  }, 16);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ── Formulário de contato ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.innerHTML = '<i class="fa-solid fa-circle-check mr-2"></i>Mensagem enviada!';
    btn.classList.remove('bg-brand', 'hover:bg-brand-600');
    btn.classList.add('bg-green-500', 'cursor-default');
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = 'Enviar mensagem <i class="fa-solid fa-paper-plane ml-2"></i>';
      btn.classList.add('bg-brand', 'hover:bg-brand-600');
      btn.classList.remove('bg-green-500', 'cursor-default');
      btn.disabled = false;
      contactForm.reset();
    }, 4000);
  });
}
