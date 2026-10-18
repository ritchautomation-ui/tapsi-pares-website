# Design direction and reference lock

18 October 2026

## References

- Primary: supplied TapSi Pares HTML and its real logo, mascot, food photography, yellow/red/charcoal palette and Anton/Inter typography.
- Secondary: Refero skill bundled craft guidance for visible keyboard focus, touch targets, label clarity and responsive controls; copywriting guidance for honest claims and clear actions.
- Live Refero search was attempted twice and returned `NO_SUBSCRIPTION`. No external style results were available or claimed.

## Locked direction

Preserve the energetic Filipino restaurant identity. Use a charcoal hero, condensed headline, dominant supplied signature food photo and yellow action buttons. Use a red photo caption and visit section. Use a light neutral menu surface for scanning dense dish/price information. No gradients, fake reviews, artificial food photos, or invented best-seller claims.

| Decision | Source and role | Reason |
|---|---|---|
| Charcoal, yellow and red | Existing brand | Keep the restaurant recognizable |
| Anton headings, Inter body | Supplied HTML | Preserve identity while clarifying hierarchy |
| Large signature-photo hero | Supplied image and user brief | Lead with actual food rather than decoration |
| Rectangular controls and restrained card borders | Brief to reduce excess rounded cards/borders | Keep attention on the food and prices |
| Light menu background | Brief permits warm neutral secondary surfaces | Make 32 dishes and prices easier to scan |
| Static menu with JS enhancement | Existing standalone architecture | No unnecessary framework or install/build requirement |
| Persistent filter buttons and live result count | Craft accessibility guidance | Keep keyboard focus stable and communicate results |
| Explicit price/hours caveats | Source comment and user brief | Do not represent unconfirmed details as verified |

## Visual QA

Inspected at 1440px desktop, 768px tablet and 390px mobile. A mobile headline spacing issue was found and fixed. Preserved the logo and all food-image mappings. Original small menu crops remain the image-quality limit.
