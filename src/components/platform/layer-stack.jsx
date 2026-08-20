"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The platform drawn as four layers rather than a sequence of steps.
 *
 * This is the section that separates this page from the homepage. The homepage
 * walks one deal through eight stages in order; a platform page has to say what
 * the system is *composed of*, so the same material is regrouped into four
 * layers and the visual is a stack, not a track.
 *
 * Scroll fans the deck open: the slabs start heavily overlapped and separate
 * into their natural spacing. Only transform is animated, and the resting
 * state is the readable one — with no JS or reduced motion the slabs simply
 * sit at full spacing, so nothing depends on the effect running.
 */
export function LayerStack({ layers }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const planes = gsap.utils.toArray(".ly-plane", root);
      if (!planes.length) return undefined;

      root.dataset.stacked = "true";

      // yPercent is relative to each slab's own height, so the collapse works
      // without measuring anything and survives a resize untouched.
      const tween = gsap.fromTo(
        planes,
        {
          yPercent: (i) => -i * 62,
          scale: (i) => 1 - i * 0.03,
          rotateX: 7,
        },
        {
          yPercent: 0,
          scale: 1,
          rotateX: 0,
          ease: "none",
          stagger: 0.02,
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            end: "top 28%",
            scrub: 0.6,
          },
        },
      );

      return () => {
        delete root.dataset.stacked;
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <ol className="ly" ref={scope}>
      {layers.map((layer, index) => (
        <li className="ly-plane" key={layer.name} style={{ "--i": index }}>
          <span className="hx-mono ly-num">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="ly-name">{layer.name}</h3>
          <p className="ly-q">{layer.question}</p>
          <p className="ly-body">{layer.body}</p>
        </li>
      ))}
    </ol>
  );
}
