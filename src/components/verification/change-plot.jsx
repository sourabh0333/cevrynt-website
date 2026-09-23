"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

const DAY = 24 * 60 * 60 * 1000;

/**
 * 03 — Fourteen months on one axis, and two changes in the last eight weeks.
 *
 * A status tells you almost nothing. A date tells you where to look: an entity
 * fourteen months old is a different proposition from the same entity whose
 * registered agent and principal address both moved in the two months before
 * it asked for money.
 *
 * So this is a plot rather than a list. The axis carries a gridline every three
 * months, counted back from the application, and every event sits at its true date, which means the long gap on the
 * left reads as a long gap and the cluster on the right reads as a cluster.
 * Spacing the six events evenly — the usual way this gets drawn — would have
 * told the reader the opposite of what the dates say.
 *
 * The lookback window is the only thing that moves. It sweeps back from the
 * application across the period this lender configured, and whatever it covers
 * is marked. It marks; it does not judge, and the section says so in the one
 * place a reader would look for a conclusion.
 *
 * Positions are computed from the dates at render, so the plot is correct on
 * the server and a reader with no JavaScript gets the same chart without the
 * sweep.
 */
export function ChangePlot({ events, window: win, years, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.18);

  const stamps = events.map((e) => Date.parse(e.on));
  const first = Math.min(...stamps);
  const last = Math.max(...stamps);
  const span = Math.max(1, last - first);

  /** Where a date sits on the axis, as a share of the real span. */
  const at = (ms) => ((ms - first) / span) * 100;
  const opens = last - win.days * DAY;

  return (
    <figure className={`bv3${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bv3-readout">
        {readout.figures.map((f) => (
          <div className={`bv3-fig${f.tone ? ` bv3-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bv3-fig-n">{f.n}</dt>
            <dd className="bv3-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="bv3-plot" style={{ "--open": `${at(opens)}%` }}>
        <p className="bv3-plot-k hx-mono">{readout.plotK}</p>

        <div className="bv3-scroll">
          <div className="bv3-chart">
          {/* A gridline per year, so the axis is measured rather than implied. */}
          <div className="bv3-grid" aria-hidden="true">
            {years.map((y) => (
              <span className="bv3-year" key={y.k} style={{ "--x": `${at(Date.parse(y.on))}%` }}>
                <span className="bv3-year-k hx-mono">{y.k}</span>
              </span>
            ))}
          </div>

          <span className="bv3-window" aria-hidden="true" />
          <span className="bv3-axis" aria-hidden="true" />

          <ol className="bv3-marks">
            {events.map((e, i) => {
              const ms = Date.parse(e.on);
              const near = ms >= opens && !e.anchor;
              const x = at(ms);
              const side = x > 86 ? " is-right" : x < 14 ? " is-left" : "";
              return (
                <li
                  className={`bv3-mark${near ? " is-near" : ""}${e.anchor ? " is-anchor" : ""}${side}`}
                  key={e.k}
                  style={{ "--x": `${x}%`, "--row": e.row || 0, "--i": i }}
                >
                  <span className="bv3-stem" aria-hidden="true" />
                  <span className="bv3-lab">
                    <span className="bv3-when hx-mono">{e.shown}</span>
                    <span className="bv3-what">{e.k}</span>
                  </span>
                </li>
              );
            })}
          </ol>
          </div>
        </div>

        <p className="bv3-plot-b">{win.b}</p>
      </div>

      <div className="bv3-body">
        <ol className="bv3-list">
          {events.map((e, i) => (
            <li
              className={`bv3-entry${Date.parse(e.on) >= opens && !e.anchor ? " is-near" : ""}`}
              key={e.k}
              style={{ "--i": i }}
            >
              <span className="bv3-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="bv3-name">{e.k}</span>
              <span className="bv3-date hx-mono">{e.shown}</span>
              <span className="bv3-b">{e.b}</span>
            </li>
          ))}
        </ol>

        <div className="bv3-aside">
          <p className="bv3-aside-k hx-mono">{aside.title}</p>
          <ol className="bv3-audit">
            {aside.items.map((item) => (
              <li className="bv3-audit-row" key={item.k}>
                <span className="bv3-audit-k">{item.k}</span>
                <span className="bv3-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bv3-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bv3-close">{close}</p>
      <figcaption className="bv3-note">{note}</figcaption>
    </figure>
  );
}
