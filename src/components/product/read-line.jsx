"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useHasEntered, useReady, useReducedMotion } from "@/components/progressive";

/** Frames the descriptor takes to resolve out of the redaction. */
const RESOLVE = 26;
const NOISE = "█▓▒░#%&@/\\|<>=+*0123456789";

/**
 * 02 — Five readings, four documents, and no values at all.
 *
 * Same architecture as the solutions pages: figures on one baseline, then a
 * body split between the document being read and what the reading carries.
 *
 * The last figure is the one that matters and it is a zero. No value is printed
 * anywhere in this section. Printing figures would mean inventing borrower
 * data, and it would also miss what the stage produces.
 *
 * That is the effect as well. Every line on the document is a solid redaction,
 * and the chosen one does not lift to reveal a number — it resolves into the
 * route: the page and the block the reading was taken from. The value stays
 * blacked out for the whole life of the page, and what comes out of it is the
 * address. A connector then draws from that line across to the reading and
 * re-routes when another is chosen, so the two read as one object.
 *
 * The resolve writes textContent on a frame loop rather than through React, so
 * it costs no re-renders. The server renders the resolved descriptor, so the
 * first reading is correct with no JavaScript.
 */
export function ReadLine({ fields, readout, close, note }) {
  const scope = useRef(null);
  const bodyRef = useRef(null);
  const docRef = useRef(null);
  const asideRef = useRef(null);
  const valueRef = useRef(null);

  const ready = useReady();
  const reduced = useReducedMotion();
  const entered = useHasEntered(scope, 0.16);
  const [active, setActive] = useState(0);
  const [wire, setWire] = useState(null);

  const pick = useCallback((i) => setActive(i), []);
  const field = fields[active];
  const descriptor = `${field.page} · ${field.spot}`.toUpperCase();

  /* The redaction resolves into the address, never into a value. */
  useEffect(() => {
    const el = valueRef.current;
    if (!el) return undefined;
    if (reduced || !entered) {
      el.textContent = descriptor;
      return undefined;
    }

    let frame = 0;
    let raf = 0;
    const chars = descriptor.split("");

    const step = () => {
      const settled = Math.floor((frame / RESOLVE) * chars.length);
      el.textContent = chars
        .map((c, i) => (c === " " || i < settled ? c : NOISE[(Math.random() * NOISE.length) | 0]))
        .join("");
      frame += 1;
      if (frame <= RESOLVE) raf = requestAnimationFrame(step);
      else el.textContent = descriptor;
    };

    raf = requestAnimationFrame(step);
    // A throttled tab never runs a frame, which would leave noise standing in
    // place of the address. This settles it either way.
    const settle = window.setTimeout(() => {
      el.textContent = descriptor;
    }, RESOLVE * 22 + 140);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
    };
  }, [descriptor, entered, reduced]);

  /* The connector, measured off the layout and re-drawn on every change. */
  useLayoutEffect(() => {
    const body = bodyRef.current;
    const doc = docRef.current;
    const side = asideRef.current;
    if (!body || !doc || !side) return undefined;

    const measure = () => {
      const lit = doc.querySelector(".di2-line.is-at");
      if (!lit) {
        setWire(null);
        return;
      }

      const b = body.getBoundingClientRect();
      const l = lit.getBoundingClientRect();
      const s = side.getBoundingClientRect();
      // Stacked at narrow widths: there is no gap to cross, so no connector.
      if (s.left < l.right + 24) {
        setWire(null);
        return;
      }

      const x1 = l.right - b.left;
      const y1 = l.top + l.height / 2 - b.top;
      const x2 = s.left - b.left;
      const y2 = s.top - b.top + 26;
      const mid = x1 + (x2 - x1) / 2;

      setWire({
        w: Math.round(b.width),
        h: Math.round(b.height),
        d: `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${mid.toFixed(1)} ${y1.toFixed(1)}, ${mid.toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, entered]);

  return (
    <figure className={`di2${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="di2-readout">
        {readout.figures.map((f) => (
          <div className={`di2-fig${f.tone ? ` di2-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="di2-fig-n">{f.n}</dt>
            <dd className="di2-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="di2-body" ref={bodyRef}>
        {wire ? (
          <svg className="di2-wire" viewBox={`0 0 ${wire.w} ${wire.h}`} aria-hidden="true">
            <path className="di2-wire-p" d={wire.d} pathLength="1" key={wire.d} />
          </svg>
        ) : null}

        <div className="di2-doc" ref={docRef}>
          <p className="di2-doc-t hx-mono">{field.sheet.t}</p>

          <ol className="di2-lines" key={field.k}>
            {field.sheet.rows.map((r, j) => (
              <li className={`di2-line${j === field.line ? " is-at" : ""}`} key={r.l} style={{ "--j": j }}>
                {/* The reading edge, drawn inside the line it is reading. */}
                <span className="di2-edge" aria-hidden="true" />
                <span className="di2-n hx-mono">{String(j + 1).padStart(2, "0")}</span>
                <span className="di2-label">{r.l}</span>

                {j === field.line ? (
                  <span className="di2-value is-route hx-mono" ref={valueRef}>
                    {descriptor}
                  </span>
                ) : (
                  <span className="di2-value hx-mono" aria-label={readout.redacted}>
                    {r.v}
                  </span>
                )}
              </li>
            ))}
          </ol>

          <ul className="di2-picker">
            {fields.map((f, i) => (
              <li className="di2-pick" key={f.k}>
                <button
                  className={`di2-pick-b${i === active ? " is-on" : ""}`}
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => pick(i)}
                  onMouseEnter={() => pick(i)}
                  onFocus={() => pick(i)}
                >
                  <span className="di2-pick-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="di2-pick-k">{f.k}</span>
                  <span className="di2-pick-bar" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="di2-aside" ref={asideRef} aria-live="polite">
          <p className="di2-aside-k hx-mono">{readout.sourceK}</p>
          <ol className="di2-source">
            <li className="di2-source-row">
              <span className="di2-source-k">{readout.docK}</span>
              <span className="di2-source-v hx-mono">{field.doc}</span>
            </li>
            <li className="di2-source-row">
              <span className="di2-source-k">{readout.pageK}</span>
              <span className="di2-source-v hx-mono">{field.page}</span>
            </li>
            <li className="di2-source-row">
              <span className="di2-source-k">{readout.spotK}</span>
              <span className="di2-source-v hx-mono">{field.spot}</span>
            </li>
          </ol>
          <p className="di2-aside-note">{field.b}</p>
        </div>
      </div>

      <p className="di2-close">{close}</p>
      <figcaption className="di2-note">{note}</figcaption>
    </figure>
  );
}
