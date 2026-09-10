"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useHasEntered, useReady, useReducedMotion } from "@/components/progressive";

/** How long the top entry resists before settling back. */
const REFUSE_MS = 760;

/**
 * 02 The record, drawn so that its height is its entry count.
 *
 * The claim is that the record only ever grows: a correction is added to it and
 * the finding it corrects stays where it was. Every previous pass argued that
 * in prose, or drew a picture of it. This one measures it. Each stratum below
 * is one entry, every stratum is the same thickness, and the ruler down the
 * side counts them — so the column's height is not a graphic standing for the
 * number of entries, it is the number of entries.
 *
 * Which makes the refusal legible. There is a control that tries to remove the
 * top entry, and the reader can use it as often as they like: the entry lifts,
 * resists, and settles back into the column at exactly the height it left. The
 * tally underneath keeps score — attempts climb, removals stay at nought — and
 * because the column is a measurement rather than an illustration, nothing had
 * to be said about it for the point to land.
 *
 * The entries themselves are this deal's real trail, and the correction is the
 * one the site tells elsewhere: a duplicate-account signal resolved by a person
 * against a registry filing, never auto-declined.
 *
 * Accretion rather than a sweep, and vertical rather than horizontal, so the
 * section does not read as a second run at the page above it.
 *
 * Server-rendered with every stratum in place and the last entry selected,
 * which is what ships without JavaScript.
 */
export function RecordColumn({ entries, refusal }) {
  const scope = useRef(null);
  const uid = useId();

  const ready = useReady();
  const reduced = useReducedMotion();
  const built = useHasEntered(scope, 0.2);

  const [selected, setSelected] = useState(entries.length - 1);
  const [attempts, setAttempts] = useState(0);
  const [refusing, setRefusing] = useState(false);

  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const tryRemove = useCallback(() => {
    setAttempts((n) => Math.min(n + 1, 99));
    setSelected(entries.length - 1);
    if (reduced) return;
    setRefusing(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setRefusing(false), REFUSE_MS);
  }, [entries.length, reduced]);

  const current = entries[selected] ?? entries[entries.length - 1];

  return (
    <figure
      className={`rec${ready ? " is-ready" : ""}${built ? " is-built" : ""}${refusing ? " is-refusing" : ""}`}
      ref={scope}
    >
      <div className="rec-body">
        {/* The measurement. Height is the count; the ruler says so. */}
        <div className="rec-stack">
          <ol className="rec-strata" style={{ "--rec-n": entries.length }}>
            {entries.map((entry, i) => (
              <li
                className={`rec-stratum${i === selected ? " is-live" : ""}${i === entries.length - 1 ? " is-top" : ""}`}
                key={entry.at}
                style={{ "--i": i }}
              >
                <button
                  type="button"
                  className="rec-stratum-btn"
                  id={`${uid}-s${i}`}
                  aria-pressed={i === selected}
                  aria-controls={`${uid}-detail`}
                  onClick={() => setSelected(i)}
                >
                  <span className="rec-stratum-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rec-stratum-what">{entry.what}</span>
                  <span className="rec-stratum-at hx-mono">{entry.at}</span>
                </button>
              </li>
            ))}
          </ol>

          <p className="rec-height hx-mono" aria-hidden="true">
            <span className="rec-height-n">{entries.length}</span>
            <span className="rec-height-k">entries tall</span>
          </p>
        </div>

        {/* What the selected stratum holds. */}
        <div className="rec-detail" id={`${uid}-detail`} aria-live="polite">
          <p className="rec-detail-k hx-mono">
            <span className="rec-detail-who">{current.who}</span>
            <span className="rec-detail-at">{current.at}</span>
          </p>
          <p className="rec-detail-t">{current.what}</p>

          {current.was ? (
            <div className="rec-diff">
              <p className="rec-diff-row">
                <span className="rec-diff-k hx-mono">Was</span>
                <span className="rec-diff-was">{current.was}</span>
              </p>
              <p className="rec-diff-row">
                <span className="rec-diff-k hx-mono">Now</span>
                <span className="rec-diff-now">{current.now}</span>
              </p>
            </div>
          ) : null}

          <p className="rec-detail-b">{current.detail}</p>
        </div>
      </div>

      {/* The tally, and the control that cannot change the left-hand figure. */}
      <div className="rec-tally">
        <p className="rec-tally-item">
          <span className="rec-tally-n">{String(entries.length).padStart(2, "0")}</span>
          <span className="rec-tally-k hx-mono">material events recorded</span>
        </p>
        <p className="rec-tally-item rec-tally-nil">
          <span className="rec-tally-n">00</span>
          <span className="rec-tally-k hx-mono">policy exception raised</span>
        </p>
        <p className="rec-tally-item rec-tally-tries">
          <span className="rec-tally-n">{String(attempts).padStart(2, "0")}</span>
          <span className="rec-tally-k hx-mono">reviewer override recorded</span>
        </p>

        <button type="button" className="rec-try" onClick={tryRemove}>
          {refusal.label}
        </button>
      </div>

      <p className="rec-note">{attempts > 0 ? refusal.after : refusal.before}</p>
    </figure>
  );
}
