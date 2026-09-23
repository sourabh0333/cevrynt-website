"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 04 — The average is true, and the account still spent nine days overdrawn.
 *
 * Average daily balance is on every submission and in half the thresholds a
 * lender writes, and it is exactly the kind of number that is accurate and
 * misleading at the same time. $31.2K averaged across the period is correct. So
 * is a week in June spent below zero, and the average has no way of carrying
 * both facts at once.
 *
 * So the balance is drawn as a curve, one point per day, with the average laid
 * across it as a flat line. The distance between that line and the dip is the
 * whole argument, and it needs no annotation: the reader can see the average
 * sitting comfortably above a week the account could not cover.
 *
 * The strip underneath does the same thing to monthly averages, which hide it
 * too. June averaged $18.1K and closed below zero on seven of its days.
 *
 * The plot can be scrubbed with a pointer or the arrow keys to read any single
 * day. The path itself is revealed rather than drawn with dashes, because a
 * stroke that keeps its width at every size cannot keep a dash length honest.
 *
 * Server-rendered with the curve, both reference lines and every monthly
 * figure present; every number is computed from the one series.
 */
export function BalanceCurve({ series, months, average, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const n = series.length;
  const fmt = (v) => `${v < 0 ? "−" : ""}$${Math.abs(v).toFixed(1)}K`;

  /* Dates and month boundaries, derived from the month list rather than stored. */
  const dates = [];
  const starts = [];
  months.forEach((m) => {
    starts.push(dates.length);
    for (let d = 1; d <= m.days; d += 1) dates.push(`${m.k} ${d}`);
  });

  const top = Math.ceil(Math.max(...series) / 10) * 10;
  const floor = -10;
  const y = (v) => ((top - v) / (top - floor)) * 100;
  const x = (i) => (i / (n - 1)) * 100;

  const line = series.map((v, i) => `${x(i).toFixed(3)},${y(v).toFixed(3)}`).join(" ");
  const below = `${series.map((v, i) => `${x(i).toFixed(3)},${y(Math.min(v, 0)).toFixed(3)}`).join(" ")} 100,${y(0).toFixed(3)} 0,${y(0).toFixed(3)}`;

  const mean = series.reduce((a, b) => a + b, 0) / n;
  const low = Math.min(...series);
  const lowAt = series.indexOf(low);
  const negatives = series.filter((v) => v < 0).length;
  const stats = { average: fmt(mean), negatives: String(negatives).padStart(2, "0"), low: fmt(low) };

  const perMonth = months.map((m, i) => {
    const slice = series.slice(starts[i], starts[i] + m.days);
    return {
      k: m.full,
      avg: fmt(slice.reduce((a, b) => a + b, 0) / slice.length),
      neg: slice.filter((v) => v < 0).length,
      low: fmt(Math.min(...slice)),
    };
  });

  const ticks = [];
  for (let v = floor; v <= top; v += 10) ticks.push(v);

  const plot = useRef(null);
  const onMove = useCallback(
    (e) => {
      const r = plot.current.getBoundingClientRect();
      const i = Math.round(((e.clientX - r.left) / r.width) * (n - 1));
      setAt(Math.max(0, Math.min(n - 1, i)));
    },
    [n],
  );
  const onKey = useCallback(
    (e) => {
      const step = { ArrowRight: 1, ArrowLeft: -1, PageUp: 7, PageDown: -7 }[e.key];
      if (step !== undefined) {
        e.preventDefault();
        setAt((cur) => Math.max(0, Math.min(n - 1, (cur === null ? lowAt : cur) + step)));
      } else if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        setAt(e.key === "Home" ? 0 : n - 1);
      }
    },
    [n, lowAt],
  );

  const side = at === null ? "" : x(at) > 80 ? " is-left" : "";

  return (
    <figure className={`bk4${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bk4-readout">
        {readout.figures.map((f) => (
          <div className={`bk4-fig${f.tone ? ` bk4-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bk4-fig-n">{stats[f.of]}</dt>
            <dd className="bk4-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="bk4-frame">
        <div className="bk4-yaxis" aria-hidden="true">
          {ticks.map((v) => (
            <span className={`bk4-yk hx-mono${v === 0 ? " is-zero" : ""}`} key={`y${v}`} style={{ "--y": `${y(v)}%` }}>
              {v === 0 ? "$0" : `${v < 0 ? "−" : ""}$${Math.abs(v)}K`}
            </span>
          ))}
        </div>

        <div
          className="bk4-plot"
          ref={plot}
          role="slider"
          tabIndex={0}
          aria-label={readout.sliderK}
          aria-valuemin={1}
          aria-valuemax={n}
          aria-valuenow={at === null ? lowAt + 1 : at + 1}
          aria-valuetext={at === null ? `${dates[lowAt]}: ${fmt(low)}` : `${dates[at]}: ${fmt(series[at])}`}
          onPointerMove={onMove}
          onPointerLeave={() => setAt(null)}
          onKeyDown={onKey}
        >
          {ticks.map((v) => (
            <span className={`bk4-grid${v === 0 ? " is-zero" : ""}`} key={`g${v}`} style={{ "--y": `${y(v)}%` }} aria-hidden="true" />
          ))}

          {starts.slice(1).map((s) => (
            <span className="bk4-msep" key={`m${s}`} style={{ "--x": `${x(s)}%` }} aria-hidden="true" />
          ))}

          <div className="bk4-draw">
            <svg className="bk4-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <polygon className="bk4-below" points={below} />
              <polyline className="bk4-line" points={line} />
            </svg>
          </div>

          {/* The average, laid flat across the whole period. */}
          <span className="bk4-avg" style={{ "--y": `${y(average)}%` }} aria-hidden="true">
            <span className="bk4-avg-k hx-mono">
              {readout.avgK} {fmt(average)}
            </span>
          </span>

          <span className="bk4-low" style={{ "--x": `${x(lowAt)}%`, "--y": `${y(low)}%` }} aria-hidden="true">
            <span className="bk4-low-k hx-mono">
              {dates[lowAt]} · {fmt(low)}
            </span>
          </span>

          {at === null ? null : (
            <span className={`bk4-scrub${side}`} style={{ "--x": `${x(at)}%`, "--y": `${y(series[at])}%` }} aria-hidden="true">
              <span className="bk4-scrub-dot" />
              <span className="bk4-scrub-k hx-mono">
                <span className="bk4-scrub-d">{dates[at]}</span>
                <span className={`bk4-scrub-v${series[at] < 0 ? " is-neg" : ""}`}>{fmt(series[at])}</span>
              </span>
            </span>
          )}
        </div>

        <div className="bk4-xaxis" aria-hidden="true">
          {months.map((m, i) => (
            <span className="bk4-xk hx-mono" key={m.k} style={{ "--x": `${x(starts[i])}%` }}>
              {m.full}
            </span>
          ))}
        </div>
      </div>

      <p className="bk4-hint hx-mono">{readout.hintK}</p>

      <ol className="bk4-months">
        {perMonth.map((m) => (
          <li className={`bk4-m${m.neg ? " is-neg" : ""}`} key={m.k}>
            <span className="bk4-m-k">{m.k}</span>
            <span className="bk4-m-row">
              <span className="bk4-m-lk hx-mono">{readout.monthAvgK}</span>
              <span className="bk4-m-v hx-mono">{m.avg}</span>
            </span>
            <span className="bk4-m-row">
              <span className="bk4-m-lk hx-mono">{readout.monthNegK}</span>
              <span className="bk4-m-v is-count hx-mono">{m.neg}</span>
            </span>
            <span className="bk4-m-row">
              <span className="bk4-m-lk hx-mono">{readout.monthLowK}</span>
              <span className="bk4-m-v hx-mono">{m.low}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="bk4-body">
        <div className="bk4-said">
          <p className="bk4-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="bk4-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="bk4-aside">
          <p className="bk4-aside-k hx-mono">{aside.title}</p>
          <ol className="bk4-audit">
            {aside.items.map((item) => (
              <li className="bk4-audit-row" key={item.k}>
                <span className="bk4-audit-k">{item.k}</span>
                <span className="bk4-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bk4-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bk4-close">{close}</p>
      <figcaption className="bk4-note">{note}</figcaption>
    </figure>
  );
}
