"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 01 — Seven stages, and then something that is not a stage.
 *
 * The workflow this company describes everywhere has eight steps in it, and the
 * eighth is a different kind of thing from the other seven. Seven are software:
 * they read, structure, compare, evaluate, and hand on. The eighth is a person
 * deciding, and no amount of drawing it as an eighth box makes it one.
 *
 * So the figure refuses to draw it as one. The seven are set identically —
 * same size, same weight, same rhythm, indexed — and then the series stops, and
 * the last step arrives in a different material entirely: larger, in the serif
 * this site keeps for things meant to be read slowly, on its own line, with no
 * index number because it is not the next item in a list.
 *
 * The break in the pattern is the measurement. A reader who takes nothing else
 * from this page should still come away knowing that the last step is not part
 * of the machine, because the page could not make it look like it was.
 *
 * Server-rendered whole.
 */
export function SevenThenOne({ stages, last, readout, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const run = useHasEntered(scope, 0.24);

  return (
    <figure className={`sq${ready ? " is-ready" : ""}${run ? " is-run" : ""}`} ref={scope}>
      <dl className="sq-readout">
        {readout.figures.map((f) => (
          <div className={`sq-fig${f.tone ? ` sq-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="sq-fig-n">{f.n}</dt>
            <dd className="sq-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      {/* Seven, set identically, because they are the same kind of thing. */}
      <ol className="sq-run">
        {stages.map((s, i) => (
          <li className="sq-stage" key={s.k} style={{ "--d": `${i * 80}ms` }}>
            <span className="sq-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="sq-k">{s.k}</span>
            <span className="sq-b">{s.b}</span>
          </li>
        ))}
      </ol>

      {/* And then the series stops. */}
      <div className="sq-break" aria-hidden="true">
        <span className="sq-break-line" />
      </div>

      <div className="sq-last">
        <p className="sq-last-k hx-mono">{last.k}</p>
        <p className="sq-last-v">{last.v}</p>
        <p className="sq-last-b">{last.b}</p>
      </div>

      <figcaption className="sq-note">{note}</figcaption>
    </figure>
  );
}
