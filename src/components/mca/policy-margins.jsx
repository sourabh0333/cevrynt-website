"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Anything past this is drawn at the edge and labelled with its real figure. */
const SCALE = 100;

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
const span = (t, a, b) => {
  const p = clamp01((t - a) / (b - a));
  return p * p * (3 - 2 * p);
};

/**
 * 03 — Every criterion, measured against your line rather than ours.
 *
 * A score is a single number that has already decided which of these mattered
 * and by how much, and an MCA file is exactly the kind of file that a single
 * number flatters or condemns for the wrong reason. So nothing here is
 * combined. Each criterion keeps its own row, its own threshold and its own
 * margin, and the margin is drawn at its real size.
 *
 * The geometry is deviation from a centre line. The line is the lender's
 * threshold — the same axis for every row, because the point is that the
 * thresholds belong to one policy — and each marker sits to the right of it by
 * however much the deal clears, or to the left by however much it does not. A
 * deal that passes four criteria comfortably and misses one narrowly looks like
 * exactly that, which is the thing a score cannot show.
 *
 * The one that falls short is not hidden, softened or averaged away with the
 * others. It is the only marker on the short side of the line, it carries the
 * only colour in the figure, and it says what it needs: a person's judgment.
 *
 * A margin too large for the axis is drawn at the edge with a caret and
 * labelled with its true figure, rather than being silently clipped to fit.
 *
 * Server-rendered with every margin at its full length, which is the finished
 * state and what reduced motion is given.
 */
export function PolicyMargins({ criteria, readout, note }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const table = root.querySelector(".pm-rows");
      const rows = gsap.utils.toArray(".pm-row", root);
      if (!table) return undefined;

      root.dataset.armed = "";

      const apply = (t) => {
        rows.forEach((row, i) => {
          const at = 0.06 + i * 0.12;
          // The margin grows out of the threshold line, not into it.
          row.style.setProperty("--grow", span(t, at, at + 0.3).toFixed(3));
          row.classList.toggle("is-dim", t < at + 0.04);
        });
      };

      const tween = gsap.to({ t: 0 }, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: table,
          start: "top 82%",
          end: "bottom 54%",
          scrub: 0.4,
          invalidateOnRefresh: true,
          onRefresh: (self) => apply(self.progress),
        },
        onUpdate: function () { apply(this.targets()[0].t); },
      });

      apply(0);

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        delete root.dataset.armed;
        rows.forEach((row) => {
          row.style.removeProperty("--grow");
          row.classList.remove("is-dim");
        });
      };
    });

    return () => media.revert();
  }, []);

  const exceptions = criteria.filter((c) => c.margin < 0).length;

  return (
    <figure className="pm" ref={scope}>
      <div className="pm-readout">
        <p className="pm-fig">
          <span className="pm-fig-n">{String(criteria.length).padStart(2, "0")}</span>
          <span className="pm-fig-k hx-mono">{readout.measured}</span>
        </p>
        <span className="pm-readout-rule" aria-hidden="true" />
        <p className="pm-fig pm-fig-flag">
          <span className="pm-fig-n">{String(exceptions).padStart(2, "0")}</span>
          <span className="pm-fig-k hx-mono">{readout.exception}</span>
        </p>
      </div>

      <div className="pm-rows" role="table" aria-label="This deal measured against an example lender policy">
        <div className="pm-head" role="row">
          <span className="pm-h hx-mono" role="columnheader">Criterion</span>
          <span className="pm-h hx-mono" role="columnheader">This deal</span>
          <span className="pm-h pm-h-axis hx-mono" role="columnheader">
            <span className="pm-h-short">Short</span>
            <span className="pm-h-line">Your threshold</span>
            <span className="pm-h-clear">Clear</span>
          </span>
          <span className="pm-h pm-h-end hx-mono" role="columnheader">Your threshold</span>
        </div>

        {criteria.map((c) => {
          const capped = Math.max(-SCALE, Math.min(SCALE, c.margin));
          const off = Math.abs(c.margin) > SCALE;
          return (
            <div
              className={`pm-row${c.margin < 0 ? " is-short" : ""}${off ? " is-off" : ""}`}
              role="row"
              key={c.name}
              style={{ "--m": Math.abs(capped) / SCALE, "--dir": c.margin < 0 ? -1 : 1 }}
            >
              <span className="pm-name" role="cell">{c.name}</span>
              <span className="pm-value hx-mono" role="cell">{c.value}</span>

              <span className="pm-track" role="cell">
                <span className="pm-axis" aria-hidden="true" />
                <span className="pm-bar" aria-hidden="true" />
                <span className="pm-dot" aria-hidden="true" />
                <span className="pm-margin hx-mono">{c.margin === 0 ? "on the line" : c.marginLabel}</span>
              </span>

              <span className="pm-threshold hx-mono" role="cell">{c.threshold}</span>
              {c.margin < 0 ? <span className="pm-flag hx-mono">{c.flag}</span> : null}
            </div>
          );
        })}
      </div>

      <figcaption className="pm-note">{note}</figcaption>
    </figure>
  );
}
