"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP = { motionOk: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 861px)" };

/**
 * Sticky card stack. Each panel pins in turn and the one beneath recedes as the
 * next covers it. Sticky positioning does the pinning; GSAP only adds the depth,
 * so nothing breaks if the tween never runs.
 */
export function StackCards({ selector = ".stack-item", children, className = "" }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();
    media.add(DESKTOP, ({ conditions }) => {
      if (!conditions.motionOk || !conditions.wide) return undefined;

      const cards = gsap.utils.toArray(selector, root);

      cards.map((card) =>
        gsap.from(card.firstElementChild || card, {
          y: 40,
          autoAlpha: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        }),
      );

      cards.map((card, index) => {
        if (index === cards.length - 1) return null;
        return gsap.to(card, {
          scale: 0.965,
          yPercent: -2,
          opacity: 0.62,
          ease: "none",
          scrollTrigger: { trigger: cards[index + 1], start: "top 90%", end: "top 40%", scrub: true },
        });
      });
    });

    return () => media.revert();
  }, [selector]);

  return (
    <div className={`stack ${className}`} ref={scope}>
      {children}
    </div>
  );
}

/**
 * Clip-path unmask driven by scroll. The panel wipes open from the bottom edge
 * as it crosses the viewport, then holds.
 */
export function MaskReveal({ selector = ".mask-item", children, className = "" }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();
    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const items = gsap.utils.toArray(selector, root);
      items.map((item) =>
        gsap.fromTo(
          item,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: item, start: "top 88%", end: "top 42%", scrub: 0.6 },
          },
        ),
      );
    });

    return () => media.revert();
  }, [selector]);

  return (
    <div className={className} ref={scope}>
      {children}
    </div>
  );
}

/**
 * Staggered blinds. Slats sweep away in sequence to uncover the content beneath,
 * which reads as a shutter opening rather than a fade.
 */
export function Blinds({ slats = 6, children, className = "" }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();
    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const bars = gsap.utils.toArray(".blinds-slat", root);
      gsap.to(bars, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 0.78,
        ease: "power3.inOut",
        stagger: 0.055,
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      });
    });

    return () => media.revert();
  }, [slats]);

  return (
    <div className={`blinds ${className}`} ref={scope}>
      {children}
      <div className="blinds-cover" aria-hidden="true">
        {Array.from({ length: slats }, (_, i) => (
          <span className="blinds-slat" key={i} />
        ))}
      </div>
    </div>
  );
}

/** Background layers drifting at different rates to give a band real depth. */
export function ParallaxLayers({ className = "" }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();
    media.add(DESKTOP, ({ conditions }) => {
      if (!conditions.motionOk || !conditions.wide) return undefined;

      const layers = gsap.utils.toArray(".px-layer", root);
      layers.map((layer, index) =>
        gsap.fromTo(
          layer,
          { yPercent: -8 * (index + 1) },
          {
            yPercent: 8 * (index + 1),
            ease: "none",
            scrollTrigger: { trigger: root.parentElement, start: "top bottom", end: "bottom top", scrub: 0.9 },
          },
        ),
      );
    });

    return () => media.revert();
  }, []);

  return (
    <div className={`px ${className}`} ref={scope} aria-hidden="true">
      <span className="px-layer px-a" />
      <span className="px-layer px-b" />
      <span className="px-layer px-c" />
    </div>
  );
}

/** Gentle scale-out as a figure travels up the viewport. */
export function ScaleOnScroll({ selector = ".scale-item", children, className = "" }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();
    media.add(DESKTOP, ({ conditions }) => {
      if (!conditions.motionOk || !conditions.wide) return undefined;

      const items = gsap.utils.toArray(selector, root);
      items.map((item) =>
        gsap.fromTo(
          item,
          { scale: 1.06 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "center center", scrub: 0.8 },
          },
        ),
      );
    });

    return () => media.revert();
  }, [selector]);

  return (
    <div className={className} ref={scope}>
      {children}
    </div>
  );
}
