"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 03 — Questions the partnership is working through, and not one feature.
 *
 * Development work is the easiest thing on a partner page to overstate: a
 * question being explored reads like a capability the moment it is set in a
 * product-page layout. So every row here is phrased as a question, carries the
 * same status, and the status is the honest one.
 *
 * Each question is marked against the three places an answer could come from.
 * Bank statements are already in any file. Commerce context is different in
 * kind — it is only ever available where a merchant has authorised it for the
 * workflow — so its marks are drawn open, inside a dashed ring, rather than
 * filled. The lender's policy is the third source, and only the lender writes
 * it.
 *
 * The counts are computed from the rows, including the one that matters most:
 * how many of these are live features. None.
 *
 * Server-rendered with every question, every mark and every status present.
 */
export function QuestionGrid({ sources, questions, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const conditional = sources.findIndex((s) => s.kind === "conditional");
  const lender = sources.findIndex((s) => s.kind === "lender");
  const counts = {
    all: questions.length,
    conditional: questions.filter((q) => q.needs[conditional]).length,
    lender: questions.filter((q) => q.needs[lender]).length,
    live: questions.filter((q) => q.live).length,
  };
  const shown = at === null ? null : questions[at];

  return (
    <figure className={`sp3${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="sp3-readout">
        {readout.figures.map((f) => (
          <div className={`sp3-fig${f.tone ? ` sp3-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="sp3-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="sp3-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="sp3-scroll">
        <div className={`sp3-chart${at === null ? "" : " is-picked"}`}>
          <div className="sp3-head">
            <span className="sp3-hk hx-mono">{readout.questionK}</span>
            {sources.map((s) => (
              <span className={`sp3-src is-${s.kind}`} key={s.k}>
                <span className="sp3-src-k">{s.k}</span>
                <span className="sp3-src-v hx-mono">{s.sub}</span>
              </span>
            ))}
            <span className="sp3-hk is-r hx-mono">{readout.statusK}</span>
          </div>

          <ol className="sp3-rows">
            {questions.map((q, r) => (
              <li className={`sp3-row${at === r ? " is-on" : ""}`} key={q.k} style={{ "--r": r }}>
                <button
                  className="sp3-row-b"
                  type="button"
                  aria-pressed={at === r}
                  onClick={() => pick(r)}
                  onMouseEnter={() => setAt(r)}
                >
                  <span className="sp3-q">
                    <span className="sp3-q-n hx-mono">{String(r + 1).padStart(2, "0")}</span>
                    <span className="sp3-q-k">{q.k}</span>
                  </span>

                  {sources.map((s, c) => (
                    <span
                      className={`sp3-cell is-${s.kind}${q.needs[c] ? " is-needed" : ""}`}
                      key={`${q.k}-${s.k}`}
                      style={{ "--c": c }}
                      aria-label={`${s.k}: ${q.needs[c] ? readout.neededK : readout.notNeededK}`}
                    >
                      {q.needs[c] ? <span className="sp3-mark" aria-hidden="true" /> : <span className="sp3-none" aria-hidden="true" />}
                    </span>
                  ))}

                  <span className="sp3-status hx-mono">{q.live ? readout.liveK : readout.exploringK}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="sp3-legend hx-mono">
        <span className="sp3-leg is-file">{readout.legendFileK}</span>
        <span className="sp3-leg is-conditional">{readout.legendConditionalK}</span>
        <span className="sp3-leg is-lender">{readout.legendLenderK}</span>
      </p>

      <p className="sp3-routed" aria-live="polite">
        <span className="sp3-routed-k hx-mono">{shown ? shown.k : readout.restK}</span>
        <span className="sp3-routed-b">{shown ? shown.say : readout.restB}</span>
      </p>

      <div className="sp3-body">
        <div className="sp3-said">
          <p className="sp3-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="sp3-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="sp3-aside">
          <p className="sp3-aside-k hx-mono">{aside.title}</p>
          <ol className="sp3-audit">
            {aside.items.map((item) => (
              <li className="sp3-audit-row" key={item.k}>
                <span className="sp3-audit-k">{item.k}</span>
                <span className="sp3-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="sp3-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="sp3-close">{close}</p>
      <figcaption className="sp3-note">{note}</figcaption>
    </figure>
  );
}
