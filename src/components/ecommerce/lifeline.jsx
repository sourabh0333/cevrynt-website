"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 01 — The company is fourteen months old. Twelve of them are on the record.
 *
 * A platform merchant is usually young, and the instinct is to treat that as
 * thinness. It is worth turning around. This borrower has been trading for
 * fourteen months and twelve of those months are in the bank record, which
 * means the evidence covers all but the opening weeks of the company's entire
 * existence — a coverage ratio no fifteen-year-old business will ever hand a
 * lender, because nobody keeps that much of a long life in one place.
 *
 * So the figure is a life, and the part of it that is evidenced. The rule runs
 * from the first filing to today at one tick a month; the band beneath it fills
 * only the months the statements reach, and stops short at the head. The two
 * uncovered months sit at the beginning, where they actually are, because that
 * is the one thing about the shape of this that is knowable: a record that runs
 * to the present started somewhere after the company did.
 *
 * Fourteen and twelve are both read off screens for this file. The ratio is
 * arithmetic on them, and it describes this borrower and no other.
 *
 * Server-rendered fully drawn.
 */
export function Lifeline({ life, evidenced, marks, readout, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const drawn = useHasEntered(scope, 0.24);

  const uncovered = life - evidenced;
  const pct = (n) => (n / life) * 100;

  return (
    <figure className={`lf${ready ? " is-ready" : ""}${drawn ? " is-drawn" : ""}`} ref={scope}>
      <dl className="lf-readout">
        {readout.figures.map((f) => (
          <div className={`lf-fig${f.tone ? ` lf-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="lf-fig-n">{f.n}</dt>
            <dd className="lf-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div
        className="lf-span"
        style={{ "--cover": `${pct(evidenced).toFixed(3)}%`, "--gap": `${pct(uncovered).toFixed(3)}%` }}
      >
        <div className="lf-heads">
          <p className="lf-head lf-head-a hx-mono">{readout.start}</p>
          <p className="lf-head lf-head-b hx-mono">{readout.now}</p>
        </div>

        {/* One tick a month, from the first filing to today. */}
        <div className="lf-rule">
          <span className="lf-rule-line" aria-hidden="true" />
          <span className="lf-ticks" aria-hidden="true">
            {Array.from({ length: life }, (_, i) => (
              <span className={`lf-tick${i < uncovered ? " is-bare" : ""}`} key={i} />
            ))}
          </span>
        </div>

        {/* The record only reaches back so far, so the band stops short. */}
        <div className="lf-band">
          <span className="lf-band-gap" aria-hidden="true">
            <span className="lf-band-gap-k hx-mono">{readout.before}</span>
          </span>
          <span className="lf-band-cover" aria-hidden="true">
            <span className="lf-band-cover-k hx-mono">{readout.covered}</span>
          </span>
        </div>

        <p className="lf-span-k">{readout.said}</p>
      </div>

      <ol className="lf-marks">
        {marks.map((m) => (
          <li className="lf-mark" key={m.k}>
            <span className="lf-mark-v hx-mono">{m.v}</span>
            <span className="lf-mark-k">{m.k}</span>
          </li>
        ))}
      </ol>

      <figcaption className="lf-note">{note}</figcaption>
    </figure>
  );
}
