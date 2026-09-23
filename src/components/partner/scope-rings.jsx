"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 02 — Three rings of scope, and the lender's decision at the centre.
 *
 * A partnership page is where a reader decides how much the partnership
 * covers, and the honest answer has a shape: it sits around the work rather
 * than inside the decision. So the figure is concentric. The lender's decision
 * is the centre. Cevrynt's underwriting review is the ring around it — close
 * enough to support the decision, never inside it. The documented partnership
 * is the outer ring, around both.
 *
 * Outside every ring are the seven things this partnership is not: a generally
 * available live integration, an investment, exclusivity, an endorsement,
 * automatic data sharing, universal merchant eligibility and guaranteed
 * funding. They are listed at the same weight as what is inside, because a
 * reader who only saw the inside would fill the outside in for themselves.
 *
 * The rings are drawn at true proportion in one square SVG and the key is plain
 * HTML beside it, so the figure scales without anything having to be measured.
 * Choosing a ring in the key brings that ring forward.
 *
 * Server-rendered with every ring, every entry and every exclusion present.
 */
export function ScopeRings({ rings, outside, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const counts = {
    rings: rings.length,
    outside: outside.length,
    decisions: rings.filter((r) => r.decides && r.partnership).length,
  };
  const shown = at === null ? null : rings[at];

  return (
    <figure className={`sp2${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="sp2-readout">
        {readout.figures.map((f) => (
          <div className={`sp2-fig${f.tone ? ` sp2-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="sp2-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="sp2-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className={`sp2-layout${at === null ? "" : ` is-at-${at}`}`}>
        <div className="sp2-figure">
          <svg className="sp2-svg" viewBox="0 0 200 200" role="img" aria-label={readout.svgK}>
            {rings.map((r, i) => (
              <g className={`sp2-ring is-r${i}${r.decides ? " is-core" : ""}`} key={r.k} style={{ "--i": i }}>
                <circle className="sp2-circle" cx="100" cy="100" r={r.r} />
                <text className="sp2-num" x="100" y={100 - r.r + 13} textAnchor="middle">
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="sp2-key">
          <ol className="sp2-rows">
            {rings.map((r, i) => (
              <li className={`sp2-row is-r${i}${at === i ? " is-on" : ""}`} key={r.k} style={{ "--i": i }}>
                <button
                  className="sp2-row-b"
                  type="button"
                  aria-pressed={at === i}
                  onClick={() => pick(i)}
                  onMouseEnter={() => setAt(i)}
                >
                  <span className="sp2-row-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sp2-row-k">{r.k}</span>
                  <span className="sp2-row-v hx-mono">{r.whose}</span>
                  <span className="sp2-row-items">
                    {r.items.map((item) => (
                      <span className="sp2-item" key={item}>
                        {item}
                      </span>
                    ))}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="sp2-outside">
            <p className="sp2-outside-k hx-mono">{readout.outsideK}</p>
            <ol className="sp2-outside-list">
              {outside.map((o, i) => (
                <li className="sp2-out" key={o} style={{ "--i": i }}>
                  <span className="sp2-out-x hx-mono" aria-hidden="true">
                    ✕
                  </span>
                  <span className="sp2-out-k">{o}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <p className="sp2-routed" aria-live="polite">
        <span className="sp2-routed-k hx-mono">{shown ? shown.k : readout.restK}</span>
        <span className="sp2-routed-b">{shown ? shown.say : readout.restB}</span>
      </p>

      <div className="sp2-body">
        <div className="sp2-said">
          <p className="sp2-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="sp2-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="sp2-aside">
          <p className="sp2-aside-k hx-mono">{aside.title}</p>
          <ol className="sp2-audit">
            {aside.items.map((item) => (
              <li className="sp2-audit-row" key={item.k}>
                <span className="sp2-audit-k">{item.k}</span>
                <span className="sp2-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="sp2-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="sp2-close">{close}</p>
      <figcaption className="sp2-note">{note}</figcaption>
    </figure>
  );
}
