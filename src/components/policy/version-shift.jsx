"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 02 — The same file, the same lender, and a policy that moved underneath it.
 *
 * Thresholds get edited. A credit committee tightens deposits in the spring and
 * loosens returned items in the summer, and the question nobody asks until it
 * matters is what that does to a deal already decided.
 *
 * So each criterion here is one scale carrying one observation and two lines:
 * where the threshold was, and where it is now, joined so the move is a
 * distance rather than two separate facts. Two of the four outcomes flip, in
 * opposite directions, and the borrower did nothing in either case.
 *
 * The point is the last column. A deal evaluated under 3.3 keeps 3.3 attached
 * to it for good — the engine does not re-judge a decided file against a rule
 * written afterwards, because a file whose answer changes every time somebody
 * edits a threshold is not a file anybody can defend in front of a regulator or
 * a buyer.
 *
 * Server-rendered with both lines, the connector and every outcome present.
 */
export function VersionShift({ criteria, versions, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);

  const moved = criteria.filter((c) => c.fromPct !== c.toPct).length;
  const flipped = criteria.filter((c) => c.was !== c.now).length;

  return (
    <figure className={`pe2${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="pe2-readout">
        {readout.figures.map((f) => (
          <div className={`pe2-fig${f.tone ? ` pe2-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="pe2-fig-n">{f.n}</dt>
            <dd className="pe2-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="pe2-scroll">
        <div className="pe2-chart">
          <div className="pe2-head">
            <span className="pe2-corner hx-mono">{readout.cornerK}</span>
            <span className="pe2-legend">
              <span className="pe2-leg is-from hx-mono">
                <span className="pe2-leg-m" aria-hidden="true" />
                {versions.from}
              </span>
              <span className="pe2-leg is-to hx-mono">
                <span className="pe2-leg-m" aria-hidden="true" />
                {versions.to}
              </span>
            </span>
            <span className="pe2-corner-r hx-mono">{readout.outcomeK}</span>
          </div>

          {criteria.map((c, r) => (
            <div className={`pe2-row${c.was !== c.now ? " is-flip" : ""}`} key={c.k} style={{ "--r": r }}>
              <p className="pe2-crit">
                <span className="pe2-crit-k">{c.k}</span>
                <span className="pe2-crit-s hx-mono">{c.scale}</span>
              </p>

              <div className="pe2-scale">
                <span className="pe2-axis" aria-hidden="true" />

                {/* The threshold moved this far. Drawn as a distance. */}
                <span
                  className="pe2-shift"
                  style={{
                    "--a": `${Math.min(c.fromPct, c.toPct)}%`,
                    "--b": `${Math.max(c.fromPct, c.toPct)}%`,
                  }}
                  aria-hidden="true"
                />

                <span className="pe2-mark is-from" style={{ "--x": `${c.fromPct}%` }}>
                  <span className="pe2-mark-m" aria-hidden="true" />
                  <span className="pe2-mark-v hx-mono">{c.fromShown}</span>
                </span>

                <span className="pe2-mark is-to" style={{ "--x": `${c.toPct}%` }}>
                  <span className="pe2-mark-m" aria-hidden="true" />
                  <span className="pe2-mark-v hx-mono">{c.toShown}</span>
                </span>

                {/* The file, which did not move. */}
                <span className="pe2-obs" style={{ "--x": `${c.pct}%` }}>
                  <span className="pe2-obs-m" aria-hidden="true" />
                  <span className="pe2-obs-v hx-mono">{c.shown}</span>
                </span>
              </div>

              <p className="pe2-out">
                <span className="pe2-was hx-mono">{c.was}</span>
                <span className="pe2-arrow hx-mono" aria-hidden="true">
                  →
                </span>
                <span className="pe2-now hx-mono">{c.now}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="pe2-said">
        <span className="pe2-said-k hx-mono">{readout.saidK}</span>
        <span className="pe2-said-b">
          {readout.saidB.replace("{moved}", String(moved)).replace("{flipped}", String(flipped))}
        </span>
      </p>

      <div className="pe2-body">
        <ol className="pe2-list">
          {criteria.map((c, i) => (
            <li className={`pe2-entry${c.was !== c.now ? " is-flip" : ""}`} key={c.k} style={{ "--i": i }}>
              <span className="pe2-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="pe2-name">{c.k}</span>
              <span className="pe2-b">{c.b}</span>
            </li>
          ))}
        </ol>

        <div className="pe2-aside">
          <p className="pe2-aside-k hx-mono">{aside.title}</p>
          <ol className="pe2-audit">
            {aside.items.map((item) => (
              <li className="pe2-audit-row" key={item.k}>
                <span className="pe2-audit-k">{item.k}</span>
                <span className="pe2-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="pe2-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="pe2-close">{close}</p>
      <figcaption className="pe2-note">{note}</figcaption>
    </figure>
  );
}
