"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 03 — Every line checked against the line above it.
 *
 * A bank statement carries its own proof: each running balance is the one
 * above it plus or minus that line's amount. Recompute the column and an
 * edited amount cannot hide, because every balance below it stops agreeing.
 *
 * The file as submitted is the default and the only real state here — every
 * line agrees. The other two are illustrations on a copy, and they are labelled
 * as such everywhere they appear. They exist to show why checks are layered:
 *
 *   An amount changed and the balances left alone breaks the arithmetic from
 *   that line down, and shows in exactly one line of the other July export.
 *
 *   An amount changed and every balance below it changed to match passes the
 *   arithmetic completely — and then disagrees with the other July export on
 *   every line from the edit onward, which is what section 01 compares.
 *
 * Neither verdict is typed. Both columns are recomputed from the lines of
 * whichever copy is shown, against the untouched export, on every change.
 *
 * Server-rendered in the as-submitted state with every line present.
 */
export function RunningCheck({ lines, edit, modes, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [mode, setMode] = useState(0);
  const [at, setAt] = useState(null);

  const pickMode = useCallback((m) => setMode(m), []);
  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  /* The copy being shown: amounts and printed balances for the active mode. */
  const shown = lines.map((l, i) => {
    const edited = mode > 0 && i === edit.index;
    const carried = mode === 2 && i >= edit.index;
    return {
      ...l,
      amt: edited ? l.amt + edit.delta : l.amt,
      printed: carried ? l.bal + edit.delta : l.bal,
      edited,
    };
  });

  /* Recompute the running balance from the opening line and the amounts. */
  const rows = shown.map((l, i) => {
    const recomputed = shown.slice(1, i + 1).reduce((b, x) => b + x.amt, shown[0].printed);
    const other = lines[i];
    return {
      ...l,
      recomputed,
      delta: l.printed - recomputed,
      matchesOther: l.amt === other.amt && l.printed === other.bal,
    };
  });

  const body = rows.slice(1);
  const counts = {
    lines: body.length,
    breaks: body.filter((r) => r.delta !== 0).length,
    differs: body.filter((r) => !r.matchesOther).length,
  };
  const maxDelta = Math.max(Math.abs(edit.delta), 1);

  const money = (c) =>
    (Math.abs(c) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const signed = (c) => (c === null ? "" : `${c < 0 ? "−" : "+"}${money(c)}`);
  const focus = at === null ? null : rows[at];

  return (
    <figure className={`sg3${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="sg3-readout">
        {readout.figures.map((f) => (
          <div className={`sg3-fig${counts[f.of] && f.tone ? ` sg3-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="sg3-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="sg3-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="sg3-modes" role="group" aria-label={readout.modesK}>
        {modes.map((m, i) => (
          <button
            className={`sg3-mode${mode === i ? " is-on" : ""}${i ? " is-demo" : ""}`}
            key={m.k}
            type="button"
            aria-pressed={mode === i}
            onClick={() => pickMode(i)}
          >
            <span className="sg3-mode-k hx-mono">{m.tag}</span>
            <span className="sg3-mode-v">{m.k}</span>
          </button>
        ))}
      </div>

      <p className={`sg3-banner hx-mono${mode ? " is-demo" : ""}`} aria-live="polite">
        {modes[mode].banner}
      </p>

      <div className="sg3-scroll">
        <div className={`sg3-chart is-mode-${mode}${at === null ? "" : " is-picked"}`}>
          <div className="sg3-head">
            <span className="sg3-hk hx-mono">#</span>
            <span className="sg3-hk hx-mono">{readout.colK.d}</span>
            <span className="sg3-hk hx-mono">{readout.colK.desc}</span>
            <span className="sg3-hk is-r hx-mono">{readout.colK.amt}</span>
            <span className="sg3-hk is-r hx-mono">{readout.colK.printed}</span>
            <span className="sg3-hk is-r hx-mono">{readout.colK.recomputed}</span>
            <span className="sg3-hk is-c hx-mono">{readout.colK.delta}</span>
            <span className="sg3-hk is-c hx-mono">{readout.colK.other}</span>
          </div>

          <ol className="sg3-rows">
            {rows.map((r, i) => (
              <li
                className={`sg3-row${r.delta ? " is-break" : ""}${r.matchesOther ? "" : " is-other"}${r.edited ? " is-edited" : ""}${at === i ? " is-on" : ""}`}
                key={`${r.n}-${r.desc}`}
                style={{ "--i": i }}
              >
                <button
                  className="sg3-row-b"
                  type="button"
                  aria-pressed={at === i}
                  onClick={() => pick(i)}
                  onMouseEnter={() => setAt(i)}
                >
                  <span className="sg3-n hx-mono">{r.n}</span>
                  <span className="sg3-d hx-mono">{r.d}</span>
                  <span className="sg3-desc hx-mono">{r.desc}</span>
                  <span className={`sg3-amt hx-mono${r.amt !== null && r.amt < 0 ? " is-debit" : ""}`}>{signed(r.amt)}</span>
                  <span className="sg3-printed hx-mono">{money(r.printed)}</span>
                  <span className="sg3-rec hx-mono">{money(r.recomputed)}</span>

                  {/* The gap between printed and recomputed, drawn from a centre line. */}
                  <span className="sg3-strip" aria-label={r.delta ? `${readout.offByK} ${signed(r.delta)}` : readout.agreesK}>
                    <span className="sg3-axis" aria-hidden="true" />
                    <span
                      className={`sg3-gap${r.delta < 0 ? " is-under" : ""}`}
                      style={{ "--w": `${(Math.abs(r.delta) / maxDelta) * 50}%` }}
                      aria-hidden="true"
                    />
                    <span className="sg3-dot" aria-hidden="true" />
                  </span>

                  <span className="sg3-other hx-mono" aria-label={r.matchesOther ? readout.sameK : readout.diffK}>
                    {r.matchesOther ? "=" : "≠"}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="sg3-routed" aria-live="polite">
        <p className="sg3-routed-k hx-mono">
          {focus ? `${readout.lineK} ${focus.n} · ${focus.d}` : modes[mode].restK}
        </p>
        {focus ? (
          <dl className="sg3-cmp">
            <div className="sg3-cmp-row">
              <dt className="hx-mono">{readout.colK.printed}</dt>
              <dd className="hx-mono">{money(focus.printed)}</dd>
            </div>
            <div className="sg3-cmp-row">
              <dt className="hx-mono">{readout.colK.recomputed}</dt>
              <dd className="hx-mono">{money(focus.recomputed)}</dd>
            </div>
            <div className={`sg3-cmp-row${focus.delta ? " is-bad" : ""}`}>
              <dt className="hx-mono">{readout.colK.delta}</dt>
              <dd className="hx-mono">{focus.delta ? signed(focus.delta) : readout.agreesK}</dd>
            </div>
            <div className={`sg3-cmp-row${focus.matchesOther ? "" : " is-bad"}`}>
              <dt className="hx-mono">{readout.colK.other}</dt>
              <dd className="hx-mono">{focus.matchesOther ? readout.sameK : readout.diffK}</dd>
            </div>
          </dl>
        ) : (
          <p className="sg3-routed-b">{modes[mode].restB}</p>
        )}
      </div>

      <div className="sg3-body">
        <div className="sg3-said">
          <p className="sg3-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="sg3-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="sg3-aside">
          <p className="sg3-aside-k hx-mono">{aside.title}</p>
          <ol className="sg3-audit">
            {aside.items.map((item) => (
              <li className="sg3-audit-row" key={item.k}>
                <span className="sg3-audit-k">{item.k}</span>
                <span className="sg3-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="sg3-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="sg3-close">{close}</p>
      <figcaption className="sg3-note">{note}</figcaption>
    </figure>
  );
}
