# TapSi Pares 24/7 – premium website mockup

Single-page, no-build static site (HTML, CSS, a little JavaScript). Signature-focused landing page, cinematic background video, menu search, category filters, and the full 32-dish menu. Names and prices remain unchanged.

The 22-second silent hero loop in `assets/hero-film.mp4` comes from the supplied video. It plays inline with pause/play controls and uses `assets/hero-poster.jpg` as a fallback. Reduced-motion preferences pause and hide the video. The refreshed sizzling tokwa't baboy photo is a still from the same supplied video.

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
