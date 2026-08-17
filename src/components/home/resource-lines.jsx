"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@/components/icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Resources as four lines of type. No images, no frames, no rules.
 *
 * Every previous attempt here put pictures in the layout — cards, then a lead
 * panel, then a mosaic — and each one cost the page a screen or more of height
 * for four links, with the image frames themselves reading as boxes. The page
 * already carries plenty of imagery by this point; what it needs before the
 * closing question set is something quiet and short.
 *
 * So this is type-first, which is where expressive layout has gone: oversized
 * headline type carrying the interface, and interaction communicated through
 * motion and colour rather than through chrome. Nothing here has a border, a
 * background, a shadow, or an image, and the whole section is a few hundred
 * pixels tall.
 *
 * The hover state is a fill that wipes across the title while the other rows
 * recede. It is drawn by sliding a two-stop gradient behind the glyphs with
 * `background-clip: text` — no duplicated text, no extra element, and nothing
 * for a screen reader to read twice. Guarded by @supports, so a browser without
 * background-clip keeps solid ink rather than transparent text.
 */
export function ResourceLines({ items }) {
  const scope = useRef(null);

  useGSAP(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      // Rows rise from under their own clipped edge, so the section assembles
      // line by line the way a masthead does.
      const tween = gsap.from(gsap.utils.toArray(".rx-inner", root), {
        yPercent: 108,
        duration: 0.86,
        ease: "power3.out",
        stagger: 0.075,
        scrollTrigger: { trigger: root, start: "top 84%", once: true },
      });

      return () => tween.scrollTrigger?.kill();
    });

    return () => media.revert();
  }, []);

  return (
    <ul className="rx" ref={scope}>
      {items.map(({ kind, title, href, meta }) => (
        <li className="rx-row" key={href}>
          <span className="rx-clip">
            <span className="rx-inner">
              <Link className="rx-link" href={href}>
                <span className="hx-mono rx-kind">{kind}</span>

                <span className="rx-title">{title}</span>

                <span className="hx-mono rx-meta">{meta}</span>
                <span className="rx-cue" aria-hidden="true"><ArrowUpRight /></span>
              </Link>
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
