"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 04 — Three holdings on a measured scale, against a line the lender drew.
 *
 * The threshold is the whole subject, so the threshold is drawn before anything
 * is measured against it: the scale is ruled at every quarter, the lender's line
 * stands on it, and the bars grow into a chart that was already there. A
 * threshold that arrives after the measurement looks like it was chosen to suit
 * the result.
 *
 * The line is configuration. Cevrynt holds no view on where a threshold belongs
 * and gives no guidance on setting one — a different lender draws it somewhere
 * else and the same three holdings produce a different answer.
 *
 * Two of the three are over it and must be identified. The third is under it
 * and is counted without being named, and it stays on the chart at full
 * strength: counting somebody out of a disclosure requirement is not the same
 * as not knowing they are there, and a bar that faded below the line would have
 * said the second thing.
 *
 * The middle holding is the one to look at. It is on the filing and not on the
 * application, which is the fourth conflict from section 02 with a number
 * attached to it.
 *
 * Server-rendered at full length with the crossings already marked.
 */
export function HolderPlot({ holders, threshold, ticks, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.18);

  return (
    <figure className={`bv4${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bv4-readout">
        {readout.figures.map((f) => (
          <div className={`bv4-fig${f.tone ? ` bv4-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bv4-fig-n">{f.n}</dt>
            <dd className="bv4-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="bv4-plot" style={{ "--line": `${threshold.at}%` }}>
        <p className="bv4-plot-k hx-mono">{readout.plotK}</p>

        <div className="bv4-chart">
          {/* Ruled at every quarter, before anything is measured against it. */}
          <div className="bv4-grid" aria-hidden="true">
            {ticks.map((t) => (
              <span className="bv4-tick" key={t} style={{ "--x": `${t}%` }}>
                <span className="bv4-tick-k hx-mono">{t}%</span>
              </span>
            ))}
          </div>

          <span className="bv4-threshold" aria-hidden="true">
            <span className="bv4-threshold-k hx-mono">{threshold.k}</span>
          </span>

          <ol className="bv4-bars">
            {holders.map((h, i) => (
              <li
                className={`bv4-holder${h.pct >= threshold.at ? " is-over" : ""}${h.gap ? " is-gap" : ""}`}
                key={`holder-${i}`}
                style={{ "--pct": `${h.pct}%`, "--i": i }}
              >
                <span className="bv4-bar" aria-hidden="true">
                  <span className="bv4-bar-fill" />
                </span>
                <span className="bv4-holder-k">{h.k}</span>
                <span className="bv4-pct hx-mono">{h.pct}%</span>
                <span className="bv4-state hx-mono">
                  {h.pct >= threshold.at ? readout.overK : readout.underK}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <p className="bv4-plot-b">{threshold.b}</p>
      </div>

      <div className="bv4-body">
        <ol className="bv4-list">
          {holders.map((h, i) => (
            <li className={`bv4-entry${h.gap ? " is-gap" : ""}`} key={`note-${i}`} style={{ "--i": i }}>
              <span className="bv4-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="bv4-name">{h.k}</span>
              <span className="bv4-src hx-mono">{h.src}</span>
              <span className="bv4-b">{h.b}</span>
            </li>
          ))}
        </ol>

        <div className="bv4-aside">
          <p className="bv4-aside-k hx-mono">{aside.title}</p>
          <ol className="bv4-audit">
            {aside.items.map((item) => (
              <li className="bv4-audit-row" key={item.k}>
                <span className="bv4-audit-k">{item.k}</span>
                <span className="bv4-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bv4-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bv4-close">{close}</p>
      <figcaption className="bv4-note">{note}</figcaption>
    </figure>
  );
}
