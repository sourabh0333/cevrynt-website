"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Evidence fans out into signals, then converges — and stops.
 *
 * The previous version was a left-to-right lineage graph. The branching idea
 * was right, but twelve small nodes in two columns did not sit beside the layer
 * stack, which is bold, typographic and built from solid planes. So the tree is
 * kept and rebuilt in that vocabulary: few, large, solid nodes, top to bottom.
 *
 * The shape carries the argument. One root fans into three families, the
 * families converge toward a single decision — and that last node is drawn as
 * an open dashed outline that never fills. Everything on this page derives; the
 * one thing Cevrynt will not do is complete that node. Saying "no automated
 * decision" in a caption is weaker than showing the tree refuse to close.
 *
 * Edges are measured from the rendered node positions, so the geometry holds at
 * any width and is rebuilt on resize — the approach `roadmap-track.jsx` already
 * uses here. Below the breakpoint the wires are dropped and the same markup
 * reads as a plain top-to-bottom outline.
 */
export function SignalTree({ root: rootNode, families, decision }) {
  const scope = useRef(null);

  useEffect(() => {
    const el = scope.current;
    if (!el) return undefined;

    const media = gsap.matchMedia();

    media.add(
      { motionOk: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 861px)" },
      ({ conditions }) => {
        if (!conditions.wide) return undefined;

        const svg = el.querySelector(".tr-wires");
        const board = el.querySelector(".tr-board");
        if (!svg || !board) return undefined;

        el.dataset.tree = "on";

        const draw = () => {
          const box = board.getBoundingClientRect();
          svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
          svg.setAttribute("width", box.width);
          svg.setAttribute("height", box.height);

          for (const path of svg.querySelectorAll(".tr-edge")) {
            const from = board.querySelector(`[data-node="${path.dataset.from}"]`);
            const to = board.querySelector(`[data-node="${path.dataset.to}"]`);
            if (!from || !to) continue;

            const a = from.getBoundingClientRect();
            const b = to.getBoundingClientRect();
            const x1 = a.left + a.width / 2 - box.left;
            const y1 = a.bottom - box.top;
            const x2 = b.left + b.width / 2 - box.left;
            const y2 = b.top - box.top;
            const bend = Math.max(18, (y2 - y1) * 0.5);

            path.setAttribute("d", `M ${x1} ${y1} C ${x1} ${y1 + bend}, ${x2} ${y2 - bend}, ${x2} ${y2}`);
          }
        };

        draw();
        if (document.fonts?.status !== "loaded") {
          document.fonts?.ready.then(draw).catch(() => {});
        }

        const edges = gsap.utils.toArray(".tr-edge", svg);
        edges.forEach((edge) => {
          const length = edge.getTotalLength();
          gsap.set(edge, { strokeDasharray: length, strokeDashoffset: length });
        });

        if (!conditions.motionOk) {
          gsap.set(edges, { strokeDashoffset: 0 });
        } else {
          // Fan first, converge second, so the shape reads in the order it
          // argues in.
          gsap.to(edges, {
            strokeDashoffset: 0,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: { trigger: board, start: "top 76%", end: "bottom 74%", scrub: 0.7 },
          });
        }

        const onResize = () => draw();
        window.addEventListener("resize", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          delete el.dataset.tree;
        };
      },
    );

    return () => media.revert();
  }, []);

  return (
    <div className="tr" ref={scope}>
      <div className="tr-board">
        <svg className="tr-wires" aria-hidden="true" focusable="false">
          {families.map((family) => (
            <path className="tr-edge" key={`down-${family.key}`} data-from="root" data-to={family.key} fill="none" />
          ))}
          {families.map((family) => (
            <path
              className="tr-edge tr-edge-end"
              key={`up-${family.key}`}
              data-from={family.key}
              data-to="decision"
              fill="none"
            />
          ))}
        </svg>

        <div className="tr-root" data-node="root">
          <span className="hx-mono tr-root-k">{rootNode.kicker}</span>
          <span className="tr-root-name">{rootNode.name}</span>
        </div>

        <ol className="tr-families">
          {families.map((family) => (
            <li className="tr-family" key={family.key} data-node={family.key}>
              <span className="tr-family-name">{family.name}</span>
              <ul className="tr-signals">
                {family.signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {/* The node that never fills. */}
        <div className="tr-decision" data-node="decision">
          <span className="hx-mono tr-decision-k">{decision.kicker}</span>
          <span className="tr-decision-name">{decision.name}</span>
        </div>
      </div>

      <p className="tr-note">{decision.note}</p>
    </div>
  );
}
