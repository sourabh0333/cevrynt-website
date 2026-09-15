"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 03 — The four steps, as a stack that builds while you scroll.
 *
 * The version this replaces was four markers on a connecting rule, which is the
 * single most common diagram in B2B marketing and looks it. The content was
 * right; the form was a process graphic.
 *
 * These are solid panels that pin one after another as the section is scrolled,
 * each sliding over the one before it and leaving a band of it showing. The
 * pile is the argument: nobody reaches step three without step two still
 * underneath, and by the last panel all four are visibly holding it up. A row
 * of numbered circles says "these are four things"; a stack says "these are
 * four things in order, and none of them go away".
 *
 * It is `position: sticky` and a per-panel offset, so the whole effect is CSS
 * and survives with no JavaScript at all. The panels stack whether or not the
 * entrance ever runs.
 *
 * Server-rendered complete.
 */
export function StepStack({ steps, noteLine, aside, close, note, readout }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.12);

  return (
    <figure className={`stp${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <p className="stp-head hx-mono">{readout.head}</p>

      <div className="stp-stack">
        {steps.map((s, i) => (
          <article className="stp-panel" key={s.k} style={{ "--i": i }}>
            <p className="stp-n">{String(i + 1).padStart(2, "0")}</p>
            <div className="stp-text">
              <h3 className="stp-k">{s.k}</h3>
              <p className="stp-b">{s.b}</p>
            </div>
            <p className="stp-tag hx-mono">{s.tag}</p>
          </article>
        ))}
      </div>

      <p className="stp-note-line">{noteLine}</p>

      <p className="stp-aside">
        <span className="stp-aside-k hx-mono">{aside.k}</span>
        <span className="stp-aside-b">{aside.b}</span>
      </p>

      <p className="stp-close">{close}</p>
      <figcaption className="stp-note">{note}</figcaption>
    </figure>
  );
}
