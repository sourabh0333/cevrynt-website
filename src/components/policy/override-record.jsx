"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 06 — A reviewer can go past the rule, and the record does not forget it.
 *
 * Overrides are not a loophole in a policy engine. They are most of the reason
 * to have one, because a lender who cannot depart from their own rule does not
 * have a policy, they have a cage. What matters is what survives afterwards.
 *
 * So the ledger has two lanes that behave differently. The left lane is what
 * the engine produced and it never moves — not on the page, and not in the
 * record. The right lane is what a reviewer appended, and it arrives by being
 * uncovered rather than by replacing anything, which is the whole claim stated
 * as a motion: the override is added to the finding, never written over it.
 *
 * The fourth row is the one that matters most and reads as the least
 * interesting — a criterion nobody touched, recorded with exactly the same
 * weight as the three that were overridden.
 *
 * Server-rendered with both lanes, every entry and every reviewer present.
 */
export function OverrideRecord({ rows, columns, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const counts = {
    all: rows.length,
    entries: rows.filter((r) => !r.untouched).length,
    changed: 0,
  };
  const shown = at === null ? null : rows[at];

  return (
    <figure className={`pe6${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="pe6-readout">
        {readout.figures.map((f) => (
          <div className={`pe6-fig${f.tone ? ` pe6-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="pe6-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="pe6-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="pe6-scroll">
        <div className={`pe6-ledger${at === null ? "" : ` is-at-${at}`}`}>
          <div className="pe6-head">
            <span className="pe6-col-k hx-mono">{columns.crit}</span>
            <span className="pe6-col-k hx-mono">{columns.engine}</span>
            <span className="pe6-col-k is-added hx-mono">{columns.added}</span>
          </div>

          <ol className="pe6-rows">
            {rows.map((r, i) => (
              <li
                className={`pe6-row${r.untouched ? " is-untouched" : ""}`}
                key={r.k}
                style={{ "--r": i }}
              >
                <button
                  className="pe6-row-b"
                  type="button"
                  aria-pressed={at === i}
                  onClick={() => pick(i)}
                  onMouseEnter={() => setAt(i)}
                >
                  <span className="pe6-crit">{r.k}</span>

                  {/* What the engine produced. This lane never moves. */}
                  <span className="pe6-eng">
                    {/* The head row is a desktop affordance; stacked lanes carry
                        their own label so the two never blur together. */}
                    <span className="pe6-lane-k hx-mono">{columns.engine}</span>
                    <span className={`pe6-eng-s is-${r.tone} hx-mono`}>{r.engine}</span>
                    <span className="pe6-eng-b">{r.engineB}</span>
                  </span>

                  {/* What a reviewer appended. Uncovered, never written over. */}
                  <span className="pe6-rev">
                    <span className="pe6-rev-in">
                      <span className="pe6-lane-k is-added hx-mono">{columns.added}</span>
                      <span className="pe6-rev-s hx-mono">{r.entry}</span>
                      <span className="pe6-rev-b">{r.who}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="pe6-routed" aria-live="polite">
        <span className="pe6-routed-k hx-mono">{shown ? shown.reasonK : readout.restK}</span>
        <span className="pe6-routed-b">{shown ? shown.reason : readout.restB}</span>
      </p>

      <div className="pe6-body">
        <div className="pe6-said">
          <p className="pe6-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="pe6-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="pe6-aside">
          <p className="pe6-aside-k hx-mono">{aside.title}</p>
          <ol className="pe6-audit">
            {aside.items.map((item) => (
              <li className="pe6-audit-row" key={item.k}>
                <span className="pe6-audit-k">{item.k}</span>
                <span className="pe6-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="pe6-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="pe6-close">{close}</p>
      <figcaption className="pe6-note">{note}</figcaption>
    </figure>
  );
}
