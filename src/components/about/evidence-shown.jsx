"use client";

import { useRef } from "react";
import Image from "next/image";
import { useHasEntered, useReady } from "@/components/progressive";

const SHOT_W = 1600;
const SHOT_H = 650;

/**
 * 03 — The restrictions from 02, sorted by whether you can be shown them.
 *
 * The section above makes four promises. A promise is worth very little on an
 * About page, so this one does the only thing that makes a promise mean
 * anything: it says which of them a reader can go and look at, and which they
 * cannot.
 *
 * Three rows, each pairing a restriction with the product view where it is
 * actually visible, and a line naming the exact thing in that view to look at —
 * not "see the platform", but page 4 lines 22–31. The image is the evidence and
 * the sentence beside it is the pointer, which is the same arrangement the
 * product itself uses on a figure and its source.
 *
 * The fourth restriction is set apart at the end because it has no screen
 * behind it. Leaving it in the list would have let it borrow the credibility of
 * the three above it; putting it below the rule, named and unevidenced, is the
 * honest placement. The measurement in the section is that split: three and
 * one, drawn as three plates and an empty-ruled block.
 *
 * Server-rendered complete — the rows are legible with no JavaScript, and the
 * entrance only staggers them in.
 */
export function EvidenceShown({ rows, open, insight, note, readout }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.16);

  return (
    <figure className={`evd${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <dl className="evd-readout">
        {readout.figures.map((f) => (
          <div className={`evd-fig${f.tone ? ` evd-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="evd-fig-n">{f.n}</dt>
            <dd className="evd-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <p className="evd-head-k hx-mono">{readout.shown}</p>

      {/* Each restriction beside the view it is visible in. */}
      <ol className="evd-list">
        {rows.map((r, i) => (
          <li className="evd-row" key={r.k} style={{ "--d": `${i * 110}ms` }}>
            <div className="evd-plate">
              <Image
                className="evd-shot"
                src={r.shot.src}
                alt={r.shot.alt}
                width={SHOT_W}
                height={SHOT_H}
                sizes="(max-width: 900px) min(92vw, 520px), min(46vw, 640px)"
                loading="lazy"
              />
              <span className="evd-ring" aria-hidden="true" />
            </div>

            <div className="evd-text">
              <span className="evd-n hx-mono">{r.n}</span>
              <span className="evd-k">{r.k}</span>
              <span className="evd-look">
                <span className="evd-look-k hx-mono">{readout.look}</span>
                <span className="evd-look-b">{r.look}</span>
              </span>
            </div>
          </li>
        ))}
      </ol>

      {/* The fourth one, kept out of the list because nothing shows it. */}
      <div className="evd-open">
        <p className="evd-open-k hx-mono">{open.k}</p>
        <p className="evd-open-c">{open.claim}</p>
        <p className="evd-open-b">{open.b}</p>
      </div>

      <p className="evd-insight">
        <span className="evd-insight-k hx-mono">{insight.k}</span>
        <span className="evd-insight-v">{insight.v}</span>
      </p>

      <figcaption className="evd-note">{note}</figcaption>
    </figure>
  );
}
