"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 05 — Four situations where the documents run out, and none of them is a
 * failure.
 *
 * Verification tools are sold on what they find. This page closes on what they
 * do not, because the most expensive mistake this stage can make is to report a
 * gap in its own coverage as a finding about the borrower — and that is the
 * mistake that looks most like diligence.
 *
 * The axis is the chain itself, ruled by stage rather than by percentage: does
 * the entity exist, what type is it, is it standing, who are the officers, who
 * owns it. Each situation runs along that axis and stops where its documents
 * stop. No coverage figure is printed anywhere, because a coverage number would
 * read as an accuracy claim about the product and there is no documented figure
 * behind one.
 *
 * The sole proprietor has no span at all, and that is the correct output rather
 * than an empty result: there is no entity record because there is no entity.
 * The out-of-state case carries two spans on one row, because two records is
 * what is actually there and promoting one of them to being the real one would
 * be a decision this stage does not get to make.
 *
 * Server-rendered at full length, every span at its stop. The entrance only
 * runs them out along the axis.
 */
export function CoverageSpan({ cases, stages, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.18);

  return (
    <figure className={`bv5${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bv5-readout">
        {readout.figures.map((f) => (
          <div className={`bv5-fig${f.tone ? ` bv5-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bv5-fig-n">{f.n}</dt>
            <dd className="bv5-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="bv5-plot" style={{ "--n": stages.length }}>
        <p className="bv5-plot-k hx-mono">{readout.plotK}</p>

        <div className="bv5-scroll">
          <div className="bv5-chart">
            {/* The axis is the chain, ruled by stage rather than by percentage. */}
            <div className="bv5-stages">
              <span className="bv5-corner hx-mono">{readout.cornerK}</span>
              <span className="bv5-scale">
                {stages.map((s, i) => (
                  <span className="bv5-stage" key={s} style={{ "--s": i }}>
                    <span className="bv5-stage-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="bv5-stage-k">{s}</span>
                  </span>
                ))}
              </span>
              <span className="bv5-corner-r hx-mono">{readout.stopK}</span>
            </div>

            <ol className="bv5-rows">
              {cases.map((c, r) => (
                <li className={`bv5-case${c.spans.length ? "" : " is-void"}`} key={c.k} style={{ "--r": r }}>
                  <span className="bv5-case-k">{c.k}</span>

                  <span className="bv5-track">
                    {stages.map((s, i) => (
                      <span className="bv5-rule" key={s} style={{ "--s": i }} aria-hidden="true" />
                    ))}

                    {c.spans.map((sp) => (
                      <span
                        className="bv5-span"
                        key={`${sp.from}-${sp.to}`}
                        style={{ "--from": sp.from, "--to": sp.to }}
                      >
                        <span className="bv5-stop-m" aria-hidden="true" />
                      </span>
                    ))}
                  </span>

                  <span className="bv5-stop hx-mono">{c.stop}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="bv5-plot-b">{readout.plotB}</p>
      </div>

      <div className="bv5-body">
        <ol className="bv5-list">
          {cases.map((c, i) => (
            <li className="bv5-entry" key={c.k} style={{ "--i": i }}>
              <span className="bv5-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="bv5-name">{c.k}</span>
              <span className="bv5-b">{c.b}</span>
            </li>
          ))}
        </ol>

        <div className="bv5-aside">
          <p className="bv5-aside-k hx-mono">{aside.title}</p>
          <ol className="bv5-audit">
            {aside.items.map((item) => (
              <li className="bv5-audit-row" key={item.k}>
                <span className="bv5-audit-k">{item.k}</span>
                <span className="bv5-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bv5-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bv5-close">{close}</p>
      <figcaption className="bv5-note">{note}</figcaption>
    </figure>
  );
}
