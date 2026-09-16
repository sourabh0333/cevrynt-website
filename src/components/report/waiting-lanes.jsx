"use client";

import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 05 — The seven, and what each of them is actually waiting on.
 *
 * Three sections of this page cite "the seven open findings" and none of them
 * show the seven, which is the sort of thing a reader notices and a writer
 * does not. So here they are.
 *
 * The ordering is the argument. Sorting them by severity would be a score
 * wearing a different hat, so they are sorted by what unblocks them instead —
 * which is the question an underwriter opening the file at nine in the morning
 * is actually asking. Four of the seven turn out to be waiting on paper rather
 * than on anybody's thinking, and that is worth knowing before the day starts.
 *
 * Lane heights are not decoration: the lanes are uneven because the work is.
 *
 * Server-rendered with every finding, every lane and every count present.
 */
export function WaitingLanes({ lanes, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const pick = useCallback((k) => setAt((cur) => (cur === k ? null : k)), []);

  const all = lanes.flatMap((l) => l.items.map((i) => ({ ...i, kind: l.kind, lane: l.k })));
  const counts = {
    all: all.length,
    paper: all.filter((i) => i.kind === "paper").length,
    person: all.filter((i) => i.kind === "person").length,
  };
  const shown = at === null ? null : all.find((i) => i.k === at);

  return (
    <figure className={`ur5${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="ur5-readout">
        {readout.figures.map((f) => (
          <div className={`ur5-fig${f.tone ? ` ur5-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="ur5-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="ur5-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="ur5-scroll">
        <ol className={`ur5-lanes${at === null ? "" : " is-picked"}`}>
          {lanes.map((l, c) => (
            <li className={`ur5-lane is-${l.kind}`} key={l.k} style={{ "--c": c }}>
              <p className="ur5-lane-h">
                <span className="ur5-lane-k">{l.k}</span>
                <span className="ur5-lane-n hx-mono">
                  {l.items.length} {l.items.length === 1 ? readout.oneK : readout.manyK}
                </span>
              </p>

              <ol className="ur5-items">
                {l.items.map((item, i) => (
                  <li
                    className={`ur5-item${at === item.k ? " is-on" : ""}`}
                    key={item.k}
                    style={{ "--i": i }}
                  >
                    <button
                      className="ur5-item-b"
                      type="button"
                      aria-pressed={at === item.k}
                      onClick={() => pick(item.k)}
                      onMouseEnter={() => setAt(item.k)}
                    >
                      <span className="ur5-stage hx-mono">{item.stage}</span>
                      <span className="ur5-k">{item.k}</span>
                      <span className="ur5-with hx-mono">{item.with}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>

      <p className="ur5-routed" aria-live="polite">
        <span className="ur5-routed-k hx-mono">{shown ? shown.lane : readout.restK}</span>
        <span className="ur5-routed-b">{shown ? shown.say : readout.restB}</span>
      </p>

      <div className="ur5-body">
        <div className="ur5-said">
          <p className="ur5-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="ur5-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="ur5-aside">
          <p className="ur5-aside-k hx-mono">{aside.title}</p>
          <ol className="ur5-audit">
            {aside.items.map((item) => (
              <li className="ur5-audit-row" key={item.k}>
                <span className="ur5-audit-k">{item.k}</span>
                <span className="ur5-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="ur5-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="ur5-close">{close}</p>
      <figcaption className="ur5-note">{note}</figcaption>
    </figure>
  );
}
