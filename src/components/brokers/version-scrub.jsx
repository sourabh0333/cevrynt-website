"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PointerField } from "@/components/home/fx";
import { useCoarsePointer, useHasEntered, useReady, useReducedMotion } from "@/components/progressive";

const SHOT_W = 1600;
const SHOT_H = 760;

/** How long the re-run takes to play itself through, once, on arrival. */
const PLAY_MS = 1700;

/**
 * 05 — You send the one thing that was missing. The file does not start over.
 *
 * This is the section a broker actually wants at the end, because everything
 * before it has been about what a submission costs when something is absent.
 * The answer to that is not a diagram. It is the product's re-run: two new
 * documents go in, the case updates instead of resetting, and what moved is
 * called out rather than buried in a second read.
 *
 * So the figure is the movement itself, and it is scrubbable. The handle runs
 * between version one and version two of a real analysis, and the six signals
 * the re-run tabulates move with it — the numbers count, the bars travel from
 * where they were to where they are, and the change badges materialise as the
 * new pass lands. Every previous and current value on it is read off the screen
 * above, not invented for the drawing.
 *
 * The last row is the honest one. The address mismatch does not move, because a
 * new bank statement does not settle an address, and the screen keeps it
 * visible across both versions rather than quietly dropping it. One row that
 * refuses to travel while six do is the only way to say that fairly.
 *
 * It plays itself once on arrival, the way the package stacks do, and then
 * hands the handle over. Dragging, arrow keys and Home/End all drive the same
 * value, because the control is a real range input wearing different clothes.
 *
 * Server-rendered at version two — the finished state, every number at its
 * current value — so with no JavaScript the table simply reads as the result.
 */
export function VersionScrub({ shot, versions, signals, still, readout, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const entered = useHasEntered(scope, 0.22);

  // 0 is version one, 1 is version two. Server-rendered at the finished state.
  const [t, setT] = useState(1);
  const [touched, setTouched] = useState(false);

  // Once, on arrival: run the re-run through rather than presenting its result.
  const raf = useRef(0);
  useEffect(() => {
    if (!ready || !entered || touched || reduced || coarse) return undefined;

    const from = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - from) / PLAY_MS);
      // Ease out, so the numbers settle rather than stop dead.
      setT(1 - Math.pow(1 - p, 3));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };

    // The first frame writes 0 itself. Setting it here instead would be a
    // synchronous state write inside an effect body, and it buys nothing.
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [ready, entered, touched, reduced, coarse]);

  const onInput = useCallback((event) => {
    cancelAnimationFrame(raf.current);
    setTouched(true);
    setT(Number(event.target.value) / 1000);
  }, []);

  const at = (signal) => signal.from + (signal.to - signal.from) * t;

  /** Formatting travels as data, not as a function — this crosses a boundary. */
  const show = (signal, value) =>
    `${signal.prefix || ""}${value.toFixed(signal.decimals || 0)}${signal.suffix || ""}`;

  return (
    <figure
      className={`rr${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`}
      ref={scope}
      style={{ "--t": t.toFixed(4) }}
    >
      <div className="rr-readout">
        {readout.figures.map((figure) => (
          <p className="rr-fig" key={figure.k}>
            <span className="rr-fig-n">{figure.n}</span>
            <span className="rr-fig-k hx-mono">{figure.k}</span>
          </p>
        ))}
      </div>

      <PointerField className="rr-field" selector=".rr-stage">
        <div className="rr-stage">
          <span className="rr-ambient" aria-hidden="true" />
          <span className="rr-key" aria-hidden="true" />

          <div className="rr-plate">
            <Image
              className="rr-shot"
              src={shot.src}
              alt={shot.alt}
              width={SHOT_W}
              height={SHOT_H}
              sizes="(max-width: 900px) 94vw, 1180px"
              loading="lazy"
            />
            {/* Drawn on the panel these numbers are read off. */}
            <span className="rr-ring" aria-hidden="true" />
          </div>

          {/* The handle between the two passes. */}
          <div className="rr-scrub">
            {versions.map((version, i) => (
              <div className={`rr-ver rr-ver-${i === 0 ? "a" : "b"}${(i === 0) === (t < 0.5) ? " is-live" : ""}`} key={version.name}>
                <p className="rr-ver-n">{version.name}</p>
                <p className="rr-ver-t hx-mono">{version.at}</p>
                <p className="rr-ver-w">{version.what}</p>
              </div>
            ))}

            <div className="rr-track">
              <span className="rr-track-line" aria-hidden="true" />
              <span className="rr-track-fill" aria-hidden="true" />
              <span className="rr-track-knob" aria-hidden="true" />
              <input
                className="rr-range"
                type="range"
                min="0"
                max="1000"
                step="1"
                value={Math.round(t * 1000)}
                onInput={onInput}
                onChange={onInput}
                aria-label={readout.scrubLabel}
                aria-valuetext={t < 0.5 ? versions[0].name : versions[1].name}
              />
            </div>
          </div>

          {/* What the re-run tabulates, moving as the handle moves. */}
          <div className="rr-table" role="table" aria-label={readout.tableLabel}>
            <div className="rr-row rr-row-head" role="row">
              <span className="rr-c-name hx-mono" role="columnheader">{readout.signal}</span>
              <span className="rr-c-prev hx-mono" role="columnheader">{readout.previous}</span>
              <span className="rr-c-bar hx-mono" role="columnheader">{readout.movement}</span>
              <span className="rr-c-now hx-mono" role="columnheader">{readout.current}</span>
              <span className="rr-c-badge hx-mono" role="columnheader">{readout.change}</span>
            </div>

            {signals.map((signal) => {
              const span = Math.max(signal.from, signal.to) * 1.18 || 1;
              return (
                <div
                  className="rr-row"
                  role="row"
                  key={signal.name}
                  style={{ "--p": `${(signal.from / span) * 100}%`, "--c": `${(at(signal) / span) * 100}%` }}
                >
                  <span className="rr-c-name" role="cell">{signal.name}</span>
                  <span className="rr-c-prev" role="cell">{show(signal, signal.from)}</span>
                  <span className="rr-c-bar" role="cell">
                    <span className="rr-bar" aria-hidden="true">
                      <span className="rr-bar-track" />
                      <span className="rr-bar-fill" />
                      <span className="rr-bar-was" />
                    </span>
                  </span>
                  <span className="rr-c-now" role="cell">{show(signal, at(signal))}</span>
                  <span className="rr-c-badge" role="cell">
                    <span className="rr-badge hx-mono">{signal.badge}</span>
                  </span>
                </div>
              );
            })}

            {/* And the one that does not move. */}
            <div className="rr-row rr-row-still" role="row">
              <span className="rr-c-name" role="cell">{still.name}</span>
              <span className="rr-c-prev" role="cell">{still.value}</span>
              {/* An empty track. Nothing moved here, so nothing is marked. */}
              <span className="rr-c-bar" role="cell">
                <span className="rr-bar" aria-hidden="true">
                  <span className="rr-bar-track" />
                </span>
              </span>
              <span className="rr-c-now" role="cell">{still.value}</span>
              <span className="rr-c-badge" role="cell">
                <span className="rr-badge rr-badge-open hx-mono">{still.badge}</span>
              </span>
            </div>
          </div>

          <p className="rr-said">{still.said}</p>
        </div>
      </PointerField>

      <figcaption className="rr-note">{note}</figcaption>
    </figure>
  );
}
