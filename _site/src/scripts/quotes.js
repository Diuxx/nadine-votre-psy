(function() {
  const container = document.getElementById('hero-quotes');
  if (!container) return;
  const list = container.querySelector('ul');
  if (!list) return;
  const items = Array.from(list.querySelectorAll('li'));
  if (!items.length) return;

  let index = 0;
  const show = (i) => {
    items.forEach((el, idx) => {
      el.classList.toggle('visible', idx === i);
      el.setAttribute('aria-hidden', String(idx !== i));
    });
  };

  // initial
  show(index);

  const interval = 3500; // ms
  setInterval(() => {
    index = (index + 1) % items.length;
    show(index);
  }, interval);
})();
