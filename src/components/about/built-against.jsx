"use client";

import { useRef } from "react";
import Image from "next/image";
import { useHasEntered, useReady } from "@/components/progressive";

const SHOT_W = 1600;
const SHOT_H = 650;

/**
 * 04 — The division of labour, with a spine down the middle.
 *
 * An earlier version of this section listed the four things Cevrynt will not
 * build. That is the same argument section 06 makes with a far better figure,
 * and running it twice meant a reader met the same four refusals twice over.
 * So this draws the line rather than the refusal: what the platform does with
 * a file on the left, what it hands to a person on the right, and a spine both
 * columns are measured against.
 *
 * The two marks carry the meaning. A filled square is the platform; an open
 * one is a person. They are the same size and weight on both sides on purpose,
 * and the open mark is deliberately not struck through — nothing on the right
 * is absent or withheld, it is simply somebody else's job, and drawing it
 * fainter or crossed out would have said otherwise.
 *
 * One record sits at the head of the left column, because "it does these seven
 * things" is a claim and a worked audit trail is what makes it checkable.
 * Every item on the right carries the reason it needs a person.
 *
 * Server-rendered complete; the entrance only staggers the two columns in.
 */
export function BuiltAgainst({ built, withheld, shot, insight, note, readout }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.18);

  return (
    <figure className={`spn${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <dl className="spn-readout">
        {readout.figures.map((f) => (
          <div className={`spn-fig${f.tone ? ` spn-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="spn-fig-n">{f.n}</dt>
            <dd className="spn-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="spn-body">
        <div className="spn-side">
          <p className="spn-side-k hx-mono">{readout.builtK}</p>

          {/* A worked file, so the list above it is checkable rather than asserted. */}
          <div className="spn-plate">
            <Image
              className="spn-shot"
              src={shot.src}
              alt={shot.alt}
              width={SHOT_W}
              height={SHOT_H}
              sizes="(max-width: 900px) min(92vw, 480px), min(46vw, 640px)"
              loading="lazy"
            />
            <span className="spn-ring" aria-hidden="true" />
          </div>
          <p className="spn-plate-k hx-mono">{readout.plate}</p>

          <ol className="spn-items">
            {built.map((b, i) => (
              <li className="spn-item" key={b} style={{ "--d": `${i * 70}ms` }}>
                <span className="spn-mark" aria-hidden="true" />
                <span className="spn-item-k">{b}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="spn-side spn-side-out">
          <p className="spn-side-k hx-mono">{readout.withheldK}</p>

          <ol className="spn-items">
            {withheld.map((w, i) => (
              <li className="spn-item" key={w.k} style={{ "--d": `${i * 70}ms` }}>
                <span className="spn-mark spn-mark-out" aria-hidden="true" />
                <span className="spn-item-k">{w.k}</span>
                <span className="spn-item-b">{w.b}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="spn-insight">
        <span className="spn-insight-k hx-mono">{insight.k}</span>
        <span className="spn-insight-v">{insight.v}</span>
      </p>

      <figcaption className="spn-note">{note}</figcaption>
    </figure>
  );
}
