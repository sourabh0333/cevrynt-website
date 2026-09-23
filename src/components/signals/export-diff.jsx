"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 01 — The same month, exported twice.
 *
 * Two files for one month is the most ordinary irregularity in a borrower
 * submission and one of the least safe to wave through, because two exports of
 * a statement are only interchangeable if they are actually the same. The easy
 * move is to keep whichever arrived first. The honest one is to compare them.
 *
 * So the two July exports sit side by side, one row per statement line, with a
 * gutter between them that is computed rather than drawn: every field of every
 * line is held against its counterpart, and the gutter shows the result. The
 * file properties sit above, where the only two differences live — the name
 * and the export time, neither of which is content.
 *
 * The comparison is done here from both exports as passed in. Nothing about
 * the verdict in the gutter is typed; if a single amount differed, that row
 * would say so.
 *
 * Server-rendered with both exports, every line and every comparison present.
 */
export function ExportDiff({ exportsList, meta, linesA, linesB, totals, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const fields = ["d", "desc", "amt", "bal"];
  const same = (i) => fields.every((f) => linesA[i][f] === linesB[i][f]);
  const diffLines = linesA.filter((_, i) => !same(i)).length;
  const metaDiff = meta.filter((m) => m.a !== m.b).length;

  const money = (c) => {
    const v = Math.abs(c) / 100;
    return v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  const signed = (c) => (c === null ? "" : `${c < 0 ? "−" : "+"}${money(c)}`);

  const counts = { exports: exportsList.length, lines: totals.lines, differ: diffLines };
  const shown = at === null ? null : { a: linesA[at], b: linesB[at] };

  return (
    <figure className={`sg1${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="sg1-readout">
        {readout.figures.map((f) => (
          <div className={`sg1-fig${f.tone ? ` sg1-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="sg1-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="sg1-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="sg1-scroll">
        <div className={`sg1-chart${at === null ? "" : " is-picked"}`}>
          <div className="sg1-heads">
            {exportsList.map((e, i) => (
              <p className={`sg1-head is-${i ? "b" : "a"}`} key={e.file}>
                <span className="sg1-head-k hx-mono">{e.k}</span>
                <span className="sg1-head-v">{e.file}</span>
              </p>
            ))}
          </div>

          {/* File properties: where the only differences are. */}
          <ol className="sg1-meta">
            {meta.map((m) => {
              const eq = m.a === m.b;
              return (
                <li className={`sg1-mrow${eq ? "" : " is-diff"}`} key={m.k}>
                  <span className="sg1-mk hx-mono">{m.k}</span>
                  <span className="sg1-mv is-a hx-mono">{m.a}</span>
                  <span className="sg1-gut hx-mono" aria-label={eq ? readout.sameK : readout.diffK}>
                    {eq ? "=" : "≠"}
                  </span>
                  <span className="sg1-mv is-b hx-mono">{m.b}</span>
                </li>
              );
            })}
          </ol>

          <p className="sg1-page hx-mono">{totals.pageK}</p>

          <ol className="sg1-lines">
            {linesA.map((a, i) => {
              const b = linesB[i];
              const eq = same(i);
              return (
                <li className={`sg1-row${eq ? "" : " is-diff"}${at === i ? " is-on" : ""}`} key={`${a.n}-${a.desc}`} style={{ "--i": i }}>
                  <button
                    className="sg1-row-b"
                    type="button"
                    aria-pressed={at === i}
                    onClick={() => pick(i)}
                    onMouseEnter={() => setAt(i)}
                  >
                    <span className="sg1-n hx-mono">{a.n}</span>
                    <span className="sg1-d hx-mono">{a.d}</span>
                    <span className="sg1-desc hx-mono">{a.desc}</span>
                    <span className={`sg1-amt hx-mono${a.amt !== null && a.amt < 0 ? " is-debit" : ""}`}>{signed(a.amt)}</span>
                    <span className="sg1-bal hx-mono">{money(a.bal)}</span>

                    <span className="sg1-gut hx-mono" aria-label={eq ? readout.sameK : readout.diffK}>
                      {eq ? "=" : "≠"}
                    </span>

                    <span className="sg1-n hx-mono" aria-hidden="true">{b.n}</span>
                    <span className="sg1-d hx-mono" aria-hidden="true">{b.d}</span>
                    <span className="sg1-desc hx-mono" aria-hidden="true">{b.desc}</span>
                    <span className={`sg1-amt hx-mono${b.amt !== null && b.amt < 0 ? " is-debit" : ""}`} aria-hidden="true">
                      {signed(b.amt)}
                    </span>
                    <span className="sg1-bal hx-mono" aria-hidden="true">{money(b.bal)}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <p className="sg1-rest hx-mono">
            {totals.restK} · {metaDiff} {readout.metaDiffK}
          </p>
        </div>
      </div>

      <div className="sg1-routed" aria-live="polite">
        <p className="sg1-routed-k hx-mono">{shown ? `${readout.lineK} ${shown.a.n}` : readout.restK}</p>
        {shown ? (
          <dl className="sg1-cmp">
            {fields.map((f) => {
              const eq = shown.a[f] === shown.b[f];
              const val = (l) => (f === "amt" ? signed(l.amt) || "—" : f === "bal" ? money(l.bal) : l[f]);
              return (
                <div className={`sg1-cmp-row${eq ? "" : " is-diff"}`} key={f}>
                  <dt className="hx-mono">{readout.fieldK[f]}</dt>
                  <dd className="hx-mono">
                    {val(shown.a)} <span className="sg1-cmp-eq">{eq ? "=" : "≠"}</span> {val(shown.b)}
                  </dd>
                </div>
              );
            })}
          </dl>
        ) : (
          <p className="sg1-routed-b">{readout.restB}</p>
        )}
      </div>

      <div className="sg1-body">
        <div className="sg1-said">
          <p className="sg1-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="sg1-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="sg1-aside">
          <p className="sg1-aside-k hx-mono">{aside.title}</p>
          <ol className="sg1-audit">
            {aside.items.map((item) => (
              <li className="sg1-audit-row" key={item.k}>
                <span className="sg1-audit-k">{item.k}</span>
                <span className="sg1-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="sg1-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="sg1-close">{close}</p>
      <figcaption className="sg1-note">{note}</figcaption>
    </figure>
  );
}
