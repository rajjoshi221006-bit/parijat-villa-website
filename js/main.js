// Mobile hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Set active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});

// Fade-in on scroll
requestAnimationFrame(() => {
  const els = document.querySelectorAll('.fade-up');

  // Set initial hidden state without animation
  els.forEach(el => {
    el.style.transition = 'none';
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
  });

  // Force reflow then restore transitions
  void document.body.offsetHeight;
  els.forEach(el => { el.style.transition = ''; });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => {
    observer.observe(el);
    // Immediately handle elements already in view
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      observer.unobserve(el);
    }
  });
});
