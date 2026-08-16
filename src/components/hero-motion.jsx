"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroWebGLBackground } from "@/components/hero-webgl-background";

gsap.registerPlugin(ScrollTrigger);

export function HeroMotion({ children }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const media = gsap.matchMedia();
    let cleanupPointer = () => {};

    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      pointer: "(pointer: fine)",
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

      if (!conditions.motion || !conditions.pointer) return undefined;

      const bounds = () => hero.getBoundingClientRect();
      let targetX = hero.clientWidth / 2;
      let targetY = Math.min(hero.clientHeight * 0.32, 360);
      let currentX = targetX;
      let currentY = targetY;
      let frame = 0;

      const render = () => {
        currentX += (targetX - currentX) * 0.09;
        currentY += (targetY - currentY) * 0.09;
        hero.style.setProperty("--mouse-x", `${currentX}px`);
        hero.style.setProperty("--mouse-y", `${currentY}px`);
        if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.2) {
          frame = requestAnimationFrame(render);
        } else {
          frame = 0;
        }
      };

      const onPointerMove = (event) => {
        const rect = bounds();
        targetX = event.clientX - rect.left;
        targetY = event.clientY - rect.top;
        if (!frame) frame = requestAnimationFrame(render);
      };

      hero.addEventListener("pointermove", onPointerMove, { passive: true });
      cleanupPointer = () => {
        if (frame) cancelAnimationFrame(frame);
        hero.removeEventListener("pointermove", onPointerMove);
      };
      return cleanupPointer;
    });

    return () => {
      cleanupPointer();
      media.revert();
    };
  }, []);

  return (
    <section className="home-hero" ref={heroRef}>
      <HeroWebGLBackground />
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-grid-glow" aria-hidden="true" />
      <div className="hero-mouse-glow" aria-hidden="true" />
      {children}
    </section>
  );
}
