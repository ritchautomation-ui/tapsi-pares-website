# TapSi Pares 24/7 – premium website mockup

Single-page, no-build static site (HTML, CSS, a little JavaScript). Signature-focused landing page, cinematic background video, short food-focused intro, menu search, category filters, and the full 32-dish menu. Names and prices remain unchanged.

The 22-second silent hero loop in `assets/hero-film.mp4` comes from the supplied video. It plays inline with pause/play controls and uses `assets/hero-poster.jpg` as a fallback. Reduced-motion preferences pause and hide the video. The refreshed sizzling tokwa't baboy photo is a still from the same supplied video.

The opening is a three-second food editorial: burgundy and gold, animated “Unang tingin, craving agad.” typography, the existing signature plate photograph, and a soft dissolve into the hero video. There is no storefront or architectural animation.

`assets/signature-intro.css` and `assets/signature-intro.js` contain the dependency-free component. It plays once per fresh page load; section links and browser-history restoration bypass it. “Tuloy na” and Escape immediately reveal the page. Reduced motion, failed images, and unavailable CSS/JavaScript fall back to the homepage. A separate safety timeout releases the page if initialization fails. All existing homepage content, menu names and prices remain unchanged.

## Run locally
Open `index.html`, or run `npx serve .`

## Deploy (Vercel)
Import this repo as **Other** (no framework, no build command, no env vars). `vercel.json` only sets basic headers.

## Content that needs owner confirmation
- All 32 prices and inclusions; which menu board is current.
- Hours (listed as open 24 hours on Google Maps), address, phone, email, Facebook page.
- Permission to use the logo and every photo. Storefront photo `assets/photo-545584246-1500.jpg` carries an "EXPLORING PAMPANGA" watermark: get the original or the creator's permission.
- Spellings: Tocilong, Bistig, German, Samgy Silog.

## Photos
11 dishes use photos from the TapSi Pares Facebook page, matched by eye (not yet confirmed by the owner): Kare-kare, Sausage, Upgraded Bulalo, Braised Beef Silog, Beef Cabbage, Bean Sprouts, Sizzling Liempo, Bulgogi, Katsu, Roast Beef, Pares Silog. Other dishes keep the original menu-board images, some with a price badge baked in.

## Editing the menu
Menu cards live in `index.html` (`<article class="dish">`). Keep `data-name` and `data-category` in sync with the visible name and category.

## Not included
Checkout, online ordering, payments, reservations, delivery. The reusable multi-brand (Next.js) version is a separate later step.

## Intro validation

Browser checks cover the full animation at desktop, portrait mobile, small-phone and landscape sizes, plus all seven category filters, search/reset and intro cleanup. Independent checks cover Skip/Escape, reduced motion at load and mid-sequence, and blocked CSS/JavaScript/photo fallbacks. The existing main-page markup was compared byte-for-byte before and after the intro replacement.
