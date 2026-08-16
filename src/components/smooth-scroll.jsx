"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Lenis animates a virtual scroll position. Without this bridge ScrollTrigger
    // reads the native position instead and every scrubbed animation lands on the
    // wrong frame, which reads as mushy, lagging motion.
    lenis.on("scroll", ScrollTrigger.update);

    // Lenis only intercepts wheel and touch. Keyboard paging, scrollbar drags, and
    // anchor jumps move native scroll instead, which would leave pinned sections
    // frozen, so update from the native event too.
    const onNativeScroll = () => ScrollTrigger.update();
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("scroll", onNativeScroll);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
