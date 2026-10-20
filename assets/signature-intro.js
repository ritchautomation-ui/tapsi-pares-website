/* Progressive enhancement. All content works without this module. */
(() => {
  'use strict';
  const root = document.documentElement;
  const overlay = document.getElementById('signature-intro');
  const skip = document.getElementById('signature-skip');

  const images = [...(overlay?.querySelectorAll('img') || [])];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const regions = [...document.querySelectorAll('.bar, main, footer, body > .skip')];
  const timers = new Set();
  const previousFocus = document.activeElement;
  let finished = false;
  let started = false;
  const later = (callback, delay) => {
    const id = setTimeout(() => { timers.delete(id); callback(); }, delay);
    timers.add(id);
    return id;
  };

  function complete(restoreFocus = false) {
    if (finished) return;
    finished = true;
    timers.forEach(clearTimeout);
    timers.clear();
    clearTimeout(window.signatureSafety);
    root.classList.remove('signature-pending', 'signature-active', 'signature-revealing');
    root.style.removeProperty('--intro-scrollbar');
    regions.forEach(element => {
      if (element.hasAttribute('data-signature-lock')) {
        element.inert = false;
        element.removeAttribute('data-signature-lock');
      }
    });
    if (overlay) overlay.hidden = true;
    document.removeEventListener('keydown', onKey);
    motion.removeEventListener('change', onMotion);
    document.removeEventListener('signature:cancel', onCancel);
    if (restoreFocus && started && document.activeElement === skip) {
      const target = previousFocus !== document.body && previousFocus?.isConnected
        ? previousFocus : document.querySelector('.brand');
      target?.focus({ preventScroll: true });
    }
  }
  function onKey(event) {
    if (event.key === 'Escape') { event.preventDefault(); complete(true); }
    // Skip is the only interactive element in the short modal sequence.
    if (event.key === 'Tab') { event.preventDefault(); skip.focus({ preventScroll: true }); }
  }
  function onMotion(event) { if (event.matches) complete(true); }
  function onCancel() { complete(true); }
  document.addEventListener('signature:cancel', onCancel);
  window.addEventListener('pagehide', () => complete());
  if (!overlay || !root.classList.contains('signature-pending') || motion.matches ||
      getComputedStyle(overlay).position !== 'fixed') { complete(); return; }

  // A failed, delayed or missing image must never hold the homepage hostage.
  later(() => complete(true), 1500);
  Promise.all(images.map(image => image.decode())).then(() => {
    if (finished || !root.classList.contains('signature-pending') || images.some(image => !image.naturalWidth) || motion.matches || document.hidden) {
      complete(); return;
    }
    timers.forEach(clearTimeout);
    timers.clear();
    started = true;
    root.style.setProperty('--intro-scrollbar', `${innerWidth - root.clientWidth}px`);
    root.classList.add('signature-active');
    overlay.hidden = false;
    regions.forEach(element => {
      if (!element.inert) { element.inert = true; element.setAttribute('data-signature-lock', ''); }
    });
    skip.focus({ preventScroll: true });
    skip.addEventListener('click', () => complete(true), { once: true });
    document.addEventListener('keydown', onKey);
    motion.addEventListener('change', onMotion);

    // The plate and typography arrive together, then dissolve into the hero.
    later(() => root.classList.add('signature-revealing'), 2050);
    later(() => overlay.classList.add('is-leaving'), 2350);
    later(() => complete(true), 3100);
    later(() => complete(true), 4500);
  }).catch(() => complete(true));
})();
