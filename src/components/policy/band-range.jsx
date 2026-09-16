"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 03 — A pass, a stop, and the gap in between.
 *
 * The first two sections drew thresholds as single lines, which is how policies
 * are usually described and not how they are usually written. Most criteria a
 * credit team actually runs have two lines: a point below which the file stops,
 * a point above which it clears, and a band in between that no threshold can
 * settle by itself.
 *
 * So this figure stands the scales up. Each criterion is a vertical track
 * segmented into its three regions, with the observation ruled across it at its
 * own height. Two of these four land in the band, and the band is the whole
 * subject — it is the region the engine is explicitly not allowed to resolve.
 *
 * The ceiling criterion inverts: its pass region sits at the bottom of the
 * track, because fewer returned items is the better end of that scale. The
 * region labels are drawn per region rather than assumed by position, so the
 * inversion reads correctly instead of quietly lying.
 *
 * Server-rendered with every region, every observation and every verdict
 * present; selecting a column only writes out what happens to it.
 */
export function BandRange({ criteria, readout, labels, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  /** The region an observation actually falls in, rather than a stored verdict. */
  const zoneAt = (c) =>
    c.zones.find((z) => c.pct >= z.from && c.pct < z.to) || c.zones[c.zones.length - 1];

  const held = criteria.filter((c) => zoneAt(c).t === "band").length;
  const shown = at === null ? null : criteria[at];

  return (
    <figure className={`pe3${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="pe3-readout">
        {readout.figures.map((f) => (
          <div className={`pe3-fig${f.tone ? ` pe3-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="pe3-fig-n">{f.n.replace("{band}", String(held).padStart(2, "0"))}</dt>
            <dd className="pe3-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="pe3-scroll">
        <ol className={`pe3-cols${at === null ? "" : ` is-at-${at}`}`}>
          {criteria.map((c, i) => {
            const z = zoneAt(c);

            return (
              <li className={`pe3-col is-${z.t}`} key={c.k} style={{ "--i": i }}>
                <button
                  className="pe3-col-b"
                  type="button"
                  aria-pressed={at === i}
                  onClick={() => pick(i)}
                  onMouseEnter={() => setAt(i)}
                >
                  <span className="pe3-cap hx-mono">{c.hi}</span>

                  <span className="pe3-track">
                    {c.zones.map((zone) => (
                      <span
                        className={`pe3-zone is-${zone.t}`}
                        key={zone.t}
                        style={{ "--a": `${zone.from}%`, "--b": `${zone.to}%` }}
                      >
                        <span className="pe3-zone-k hx-mono">{labels[zone.t]}</span>
                      </span>
                    ))}

                    {/* The file, ruled across the regions at its own height. */}
                    <span className="pe3-obs" style={{ "--y": `${c.pct}%` }}>
                      <span className="pe3-obs-r" aria-hidden="true" />
                      <span className="pe3-obs-v hx-mono">{c.shown}</span>
                    </span>
                  </span>

                  <span className="pe3-cap hx-mono">{c.lo}</span>

                  <span className="pe3-name">{c.k}</span>
                  <span className="pe3-band hx-mono">{c.bandK}</span>
                  <span className="pe3-verdict hx-mono">{labels[z.t]}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="pe3-routed" aria-live="polite">
        <span className="pe3-routed-k hx-mono">{shown ? shown.k : readout.restK}</span>
        <span className="pe3-routed-b">{shown ? shown.say : readout.restB}</span>
      </p>

      <div className="pe3-body">
        <ol className="pe3-list">
          {criteria.map((c, i) => (
            <li
              className={`pe3-entry${zoneAt(c).t === "band" ? " is-held" : ""}`}
              key={c.k}
              style={{ "--i": i }}
            >
              <span className="pe3-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="pe3-entry-k">{c.k}</span>
              <span className="pe3-b">{c.b}</span>
            </li>
          ))}
        </ol>

        <div className="pe3-aside">
          <p className="pe3-aside-k hx-mono">{aside.title}</p>
          <ol className="pe3-audit">
            {aside.items.map((item) => (
              <li className="pe3-audit-row" key={item.k}>
                <span className="pe3-audit-k">{item.k}</span>
                <span className="pe3-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="pe3-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="pe3-close">{close}</p>
      <figcaption className="pe3-note">{note}</figcaption>
    </figure>
  );
}
