"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 01 — The sentence the company was started on, set as the section.
 *
 * The version this replaces put the claim in a sixty-percent column with an
 * aside beside it, which meant the most important sentence on the page was
 * never the largest thing on it. Here the sentence is the section: full width,
 * at display size, with the three phrases it turns on carried down into a
 * three-track grid beneath that is flush to both edges.
 *
 * Above it, one rule divided into the seven stages a figure passes through,
 * with the link running the whole way unbroken. That is the measurement and it
 * stays — but as a header rule rather than the main event, because the claim
 * outranks the diagram of the claim.
 *
 * The reveal does the argument. The three load-bearing phrases arrive first and
 * alone, and the connective tissue of the sentence fills in around them — so
 * the parts that cost us something are the parts a reader sees first, before
 * they have read a word of what those phrases commit us to. No measurement, no
 * leader lines, nothing that can fall out of alignment: it is opacity on spans
 * that are already in the right place.
 *
 * Server-rendered whole, at full strength.
 */
export function Sentence({ claim, stages, notes, insight, note, readout }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.2);

  return (
    <figure className={`sen${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <dl className="sen-readout">
        {readout.figures.map((f) => (
          <div className={`sen-fig${f.tone ? ` sen-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="sen-fig-n">{f.n}</dt>
            <dd className="sen-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      {/* The seven stages, and one link across all of them. */}
      <div className="sen-span">
        <div className="sen-rail">
          <span className="sen-line" aria-hidden="true" />
          <span className="sen-link" aria-hidden="true" />
          <ol className="sen-stages">
            {stages.map((s, i) => (
              <li className="sen-stage" key={s} style={{ "--i": i }}>
                <span className="sen-tick" aria-hidden="true" />
                <span className="sen-stage-k hx-mono">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="sen-ends">
          <span className="sen-end hx-mono">{readout.from}</span>
          <span className="sen-end sen-end-b hx-mono">{readout.to}</span>
        </div>
      </div>

      {/* The claim. The marked phrases arrive first; the rest fills in. */}
      <p className="sen-claim">
        {claim.map((part, i) =>
          part.mark ? (
            <span className="sen-key" key={i}>
              {part.t}
              <sup className="sen-mark">{part.mark}</sup>
            </span>
          ) : (
            <span className="sen-join" key={i}>
              {part.t}
            </span>
          ),
        )}
      </p>

      <ol className="sen-notes">
        {notes.map((n) => (
          <li className="sen-note" key={n.mark}>
            <span className="sen-note-n hx-mono">{n.mark}</span>
            <span className="sen-note-p">{n.phrase}</span>
            <span className="sen-note-k">{n.k}</span>
            <span className="sen-note-b">{n.b}</span>
          </li>
        ))}
      </ol>

      <p className="sen-insight">
        <span className="sen-insight-k hx-mono">{insight.k}</span>
        <span className="sen-insight-v">{insight.v}</span>
      </p>

      <figcaption className="sen-foot">{note}</figcaption>
    </figure>
  );
}
