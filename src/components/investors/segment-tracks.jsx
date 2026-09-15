"use client";

import { Fragment, useEffect, useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 01 — Four segments as four tracks.
 *
 * The version this replaces was a bordered comparison table, which is a
 * spreadsheet however carefully it is set. Same content, different register:
 * each segment is a tinted vertical track rather than a column of cells, so
 * the four read as four objects standing side by side instead of as a grid of
 * boxes, and the three property rows run straight through all of them.
 *
 * The tracks are decorative elements spanning every row of the same grid the
 * cells sit in, so the rows still align across the four by construction — the
 * surface is painted by the grid, not by matching heights.
 *
 * Two effects, and both do something a static table cannot.
 *
 * A wave of light passes across the four tracks once on entry, left to right,
 * lifting each one as it goes. The argument of the section is that you read
 * across, and the entrance reads across in front of you.
 *
 * Then the tracks answer the pointer: the one under the cursor lifts and
 * brightens, so comparing a row means moving along it. That is one custom
 * property written to the grid per frame, and every track works out its own
 * state from it — the cost does not grow with the number of segments.
 *
 * Server-rendered complete, every track at rest.
 */
export function SegmentTracks({ segments, properties, premise, foot, close, note, readout }) {
  const scope = useRef(null);
  const gridRef = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.16);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    let frame = 0;
    let pending = null;

    const apply = () => {
      frame = 0;
      if (pending === null) return;
      grid.style.setProperty("--hot-c", pending);
    };

    const onMove = (event) => {
      const cell = event.target.closest("[data-c]");
      if (!cell) return;
      pending = cell.dataset.c;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      pending = null;
      grid.style.removeProperty("--hot-c");
    };

    grid.addEventListener("pointermove", onMove, { passive: true });
    grid.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      grid.removeEventListener("pointermove", onMove);
      grid.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <figure className={`trk${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <p className="trk-premise">{premise}</p>

      <div className="trk-grid" ref={gridRef} style={{ "--trk-n": segments.length }}>
        {/* Painted surfaces spanning every row, so the rows stay aligned. */}
        {segments.map((s, c) => (
          <span
            className="trk-col"
            key={`col-${s.k}`}
            style={{ "--c": c + 1 }}
            data-c={c + 1}
            aria-hidden="true"
          />
        ))}

        <span className="trk-corner hx-mono">{readout.corner}</span>
        {segments.map((s, c) => (
          <span className="trk-head" key={s.k} style={{ "--c": c + 1 }} data-c={c + 1}>
            <span className="trk-head-n hx-mono">{String(c + 1).padStart(2, "0")}</span>
            <span className="trk-head-k">{s.k}</span>
          </span>
        ))}

        {properties.map((p, r) => (
          <Fragment key={p.k}>
            <span className="trk-label hx-mono" style={{ "--r": r + 1 }}>
              {p.k}
            </span>
            {p.cells.map((cell, c) => (
              <span
                className="trk-cell"
                key={segments[c].k}
                style={{ "--c": c + 1, "--r": r + 1 }}
                data-c={c + 1}
              >
                {/* Only shown once the tracks stack, where the column heading
                    is no longer above the value. */}
                <span className="trk-cell-seg hx-mono">{segments[c].k}</span>
                {cell}
              </span>
            ))}
          </Fragment>
        ))}
      </div>

      <p className="trk-foot">{foot}</p>
      <p className="trk-close">{close}</p>
      <figcaption className="trk-note">{note}</figcaption>
    </figure>
  );
}
