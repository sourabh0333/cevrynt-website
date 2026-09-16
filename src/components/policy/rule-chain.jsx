"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 05 — Some rules only exist because another rule fired.
 *
 * Everything earlier on this page treats a policy as a flat list of independent
 * numbers, which is how policies get demonstrated and not how they get written.
 * Half of what a credit team wrote down is conditional: a requirement that
 * appears only because something else happened, and — just as important — a
 * requirement that quietly never applied because it did not.
 *
 * So each row here is a chain rather than a row: the thing the file did, what
 * that arms, and what that in turn arms. Chains are different lengths because
 * real conditions are, and the ones that end early say so rather than being
 * padded out to the width of the grid.
 *
 * The last chain never fires at all. It is still drawn, still on the record and
 * still countable, because a condition that did not apply is a fact about the
 * file and not an absence of one — and a policy run that only showed you the
 * rules that fired would be hiding half of what it did.
 *
 * Server-rendered with every chain, every step and every state present.
 */
export function RuleChain({ chains, columns, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const armed = chains.filter((c) => !c.dormant).length;
  const dormant = chains.length - armed;
  const counts = { all: chains.length, armed, dormant };
  const shown = at === null ? null : chains[at];

  return (
    <figure className={`pe5${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="pe5-readout">
        {readout.figures.map((f) => (
          <div className={`pe5-fig${f.tone ? ` pe5-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="pe5-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="pe5-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="pe5-scroll">
        <div className={`pe5-chart${at === null ? "" : ` is-at-${at}`}`}>
          <div className="pe5-head">
            {columns.map((c) => (
              <span className="pe5-col-k hx-mono" key={c}>
                {c}
              </span>
            ))}
          </div>

          <ol className="pe5-chains">
            {chains.map((c, r) => (
              <li
                className={`pe5-chain${c.dormant ? " is-dormant" : ""}`}
                key={c.steps[0].k}
                style={{ "--r": r }}
              >
                <button
                  className="pe5-chain-b"
                  type="button"
                  aria-pressed={at === r}
                  onClick={() => pick(r)}
                  onMouseEnter={() => setAt(r)}
                >
                  {c.steps.map((s, i) => (
                    <span className={`pe5-step is-s${i}`} key={s.k} style={{ "--s": i }}>
                      <span className="pe5-step-k">{s.k}</span>
                      <span className="pe5-state hx-mono">{s.v}</span>
                    </span>
                  ))}

                  {/* A chain that ends early says so rather than being padded out. */}
                  {c.steps.length < columns.length ? (
                    <span className="pe5-end hx-mono" style={{ "--s": c.steps.length }}>
                      {readout.endK}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="pe5-routed" aria-live="polite">
        <span className="pe5-routed-k hx-mono">{shown ? shown.steps[0].k : readout.restK}</span>
        <span className="pe5-routed-b">{shown ? shown.say : readout.restB}</span>
      </p>

      <div className="pe5-body">
        <ol className="pe5-list">
          {chains.map((c, i) => (
            <li
              className={`pe5-entry${c.dormant ? " is-dormant" : ""}`}
              key={c.steps[0].k}
              style={{ "--i": i }}
            >
              <span className="pe5-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="pe5-entry-k">{c.k}</span>
              <span className="pe5-b">{c.b}</span>
            </li>
          ))}
        </ol>

        <div className="pe5-aside">
          <p className="pe5-aside-k hx-mono">{aside.title}</p>
          <ol className="pe5-audit">
            {aside.items.map((item) => (
              <li className="pe5-audit-row" key={item.k}>
                <span className="pe5-audit-k">{item.k}</span>
                <span className="pe5-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="pe5-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="pe5-close">{close}</p>
      <figcaption className="pe5-note">{note}</figcaption>
    </figure>
  );
}
