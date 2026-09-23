"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 03 — One advance you can see start, and one you can only see paying.
 *
 * An existing position is the single most consequential thing on a bank
 * statement for a merchant cash advance, and it rarely announces itself. Some
 * arrive as a funding credit with a lender's descriptor on it. Others were
 * funded before the statements begin, or into another account entirely, and
 * the only trace left in these pages is the rhythm of what goes out.
 *
 * So each position is drawn as a rail across the whole period, one tick per
 * debit on its true date. The rhythm is the evidence: a tick every business day
 * is one kind of agreement, a tick every Tuesday is another, and the gaps say
 * something too — the two holes in the daily rail are bank holidays, not missed
 * payments, and the engine knows the difference.
 *
 * The second rail has no funding credit anywhere on it, and the figure says so
 * across the stretch where one would have been. That is why it arrives here as
 * a signal for a person rather than as a position anybody has confirmed.
 *
 * Server-rendered with every rail, every tick and every label present.
 */
export function PositionRails({ positions, months, days, holidays, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const x = (i) => ((i + 0.5) / days) * 100;
  const counts = {
    all: positions.length,
    seen: positions.filter((p) => p.credit).length,
    inferred: positions.filter((p) => !p.credit).length,
  };
  const shown = at === null ? null : positions[at];

  /* Each month starts after the days of every month before it. */
  const bands = months.map((m, i) => {
    const start = months.slice(0, i).reduce((s, p) => s + p.days, 0);
    return { ...m, from: (start / days) * 100, width: (m.days / days) * 100 };
  });

  return (
    <figure className={`bk3${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bk3-readout">
        {readout.figures.map((f) => (
          <div className={`bk3-fig${f.tone ? ` bk3-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bk3-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="bk3-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="bk3-scroll">
        <div className={`bk3-chart${at === null ? "" : ` is-at-${at}`}`}>
          <div className="bk3-axis">
            <span className="bk3-corner hx-mono">{readout.cornerK}</span>
            <span className="bk3-months">
              {bands.map((b) => (
                <span className="bk3-month hx-mono" key={b.k} style={{ "--a": `${b.from}%`, "--w": `${b.width}%` }}>
                  {b.k}
                </span>
              ))}
            </span>
          </div>

          <ol className="bk3-rails">
            {positions.map((p, r) => (
              <li className={`bk3-pos${p.credit ? " is-seen" : " is-inferred"}`} key={p.k} style={{ "--r": r }}>
                <button
                  className="bk3-pos-b"
                  type="button"
                  aria-pressed={at === r}
                  onClick={() => pick(r)}
                  onMouseEnter={() => setAt(r)}
                >
                  <span className="bk3-pos-k">{p.k}</span>
                  <span className="bk3-pos-v hx-mono">{p.cadenceK}</span>
                  <span className="bk3-pos-n hx-mono">
                    {p.debits.length} × {p.amount} = {p.total}
                  </span>
                </button>

                <div className="bk3-rail">
                  <span className="bk3-base" aria-hidden="true" />

                  {bands.slice(1).map((b) => (
                    <span className="bk3-sep" key={`${p.k}-${b.k}`} style={{ "--a": `${b.from}%` }} aria-hidden="true" />
                  ))}

                  {/* The stretch where a funding credit would have been, and is not. */}
                  {p.credit ? null : (
                    <span className="bk3-absent" style={{ "--w": `${x(p.debits[0]) - 1}%` }}>
                      <span className="bk3-absent-k hx-mono">{p.absentK}</span>
                    </span>
                  )}

                  {p.credit ? (
                    <span className="bk3-credit" style={{ "--x": `${x(p.credit.i)}%` }}>
                      <span className="bk3-credit-k hx-mono">{p.credit.k}</span>
                    </span>
                  ) : null}

                  {p.debits.map((d, n) => (
                    <span
                      className="bk3-tick"
                      key={`${p.k}-d${d}`}
                      style={{ "--x": `${x(d)}%`, "--n": n }}
                      aria-hidden="true"
                    />
                  ))}

                  {p.credit
                    ? holidays.map((h) => (
                        <span className="bk3-hol" key={`${p.k}-h${h.i}`} style={{ "--x": `${x(h.i)}%` }}>
                          <span className="bk3-hol-k hx-mono">{h.k}</span>
                        </span>
                      ))
                    : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="bk3-routed" aria-live="polite">
        <span className="bk3-routed-k hx-mono">{shown ? shown.k : readout.restK}</span>
        <span className="bk3-routed-b">{shown ? shown.say : readout.restB}</span>
      </p>

      <div className="bk3-body">
        <ol className="bk3-list">
          {positions.map((p, i) => (
            <li className={`bk3-entry${p.credit ? "" : " is-inferred"}`} key={p.k} style={{ "--i": i }}>
              <span className="bk3-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="bk3-entry-k">{p.k}</span>
              <span className="bk3-b">{p.b}</span>
            </li>
          ))}
        </ol>

        <div className="bk3-aside">
          <p className="bk3-aside-k hx-mono">{aside.title}</p>
          <ol className="bk3-audit">
            {aside.items.map((item) => (
              <li className="bk3-audit-row" key={item.k}>
                <span className="bk3-audit-k">{item.k}</span>
                <span className="bk3-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bk3-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bk3-close">{close}</p>
      <figcaption className="bk3-note">{note}</figcaption>
    </figure>
  );
}
