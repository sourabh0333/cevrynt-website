"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** How much of each ring is ours to draw. The rest is the duration, and it is
 *  not ours to fill in — so it is never drawn solid. */
const HELD = 0.72;

/**
 * The remaining arc, as a path so it covers only the gap rather than dashing
 * around the whole ring. Computed once from HELD against the r=52 circle the
 * dials are drawn on, so the two can never fall out of step.
 */
const GAP_ARC = (() => {
  const r = 52;
  const c = 60;
  const at = (f) => [c + r * Math.cos(2 * Math.PI * f), c + r * Math.sin(2 * Math.PI * f)];
  const [x1, y1] = at(HELD);
  const [x2, y2] = at(0.999);
  const large = 1 - HELD > 0.5 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
})();

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
const span = (t, a, b) => {
  const p = clamp01((t - a) / (b - a));
  return p * p * (3 - 2 * p);
};

/**
 * 03 Retention, as four instruments that deliberately do not finish.
 *
 * The honest problem with drawing retention is that Cevrynt has no durations to
 * draw. They are agreed with the lender before anything is sent, which means
 * every number a dial could show would be invented — and inventing one on a
 * page whose whole argument is candour would be the worst thing on the site.
 *
 * So the dials are drawn exactly as far as the truth goes and then stop. Each
 * ring runs about three quarters of the way round, which is the part that is
 * settled — that this surface exists, that it has a clock of its own, and who
 * sets it — and the remainder stays dashed and open, because that arc is the
 * duration and it belongs to the pilot agreement. Four rings that all refuse to
 * close is the section's whole argument, and it is an argument no amount of
 * copy makes as well as an animation that will not complete.
 *
 * The count is the other half. One blanket promise is a single clock; there are
 * four surfaces here, and the two a vendor review usually finds unnamed — the
 * run log and the telemetry — carry a marker of their own.
 *
 * Radial, because nothing else on this site is: the pages around it run in
 * lanes, columns, fields and descending trees.
 *
 * Server-rendered with every ring drawn to its stop, which is the finished
 * state and what reduced motion is given.
 */
export function RetentionDials({ surfaces, note }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const list = root.querySelector(".rd-dials");
      const held = gsap.utils.toArray(".rd-held", root);
      const open = gsap.utils.toArray(".rd-open", root);
      const dials = gsap.utils.toArray(".rd-dial", root);
      if (!list) return undefined;

      root.dataset.armed = "";

      const state = { t: 0 };

      const apply = (t) => {
        dials.forEach((dial, i) => {
          // Each ring runs on its own slice of the scroll, in order.
          const at = 0.08 + i * 0.16;
          const drawn = span(t, at, at + 0.3);

          if (held[i]) held[i].style.strokeDashoffset = String(HELD * (1 - drawn));
          // The unset arc only appears once the ring has stopped short of it,
          // so the gap reads as somewhere the line refused to go.
          if (open[i]) open[i].style.opacity = String(span(t, at + 0.24, at + 0.42).toFixed(3));
          dial.classList.toggle("is-dim", drawn < 0.35);
        });
      };

      const tween = gsap.to(state, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: list,
          start: "top 82%",
          end: "bottom 58%",
          scrub: 0.4,
          invalidateOnRefresh: true,
          onRefresh: () => apply(state.t),
        },
        onUpdate: () => apply(state.t),
      });

      apply(state.t);

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        delete root.dataset.armed;
        held.forEach((el) => el.style.removeProperty("stroke-dashoffset"));
        open.forEach((el) => el.style.removeProperty("opacity"));
        dials.forEach((el) => el.classList.remove("is-dim"));
      };
    });

    return () => media.revert();
  }, []);

  return (
    <figure className="rd" ref={scope}>
      <ol className="rd-dials">
        {surfaces.map((surface, i) => (
          <li className={`rd-dial${surface.quiet ? " is-quiet" : ""}`} key={surface.name}>
            <div className="rd-face">
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle className="rd-track" cx="60" cy="60" r="52" pathLength="1" />
                {/* The part that is settled. */}
                <circle className="rd-held" cx="60" cy="60" r="52" pathLength="1" />
                {/* The duration, drawn only across the arc the ring stopped
                    short of, and dashed because it is agreed, not declared. */}
                <path className="rd-open" d={GAP_ARC} />
              </svg>
              <span className="rd-face-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="rd-face-k hx-mono">unset</span>
            </div>

            <p className="rd-name">{surface.name}</p>
            <p className="rd-what">{surface.what}</p>
            <p className="rd-clock hx-mono">{surface.clock}</p>
            {surface.quiet ? <p className="rd-flag hx-mono">Usually unnamed in a review</p> : null}
          </li>
        ))}
      </ol>

      <figcaption className="rd-note">{note}</figcaption>
    </figure>
  );
}
