"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 01 — Five facts, four documents, and nine cells where nobody said anything.
 *
 * Verification is a grid before it is anything else: every fact the file states
 * against every document that could state it. Drawing it as a grid is the
 * honest form, and it is the only form in which the interesting thing is
 * visible — which is how much of it is empty.
 *
 * Eleven of the twenty cells have a document behind them. Nine do not, and the
 * nine are not a failure; most documents simply have no opinion about most
 * facts. A product that filled them in would be inventing, and a page that hid
 * them would be flattering itself.
 *
 * Where two documents state the same fact differently the cell is split on the
 * diagonal and carries both halves. Nothing is merged and neither half is on
 * top, because which one is right is a question about this business rather than
 * about document precedence.
 *
 * Reading any cell writes it out in full underneath, so the grid stays a grid —
 * dense and aligned — without the values being squeezed into it.
 *
 * Server-rendered complete: every cell, both halves of both conflicts, and the
 * first readout line. The entrance only fills the grid in.
 */
export function SourceMatrix({ facts, sources, readout, aside, shot, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const clear = useCallback(() => setAt(null), []);

  const stated = facts.reduce((n, f) => n + f.cells.filter((c) => c.s !== "none").length, 0);
  const cells = facts.length * sources.length;
  const shown =
    at && facts[at.r].cells[at.c].s !== "none"
      ? { fact: facts[at.r].k, src: sources[at.c].k, cell: facts[at.r].cells[at.c] }
      : null;

  return (
    <figure className={`bv1${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bv1-readout">
        {readout.figures.map((f) => (
          <div className={`bv1-fig${f.tone ? ` bv1-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bv1-fig-n">{f.n}</dt>
            <dd className="bv1-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="bv1-body">
        <div className="bv1-grid-wrap">
          <table className="bv1-grid" onMouseLeave={clear}>
            <thead>
              <tr>
                <th className="bv1-corner hx-mono" scope="col">
                  {readout.cornerK}
                </th>
                {sources.map((s) => (
                  <th className="bv1-src hx-mono" key={s.k} scope="col">
                    {s.k}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {facts.map((f, r) => (
                <tr className="bv1-row" key={f.k}>
                  <th className="bv1-fact" scope="row">
                    {f.k}
                  </th>

                  {f.cells.map((c, col) => (
                    <td
                      className={`bv1-cell is-${c.s}${at && at.r === r && at.c === col ? " is-at" : ""}`}
                      key={sources[col].k}
                      style={{ "--r": r, "--c": col }}
                      onMouseEnter={() => setAt({ r, c: col })}
                    >
                      <span className="bv1-mark" aria-hidden="true" />
                      <span className="sr-only">
                        {c.s === "none" ? readout.silentK : c.s === "clash" ? readout.clashK : readout.statedK}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* The grid stays a grid; the value is written out here instead. */}
          <p className="bv1-say" aria-live="polite">
            {shown ? (
              <>
                <span className="bv1-say-k hx-mono">
                  {shown.src} · {shown.fact}
                </span>
                <span className="bv1-say-v">
                  {shown.cell.v.join(shown.cell.s === "clash" ? "   ·   " : "")}
                </span>
              </>
            ) : (
              <span className="bv1-say-idle">{readout.idle}</span>
            )}
          </p>

          <p className="bv1-legend hx-mono">
            {readout.legend.map((l) => (
              <span className={`bv1-leg is-${l.s}`} key={l.k}>
                <span className="bv1-leg-m" aria-hidden="true" />
                {l.k}
              </span>
            ))}
          </p>
        </div>

        <div className="bv1-aside">
          <figure className="bv1-shot">
            <Image
              className="bv1-shot-img"
              src={shot.src}
              alt={shot.alt}
              width={shot.w}
              height={shot.h}
              sizes="(max-width: 980px) 92vw, 330px"
              loading="lazy"
            />
            <figcaption className="bv1-shot-k hx-mono">{shot.caption}</figcaption>
          </figure>

          <p className="bv1-aside-k hx-mono">{aside.title}</p>
          <ol className="bv1-audit">
            {aside.items.map((item) => (
              <li className="bv1-audit-row" key={item.k}>
                <span className="bv1-audit-k">{item.k}</span>
                <span className="bv1-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bv1-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bv1-close">
        {close.replace("{stated}", String(stated)).replace("{silent}", String(cells - stated))}
      </p>
      <figcaption className="bv1-note">{note}</figcaption>
    </figure>
  );
}
