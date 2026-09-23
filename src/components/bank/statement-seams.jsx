"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 06 — Three statements, whether they join up, and what they point at.
 *
 * Every figure on this page assumes the statements are a continuous record of
 * one account. That assumption is the first thing an analyst checks by hand
 * and the last thing a summary ever shows: does each statement's arithmetic
 * close, does each one open where the last one closed, is any day missing —
 * and does anything in them refer to an account that is not in the file?
 *
 * So the three statements are laid end to end on the calendar they cover, each
 * with its own reconciliation written out in whole dollars, and the two seams
 * between them carry the closing and opening balances side by side. The sums
 * are computed here, not asserted: a statement is marked as reconciling only
 * because opening plus money in minus money out equals the closing figure.
 *
 * Below the three sits a fourth, drawn dashed: the account the six owner
 * transfers in section 01 came from. It is referenced and not submitted. The
 * transfers are already classified from their descriptors, so it is noted
 * rather than raised — but a reader should know the file points past itself.
 *
 * Server-rendered with every statement, both seams and the absent account.
 */
export function StatementSeams({ statements, ghost, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((key) => setAt((cur) => (cur === key ? null : key)), []);

  const usd = (d) => `${d < 0 ? "−" : ""}$${Math.abs(d).toLocaleString("en-US")}`;
  const total = statements.reduce((n, s) => n + s.days, 0);

  const checked = statements.map((s, i) => ({
    ...s,
    closes: s.open + s.in - s.out === s.close,
    /* Stacked on a phone there is no seam row, so each statement after the
       first carries its own join check. */
    carries: i === 0 ? null : statements[i - 1].close === s.open,
  }));
  const seams = statements.slice(1).map((s, i) => ({
    from: statements[i],
    to: s,
    joins: statements[i].close === s.open,
  }));

  const counts = {
    statements: statements.length,
    joins: seams.filter((s) => s.joins).length,
    ghosts: 1,
  };

  const shown =
    at === null
      ? null
      : at === "ghost"
        ? { k: ghost.k, say: ghost.say }
        : checked.find((s) => s.k === at);

  return (
    <figure className={`bk6${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bk6-readout">
        {readout.figures.map((f) => (
          <div className={`bk6-fig${f.tone ? ` bk6-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bk6-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="bk6-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="bk6-scroll">
        <div className={`bk6-chart${at === null ? "" : " is-picked"}`}>
          <p className="bk6-cover hx-mono">
            <span className="bk6-cover-k">{readout.coverK}</span>
            <span className="bk6-cover-v">
              {total} {readout.ofK} {total} {readout.daysK}
            </span>
          </p>

          <ol className="bk6-run" style={{ "--cols": statements.map((s) => `${s.days}fr`).join(" ") }}>
            {checked.map((s, i) => (
              <li className={`bk6-st${at === s.k ? " is-on" : ""}`} key={s.k} style={{ "--i": i }}>
                <button
                  className="bk6-st-b"
                  type="button"
                  aria-pressed={at === s.k}
                  onClick={() => pick(s.k)}
                  onMouseEnter={() => setAt(s.k)}
                >
                  <span className="bk6-st-h">
                    <span className="bk6-st-k">{s.k}</span>
                    <span className="bk6-st-m hx-mono">
                      {s.account} · {s.pages} {readout.pagesK}
                    </span>
                    {s.carries === null ? null : (
                      <span className={`bk6-carry hx-mono${s.carries ? "" : " is-off"}`}>
                        {s.carries ? readout.carryK : readout.breaksK}
                      </span>
                    )}
                  </span>

                  <span className="bk6-sum">
                    <span className="bk6-line">
                      <span className="bk6-op hx-mono" aria-hidden="true" />
                      <span className="bk6-lk hx-mono">{readout.openK}</span>
                      <span className="bk6-lv hx-mono">{usd(s.open)}</span>
                    </span>
                    <span className="bk6-line">
                      <span className="bk6-op hx-mono">+</span>
                      <span className="bk6-lk hx-mono">{readout.inK}</span>
                      <span className="bk6-lv hx-mono">{usd(s.in)}</span>
                    </span>
                    <span className="bk6-line">
                      <span className="bk6-op hx-mono">−</span>
                      <span className="bk6-lk hx-mono">{readout.outK}</span>
                      <span className="bk6-lv hx-mono">{usd(s.out)}</span>
                    </span>
                    <span className="bk6-line is-total">
                      <span className="bk6-op hx-mono">=</span>
                      <span className="bk6-lk hx-mono">{readout.closeK}</span>
                      <span className="bk6-lv hx-mono">{usd(s.close)}</span>
                    </span>
                  </span>

                  <span className={`bk6-verdict hx-mono${s.closes ? "" : " is-off"}`}>
                    {s.closes ? readout.closesK : readout.offK}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {/* The seams: where one statement's close has to be the next one's open. */}
          <ol className="bk6-seams" style={{ "--cols": statements.map((s) => `${s.days}fr`).join(" ") }}>
            {seams.map((sm, i) => (
              <li
                className={`bk6-seam${sm.joins ? "" : " is-off"}`}
                key={`${sm.from.k}-${sm.to.k}`}
                style={{ "--c": i + 2, "--i": i }}
              >
                <span className="bk6-seam-v hx-mono">
                  {usd(sm.from.close)} = {usd(sm.to.open)}
                </span>
                <span className="bk6-seam-k hx-mono">{sm.joins ? readout.joinsK : readout.breaksK}</span>
              </li>
            ))}
          </ol>

          <div className={`bk6-ghost${at === "ghost" ? " is-on" : ""}`}>
            <button
              className="bk6-ghost-b"
              type="button"
              aria-pressed={at === "ghost"}
              onClick={() => pick("ghost")}
              onMouseEnter={() => setAt("ghost")}
            >
              <span className="bk6-ghost-k">{ghost.k}</span>
              <span className="bk6-ghost-m hx-mono">{ghost.meta}</span>
              <span className="bk6-ghost-v hx-mono">{ghost.status}</span>
            </button>
          </div>
        </div>
      </div>

      <p className="bk6-routed" aria-live="polite">
        <span className="bk6-routed-k hx-mono">{shown ? shown.k : readout.restK}</span>
        <span className="bk6-routed-b">{shown ? shown.say : readout.restB}</span>
      </p>

      <div className="bk6-body">
        <div className="bk6-said">
          <p className="bk6-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="bk6-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="bk6-aside">
          <p className="bk6-aside-k hx-mono">{aside.title}</p>
          <ol className="bk6-audit">
            {aside.items.map((item) => (
              <li className="bk6-audit-row" key={item.k}>
                <span className="bk6-audit-k">{item.k}</span>
                <span className="bk6-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bk6-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bk6-close">{close}</p>
      <figcaption className="bk6-note">{note}</figcaption>
    </figure>
  );
}
