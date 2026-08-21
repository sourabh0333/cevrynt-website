"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * What Cevrynt will not do, struck out one line at a time.
 *
 * Three graphic sections precede this one, and a fourth diagram would have made
 * the page monotonous however good the diagram was — rhythm in an editorial
 * layout comes from varying density and tone, not from repeating the strongest
 * idea. So this section carries no chart at all. It is type, at size, with one
 * drawn rule per line.
 *
 * It is also the one section on this page with no line that draws as you
 * scroll. Three of those already precede it, and a fourth would have been a
 * fourth variation on the same gesture however well it was done. What this
 * section has instead is a boundary that is simply *there* — one continuous
 * hairline running the height of the list, present from the first frame,
 * because a limit is not something that gets drawn while you watch.
 *
 * The assumptions are set against it from the left, flush to it, pressing on it.
 * The corrections sit on the other side. Nothing crosses. The strike travels
 * left to right and stops dead at the boundary, which is the whole argument
 * rendered as one small piece of timing.
 *
 * The assumptions are set in outline: transparent fill, hairline stroke, at
 * display size. That is the section's whole idea in one typographic move — the
 * thing people believe is literally hollow, and the correction underneath it is
 * the only solid text on the row. It also reuses a treatment the design system
 * already has (the outlined numerals in the homepage problem set) rather than
 * importing a new one. Guarded by @supports, so a browser without text-stroke
 * gets solid type instead of invisible type.
 *
 * The content is the reason the section exists. Buyers at this stage are about
 * to speak to a founder, and the gap between what a site claims and what a
 * salesperson says is where trust is lost. Naming the limits plainly, before
 * anybody has to ask, is the cheapest credibility available — and every line
 * here is a constraint the product genuinely has rather than a modest-sounding
 * way of restating a feature.
 *
 * Each assumption is struck through and answered underneath. The strike is not
 * decoration: the assumption is a real thing people believe about AI
 * underwriting, and it is being corrected.
 *
 * Without JS or with reduced motion every rule is already drawn across its
 * line, which is the finished state.
 */
export function BoundaryLines({ items, note }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const rows = gsap.utils.toArray(".bd-row", root);
      const cleanups = [];

      rows.forEach((row) => {
        const strike = row.querySelector(".bd-strike");
        const answer = row.querySelector(".bd-answer");

        // Populated before its trigger is attached — see control-boundary.jsx
        // for why an empty timeline with a trigger is unsafe here.
        //
        // The dim targets the text, not the line it sits on. Dimming the whole
        // claim took the strike down with it, because the strike is a child of
        // it — the one mark on the row that has to stay at full strength was
        // fading to 42% at exactly the moment it landed.
        const tl = gsap.timeline({ paused: true });
        // Origin is the left edge, so the strike travels toward the boundary and
        // stops on it rather than arriving from nowhere.
        tl.fromTo(strike, { scaleX: 0 }, { scaleX: 1, duration: 0.62, ease: "power2.inOut" }, 0);
        // A class rather than a tween, because what fades is the *stroke* on
        // hollow type and GSAP has no business interpolating that — CSS does it
        // on a transition, and the authored state stays correct without JS.
        tl.call(() => row.classList.add("is-struck"), null, 0.3);
        // Held until the strike has actually crossed the line. The answer is the
        // correction, and a correction that arrives mid-strike reads as two
        // unrelated things moving at once.
        tl.fromTo(
          answer,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.62, ease: "power3.out" },
          0.54,
        );

        const trigger = ScrollTrigger.create({ trigger: row, start: "top 82%", animation: tl });
        cleanups.push(() => { trigger.kill(); tl.kill(); });
      });

      return () => {
        rows.forEach((row) => row.classList.remove("is-struck"));
        cleanups.forEach((fn) => fn());
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div className="bd" ref={scope}>
      <ol className="bd-list">
        {items.map(({ claim, answer }, index) => (
          <li className="bd-row" key={claim}>
            <span className="hx-mono bd-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>

            <p className="bd-claim">
              <span className="bd-claim-text">{claim}</span>
              {/* Scaled from the left rather than drawn with a dash array, so it
                  stays a compositor transform on a full-width element. */}
              <span className="bd-strike" aria-hidden="true" />
            </p>

            <p className="bd-answer">{answer}</p>
          </li>
        ))}
      </ol>

      {note ? <p className="bd-note">{note}</p> : null}
    </div>
  );
}
