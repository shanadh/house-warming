/* ==========================================
   INTERACTIVE JAVASCRIPT LOGIC
   Project: Luxury Islamic Housewarming Invitation
   Features: Envelope preloader, Ambient drone synth, Share API, Scroll reveal
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Prevent scroll until envelope is opened
  document.body.style.overflow = 'hidden';

  // ==========================================
  // 1. Envelope Preloader Close Event
  // ==========================================
  const preloader = document.getElementById('preloader');
  const sealBtn = document.getElementById('sealBtn');

  if (sealBtn && preloader) {
    sealBtn.addEventListener('click', () => {
      // Trigger smooth fade out and scale up
      preloader.style.opacity = '0';
      preloader.style.transform = 'scale(1.05)';
      
      // Allow page scrolling
      document.body.style.overflow = '';

      // Fully remove preloader element after transition completes
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 1000);
    });
  }


  // ==========================================
  // 2. Scroll Progress & Fade-In Reveal
  // ==========================================
  const scrollProgress = document.getElementById('scrollProgress');
  
  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = scrolled + '%';
    }
  });

  // Intersection Observer for scroll animations
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('reveal');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => revealOnScroll.observe(el));


  // ==========================================
  // 3. Countdown Timer (Target: July 25, 2026 18:00)
  // ==========================================
  const targetDateStr = 'July 25, 2026 18:00:00 GMT+0530'; // Assuming UTC+5:30 based on local user metadata
  const targetTime = new Date(targetDateStr).getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      if (daysEl) daysEl.innerText = '00';
      if (hoursEl) hoursEl.innerText = '00';
      if (minutesEl) minutesEl.innerText = '00';
      if (secondsEl) secondsEl.innerText = '00';
      
      const countdownTitle = document.querySelector('.countdown-title');
      if (countdownTitle) countdownTitle.innerText = "THE CELEBRATION HAS COMMENCED";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // ==========================================
  // 4. Interactive Gold Foil Glint Card Shine
  // ==========================================
  const shineCards = document.querySelectorAll('.hosts-card, .details-card-wrapper, .blessing-card, .regards-card');
  
  shineCards.forEach(card => {
    // Mouse Move event for desktops
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });

    // Touch Move event for mobile interaction
    card.addEventListener('touchmove', e => {
      if (e.touches.length > 0) {
        const rect = card.getBoundingClientRect();
        const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      }
    }, { passive: true });

    // Reset shine to center on mouse leave/touch end
    const resetShine = () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    };
    card.addEventListener('mouseleave', resetShine);
    card.addEventListener('touchend', resetShine);
  });

});
