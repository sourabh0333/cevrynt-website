"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@/components/icons";
import { ProductShot } from "@/components/home/product-shot";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky card stack. Each outcome pins a little lower than the one before, so
 * the deck visibly stacks, and the card underneath recedes as the next covers
 * it. Sticky positioning does the pinning — GSAP only adds the depth — so the
 * sequence still reads correctly if the tween never runs.
 *
 * Cards are opaque by design: a translucent card would show the deck through it.
 */
export function BenefitRows({ rows }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add(
      { motionOk: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 861px)" },
      ({ conditions }) => {
        if (!conditions.motionOk) return undefined;

        const cards = gsap.utils.toArray(".br-card", root);

        cards.forEach((card, index) => {
          gsap.from(card.querySelector(".br-card-inner"), {
            y: 46,
            autoAlpha: 0,
            duration: 0.78,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 86%", once: true },
          });

          if (!conditions.wide || index === cards.length - 1) return;

          gsap.to(card, {
            scale: 0.965,
            yPercent: -2,
            opacity: 0.62,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 88%",
              end: "top 34%",
              scrub: true,
            },
          });
        });
      },
    );

    return () => media.revert();
  }, []);

  return (
    <div className="br" ref={scope}>
      {rows.map((row, index) => (
        <article className="br-card" key={row.title} style={{ "--card": index }}>
          <div className="br-card-inner">
            <div className="br-copy">
              <span className="hx-mono br-label">{row.label}</span>
              <h3 className="t-display-3">{row.title}</h3>
              <p className="t-lede">{row.body}</p>
              <ul className="br-points">
                {row.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link className="br-link" href={row.href}>
                {row.linkLabel} <ArrowUpRight />
              </Link>
            </div>

            <div className="br-figure">
              <ProductShot
                src={row.image}
                alt={row.imageAlt}
                width={1600}
                height={1000}
                label={row.caption}
                sizes="(max-width: 860px) 88vw, 42vw"
                parallax={false}
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
