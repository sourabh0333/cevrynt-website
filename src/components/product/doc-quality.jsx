"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 03 — Typed correctly, and still not six months.
 *
 * The section that section one makes necessary. Six files were all correctly
 * recognised as bank statements, and the submission still does not cover six
 * months: July arrived twice and August never arrived at all. Getting the type
 * right is not the same as getting the period right, and the second problem is
 * invisible until somebody lines the months up.
 *
 * So the figure is the period itself. Six cells fill left to right as the
 * section is reached, and the run visibly steps over August — the gap is not
 * drawn in a different colour after the fact, it simply never fills while the
 * sequence carries on past it. Only once the run has finished does the gap
 * name itself. The duplicate carries a second sheet that slides out from under
 * the first, because two exports of the same month are not always the same
 * export.
 *
 * Nothing on this page interpolates the missing month, and the section says so
 * in the one place a reader would look for the number.
 *
 * Server-rendered complete: the strip is filled, the gap is named and every
 * condition is legible with no JavaScript. The entrance only stages the run.
 */
export function DocQuality({ strip, conditions, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.18);

  return (
    <figure className={`dqy${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="dqy-readout">
        {readout.figures.map((f) => (
          <div className={`dqy-fig${f.tone ? ` dqy-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="dqy-fig-n">{f.n}</dt>
            <dd className="dqy-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="dqy-strip">
        <p className="dqy-strip-k hx-mono">{strip.k}</p>

        <ol className="dqy-cells">
          {strip.cells.map((c, i) => (
            <li className={`dqy-cell${c.state ? ` is-${c.state}` : ""}`} key={c.k} style={{ "--i": i }}>
              <span className="dqy-cell-box" aria-hidden="true">
                <span className="dqy-cell-fill" />
              </span>
              <span className="dqy-cell-k hx-mono">{c.k}</span>
              {c.note ? <span className="dqy-cell-note hx-mono">{c.note}</span> : null}
            </li>
          ))}
        </ol>

        <p className="dqy-strip-b">{strip.b}</p>
      </div>

      <div className="dqy-body">
        <ol className="dqy-list">
          {conditions.map((c, i) => (
            <li className={`dqy-entry${c.held ? " is-held" : ""}`} key={c.k} style={{ "--i": i }}>
              <span className="dqy-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="dqy-name">{c.k}</span>
              <span className="dqy-state hx-mono">{c.state}</span>
              <span className="dqy-b">{c.b}</span>
            </li>
          ))}
        </ol>

        <div className="dqy-aside">
          <p className="dqy-aside-k hx-mono">{aside.title}</p>
          <ol className="dqy-audit">
            {aside.items.map((item) => (
              <li className="dqy-audit-row" key={item.k}>
                <span className="dqy-audit-k">{item.k}</span>
                <span className="dqy-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="dqy-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="dqy-close">{close}</p>
      <figcaption className="dqy-note">{note}</figcaption>
    </figure>
  );
}
