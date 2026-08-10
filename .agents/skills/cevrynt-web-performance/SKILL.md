---
name: cevrynt-web-performance
description: Enforce Cevrynt's performance-first, accessible, SEO-ready website standards. Use for every task that creates, edits, reviews, or optimizes a page, layout, component, image, animation, route, metadata file, or server data call in this Next.js project.
---

# Cevrynt Web Performance

Apply these rules to every website change.

## Brand constraints

- Use `#013e37` as the primary color, `#ffefb3` as the secondary color, and cool white (`#f7faf9`/`#fbfdfc`) for light surfaces.
- Keep the primary header edge-to-edge at the top of the page. Transition it smoothly into an inset rounded bar after scrolling.
- Use the full Cevrynt wordmark in both normal and compact header states. Do not substitute the standalone mark.

## Performance budget

- Aim for useful above-the-fold content within one second on a warm, typical connection.
- Target LCP at or below 1.5 seconds, CLS at or below 0.1, and INP at or below 200 ms.
- Prefer Server Components and static generation. Add client components only around interactions that require browser state.
- Keep critical rendering free of unnecessary JavaScript, animation libraries, third-party scripts, waterfalls, and blocking requests.
- Dynamically import heavy interactive features and load them only when needed.
- Use ISR for content that can be slightly stale; choose and document a revalidation interval based on the content.

## Images and media

- Use `next/image` with correct intrinsic dimensions and responsive `sizes`.
- Load the LCP/hero image eagerly with `priority`; never lazy-load it.
- Lazy-load all below-the-fold images, embeds, and videos.
- Write concise, meaningful `alt` text for informative images. Use `alt=""` for purely decorative images.
- Prevent layout shift by reserving media dimensions or aspect ratio.
- Prefer AVIF/WebP delivery and appropriately sized sources. Do not ship oversized desktop media to mobile.
- Use video posters and defer playback/media downloads until they are needed.

## Server-first SEO

- Render headings, body copy, navigation, links, structured data, and primary calls to action on the server. Do not depend on client effects for indexable content.
- Fetch SEO-critical content in Server Components or server utilities. Use parallel requests for independent data and avoid waterfalls.
- Use the Next.js Metadata API in Server Components. Provide unique titles, descriptions, canonical URLs, Open Graph/Twitter data, robots rules, and sitemap entries.
- Use semantic landmarks and exactly one descriptive `h1` per page, followed by a logical heading hierarchy.
- Add JSON-LD only when it accurately represents visible page content.
- Provide useful loading, empty, error, and not-found states without replacing crawlable content with client-only placeholders.

## Motion on load

- Use restrained entrance motion only when it improves hierarchy or feedback.
- Animate only `transform` and `opacity`; avoid layout-triggering properties.
- Keep entrance motion short, typically 200–500 ms, and never delay reading, clicking, LCP, or hydration.
- Ensure content is visible in server-rendered HTML and remains visible when JavaScript fails.
- Respect `prefers-reduced-motion`; provide an immediate, motion-free state.
- Prefer CSS for simple entrance/hover transitions. Use Motion or GSAP only for interactions that materially need them, and load those libraries in client-only boundaries.

## Verification

- Run lint and a production build after implementation.
- Confirm the intended routes are static or ISR in the build output.
- Check that no hero/LCP image is lazy-loaded and all below-fold media is lazy-loaded.
- Check meaningful image alt text, heading hierarchy, metadata, keyboard focus, reduced-motion behavior, and absence of avoidable client components.
- For substantial pages, verify the production experience with Lighthouse or browser performance tooling and fix regressions before handoff.
