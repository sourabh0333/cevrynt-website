"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 04 — The moment somebody decides, the report stops moving.
 *
 * A file keeps changing after it has been worked. A statement arrives late,
 * the credit committee edits a threshold, somebody pulls the deal for a
 * portfolio review a month on. The question that decides whether any of this
 * is defensible is whether the report answers what was decided or what would
 * be decided now.
 *
 * So the figure is one chronology cut by a seal. Above it, the events that
 * formed the decided report. On it, the decision — recorded as having been
 * entered, by whom, and against which policy version, and deliberately not as
 * an outcome, because the outcome is the lender's and is not ours to print.
 * Below it, everything that happened afterwards, drawn at lower weight on a
 * broken spine because it is on the file and outside the decision.
 *
 * The last entry is the reason the seal exists at all: a reviewer coming back
 * forty days later reads what was decided, not what the rules would say today.
 *
 * Server-rendered with every event, the seal and every later entry present.
 */
export function DecisionSeal({ before, seal, after, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((k) => setAt((cur) => (cur === k ? null : k)), []);

  const counts = { before: before.length, decision: 1, after: after.length };
  const all = [...before, ...after];
  const shown = at === null ? null : all.find((e) => e.k === at);

  const event = (e, i, side) => (
    <li className={`ur4-event is-${side}${at === e.k ? " is-on" : ""}`} key={e.k} style={{ "--r": i }}>
      <button
        className="ur4-event-b"
        type="button"
        aria-pressed={at === e.k}
        onClick={() => pick(e.k)}
        onMouseEnter={() => setAt(e.k)}
      >
        <span className="ur4-t hx-mono">{e.t}</span>
        <span className="ur4-stage hx-mono">{e.stage}</span>
        <span className="ur4-what">{e.k}</span>
        {e.outside ? <span className="ur4-outside hx-mono">{e.outside}</span> : null}
      </button>
    </li>
  );

  return (
    <figure className={`ur4${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="ur4-readout">
        {readout.figures.map((f) => (
          <div className={`ur4-fig${f.tone ? ` ur4-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="ur4-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="ur4-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="ur4-scroll">
        <div className={`ur4-track${at === null ? "" : " is-picked"}`}>
          <ol className="ur4-events">{before.map((e, i) => event(e, i, "before"))}</ol>

          {/* The cut. Everything above it formed the decision. */}
          <div className="ur4-seal">
            <span className="ur4-seal-rule" aria-hidden="true" />
            <p className="ur4-seal-t hx-mono">{seal.t}</p>
            <p className="ur4-seal-k">{seal.k}</p>
            <dl className="ur4-seal-fields">
              {seal.fields.map((f) => (
                <div className="ur4-seal-f" key={f.k}>
                  <dt className="ur4-seal-f-k hx-mono">{f.k}</dt>
                  <dd className="ur4-seal-f-v">{f.v}</dd>
                </div>
              ))}
            </dl>
            <p className="ur4-seal-b">{seal.b}</p>
          </div>

          <ol className="ur4-events is-after">{after.map((e, i) => event(e, i, "after"))}</ol>
        </div>
      </div>

      <p className="ur4-routed" aria-live="polite">
        <span className="ur4-routed-k hx-mono">{shown ? shown.k : readout.restK}</span>
        <span className="ur4-routed-b">{shown ? shown.say : readout.restB}</span>
      </p>

      <div className="ur4-body">
        <div className="ur4-said">
          <p className="ur4-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="ur4-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="ur4-aside">
          <p className="ur4-aside-k hx-mono">{aside.title}</p>
          <ol className="ur4-audit">
            {aside.items.map((item) => (
              <li className="ur4-audit-row" key={item.k}>
                <span className="ur4-audit-k">{item.k}</span>
                <span className="ur4-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="ur4-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="ur4-close">{close}</p>
      <figcaption className="ur4-note">{note}</figcaption>
    </figure>
  );
}
