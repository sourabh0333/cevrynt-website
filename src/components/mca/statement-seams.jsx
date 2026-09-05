"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Six statements, thirty days each. */
const MONTHS = 6;
const DAYS = 30;
/** The figure the site publishes for this deal, per statement. */
const MONTHLY_DEPOSITS = 84613;

const PANEL_W = 300;
const PANEL_H = 104;
const FLOOR = 96;
const CEIL = 12;

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
const span = (t, a, b) => {
  const p = clamp01((t - a) / (b - a));
  return p * p * (3 - 2 * p);
};

/**
 * The daily series, generated once and deterministically.
 *
 * Math.random would differ between the server and the client, and an
 * illustrative series that changes on hydration is worse than no series. The
 * shape is invented — it is one merchant's rhythm, labelled illustrative — but
 * the level is not: the run is scaled so that every thirty days sums to the
 * $84,613 in average monthly deposits this deal is described by everywhere else
 * on the site, so the curve and the copy cannot drift apart.
 */
function buildSeries() {
  const raw = [];
  for (let i = 0; i < MONTHS * DAYS + 1; i += 1) {
    const weekday = i % 7;
    // Card-settlement rhythm: quiet at the weekend, heavier midweek.
    const base = weekday === 5 || weekday === 6 ? 0.16 : 1;
    const wobble = Math.abs(Math.sin(i * 12.9898) * 43758.5453 % 1);
    raw.push(base * (0.55 + wobble * 0.9));
  }

  // Scale so each month's slice lands on the published figure.
  const monthTotal = raw.slice(0, DAYS).reduce((a, b) => a + b, 0);
  const factor = MONTHLY_DEPOSITS / monthTotal;
  return raw.map((v) => Math.round(v * factor));
}

const SERIES = buildSeries();
const PEAK = Math.max(...SERIES);

/** One statement's polyline, sharing its end point with the next statement. */
function panelPoints(month) {
  const points = [];
  for (let d = 0; d <= DAYS; d += 1) {
    const value = SERIES[month * DAYS + d] ?? 0;
    const x = (d / DAYS) * PANEL_W;
    const y = FLOOR - (value / PEAK) * (FLOOR - CEIL);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

/**
 * 01 — Six statements read as one series.
 *
 * An MCA file does not arrive as cash flow. It arrives as six PDFs, and the
 * work everybody does first is the work of putting them back together: keying
 * them into a spreadsheet, lining the months up, and looking for the rhythm
 * that was never visible while they were six separate documents.
 *
 * So the section performs exactly that and nothing else. Six panels, each one
 * statement, each with its own frame, its own baseline and its own month —
 * separated the way they are separated in the package. As the reader scrolls,
 * the seams close: the gaps shrink to nothing, the panels drop onto a shared
 * baseline, the frames fade, and what was six documents is one hundred and
 * eighty days of continuous activity.
 *
 * The join is exact rather than approximate. Each panel plots thirty-one points
 * and shares its last with its neighbour's first, so when the gap reaches zero
 * the line is genuinely continuous — there is no seam to hide, which is the
 * only honest way to draw this particular claim.
 *
 * The section that follows runs the other way: this one gathers six things into
 * one, that one takes a single day and divides it.
 *
 * Server-rendered joined, on one baseline, which is the finished state.
 */
export function StatementSeams({ statements, readout, note }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const plot = root.querySelector(".fs-plot");
      const live = root.querySelector(".fs-live");
      if (!plot) return undefined;

      root.dataset.armed = "";
      let shown = -1;

      const apply = (t) => {
        // 1 is six separate statements; 0 is one series.
        const seam = 1 - span(t, 0.1, 0.72);
        plot.style.setProperty("--seam", seam.toFixed(3));

        // The count goes the other way as they join.
        const count = seam > 0.5 ? MONTHS : 1;
        if (live && count !== shown) {
          shown = count;
          live.textContent = String(count).padStart(2, "0");
        }
        plot.classList.toggle("is-joined", seam <= 0.5);
      };

      const tween = gsap.to({ t: 0 }, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: plot,
          start: "top 80%",
          end: "bottom 46%",
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
        plot.classList.remove("is-joined");
        plot.style.removeProperty("--seam");
        if (live) live.textContent = "01";
      };
    });

    return () => media.revert();
  }, []);

  return (
    <figure className="fs" ref={scope}>
      <div className="fs-readout">
        <p className="fs-count">
          <span className="fs-count-n fs-live">01</span>
          <span className="fs-count-k hx-mono">{readout.series}</span>
        </p>
        <span className="fs-readout-rule" aria-hidden="true" />
        <p className="fs-count fs-count-quiet">
          <span className="fs-count-n">{MONTHS * DAYS}</span>
          <span className="fs-count-k hx-mono">{readout.days}</span>
        </p>
      </div>

      <div
        className="fs-plot"
        role="img"
        aria-label={`Six consecutive bank statements for this illustrative deal, joined into one continuous series of ${MONTHS * DAYS} days of deposit activity averaging $${MONTHLY_DEPOSITS.toLocaleString("en-US")} a month.`}
      >
        {statements.map((label, month) => (
          <div className="fs-panel" key={label} style={{ "--i": month }}>
            <svg viewBox={`0 0 ${PANEL_W} ${PANEL_H}`} preserveAspectRatio="none" aria-hidden="true">
              <line className="fs-base" x1="0" y1={FLOOR} x2={PANEL_W} y2={FLOOR} />
              <polyline className="fs-line" points={panelPoints(month)} />
            </svg>
            <span className="fs-panel-k hx-mono">{label}</span>
          </div>
        ))}
      </div>

      <figcaption className="fs-note">{note}</figcaption>
    </figure>
  );
}
