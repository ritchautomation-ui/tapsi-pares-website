# TapSi Pares 24/7 – premium website mockup

Single-page, no-build static site (HTML, CSS, a little JavaScript). Signature-focused landing page, cinematic background video, cinematic storefront split intro, menu search, category filters, and the full 32-dish menu. Names and prices remain unchanged.

The 22-second silent hero loop in `assets/hero-film.mp4` comes from the supplied video. It plays inline with pause/play controls and uses `assets/hero-poster.jpg` as a fallback. Reduced-motion preferences pause and hide the video. The refreshed sizzling tokwa't baboy photo is a still from the same supplied video.

The storefront intro plays once per fresh page load (not on menu interactions, direct section links, or browser history restoration). It uses two aligned copies of `assets/storefront.jpg`, an original frame at 33.3 seconds from the supplied restaurant video, cropped to the real facade without phone UI/subtitles or generated architecture. The parked car remains in the original image. Its native crop is 440×570; desktop framing prioritizes the windows and main sign, while portrait framing shows more of the entrance.

`assets/storefront-intro.css` and `assets/storefront-intro.js` contain the isolated, dependency-free component. A 1.8-second approach overlaps a 3.6-second panel opening and hero reveal, finishing at 5.6 seconds. Skip and Escape immediately reveal the homepage. Reduced motion, unavailable images, missing stylesheet/module, unsupported animation APIs and direct section navigation bypass the intro. A separate safety timeout releases the page if initialization fails. The existing hero and menu content are unchanged.

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

## Storefront intro validation

Browser checks exercised the complete sequence at 1440×1000, 1366×768, 768×1024 and 390×844, including shared image coordinates, automatic cleanup, all seven menu filters, search/reset, signature links and mobile navigation. Skip/Escape, reload replay, direct section links, JavaScript disabled, reduced motion, unavailable animation APIs, failed image/CSS/module and delayed-image dismissal were also checked. The existing main-page markup was compared byte-for-byte before and after the intro replacement. Desktop imagery is limited by the original video frame resolution; no architectural detail was generated to increase it.
