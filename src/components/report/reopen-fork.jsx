"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 06 — Closed can be reopened. Sealed cannot be edited.
 *
 * This page makes two promises that look like they contradict each other: a
 * closed finding can be reopened by any reviewer at any time, and a sealed
 * report never changes. A reader who noticed both would be right to ask which
 * one is true, so the section exists to answer that rather than to leave it
 * sitting there.
 *
 * The figure is a fork, which is the one shape this page has not used. One
 * finding at the top, one split, and two branches that depend entirely on
 * whether a decision has been entered yet. The same request produces a
 * different record on each side, and neither side involves editing anything
 * that already exists.
 *
 * Server-rendered with the finding, both branches and every consequence
 * present; the connectors are laid out rather than measured.
 */
export function ReopenFork({ subject, branches, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);

  const counts = {
    paths: branches.length,
    changes: branches.filter((b) => b.writes).length,
    edited: 0,
  };

  return (
    <figure className={`ur6${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="ur6-readout">
        {readout.figures.map((f) => (
          <div className={`ur6-fig${f.tone ? ` ur6-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="ur6-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="ur6-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="ur6-scroll">
        <div className="ur6-fork">
          <div className="ur6-subject">
            <p className="ur6-subject-k hx-mono">{subject.kicker}</p>
            <p className="ur6-subject-v">{subject.k}</p>
            <p className="ur6-subject-b">{subject.b}</p>
          </div>

          {/* One request, and the only thing that decides what it does is
              whether a decision has been entered yet. */}
          <div className="ur6-split" aria-hidden="true">
            <span className="ur6-stem" />
            <span className="ur6-bar" />
            <span className="ur6-drop is-l" />
            <span className="ur6-drop is-r" />
          </div>

          {branches.map((b, i) => (
            <div className={`ur6-branch${b.writes ? "" : " is-fixed"}`} key={b.k} style={{ "--b": i }}>
              <p className="ur6-branch-when hx-mono">{b.when}</p>
              <p className="ur6-branch-k">{b.k}</p>
              <ol className="ur6-steps">
                {b.steps.map((s, n) => (
                  <li className="ur6-step" key={s} style={{ "--n": n }}>
                    <span className="ur6-step-n hx-mono">{String(n + 1).padStart(2, "0")}</span>
                    <span className="ur6-step-v">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="ur6-branch-v hx-mono">{b.verdict}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="ur6-body">
        <div className="ur6-said">
          <p className="ur6-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="ur6-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="ur6-aside">
          <p className="ur6-aside-k hx-mono">{aside.title}</p>
          <ol className="ur6-audit">
            {aside.items.map((item) => (
              <li className="ur6-audit-row" key={item.k}>
                <span className="ur6-audit-k">{item.k}</span>
                <span className="ur6-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="ur6-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="ur6-close">{close}</p>
      <figcaption className="ur6-note">{note}</figcaption>
    </figure>
  );
}
