# TapSi Pares 24/7

A static digital-menu and business-information website, improved from the supplied HTML. No backend, database, checkout, payments, ordering, analytics or credentials are required.

## Preview locally

Open `index.html` directly in a browser, or run a static HTTP server from this folder:

```sh
npx --yes serve .
```

No compilation or dependency installation is required. The complete menu is HTML and remains readable without JavaScript. JavaScript adds category filtering, search, empty-state recovery and mobile navigation.

## Files

- `index.html`: page content, menu, business details and exact supplied contact URLs.
- `styles.css`: responsive layout and brand styling.
- `app.js`: filters, search and mobile navigation.
- `menu-data.json`: editable reference copy of all 32 original menu entries. The page is static: editing this JSON alone does **not** update the HTML. Update the matching HTML card and this reference copy together.
- `assets/`: 33 original embedded WebP images extracted byte-for-byte, plus self-hosted Anton and Inter fonts and their licenses.
- `MENU_VERIFICATION.md`: all supplied prices and details still awaiting restaurant confirmation.
- `DESIGN_NOTES.md`: design references and implementation decisions.
- `TEST_REPORT.md`: checks actually performed and limitations.
- `vercel.json`: static hosting and basic response headers.

## Content updates

Each menu `<article>` carries `data-name` and `data-category`. Keep these in sync with the displayed name and category. Add a filter button if a new category is introduced. Update the initial dish count in the HTML for the no-JavaScript fallback; JavaScript recalculates the count on load.

The address, hours caveat, phone, email, Maps URL and Facebook URL are in `index.html`. Preserve the exact verified destinations. Keep `.env` files and `.vercel` metadata out of Git.

## Deploy

Import this repository into Vercel as **Other** (static website). Root directory: repository root. No build command or install step is necessary; no environment variables are required. The project has no framework migration or build dependencies.

This is a proposed restaurant website/demo. Confirm menu prices, inclusions, current hours, business details and photo usage with the restaurant before representing it as the official restaurant website. The supplied logo itself contains an “Open 24 hours” badge; the website explicitly asks visitors to confirm hours.

NFC integration is simply encoding the final website URL onto an NFC product separately. The website works by normal URL and does not detect NFC taps.

## Source preservation

The supplied source file was not modified. Its 32 dishes, 6 categories, prices, variants, inclusions, exact contact destinations and images are retained. Original image resolution varies, and some photos contain text from the supplied menu-board crops. Higher-resolution original food photos would improve large-screen presentation; no synthetic food photos were created.
