// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle?.addEventListener('click', () => {
  nav.classList.toggle('nav--open');
});

// Gallery thumbnails
const mainImg = document.getElementById('mainProductImg');
document.querySelectorAll('.thumb').forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const full = thumb.getAttribute('data-full');
    if (!full) return;
    mainImg.src = full;
    document.querySelectorAll('.thumb').forEach((t) => t.classList.remove('active'));
    thumb.classList.add('active');
  });
});

// FAQ accordion
document.querySelectorAll('.accordion__item').forEach((item) => {
  const trigger = item.querySelector('.accordion__trigger');
  const panel = item.querySelector('.accordion__panel');
  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion__item').forEach((el) => {
      el.classList.remove('open');
      el.querySelector('.accordion__panel').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

// Order form (front-end only demo)
const orderForm = document.getElementById('orderForm');
const orderSuccess = document.getElementById('orderSuccess');
orderForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  orderForm.querySelectorAll('input, button').forEach((el) => (el.style.display = 'none'));
  orderSuccess.hidden = false;
});
