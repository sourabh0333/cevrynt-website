"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 02 — Every line in the report has a floor under it.
 *
 * Source-linking on its own is table stakes and gets claimed by everybody, so
 * the figure has to show the shape of the descent rather than assert that one
 * exists. Each item is a staircase: the line as it appears in the report, the
 * finding that produced it, the reading behind the finding, and the page and
 * line the reading was taken from — each step indented one level further down
 * and tied to the one above it.
 *
 * The last item stops a step early on purpose. Its floor is a reviewer's own
 * note, and there is no document underneath a person saying something. Drawing
 * that trail as though it reached a page would be the exact failure this
 * section is claiming not to have, so it ends short and says why.
 *
 * Server-rendered with every layer, every tie and every floor present.
 */
export function TrailDepth({ items, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  const counts = {
    all: items.length,
    doc: items.filter((i) => i.floor === "doc").length,
    person: items.filter((i) => i.floor === "person").length,
  };
  const shown = at === null ? null : items[at];

  return (
    <figure className={`ur2${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="ur2-readout">
        {readout.figures.map((f) => (
          <div className={`ur2-fig${f.tone ? ` ur2-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="ur2-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="ur2-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="ur2-scroll">
        <ol className={`ur2-items${at === null ? "" : ` is-at-${at}`}`}>
          {items.map((item, r) => (
            <li className={`ur2-item is-f-${item.floor}`} key={item.k} style={{ "--r": r }}>
              <button
                className="ur2-item-b"
                type="button"
                aria-pressed={at === r}
                onClick={() => pick(r)}
                onMouseEnter={() => setAt(r)}
              >
                {item.layers.map((l, d) => (
                  <span className={`ur2-layer${d ? " is-down" : ""}`} key={l.k} style={{ "--d": d }}>
                    <span className="ur2-d hx-mono">{`L${String(d + 1).padStart(2, "0")}`}</span>
                    <span className="ur2-kind hx-mono">{l.k}</span>
                    <span className="ur2-v">{l.v}</span>
                  </span>
                ))}

                <span className="ur2-floor hx-mono" style={{ "--d": item.layers.length }}>
                  {item.floorK}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <p className="ur2-routed" aria-live="polite">
        <span className="ur2-routed-k hx-mono">{shown ? shown.k : readout.restK}</span>
        <span className="ur2-routed-b">{shown ? shown.say : readout.restB}</span>
      </p>

      <div className="ur2-body">
        <div className="ur2-said">
          <p className="ur2-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="ur2-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="ur2-aside">
          <p className="ur2-aside-k hx-mono">{aside.title}</p>
          <ol className="ur2-audit">
            {aside.items.map((a) => (
              <li className="ur2-audit-row" key={a.k}>
                <span className="ur2-audit-k">{a.k}</span>
                <span className="ur2-audit-v hx-mono">{a.v}</span>
              </li>
            ))}
          </ol>
          <p className="ur2-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="ur2-close">{close}</p>
      <figcaption className="ur2-note">{note}</figcaption>
    </figure>
  );
}
