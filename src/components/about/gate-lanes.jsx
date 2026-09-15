"use client";

import { useRef } from "react";
import Image from "next/image";
import { useHasEntered, useReady } from "@/components/progressive";

const SHOT_W = 1600;
const SHOT_H = 650;

/**
 * 07 — Who this is built for, run at one gate.
 *
 * An earlier attempt at this content indented the rows that did not fit past a
 * threshold line and let the rows that did fit run straight through it, which
 * encoded nothing and left two different measures stacked on each other. The
 * encoding here is the other way round and it is the right way round: every
 * description runs as a lane toward a single gate, the four that qualify carry
 * on to the far edge, and the four that do not stop dead at it.
 *
 * Eight lanes on eight equal tracks, one gate spanning all of them, flush to
 * both edges of the column. A reader sees which lanes got through before
 * reading a word, and the four that stop are the half of this that costs us
 * conversations — which is the reason to publish it.
 *
 * The effect is the lanes running. They extend left to right in turn, and each
 * one either meets the gate and ends there or passes it and continues, so the
 * sort is watched rather than reported. The stop caps and the arrows arrive
 * after their own lane has finished travelling, never before.
 *
 * Server-rendered with every lane at full length and every cap in place.
 */
export function GateLanes({ question, lanes, reading, insight, note, readout }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.18);

  return (
    <figure className={`gat${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <dl className="gat-readout">
        {readout.figures.map((f) => (
          <div className={`gat-fig${f.tone ? ` gat-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="gat-fig-n">{f.n}</dt>
            <dd className="gat-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      {/* The one question every lane is run at. */}
      <p className="gat-q">{question}</p>

      <div className="gat-field">
        {/* Placed in the track column across every row, so the gate is exactly
            where the lanes measure themselves against it at any width. */}
        <div className="gat-gatecol" aria-hidden="true">
          <span className="gat-gate" />
          <span className="gat-gate-k hx-mono">{readout.gate}</span>
        </div>

        {lanes.map((l, i) => (
          <div className={`gat-row${l.stops ? " is-stop" : ""}`} key={l.k} style={{ "--i": i }}>
            <div className="gat-label">
              <span className="gat-label-k">{l.k}</span>
              <span className="gat-label-b">{l.b}</span>
            </div>

            <div className="gat-track">
              <span className="gat-run">
                <span className="gat-line" />
                <span className="gat-cap" />
              </span>
            </div>

            {/* A child of the row, not of the track — inside the track it would
                sit in the lane column and print over the lanes. */}
            <span className="gat-verdict hx-mono">{l.stops ? readout.stopK : readout.passK}</span>
          </div>
        ))}
      </div>

      {/* What the four that got through are actually left holding. */}
      <div className="gat-read">
        <div className="gat-plate">
          <Image
            className="gat-shot"
            src={reading.shot.src}
            alt={reading.shot.alt}
            width={SHOT_W}
            height={SHOT_H}
            sizes="(max-width: 1000px) min(92vw, 460px), min(34vw, 470px)"
            loading="lazy"
          />
          <span className="gat-ring" aria-hidden="true" />
        </div>
        <div className="gat-read-t">
          <p className="gat-read-k hx-mono">{reading.k}</p>
          <p className="gat-read-c">{reading.claim}</p>
          <p className="gat-read-b">{reading.b}</p>
        </div>
      </div>

      <p className="gat-insight">
        <span className="gat-insight-k hx-mono">{insight.k}</span>
        <span className="gat-insight-v">{insight.v}</span>
      </p>

      <figcaption className="gat-note">{note}</figcaption>
    </figure>
  );
}
