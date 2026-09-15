"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 02 — Who issues the decision, drawn to scale.
 *
 * Four dashed boxes and the word "None" stated the position without measuring
 * anything. This does measure it: one bar across the full width of the column,
 * and the lender's share is all of it. Every disposition sits inside that bar.
 * Cevrynt's share is a tick at the far end with nothing on either side of it —
 * a real zero, drawn at the same scale as the hundred beside it, which is a
 * harder thing to skim past than a sentence saying so.
 *
 * The fill runs left to right and does not stop short anywhere: it reaches the
 * right edge, passes the point where a vendor's slice would have been, and
 * ends. The four dispositions light as it passes them, so they are read in the
 * order the bar crosses them rather than all at once.
 *
 * Beneath, the four restrictions on a flush four-track grid, and the name at
 * the foot at full width. The signature is last because the drawing carries the
 * measurement and the name carries the accountability, and neither of them
 * should be doing the other one's job.
 *
 * Server-rendered with the bar full and every disposition lit.
 */
export function AuthorityBar({ dispositions, commitments, signature, insight, note, readout }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.2);

  return (
    <figure className={`aut${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <dl className="aut-readout">
        {readout.figures.map((f) => (
          <div className={`aut-fig${f.tone ? ` aut-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="aut-fig-n">{f.n}</dt>
            <dd className="aut-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="aut-scale">
        <div className="aut-heads">
          <span className="aut-head hx-mono">{readout.lenderK}</span>
          <span className="aut-head aut-head-us hx-mono">{readout.usK}</span>
        </div>

        {/* All of it on one side. The other side is a tick with nothing in it. */}
        <div className="aut-bar">
          <span className="aut-fill" aria-hidden="true" />
          <ol className="aut-slots">
            {dispositions.map((d, i) => (
              <li className="aut-slot" key={d} style={{ "--i": i }}>
                <span className="aut-slot-k">{d}</span>
              </li>
            ))}
          </ol>
          <span className="aut-zero" aria-hidden="true" />
        </div>

        <p className="aut-scale-k hx-mono">{readout.scale}</p>
      </div>

      <ol className="aut-grid">
        {commitments.map((c, i) => (
          <li className="aut-item" key={c.k} style={{ "--i": i }}>
            <span className="aut-item-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="aut-item-k">{c.k}</span>
            <span className="aut-item-b">{c.b}</span>
          </li>
        ))}
      </ol>

      <div className="aut-sign">
        <p className="aut-sign-k hx-mono">{readout.signed}</p>
        <p className="aut-name">{signature.name}</p>
        <p className="aut-role">
          <span className="hx-mono">{signature.role}</span>
          <a className="aut-mail" href={`mailto:${signature.email}`}>{signature.email}</a>
        </p>
      </div>

      <p className="aut-insight">
        <span className="aut-insight-k hx-mono">{insight.k}</span>
        <span className="aut-insight-v">{insight.v}</span>
      </p>

      <figcaption className="aut-note">{note}</figcaption>
    </figure>
  );
}
