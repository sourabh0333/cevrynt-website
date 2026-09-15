"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 04 — Both sides of the entry, as two planes you can lean on.
 *
 * The version this replaced was a six-item text grid with tags, which is a
 * feature grid however it is labelled. The content — founder-led as both the
 * advantage and the concentration risk — deserved a form that actually weighs
 * the two against each other.
 *
 * Two solid planes, side by side, the same size. On entry they separate out
 * of one block, because they are one fact seen from two sides rather than two
 * unrelated lists. Under the pointer the plane being read takes more of the
 * width and the other gives it up — you can lean on either side and feel the
 * other one yield, which is the closest a page gets to weighing something.
 *
 * The lean is `flex-grow` on hover, so it is CSS with no handler at all, and
 * the resting state is dead even: neither side is the default, and the risk
 * column is not the one that has to be opened.
 *
 * Server-rendered with both planes present and equal.
 */
export function WeightedSides({ statement, sides, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.2);

  return (
    <figure className={`wgh${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <p className="wgh-statement">
        {statement.map((line, i) => (
          <span className="wgh-line" key={line} style={{ "--i": i }}>
            {line}
          </span>
        ))}
      </p>

      <div className="wgh-body">
        {sides.map((side, s) => (
          <section
            className={`wgh-side${side.cost ? " is-cost" : ""}`}
            key={side.k}
            style={{ "--s": s }}
            aria-label={side.k}
          >
            <header className="wgh-side-head">
              <span className="wgh-side-k hx-mono">{side.k}</span>
              <span className="wgh-side-n">{side.items.length}</span>
            </header>

            <ol className="wgh-list">
              {side.items.map((item, i) => (
                <li className="wgh-item" key={item.k} style={{ "--i": i }}>
                  <span className="wgh-item-k">{item.k}</span>
                  <span className="wgh-item-b">{item.b}</span>
                </li>
              ))}
            </ol>

            <p className="wgh-side-foot">{side.foot}</p>
          </section>
        ))}
      </div>

      <p className="wgh-close">{close}</p>
      <figcaption className="wgh-note">{note}</figcaption>
    </figure>
  );
}
