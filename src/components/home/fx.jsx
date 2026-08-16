"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Thin read-progress bar. Scroll-driven, so it costs nothing when idle. */
export function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return undefined;

    const media = gsap.matchMedia();
    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: () => document.body.scrollHeight - window.innerHeight, scrub: 0.3 } },
      );
    });
    return () => media.revert();
  }, []);

  return (
    <div className="fx-progress" aria-hidden="true">
      <span ref={ref} />
    </div>
  );
}

/**
 * Ticker readout: digits roll up to their value once on entry, the way a market
 * readout settles. Tabular numerals keep the column from reflowing mid-count.
 */
export function Ticker({ value, className = "" }) {
  const ref = useRef(null);
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const node = ref.current;
    if (!node || target === null) return undefined;
    if (reduced() || typeof IntersectionObserver === "undefined") return undefined;

    // The final value is what renders on the server, so the number is correct
    // without JS. Writing textContent here keeps the count off React's
    // render path — no re-render per frame, and no state set during an effect.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          const counter = { n: 0 };
          gsap.to(counter, {
            n: target,
            duration: 0.9 + Math.min(target, 20) * 0.02,
            ease: "power2.out",
            onUpdate: () => {
              node.textContent = `${Math.round(counter.n)}${suffix}`;
            },
          });
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, suffix]);

  return (
    <span className={`fx-ticker ${className}`} ref={ref}>
      {value}
    </span>
  );
}

/** CTA that leans toward the cursor. Fine pointer only, so touch is unaffected. */
export function Magnetic({ children, strength = 0.32 }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current?.firstElementChild;
    if (!node) return undefined;

    const media = gsap.matchMedia();
    media.add(
      { finePointer: "(pointer: fine)", motionOk: "(prefers-reduced-motion: no-preference)" },
      ({ conditions }) => {
        if (!conditions.finePointer || !conditions.motionOk) return undefined;

        const moveX = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3" });
        const moveY = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3" });

        const onMove = (event) => {
          const rect = node.getBoundingClientRect();
          moveX((event.clientX - (rect.left + rect.width / 2)) * strength);
          moveY((event.clientY - (rect.top + rect.height / 2)) * strength);
        };
        const onLeave = () => { moveX(0); moveY(0); };

        const zone = ref.current;
        zone.addEventListener("pointermove", onMove);
        zone.addEventListener("pointerleave", onLeave);
        return () => {
          zone.removeEventListener("pointermove", onMove);
          zone.removeEventListener("pointerleave", onLeave);
        };
      },
    );
    return () => media.revert();
  }, [strength]);

  return (
    <span className="fx-magnetic" ref={ref}>
      {children}
    </span>
  );
}

/**
 * Pointer-reactive surfaces. One delegated listener per section writes --px/--py
 * on the hovered card; CSS draws the spotlight and the tilt from those values.
 * Skipped entirely on coarse pointers so phones do no continuous work.
 */
export function PointerField({ selector, tilt = false, children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    if (reduced()) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    let frame = 0;
    let pending = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;
      const { card, x, y, w, h } = pending;
      card.style.setProperty("--px", `${x}px`);
      card.style.setProperty("--py", `${y}px`);
      if (tilt) {
        card.style.setProperty("--rx", `${((y / h - 0.5) * -5).toFixed(2)}deg`);
        card.style.setProperty("--ry", `${((x / w - 0.5) * 5).toFixed(2)}deg`);
      }
    };

    const onMove = (event) => {
      const card = event.target.closest(selector);
      if (!card || !root.contains(card)) return;
      const rect = card.getBoundingClientRect();
      pending = { card, x: event.clientX - rect.left, y: event.clientY - rect.top, w: rect.width, h: rect.height };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = (event) => {
      const card = event.target.closest?.(selector);
      if (!card) return;
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerout", onLeave, { passive: true });
    root.dataset.pointerField = "on";

    return () => {
      if (frame) cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerout", onLeave);
    };
  }, [selector, tilt]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
