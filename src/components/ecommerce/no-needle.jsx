"use client";

import { useRef } from "react";
import Image from "next/image";
import { PointerField } from "@/components/home/fx";
import { useHasEntered, useReady } from "@/components/progressive";

const SHOT_W = 1600;
const SHOT_H = 760;

/** The instrument's own geometry. Centre, radius, and where the ticks fall. */
const CX = 200;
const CY = 196;
const R = 150;

const at = (value, radius) => {
  const rad = Math.PI * (1 - value / 100);
  return [CX + radius * Math.cos(rad), CY - radius * Math.sin(rad)];
};

const MAJOR = [0, 25, 50, 75, 100];
const MINOR = Array.from({ length: 21 }, (_, i) => i * 5).filter((v) => !MAJOR.includes(v));

/**
 * 04 — The instrument, complete, with no needle in it.
 *
 * The obvious product for merchant financing is a score: one number, derived
 * from commerce activity, that a lender can sort a queue on. It is also the
 * thing that would quietly move the decision from the lender to the vendor, so
 * Cevrynt does not issue one.
 *
 * Saying that in a sentence is easy to skim past. So the section draws the
 * instrument instead — a real gauge, correctly built, every tick from zero to a
 * hundred where it should be, the hub in place — and leaves out the one part
 * that would make it mean something. An empty dial is a harder thing to
 * misread than a disclaimer, and it is doing the argument rather than stating
 * it: the apparatus for scoring a merchant is perfectly buildable, and the
 * missing piece is a choice.
 *
 * Beside it, at ordinary size, the four things that are produced — the lender's
 * own criteria applied, exceptions raised and held, an override recorded with
 * its reason, the policy version retained with the file.
 *
 * This is the only panel on the page, because it is the arrival; everything
 * before it is read on the open band.
 */
export function NoNeedle({ shot, produced, readout, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.24);

  return (
    <figure className={`gg${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <PointerField className="gg-field" selector=".gg-stage">
        <div className="gg-stage">
          <span className="gg-ambient" aria-hidden="true" />
          <span className="gg-key" aria-hidden="true" />

          <div className="gg-body">
            <div className="gg-dial">
              <svg className="gg-svg" viewBox="0 0 400 236" role="img" aria-label={readout.dialLabel}>
                <path
                  className="gg-arc"
                  d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
                  pathLength="1"
                />

                {MINOR.map((v) => {
                  const [x1, y1] = at(v, R - 7);
                  const [x2, y2] = at(v, R);
                  return <line className="gg-tick" key={v} x1={x1} y1={y1} x2={x2} y2={y2} />;
                })}

                {MAJOR.map((v) => {
                  const [x1, y1] = at(v, R - 16);
                  const [x2, y2] = at(v, R);
                  const [lx, ly] = at(v, R - 34);
                  return (
                    <g className="gg-major" key={v}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} />
                      <text x={lx} y={ly + 4}>{v}</text>
                    </g>
                  );
                })}

                {/* The hub is here. What would turn on it is not. */}
                <circle className="gg-hub" cx={CX} cy={CY} r="5" />
              </svg>

              <p className="gg-dial-k hx-mono">{readout.dialK}</p>
              <p className="gg-dial-v">{readout.dialV}</p>
            </div>

            <div className="gg-made">
              <p className="gg-made-k hx-mono">{readout.madeK}</p>
              <ol className="gg-list">
                {produced.map((p, i) => (
                  <li className="gg-item" key={p.k} style={{ "--d": `${i * 110}ms` }}>
                    <span className="gg-item-n hx-mono">{p.v}</span>
                    <span className="gg-item-k">{p.k}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="gg-plate">
            <Image
              className="gg-shot"
              src={shot.src}
              alt={shot.alt}
              width={SHOT_W}
              height={SHOT_H}
              sizes="(max-width: 1000px) 92vw, 1160px"
              loading="lazy"
            />
            <span className="gg-ring" aria-hidden="true" />
          </div>
        </div>
      </PointerField>

      <figcaption className="gg-note">{note}</figcaption>
    </figure>
  );
}
