/* Progressive enhancement. All content works without this module. */
(() => {
  'use strict';
  const root = document.documentElement;
  const overlay = document.getElementById('storefront-intro');
  const skip = document.getElementById('storefront-skip');
  const camera = overlay?.querySelector('.storefront-camera');
  const images = [...(overlay?.querySelectorAll('img') || [])];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const regions = [...document.querySelectorAll('.bar, main, footer, body > .skip')];
  const animations = [];
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
    clearTimeout(window.storefrontSafety);
    animations.forEach(animation => animation.cancel());
    root.classList.remove('storefront-pending', 'storefront-active', 'storefront-revealing');
    regions.forEach(element => {
      if (element.hasAttribute('data-storefront-lock')) {
        element.inert = false;
        element.removeAttribute('data-storefront-lock');
      }
    });
    if (overlay) overlay.hidden = true;
    document.removeEventListener('keydown', onKey);
    motion.removeEventListener('change', onMotion);
    document.removeEventListener('storefront:cancel', onCancel);
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
  document.addEventListener('storefront:cancel', onCancel);
  window.addEventListener('pagehide', () => complete());
  if (!overlay || !camera || !root.classList.contains('storefront-pending') || motion.matches ||
      typeof camera.animate !== 'function' || getComputedStyle(overlay).position !== 'fixed') { complete(); return; }

  // A failed, delayed or missing image must never hold the homepage hostage.
  later(() => complete(true), 1500);
  Promise.all(images.map(image => image.decode())).then(() => {
    if (finished || !root.classList.contains('storefront-pending') || images.some(image => !image.naturalWidth) || motion.matches || document.hidden) {
      complete(); return;
    }
    timers.forEach(clearTimeout);
    timers.clear();
    started = true;
    root.classList.add('storefront-active');
    overlay.hidden = false;
    regions.forEach(element => {
      if (!element.inert) { element.inert = true; element.setAttribute('data-storefront-lock', ''); }
    });
    skip.focus({ preventScroll: true });
    skip.addEventListener('click', () => complete(true), { once: true });
    document.addEventListener('keydown', onKey);
    motion.addEventListener('change', onMotion);

    // The panels share one perfectly aligned image before the split at 1.8s.
    animations.push(camera.animate([
      { transform: 'scale(1)', offset: 0 },
      { transform: 'scale(1.025)', offset: .34 },
      { transform: 'scale(1.065)', offset: .62 },
      { transform: 'scale(1.13)', offset: 1 }
    ], { duration: 5500, easing: 'cubic-bezier(.35,0,.25,1)', fill: 'both' }));
    overlay.querySelectorAll('.storefront-panel').forEach((panel, index) => {
      const direction = index === 0 ? -1 : 1;
      animations.push(panel.animate([
        { transform: 'translate3d(0,0,0) rotateY(0deg)', opacity: 1, offset: 0 },
        { transform: `translate3d(${direction * 2}%,0,0) rotateY(${direction * -0.5}deg)`, opacity: 1, offset: .15 },
        { transform: `translate3d(${direction * 35}%,0,0) rotateY(${direction * -2}deg)`, opacity: 1, offset: .54 },
        { transform: `translate3d(${direction * 108}%,0,0) rotateY(${direction * -3}deg)`, opacity: .95, offset: 1 }
      ], { duration: 3600, delay: 1800, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'both' }));
    });
    for (const caption of overlay.querySelectorAll('.storefront-caption')) {
      animations.push(caption.animate([{ opacity: 1 }, { opacity: 0 }],
        { duration: 650, delay: 1850, fill: 'both' }));
    }
    later(() => root.classList.add('storefront-revealing'), 2700);
    later(() => complete(true), 5600);
    // Separate from animation completion, covering interrupted/cancelled animations.
    later(() => complete(true), 6500);
  }).catch(() => complete(true));
})();
