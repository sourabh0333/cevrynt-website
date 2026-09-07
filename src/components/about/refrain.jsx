"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 02 — The same four words, seven times.
 *
 * This was a three-column table, which was the wrong shape for it entirely: a
 * table asks you to compare rows, and there is nothing to compare here. The
 * whole content of the section is that one sentence is true seven times over.
 *
 * So it is a wall of the sentence. Seven identical lines, set large in the
 * serif this site keeps for things meant to be read slowly, stacked so that the
 * repetition is the thing you see before you have read a word of it. The stage
 * it belongs to and what that stage produces sit out in the margin in fine
 * print, where a footnote goes, because they are the supporting detail and the
 * sentence is the point.
 *
 * The margins arrive first and the seven sentences land together, because they
 * are one fact rather than seven.
 *
 * Server-rendered whole.
 */
export function Refrain({ stages, phrase, readout, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const said = useHasEntered(scope, 0.18);

  return (
    <figure className={`rf${ready ? " is-ready" : ""}${said ? " is-said" : ""}`} ref={scope}>
      <dl className="rf-readout">
        <div className="rf-fig">
          <dt className="rf-fig-n">{String(stages.length).padStart(2, "0")}</dt>
          <dd className="rf-fig-k hx-mono">{readout.stages}</dd>
        </div>
        <div className="rf-fig rf-fig-lit">
          <dt className="rf-fig-n">{String(stages.length).padStart(2, "0")}</dt>
          <dd className="rf-fig-k hx-mono">{readout.times}</dd>
        </div>
      </dl>

      <ol className="rf-wall">
        {stages.map((s, i) => (
          <li className="rf-line" key={s.k} style={{ "--d": `${i * 70}ms` }}>
            <span className="rf-margin">
              <span className="rf-margin-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="rf-margin-k">{s.k}</span>
              <span className="rf-margin-b">{s.b}</span>
            </span>
            {/* The same sentence, at full size, seven times. */}
            <span className="rf-phrase">{phrase}</span>
          </li>
        ))}
      </ol>

      <p className="rf-said">{readout.said}</p>

      <figcaption className="rf-note">{note}</figcaption>
    </figure>
  );
}
