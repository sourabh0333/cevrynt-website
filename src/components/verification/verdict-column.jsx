"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 02 — Twelve readings on a grid, and a fourth column that stays empty.
 *
 * The conflicts from section 01 all have several readings, and none of them can
 * be separated by processing. Every tool in this category answers that by
 * printing a conclusion. This one sets the readings out on the same rigid grid
 * as the section above — four conflicts down, three readings across — and then
 * adds the column the reader is looking for and leaves every cell in it blank.
 *
 * The empty column is the argument. A sentence saying no verdict is produced is
 * a sentence a reader skims; a labelled column running the full height of the
 * figure with nothing in any of its cells is not skimmable. It is the only
 * place on this site where the most important thing in a figure is the part
 * that was left out.
 *
 * Nothing about the three readings is ranked. They are the same width, the same
 * weight and the same colour, and they appear in the order they were written
 * rather than in any order that implies likelihood.
 *
 * Server-rendered complete, every reading present and the verdict column
 * already empty. The entrance fills the readings in column by column and never
 * touches the fourth.
 */
export function VerdictColumn({ conflicts, columns, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.14);

  const total = conflicts.reduce((n, c) => n + c.readings.length, 0);

  return (
    <figure className={`bv2${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bv2-readout">
        {readout.figures.map((f) => (
          <div className={`bv2-fig${f.tone ? ` bv2-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bv2-fig-n">{f.n}</dt>
            <dd className="bv2-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="bv2-grid">
        <div className="bv2-head">
          <span className="bv2-corner hx-mono">{readout.cornerK}</span>
          {columns.map((c, i) => (
            <span className={`bv2-col hx-mono${i === columns.length - 1 ? " is-void" : ""}`} key={c}>
              {c}
            </span>
          ))}
        </div>

        {conflicts.map((c, r) => (
          <div className="bv2-line" key={c.k} style={{ "--r": r }}>
            <p className="bv2-conflict">
              <span className="bv2-n hx-mono">{String(r + 1).padStart(2, "0")}</span>
              <span className="bv2-k">{c.k}</span>
            </p>

            {c.readings.map((t, i) => (
              <p className="bv2-reading" key={t} style={{ "--i": i }}>
                {t}
              </p>
            ))}

            {/* The cell the reader is looking for. Nothing goes in it. */}
            <p className="bv2-void" aria-label={readout.voidK}>
              <span className="bv2-void-m" aria-hidden="true" />
            </p>
          </div>
        ))}
      </div>

      <p className="bv2-said">
        <span className="bv2-said-k hx-mono">{readout.saidK}</span>
        <span className="bv2-said-b">{readout.saidB}</span>
      </p>

      <div className="bv2-foot">
        <p className="bv2-aside-k hx-mono">{aside.title}</p>
        <ol className="bv2-audit">
          {aside.items.map((item) => (
            <li className="bv2-audit-row" key={item.k}>
              <span className="bv2-audit-k">{item.k}</span>
              <span className="bv2-audit-v hx-mono">{item.v}</span>
            </li>
          ))}
        </ol>
        <p className="bv2-audit-note">{aside.note}</p>
      </div>

      <p className="bv2-close">{close.replace("{total}", String(total))}</p>
      <figcaption className="bv2-note">{note}</figcaption>
    </figure>
  );
}
