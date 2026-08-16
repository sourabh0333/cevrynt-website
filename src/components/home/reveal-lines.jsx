"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

/**
 * Line-mask heading reveal. Each line sits in an overflow-clipped wrapper and
 * rises from below its own edge.
 *
 * SplitText only measures here — the animation is a CSS transition per line and
 * the trigger is an IntersectionObserver. That is deliberate: an earlier version
 * created a ScrollTrigger inside `onSplit`, and because `autoSplit` re-splits
 * when webfonts land, that creation could land in the middle of a ScrollTrigger
 * refresh and throw ("cannot read properties of undefined (reading 'end')").
 * It only showed on a cold load, because a warm load has the fonts cached and
 * the re-split never happens. Keeping ScrollTrigger out of the split path
 * removes the race rather than trying to time around it.
 *
 * The hidden state is only armed once JS has confirmed motion is wanted and the
 * heading is still below the fold, so text is never left invisible.
 */
export function RevealLines({
  as: Tag = "h2",
  text,
  className = "",
  split = "lines",
  delay = 0,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (typeof IntersectionObserver === "undefined") return undefined;

    let instance = null;
    let observer = null;

    try {
      instance = SplitText.create(node, {
        type: split,
        mask: split,
        autoSplit: true,
        linesClass: "rl-line",
        charsClass: "rl-char",
        onSplit: (self) => {
          const targets = split === "chars" ? self.chars : self.lines;
          // Index drives the per-line stagger from CSS, so re-splits stay correct.
          targets?.forEach((el, i) => el.style.setProperty("--i", i));
          return undefined;
        },
      });
    } catch {
      return undefined;
    }

    // Already on screen: show it as-is rather than animating something the
    // reader is looking at.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) {
      instance?.revert();
      return undefined;
    }

    node.dataset.armed = "";
    if (delay) node.style.setProperty("--rl-delay", `${delay}ms`);

    const reveal = () => {
      node.dataset.revealed = "";
      observer?.disconnect();
      window.clearInterval(safety);
    };

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(node);

    // Safety net: armed text is invisible, so if the observer never delivers
    // (blocked, suspended, disconnected) fall back to revealing once the
    // heading is actually within the viewport. Gated on being in view so it
    // cannot pre-empt the animation for headings further down the page.
    const safety = window.setInterval(() => {
      if (node.dataset.revealed !== undefined) return window.clearInterval(safety);
      const r = node.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) reveal();
    }, 1200);

    return () => {
      observer?.disconnect();
      window.clearInterval(safety);
      instance?.revert();
    };
  }, [text, split, delay]);

  return (
    <Tag className={`rl ${className}`} ref={ref} {...rest}>
      {text}
    </Tag>
  );
}
