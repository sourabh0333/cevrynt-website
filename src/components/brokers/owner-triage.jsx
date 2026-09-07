"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PointerField } from "@/components/home/fx";
import { useCoarsePointer, useHasEntered, useReady, useReducedMotion } from "@/components/progressive";

/** The dial's own space. Centre, the three boundaries, and the marker orbits. */
const C = 200;
const RING = [66, 128, 186];
const ORBIT = [34, 97, 157];
/** How wide each band spreads its markers — wider as it gets further out. */
const SPREAD = [60, 82, 104];

/** How long a question holds before the light moves on. */
const CYCLE_MS = 2600;

const place = (band, i, n) => {
  const a = SPREAD[band];
  const deg = n === 1 ? 0 : -a + (2 * a * i) / (n - 1);
  const rad = (deg * Math.PI) / 180;
  return {
    x: C + ORBIT[band] * Math.sin(rad),
    y: C - ORBIT[band] * Math.cos(rad),
  };
};

/**
 * 03 — The same open questions, placed by how far the answer is from you.
 *
 * The version this replaces was three columns of ruled text, which is a table
 * pretending to be a figure: it sorted the items correctly and showed you
 * nothing you could not have read in a sentence. What is actually interesting
 * about these seven is not which bucket each falls in. It is that they sit at
 * different distances from the only desk a broker controls, and that two of
 * them are outside the reach of any amount of work done on this side.
 *
 * So the figure is reach. Your desk is the centre. The first boundary is what
 * you can close alone, the second is what one call to the borrower closes, and
 * the third is drawn as a broken line because it is not a boundary you can
 * cross — the two markers past it are the lender's judgment, and they turn
 * slowly out there whatever anybody here does. Each marker's distance from the
 * centre is the whole measurement; the counts on the rings are just it, read
 * back.
 *
 * The light walks the seven on its own and stops the moment a reader takes
 * over, and pointing at any line lights its marker, so the words and the
 * geometry are never describing different things.
 *
 * Server-rendered with every marker drawn and every line present, the first one
 * lit, so the section reads with no JavaScript at all.
 */
export function OwnerTriage({ owners, items, labels, note }) {
  const scope = useRef(null);
  const listRef = useRef(null);

  const ready = useReady();
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const entered = useHasEntered(scope, 0.24);

  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  /** Items in ring order, each carrying the point it occupies on the dial. */
  const plotted = useMemo(() => {
    const out = [];
    owners.forEach((owner, band) => {
      const group = items.filter((item) => item.owner === owner.key);
      group.forEach((item, i) => {
        out.push({ ...item, band, ...place(band, i, group.length) });
      });
    });
    return out;
  }, [owners, items]);

  const counts = owners.map((owner) => items.filter((item) => item.owner === owner.key).length);

  // Reading should stop the light, not race it.
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
    const id = window.setTimeout(() => setActive((i) => (i + 1) % plotted.length), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [running, active, plotted.length]);

  return (
    <figure className={`tg${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <div className="tg-readout">
        <p className="tg-fig">
          <span className="tg-fig-n">{String(items.length).padStart(2, "0")}</span>
          <span className="tg-fig-k hx-mono">{labels.total}</span>
        </p>
        <span className="tg-readout-rule" aria-hidden="true" />
        <p className="tg-fig tg-fig-lit">
          <span className="tg-fig-n">{String(counts[0]).padStart(2, "0")}</span>
          <span className="tg-fig-k hx-mono">{labels.yours}</span>
        </p>
      </div>

      <PointerField className="tg-field" selector=".tg-stage">
        <div className="tg-stage">
          <span className="tg-ambient" aria-hidden="true" />
          <span className="tg-key" aria-hidden="true" />

          <div className="tg-body">
            <ol className="tg-list" ref={listRef}>
              {plotted.map((item, i) => (
                <li
                  className={`tg-item${i === active ? " is-live" : ""}`}
                  key={item.name}
                  style={{ "--d": `${i * 70}ms` }}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className="tg-item-tag hx-mono">{owners[item.band].name}</span>
                  <span className="tg-item-body">
                    <span className="tg-item-n">{item.name}</span>
                    <span className="tg-item-w">{item.action}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="tg-aside">
              <svg className="tg-dial" viewBox="0 0 400 400" role="img" aria-label={labels.dial}>
                {/* The two boundaries you can reach, and the one you cannot. */}
                <circle className="tg-ring" cx={C} cy={C} r={RING[0]} />
                <circle className="tg-ring" cx={C} cy={C} r={RING[1]} />
                <circle className="tg-ring tg-ring-open" cx={C} cy={C} r={RING[2]} />

                {plotted.map((item, i) => (
                  <line
                    className={`tg-spoke${i === active ? " is-live" : ""}`}
                    key={`s-${item.name}`}
                    x1={C}
                    y1={C}
                    x2={item.x.toFixed(1)}
                    y2={item.y.toFixed(1)}
                  />
                ))}

                <circle className="tg-core" cx={C} cy={C} r="5" />

                {plotted.map((item, i) => (
                  <g className={`tg-mark tg-mark-${item.band}${i === active ? " is-live" : ""}`} key={`m-${item.name}`}>
                    <circle className="tg-halo" cx={item.x.toFixed(1)} cy={item.y.toFixed(1)} r="13" />
                    <circle className="tg-dot" cx={item.x.toFixed(1)} cy={item.y.toFixed(1)} r="4.5" />
                  </g>
                ))}
              </svg>

              <ol className="tg-legend">
                {owners.map((owner, band) => (
                  <li
                    className={`tg-leg tg-leg-${band}${plotted[active]?.band === band ? " is-live" : ""}`}
                    key={owner.key}
                  >
                    <span className="tg-leg-dot" aria-hidden="true" />
                    <span className="tg-leg-n">{String(counts[band]).padStart(2, "0")}</span>
                    <span className="tg-leg-t">{owner.name}</span>
                    <span className="tg-leg-w hx-mono">{owner.when}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </PointerField>

      <figcaption className="tg-note">{note}</figcaption>
    </figure>
  );
}
