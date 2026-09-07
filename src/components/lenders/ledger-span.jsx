"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * The tallest statement in the set sets the top of the scale, so a block's
 * height is its page count and nothing else.
 */
const H_MIN = 44;
const H_MAX = 96;

/**
 * 05 — Six statements, twelve months, one ledger.
 *
 * Everything else on this page works on numbers that are already settled:
 * a policy evaluates $84.6K, a lens finds the line it was read from, a memo
 * gathers it up. None of that says where twelve months of banking actually came
 * from, and for a credit team that is the first question — because the answer
 * is usually a spreadsheet somebody rebuilt by hand.
 *
 * So the figure is coverage. Each statement is laid on a twelve-month rule at
 * the period it covers, and they tile: no gap, no overlap, Jan through Dec.
 * Width is the period, which is the same two months for every one of them.
 * Height is the page count, which is not — eighteen pages against twenty-two —
 * because covering the same amount of time and being the same amount of
 * document are different things, and only one of them is convenient.
 *
 * The sixth block is drawn open at the top. The screen this is read from lists
 * five statements with their page counts and tallies six; the period it must
 * cover is the only one left, but its length is not stated, so the figure does
 * not state it either. It first went in at a middling height, which put a
 * readable page count on the scale that nobody had given — invisible and wrong,
 * the worst combination available. An unclosed outline says what is true: the
 * slot is covered, the length is not on the screen.
 *
 * Server-rendered with every block at its full height, so the coverage reads as
 * complete without JavaScript.
 */
export function LedgerSpan({ months, statements, findings, readout, insight, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const laid = useHasEntered(scope, 0.2);

  const known = statements.filter((s) => s.pages);
  const tallest = Math.max(...known.map((s) => s.pages));
  const shortest = Math.min(...known.map((s) => s.pages));

  /**
   * The unstated one is drawn to the top of the scale with an open top rather
   * than to some middling height. Anything in between would land on the scale
   * as a readable page count — a number nobody stated — which is the exact
   * mistake this block exists to avoid.
   */
  const height = (pages) =>
    pages ? H_MIN + ((pages - shortest) / (tallest - shortest || 1)) * (H_MAX - H_MIN) : H_MAX;

  return (
    <figure className={`lg${ready ? " is-ready" : ""}${laid ? " is-laid" : ""}`} ref={scope}>
      <dl className="lg-readout">
        {readout.figures.map((figure) => (
          <div className={`lg-fig${figure.tone ? ` lg-fig-${figure.tone}` : ""}`} key={figure.k}>
            <dt className="lg-fig-n">{figure.n}</dt>
            <dd className="lg-fig-k hx-mono">{figure.k}</dd>
          </div>
        ))}
      </dl>

      <div className="lg-body">
        {/* Width is the period covered. Height is the page count. */}
        <div className="lg-span">
          <ol className="lg-blocks">
            {statements.map((s, i) => (
              <li
                className={`lg-block${s.pages ? "" : " is-unstated"}`}
                key={s.period}
                style={{ "--h": `${height(s.pages).toFixed(1)}px`, "--d": `${i * 90}ms` }}
              >
                <span className="lg-pages hx-mono">{s.pages ? `${s.pages}pp` : readout.unstated}</span>
                <span className="lg-brick" aria-hidden="true" />
                <span className="lg-period hx-mono">{s.period}</span>
              </li>
            ))}
          </ol>

          {/* The twelve months the six of them add up to. */}
          <div className="lg-rule" aria-hidden="true">
            <span className="lg-rule-line" />
            {months.map((m) => (
              <span className="lg-tick hx-mono" key={m}>{m}</span>
            ))}
          </div>
          <p className="lg-span-k hx-mono">{readout.span}</p>
        </div>

        <div className="lg-aside">
          <p className="lg-aside-k hx-mono">{readout.saying}</p>
          <ol className="lg-findings">
            {findings.map((f) => (
              <li className={`lg-finding${f.watch ? " is-watch" : ""}`} key={f.k}>
                <span className="lg-finding-k">{f.k}</span>
                <span className="lg-finding-v hx-mono">{f.v}</span>
                <span className="lg-finding-b">{f.b}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* The conclusion the screen itself draws, which is not the obvious one. */}
      <p className="lg-insight">
        <span className="lg-insight-k hx-mono">{insight.k}</span>
        <span className="lg-insight-v">{insight.v}</span>
      </p>

      <figcaption className="lg-note">{note}</figcaption>
    </figure>
  );
}
