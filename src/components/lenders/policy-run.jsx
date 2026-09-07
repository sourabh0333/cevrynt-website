"use client";

import { useEffect, useRef, useState } from "react";
import { useCoarsePointer, useHasEntered, useReady, useReducedMotion } from "@/components/progressive";

/** A settled rule is read and left behind. One that is not stops the run. */
const DWELL_PASS = 820;
const DWELL_HELD = 2600;

/**
 * 01 — Twelve criteria, and the two that stop the run.
 *
 * The version this replaces was a table with a marker sliding down its left
 * margin, which was wrong twice. The marker floated in the rail at the same
 * offset as the headline figures, so it read as a stray tick rather than as a
 * pointer at anything. And a table is the shape you reach for when you have not
 * decided what the figure is.
 *
 * The figure is that these criteria are not the same kind of thing as each
 * other. Ten of the twelve settle on arithmetic and are one line long, because
 * one line is all they cost anybody. Two of them stop, and those two open out —
 * they carry the reviewer, the time, the reason code, and in one case the fact
 * that no override exists and the exception is simply still open. So the height
 * of an entry is the measurement: a person is in it, or a person is not.
 *
 * The run walks the entries and dwells on each for as long as it costs, and it
 * is drawn inside the entry it is reading rather than beside the list, so there
 * is nothing loose in the margin.
 *
 * The last figure is the one that matters most here and it is a word: no. No
 * disposition is issued. An exception is raised and held for a named reviewer,
 * an override is recorded with its reason, the policy version is retained
 * against the decision — and the engine never declines.
 *
 * Server-rendered with every criterion and every record present, so the whole
 * evaluation reads as finished without JavaScript.
 */
export function PolicyRun({ criteria, readout, audit, note }) {
  const scope = useRef(null);

  const ready = useReady();
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const entered = useHasEntered(scope, 0.2);

  const [head, setHead] = useState(0);
  const [held, setHeld] = useState(false);

  const running = ready && entered && !held && !reduced && !coarse;

  useEffect(() => {
    if (!running) return undefined;
    const dwell = criteria[head].held ? DWELL_HELD : DWELL_PASS;
    const id = window.setTimeout(() => setHead((i) => (i + 1) % criteria.length), dwell);
    return () => window.clearTimeout(id);
  }, [running, head, criteria]);

  return (
    <figure className={`pe${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      {/* Three figures on one baseline: the numerals align, not their boxes. */}
      <dl className="pe-readout">
        {readout.figures.map((figure) => (
          <div className={`pe-fig${figure.tone ? ` pe-fig-${figure.tone}` : ""}`} key={figure.k}>
            <dt className="pe-fig-n">{figure.n}</dt>
            <dd className="pe-fig-k hx-mono">{figure.k}</dd>
          </div>
        ))}
      </dl>

      <div className="pe-body">
        <ol
          className="pe-list"
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
        >
          {criteria.map((c, i) => (
            <li
              className={`pe-entry${c.held ? " is-held" : " is-settled"}${i === head ? " is-at" : ""}`}
              key={c.name}
              onMouseEnter={() => setHead(i)}
            >
              {/* The reading edge, drawn inside the entry it is reading. */}
              <span className="pe-edge" aria-hidden="true" />

              <span className="pe-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="pe-name">{c.name}</span>
              <span className="pe-obs">{c.observed}</span>
              <span className="pe-thr hx-mono">{c.threshold}</span>
              <span className="pe-state hx-mono">{c.result}</span>

              {/* Only the ones that stop have anything more to say. */}
              {c.record ? (
                <span className="pe-record">
                  <span className="pe-record-t">{c.record.what}</span>
                  <span className="pe-record-m hx-mono">{c.record.who}</span>
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="pe-aside">
          {/* What the engine is required to keep, whatever the answer is. */}
          <p className="pe-aside-k hx-mono">{audit.title}</p>
          <ol className="pe-audit">
            {audit.items.map((item) => (
              <li className="pe-audit-row" key={item.k}>
                <span className="pe-audit-k">{item.k}</span>
                <span className="pe-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="pe-audit-note">{audit.note}</p>
        </div>
      </div>

      <figcaption className="pe-note">{note}</figcaption>
    </figure>
  );
}
