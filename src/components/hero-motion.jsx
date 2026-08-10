"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroWebGLBackground } from "@/components/hero-webgl-background";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroMotion({ children }) {
  const heroRef = useRef(null);

  useGSAP(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const media = gsap.matchMedia();
    let cleanupPointer = () => {};

    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      pointer: "(pointer: fine)",
    }, ({ conditions }) => {
      if (conditions.motion) {
        const characters = gsap.utils.toArray(".hero-char");
        const words = gsap.utils.toArray(".hero-word");

        gsap.set(characters, { autoAlpha: 0, color: "#a7ff1c", filter: "blur(6px)", y: 3 });
        gsap.set(words, { autoAlpha: 0, color: "#a7ff1c", filter: "blur(6px)", y: 4 });

        gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => gsap.set([...characters, ...words, ".hero-signal", ".hero-actions"], { clearProps: "color,filter,opacity,visibility,transform" }),
        })
          .from(".hero-signal", { autoAlpha: 0, scale: 0.72, duration: 0.52 }, 0.08)
          .to(characters, {
            autoAlpha: 1,
            color: "#f8fbfa",
            filter: "blur(0px)",
            y: 0,
            duration: 0.62,
            stagger: { each: 0.012, from: "start" },
          }, 0.12)
          .to(words, {
            autoAlpha: 1,
            color: "rgba(248,251,250,0.78)",
            filter: "blur(0px)",
            y: 0,
            duration: 0.54,
            stagger: { each: 0.025, from: "start" },
          }, 0.42)
          .from(".hero-actions", { autoAlpha: 0, y: 8, scale: 0.985, duration: 0.58 }, 0.72);

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

      if (!conditions.motion) {
        gsap.set([".hero-char", ".hero-word", ".hero-signal", ".hero-actions"], { autoAlpha: 1, clearProps: "color,filter,opacity,visibility,transform" });
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
  }, { scope: heroRef });

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
