"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero entrance motion.
 *
 * The background used to run two systems at once: a WebGL shader, and — beneath
 * it — a stack of CSS layers animating `background-position` and
 * `background-color` across the full 957px hero, plus a requestAnimationFrame
 * loop driving a pointer-following glow. When the shader started, those layers
 * were only set to `opacity: 0`, which hides them but does not stop a single
 * frame of their work. So the page paid for both the whole time and showed one.
 *
 * All of it is gone. The background is now three pre-painted gradient fields
 * that only ever move (see .hero-aurora), which is compositor work instead of
 * paint work, and this component is back to what it should have been: the
 * entrance timeline and nothing else.
 */
export function HeroMotion({ children }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const media = gsap.matchMedia();

    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
    }, ({ conditions }) => {
      if (conditions.motion) {
        const headingLines = gsap.utils.toArray(".hero-line-text, .page-hero-dark-heading");

        gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => gsap.set([...headingLines, ".home-hero-lede", ".hero-signal", ".hero-actions"], { clearProps: "opacity,visibility,transform" }),
        })
          .from(".hero-signal", { autoAlpha: 0, y: 8, scale: 0.84, duration: 0.5 }, 0.08)
          .from(headingLines, { autoAlpha: 0, y: 24, duration: 0.72, stagger: 0.1 }, 0.16)
          .from(".home-hero-lede", { autoAlpha: 0, y: 12, duration: 0.58 }, 0.48)
          .from(".hero-actions", { autoAlpha: 0, y: 10, duration: 0.58 }, 0.62);

        if (document.querySelector(".hero-dashboard-wrap")) {
          gsap.from(".hero-dashboard-frame", {
            autoAlpha: 0,
            y: 30,
            scale: 0.985,
            duration: 0.96,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".hero-dashboard-wrap",
              start: "top 96%",
              once: true,
            },
          });
        }
      }

      if (!conditions.motion) {
        gsap.set([".hero-line-text", ".page-hero-dark-heading", ".home-hero-lede", ".hero-signal", ".hero-actions"], { autoAlpha: 1, clearProps: "opacity,visibility,transform" });
      }

      return undefined;
    });

    return () => media.revert();
  }, []);

  return (
    <section className="home-hero" ref={heroRef}>
      {/* Three gradient fields that only ever move. No shader, no pointer
          loop, no animated background-position anywhere behind this. */}
      <div className="hero-aurora" aria-hidden="true">
        <span className="hero-aurora-a" />
        <span className="hero-aurora-b" />
        <span className="hero-aurora-c" />
      </div>
      {children}
    </section>
  );
}
