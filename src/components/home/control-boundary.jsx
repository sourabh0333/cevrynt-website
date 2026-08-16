"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The boundary itself, drawn.
 *
 * This section is about a line Cevrynt does not cross, so the layout is that
 * line: what the software does on the left, what stays with the lender on the
 * right, and a rule down the middle that draws as you scroll. Each pair slides
 * in from its own side and stops at the divider — the motion is the argument.
 *
 * Split guidance says one column should explain and the other carry weight, so
 * the machine side is set quiet and the authority side is set solid.
 *
 * On mobile the divider disappears and each pair stacks in narrative order:
 * what Cevrynt does, then who decides.
 */
export function ControlBoundary({ rows }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add(
      { motionOk: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 861px)" },
      ({ conditions }) => {
        if (!conditions.motionOk) return undefined;

        const items = gsap.utils.toArray(".cb-row", root);
        const fill = root.querySelector(".cb-divider-fill");

        items.forEach((row) => {
          const left = row.querySelector(".cb-machine");
          const right = row.querySelector(".cb-human");
          const node = row.querySelector(".cb-node");

          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 86%", once: true } });
          if (conditions.wide) {
            tl.fromTo(left, { x: -34, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.72, ease: "power3.out" }, 0);
            tl.fromTo(right, { x: 34, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.72, ease: "power3.out" }, 0);
          } else {
            tl.fromTo([left, right], { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.66, ease: "power3.out", stagger: 0.08 }, 0);
          }
          tl.fromTo(node, { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(2)" }, 0.24);
        });

        if (fill && conditions.wide) {
          gsap.set(fill, { scaleY: 0 });
          ScrollTrigger.create({
            trigger: root,
            start: "top 74%",
            end: "bottom 76%",
            onUpdate: (self) => {
              gsap.set(fill, { scaleY: self.progress });
              items.forEach((row, i) =>
                row.classList.toggle("is-lit", self.progress >= (i + 0.3) / items.length)
              );
            },
          });
        }
      },
    );

    return () => media.revert();
  }, []);

  return (
    <div className="cb" ref={scope}>
      <div className="cb-heads" aria-hidden="true">
        <span className="hx-mono cb-head-machine">Cevrynt does</span>
        <span className="hx-mono cb-head-human">Your team decides</span>
      </div>

      <span className="cb-divider" aria-hidden="true">
        <span className="cb-divider-fill" />
      </span>

      <ol className="cb-list">
        {rows.map(({ topic, machine, human }) => (
          <li className="cb-row" key={topic}>
            <div className="cb-machine">
              <span className="hx-mono cb-topic">{topic}</span>
              <p>{machine}</p>
            </div>

            <span className="cb-node" aria-hidden="true" />

            <div className="cb-human">
              <p>{human}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="cb-foot hx-mono">
        Cevrynt is not a lender. It does not approve, decline, or price a deal.
      </p>
    </div>
  );
}
