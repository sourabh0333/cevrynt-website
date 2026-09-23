"use client";

import { useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 02 — Where the line is.
 *
 * Read one at a time, the answers above are sixteen separate replies. Read
 * together, half of them are drawing the same line: what Cevrynt does on one
 * side, and what it does not do on the other. This section lays that line
 * down once.
 *
 * One vertical rule runs down the middle. Each row pairs a thing Cevrynt does,
 * set flush against the rule on the left, with the thing it pointedly does
 * not do, flush against it on the right — so the eye crosses the line on every
 * row. Every pair cites the question whose answer states it, and the citation
 * links back up to that row, which opens it.
 *
 * Nothing on either side is new: each item restates an answer already given
 * above, so the two sections can never disagree.
 *
 * Server-rendered with every pair and citation present.
 */
export function BoundaryLine({ pairs, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.1);
  const [at, setAt] = useState(null);

  const counts = {
    does: pairs.length,
    doesNot: pairs.length,
    questions: new Set(pairs.map((p) => p.cite.id)).size,
  };

  return (
    <figure className={`fq2${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="fq2-readout">
        {readout.figures.map((f) => (
          <div className={`fq2-fig${f.tone ? ` fq2-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="fq2-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="fq2-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="fq2-map">
        <p className="fq2-head" aria-hidden="true">
          <span className="fq2-head-k is-does hx-mono">{readout.doesK}</span>
          <span />
          <span className="fq2-head-k is-not hx-mono">{readout.doesNotK}</span>
        </p>

        <ol className="fq2-rows" onMouseLeave={() => setAt(null)}>
          {pairs.map((p, i) => (
            <li
              className={`fq2-row${at === i ? " is-on" : ""}`}
              key={p.cite.id + p.does}
              style={{ "--i": i }}
              onMouseEnter={() => setAt(i)}
            >
              <p className="fq2-does">
                <span className="fq2-side-k hx-mono">{readout.doesK}</span>
                {p.does}
              </p>
              <span className="fq2-node hx-mono" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="fq2-not">
                <p className="fq2-not-b">
                  <span className="fq2-side-k hx-mono">{readout.doesNotK}</span>
                  {p.doesNot}
                </p>
                <a className="fq2-cite" href={`#${p.cite.id}`} onFocus={() => setAt(i)}>
                  <span className="fq2-cite-k hx-mono">{readout.citeK}</span>
                  <span className="fq2-cite-q">{p.cite.q}</span>
                  <span aria-hidden="true">↑</span>
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="fq2-body">
        <div className="fq2-said">
          <p className="fq2-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="fq2-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="fq2-aside">
          <p className="fq2-aside-k hx-mono">{aside.title}</p>
          <ol className="fq2-audit">
            {aside.items.map((item) => (
              <li className="fq2-audit-row" key={item.k}>
                <span className="fq2-audit-k">{item.k}</span>
                <span className="fq2-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="fq2-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="fq2-close">{close}</p>
      <figcaption className="fq2-note">{note}</figcaption>
    </figure>
  );
}
