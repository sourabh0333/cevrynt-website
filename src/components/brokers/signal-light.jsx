"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { PointerField } from "@/components/home/fx";
import { useCoarsePointer, useHasEntered, useInView, useReady, useReducedMotion } from "@/components/progressive";

const SHOT_W = 1600;
const SHOT_H = 760;

/** How long a signal holds before the light moves itself along. */
const CYCLE_MS = 4600;

/** The export's aspect, and how much taller than the viewport it is framed. */
const SHOT_RATIO = SHOT_W / SHOT_H;
const ZOOM = 1.55;

/**
 * 02 — The screen your submission lands on, with the light on one signal at a
 * time.
 *
 * The version before this drew two dots and an arc on an empty axis, and it was
 * as thin as that sounds. It also had no artwork in it at all, which on a page
 * about what a lender sees was the wrong choice twice over: the thing a broker
 * wants to look at is the actual screen their file arrives on.
 *
 * So this is that screen — the product's fraud view for this deal — and the
 * only thing added to it is light. Everything outside the signal under
 * discussion is dimmed, a soft key travels to the card being talked about, and
 * a ring is drawn on the card's own bounds. The bounds are authored in the
 * export's coordinate space, so the ring lands on the real element at any
 * rendered width rather than near it.
 *
 * The light moves itself, the way the package stacks on the integrations page
 * do: it advances through the four signals on a timer, and hovering or tabbing
 * into the list stops it, so nothing moves while somebody is reading. The
 * reader's pointer moves a second, softer key across the whole stage.
 *
 * Every figure is on the screen behind it: four signals raised, none of them
 * auto-declined, three resolution steps still open with the disposition
 * intentionally withheld. What each one means for a broker — the thing to put
 * in the pack so it is answered before it is asked — is the only copy here that
 * is not read off the artwork.
 *
 * Server-rendered with the first signal selected and every signal listed, so
 * the whole section reads with no JavaScript.
 */
export function SignalLight({ shot, signals, readout, foot, note }) {
  const scope = useRef(null);
  const listRef = useRef(null);
  const uid = useId();

  const ready = useReady();
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const inView = useInView(scope);
  const drawn = useHasEntered(scope);

  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  // Reading should stop the light, not race it.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;

    const hold = () => setHeld(true);
    const release = () => setHeld(false);

    list.addEventListener("mouseenter", hold);
    list.addEventListener("mouseleave", release);
    list.addEventListener("focusin", hold);
    list.addEventListener("focusout", release);

    return () => {
      list.removeEventListener("mouseenter", hold);
      list.removeEventListener("mouseleave", release);
      list.removeEventListener("focusin", hold);
      list.removeEventListener("focusout", release);
    };
  }, []);

  const running = ready && inView && drawn && !held && !reduced && !coarse;

  useEffect(() => {
    if (!running) return undefined;
    const id = window.setTimeout(() => {
      setActive((i) => (i + 1) % signals.length);
    }, CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [running, active, signals.length]);

  /**
   * The plate is a viewport onto the screen rather than a shrunken copy of it.
   * The export is framed taller than the viewport and panned so the signal
   * under the light sits in the middle of it — which is the only way the card
   * being talked about is large enough to read. The pan is clamped so the
   * frame can never leave an empty edge inside the viewport, and it is all
   * measured rather than assumed, so it holds at any column height.
   */
  const plateRef = useRef(null);
  const camRef = useRef(null);
  useEffect(() => {
    const plate = plateRef.current;
    const cam = camRef.current;
    if (!plate || !cam) return undefined;

    const place = () => {
      const box = plate.getBoundingClientRect();
      if (!box.width || !box.height) return;

      const camH = box.height * ZOOM;
      const camW = camH * SHOT_RATIO;

      const target = signals[active].at;
      const cx = (target.x + target.w / 2) / 100;
      const cy = (target.y + target.h / 2) / 100;

      // Centre the card, then hold the frame against the viewport's edges.
      const x = Math.min(0, Math.max(box.width - camW, box.width / 2 - cx * camW));
      const y = Math.min(0, Math.max(box.height - camH, box.height / 2 - cy * camH));

      // Every property the frame needs is written here rather than relied on
      // from the stylesheet. A camera that silently becomes a static block
      // because one rule did not load is worse than no camera at all, and that
      // failure looks exactly like the frame simply being the wrong size.
      cam.style.position = "absolute";
      cam.style.top = "0";
      cam.style.left = "0";
      cam.style.right = "auto";
      cam.style.bottom = "auto";
      cam.style.maxWidth = "none";
      cam.style.width = `${camW}px`;
      cam.style.height = `${camH}px`;
      cam.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    };

    place();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(place);
    observer?.observe(plate);
    window.addEventListener("resize", place);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [active, signals]);

  const onKeyDown = useCallback((event) => {
    const last = signals.length - 1;
    let next = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    listRef.current?.querySelectorAll("[role='tab']")[next]?.focus();
  }, [active, signals.length]);

  const current = signals[active];

  return (
    <figure
      className={`sg${ready ? " is-ready" : ""}${drawn ? " is-drawn" : ""}`}
      ref={scope}
      style={{ "--sg-x": `${current.at.x}%`, "--sg-y": `${current.at.y}%`, "--sg-w": `${current.at.w}%`, "--sg-h": `${current.at.h}%` }}
    >
      <div className="sg-readout">
        <p className="sg-fig">
          <span className="sg-fig-n">{String(signals.length).padStart(2, "0")}</span>
          <span className="sg-fig-k hx-mono">{readout.raised}</span>
        </p>
        <span className="sg-readout-rule" aria-hidden="true" />
        <p className="sg-fig sg-fig-quiet">
          <span className="sg-fig-n">00</span>
          <span className="sg-fig-k hx-mono">{readout.declined}</span>
        </p>
      </div>

      <PointerField className="sg-field" selector=".sg-stage">
        <div className="sg-stage">
          <span className="sg-ambient" aria-hidden="true" />
          <span className="sg-key" aria-hidden="true" />

          <div className="sg-body">
            {/* The four signals, and what each one wants from the pack. */}
            <ol
              className="sg-list"
              ref={listRef}
              role={ready ? "tablist" : undefined}
              aria-label={ready ? "Signals raised on this submission" : undefined}
              aria-orientation="vertical"
              onKeyDown={ready ? onKeyDown : undefined}
            >
              {signals.map((signal, i) => (
                <li className={`sg-item${i === active ? " is-live" : ""}`} key={signal.name} role={ready ? "presentation" : undefined}>
                  <button
                    type="button"
                    className="sg-item-btn"
                    role={ready ? "tab" : undefined}
                    id={`${uid}-tab-${i}`}
                    aria-selected={ready ? i === active : undefined}
                    aria-controls={ready ? `${uid}-panel` : undefined}
                    tabIndex={ready && i !== active ? -1 : 0}
                    onClick={() => setActive(i)}
                  >
                    <span className="sg-item-top">
                      <span className="sg-item-name">{signal.name}</span>
                      <span className="sg-item-badge hx-mono">{signal.badge}</span>
                    </span>
                    <span className="sg-item-what">{signal.what}</span>
                    <span className="sg-item-src hx-mono">{signal.source}</span>
                  </button>
                </li>
              ))}
            </ol>

            {/* A viewport onto the screen, panned to the signal under the light. */}
            <div className="sg-plate" ref={plateRef}>
              <div className="sg-cam" ref={camRef}>
                <Image
                  className="sg-shot"
                  src={shot.src}
                  alt={shot.alt}
                  width={SHOT_W}
                  height={SHOT_H}
                  sizes="(max-width: 900px) 92vw, 1100px"
                  loading="lazy"
                />
                {/* Inside the frame, so both ride the same pan. */}
                <span className="sg-dim" aria-hidden="true" />
                <span className="sg-spot" aria-hidden="true" />
                <span className="sg-ring" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </PointerField>

      {/* What a broker does about the one under the light. */}
      <div className="sg-answer" id={`${uid}-panel`} role={ready ? "tabpanel" : undefined} aria-live="polite">
        <p className="sg-answer-k hx-mono">{readout.answer}</p>
        <p className="sg-answer-v">{current.answer}</p>
      </div>

      <p className="sg-foot">
        <span className="sg-foot-n">{foot.open}</span>
        <span className="sg-foot-k">{foot.text}</span>
      </p>

      <figcaption className="sg-note">{note}</figcaption>
    </figure>
  );
}
