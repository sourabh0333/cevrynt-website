"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * A product screenshot in app chrome.
 *
 * The frame reserves its aspect ratio before the image loads, so nothing shifts
 * (CLS) while the picture arrives. On entry the shot wipes open with clip-path
 * and settles from a slight over-scale; on desktop it also drifts against the
 * copy beside it. Motion is transform/clip only — no layout properties.
 *
 * Swap `src` for a real export at the same aspect ratio and nothing else changes.
 */
export function ProductShot({
  src,
  alt,
  width,
  height,
  label,
  /**
   * Display aspect for the shot box, e.g. "3 / 2". Defaults to the image's own
   * ratio. A shorter ratio crops from the bottom (object-position: top), which
   * keeps the top of a UI screenshot — the part that carries the meaning.
   */
  aspect,
  sizes = "(max-width: 860px) 92vw, 46vw",
  parallax = true,
  motion = true,
  priority = false,
  className = "",
}) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root || !motion) return undefined;

    const media = gsap.matchMedia();

    media.add(
      { motionOk: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 861px)" },
      ({ conditions }) => {
        if (!conditions.motionOk) return undefined;

        const frame = root.querySelector(".ps-frame");
        const shot = root.querySelector(".ps-shot");

        gsap.fromTo(
          frame,
          { clipPath: "inset(0% 0% 100% 0%)", y: 26 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 84%", once: true },
          },
        );

        gsap.fromTo(
          shot,
          { scale: 1.08 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "center center", scrub: 0.7 },
          },
        );

        if (parallax && conditions.wide) {
          gsap.fromTo(
            root,
            { y: 34 },
            {
              y: -34,
              ease: "none",
              scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.85 },
            },
          );
        }
      },
    );

    return () => media.revert();
  }, [parallax, motion]);

  return (
    <figure className={`ps ${className}`} ref={scope}>
      <div className="ps-frame">
        <div className="ps-chrome" aria-hidden="true">
          <span className="ps-dot" />
          <span className="ps-dot" />
          <span className="ps-dot" />
          {label ? <span className="hx-mono ps-chrome-label">{label}</span> : null}
        </div>
        <div
          className={`ps-shot${aspect ? " is-cropped" : ""}`}
          style={{ aspectRatio: aspect || `${width} / ${height}` }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        </div>
      </div>
      <figcaption className="ps-caption hx-mono">Illustrative product view. Not real borrower data.</figcaption>
    </figure>
  );
}
