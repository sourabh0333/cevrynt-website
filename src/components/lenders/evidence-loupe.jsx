"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCoarsePointer, useHasEntered, useReady, useReducedMotion } from "@/components/progressive";

const SHOT_W = 1600;
const SHOT_H = 760;

/**
 * How long the lens rests on a line. Its magnification lives in the stylesheet
 * as --xt-z, next to the radius it has to agree with.
 */
const CYCLE_MS = 3600;

/**
 * 03 — Every value keeps the line it came from.
 *
 * The other sections on this page look at conclusions. This one looks at the
 * evidence underneath them, and the thing worth showing is not that the figures
 * are right — nobody can show that in a picture — but that each of them is
 * still attached to the place it was read from, at a page and a line, in the
 * borrower's own document.
 *
 * So the instrument is a lens. It rests on one transaction line of the original
 * statement at a time and magnifies it enough to actually read, while the
 * structured field that value became lights up beside it with its address. The
 * screen underneath is never cropped, moved or annotated; the only thing added
 * is a piece of glass, which is the honest version of "look closer" — the
 * document is not being reformatted for the argument, it is being examined.
 *
 * The figure that carries this section is a zero. A hundred and sixty-four
 * fields came off this file and none of them were retyped, which is the whole
 * claim: not that the reading is perfect, but that there is no untraceable step
 * between the page and the number a credit team is looking at.
 *
 * Server-rendered with every field listed and its address shown; the lens is an
 * enhancement, and the section reads without it.
 */
export function EvidenceLoupe({ shot, fields, readout, note }) {
  const scope = useRef(null);
  const plateRef = useRef(null);
  const listRef = useRef(null);

  const ready = useReady();
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const entered = useHasEntered(scope, 0.22);

  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  /**
   * The lens needs the plate's rendered size in its own units to know how far
   * to push the magnified copy. One observer writes it; the stylesheet does the
   * rest, so nothing is recomputed per frame.
   *
   * The measurement is written to the figure root, not to the plate. React owns
   * the plate's style attribute — it rewrites it with the active target on
   * every change — and an imperative setProperty on the same element is wiped
   * the next time that happens, which strands the lens at whatever width the
   * page first had. These inherit down to it just as well.
   */
  const measure = useCallback(() => {
    const plate = plateRef.current;
    const root = scope.current;
    if (!plate || !root) return;
    const box = plate.getBoundingClientRect();
    if (!box.width) return;
    root.style.setProperty("--pw", box.width.toFixed(1));
    root.style.setProperty("--ph", box.height.toFixed(1));
  }, []);

  // Re-measure whenever the lens moves, and again the moment the section is
  // reached. Neither the observer nor the resize event is guaranteed to have
  // been delivered by then, and a lens working off a stale width magnifies the
  // wrong part of the page — which looks like a bug in the framing rather than
  // a bug in the measurement. Arriving is the important one: the width can have
  // changed while this was far off screen and nothing here would have run.
  useEffect(measure, [measure, active, entered, ready]);

  useEffect(() => {
    const plate = plateRef.current;
    if (!plate) return undefined;

    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(plate);
    // A resize observer is delivered as part of the frame lifecycle, so a page
    // that is not being painted can hold one back and strand the lens at a
    // stale width. The window event does not depend on painting.
    window.addEventListener("resize", measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const hold = () => setHeld(true);
    const release = () => setHeld(false);
    list.addEventListener("mouseenter", hold);
    list.addEventListener("mouseleave", release);
    return () => {
      list.removeEventListener("mouseenter", hold);
      list.removeEventListener("mouseleave", release);
    };
  }, []);

  const running = ready && entered && !held && !reduced && !coarse;

  useEffect(() => {
    if (!running) return undefined;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % fields.length), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [running, active, fields.length]);

  const at = fields[active].at;

  return (
    <figure className={`xt${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <div className="xt-readout">
        <p className="xt-fig">
          <span className="xt-fig-n">{readout.fieldsN}</span>
          <span className="xt-fig-k hx-mono">{readout.fields}</span>
        </p>
        <span className="xt-readout-rule" aria-hidden="true" />
        <p className="xt-fig xt-fig-zero">
          <span className="xt-fig-n">{readout.retypedN}</span>
          <span className="xt-fig-k hx-mono">{readout.retyped}</span>
        </p>
      </div>

      <div className="xt-body">
        {/* The three values, each with the address it keeps. */}
        <ol className="xt-list" ref={listRef}>
          {fields.map((field, i) => (
            <li
              className={`xt-item${i === active ? " is-live" : ""}`}
              key={field.name}
              onMouseEnter={() => setActive(i)}
            >
              <span className="xt-item-k hx-mono">{field.name}</span>
              <span className="xt-item-v">{field.value}</span>
              <span className="xt-item-src hx-mono">{field.source}</span>
              <span className="xt-item-raw">{field.raw}</span>
            </li>
          ))}
        </ol>

        {/* The document, unaltered, with a piece of glass over it. */}
        <div className="xt-plate" ref={plateRef} style={{ "--tx": at.x, "--ty": at.y }}>
          <Image
            className="xt-shot"
            src={shot.src}
            alt={shot.alt}
            width={SHOT_W}
            height={SHOT_H}
            sizes="(max-width: 1000px) 94vw, 760px"
            loading="lazy"
          />

          <span className="xt-loupe" aria-hidden="true">
            <span className="xt-lens">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="xt-lens-shot" src={shot.src} alt="" />
            </span>
          </span>
        </div>
      </div>

      <figcaption className="xt-note">{note}</figcaption>
    </figure>
  );
}
