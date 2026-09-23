"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 05 — What the application says, held against what the statements show.
 *
 * Business Verification already holds the application's names against the
 * filing. What nothing on the site does is hold the application's numbers —
 * the figures a borrower states about their own business — against the bank
 * statements that were submitted alongside them.
 *
 * Each row is a claim and its evidence joined by a hinge. The hinge starts
 * closed on every row and swings open only as far as the gap: shut where the
 * two agree, slightly apart where the difference is a matter of definition the
 * lender's policy settles, and wide where the statements show something the
 * application does not mention.
 *
 * Nothing new is raised here. Every disagreement is owned by the stage that
 * already holds it — the one open row is the weekly debit from section 02 —
 * so this section adds a view across the file, not a sixth finding.
 *
 * Server-rendered with every claim, every piece of evidence and every owner.
 */
export function ClaimHinge({ claims, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const counts = {
    all: claims.length,
    agree: claims.filter((c) => c.state === "agree").length,
    set: claims.filter((c) => c.state === "reported" || c.state === "noted").length,
    open: claims.filter((c) => c.state === "open").length,
  };
  const shown = at === null ? null : claims[at];

  return (
    <figure className={`sg5${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="sg5-readout">
        {readout.figures.map((f) => (
          <div className={`sg5-fig${f.tone ? ` sg5-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="sg5-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="sg5-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="sg5-scroll">
        <div className={`sg5-chart${at === null ? "" : " is-picked"}`}>
          <div className="sg5-head">
            <span className="sg5-hk hx-mono">{readout.colK.claim}</span>
            <span className="sg5-hk hx-mono">{readout.colK.said}</span>
            <span className="sg5-hk is-c hx-mono" aria-hidden="true" />
            <span className="sg5-hk hx-mono">{readout.colK.shown}</span>
            <span className="sg5-hk is-r hx-mono">{readout.colK.owner}</span>
          </div>

          <ol className="sg5-rows">
            {claims.map((c, i) => (
              <li className={`sg5-row is-${c.state}${at === i ? " is-on" : ""}`} key={c.k} style={{ "--i": i }}>
                <button
                  className="sg5-row-b"
                  type="button"
                  aria-pressed={at === i}
                  onClick={() => pick(i)}
                  onMouseEnter={() => setAt(i)}
                >
                  <span className="sg5-claim">{c.k}</span>

                  <span className="sg5-said">
                    <span className="sg5-src hx-mono">{readout.saidSrcK}</span>
                    <span className="sg5-said-v">{c.said}</span>
                  </span>

                  {/* Closed where the two agree; open only as far as the gap. */}
                  <span className="sg5-hinge" aria-label={readout.stateK[c.state]}>
                    <span className="sg5-leaf is-top" aria-hidden="true" />
                    <span className="sg5-pin" aria-hidden="true" />
                    <span className="sg5-leaf is-bottom" aria-hidden="true" />
                  </span>

                  <span className="sg5-shown">
                    <span className="sg5-src hx-mono">{c.source}</span>
                    <span className="sg5-shown-v">{c.shown}</span>
                  </span>

                  <span className="sg5-owner">
                    <span className="sg5-state hx-mono">{readout.stateK[c.state]}</span>
                    <span className="sg5-where hx-mono">{c.where}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="sg5-routed" aria-live="polite">
        <span className="sg5-routed-k hx-mono">{shown ? shown.k : readout.restK}</span>
        <span className="sg5-routed-b">{shown ? shown.say : readout.restB}</span>
      </p>

      <div className="sg5-body">
        <div className="sg5-said-block">
          <p className="sg5-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="sg5-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="sg5-aside">
          <p className="sg5-aside-k hx-mono">{aside.title}</p>
          <ol className="sg5-audit">
            {aside.items.map((item) => (
              <li className="sg5-audit-row" key={item.k}>
                <span className="sg5-audit-k">{item.k}</span>
                <span className="sg5-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="sg5-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="sg5-close">{close}</p>
      <figcaption className="sg5-note">{note}</figcaption>
    </figure>
  );
}
