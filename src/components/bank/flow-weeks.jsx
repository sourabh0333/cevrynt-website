"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 05 — What came in, what went out, and which one was bigger.
 *
 * Everything earlier on this page reads one side of the statement: deposits,
 * the balance they produce, the positions drawing on it. None of it shows the
 * other column, and cash flow is the two columns held against each other.
 *
 * So each week is a column split at a shared axis — money in rising above it,
 * money out falling below it — with the week's net ruled across at its own
 * height. The June weeks need no annotation: income collapses above the line
 * while spending doubles below it, and the net mark drops out of sight.
 *
 * Every figure is derived from the daily balance in section 04, so a week's
 * net is exactly that week's change in the curve. The two loan repayments from
 * section 03 sit inside the outflow bars and the $9,500 advance inside the
 * inflow bar of the week it landed, so the three figures describe one account.
 *
 * Server-rendered with every week, both bars and the net present.
 */
export function FlowWeeks({ weeks, scaleMax, totals, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const k = (d) => `${d < 0 ? "−" : ""}$${(Math.abs(d) / 1000).toFixed(1)}K`;
  const usd = (d, signed) => `${d < 0 ? "−" : signed ? "+" : ""}$${Math.abs(d).toLocaleString("en-US")}`;
  const h = (d) => `${(Math.abs(d) / scaleMax) * 100}%`;

  const stats = { in: k(totals.in), out: k(totals.out), net: k(totals.in - totals.out) };
  const shown = at === null ? null : weeks[at];

  return (
    <figure className={`bk5${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bk5-readout">
        {readout.figures.map((f) => (
          <div className={`bk5-fig${f.tone ? ` bk5-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bk5-fig-n">{stats[f.of]}</dt>
            <dd className="bk5-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <p className="bk5-legend hx-mono">
        <span className="bk5-leg is-in">{readout.inK}</span>
        <span className="bk5-leg is-out">{readout.outK}</span>
        <span className="bk5-leg is-net">{readout.netK}</span>
        <span className="bk5-leg is-pos">{readout.posK}</span>
      </p>

      <div className="bk5-scroll">
        <ol className={`bk5-weeks${at === null ? "" : " is-picked"}`}>
          {weeks.map((w, i) => (
            <li className={`bk5-week${at === i ? " is-on" : ""}${w.net < 0 ? " is-short" : ""}`} key={w.k} style={{ "--i": i }}>
              <button
                className="bk5-week-b"
                type="button"
                aria-pressed={at === i}
                aria-label={`${w.range}: ${usd(w.in)} in, ${usd(w.out)} out, net ${usd(w.net, true)}`}
                onClick={() => pick(i)}
                onMouseEnter={() => setAt(i)}
              >
                {/* The week's net is ruled inside whichever half it falls in, so
                    its height is measured against the same scale as the bars. */}
                <span className="bk5-half is-up" aria-hidden="true">
                  <span className="bk5-bar is-in" style={{ "--h": h(w.in) }}>
                    {w.advance ? <span className="bk5-seg is-adv" style={{ "--s": `${(w.advance / w.in) * 100}%` }} /> : null}
                  </span>
                  {w.net >= 0 ? <span className="bk5-net" style={{ "--h": h(w.net) }} /> : null}
                </span>

                <span className="bk5-half is-down" aria-hidden="true">
                  <span className="bk5-bar is-out" style={{ "--h": h(w.out) }}>
                    <span className="bk5-seg is-pos" style={{ "--s": `${(w.positions / w.out) * 100}%` }} />
                  </span>
                  {w.net < 0 ? <span className="bk5-net is-neg" style={{ "--h": h(w.net) }} /> : null}
                </span>

                <span className="bk5-wk hx-mono" aria-hidden="true">
                  {w.k}
                </span>
                <span className="bk5-dots" aria-hidden="true">
                  {Array.from({ length: w.neg }, (_, d) => (
                    <span className="bk5-dot" key={`${w.k}-n${d}`} />
                  ))}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="bk5-routed" aria-live="polite">
        <p className="bk5-routed-k hx-mono">{shown ? shown.range : readout.restK}</p>
        {shown ? (
          <dl className="bk5-routed-row">
            <div className="bk5-rv">
              <dt className="hx-mono">{readout.inK}</dt>
              <dd className="hx-mono">{usd(shown.in)}</dd>
            </div>
            <div className="bk5-rv">
              <dt className="hx-mono">{readout.outK}</dt>
              <dd className="hx-mono">{usd(shown.out)}</dd>
            </div>
            <div className={`bk5-rv${shown.net < 0 ? " is-neg" : ""}`}>
              <dt className="hx-mono">{readout.netK}</dt>
              <dd className="hx-mono">{usd(shown.net, true)}</dd>
            </div>
            <div className="bk5-rv">
              <dt className="hx-mono">{readout.posK}</dt>
              <dd className="hx-mono">{usd(shown.positions)}</dd>
            </div>
            <div className="bk5-rv">
              <dt className="hx-mono">{readout.negK}</dt>
              <dd className="hx-mono">{shown.neg}</dd>
            </div>
          </dl>
        ) : (
          <p className="bk5-routed-b">{readout.restB}</p>
        )}
      </div>

      <div className="bk5-body">
        <div className="bk5-said">
          <p className="bk5-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="bk5-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="bk5-aside">
          <p className="bk5-aside-k hx-mono">{aside.title}</p>
          <ol className="bk5-audit">
            {aside.items.map((item) => (
              <li className="bk5-audit-row" key={item.k}>
                <span className="bk5-audit-k">{item.k}</span>
                <span className="bk5-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bk5-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bk5-close">{close}</p>
      <figcaption className="bk5-note">{note}</figcaption>
    </figure>
  );
}
