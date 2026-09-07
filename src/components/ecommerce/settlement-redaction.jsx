"use client";

import { useRef } from "react";
import Image from "next/image";
import { useHasEntered, useReady } from "@/components/progressive";

const SHOT_W = 1600;
const SHOT_H = 760;

/**
 * 02 — What a settlement has already had taken out of it.
 *
 * A merchant's own systems know an enormous amount: every order, every refund,
 * every fee, which channel it came through, what the stock cost. None of that
 * survives the trip to a bank account. By the time the money lands it is one
 * net line, and a lender reading the statement is reading the residue.
 *
 * So the section performs the loss rather than listing it. Each thing the
 * merchant knows is struck out of existence in turn — blacked over, the way a
 * released document is — and what is left at the end is the single line that
 * actually reaches the file, set clean and quotable, exactly as the extract
 * screen records it.
 *
 * The categories are redacted, never invented values. Nothing here fabricates
 * an order book to then take it away; these are the kinds of fact a commerce
 * business holds, and the point is only that a bank statement holds none of
 * them. That is a property of the medium, not a gap in the product, and it is
 * why merchant context has to be brought to an underwriter rather than
 * extracted from the statement and quietly presented as if it had been.
 *
 * Server-rendered with everything already redacted and the surviving line
 * shown, which is the true resting state: this is what the lender has.
 */
export function SettlementRedaction({ shot, removed, survives, readout, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const cut = useHasEntered(scope, 0.24);

  return (
    <figure className={`blk${ready ? " is-ready" : ""}${cut ? " is-cut" : ""}`} ref={scope}>
      <dl className="blk-readout">
        {readout.figures.map((f) => (
          <div className={`blk-fig${f.tone ? ` blk-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="blk-fig-n">{f.n}</dt>
            <dd className="blk-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="blk-body">
        <div className="blk-half">
          <p className="blk-k hx-mono">{readout.knows}</p>
          <ol className="blk-list">
            {removed.map((r, i) => (
              <li className="blk-row" key={r} style={{ "--d": `${i * 130}ms` }}>
                <span className="blk-text">{r}</span>
                {/* Blacked over, the way a released document is. */}
                <span className="blk-bar" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>

        <div className="blk-half blk-half-left">
          <p className="blk-k hx-mono">{readout.arrives}</p>
          {/* What is left: one line, exactly as the extract records it. */}
          <p className="blk-line">
            <span className="blk-line-d hx-mono">{survives.when}</span>
            <span className="blk-line-t">{survives.what}</span>
            <span className="blk-line-v">{survives.amount}</span>
          </p>
          <p className="blk-line-src hx-mono">{survives.source}</p>
          <p className="blk-said">{readout.said}</p>
        </div>
      </div>

      <div className="blk-plate">
        <Image
          className="blk-shot"
          src={shot.src}
          alt={shot.alt}
          width={SHOT_W}
          height={SHOT_H}
          sizes="(max-width: 900px) 94vw, 1180px"
          loading="lazy"
        />
      </div>

      <figcaption className="blk-note">{note}</figcaption>
    </figure>
  );
}
