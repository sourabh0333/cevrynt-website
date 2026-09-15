"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 03 — What makes the first call worth having.
 *
 * The page routes people to a calendar and then says nothing about what to
 * bring, which is the one gap worth closing on a site whose whole conversion
 * is a booked call. A walkthrough aimed at the wrong person, or held without
 * anybody's actual thresholds to hand, costs both sides a second call.
 *
 * So the four things that help are a list you can actually tick, and the meter
 * measures how much of it you have. That is the only interaction on this site
 * driven by the reader rather than by their pointer or their scroll, and it
 * earns its place here because a preparation list is a thing people work
 * through rather than read.
 *
 * The state is in memory and deliberately not persisted. A tick is a reading
 * aid for the next thirty seconds, not a record of anything, and storing it
 * would imply the page is keeping score.
 *
 * The rows are real buttons with aria-pressed, so the list works from the
 * keyboard and announces itself correctly. Without JavaScript it is four
 * statements and a heading, which loses the ticking and none of the content.
 */
export function PrepList({ items, none, caution, close, note, readout }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.18);
  const [done, setDone] = useState(() => new Set());

  const toggle = useCallback((i) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }, []);

  const count = done.size;
  const total = items.length;

  return (
    <figure className={`prp${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <p className="prp-head hx-mono">{readout.head}</p>

      <ul className="prp-list">
        {items.map((item, i) => (
          <li className="prp-item" key={item.k} style={{ "--i": i }}>
            <button
              className={`prp-row${done.has(i) ? " is-done" : ""}`}
              type="button"
              aria-pressed={done.has(i)}
              onClick={() => toggle(i)}
            >
              <span className="prp-box" aria-hidden="true">
                <svg className="prp-tick" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3.5 8.6 L6.4 11.4 L12.5 4.9" pathLength="1" />
                </svg>
              </span>
              <span className="prp-k">{item.k}</span>
              <span className="prp-b">{item.b}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* A real quantity, moved by the reader rather than by a timer. */}
      <p className="prp-meter" style={{ "--p": total ? count / total : 0 }}>
        <span className="prp-meter-track" aria-hidden="true">
          <span className="prp-meter-fill" />
        </span>
        <span className="prp-meter-k hx-mono">
          {count} / {total} · {readout.meterK}
        </span>
      </p>

      <div className="prp-two">
        <section className="prp-none">
          <p className="prp-none-k hx-mono">{none.k}</p>
          <ul className="prp-none-list">
            {none.items.map((n) => (
              <li className="prp-none-item" key={n.k}>
                <span className="prp-none-item-k">{n.k}</span>
                <span className="prp-none-item-b">{n.b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* A caution, not a task — so it is not on the list and cannot be ticked. */}
        <aside className="prp-caution">
          <p className="prp-caution-k hx-mono">{caution.k}</p>
          <p className="prp-caution-h">{caution.h}</p>
          <p className="prp-caution-b">{caution.b}</p>
        </aside>
      </div>

      <p className="prp-close">{close}</p>
      <figcaption className="prp-note">{note}</figcaption>
    </figure>
  );
}
