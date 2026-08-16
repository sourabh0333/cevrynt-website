"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * Audience routing as an asymmetric bento rather than four identical boxes.
 *
 * MCA leads at double size because it is the stated entry market, so the
 * layout carries the positioning instead of flattening every audience into the
 * same tile. Each card also runs a vertical spine down its left edge — the
 * label reads like the tab on a pulled file, which suits a product whose job
 * is organising documents.
 *
 * Cards are links, so pointer and keyboard reach the same destinations; hover
 * only changes emphasis.
 */
export function AudienceRouter({ audiences }) {
  const scope = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const cards = gsap.utils.toArray(".ar-card", root);

      // gsap.from hides the cards immediately and only reveals them when the
      // trigger fires. If anything stops that firing the section reads as empty,
      // so skip the animation entirely when the row is already on screen.
      if (root.getBoundingClientRect().top < window.innerHeight * 0.85) return undefined;

      gsap.from(cards, {
        y: 46,
        autoAlpha: 0,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
    });

    return () => media.revert();
  }, []);

  return (
    <div className="ar" ref={scope} onMouseLeave={() => setActive(0)}>
      {audiences.map((audience, index) => (
        <Link
          className={`ar-card${active === index ? " is-active" : ""}`}
          key={audience.path}
          href={`/${audience.path}`}
          data-size={index === 0 ? "lead" : "compact"}
          onMouseEnter={() => setActive(index)}
          onFocus={() => setActive(index)}
        >
          <span className="ar-spine" aria-hidden="true">
            <span className="hx-mono ar-spine-text">{String(index + 1).padStart(2, "0")}</span>
          </span>

          <span className="ar-inner">
            <span className="ar-top">
              <span className="hx-mono ar-kind">{index === 0 ? "Primary market" : "Also built for"}</span>
              <span className="ar-cue" aria-hidden="true"><ArrowUpRight /></span>
            </span>

            <h3 className="ar-title">{audience.title}</h3>
            <p className="ar-desc">{audience.description}</p>

            {index === 0 ? (
              <ul className="ar-points">
                {audience.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
          </span>
        </Link>
      ))}
    </div>
  );
}
