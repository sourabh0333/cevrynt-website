"use client";

import { useCallback, useMemo, useState } from "react";
import { useReady } from "@/components/progressive";

const W = 1000;
const H = 168;
const LINE_Y = 40;
const RETURN_Y = 132;

/**
 * 01 — Where a gap surfaces, and how far back it sends the file.
 *
 * The first pass at this drew three evenly spaced dips in a line, which counted
 * to three and said nothing else: a detour was not attached to a gap, so the
 * shape carried no information beyond the total. The nine items underneath were
 * a three-column checklist, which is the generic grid this page exists to
 * replace.
 *
 * The axis fixes both. It is the review a lender actually runs — the site's own
 * workflow, intake through report — and every gap is placed at the stage where
 * it surfaces rather than at an arbitrary interval. From there its return sweeps
 * all the way back to intake, because that is what a bounce costs: not a detour
 * near the end, a trip back to the beginning.
 *
 * That placement is the argument. Two of these three do not surface until
 * verification, by which point the file has already been read through
 * financials — so the cost of a missing ownership percentage is not one
 * question, it is everything before it, again.
 *
 * The counter is the same fact stated as a number: passes over this file is
 * gaps plus one. Close them and it falls to a single pass.
 *
 * Server-rendered with every gap open, which is the state a package is in when
 * somebody is about to send it.
 */
export function GapRoute({ stages, gaps, present, labels, note }) {
  const ready = useReady();
  const [closed, setClosed] = useState(() => new Set());

  const toggle = useCallback((name) => {
    setClosed((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const open = gaps.filter((gap) => !closed.has(gap.name));
  const passes = open.length + 1;

  /** Each stage owns a slot on the axis; a gap sits on its own stage. */
  const stageX = useMemo(() => {
    const step = W / (stages.length + 1);
    return stages.reduce((acc, stage, i) => ({ ...acc, [stage]: step * (i + 1) }), {});
  }, [stages]);

  return (
    <figure className={`gr${ready ? " is-ready" : ""}`}>
      <div className="gr-readout">
        <p className="gr-fig">
          <span className="gr-fig-n">{String(passes).padStart(2, "0")}</span>
          <span className="gr-fig-k hx-mono">{labels.passes}</span>
        </p>
        <span className="gr-readout-rule" aria-hidden="true" />
        <p className="gr-fig gr-fig-quiet">
          <span className="gr-fig-n">{String(open.length).padStart(2, "0")}</span>
          <span className="gr-fig-k hx-mono">{labels.open}</span>
        </p>
      </div>

      {/* The review, and what each gap sends back to the start. */}
      <div className="gr-route">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <line className="gr-line" x1="0" y1={LINE_Y} x2={W} y2={LINE_Y} />

          {stages.map((stage) => (
            <line
              className="gr-tick"
              key={stage}
              x1={stageX[stage]}
              y1={LINE_Y - 6}
              x2={stageX[stage]}
              y2={LINE_Y + 6}
            />
          ))}

          {gaps.map((gap, i) => {
            const x = stageX[gap.stage] ?? W / 2;
            // Down out of the stage it surfaces at, back along its own lane,
            // and up into intake again.
            const lane = RETURN_Y - i * 26;
            return (
              <path
                className={`gr-return${closed.has(gap.name) ? " is-gone" : ""}`}
                key={gap.name}
                d={`M ${x} ${LINE_Y} L ${x} ${lane - 14} Q ${x} ${lane}, ${x - 18} ${lane} L 18 ${lane} Q 0 ${lane}, 0 ${lane - 16} L 0 ${LINE_Y + 8}`}
              />
            );
          })}

          {gaps.map((gap) => (
            <circle
              className={`gr-dot${closed.has(gap.name) ? " is-gone" : ""}`}
              key={gap.name}
              cx={stageX[gap.stage] ?? W / 2}
              cy={LINE_Y}
              r="5.5"
            />
          ))}
        </svg>

        {/* Stage names on the axis, so the horizontal position means something. */}
        <p className="gr-stages hx-mono" aria-hidden="true">
          {stages.map((stage) => (
            <span
              className={`gr-stage${gaps.some((g) => g.stage === stage && !closed.has(g.name)) ? " is-hit" : ""}`}
              key={stage}
              style={{ left: `${(stageX[stage] / W) * 100}%` }}
            >
              {stage}
            </span>
          ))}
        </p>
        <span className="gr-origin hx-mono" aria-hidden="true">{labels.origin}</span>
      </div>

      {/* The gaps, on one grid: what is missing, where it surfaces, what it costs. */}
      <div className="gr-table" role="table" aria-label="Gaps in this submission">
        <div className="gr-head" role="row">
          <span className="gr-h hx-mono" role="columnheader">{labels.missing}</span>
          <span className="gr-h hx-mono" role="columnheader">{labels.surfaces}</span>
          <span className="gr-h hx-mono" role="columnheader">{labels.costs}</span>
          <span className="gr-h gr-h-end hx-mono" role="columnheader">{labels.action}</span>
        </div>

        {gaps.map((gap) => {
          const done = closed.has(gap.name);
          return (
            <div className={`gr-row${done ? " is-done" : ""}`} role="row" key={gap.name}>
              <span className="gr-row-name" role="cell">
                <span className="gr-row-mark" aria-hidden="true" />
                {gap.name}
              </span>
              <span className="gr-row-stage hx-mono" role="cell">{gap.stage}</span>
              <span className="gr-row-cost" role="cell">{done ? labels.none : gap.cost}</span>
              <span className="gr-row-act" role="cell">
                {ready ? (
                  <button type="button" className="gr-btn" aria-pressed={done} onClick={() => toggle(gap.name)}>
                    {done ? labels.reopen : labels.close}
                  </button>
                ) : null}
              </span>
            </div>
          );
        })}
      </div>

      <p className="gr-present">
        <span className="gr-present-k hx-mono">{labels.already}</span>
        {present.map((item) => (
          <span className="gr-present-item" key={item}>{item}</span>
        ))}
      </p>

      <figcaption className="gr-note">{note}</figcaption>
    </figure>
  );
}
