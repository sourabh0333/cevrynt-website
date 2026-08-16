"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Three failures, side by side on the same grid as every other section.
 *
 * A single hairline runs across the top of all three with a node above each
 * column, and fills left to right as you scroll — so the row reads as one
 * connected sequence rather than three separate boxes, without breaking the
 * column rhythm. Numerals are outlined so they sit behind the copy as
 * structure instead of competing with it.
 */
export function ProblemCards({ items }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const entries = gsap.utils.toArray(".pb-item", root);
      const fill = root.querySelector(".pb-spine-fill");

      const intro = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      entries.forEach((entry, index) => {
        const num = entry.querySelector(".pb-num");
        const copy = entry.querySelector(".pb-item-copy");
        const at = index * 0.13;
        intro.fromTo(num, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.66, ease: "power3.out" }, at);
        intro.fromTo(copy, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.74, ease: "power3.out" }, at + 0.08);
      });

      if (fill) {
        gsap.set(fill, { scaleX: 0 });
        ScrollTrigger.create({
          trigger: root,
          start: "top 82%",
          end: "bottom 78%",
          onUpdate: (self) => {
            gsap.set(fill, { scaleX: self.progress });
            entries.forEach((entry, i) => {
              entry.classList.toggle("is-lit", self.progress >= (i + 0.35) / entries.length);
            });
          },
        });
      }
    });

    return () => media.revert();
  }, []);

  return (
    <div className="pb-flow" ref={scope}>
      <span className="pb-spine" aria-hidden="true">
        <span className="pb-spine-fill" />
      </span>

      <ol className="pb-list">
        {items.map(([label, title, body], index) => (
          <li className="pb-item" key={title}>
            <span className="pb-node" aria-hidden="true" />
            <span className="pb-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div className="pb-item-copy">
              <span className="hx-mono pb-label">{label}</span>
              <h3 className="pb-title">{title}</h3>
              <p className="pb-text">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
