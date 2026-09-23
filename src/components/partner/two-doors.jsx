"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 05 — Two doors, one file.
 *
 * The question a lender actually asks about a referral is whether it is
 * reviewed any differently. The rest of this page says it is not; this figure
 * shows it. Two entry lines — a referred file and a file submitted directly —
 * merge before the first stage and run as one line through all eight stages of
 * the workflow.
 *
 * Only two nodes carry a mark. Intake notes where the file came from, which is
 * recorded and never weighted. Financials is drawn with the same dashed ring
 * section 03 uses for commerce context, because that is the one place a
 * referred file could differ — and only when all four conditions in 04 hold.
 * Every other stage is identical, and the count of policy rules eased for a
 * referral is computed from the stages: none.
 *
 * Server-rendered with every stage and both sides of every comparison present.
 */
export function TwoDoors({ doors, stages, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const counts = {
    all: stages.length,
    same: stages.filter((s) => s.kind === "same").length,
    differs: stages.filter((s) => s.kind !== "same").length,
    eased: stages.filter((s) => s.eased).length,
  };
  const shown = at === null ? null : stages[at];

  return (
    <figure className={`sp5${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="sp5-readout">
        {readout.figures.map((f) => (
          <div className={`sp5-fig${f.tone ? ` sp5-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="sp5-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="sp5-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className={`sp5-track${at === null ? "" : " is-picked"}`}>
        {/* The two doors: two lines that merge into one before the first stage. */}
        <div className="sp5-doors" aria-hidden="true">
          <span className="sp5-door is-a hx-mono">{doors[0]}</span>
          <svg className="sp5-merge" viewBox="0 0 100 44" preserveAspectRatio="none">
            <path className="sp5-merge-p" d="M 0 4 C 58 4, 42 22, 100 22" pathLength="1" />
            <path className="sp5-merge-p" d="M 0 40 C 58 40, 42 22, 100 22" pathLength="1" />
          </svg>
          <span className="sp5-door is-b hx-mono">{doors[1]}</span>
        </div>

        <ol className="sp5-stages">
          {stages.map((s, i) => (
            <li className={`sp5-stage is-${s.kind}${at === i ? " is-on" : ""}`} key={s.k} style={{ "--i": i }}>
              <button
                className="sp5-stage-b"
                type="button"
                aria-pressed={at === i}
                onClick={() => pick(i)}
                onMouseEnter={() => setAt(i)}
              >
                <span className="sp5-node" aria-hidden="true" />
                <span className="sp5-stage-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="sp5-stage-k">{s.k}</span>
                <span className="sp5-stage-m hx-mono">{s.mark}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="sp5-compare" aria-live="polite">
        <p className="sp5-compare-k hx-mono">{shown ? `${readout.stageK} ${String(at + 1).padStart(2, "0")} · ${shown.k}` : readout.restK}</p>
        {shown ? (
          <dl className="sp5-sides">
            <div className="sp5-side">
              <dt className="sp5-side-k hx-mono">{doors[0]}</dt>
              <dd className="sp5-side-b">{shown.referred}</dd>
            </div>
            <div className="sp5-side">
              <dt className="sp5-side-k hx-mono">{doors[1]}</dt>
              <dd className="sp5-side-b">{shown.direct}</dd>
            </div>
            <div className={`sp5-side is-diff is-${shown.kind}`}>
              <dt className="sp5-side-k hx-mono">{readout.diffK}</dt>
              <dd className="sp5-side-b">{shown.diff}</dd>
            </div>
          </dl>
        ) : (
          <p className="sp5-compare-b">{readout.restB}</p>
        )}
      </div>

      <div className="sp5-body">
        <div className="sp5-said">
          <p className="sp5-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="sp5-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="sp5-aside">
          <p className="sp5-aside-k hx-mono">{aside.title}</p>
          <ol className="sp5-audit">
            {aside.items.map((item) => (
              <li className="sp5-audit-row" key={item.k}>
                <span className="sp5-audit-k">{item.k}</span>
                <span className="sp5-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="sp5-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="sp5-close">{close}</p>
      <figcaption className="sp5-note">{note}</figcaption>
    </figure>
  );
}
