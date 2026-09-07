"use client";

import { useRef } from "react";
import Image from "next/image";
import { useHasEntered, useReady } from "@/components/progressive";

const SHOT_W = 1600;
const SHOT_H = 760;

/**
 * 02 — What the borrower wrote, and what the record says.
 *
 * Four questions with two answers each. The earlier version set them out as a
 * five-column table and let the two answers slide toward each other, which put
 * a lot of machinery behind a point that is really about reading: are these the
 * same, and if not, where exactly do they differ?
 *
 * So this reads as four entries rather than a table. Each one states the claim
 * and the record on one line with the distance between them drawn, and the
 * three that agree resolve to a single reading. The fourth does not, and the
 * figure does the one thing a verification screen should: it points at the
 * characters. Two-one-four against two-one-zero, with the digits that disagree
 * marked on both sides, so nobody has to hunt for the difference or take our
 * word for how big it is.
 *
 * The differing characters are authored, not computed at render. A diff run in
 * the browser would be a guess dressed as a fact, and the point of the section
 * is that this comparison is exact.
 *
 * Server-rendered resolved, marks and all — the approach is what JavaScript
 * adds, not what it reveals.
 */
export function ClaimGap({ shot, pairs, readout, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const closed = useHasEntered(scope, 0.22);

  const matched = pairs.filter((p) => p.matched).length;

  /** A value is written as segments so the disagreement can be marked in it. */
  const write = (parts) =>
    parts.map((part, i) =>
      part.diff ? (
        <mark className="kv-diff" key={i}>{part.t}</mark>
      ) : (
        <span key={i}>{part.t}</span>
      ),
    );

  return (
    <figure className={`kv${ready ? " is-ready" : ""}${closed ? " is-closed" : ""}`} ref={scope}>
      <dl className="kv-readout">
        <div className="kv-fig">
          <dt className="kv-fig-n">{String(pairs.length).padStart(2, "0")}</dt>
          <dd className="kv-fig-k hx-mono">{readout.checked}</dd>
        </div>
        <div className="kv-fig kv-fig-open">
          <dt className="kv-fig-n">{String(pairs.length - matched).padStart(2, "0")}</dt>
          <dd className="kv-fig-k hx-mono">{readout.open}</dd>
        </div>
      </dl>

      <ol className="kv-pairs">
        {pairs.map((pair, i) => (
          <li
            className={`kv-pair${pair.matched ? " is-met" : " is-apart"}`}
            key={pair.field}
            style={{ "--d": `${i * 120}ms` }}
          >
            <p className="kv-label hx-mono">{pair.field}</p>
            <p className="kv-verdict hx-mono">{pair.verdict}</p>

            <p className="kv-val kv-val-a">{write(pair.claim)}</p>

            {/* The distance between the two answers. */}
            <span className="kv-link" aria-hidden="true">
              <span className="kv-line" />
              <span className="kv-join" />
            </span>

            <p className="kv-val kv-val-b">{write(pair.record)}</p>

            <p className="kv-src kv-src-a hx-mono">{pair.claimFrom}</p>
            <p className="kv-src kv-src-b hx-mono">{pair.recordFrom}</p>
          </li>
        ))}
      </ol>

      <p className="kv-said">{readout.said}</p>

      {/* Ruled above and below, open at the sides. The ring is anchored to the
          artwork itself, not to the ruled block around it. */}
      <div className="kv-plate">
        <span className="kv-frame">
          <Image
            className="kv-shot"
            src={shot.src}
            alt={shot.alt}
            width={SHOT_W}
            height={SHOT_H}
            sizes="(max-width: 900px) 94vw, 1180px"
            loading="lazy"
          />
          <span className="kv-ring" aria-hidden="true" />
        </span>
      </div>

      <figcaption className="kv-note">{note}</figcaption>
    </figure>
  );
}
