"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * What moved when the file was re-run.
 *
 * The most differentiating material Cevrynt has: none of the comparable
 * products show a diff between analysis versions. So the transformation is the
 * change itself — each value rolls from its previous reading to its current
 * one, odometer-style, with the delta arriving after it lands.
 *
 * Audit-trail convention is to keep "the previous value preserved next to the
 * new one" rather than replacing it silently, so the earlier reading stays on
 * the card, greyed and labelled, after the roll. Nothing here is destroyed by
 * the update, which is the section's whole argument: the case updates, it does
 * not reset.
 *
 * Laid out as a grid rather than another stack of full-width planes — five
 * sections in, the rhythm needs to change, and the roll needs a compact box to
 * read as a mechanism rather than a slide.
 *
 * Both readings are real text in the markup, so with no JS or reduced motion
 * the card is simply a before and an after sitting together.
 */
export function ChangeRecord({ versions, summary, changes }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      root.dataset.rolling = "true";

      const track = root.querySelector(".rc-track-fill");
      const cards = gsap.utils.toArray(".rc-change", root);

      if (track) {
        gsap.from(track, {
          scaleX: 0,
          ease: "none",
          scrollTrigger: { trigger: root.querySelector(".rc-versions"), start: "top 84%", end: "top 52%", scrub: 0.6 },
        });
      }

      // One trigger per card so each rolls as it is reached, rather than the
      // whole grid firing off a single distant start.
      cards.forEach((card) => {
        const roll = card.querySelector(".rc-roll");
        const delta = card.querySelector(".rc-delta");
        const was = card.querySelector(".rc-was");

        const tl = gsap.timeline({ paused: true });
        tl.from(card, { y: 18, autoAlpha: 0, duration: 0.4, ease: "power3.out" }, 0);
        // The roll: two readings stacked in a clipped box, shifted by exactly
        // one reading's height so the previous leaves as the current arrives.
        tl.fromTo(roll, { yPercent: 0 }, { yPercent: -50, duration: 0.62, ease: "power3.inOut" }, 0.24);
        tl.from(was, { autoAlpha: 0, duration: 0.3, ease: "none" }, 0.6);
        tl.from(delta, { autoAlpha: 0, scale: 0.86, duration: 0.32, ease: "back.out(2.2)" }, 0.7);

        ScrollTrigger.create({ trigger: card, start: "top 88%", end: "top 58%", scrub: 0.6, animation: tl });
      });

      return () => {
        delete root.dataset.rolling;
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div className="rc" ref={scope}>
      <div className="rc-versions">
        <ol className="rc-track">
          <span className="rc-track-line" aria-hidden="true">
            <span className="rc-track-fill" />
          </span>
          {versions.map((version, index) => (
            <li className={`rc-version${index === versions.length - 1 ? " is-current" : ""}`} key={version.label}>
              <span className="hx-mono rc-version-label">{version.label}</span>
              <span className="rc-version-note">{version.note}</span>
            </li>
          ))}
        </ol>

        <ul className="rc-summary">
          {summary.map((item) => (
            <li className="hx-mono rc-summary-item" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <ol className="rc-changes">
        {changes.map((change) => (
          <li className="rc-change" key={change.name}>
            <span className="rc-name">{change.name}</span>

            {/* Clipped box holding both readings; the roll shifts it by one. */}
            <span className="rc-window">
              <span className="rc-roll">
                <span className="rc-reading rc-reading-prev">{change.from}</span>
                <span className="rc-reading rc-reading-now">{change.to}</span>
              </span>
            </span>

            <span className="rc-foot">
              <span className="hx-mono rc-was">was {change.from}</span>
              <span className={`hx-mono rc-delta${change.better ? " is-better" : ""}`}>{change.delta}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
