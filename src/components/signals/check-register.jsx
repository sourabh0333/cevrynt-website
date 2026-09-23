"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 04 — Five checks ran on this file, and all five left a record.
 *
 * The Underwriting Report page counts five fraud-stage findings on this file,
 * one of them open. This is that count, itemised: what each check compared,
 * the shape of the comparison, what it found, and where it went.
 *
 * Four came back clean. Clean is still a result, and it is recorded with the
 * same detail an open finding gets — a check that only leaves a trace when it
 * finds something cannot show anybody that it ran. The open one is the weekly
 * debit from section 02, and it is with a person.
 *
 * Each row carries a small drawing of the comparison it made — two copies held
 * side by side, a column checked step by step, statements joined at their
 * seams, a rhythm of debits, a share of a whole — so the five read as five
 * different kinds of evidence rather than five identical ticks.
 *
 * The counts are computed from the rows. Server-rendered with every check,
 * every record and the product view present.
 */
export function CheckRegister({ checks, shot, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const counts = {
    all: checks.length,
    closed: checks.filter((c) => c.state === "closed").length,
    open: checks.filter((c) => c.state === "open").length,
  };
  const shown = at === null ? null : checks[at];

  return (
    <figure className={`sg4${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="sg4-readout">
        {readout.figures.map((f) => (
          <div className={`sg4-fig${f.tone ? ` sg4-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="sg4-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="sg4-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="sg4-scroll">
        <div className={`sg4-chart${at === null ? "" : " is-picked"}`}>
          <div className="sg4-head">
            <span className="sg4-hk hx-mono">{readout.colK.shape}</span>
            <span className="sg4-hk hx-mono">{readout.colK.check}</span>
            <span className="sg4-hk hx-mono">{readout.colK.found}</span>
            <span className="sg4-hk is-r hx-mono">{readout.colK.state}</span>
          </div>

          <ol className="sg4-rows">
            {checks.map((c, i) => (
              <li className={`sg4-row is-${c.state}${at === i ? " is-on" : ""}`} key={c.k} style={{ "--i": i }}>
                <button
                  className="sg4-row-b"
                  type="button"
                  aria-pressed={at === i}
                  onClick={() => pick(i)}
                  onMouseEnter={() => setAt(i)}
                >
                  {/* A drawing of the comparison, not an icon for its category. */}
                  <span className={`sg4-glyph is-${c.shape}`} aria-hidden="true">
                    {Array.from({ length: 6 }, (_, n) => (
                      <span className="sg4-g" key={`${c.shape}-${n}`} style={{ "--n": n }} />
                    ))}
                  </span>

                  <span className="sg4-check">
                    <span className="sg4-check-k">{c.k}</span>
                    <span className="sg4-check-v hx-mono">{c.compared}</span>
                  </span>

                  <span className="sg4-found">{c.found}</span>

                  <span className="sg4-state">
                    <span className="sg4-state-k hx-mono">{c.state === "open" ? readout.openK : readout.closedK}</span>
                    <span className="sg4-state-v hx-mono">{c.where}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="sg4-routed" aria-live="polite">
        <span className="sg4-routed-k hx-mono">{shown ? shown.k : readout.restK}</span>
        <span className="sg4-routed-b">{shown ? shown.record : readout.restB}</span>
      </p>

      <div className="sg4-body">
        <div className="sg4-said">
          <p className="sg4-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="sg4-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="sg4-aside">
          <figure className="sg4-shot">
            <Image
              className="sg4-shot-img"
              src={shot.src}
              alt={shot.alt}
              width={shot.w}
              height={shot.h}
              sizes="(max-width: 980px) 92vw, 380px"
              loading="lazy"
            />
            <figcaption className="sg4-shot-k hx-mono">{shot.caption}</figcaption>
          </figure>

          <p className="sg4-aside-k hx-mono">{aside.title}</p>
          <ol className="sg4-audit">
            {aside.items.map((item) => (
              <li className="sg4-audit-row" key={item.k}>
                <span className="sg4-audit-k">{item.k}</span>
                <span className="sg4-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="sg4-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="sg4-close">{close}</p>
      <figcaption className="sg4-note">{note}</figcaption>
    </figure>
  );
}
