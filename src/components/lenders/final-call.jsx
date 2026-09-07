"use client";

import { useRef } from "react";
import Image from "next/image";
import { PointerField } from "@/components/home/fx";
import { useHasEntered, useReady } from "@/components/progressive";

const SHOT_W = 1600;
const SHOT_H = 760;

/**
 * 04 — The memo assembles itself. The four buttons do not.
 *
 * Everything on this page has been building one artefact: a memo with the
 * findings, the evidence behind each of them, the policy outcomes and whatever
 * is still open. That part assembles — the summary lines land one after another
 * as the section is reached, because that is genuinely what the product does.
 *
 * And then it stops, at four dispositions that are drawn exactly as the screen
 * draws them and are deliberately dead. They do not respond to a pointer and
 * they are not buttons in the markup, because Cevrynt does not press them.
 * A section that ended with a satisfying green Approve would be the single most
 * dishonest thing this site could show, and the restraint is the argument: the
 * work below the line is done, the line is where the software stops.
 *
 * The readout says it plainly and arithmetically. Four dispositions available,
 * zero issued here. One policy exception is still open on this file, and the
 * memo says so rather than rounding it away.
 *
 * Server-rendered assembled, every line present and the dispositions shown, so
 * the section is complete without JavaScript.
 */
export function FinalCall({ shot, summary, dispositions, readout, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const built = useHasEntered(scope, 0.24);

  return (
    <figure className={`dm${ready ? " is-ready" : ""}${built ? " is-built" : ""}`} ref={scope}>
      <div className="dm-readout">
        <p className="dm-fig">
          <span className="dm-fig-n">{String(dispositions.length).padStart(2, "0")}</span>
          <span className="dm-fig-k hx-mono">{readout.available}</span>
        </p>
        <span className="dm-readout-rule" aria-hidden="true" />
        <p className="dm-fig dm-fig-zero">
          <span className="dm-fig-n">00</span>
          <span className="dm-fig-k hx-mono">{readout.issued}</span>
        </p>
      </div>

      <PointerField className="dm-field" selector=".dm-stage">
        <div className="dm-stage">
          <span className="dm-ambient" aria-hidden="true" />
          <span className="dm-key" aria-hidden="true" />

          <div className="dm-body">
            <div className="dm-plate">
              <Image
                className="dm-shot"
                src={shot.src}
                alt={shot.alt}
                width={SHOT_W}
                height={SHOT_H}
                sizes="(max-width: 1000px) 94vw, 640px"
                loading="lazy"
              />
              <span className="dm-ring" aria-hidden="true" />
            </div>

            <div className="dm-panel">
              <p className="dm-panel-k hx-mono">{readout.summary}</p>

              <ol className="dm-lines">
                {summary.map((line, i) => (
                  <li
                    className={`dm-line${line.open ? " is-open" : ""}`}
                    key={line.k}
                    style={{ "--d": `${i * 120}ms` }}
                  >
                    <span className="dm-line-k">{line.k}</span>
                    <span className="dm-line-v hx-mono">{line.v}</span>
                  </li>
                ))}
              </ol>

              {/* Drawn as the screen draws them, and inert, because they are
                  not ours to press. Not buttons in the markup either. */}
              <p className="dm-choice-k hx-mono">{readout.choice}</p>
              <div className="dm-choices" role="presentation">
                {dispositions.map((word) => (
                  <span className="dm-choice" key={word}>{word}</span>
                ))}
              </div>

              <p className="dm-stop">{readout.stop}</p>
            </div>
          </div>
        </div>
      </PointerField>

      <figcaption className="dm-note">{note}</figcaption>
    </figure>
  );
}
