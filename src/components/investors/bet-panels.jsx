"use client";

import { useRef } from "react";
import { PointerField } from "@/components/home/fx";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 05 — What the bet rests on, and what would sink each part of it.
 *
 * The four sections above set out the market, the product, the route in and the
 * team. The question left is the one an investor is actually underwriting:
 * which assumptions does this company need to be right about.
 *
 * These are not forecasts and they are not new claims. Each one is an
 * assumption the product's design has already committed to — the engine issues
 * no disposition, nothing ships with a default policy, provenance is carried
 * rather than reconstructed — so they are the expensive ones to be wrong about.
 * Each is published with what would show it wrong, because an assumption
 * nobody can falsify is not an assumption, it is a slogan.
 *
 * That pairing is the composition. The claim sits in the body of the panel and
 * its falsifier sits in an inset beneath, which arrives from behind the panel
 * on entry — the counterweight appearing under each claim rather than beside
 * it, so neither can be read without the other.
 *
 * Under a fine pointer a light tracks the cursor across the panel and the one
 * being read lifts. The light is the only thing on this page that follows the
 * hand rather than the scroll, and it is here because these are the three
 * paragraphs most worth stopping on.
 *
 * Server-rendered complete, every falsifier in place.
 */
export function BetPanels({ bets, foot, close, note, readout }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.16);

  return (
    <figure className={`bet${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <p className="bet-head hx-mono">{readout.head}</p>

      <PointerField className="bet-field" selector=".bet-panel">
        <ol className="bet-grid">
          {bets.map((b, i) => (
            <li className="bet-panel" key={b.k} style={{ "--i": i }}>
              <span className="bet-sheen" aria-hidden="true" />

              <p className="bet-n hx-mono">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="bet-k">{b.k}</h3>
              <p className="bet-b">{b.b}</p>

              <div className="bet-fail">
                <p className="bet-fail-k hx-mono">{readout.failK}</p>
                <p className="bet-fail-b">{b.fail}</p>
              </div>
            </li>
          ))}
        </ol>
      </PointerField>

      <p className="bet-foot">{foot}</p>
      <p className="bet-close">{close}</p>
      <figcaption className="bet-note">{note}</figcaption>
    </figure>
  );
}
