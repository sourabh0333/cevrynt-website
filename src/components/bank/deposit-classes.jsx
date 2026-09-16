"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 01 — A deposit is not revenue.
 *
 * Gross deposits is the number everybody quotes and the one that is wrong most
 * often, because a bank statement makes no distinction between money a business
 * earned and money that simply arrived. A transfer from the owner's other
 * account, a supplier refund and the proceeds of somebody else's advance all
 * land in the same column as a card settlement.
 *
 * So the figure separates them and then stops. Selecting a category lifts the
 * actual statement line off the page and puts it under the chart, because the
 * descriptor is the evidence — a reader can see for themselves that
 * "TRNSFR FROM CHK" is not a sale, which is a far better argument than a
 * confidence figure attached to the same conclusion.
 *
 * The last category is the honest one. Three deposits carry no descriptor at
 * all, so the engine does not classify them: the statement genuinely does not
 * say, and guessing would put made-up revenue into somebody's underwriting.
 *
 * Server-rendered with every category, every total and every line present.
 */
export function DepositClasses({ classes, totals, columns, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const counts = {
    all: classes.reduce((n, c) => n + c.n, 0),
    classes: classes.length,
    flagged: classes.filter((c) => c.treat === "flag").reduce((n, c) => n + c.n, 0),
  };
  const shown = at === null ? null : classes[at];

  return (
    <figure className={`bk1${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bk1-readout">
        {readout.figures.map((f) => (
          <div className={`bk1-fig${f.tone ? ` bk1-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bk1-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="bk1-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="bk1-scroll">
        <div className={`bk1-chart${at === null ? "" : ` is-at-${at}`}`}>
          <div className="bk1-head">
            <span className="bk1-col-k hx-mono">{columns.k}</span>
            <span className="bk1-col-k is-r hx-mono">{columns.n}</span>
            <span className="bk1-col-k is-r hx-mono">{columns.amount}</span>
            <span className="bk1-col-k hx-mono">{columns.treat}</span>
          </div>

          <ol className="bk1-rows">
            {classes.map((c, i) => (
              <li className={`bk1-row is-${c.treat}`} key={c.k} style={{ "--r": i }}>
                <button
                  className="bk1-row-b"
                  type="button"
                  aria-pressed={at === i}
                  onClick={() => pick(i)}
                  onMouseEnter={() => setAt(i)}
                >
                  <span className="bk1-k">{c.k}</span>
                  <span className="bk1-n hx-mono">{c.n}</span>
                  <span className="bk1-amt hx-mono">{c.amount}</span>
                  <span className="bk1-treat hx-mono">{c.treatK}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="bk1-sum">
            <span className="bk1-sum-k hx-mono">{totals.k}</span>
            <span className="bk1-sum-n hx-mono">{counts.all}</span>
            <span className="bk1-sum-amt hx-mono">{totals.amount}</span>
            <span className="bk1-sum-b">{totals.b}</span>
          </div>
        </div>
      </div>

      {/* The descriptor is the evidence, so the line itself is the readout. */}
      <div className="bk1-line" aria-live="polite">
        <p className="bk1-line-k hx-mono">{shown ? readout.lineK : readout.restK}</p>
        {shown ? (
          <p className="bk1-line-row hx-mono">
            <span className="bk1-line-d">{shown.line.d}</span>
            <span className="bk1-line-desc">{shown.line.desc}</span>
            <span className="bk1-line-amt">{shown.line.amt}</span>
          </p>
        ) : null}
        <p className="bk1-line-b">{shown ? shown.say : readout.restB}</p>
      </div>

      <div className="bk1-body">
        <div className="bk1-said">
          <p className="bk1-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="bk1-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="bk1-aside">
          <p className="bk1-aside-k hx-mono">{aside.title}</p>
          <ol className="bk1-audit">
            {aside.items.map((item) => (
              <li className="bk1-audit-row" key={item.k}>
                <span className="bk1-audit-k">{item.k}</span>
                <span className="bk1-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bk1-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bk1-close">{close}</p>
      <figcaption className="bk1-note">{note}</figcaption>
    </figure>
  );
}
