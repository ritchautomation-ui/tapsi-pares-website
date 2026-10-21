# TapSi Pares 24/7 – premium website mockup

Single-page, no-build static site (HTML, CSS, a little JavaScript). Signature-focused landing page, cinematic background video, short food-focused intro, menu search, category filters, and the full 32-dish menu. Names and prices remain unchanged.

The 22-second silent hero loop in `assets/hero-loop-v2.mp4` comes from the supplied video. It is 30.8% smaller than the previous encode (3,568,368 → 2,467,746 bytes), retaining the same 22-second content and 576×1024 resolution. It loads after the intro only when the hero is visible, pauses offscreen, and preserves manual pause. It uses `assets/hero-poster.jpg` as a fallback. Reduced-motion and data-saver preferences default to the poster; explicit playback opts into a visible video. The refreshed sizzling tokwa't baboy photo is a still from the same supplied video.

The opening is a three-second food editorial: burgundy and gold, animated “Unang tingin, craving agad.” typography, the existing signature plate photograph, and a soft dissolve into the hero video. There is no storefront or architectural animation.

`assets/signature-intro.css` and `assets/signature-intro.js` contain the dependency-free component. It plays once per fresh page load; direct menu/story/visit links and browser-history restoration bypass it; the root page, `#home` and `#main` play the intro. A slow image connection gets up to four seconds to become ready before falling back. “Tuloy na” and Escape immediately reveal the page. Reduced motion, failed images, and unavailable CSS/JavaScript fall back to the homepage. A separate safety timeout releases the page if initialization fails. The hero has no floating food card. All 32 menu names and prices remain unchanged. Facebook, phone and email links use labeled, keyboard-accessible inline SVG icons.

## Run locally
From the repository root, run `python3 -m http.server 3000`. No dependency installation or build step is needed.

## Deploy (Vercel)
Import this repo as **Other** (no framework, no build command, no env vars). `vercel.json` sets response and cache headers. Mutable CSS/JavaScript/images revalidate; the explicitly versioned video and fonts can be cached long-term. Give replacement video/font assets a new versioned filename rather than overwriting an immutable URL.

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

## Frontend assets

`assets/site.css` and `assets/site.js` hold the main styles and interactions; the signature intro stays in its own two files. All font files are local WOFF2 subsets from Fontsource Variable 5.3.0 (Fraunces optical-size normal/italic and Hanken Grotesk normal). The npm package tarballs were verified against their published SHA-512 integrity values; font licenses are in `assets/fonts/`. There are no external font or icon requests. Photos keep their original files, accurate intrinsic dimensions, async decoding and lazy loading below the fold; CSS fixes the menu image ratio at 5:4.

## Validation

Browser checks passed at 320×720, 390×844, 568×320, 768×1024, 1024×768 and 1440×1000: no horizontal overflow, all seven category filters, search/reset, signature CTA, correctly proportioned menu photos, labeled contact icons, mobile navigation and no JavaScript errors. The 32 names and prices were compared to the previous version. Video checks cover deferred loading after intro, offscreen pause, manual pause preservation, direct section visits without video download, reduced-motion/data-saver opt-in and no-JavaScript fallback. All 49 referenced local resources and icon/navigation fragments resolve. Intro failure fallbacks and the locally hosted fonts were checked independently.
