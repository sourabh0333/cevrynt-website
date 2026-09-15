"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Ticker } from "@/components/home/fx";
import { useHasEntered, useReady } from "@/components/progressive";

const SHOT_W = 760;
const SHOT_H = 520;

/**
 * 02 — The surfaces held still while their screens go past.
 *
 * The version this replaces was a grid of six items with two plates under it,
 * which put the list and the evidence in two separate places and asked the
 * reader to hold one in their head while looking at the other.
 *
 * Here the rail stays. The six surfaces sit in a sticky column that holds
 * position while the product views scroll past it, and the surface matching
 * the view currently on screen lights up. The list and the evidence are
 * therefore never apart: whatever is being shown is named, at the same moment,
 * a few centimetres away.
 *
 * The stick itself is CSS, so it works with no JavaScript at all. The
 * highlight is the enhancement on top, and when it does not run the section is
 * a sticky rail beside four screens, which loses nothing.
 *
 * The count and the rule beneath it still run together, sharing one duration
 * so the figure is measured rather than announced.
 *
 * Server-rendered with every plate in place and the figure at its value.
 */
export function StickySurfaces({
  surfaces,
  plates,
  figure,
  figureK,
  partnership,
  close,
  note,
  readout,
}) {
  const scope = useRef(null);
  const platesRef = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.14);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const host = platesRef.current;
    if (!host) return undefined;
    if (typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const items = [...host.querySelectorAll("[data-surface]")];
    if (!items.length) return undefined;

    // Whichever plate is nearest the middle of the viewport owns the rail.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.surface));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <figure className={`stk${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <div className="stk-body">
        <div className="stk-rail">
          <p className="stk-rail-k hx-mono">{readout.builtK}</p>

          <ol className="stk-list">
            {surfaces.map((s, i) => (
              <li
                className={`stk-item${active === i ? " is-active" : ""}${s.shown ? "" : " is-plain"}`}
                key={s.k}
                style={{ "--i": i }}
              >
                <span className="stk-item-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="stk-item-k">{s.k}</span>
                <span className="stk-item-b">{s.b}</span>
              </li>
            ))}
          </ol>

          <div className="stk-anchor">
            <p className="stk-fig">
              <span className="stk-fig-n">
                <Ticker value={figure} />
              </span>
            </p>
            <span className="stk-meter" aria-hidden="true">
              <span className="stk-meter-fill" />
            </span>
            <p className="stk-fig-k">{figureK}</p>
          </div>
        </div>

        <div className="stk-plates" ref={platesRef}>
          {plates.map((p) => (
            <figure className="stk-plate" key={p.shot.src} data-surface={p.surface}>
              <Image
                className="stk-shot"
                src={p.shot.src}
                alt={p.shot.alt}
                width={SHOT_W}
                height={SHOT_H}
                sizes="(max-width: 1000px) min(92vw, 620px), 760px"
                loading="lazy"
              />
              <figcaption className="stk-cap">
                <span className="stk-cap-n hx-mono">{String(p.surface + 1).padStart(2, "0")}</span>
                <span className="stk-cap-t">{p.k}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Optional: the SHOPLINE route belongs with distribution in 03, so this
          section no longer carries it. Kept so the shape does not hard-code
          its absence. */}
      {partnership ? (
        <p className="stk-partnership">
          <span className="stk-partnership-k hx-mono">{readout.partnerK}</span>
          <span className="stk-partnership-b">{partnership}</span>
        </p>
      ) : null}

      <p className="stk-close">{close}</p>
      <figcaption className="stk-note">{note}</figcaption>
    </figure>
  );
}
