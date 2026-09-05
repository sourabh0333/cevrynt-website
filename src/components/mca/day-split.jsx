"use client";

import { useId, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

const money = (n) => `$${Math.round(n).toLocaleString("en-US")}`;

/**
 * 02 — One day, and how much of it is already sold.
 *
 * This is the question an MCA file turns on, and it is arithmetic rather than
 * opinion: an existing position collects every business day, so a share of each
 * day's deposits is committed before anybody looks at a new advance. The figures
 * here are the ones the site publishes for this deal — $84,613 in average
 * monthly deposits and a recurring $1,550 daily debit — and the bar is those two
 * numbers at their true proportions, not a drawing of them.
 *
 * The control is the part a spreadsheet is usually opened for. Move it and the
 * combined daily commitment recomputes against the same day: the second position
 * stacks on top of the first, and the remaining headroom is what is left of an
 * average day after both. It deliberately allows a figure past the end of the
 * day, because that is the case an underwriter most needs to see.
 *
 * It does not return a verdict, and it must not: the threshold belongs to the
 * lender's own policy, and Cevrynt issues no approval or decline on any file.
 * What it shows is the sum, at the proportions the sum actually has.
 *
 * The section before this gathers six statements into one series; this one takes
 * a single day and divides it.
 *
 * Server-rendered with the day split at its real proportions and the control at
 * its starting value, so the arithmetic reads with no JavaScript.
 */
export function DaySplit({ dayDeposits, existingDaily, maxProposed, startProposed, labels, note }) {
  const scope = useRef(null);
  const uid = useId();

  const ready = useReady();
  const drawn = useHasEntered(scope, 0.25);

  const [proposed, setProposed] = useState(startProposed);

  const committed = existingDaily + proposed;
  const existingPct = (existingDaily / dayDeposits) * 100;
  const proposedPct = (proposed / dayDeposits) * 100;
  const combinedPct = (committed / dayDeposits) * 100;
  const headroom = dayDeposits - committed;
  const over = headroom < 0;

  return (
    <figure
      className={`ds${ready ? " is-ready" : ""}${drawn ? " is-drawn" : ""}${over ? " is-over" : ""}`}
      ref={scope}
    >
      <div className="ds-readout">
        <p className="ds-fig">
          <span className="ds-fig-n">{Math.round(combinedPct)}%</span>
          <span className="ds-fig-k hx-mono">{labels.combined}</span>
        </p>
        <span className="ds-readout-rule" aria-hidden="true" />
        <p className="ds-fig ds-fig-quiet">
          <span className="ds-fig-n">{over ? `−${money(-headroom)}` : money(headroom)}</span>
          <span className="ds-fig-k hx-mono">{over ? labels.over : labels.headroom}</span>
        </p>
      </div>

      {/* One average day of deposits, at true proportions. */}
      <div
        className="ds-day"
        style={{ "--existing": `${existingPct}%`, "--proposed": `${Math.min(proposedPct, 100 - existingPct)}%` }}
        role="img"
        aria-label={`An average day of deposits is ${money(dayDeposits)}. The existing position takes ${money(existingDaily)}, a proposed position of ${money(proposed)} takes ${Math.round(proposedPct)} per cent, leaving ${over ? "less than nothing" : money(headroom)}.`}
      >
        <span className="ds-seg ds-seg-existing">
          <span className="ds-seg-k hx-mono">{labels.existing}</span>
          <span className="ds-seg-v hx-mono">{money(existingDaily)}</span>
        </span>
        <span className="ds-seg ds-seg-proposed">
          <span className="ds-seg-k hx-mono">{labels.proposed}</span>
          <span className="ds-seg-v hx-mono">{money(proposed)}</span>
        </span>
        <span className="ds-seg ds-seg-left">
          <span className="ds-seg-k hx-mono">{over ? labels.over : labels.headroom}</span>
        </span>
        <span className="ds-edge" aria-hidden="true" />
      </div>

      <p className="ds-axis hx-mono" aria-hidden="true">
        <span>$0</span>
        <span>{labels.day} · {money(dayDeposits)}</span>
      </p>

      <div className="ds-control">
        <label className="ds-control-k hx-mono" htmlFor={`${uid}-range`}>
          {labels.control}
        </label>
        <input
          className="ds-range"
          id={`${uid}-range`}
          type="range"
          min="0"
          max={maxProposed}
          step="10"
          value={proposed}
          onChange={(event) => setProposed(Number(event.target.value))}
        />
        <output className="ds-control-v" htmlFor={`${uid}-range`}>
          {money(proposed)}
          <span className="ds-control-u hx-mono"> / day</span>
        </output>
      </div>

      <figcaption className="ds-note">{note}</figcaption>
    </figure>
  );
}
