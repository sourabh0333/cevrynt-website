"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 02 — The period, one day at a time.
 *
 * "Six returned items" is a count, and a count is the least informative true
 * thing you can say about a bank statement. Six spread evenly
 * is a business that runs close to the line all year. Four inside one week is
 * one bad fortnight, and those are not the same file.
 *
 * So the period is drawn as days rather than summarised as totals: three month
 * grids, every day present, with the days the account closed below zero and
 * the days a payment came back marked on the dates they actually happened. The
 * cluster is visible without anybody being told it is there.
 *
 * The third reading is the one worth having. Five of the six returns fall on a
 * day the account was already below zero, which makes them a symptom of the
 * balance rather than six independent events — and no count of returns, however
 * accurate, could have told anybody that.
 *
 * Server-rendered with every day, every mark and every reading present.
 */
export function DayGrid({ months, readings, weekdays, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(0);

  const pick = useCallback((i) => setAt(i), []);

  const isNeg = (m, d) => m.negatives.includes(d);
  const isRet = (m, d) => m.returns.includes(d);

  const counts = {
    days: months.reduce((n, m) => n + m.days, 0),
    negatives: months.reduce((n, m) => n + m.negatives.length, 0),
    both: months.reduce((n, m) => n + m.returns.filter((d) => m.negatives.includes(d)).length, 0),
  };

  return (
    <figure className={`bk2${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bk2-readout">
        {readout.figures.map((f) => (
          <div className={`bk2-fig${f.tone ? ` bk2-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bk2-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="bk2-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <ol className="bk2-keys">
        {readings.map((r, i) => (
          <li className="bk2-key" key={r.k}>
            <button
              className={`bk2-key-b${at === i ? " is-on" : ""}`}
              type="button"
              aria-pressed={at === i}
              onClick={() => pick(i)}
              onMouseEnter={() => pick(i)}
            >
              <span className={`bk2-key-m is-r${i}`} aria-hidden="true" />
              <span className="bk2-key-k">{r.k}</span>
              <span className="bk2-key-n hx-mono">{counts[r.of]}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="bk2-scroll">
        <ol className={`bk2-months is-read-${at}`}>
          {months.map((m, c) => (
            <li className="bk2-month" key={m.k} style={{ "--c": c }}>
              <p className="bk2-month-h">
                <span className="bk2-month-k">{m.k}</span>
                <span className="bk2-month-n hx-mono">{m.n}</span>
              </p>

              <div className="bk2-dow" aria-hidden="true">
                {weekdays.map((w, i) => (
                  <span className="bk2-dow-k hx-mono" key={`${m.k}-dow${i}`}>
                    {w}
                  </span>
                ))}
              </div>

              <div className="bk2-grid">
                {Array.from({ length: m.days }, (_, i) => {
                  const d = i + 1;
                  const neg = isNeg(m, d);
                  const ret = isRet(m, d);
                  const cls = `bk2-d${neg ? " is-neg" : ""}${ret ? " is-ret" : ""}${
                    neg && ret ? " is-both" : ""
                  }`;

                  return (
                    <span
                      className={cls}
                      key={`${m.k}-${d}`}
                      style={d === 1 ? { "--o": m.offset, "--i": i } : { "--i": i }}
                    >
                      <span className="bk2-d-n hx-mono">{d}</span>
                    </span>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="bk2-routed" aria-live="polite">
        <span className="bk2-routed-k hx-mono">{readings[at].k}</span>
        <span className="bk2-routed-b">{readings[at].say}</span>
      </p>

      <div className="bk2-body">
        <ol className="bk2-list">
          {readings.map((r, i) => (
            <li className="bk2-entry" key={r.k} style={{ "--i": i }}>
              <span className="bk2-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="bk2-entry-k">{r.k}</span>
              <span className="bk2-b">{r.b}</span>
            </li>
          ))}
        </ol>

        <div className="bk2-aside">
          <p className="bk2-aside-k hx-mono">{aside.title}</p>
          <ol className="bk2-audit">
            {aside.items.map((item) => (
              <li className="bk2-audit-row" key={item.k}>
                <span className="bk2-audit-k">{item.k}</span>
                <span className="bk2-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bk2-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bk2-close">{close}</p>
      <figcaption className="bk2-note">{note}</figcaption>
    </figure>
  );
}
