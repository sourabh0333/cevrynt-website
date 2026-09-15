"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 02 — The addresses themselves, at the size they deserve.
 *
 * Most contact pages bury the actual destination in small grey text under a
 * form nobody wants to fill in. These are the payload of the page, so they are
 * set at display scale and each one is a real link.
 *
 * The hint under each line is folded away rather than hidden: the row is a grid
 * whose second track is zero-height until the row is hovered or focused, and
 * then it opens. Animating a grid track from 0fr to 1fr is the one way to move
 * a row between two content-sized states without picking an arbitrary height
 * and hoping the copy fits inside it — and unlike a max-height guess it cannot
 * clip a line on a narrow screen.
 *
 * Focus opens the same fold as hover, so the hint is reachable from the
 * keyboard rather than being a mouse-only reward.
 *
 * Server-rendered with every address present as a link.
 */
export function DirectLines({ lines, refusals, close, note, readout }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.2);

  return (
    <figure className={`lne${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <ul className="lne-list">
        {lines.map((l, i) => (
          <li className="lne-row" key={l.to} style={{ "--i": i }}>
            <a className="lne-link" href={l.href}>
              <span className="lne-fill" aria-hidden="true" />
              <span className="lne-k hx-mono">{l.k}</span>
              <span className="lne-to">{l.to}</span>
              <span className="lne-arrow" aria-hidden="true">
                →
              </span>
              <span className="lne-fold">
                <span className="lne-hint">{l.hint}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="lne-refusals">
        <p className="lne-refusals-k hx-mono">{readout.refusalsK}</p>
        <ul className="lne-refusal-list">
          {refusals.map((r) => (
            <li className="lne-refusal" key={r}>
              {r}
            </li>
          ))}
        </ul>
      </div>

      <p className="lne-close">{close}</p>
      <figcaption className="lne-note">{note}</figcaption>
    </figure>
  );
}
