"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Three values, each lifting to show what is underneath it.
 *
 * Built in the layer stack's vocabulary rather than as another diagram: solid
 * planes, one large typographic element each, and a single physical
 * transformation. Earlier versions of this section were dense and
 * chrome-heavy — frames, chips, pins, panels — which is why they never sat
 * beside section 01 comfortably. This is the same material, inverted: paper-
 * white planes on the deep band, where 01 is deep slabs on the light one.
 *
 * The planes read as paper on purpose. That is the job the photograph was
 * being asked to do, and abstracting it keeps the section explaining the claim
 * instead of decorating it.
 *
 * The motion is the argument: a value is not a bare number, so the plane lifts
 * and its source unfolds beneath it — document, page, line, the quoted text and
 * the confidence it was read with. The strip always occupies its space and is
 * only clipped, so nothing reflows as it opens.
 */
export function ProvenancePlanes({ items }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      root.dataset.lifting = "true";

      const planes = gsap.utils.toArray(".pv-item", root);

      planes.forEach((plane, index) => {
        const card = plane.querySelector(".pv-card");
        const source = plane.querySelector(".pv-source");

        // Populated before its trigger is attached — see control-boundary.jsx.
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(card, { y: 16 }, { y: -6, duration: 1, ease: "none" }, 0);
        tl.fromTo(
          source,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "none" },
          0.12,
        );

        ScrollTrigger.create({
          trigger: plane,
          start: "top 88%",
          end: "top 46%",
          scrub: 0.7,
          animation: tl,
          // Staggering by start rather than by delay keeps each plane tied to
          // its own position, so they open as you reach them.
          refreshPriority: -index,
        });
      });

      return () => {
        delete root.dataset.lifting;
      };
    });

    return () => media.revert();
  }, []);

  return (
    <ol className="pv" ref={scope}>
      {items.map((item, index) => (
        <li className="pv-item" key={item.field}>
          <div className="pv-card">
            <span className="hx-mono pv-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="pv-field">{item.field}</span>
            <span className="pv-value">{item.value}</span>
          </div>

          <div className="pv-source">
            <div className="pv-source-in">
              <span className="hx-mono pv-source-k">Read from</span>
              <p className="pv-source-doc">{item.document}</p>
              <p className="pv-quote">{item.quote}</p>
              <span className="hx-mono pv-conf">{item.confidence} confidence</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
