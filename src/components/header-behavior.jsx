"use client";

import { useEffect } from "react";

export function HeaderBehavior() {
  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return undefined;
    let frame;
    let compact = window.scrollY > 8;
    const update = () => {
      frame = undefined;
      if (!compact && window.scrollY > 8) compact = true;
      if (compact && window.scrollY < 2) compact = false;
      header.toggleAttribute("data-compact", compact);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      header.querySelectorAll("details[open]").forEach((menu) => menu.removeAttribute("open"));
      if (header.contains(document.activeElement)) document.activeElement.blur();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("cevrynt-nav-sync", onScroll);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("cevrynt-nav-sync", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
