// Countdown timer — persists a rolling offer deadline in localStorage
(function initCountdowns() {
  const STORAGE_KEY = 'offerEndTime';
  const DURATION_MS = 6 * 60 * 60 * 1000; // 6 hours

  let endTime = parseInt(localStorage.getItem(STORAGE_KEY), 10);
  if (!endTime || endTime < Date.now()) {
    endTime = Date.now() + DURATION_MS;
    localStorage.setItem(STORAGE_KEY, String(endTime));
  }

  const blocks = document.querySelectorAll('[data-countdown]');
  if (!blocks.length) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    let remaining = endTime - Date.now();
    if (remaining <= 0) {
      endTime = Date.now() + DURATION_MS;
      localStorage.setItem(STORAGE_KEY, String(endTime));
      remaining = DURATION_MS;
    }
    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    blocks.forEach((block) => {
      block.querySelector('[data-cd-hours]').textContent = pad(hours);
      block.querySelector('[data-cd-minutes]').textContent = pad(minutes);
      block.querySelector('[data-cd-seconds]').textContent = pad(seconds);
    });
  }

  tick();
  setInterval(tick, 1000);
})();

// Order form (front-end only demo)
const orderForm = document.getElementById('orderForm');
const orderSuccess = document.getElementById('orderSuccess');
orderForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  orderForm.querySelectorAll('input, button').forEach((el) => (el.style.display = 'none'));
  orderSuccess.hidden = false;
});
