"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 04 — What a rule can hold, and what it cannot.
 *
 * Everything before this section argues about where a threshold belongs. This
 * one argues that most of what a credit team actually knows was never a
 * threshold in the first place, and that a platform which pretends otherwise is
 * quietly inventing judgment it does not have.
 *
 * So the figure is a convergence rather than a scale: three groups of real
 * underwriting conditions, each group collected onto a spine and carried across
 * to one of two endpoints. Three conditions reach the endpoint the engine
 * answers. Six reach the endpoint a person answers, and the two groups that get
 * there arrive for completely different reasons — one because the engine can
 * see the thing but cannot weigh it, the other because there is nothing to
 * compute at all.
 *
 * The connectors are laid out rather than measured: each group's spine runs the
 * height of its own rows and its arm leaves from that list's centre, so nothing
 * here depends on reading positions back out of the DOM.
 *
 * Server-rendered with every condition, every spine and both endpoints present.
 */
export function RuleLimit({ groups, endpoints, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const count = (end) =>
    groups.filter((g) => g.endpoint === end).reduce((n, g) => n + g.items.length, 0);

  const totals = { all: groups.reduce((n, g) => n + g.items.length, 0), eng: count(0), ppl: count(1) };

  return (
    <figure className={`pe4${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="pe4-readout">
        {readout.figures.map((f) => (
          <div className={`pe4-fig${f.tone ? ` pe4-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="pe4-fig-n">{String(totals[f.of]).padStart(2, "0")}</dt>
            <dd className="pe4-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="pe4-scroll">
        <div className={`pe4-chart${at === null ? "" : ` is-at-${at}`}`}>
          {groups.map((g, i) => (
            <div className={`pe4-group is-e${g.endpoint}`} key={g.k} style={{ "--i": i, "--g": i }}>
              <button
                className={`pe4-group-b${at === i ? " is-on" : ""}`}
                type="button"
                aria-pressed={at === i}
                onClick={() => pick(i)}
                onMouseEnter={() => setAt(i)}
              >
                <span className="pe4-group-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="pe4-group-k">{g.k}</span>
                <span className="pe4-group-v hx-mono">{g.kicker}</span>
              </button>

              <ol className="pe4-rows">
                {g.items.map((item) => (
                  <li className="pe4-row" key={item.k}>
                    <p className="pe4-row-k">{item.k}</p>
                    <p className="pe4-row-b">{item.b}</p>
                  </li>
                ))}

                {/* Collected onto one spine, then carried across to an endpoint. */}
                <li className="pe4-spine" aria-hidden="true" />
                <li className="pe4-arm" aria-hidden="true" />
              </ol>
            </div>
          ))}

          {endpoints.map((e, i) => (
            <div className={`pe4-end is-e${i}`} key={e.k} style={{ "--i": i }}>
              <p className="pe4-end-k">{e.k}</p>
              <p className="pe4-end-b">{e.b}</p>
              <p className="pe4-end-n hx-mono">
                {i === 0 ? totals.eng : totals.ppl} {readout.ofK} {totals.all}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="pe4-body">
        <div className="pe4-said">
          <p className="pe4-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="pe4-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="pe4-aside">
          <p className="pe4-aside-k hx-mono">{aside.title}</p>
          <ol className="pe4-audit">
            {aside.items.map((item) => (
              <li className="pe4-audit-row" key={item.k}>
                <span className="pe4-audit-k">{item.k}</span>
                <span className="pe4-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="pe4-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="pe4-close">{close}</p>
      <figcaption className="pe4-note">{note}</figcaption>
    </figure>
  );
}
