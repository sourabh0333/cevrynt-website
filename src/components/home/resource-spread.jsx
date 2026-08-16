"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * Resources as a magazine contents spread: one lead entry held open on the
 * left, the full index as a rail on the right, and moving through the rail
 * promotes an entry into the lead slot.
 *
 * The pattern is picked to avoid repeating the page. A card grid was wrong for
 * the reasons every other section here avoids one, and a hairline index with a
 * cursor-borne preview is already what "Why Cevrynt" does — running it twice
 * would make the two sections read as the same component. An anchored lead that
 * swaps is a different interaction: the preview holds still and large enough to
 * actually look at, and the rail stays a scannable list of everything on offer.
 *
 * Accessibility shape: the rail carries the real links, so all four resources
 * are server-rendered, crawlable and keyboard reachable, and focus promotes the
 * same way hover does. The lead is a visual echo of whichever entry is active —
 * hidden from assistive tech and removed from the tab order — so nothing is
 * announced twice, while pointer users can still click the big preview.
 */
export function ResourceSpread({ items }) {
  const scope = useRef(null);
  const [active, setActive] = useState(0);
  const lead = items[active];

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 82%", once: true } });

      tl.from(root.querySelector(".rp-lead-media"), {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.92,
        ease: "power3.out",
      }, 0);

      // The lead copy is deliberately not tweened here. It carries a keyframe
      // animation keyed on the active index so it replays on every swap, and a
      // CSS animation outranks GSAP's inline styles — the two would fight, with
      // the animation's `both` fill winning permanently.

      tl.from(gsap.utils.toArray(".rp-row-rule", root), {
        scaleX: 0,
        duration: 0.8,
        ease: "power3.inOut",
        stagger: 0.07,
      }, 0.16);

      tl.from(gsap.utils.toArray(".rp-row-num, .rp-row-main", root), {
        y: 16,
        autoAlpha: 0,
        duration: 0.58,
        ease: "power3.out",
        stagger: 0.05,
      }, 0.3);
    });

    return () => media.revert();
  }, []);

  return (
    <div className="rp" ref={scope}>
      <div className="rp-lead" aria-hidden="true">
        <Link className="rp-lead-link" href={lead.href} tabIndex={-1}>
          <span className="rp-lead-media">
            {items.map(({ href, image }, index) => (
              <span className={`rp-shot${index === active ? " is-active" : ""}`} key={href}>
                <Image
                  src={image}
                  alt=""
                  width={900}
                  height={560}
                  loading="lazy"
                  sizes="46vw"
                />
              </span>
            ))}
            <span className="hx-mono rp-lead-kind">{lead.kind}</span>
          </span>

          {/* Keyed on the active index so the copy replays its entrance each
              time the lead changes, rather than swapping instantly. */}
          <span className="rp-lead-copy" key={active}>
            <span className="rp-lead-title">{lead.title}</span>
            <span className="hx-mono rp-lead-meta">
              {lead.meta}
              <ArrowUpRight />
            </span>
          </span>
        </Link>
      </div>

      <ul className="rp-rail">
        {items.map(({ kind, title, href, image, meta }, index) => (
          <li
            className={`rp-row${index === active ? " is-active" : ""}`}
            key={href}
            onPointerEnter={() => setActive(index)}
          >
            <Link className="rp-row-link" href={href} onFocus={() => setActive(index)}>
              <span className="rp-row-rule" aria-hidden="true" />
              <span className="hx-mono rp-row-num">{String(index + 1).padStart(2, "0")}</span>

              <span className="rp-row-main">
                <span className="rp-row-title">{title}</span>
                <span className="hx-mono rp-row-kind">
                  {kind}
                  <i aria-hidden="true" />
                  {meta}
                </span>
              </span>

              {/* Touch has no hover to drive the lead panel, so each row keeps
                  its own thumbnail there instead. */}
              <span className="rp-row-thumb" aria-hidden="true">
                <Image src={image} alt="" width={900} height={560} loading="lazy" sizes="110px" />
              </span>

              <span className="rp-row-cue" aria-hidden="true"><ArrowUpRight /></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
