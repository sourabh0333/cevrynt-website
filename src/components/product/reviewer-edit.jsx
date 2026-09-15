"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

/** Intrinsic size of the supplied product views. Never rendered above this. */
const SHOT_W = 760;
const SHOT_H = 520;

/**
 * 04 — What a reviewer changes, and what a change cannot do.
 *
 * Every other section on this page is the stage working. This one is a person
 * overruling it, which is the part of the claim that matters most: Cevrynt
 * structures documents for human underwriting, and a structure a human cannot
 * correct is not being offered for review, it is being imposed.
 *
 * The interaction is the argument. Applying a correction does not replace
 * anything — the original reading stays on screen, struck but legible, and the
 * correction arrives underneath it with the line that records who made it. The
 * record grows; it never swaps. And once a change is applied the control locks,
 * because a correction that can be quietly taken back out of the record is not
 * a record.
 *
 * There is a reset, and it is labelled for exactly what it is: a reset of the
 * illustration on this page, which the product does not have. Saying that out
 * loud is cheaper than pretending the demo and the system behave the same way.
 *
 * Server-rendered with all three changes and their originals present, so the
 * section reads in full without JavaScript; what JavaScript adds is the ability
 * to watch a record grow.
 */
export function ReviewerEdit({ changes, readout, aside, shot, close, note }) {
  const scope = useRef(null);
  const [applied, setApplied] = useState(() => new Set());

  const apply = useCallback((i) => {
    setApplied((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }, []);

  const reset = useCallback(() => setApplied(new Set()), []);

  return (
    <figure className="drv" ref={scope}>
      <dl className="drv-readout">
        {readout.figures.map((f) => (
          <div className={`drv-fig${f.tone ? ` drv-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="drv-fig-n">{f.n}</dt>
            <dd className="drv-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="drv-body">
        <ol className="drv-list">
          {changes.map((c, i) => {
            const on = applied.has(i);
            return (
              <li className={`drv-entry${on ? " is-done" : ""}`} key={c.k} style={{ "--i": i }}>
                <span className="drv-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="drv-name">{c.k}</span>
                <span className="drv-b">{c.b}</span>

                <div className="drv-record">
                  {/* Struck, and still there. That is the whole point. */}
                  <p className="drv-was">
                    <span className="drv-was-k hx-mono">{readout.wasK}</span>
                    <span className="drv-was-v">{c.was}</span>
                  </p>

                  <div className="drv-now-fold">
                    <div className="drv-now-in">
                      <p className="drv-now">
                        <span className="drv-now-k hx-mono">{readout.nowK}</span>
                        <span className="drv-now-v">{c.now}</span>
                      </p>
                      <p className="drv-log hx-mono">{c.log}</p>
                    </div>
                  </div>
                </div>

                <button
                  className="drv-apply"
                  type="button"
                  onClick={() => apply(i)}
                  disabled={on}
                  aria-disabled={on}
                >
                  {on ? readout.doneK : readout.applyK}
                </button>
              </li>
            );
          })}
        </ol>

        <div className="drv-aside">
          {/* The same argument as a product view: the note, the override reason
              and the reasoning stay attached to the deal. */}
          <figure className="drv-shot">
            <Image
              className="drv-shot-img"
              src={shot.src}
              alt={shot.alt}
              width={SHOT_W}
              height={SHOT_H}
              sizes="(max-width: 900px) 92vw, 360px"
              loading="lazy"
            />
            <figcaption className="drv-shot-k hx-mono">{shot.caption}</figcaption>
          </figure>

          <p className="drv-aside-k hx-mono">{aside.title}</p>
          <ol className="drv-audit">
            {aside.items.map((item) => (
              <li className="drv-audit-row" key={item.k}>
                <span className="drv-audit-k">{item.k}</span>
                <span className="drv-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="drv-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="drv-reset">
        <button className="drv-reset-b" type="button" onClick={reset} disabled={applied.size === 0}>
          {readout.resetK}
        </button>
        <span className="drv-reset-b-note">{readout.resetNote}</span>
      </p>

      <p className="drv-close">{close}</p>
      <figcaption className="drv-note">{note}</figcaption>
    </figure>
  );
}
