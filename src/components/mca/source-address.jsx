"use client";

import { useId, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 04 — Every figure in the memo, at the address it was read from.
 *
 * The first attempt at this section travelled from the memo down to the source
 * line as a continuous zoom, and the idea was sound but the figure was not: it
 * zoomed through four blank panels, so the one thing a reader wanted to see —
 * the document — was never actually there. Scale also measured nothing. It
 * encoded that there were four levels, which is not a fact about this file.
 *
 * Evidence is not a hierarchy. It is an address, and an address has real
 * coordinates: page 84 of a hundred and forty-three, lines 22 to 31. So the
 * section is a locator. Pick a figure from the memo and the viewer opens the
 * page it came from, the ruler slides to that page's true position in the
 * package, and a bracket closes around exactly the lines the value was read
 * from — spanning ten of them for a deposits total that is summed from a block,
 * and one for a business name that is written on a single line.
 *
 * That bracket is the measurement, and it is why the section is worth drawing:
 * the height of it is the number of source lines, so a figure with a long
 * derivation and a figure copied from one line do not look alike.
 *
 * Every address here is one the product's own intake screen records for this
 * deal, and every quoted line is the text that screen shows against it.
 *
 * The line grid is what keeps the section aligned: a fixed line height in both
 * the numbers column and the bracket, so the bracket cannot drift off the lines
 * it is bracketing at any width.
 *
 * Server-rendered with the first figure open, which is the finished state.
 */
export function SourceAddress({ figures, packagePages, labels, note }) {
  const scope = useRef(null);
  const uid = useId();

  const ready = useReady();
  const drawn = useHasEntered(scope, 0.25);

  const [active, setActive] = useState(0);
  const figure = figures[active];

  // The bracket is placed in line units against the window it is drawn over.
  const first = figure.window[0].n;
  const from = figure.from - first;
  const span = figure.to - figure.from + 1;

  return (
    <figure
      className={`sa${ready ? " is-ready" : ""}${drawn ? " is-drawn" : ""}`}
      ref={scope}
    >
      <div className="sa-body">
        {/* The memo side: what the figure says. */}
        <div className="sa-memo">
          <p className="sa-memo-k hx-mono">{labels.memo}</p>
          <ol className="sa-list">
            {figures.map((item, i) => (
              <li className={`sa-item${i === active ? " is-live" : ""}`} key={item.field}>
                <button
                  type="button"
                  className="sa-item-btn"
                  aria-pressed={i === active}
                  aria-controls={`${uid}-viewer`}
                  onClick={() => setActive(i)}
                >
                  <span className="sa-item-k hx-mono">{item.field}</span>
                  <span className="sa-item-v">{item.value}</span>
                  <span className="sa-item-at hx-mono">{item.address}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* The source side: the page, and the lines. */}
        <div className="sa-viewer" id={`${uid}-viewer`} aria-live="polite">
          <div className="sa-viewer-top">
            <p className="sa-doc">{figure.doc}</p>
            <p className="sa-page hx-mono">
              {labels.page} <span className="sa-page-n">{figure.page}</span> {labels.of} {packagePages}
            </p>
          </div>

          {/* Where that page sits in the package, to scale. */}
          <div
            className="sa-ruler"
            role="img"
            aria-label={`Page ${figure.page} of ${packagePages} in the borrower package.`}
          >
            <span className="sa-ruler-end hx-mono" aria-hidden="true">1</span>
            <span className="sa-ruler-track" aria-hidden="true">
              <span
                className="sa-ruler-mark"
                style={{ left: `${(figure.page / packagePages) * 100}%` }}
              />
            </span>
            <span className="sa-ruler-end hx-mono" aria-hidden="true">{packagePages}</span>
          </div>

          {/* The excerpt. The bracket is placed on the same grid rows as the
              lines it brackets, so the two cannot drift apart — there is no
              arithmetic between them to get wrong at any width. Keyed by
              figure, so switching one replays the bracket closing. */}
          <div className="sa-lines">
            <span
              className="sa-bracket"
              key={figure.field}
              style={{ gridRow: `${from + 1} / span ${span}` }}
              aria-hidden="true"
            />

            {figure.window.map((line) => (
              <p
                className={`sa-line${line.n >= figure.from && line.n <= figure.to ? " is-in" : ""}${line.hit ? " is-hit" : ""}`}
                key={line.n}
              >
                <span className="sa-line-n hx-mono">{line.n}</span>
                <span className="sa-line-t hx-mono">{line.text}</span>
                <span className="sa-line-a hx-mono">{line.amount}</span>
              </p>
            ))}
          </div>

          <p className="sa-span hx-mono">
            <span className="sa-span-n">{span}</span>
            <span className="sa-span-k">{span === 1 ? labels.spanOne : labels.spanMany}</span>
            <span className="sa-span-at">
              {span === 1 ? `${labels.line} ${figure.from}` : `${labels.lines} ${figure.from}–${figure.to}`}
            </span>
          </p>
        </div>
      </div>

      <figcaption className="sa-note">{note}</figcaption>
    </figure>
  );
}
