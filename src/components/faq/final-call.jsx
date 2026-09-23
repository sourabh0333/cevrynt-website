"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 04 — The final call, followed through.
 *
 * Two answers on this page carry the whole of Cevrynt's position on who
 * decides: underwriters are not replaced, and when one disagrees they apply a
 * documented override that stays on the record. Said in a paragraph, that is
 * easy to nod at. Here it is walked through on an illustrative reviewer view,
 * one step at a time.
 *
 * Choosing a step spotlights the part of the screen it describes — the rest
 * of the view dims — and shows the sentence from the answer it comes from.
 * Each spotlight is its own pre-placed layer that only fades in and out, so
 * nothing animates position or size.
 *
 * Server-rendered with every step, quote and the image present. The image is
 * illustrative, on synthetic data, and captioned as such.
 */
export function FinalCall({ steps, image, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.12);
  const [at, setAt] = useState(null);

  const counts = {
    steps: steps.length,
    answers: new Set(steps.map((s) => s.cite.id)).size,
    software: steps.filter((s) => s.decidedBySoftware).length,
  };

  return (
    <figure className={`fq4${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="fq4-readout">
        {readout.figures.map((f) => (
          <div className={`fq4-fig${f.tone ? ` fq4-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="fq4-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="fq4-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="fq4-plate">
        <div className="fq4-steps-col">
          <p className="fq4-col-k hx-mono">{readout.stepsK}</p>
          <ol className="fq4-steps" onMouseLeave={() => setAt(null)}>
            {steps.map((s, i) => (
              <li className={`fq4-step${at === i ? " is-on" : ""}`} key={s.k} style={{ "--i": i }}>
                <button
                  className="fq4-step-b"
                  type="button"
                  aria-pressed={at === i}
                  onClick={() => setAt((cur) => (cur === i ? null : i))}
                  onMouseEnter={() => setAt(i)}
                  onFocus={() => setAt(i)}
                >
                  <span className="fq4-step-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="fq4-step-k">{s.k}</span>
                  <span className="fq4-step-q">“{s.quote}”</span>
                  <span className="fq4-step-c hx-mono">
                    {readout.fromK} {s.cite.q}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="fq4-view">
          <p className="fq4-col-k hx-mono">{readout.viewK}</p>
          <div className={`fq4-frame${at === null ? "" : " is-lit"}`} style={{ aspectRatio: `${image.w} / ${image.h}` }}>
            <Image
              className="fq4-img"
              src={image.src}
              alt={image.alt}
              width={image.w}
              height={image.h}
              sizes="(max-width: 980px) 92vw, 700px"
              loading="lazy"
            />
            {steps.map((s, i) => (
              <span
                className={`fq4-spot${at === i ? " is-on" : ""}`}
                key={`${s.k}-spot`}
                aria-hidden="true"
                style={{ left: `${s.area.x}%`, top: `${s.area.y}%`, width: `${s.area.w}%`, height: `${s.area.h}%` }}
              >
                <span className="fq4-spot-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              </span>
            ))}
          </div>
          <p className="fq4-caption hx-mono">{readout.captionK}</p>
        </div>
      </div>

      <div className="fq4-body">
        <div className="fq4-said">
          <p className="fq4-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="fq4-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="fq4-aside">
          <p className="fq4-aside-k hx-mono">{aside.title}</p>
          <ol className="fq4-audit">
            {aside.items.map((item) => (
              <li className="fq4-audit-row" key={item.k}>
                <span className="fq4-audit-k">{item.k}</span>
                <span className="fq4-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="fq4-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="fq4-close">{close}</p>
      <figcaption className="fq4-note">{note}</figcaption>
    </figure>
  );
}
