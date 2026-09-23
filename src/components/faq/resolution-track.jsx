"use client";

import { useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 03 — Answered here, or answered with you.
 *
 * An FAQ is honest about most things and quiet about one: some answers are
 * complete on the page, and some only point at a conversation. This figure
 * shows which is which. Each of the sixteen questions is a line that runs from
 * the left edge to the step where its answer is actually finished — on this
 * page, in a walkthrough, or in a pilot — and stops there.
 *
 * A line's length is not an opinion. Pointing at a row shows the sentence in
 * that question's own answer that places it where it stops, and what is still
 * open until then. Every one of those sentences is checked against the answer
 * at build time, so the chart cannot drift from the text above it.
 *
 * Server-rendered with every question, line, station and reason present.
 */
export function ResolutionTrack({ stations, rows, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.1);
  const [at, setAt] = useState(null);

  const counts = Object.fromEntries(stations.map((s, i) => [s.k, rows.filter((r) => r.station === i).length]));
  const shown = at === null ? null : rows[at];

  return (
    <figure className={`fq3${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="fq3-readout">
        {readout.figures.map((f) => (
          <div className="fq3-fig" key={f.k}>
            <dt className="fq3-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="fq3-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className={`fq3-chart${at === null ? "" : " is-picked"}`} style={{ "--n": stations.length }}>
        <p className="fq3-head" aria-hidden="true">
          <span className="fq3-head-k hx-mono">{readout.questionK}</span>
          {stations.map((s) => (
            <span className="fq3-station hx-mono" key={s.k}>
              {s.label}
            </span>
          ))}
        </p>

        <ol className="fq3-rows" onMouseLeave={() => setAt(null)}>
          {rows.map((r, i) => (
            <li
              className={`fq3-row is-s${r.station}${at === i ? " is-on" : ""}`}
              key={r.id}
              style={{ "--s": r.station, "--i": i }}
            >
              <a
                className="fq3-row-a"
                href={`#${r.id}`}
                onMouseEnter={() => setAt(i)}
                onFocus={() => setAt(i)}
                aria-label={`${r.q} — ${readout.answeredK} ${stations[r.station].label.toLowerCase()}`}
              >
                <span className="fq3-q">{r.q}</span>
                <span className="fq3-track" aria-hidden="true">
                  <span className="fq3-line" />
                  <span className="fq3-dot" />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div className="fq3-routed" aria-live="polite">
        {shown ? (
          <>
            <p className="fq3-routed-k hx-mono">
              {readout.answeredK} {stations[shown.station].label.toLowerCase()}
            </p>
            <p className="fq3-routed-q">
              <span className="fq3-routed-mark" aria-hidden="true">
                “
              </span>
              {shown.because}
              <span aria-hidden="true">”</span>
            </p>
            <p className="fq3-routed-b">
              <span className="fq3-routed-l hx-mono">{readout.openK}</span>
              {shown.rest || readout.nothingK}
            </p>
          </>
        ) : (
          <>
            <p className="fq3-routed-k hx-mono">{readout.restK}</p>
            <p className="fq3-routed-b">{readout.restB}</p>
          </>
        )}
      </div>

      <div className="fq3-body">
        <div className="fq3-said">
          <p className="fq3-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="fq3-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="fq3-aside">
          <p className="fq3-aside-k hx-mono">{aside.title}</p>
          <ol className="fq3-audit">
            {aside.items.map((item) => (
              <li className="fq3-audit-row" key={item.k}>
                <span className="fq3-audit-k">{item.k}</span>
                <span className="fq3-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="fq3-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="fq3-close">{close}</p>
      <figcaption className="fq3-note">{note}</figcaption>
    </figure>
  );
}
