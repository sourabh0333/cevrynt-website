# Cevrynt Marketing Website — Canonical Project Context

Last updated: 2026-08-10

This is the durable handoff document for Claude Code and other coding agents working on the Cevrynt launch website. Read this file before making product, copy, design, navigation, animation, SEO, performance, caching, or asset decisions.

## Authority and required reading

The following files remain authoritative and must be read before website work:

- `AGENTS.md`
- `.agents/skills/cevrynt-web-performance/SKILL.md`
- `.agents/skills/cevrynt-product-context/SKILL.md`
- `design-system/cevrynt/MASTER.md`
- Relevant Next.js 16 documentation under `node_modules/next/dist/docs/`

If this document conflicts with those files, follow the most specific product constraint and the safest performance/accessibility rule. Update this file whenever a durable project decision changes.

## Technical baseline

- Framework: Next.js `16.3.0`, App Router.
- React: `19.2.8`.
- Language: JavaScript and JSX only. Never add TypeScript or TSX.
- Package manager: pnpm.
- Motion libraries installed: GSAP `3.15`, `@gsap/react`, and Motion `13`.
- Prefer Server Components, static generation, and ISR. Keep interactive client boundaries small.
- Homepage currently uses `export const revalidate = 3600`.
- Development must not serve stale page content. `next.config.js` applies development no-cache headers and image cache TTL `0`.
- `DevelopmentCacheReset` may clear Cache Storage and unregister service workers in development, but must never reload the page on `pageshow`, focus, or visibility changes.
- Do not add service workers or persistent browser caching during active development without explicit approval.

## Product definition

Cevrynt is an early-stage AI underwriting and decision-intelligence platform for U.S. alternative lenders, initially focused on merchant cash advance and SMB finance.

Preferred positioning:

> From borrower documents to decision-ready underwriting.

Cevrynt structures borrower documents and business signals into analysis for human underwriters. It supports:

- Document structuring and source-linked extraction.
- Bank-statement, cash-flow, deposit, balance, and transaction analysis.
- Business verification.
- Fraud and risk signals.
- Lender-specific policy evaluation.
- Reviewer notes, overrides, and audit history.
- Evidence-linked underwriting reports.

Canonical workflow:

> Intake → Documents → Financials → Verification → Fraud → Policy → Report → Human Decision

Cevrynt is AI-assisted infrastructure. It is not a lender, does not make or guarantee funding offers, and does not replace lender judgment. Lenders retain final approval authority.

## Audiences and conversion goal

Primary audiences:

- MCA funders.
- Alternative lenders and revenue-based finance companies.
- Underwriting, credit, risk, and operations teams.

Secondary audiences:

- Brokers and ISOs.
- Commerce platforms.
- Embedded-finance partners.

The website is optimized for qualified demo/walkthrough bookings, not broad self-serve signups or public pricing.

Conversion details:

- Demo/Calendly: `https://calendly.com/arin-cevrynt/cevrynt-demo`
- Founder-led sales: `arin@cevrynt.com`
- Sales enquiries: `sales@cevrynt.com`
- Sign In should link to the separate Cevrynt application through `siteConfig.appUrl`.
- Current top-level CTA label: `Get Demo` / `Get a demo` depending on available space.
- Other approved CTA language: `Book a walkthrough`, `Discuss a pilot`, and `Talk to the founder`.

## Claims and trust rules

Never fabricate or imply:

- Customers, testimonials, pilots, contracts, or revenue.
- Certifications, regulatory endorsements, or security claims not documented.
- Live integrations that do not exist.
- Performance metrics, approval rates, accuracy, guarantees, or universal eligibility.
- Public pricing.

Cevrynt has a functional MVP internally evaluated using 200+ real-world underwriting files. Do not publish this proof point unless the user explicitly approves it.

Use one persistent illustrative deal across homepage product storytelling and label it clearly as illustrative. Current illustrative deal: `Cedar & Stone LLC`.

## Cevrynt × SHOPLINE language

Describe Cevrynt × SHOPLINE only as a documented development and referral partnership around e-commerce merchant-underwriting workflows.

Never imply a generally available live integration, investment, exclusivity, endorsement, automatic data sharing, universal merchant eligibility, or guaranteed funding.

## Information architecture

Core pages:

- Home
- Platform
- Why Cevrynt
- Integrations
- Security
- Pilot

Product pages:

- Document Intelligence
- Bank Statement Analysis
- Business Verification
- Fraud Signals
- Policy Engine
- Underwriting Report

Solution pages:

- Merchant Cash Advance
- Alternative Lenders
- Brokers/ISOs
- E-commerce Merchant Underwriting

Partner page:

- Cevrynt × SHOPLINE

Company pages:

- About
- Investors
- Contact

Resource pages:

- Resources
- Blog
- Article
- FAQ

Legal pages:

- Privacy
- Terms
- Cookie Policy

Homepage order:

> Header → product-led hero → connected underwriting canvas → credibility → fragmented-workflow problem → sticky intake-to-report journey → financial analysis → verification/fraud → policy evaluation → evidence-backed report → Why Cevrynt → SHOPLINE → founder-led pilot → resources → Calendly CTA → footer

## Visual direction

The site should feel like a premium, lender-first B2B product website: clean, editorial, spacious, credible, and product-led.

Brand tokens:

- Primary: `#013e37`
- Secondary: `#ffefb3`
- Cool-white background: `#f7faf9`
- Cool-white surface: `#fbfdfc`
- Soft green surface: `#edf5f3`
- Muted ink: `#496761`
- Border: `#d8e6e2`

Use Geist Sans for interface/body text and a restrained, fast editorial serif for major marketing headings. Avoid generic AI-purple styling, excessive glass, decorative dashboards without underwriting meaning, or invented social proof.

Middesk screenshots and `https://www.middesk.com/` are interaction and composition references, not a license to copy its branding, copy, or proprietary assets. Match the qualities the user values: clean hierarchy, professional spacing, concise content, restrained motion, a floating header, a strong product preview, and subtle ambient color movement.

21st.dev may be used as a component-reference source. Adapt components to Cevrynt’s design system, accessibility, performance budget, and product context.

## Current hero direction

- Hero begins at the top of the viewport; the initial navbar floats over the same hero background rather than sitting on a separate strip.
- Preferred H1: `From borrower documents to decision-ready underwriting.`
- Current supporting line: `Turn borrower documents and business signals into evidence-linked analysis for human underwriting.`
- On desktop, supporting copy should remain one clean line where practical.
- Use one focused CTA rather than several competing hero actions.
- Keep the dashboard partially visible below the hero copy, similar to the reference composition.
- Use the real illustrative Cevrynt product preview, not a fake decorative dashboard.
- The hero/dashboard image is above the fold and must use `next/image`, intrinsic dimensions, `priority`, and `loading="eager"`.
- Current preferred image: `/media/cevrynt-dashboard-website-analytics.webp`.
- Preserve the folded hero/dashboard silhouette: folded top-left visual edge, rounded lower-left edge, and folded lower-right ending. Do not distort the source image or logo shape.
- Background motion should be subtle, smooth, compositor-friendly, and continuous across the hero and initial navbar.
- Pointer response should use one soft follower/glow, not multiple snake-like trails.
- Do not add a permanently visible dot-matrix field merely because early references appeared to contain one. Decorative texture must be restrained and visually validated.

Hero entrance motion:

- Server-rendered content must be visible without JavaScript.
- Use a restrained line-by-line heading reveal, followed by the supporting line and CTA.
- Avoid heavy blur, noisy character-by-character color changes, or long unreadable reveal states.
- Animate only transform and opacity for entrances.
- Respect `prefers-reduced-motion`.

## Header and navigation behavior

Desktop initial state:

- Edge-to-edge, transparent, and visually part of the hero.
- Use the full white Cevrynt wordmark, never only the standalone icon.
- Keep the wordmark compact so it does not dominate the navigation.
- Navigation groups: Platform, Product, Solutions, Partners, Company, Resources.
- Right side: Sign In separated from a compact Get Demo button.

Desktop compact/menu-open state:

- On the first meaningful scroll, transition once into an inset rounded bar.
- Do not progressively shrink through multiple sizes.
- Use transform/opacity wherever possible and avoid layout-jumping animations.
- The compact bar may be slightly darker than the hero, but must remain within the same green family.
- Mega menus must match the navbar surface color.
- Mega menus open on click, close on outside click or Escape, and switch cleanly when another menu is selected.
- Active desktop navigation uses an animated underline only, never a box border.
- Keep mega menus compact, use meaningful vector icons, and vary motion appropriately without making every panel feel identical.
- Product/Solutions visual panels may use an animated globe focused on the full continental USA while retaining surrounding geographic context.

Mobile initial state:

- Show the compact full Cevrynt wordmark, a text `Get a demo` link, and a hamburger button.
- Minimum touch target: 44×44px.

Mobile compact-on-scroll state:

- Visually show only the fixed hamburger control, matching the reference behavior.
- Keep one stable full-width fixed header layer underneath; hide the logo/quick CTA with opacity/visibility and do not resize the fixed header container to the button width.
- The hamburger must remain fully within the viewport and clickable in real iPhone Safari and Chrome.
- The header must never disappear during up/down scrolling.
- Opening and closing the mobile menu should not trigger page reloads, blank frames, or background flashes.
- Mobile submenu transitions should be slower, directional, and continuous; do not unmount the old panel before the exit motion completes.
- Lock body scrolling only while the overlay is open and restore it on close.

## CTA behavior

- Header and hero CTAs should share one polished motion language.
- Default surface is cool white with primary-green text.
- Hover replaces background and content from bottom to top; hover-out reverses smoothly from top to bottom.
- Do not animate text separately in a way that leaves ghost text or mismatched timing.
- Use transform/opacity and keep the movement deliberate rather than fast.
- Current hero CTA target size is approximately `154 × 42px` on desktop and `128 × 36px` on mobile (≤560px), intentionally smaller to match a lighter, more restrained mobile hero.

## Logos, icons, and assets

Original source assets supplied by the user:

- `/Users/arinpr/Documents/Cevrynt/Assets/cevrynt-logo-full-onlight.png`
- `/Users/arinpr/Documents/Cevrynt/Assets/cevrynt-mark-solid.png`
- `/Users/arinpr/Documents/Cevrynt/Assets/SHOPLINE-LOGO-e1666071627669-768x269.png`
- `/Users/arinpr/Downloads/cevrynt-dashboard-website.webp`

Project assets currently include:

- `/public/brand/cevrynt-logo-v2.png`
- `/public/brand/cevrynt-logo.svg`
- `/public/brand/cevrynt-mark-v2.png`
- `/public/brand/cevrynt-favicon-v3.ico`
- `/public/brand/cevrynt-favicon.svg`
- `/public/brand/cevrynt-favicon-96.png`
- `/public/brand/cevrynt-apple-icon-v3.png`
- `/public/brand/cevrynt-icon-192-v3.png`
- `/public/brand/cevrynt-icon-512-v3.png`
- `/public/brand/shopline-logo.png`
- `/public/media/cevrynt-dashboard-website.webp`
- `/public/media/cevrynt-dashboard-website-analytics.webp`

Logo rules:

- Never alter, redraw, crop, stretch, round, outline, or distort the supplied Cevrynt/SHOPLINE artwork.
- Do not add keylines or lighter background patches behind the Cevrynt logo.
- Use the white full Cevrynt wordmark in the dark header.
- Use the solid mark for favicons/app icons where appropriate, preserving its exact shape.
- Optimizing file weight and dimensions is allowed; changing geometry or brand styling is not.

## Motion and design skills

For design/motion work, use the locally installed skills when relevant:

- Modern design guidance originating from `freshtechbro/claudedesignskills` (represented by the project design system and installed design skills).
- `motion-dev-animations` for Motion-based component transitions.
- Official GSAP skills, especially `gsap-core`, `gsap-react`, `gsap-timeline`, `gsap-scrolltrigger`, and `gsap-performance`.
- Use Higgsfield only when original visual assets would materially improve the website and the user has approved the asset-generation scope.
- Use Seedance only for an approved product-explainer or campaign video. Do not invoke it for ordinary website animation.

Performance rules for motion:

- Prefer CSS for simple hover/entrance transitions.
- Use GSAP/Motion only where sequencing or interruption materially benefits the result.
- Use transforms and opacity; avoid animating width, height, top, left, padding, or margins.
- Avoid continuous work on coarse-pointer/mobile devices.
- Use `gsap.quickTo()` or a single requestAnimationFrame interpolation loop for pointer followers.
- Clean up timelines, listeners, frames, and ScrollTriggers.
- Avoid multiple simultaneous ambient effects that make scrolling feel heavy.

## Performance, SEO, and caching requirements

Targets:

- Useful above-the-fold content within about one second on a warm typical connection.
- LCP ≤ 1.5s.
- CLS ≤ 0.1.
- INP ≤ 200ms.

Implementation requirements:

- Render SEO-critical headings, body copy, navigation, links, and CTAs on the server.
- Exactly one descriptive H1 per page and a logical heading hierarchy.
- Use the Metadata API with unique title, description, canonical, Open Graph/Twitter, robots, and sitemap coverage.
- Use JSON-LD only when it accurately reflects visible content.
- Use ISR/static rendering for marketing content; document revalidation choices.
- Use `next/image` with intrinsic dimensions and accurate `sizes`.
- Eager/priority-load only the LCP image; lazy-load below-fold media.
- Use meaningful alt text for informative images and empty alt text for decoration.
- Reserve layout space to prevent CLS.
- Dynamically import heavy below-fold interactions.
- Avoid third-party scripts in the critical path.
- Do not add fingerprinting or invasive visitor tracking. Any analytics/consent implementation must be privacy-aware and explicitly approved.

## Verification checklist

Before handing off website changes:

1. Run `pnpm lint` or `npm run lint`.
2. Run a production build when no other build is active.
3. Confirm intended routes are static/ISR in build output.
4. Verify desktop widths at 1024px and 1440px.
5. Verify mobile widths at 375px/390px and tablet at 768px.
6. Test real mobile navigation behavior: initial state, scroll compaction, tap, submenu, back, close, reopen, and repeated up/down scrolling.
7. Confirm no horizontal overflow, white flashes, disappearing header, or overscroll flicker.
8. Confirm hero LCP image is eager/priority and below-fold media is lazy.
9. Confirm keyboard focus, Escape-to-close, outside-click close, and reduced-motion behavior.
10. Confirm no fabricated claims and that lenders retain final authority.

## Important current implementation files

- `src/app/page.jsx` — homepage server-rendered structure.
- `src/app/globals.css` — global design, hero, header, navigation, CTA, and responsive styles.
- `src/components/site-header.jsx` — header composition and brand image.
- `src/components/header-behavior.jsx` — scroll/compact header state.
- `src/components/desktop-navigation.jsx` — desktop navigation and mega menus.
- `src/components/mobile-navigation.jsx` — mobile overlay and submenu interactions.
- `src/components/animated-hero-copy.jsx` — semantic hero copy.
- `src/components/hero-motion.jsx` — GSAP hero entrance and pointer response.
- `src/components/hero-webgl-background.jsx` — optional hero background effect; keep it lightweight and disabled where inappropriate.
- `src/components/development-cache-reset.jsx` — development-only cache cleanup; never use it to reload on visibility/focus.
- `src/components/timed-demo-popup.jsx` — delayed demo prompt; avoid fingerprinting.
- `src/content/site-pages.js` — page and navigation content.
- `src/config/site.js` — external application URL and site configuration.
- `next.config.js` — caching and image configuration.

## Working style for future agents

- Inspect current behavior before adding another override.
- Prefer fixing the underlying state/layout model over stacking CSS patches.
- Preserve existing user changes and avoid destructive Git operations.
- Keep decisions consistent across desktop, tablet, and real mobile browsers.
- When using a reference screenshot, compare proportions, hierarchy, spacing, and interaction—not only color.
- Never claim a UI issue is fixed solely from lint. Verify the rendered behavior at the relevant viewport and interaction state.
