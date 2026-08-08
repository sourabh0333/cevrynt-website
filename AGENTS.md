# Cevrynt website

- Use Next.js App Router, React, JavaScript, JSX, and Tailwind CSS only. Do not add `.ts` or `.tsx` files.
- Prefer Server Components. Add `"use client"` only around browser-dependent interactions.
- Use Motion for React for component motion; dynamically load GSAP/ScrollTrigger for complex scroll stories; use Lenis only in the motion provider. Never let Motion and GSAP animate the same property on one element.
- Respect reduced motion, pause offscreen animation, avoid layout shifts, and preserve keyboard access and visible focus.
- Public claims must come from `src/content/site-config.js` and retain their assigned status.
- Supporting routes remain `noindex, follow` and absent from the sitemap until substantive route-specific content is approved.
- Validate with `npm run test`, `npm run lint`, and `npm run build`.
