"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 02 — A signal is not a verdict.
 *
 * The one open fraud-stage finding on this file is a weekly debit with no
 * funding credit behind it. A platform that wanted to look decisive would name
 * it. The trouble is that several quite different things leave exactly that
 * trace on a bank statement, and the statements cannot tell them apart.
 *
 * So the figure is symmetrical on purpose. The observation sits in the middle.
 * Four readings that fit it sit either side, each held against every feature
 * the statements actually show — and every one of them passes every test. Past
 * a dashed line marked as the edge of the file sits the single thing that would
 * separate each reading from the others, and none of those things is in the
 * file.
 *
 * The count that matters is computed from the readings, not asserted: how many
 * of them the statements rule out. On this file it is none, which is exactly
 * why this goes to a person with the question attached rather than to a label.
 *
 * Connectors are laid out in CSS against the grid rather than measured.
 * Server-rendered with the observation, every reading and every decider.
 */
export function ReadingsBracket({ observation, features, readings, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  /* A reading is ruled out only if some visible feature contradicts it. */
  const ruledOut = (r) => features.some((f) => r.fits[f.key] === false);
  const counts = {
    observations: 1,
    readings: readings.length,
    ruledOut: readings.filter(ruledOut).length,
  };
  const shown = at === null ? null : readings[at];

  const place = ["tl", "bl", "tr", "br"];

  return (
    <figure className={`sg2${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="sg2-readout">
        {readout.figures.map((f) => (
          <div className={`sg2-fig${f.tone ? ` sg2-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="sg2-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="sg2-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="sg2-frame">
        <div className={`sg2-grid${at === null ? "" : " is-picked"}`}>
          <span className="sg2-edge is-l" aria-hidden="true">
            <span className="sg2-edge-k hx-mono">{readout.edgeK}</span>
          </span>
          <span className="sg2-edge is-r" aria-hidden="true">
            <span className="sg2-edge-k hx-mono">{readout.edgeK}</span>
          </span>

          <div className="sg2-obs">
            <p className="sg2-obs-k hx-mono">{observation.kicker}</p>
            <p className="sg2-obs-v">{observation.k}</p>
            <p className="sg2-obs-line hx-mono">{observation.line}</p>
          </div>

          {readings.map((r, i) => (
            <div className={`sg2-cell is-${place[i]}${at === i ? " is-on" : ""}`} key={r.k} style={{ "--i": i }}>
              <button
                className="sg2-read"
                type="button"
                aria-pressed={at === i}
                onClick={() => pick(i)}
                onMouseEnter={() => setAt(i)}
              >
                <span className="sg2-read-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="sg2-read-k">{r.k}</span>
                <span className={`sg2-read-v hx-mono${ruledOut(r) ? " is-out" : ""}`}>
                  {ruledOut(r) ? readout.outK : readout.fitsK}
                </span>
              </button>
            </div>
          ))}

          {readings.map((r, i) => (
            <p className={`sg2-dec is-${place[i]}${at === i ? " is-on" : ""}`} key={`${r.k}-dec`} style={{ "--i": i }}>
              <span className="sg2-dec-k hx-mono">{readout.decK}</span>
              <span className="sg2-dec-v">{r.decider}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="sg2-routed" aria-live="polite">
        <p className="sg2-routed-k hx-mono">{shown ? shown.k : readout.restK}</p>
        {shown ? (
          <>
            <ol className="sg2-tests">
              {features.map((f) => (
                <li className={`sg2-test${shown.fits[f.key] === false ? " is-out" : ""}`} key={f.key}>
                  <span className="sg2-test-k">{f.k}</span>
                  <span className="sg2-test-v hx-mono">
                    {shown.fits[f.key] === false ? readout.contradictsK : readout.consistentK}
                  </span>
                </li>
              ))}
            </ol>
            <p className="sg2-routed-b">{shown.say}</p>
          </>
        ) : (
          <p className="sg2-routed-b">{readout.restB}</p>
        )}
      </div>

      <div className="sg2-body">
        <div className="sg2-said">
          <p className="sg2-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="sg2-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="sg2-aside">
          <p className="sg2-aside-k hx-mono">{aside.title}</p>
          <ol className="sg2-audit">
            {aside.items.map((item) => (
              <li className="sg2-audit-row" key={item.k}>
                <span className="sg2-audit-k">{item.k}</span>
                <span className="sg2-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="sg2-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="sg2-close">{close}</p>
      <figcaption className="sg2-note">{note}</figcaption>
    </figure>
  );
}
