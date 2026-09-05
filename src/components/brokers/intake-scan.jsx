"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PointerField } from "@/components/home/fx";
import { useReady } from "@/components/progressive";

gsap.registerPlugin(ScrollTrigger);

const SHOT_W = 5000;
const SHOT_H = 2375;

/**
 * 04 — What you hand over, and what they open.
 *
 * A broker hands over a folder. Five files, one of them a hundred and twenty
 * pages long, none of them labelled in a way a stranger can use. What the
 * lender opens, if the submission goes through this, is the screen below — and
 * the three columns of that screen are the three questions any reader asks of a
 * new package, in the order they ask them: what did I receive, what is it, and
 * where did each number come from.
 *
 * So the figure reads it in that order. A line travels left to right across the
 * real export as the section is scrolled, and each column comes up out of the
 * dark as the line reaches it. Nothing is annotated on top of the artwork and
 * nothing is cropped out of it: the screen is shown whole, and the only thing
 * added is the order it is read in.
 *
 * The motion is the scroll itself rather than a timer, which is the difference
 * that matters here — section two moves on its own because it is a list being
 * presented, and this one moves at the reader's pace because it is a page being
 * read. Stop scrolling and the line stops with you.
 *
 * Every figure quoted beside it is on the screen: five files in, five documents
 * classified, a hundred and forty-three pages accounted for, and structured
 * values that each carry a page and a line back to the document they came from.
 *
 * Server-rendered fully lit — the scan is what JavaScript adds, not what it
 * reveals — so with no JavaScript, or with reduced motion, the screen and all
 * three readings simply stand there finished.
 */
export function IntakeScan({ shot, columns, readout, note }) {
  const scope = useRef(null);
  const ready = useReady();

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 700px)", () => {
      const state = { t: 0 };

      // 0 → 100 across the plate, in the same units the veils compare against.
      const apply = () => root.style.setProperty("--scan", (state.t * 118 - 9).toFixed(2));

      const tween = gsap.to(state, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          end: "bottom 62%",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefresh: apply,
        },
        onUpdate: apply,
      });

      apply();

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        root.style.removeProperty("--scan");
      };
    });

    ScrollTrigger.refresh();
    return () => mm.revert();
  }, []);

  return (
    <figure className={`ds${ready ? " is-ready" : ""}`} ref={scope}>
      <div className="ds-readout">
        <p className="ds-fig">
          <span className="ds-fig-n">{readout.filesN}</span>
          <span className="ds-fig-k hx-mono">{readout.files}</span>
        </p>
        <span className="ds-readout-rule" aria-hidden="true" />
        <p className="ds-fig ds-fig-quiet">
          <span className="ds-fig-n">{readout.pagesN}</span>
          <span className="ds-fig-k hx-mono">{readout.pages}</span>
        </p>
      </div>

      <PointerField className="ds-field" selector=".ds-stage">
        <div className="ds-stage">
          <span className="ds-ambient" aria-hidden="true" />
          <span className="ds-key" aria-hidden="true" />

          <div className="ds-plate">
            <Image
              className="ds-shot"
              src={shot.src}
              alt={shot.alt}
              width={SHOT_W}
              height={SHOT_H}
              sizes="(max-width: 900px) 94vw, 1180px"
              loading="lazy"
            />

            {/* One veil per column of the export, lifting as the line arrives. */}
            {columns.map((column) => (
              <span
                className="ds-veil"
                key={column.n}
                style={{ "--from": column.from, "--to": column.to, "--a": column.at }}
                aria-hidden="true"
              />
            ))}

            <span className="ds-scan" aria-hidden="true" />
          </div>
        </div>
      </PointerField>

      {/* The three readings, in the order the line reaches them. */}
      <ol className="ds-reads">
        {columns.map((column) => (
          <li className="ds-read" key={column.n} style={{ "--a": column.at }}>
            <span className="ds-read-rule" aria-hidden="true" />
            <p className="ds-read-n hx-mono">{column.n}</p>
            <p className="ds-read-q">{column.question}</p>
            <p className="ds-read-b">{column.answer}</p>
            <p className="ds-read-f hx-mono">{column.fact}</p>
          </li>
        ))}
      </ol>

      <figcaption className="ds-note">{note}</figcaption>
    </figure>
  );
}
