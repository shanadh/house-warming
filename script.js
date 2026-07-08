/* ==========================================
   INTERACTIVE JAVASCRIPT LOGIC
   Project: Luxury Islamic Housewarming Invitation
   Features: Countdown, RSVP, Calendar, Reveal
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Scroll Progress & Fade-In Reveal
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
        // Retrieve custom delay if defined
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('reveal');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => revealOnScroll.observe(el));


  // ==========================================
  // 2. Countdown Timer (Target: July 25, 2026 18:00)
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
      // Event has started or passed
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

  // Update countdown immediately, then run interval
  updateCountdown();
  setInterval(updateCountdown, 1000);

});
