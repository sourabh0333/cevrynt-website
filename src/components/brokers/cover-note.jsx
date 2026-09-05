"use client";

import { useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 05 — The note that goes on top of the pack.
 *
 * The first four sections are all apparatus: an axis, a lit screen, three
 * sorted columns, a scan. The last one should not be a fifth diagram, because
 * the thing at the end of all that work is not a diagram — it is a short piece
 * of writing that a broker puts on top of the file, and the whole argument of
 * this page is what that note is able to say.
 *
 * So the figure here is prose. It is set as a document rather than drawn as a
 * chart: a numbered rail, one column of type in the serif the site keeps for
 * things meant to be read slowly, and the provenance of each line held out in
 * the margin. Nothing on this page is set that way, which is the point — after
 * four figures, the reader arrives at something they simply read.
 *
 * The measurement is the length. The note is seven lines long because the file
 * has seven open questions, and a shorter note would mean fewer answers rather
 * than a better package.
 *
 * The one interaction is the real decision underneath it. Every line can be
 * answered or named, and five of these can be answered outright while two are a
 * judgment no broker settles — so those two are named and handed over rather
 * than argued. Change any line and it rewrites in place; the tally at the foot
 * counts what the note ended up saying.
 *
 * To be plain about what this is: Cevrynt does not write this note and does not
 * send it. It is what a broker can write once the package has been read this
 * way, which is the only claim the page is making.
 *
 * Server-rendered fully set, in the default five-and-two state, so the note
 * reads as a finished document with no JavaScript at all.
 */
export function CoverNote({ masthead, lines, sign, tally, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const set = useHasEntered(scope, 0.2);

  const [answered, setAnswered] = useState(() => lines.map((line) => line.starts));

  const yes = answered.filter(Boolean).length;
  const no = answered.length - yes;

  return (
    <figure className={`cn${ready ? " is-ready" : ""}${set ? " is-set" : ""}`} ref={scope}>
      <header className="cn-masthead">
        <p className="cn-kind hx-mono">{masthead.kind}</p>
        <p className="cn-re">{masthead.re}</p>
        <p className="cn-pack hx-mono">{masthead.pack}</p>
      </header>

      <ol className="cn-lines">
        {/* The rule that runs down the rail as the note sets itself. */}
        <span className="cn-rail" aria-hidden="true" />

        {lines.map((line, i) => {
          const on = answered[i];
          const text = on ? line.answered : line.open;

          return (
            <li
              className={`cn-line${on ? " is-answered" : " is-open"}`}
              key={line.source}
              style={{ "--d": `${i * 90}ms` }}
            >
              <span className="cn-no hx-mono" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="cn-mark" aria-hidden="true" />

              {/* Keyed so the sentence re-sets itself when the state changes. */}
              <p className="cn-text" key={on ? "a" : "o"}>
                {text}
              </p>

              <span className="cn-margin">
                <span className="cn-src hx-mono">{line.source}</span>
                <button
                  type="button"
                  className="cn-toggle hx-mono"
                  aria-pressed={on}
                  onClick={() => setAnswered((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                >
                  {on ? tally.answeredWord : tally.openWord}
                </button>
              </span>
            </li>
          );
        })}
      </ol>

      <p className="cn-sign">{sign}</p>

      <p className="cn-tally" aria-live="polite">
        <span className="cn-tally-n">{String(yes).padStart(2, "0")}</span>
        <span className="cn-tally-k">{tally.answered}</span>
        <span className="cn-tally-d" aria-hidden="true" />
        <span className="cn-tally-n cn-tally-n-quiet">{String(no).padStart(2, "0")}</span>
        <span className="cn-tally-k">{tally.open}</span>
      </p>

      <figcaption className="cn-note">{note}</figcaption>
    </figure>
  );
}
