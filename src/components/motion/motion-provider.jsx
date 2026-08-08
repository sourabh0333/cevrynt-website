"use client";

import { useEffect } from "react";

export default function MotionProvider() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchDevice = window.matchMedia("(pointer: coarse)");
    if (reducedMotion.matches || touchDevice.matches) return undefined;

    let lenis;
    let cancelled = false;

    async function initialise() {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      lenis = new Lenis({ autoRaf: true, duration: 0.9, smoothWheel: true, syncTouch: false });
    }

    initialise();
    return () => { cancelled = true; lenis?.destroy(); };
  }, []);

  return null;
}
