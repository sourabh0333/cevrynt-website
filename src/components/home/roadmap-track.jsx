"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

const CORNER = 26;

/**
 * A serpentine route: three stations across, a U-turn, three more back.
 *
 * All six steps are on screen together — no hovering, no swapping panels — and
 * the whole thing costs about two card rows of height instead of six.
 *
 * The connector is a single SVG path measured from the real node positions
 * after layout, so it stays correct at any width and re-measures on resize.
 * Scroll draws the path; each node lights as the drawn length reaches it.
 */
export function RoadmapTrack({ stations }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const svg = root.querySelector(".rd-svg");
    const track = root.querySelector(".rd-track");
    const draw = root.querySelector(".rd-draw");
    const nodes = gsap.utils.toArray(".rd-node", root);
    const cards = gsap.utils.toArray(".rd-station", root);
    if (!svg || !track || !draw) return undefined;

    /** Build the serpentine through the measured node centres. */
    const buildPath = () => {
      const box = root.getBoundingClientRect();
      const pts = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      if (pts.length < 6) return null;

      const rowAy = pts[0].y;
      const rowBy = pts[3].y;
      const midY = (rowAy + rowBy) / 2;
      const xR = Math.max(pts[2].x, pts[5].x) + Math.min(70, box.width * 0.05);
      const xL = Math.min(pts[0].x, pts[3].x) - Math.min(70, box.width * 0.05);
      const r = CORNER;

      const d = [
        `M ${pts[0].x} ${rowAy}`,
        `L ${xR - r} ${rowAy}`,
        `Q ${xR} ${rowAy} ${xR} ${rowAy + r}`,
        `L ${xR} ${midY - r}`,
        `Q ${xR} ${midY} ${xR - r} ${midY}`,
        `L ${xL + r} ${midY}`,
        `Q ${xL} ${midY} ${xL} ${midY + r}`,
        `L ${xL} ${rowBy - r}`,
        `Q ${xL} ${rowBy} ${xL + r} ${rowBy}`,
        `L ${pts[5].x} ${rowBy}`,
      ].join(" ");

      svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
      svg.setAttribute("width", box.width);
      svg.setAttribute("height", box.height);
      track.setAttribute("d", d);
      draw.setAttribute("d", d);
      return { pts, len: draw.getTotalLength() };
    };

    /** Where each node sits along the path, as a 0–1 ratio. */
    const nodeRatios = (pts, len) => {
      const samples = 300;
      return pts.map((p) => {
        let best = 0;
        let bestDist = Infinity;
        for (let i = 0; i <= samples; i++) {
          const l = (i / samples) * len;
          const q = draw.getPointAtLength(l);
          const dist = (q.x - p.x) ** 2 + (q.y - p.y) ** 2;
          if (dist < bestDist) { bestDist = dist; best = l / len; }
        }
        return best;
      });
    };

    // Mutable so the single trigger below always reads current measurements.
    let len = 0;
    let ratios = [];

    const measure = () => {
      const built = buildPath();
      if (!built) return;
      len = built.len;
      ratios = nodeRatios(built.pts, built.len);
      gsap.set(draw, { strokeDasharray: len });
    };

    const apply = (progress) => {
      if (!len) return;
      gsap.set(draw, { strokeDashoffset: len * (1 - progress) });
      nodes.forEach((n, i) => n.classList.toggle("is-lit", progress >= ratios[i] - 0.02));
      cards.forEach((c, i) => c.classList.toggle("is-lit", progress >= ratios[i] - 0.02));
    };

    // The connector is the diagram, not decoration on top of it: it is measured
    // and drawn whatever the motion preference. Only the scroll-driven reveal
    // below is conditional. Building it inside the motion branch meant a reader
    // with reduced motion got no route drawn at all — the paths never received
    // a `d`, so there was nothing for the CSS fallback to reveal.
    measure();

    // The finished state is the default, and the motion branch below opts out
    // of it. It cannot be handled inside `matchMedia` instead: when a query
    // does not match, gsap never invokes the callback at all, so a guard in
    // there would never run for the reader who needs it.
    apply(1);

    // Fonts change card heights, which moves the nodes the path is built from.
    if (document.fonts?.status !== "loaded") {
      document.fonts?.ready.then(() => measure()).catch(() => {});
    }

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, () => {
      apply(0);

      // One trigger for the life of the component. Re-measuring on refresh keeps
      // the path correct after resizes without tearing the trigger down.
      ScrollTrigger.create({
        trigger: root,
        start: "top 74%",
        end: "bottom 72%",
        invalidateOnRefresh: true,
        onRefresh: (self) => { measure(); apply(self.progress); },
        onUpdate: (self) => apply(self.progress),
      });

      gsap.from(cards, {
        y: 34,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      });

      if (document.fonts?.status !== "loaded") {
        document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
      }

      // Reverting the motion branch puts the route back to drawn.
      return () => apply(1);
    });

    // With no ScrollTrigger to refresh, a reduced-motion reader still needs the
    // route re-measured when the layout reflows.
    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      media.revert();
    };
  }, []);

  const rows = [stations.slice(0, 3), stations.slice(3, 6)];

  return (
    <div className="rd" ref={scope}>
      <svg className="rd-svg" aria-hidden="true" preserveAspectRatio="none">
        <path className="rd-track" fill="none" />
        <path className="rd-draw" fill="none" />
      </svg>

      {rows.map((row, rowIndex) => (
        <ol className="rd-row" key={rowIndex}>
          {row.map((station, i) => {
            const index = rowIndex * 3 + i;
            return (
              <li className="rd-station" key={station.path}>
                <span className="rd-node" aria-hidden="true">
                  <span className="rd-node-dot" />
                </span>
                <Link className="rd-card" href={`/${station.path}`}>
                  <span className="rd-meta">
                    <span className="hx-mono rd-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="hx-mono rd-stage">{station.stage}</span>
                  </span>
                  <h3 className="rd-title">{station.title}</h3>
                  <p className="rd-desc">{station.description}</p>
                  <span className="rd-cue">
                    Explore <ArrowUpRight />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      ))}

      <p className="rd-end hx-mono">
        <span className="rd-end-dot" aria-hidden="true" />
        EVERY ANSWER STAYS CONNECTED TO THE EVIDENCE BEHIND IT
      </p>
    </div>
  );
}
