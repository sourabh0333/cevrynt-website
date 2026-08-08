"use client";

import { useEffect } from "react";

export function StoryMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return undefined;
    const sections = [...document.querySelectorAll("[data-story-environment]")];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.dataset.inView = "true";
      });
    }, { rootMargin: "-12% 0px -12% 0px", threshold: 0.14 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return null;
}
