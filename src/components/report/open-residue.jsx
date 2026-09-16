"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 01 — The report is what the file could not settle.
 *
 * The obvious figure for a report page is a summary of everything, which is
 * exactly the thing this product is arguing against: a document that restates
 * the whole file makes the reader do the sorting a second time.
 *
 * So the figure counts instead. One mark per finding the file produced,
 * grouped by the stage that produced it. Settled findings are hairline ticks
 * lying on the baseline; the ones still open stand up off it in amber, and the
 * whole point is that they are countable at a glance across fifty marks.
 *
 * Nothing here is deleted. The settled marks stay drawn, because a closed
 * finding is still part of the file and the report sits on top of it rather
 * than in place of it.
 *
 * Server-rendered with every mark, every count and every stage present.
 */
export function OpenResidue({ stages, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const all = stages.reduce((n, s) => n + s.n, 0);
  const open = stages.reduce((n, s) => n + s.open, 0);
  const counts = { all, open, closed: all - open };
  const shown = at === null ? null : stages[at];

  /* Marks run settled-first so the open ones finish the block and stay countable. */
  const marks = (s) => Array.from({ length: s.n }, (_, i) => i >= s.n - s.open);

  return (
    <figure className={`ur1${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="ur1-readout">
        {readout.figures.map((f) => (
          <div className={`ur1-fig${f.tone ? ` ur1-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="ur1-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="ur1-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="ur1-scroll">
        <ol className={`ur1-blocks${at === null ? "" : ` is-at-${at}`}`}>
          {stages.map((s, i) => (
            <li className={`ur1-block${s.open ? "" : " is-clear"}`} key={s.k} style={{ "--r": i }}>
              <button
                className="ur1-block-b"
                type="button"
                aria-pressed={at === i}
                onClick={() => pick(i)}
                onMouseEnter={() => setAt(i)}
              >
                <span className="ur1-stage">{s.k}</span>

                <span className="ur1-field">
                  {marks(s).map((isOpen, m) => (
                    <span
                      className={`ur1-m${isOpen ? " is-open" : ""}`}
                      /* Marks are identical units; the index is the identity. */
                      key={`${s.k}-m${m}`}
                      style={{ "--m": m }}
                      aria-hidden="true"
                    />
                  ))}
                </span>

                <span className="ur1-count hx-mono">
                  <span className="ur1-count-n">{s.n}</span>
                  <span className={`ur1-count-o${s.open ? " is-open" : ""}`}>
                    {s.open} {readout.openK}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <p className="ur1-routed" aria-live="polite">
        <span className="ur1-routed-k hx-mono">{shown ? shown.k : readout.restK}</span>
        <span className="ur1-routed-b">{shown ? shown.say : readout.restB}</span>
      </p>

      <div className="ur1-body">
        <ol className="ur1-list">
          {stages
            .filter((s) => s.open > 0)
            .map((s, i) => (
              <li className="ur1-entry" key={s.k} style={{ "--i": i }}>
                <span className="ur1-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="ur1-entry-k">{s.k}</span>
                <span className="ur1-b">{s.b}</span>
              </li>
            ))}
        </ol>

        <div className="ur1-aside">
          <p className="ur1-aside-k hx-mono">{aside.title}</p>
          <ol className="ur1-audit">
            {aside.items.map((item) => (
              <li className="ur1-audit-row" key={item.k}>
                <span className="ur1-audit-k">{item.k}</span>
                <span className="ur1-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="ur1-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="ur1-close">{close}</p>
      <figcaption className="ur1-note">{note}</figcaption>
    </figure>
  );
}
