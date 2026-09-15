"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 01 — One file, three policies, three different answers.
 *
 * The whole argument for a policy engine is that there is no such thing as the
 * right threshold, so the figure has to show thresholds as the variable and the
 * file as the constant. Each criterion is a measured scale with one observation
 * on it — a single mark, because there is only one file — and three lender
 * lines drawn across it at different places.
 *
 * Read down a column and you are reading a lender. Read across a row and you
 * are reading the file. The same deposits figure clears one lender's line,
 * clears another's, and stops at the third, and nothing about the borrower
 * changed between those three sentences.
 *
 * The run on the Alternative Lenders page evaluates one policy in detail; this
 * one does the opposite and holds the file still while the policy moves. The
 * two are not the same figure and the pages do not repeat each other.
 *
 * Choosing a policy marks its lines and writes its tally out, so the reader can
 * take one lender at a time without the chart losing the other two.
 *
 * Server-rendered with every observation, every line and every tally present.
 */
export function PolicySpread({ criteria, policies, readout, aside, shot, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  /** A line is cleared when the observation is on the permitted side of it. */
  const clears = (c, t) => (c.dir === "max" ? c.value <= t : c.value >= t);
  const tally = policies.map((p, i) => criteria.filter((c) => clears(c, c.lines[i])).length);

  return (
    <figure className={`pe1${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="pe1-readout">
        {readout.figures.map((f) => (
          <div className={`pe1-fig${f.tone ? ` pe1-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="pe1-fig-n">{f.n}</dt>
            <dd className="pe1-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <ol className="pe1-keys">
        {policies.map((p, i) => (
          <li className="pe1-key" key={p.k}>
            <button
              className={`pe1-key-b${at === i ? " is-on" : ""}`}
              type="button"
              aria-pressed={at === i}
              onClick={() => pick(i)}
              onMouseEnter={() => setAt(i)}
            >
              <span className={`pe1-key-m is-p${i}`} aria-hidden="true" />
              <span className="pe1-key-k">{p.k}</span>
              <span className="pe1-key-v hx-mono">
                {tally[i]} {readout.ofK} {criteria.length}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="pe1-scroll">
        <div className={`pe1-chart${at === null ? "" : ` is-at-${at}`}`}>
          {criteria.map((c, r) => (
            <div className="pe1-row" key={c.k} style={{ "--r": r }}>
              <p className="pe1-crit">
                <span className="pe1-crit-k">{c.k}</span>
                <span className="pe1-crit-s hx-mono">{c.scale}</span>
              </p>

              <div className="pe1-scale">
                <span className="pe1-axis" aria-hidden="true" />

                {/* One observation, because there is only one file. */}
                <span className="pe1-obs" style={{ "--x": `${c.pct}%` }}>
                  <span className="pe1-obs-m" aria-hidden="true" />
                  <span className="pe1-obs-v hx-mono">{c.shown}</span>
                </span>

                {c.lines.map((t, i) => (
                  <span
                    className={`pe1-line is-p${i}${clears(c, t) ? " is-clear" : " is-stop"}`}
                    key={policies[i].k}
                    style={{ "--x": `${c.linePct[i]}%`, "--i": i }}
                  >
                    <span className="pe1-line-m" aria-hidden="true" />
                    <span className="pe1-line-v hx-mono">{c.lineShown[i]}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="pe1-legend hx-mono">{readout.legend}</p>

      <div className="pe1-body">
        <ol className="pe1-list">
          {criteria.map((c, i) => (
            <li className="pe1-entry" key={c.k} style={{ "--i": i }}>
              <span className="pe1-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="pe1-name">{c.k}</span>
              <span className="pe1-b">{c.b}</span>
            </li>
          ))}
        </ol>

        <div className="pe1-aside">
          <figure className="pe1-shot">
            <Image
              className="pe1-shot-img"
              src={shot.src}
              alt={shot.alt}
              width={shot.w}
              height={shot.h}
              sizes="(max-width: 980px) 92vw, 330px"
              loading="lazy"
            />
            <figcaption className="pe1-shot-k hx-mono">{shot.caption}</figcaption>
          </figure>

          <p className="pe1-aside-k hx-mono">{aside.title}</p>
          <ol className="pe1-audit">
            {aside.items.map((item) => (
              <li className="pe1-audit-row" key={item.k}>
                <span className="pe1-audit-k">{item.k}</span>
                <span className="pe1-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="pe1-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="pe1-close">{close}</p>
      <figcaption className="pe1-note">{note}</figcaption>
    </figure>
  );
}
