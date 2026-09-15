"use client";

import { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import { useHasEntered, useReady } from "@/components/progressive";

const SHOT_W = 1600;
const SHOT_H = 650;

/**
 * 06 — What people ask for, against the tests it would have to pass.
 *
 * A matrix rather than another list, for two reasons. It is the one composition
 * on this page that is aligned by construction — every cell lands on a shared
 * grid track, so nothing can drift. And the argument here is a pattern rather
 * than a sequence: four different requests, and the same column fails for all
 * four of them. In a list that observation has to be asserted at the end. In a
 * matrix the reader sees the solid column before reading the caption, which is
 * the difference between being told something and noticing it.
 *
 * The effect follows the argument. The matrix resolves one test column at a
 * time rather than all at once, so the columns are read in order and the second
 * one arrives already complete — the payoff lands as it is drawn. Then the grid
 * answers the pointer with a crosshair: the row and column under the cursor
 * lift together, which is how anyone reads a table anyway. Both the hot row and
 * the hot column are two custom properties written to the grid, so the cost is
 * one write per frame no matter how many cells there are.
 *
 * Server-rendered with every cell resolved, so the matrix is complete and
 * readable with no JavaScript at all.
 */
export function AskMatrix({ tests, asks, reading, insight, note, readout }) {
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
      if (!pending) return;
      grid.style.setProperty("--hot-r", pending.r);
      grid.style.setProperty("--hot-c", pending.c);
    };

    const onMove = (event) => {
      const cell = event.target.closest("[data-r]");
      if (!cell) return;
      pending = { r: cell.dataset.r, c: cell.dataset.c };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      pending = null;
      grid.style.removeProperty("--hot-r");
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
    <figure className={`mx${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <dl className="mx-readout">
        {readout.figures.map((f) => (
          <div className={`mx-fig${f.tone ? ` mx-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="mx-fig-n">{f.n}</dt>
            <dd className="mx-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="mx-grid" ref={gridRef}>
        {/* Column heads: the tests, in the order they resolve. */}
        <div className="mx-corner hx-mono">{readout.corner}</div>
        {tests.map((t, c) => (
          <div className="mx-head" key={t.k} data-r="0" data-c={c + 1} style={{ "--c": c + 1 }}>
            <span className="mx-head-n hx-mono">{String(c + 1).padStart(2, "0")}</span>
            <span className="mx-head-k">{t.k}</span>
          </div>
        ))}

        {/* Flat, not a row of row-wrappers: every cell sits on the grid's own
            tracks, which is what keeps the columns true at any width. */}
        {asks.map((a, r) => (
          <Fragment key={a.k}>
            <div className="mx-ask" data-r={r + 1} data-c="0" style={{ "--r": r + 1 }}>
              <span className="mx-ask-k">{a.k}</span>
              <span className="mx-ask-b">{a.b}</span>
            </div>

            {a.cells.map((pass, c) => (
              <div
                className={`mx-cell${pass ? "" : " is-fail"}`}
                key={tests[c].k}
                data-r={r + 1}
                data-c={c + 1}
                style={{ "--c": c + 1, "--r": r + 1 }}
              >
                <span className="mx-dot" aria-hidden="true" />
                <span className="mx-sr">{`${tests[c].k}: ${pass ? readout.pass : readout.fail}`}</span>
              </div>
            ))}
          </Fragment>
        ))}
      </div>

      <p className="mx-legend hx-mono">
        <span>{readout.legend}</span>
        <span className="mx-legend-names">{readout.legendNames}</span>
      </p>

      {/* What the solid column means, beside the thing it protects. */}
      <div className="mx-read">
        <div className="mx-plate">
          <Image
            className="mx-shot"
            src={reading.shot.src}
            alt={reading.shot.alt}
            width={SHOT_W}
            height={SHOT_H}
            sizes="(max-width: 1000px) min(92vw, 460px), min(34vw, 470px)"
            loading="lazy"
          />
          <span className="mx-ring" aria-hidden="true" />
        </div>
        <div className="mx-read-t">
          <p className="mx-read-k hx-mono">{reading.k}</p>
          <p className="mx-read-c">{reading.claim}</p>
          <p className="mx-read-b">{reading.b}</p>
        </div>
      </div>

      <p className="mx-insight">
        <span className="mx-insight-k hx-mono">{insight.k}</span>
        <span className="mx-insight-v">{insight.v}</span>
      </p>

      <figcaption className="mx-note">{note}</figcaption>
    </figure>
  );
}
