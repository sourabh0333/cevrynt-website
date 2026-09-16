"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 03 — The numbers this report does not contain.
 *
 * Every other section on this site argues for something the platform does.
 * This one is the inverse, and it is the section a report page most needs,
 * because a document that summarises an underwriting file is exactly where a
 * vendor starts quietly emitting a score.
 *
 * So each row names the value a reader arrives expecting, shows the slot it
 * would sit in, and rules that slot through — the strike is drawn rather than
 * stated, left to right, one row at a time. Beside it is what the report
 * carries in its place, which on one row is honestly nothing at all.
 *
 * The figure that matters is the middle one, and it is zero: there is no
 * number anywhere in this product that Cevrynt made up.
 *
 * Server-rendered with every row, every slot and every substitute present.
 */
export function NotIssued({ rows, columns, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const counts = { all: rows.length, invented: 0, stated: rows.filter((r) => r.instead).length };
  const shown = at === null ? null : rows[at];

  return (
    <figure className={`ur3${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="ur3-readout">
        {readout.figures.map((f) => (
          <div className={`ur3-fig${f.tone ? ` ur3-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="ur3-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="ur3-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="ur3-scroll">
        <div className={`ur3-chart${at === null ? "" : ` is-at-${at}`}`}>
          <div className="ur3-head">
            <span className="ur3-col-k hx-mono">{columns.k}</span>
            <span className="ur3-col-k is-out hx-mono">{columns.slot}</span>
            <span className="ur3-col-k hx-mono">{columns.instead}</span>
          </div>

          <ol className="ur3-rows">
            {rows.map((r, i) => (
              <li className="ur3-row" key={r.k} style={{ "--r": i }}>
                <button
                  className="ur3-row-b"
                  type="button"
                  aria-pressed={at === i}
                  onClick={() => pick(i)}
                  onMouseEnter={() => setAt(i)}
                >
                  <span className="ur3-k">{r.k}</span>

                  {/* The slot it would sit in, ruled through rather than absent. */}
                  <span className="ur3-slot">
                    <span className="ur3-slot-v hx-mono">{r.slot}</span>
                    <span className="ur3-strike" aria-hidden="true" />
                    <span className="sr-only">{readout.notIssuedK}</span>
                  </span>

                  <span className="ur3-instead">
                    <span className="ur3-instead-k hx-mono">{readout.insteadK}</span>
                    <span className="ur3-instead-v">{r.instead}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="ur3-routed" aria-live="polite">
        <span className="ur3-routed-k hx-mono">{shown ? shown.k : readout.restK}</span>
        <span className="ur3-routed-b">{shown ? shown.why : readout.restB}</span>
      </p>

      <div className="ur3-body">
        <div className="ur3-said">
          <p className="ur3-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="ur3-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="ur3-aside">
          <p className="ur3-aside-k hx-mono">{aside.title}</p>
          <ol className="ur3-audit">
            {aside.items.map((item) => (
              <li className="ur3-audit-row" key={item.k}>
                <span className="ur3-audit-k">{item.k}</span>
                <span className="ur3-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="ur3-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="ur3-close">{close}</p>
      <figcaption className="ur3-note">{note}</figcaption>
    </figure>
  );
}
