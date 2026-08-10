# Cevrynt Design System

Use this file as the source of truth for all Cevrynt marketing pages. Page-specific files under `pages/` may override it.

## Direction

- Build a lender-first, premium B2B product website optimized for qualified walkthrough bookings.
- Use light-first surfaces built from cool white and restrained green-tinted neutrals.
- Use Cevrynt primary green and soft secondary yellow consistently. Do not reintroduce the former teal, blue, or bright-yellow palette.
- Use restrained glass effects only where hierarchy benefits, such as the sticky header or product canvas.
- Keep layouts spacious, editorial, and product-led. Avoid generic AI purple, dark cinematic styling, invented social proof, and decorative dashboards without underwriting meaning.

## Tokens

| Role | Value |
|---|---|
| Primary / ink | `#013e37` |
| Muted ink | `#496761` |
| Secondary | `#ffefb3` |
| Cool-white background | `#f7faf9` |
| Cool-white surface | `#fbfdfc` |
| Soft green surface | `#edf5f3` |
| Border | `#d8e6e2` |
| Focus | `#013e37` |

Use Geist Sans for UI/body text. Use a restrained editorial serif only for major marketing headlines if it remains fast and self-hosted through `next/font`.

## Navigation

- Use a compact desktop header with grouped Platform, Product, Solutions, Partners, Company, and Resources navigation.
- Use accessible mega menus for information-dense groups, matching the screenshot's hierarchy without copying its brand styling.
- Provide visible focus, Escape-to-close behavior, and mobile navigation with 44px minimum targets.
- Start the header edge-to-edge with no outer padding. On scroll, transition smoothly into an inset rounded bar without flicker or layout shift.
- Always use the full Cevrynt wordmark in the header, including its compact scrolled state; do not replace it with the standalone mark.

## Motion

- Keep server-rendered content visible before JavaScript.
- Use transform/opacity only for entrance and pointer response.
- Keep navigation and CTA feedback within 150–300ms; use slower ambient background motion only when compositor-safe.
- Respect reduced-motion and coarse-pointer devices.

## Page structure

- Use one clear `h1`, concise supporting copy, and a qualified walkthrough CTA.
- Follow with product evidence, workflow detail, lender control, and relevant next steps.
- Use the persistent illustrative deal across the homepage product narrative.
- Do not add pricing or unsupported logos, metrics, certifications, testimonials, or guarantees.

## Quality checklist

- Verify 375px, 768px, 1024px, and 1440px layouts.
- Maintain 4.5:1 text contrast and visible focus states.
- Prevent horizontal overflow and content hidden under sticky navigation.
- Use semantic HTML, Server Components, responsive images, and reduced-motion fallbacks.
