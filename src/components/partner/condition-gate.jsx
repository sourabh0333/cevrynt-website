"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 04 — Four conditions, and all of them have to hold.
 *
 * Every other page on this site that mentions SHOPLINE says the same careful
 * thing: any production data flow depends on the specific implementation,
 * merchant authorisation, permitted data access and the lender's use case.
 * Written as a sentence, that list is easy to read as four considerations.
 * It is not — it is four conditions joined by "and", and a single missing one
 * means commerce context is not used at all.
 *
 * So the figure is a gate. Each condition is a switch wired into one output,
 * and the output is computed: only when all four are on does it read that
 * commerce context may inform the review. With any one off it falls back to
 * submitted documents only and names what is missing.
 *
 * The switches start off, because that is the honest default: nothing is
 * assumed. The reader turns them on, and the page never turns one on for them.
 * None of the four is met by the partnership on its own.
 *
 * Server-rendered in the all-off state with every condition, both outcomes'
 * wording and the wiring present.
 */
export function ConditionGate({ conditions, outputs, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [on, setOn] = useState(() => conditions.map(() => false));

  const toggle = useCallback((i) => setOn((cur) => cur.map((v, j) => (j === i ? !v : v))), []);
  const setAll = useCallback((v) => setOn(conditions.map(() => v)), [conditions]);

  const open = on.every(Boolean);
  const missing = conditions.filter((_, i) => !on[i]);
  const counts = {
    all: conditions.length,
    enough: 1,
    alone: conditions.filter((c) => c.byPartnershipAlone).length,
  };
  const out = open ? outputs.on : outputs.off;
  const y = (i) => ((i + 0.5) / conditions.length) * 100;

  return (
    <figure className={`sp4${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="sp4-readout">
        {readout.figures.map((f) => (
          <div className={`sp4-fig${f.tone ? ` sp4-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="sp4-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="sp4-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="sp4-controls">
        <p className="sp4-controls-k hx-mono">{readout.tryK}</p>
        <button className="sp4-all" type="button" onClick={() => setAll(true)} disabled={open}>
          {readout.allOnK}
        </button>
        <button className="sp4-all" type="button" onClick={() => setAll(false)} disabled={on.every((v) => !v)}>
          {readout.resetK}
        </button>
      </div>

      <div className={`sp4-circuit${open ? " is-open" : ""}`}>
        <ol className="sp4-conds">
          {conditions.map((c, i) => (
            <li className={`sp4-cond${on[i] ? " is-on" : ""}`} key={c.k} style={{ "--i": i }}>
              <button
                className="sp4-switch"
                type="button"
                role="switch"
                aria-checked={on[i]}
                onClick={() => toggle(i)}
              >
                <span className="sp4-track" aria-hidden="true">
                  <span className="sp4-thumb" />
                </span>
                <span className="sp4-cond-text">
                  <span className="sp4-cond-k">{c.k}</span>
                  <span className="sp4-cond-who hx-mono">{c.who}</span>
                </span>
              </button>
              <p className="sp4-cond-b">{c.b}</p>
            </li>
          ))}
        </ol>

        {/* Four wires into one gate. A wire is lit only while its condition holds. */}
        <div className="sp4-wires" aria-hidden="true">
          <svg className="sp4-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {conditions.map((c, i) => (
              <path
                className={`sp4-wire${on[i] ? " is-on" : ""}`}
                key={`${c.k}-wire`}
                d={`M 0 ${y(i)} C 55 ${y(i)}, 45 50, 100 50`}
              />
            ))}
          </svg>
          <span className="sp4-gate">
            <span className="sp4-gate-k hx-mono">{readout.gateK}</span>
          </span>
        </div>

        <div className={`sp4-out${open ? " is-open" : ""}`} aria-live="polite">
          <p className="sp4-out-state hx-mono">{open ? readout.openK : readout.closedK}</p>
          <p className="sp4-out-k">{out.k}</p>
          <p className="sp4-out-b">{out.b}</p>
          {open ? null : (
            <ul className="sp4-missing">
              {missing.map((m) => (
                <li className="sp4-miss" key={m.k}>
                  <span className="sp4-miss-x hx-mono" aria-hidden="true">
                    ✕
                  </span>
                  {m.k}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="sp4-body">
        <div className="sp4-said">
          <p className="sp4-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="sp4-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="sp4-aside">
          <p className="sp4-aside-k hx-mono">{aside.title}</p>
          <ol className="sp4-audit">
            {aside.items.map((item) => (
              <li className="sp4-audit-row" key={item.k}>
                <span className="sp4-audit-k">{item.k}</span>
                <span className="sp4-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="sp4-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="sp4-close">{close}</p>
      <figcaption className="sp4-note">{note}</figcaption>
    </figure>
  );
}
