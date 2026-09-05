"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PointerField } from "@/components/home/fx";

gsap.registerPlugin(ScrollTrigger);

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
const span = (t, a, b) => {
  const p = clamp01((t - a) / (b - a));
  return p * p * (3 - 2 * p);
};

/**
 * 04 Custody, as the register a file is signed into.
 *
 * The previous pass drew this as frames nested one inside the next, and the
 * geometry was quietly wrong: nesting means containment, and none of these
 * holders contains the one after it. Your systems do not contain Cevrynt, and
 * the infrastructure the work runs on does not contain what reads the text. A
 * shape that encodes a relationship the content does not have is decoration
 * however carefully it is drawn.
 *
 * It also ended in a wall, which overclaimed. The commitment on this page is
 * not that the list can never change — it is that nothing is added to it
 * without the lender being told first. A wall says the opposite of that.
 *
 * So it is a chain-of-custody register, which is the artifact this argument
 * belongs to: ruled lines, a seal against each one, and every hand the file
 * passes through written in. Four lines are used. The fifth is ruled, sealed
 * open, and left blank — and that blank line is the section. A list of four
 * names can always grow by one more line without anybody noticing; a register
 * with a visible empty line and a notice against it cannot.
 *
 * Every column is one grid shared by the head and all five rows, so the ledger
 * lines up down its whole height at any width.
 *
 * One scrubbed value fills it: each rule draws, its seal sets, then the entry
 * is written, line after line. The fifth rule draws and nothing follows it.
 *
 * Server-rendered with the register complete and the fifth line blank, which is
 * the finished state and what reduced motion is given.
 */
export function CustodyRegister({ reference, holders, blank, tally, open }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const sheet = root.querySelector(".cr-sheet");
      const head = root.querySelector(".cr-head");
      const rows = gsap.utils.toArray(".cr-row", root);
      const openRows = gsap.utils.toArray(".cr-open-row", root);
      if (!sheet) return undefined;

      root.dataset.armed = "";

      const state = { t: 0 };

      const apply = (t) => {
        if (head) head.style.setProperty("--on", span(t, 0.02, 0.12).toFixed(3));

        rows.forEach((row, i) => {
          const at = 0.08 + i * 0.15;
          // The rule is ruled first, then the line is signed, then written.
          row.style.setProperty("--rule", span(t, at, at + 0.17).toFixed(3));
          row.style.setProperty("--seal", span(t, at + 0.07, at + 0.2).toFixed(3));
          row.style.setProperty("--on", span(t, at + 0.11, at + 0.28).toFixed(3));
        });

        openRows.forEach((row, i) => {
          row.classList.toggle("is-dim", t < 0.84 + i * 0.04);
        });
      };

      const tween = gsap.to(state, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sheet,
          start: "top 80%",
          end: "bottom 52%",
          scrub: 0.4,
          invalidateOnRefresh: true,
          onRefresh: () => apply(state.t),
        },
        onUpdate: () => apply(state.t),
      });

      apply(state.t);

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        delete root.dataset.armed;
        if (head) head.style.removeProperty("--on");
        rows.forEach((row) => {
          row.style.removeProperty("--rule");
          row.style.removeProperty("--seal");
          row.style.removeProperty("--on");
        });
        openRows.forEach((row) => row.classList.remove("is-dim"));
      };
    });

    return () => media.revert();
  }, []);

  return (
    <figure className="cr" ref={scope}>
      <PointerField className="cr-field" selector=".cr-sheet">
        <div className="cr-sheet">
          <span className="cr-ambient" aria-hidden="true" />
          <span className="cr-key" aria-hidden="true" />

          <div className="cr-sheet-top">
            <p className="cr-title hx-mono">Chain of custody</p>
            <p className="cr-ref hx-mono">{reference}</p>
          </div>

          <div className="cr-table" role="table" aria-label="Chain of custody for this review">
            <div className="cr-head" role="row">
              <span className="cr-h cr-h-seal" role="columnheader" aria-label="Seal" />
              <span className="cr-h hx-mono" role="columnheader">No.</span>
              <span className="cr-h hx-mono" role="columnheader">In whose hands</span>
              <span className="cr-h hx-mono" role="columnheader">What they hold</span>
              <span className="cr-h hx-mono cr-h-end" role="columnheader">How they are named</span>
            </div>

            {holders.map((holder, i) => (
              <div className="cr-row" role="row" key={holder.name}>
                <span className="cr-rule" aria-hidden="true" />
                <span className="cr-seal" aria-hidden="true" />
                <span className="cr-cell cr-n hx-mono" role="cell">{String(i + 1).padStart(2, "0")}</span>
                <span className="cr-cell cr-who" role="cell">{holder.name}</span>
                <span className="cr-cell cr-what" role="cell">{holder.what}</span>
                <span className="cr-cell cr-named hx-mono" role="cell">{holder.naming}</span>
              </div>
            ))}

            {/* The line that is ruled and left blank. This is the section. */}
            <div className="cr-row cr-row-blank" role="row">
              <span className="cr-rule" aria-hidden="true" />
              <span className="cr-seal cr-seal-open" aria-hidden="true" />
              <span className="cr-cell cr-n hx-mono" role="cell">
                {String(holders.length + 1).padStart(2, "0")}
              </span>
              <span className="cr-cell cr-blank-line" role="cell">
                <span className="sr-only">No fifth holder</span>
              </span>
              <span className="cr-cell cr-blank-line" role="cell" aria-hidden="true" />
              <span className="cr-cell cr-named cr-blank-note hx-mono" role="cell">{blank.note}</span>
            </div>
          </div>

          <p className="cr-foot">{blank.body}</p>
        </div>
      </PointerField>

      <div className="cr-tally">
        <p className="cr-tally-item">
          <span className="cr-tally-n">{String(holders.length).padStart(2, "0")}</span>
          <span className="cr-tally-k hx-mono">{tally.named}</span>
        </p>
        <p className="cr-tally-item cr-tally-nil">
          <span className="cr-tally-n">00</span>
          <span className="cr-tally-k hx-mono">{tally.undisclosed}</span>
        </p>
      </div>

      <div className="cr-open">
        <p className="cr-open-k hx-mono">
          <span className="cr-open-n">{String(open.length).padStart(2, "0")}</span>
          left open on purpose — each closes with your team, not on this page
        </p>
        <ol className="cr-open-list">
          {open.map((item) => (
            <li className="cr-open-row" key={item.q}>
              <p className="cr-open-q">{item.q}</p>
              <p className="cr-open-when hx-mono">{item.when}</p>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
