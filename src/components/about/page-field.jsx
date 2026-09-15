"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useHasEntered, useReady } from "@/components/progressive";

const SHOT_W = 1600;
const SHOT_H = 945;

/* A deterministic scatter. Sequential delays make a wipe, which reads as a
   loading bar; a scatter reads as a field developing, which is what this is.
   Coprime with the page count so no two marks in a row share an offset. */
const scatter = (i, n) => ((i * 37) % n) * 4;

/**
 * 05 — One file, drawn at its real size.
 *
 * Every other section on this page is a list of things with a rule between
 * them. This one is a field: one mark for every page in a single underwriting
 * file, in order, so page eighty-seven is the eighty-seventh mark. The marks
 * that carry the figures on the memo are lit, and their position in the grid is
 * their page number — the encoding is exact rather than suggestive, which is
 * the only reason a wall of tally marks is worth drawing.
 *
 * The point is not that the lit ones are few. It is that the other hundred and
 * thirty-nine do not go away: they stay attached underneath, which is what
 * makes the four checkable at all. A figure is only worth what the pages behind
 * it can still be opened to.
 *
 * Two effects. The field develops rather than wipes — the marks arrive in a
 * scattered order, so it settles into place instead of sweeping across. And the
 * field answers the pointer: moving across it names the page under the cursor,
 * written straight to the caption rather than through state, because a hundred
 * and forty-three re-renders per sweep would be absurd.
 *
 * Server-rendered complete and lit; the entrance only stages the arrival.
 */
export function PageField({ pages, lit, aside, insight, note, readout }) {
  const scope = useRef(null);
  const fieldRef = useRef(null);
  const hoverRef = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.18);

  useEffect(() => {
    const field = fieldRef.current;
    const hover = hoverRef.current;
    if (!field || !hover) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const rest = hover.textContent;

    const onMove = (event) => {
      const mark = event.target.closest(".pgf-mark");
      hover.textContent = mark ? mark.dataset.label : rest;
    };
    const onLeave = () => {
      hover.textContent = rest;
    };

    field.addEventListener("pointermove", onMove, { passive: true });
    field.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      field.removeEventListener("pointermove", onMove);
      field.removeEventListener("pointerleave", onLeave);
      hover.textContent = rest;
    };
  }, []);

  const marks = Array.from({ length: pages }, (_, i) => i + 1);
  const litSet = new Set(lit.map((l) => l.page));

  return (
    <figure className={`pgf${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <dl className="pgf-readout">
        {readout.figures.map((f) => (
          <div className={`pgf-fig${f.tone ? ` pgf-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="pgf-fig-n">{f.n}</dt>
            <dd className="pgf-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      {/* One mark per page, in order. Position is the page number. */}
      <div
        className="pgf-field"
        ref={fieldRef}
        role="img"
        aria-label={readout.fieldLabel}
      >
        {marks.map((p) => (
          <span
            className={`pgf-mark${litSet.has(p) ? " is-lit" : ""}`}
            key={p}
            data-label={`${readout.hoverPrefix} ${p}`}
            style={{ "--d": `${scatter(p - 1, pages)}ms` }}
          />
        ))}
      </div>

      <p className="pgf-hover hx-mono" ref={hoverRef}>
        {readout.hoverRest}
      </p>

      <div className="pgf-body">
        <div className="pgf-lit">
          <p className="pgf-lit-k hx-mono">{readout.litK}</p>
          <ol className="pgf-lit-list">
            {lit.map((l) => (
              <li className="pgf-lit-item" key={l.page}>
                <span className="pgf-lit-p hx-mono">{`p.${l.page}`}</span>
                <span className="pgf-lit-v">{l.v}</span>
                <span className="pgf-lit-b">{l.b}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="pgf-aside">
          <p className="pgf-aside-k hx-mono">{aside.k}</p>
          <div className="pgf-plate">
            <Image
              className="pgf-shot"
              src={aside.shot.src}
              alt={aside.shot.alt}
              width={SHOT_W}
              height={SHOT_H}
              sizes="(max-width: 1000px) min(92vw, 480px), min(34vw, 460px)"
              loading="lazy"
            />
            <span className="pgf-ring" aria-hidden="true" />
          </div>
          <p className="pgf-aside-b">{aside.b}</p>
        </div>
      </div>

      <p className="pgf-insight">
        <span className="pgf-insight-k hx-mono">{insight.k}</span>
        <span className="pgf-insight-v">{insight.v}</span>
      </p>

      <figcaption className="pgf-note">{note}</figcaption>
    </figure>
  );
}
