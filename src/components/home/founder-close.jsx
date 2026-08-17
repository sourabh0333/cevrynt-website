"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@/components/icons";
import { RevealLines } from "@/components/home/reveal-lines";
import { Magnetic, PointerField } from "@/components/home/fx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * The closing walkthrough section.
 *
 * Same content as before — index, kicker, heading, lede, Calendly CTA, email —
 * rebuilt as a composed ending rather than another left-aligned block. Every
 * other section on this page hangs off the same 12-column rule with its index
 * in column one; this one centres, which is what makes it read as the end of
 * the page instead of a fifteenth entry in the list.
 *
 * The structure is drawn rather than decorated: a drop rule falls from the
 * index into the heading, and a long rule opens outward from the centre beneath
 * the actions, closing the page the way a printed piece closes a spread. Both
 * are scaled from zero, so they cost a transform each.
 *
 * The only continuous effect is a soft light that follows the pointer across
 * the band, matching the single follower the hero uses at the top of the page —
 * the beginning and the end respond the same way. It is delegated through
 * PointerField, so it is one listener writing two custom properties, and it is
 * skipped outright on coarse pointers.
 */
export function FounderClose({ calendlyUrl, email, heading, kicker, lede, index }) {
  const scope = useRef(null);

  useGSAP(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      // Populated before its trigger is attached — see control-boundary.jsx.
      const tl = gsap.timeline({ paused: true });

      tl.from(root.querySelector(".fn-index"), { y: 14, autoAlpha: 0, duration: 0.5, ease: "power3.out" }, 0);
      tl.from(root.querySelector(".fn-drop"), { scaleY: 0, duration: 0.7, ease: "power3.inOut" }, 0.12);
      tl.from(root.querySelector(".fn-kicker"), { y: 14, autoAlpha: 0, duration: 0.52, ease: "power3.out" }, 0.34);

      // The heading runs its own line-mask reveal, so it is left alone here.
      tl.from(root.querySelector(".fn-lede"), { y: 18, autoAlpha: 0, duration: 0.6, ease: "power3.out" }, 0.72);
      tl.from(root.querySelector(".fn-actions"), { y: 20, autoAlpha: 0, duration: 0.66, ease: "power3.out" }, 0.84);
      tl.from(root.querySelector(".fn-rule"), { scaleX: 0, duration: 1.05, ease: "power3.inOut" }, 0.92);
      ScrollTrigger.create({ trigger: root, start: "top 76%", animation: tl });

      return () => tl.kill();
    });

    return () => media.revert();
  }, []);

  return (
    <PointerField selector=".fn-stage" className="fn-field">
      <div className="fn-stage" ref={scope}>
        <div className="fn-aura" aria-hidden="true" />

        <div className="fn-inner">
          <span className="hx-mono fn-index">{index}</span>
          <span className="fn-drop" aria-hidden="true" />

          <p className="hx-kicker fn-kicker">{kicker}</p>

          <RevealLines as="h2" className="t-display-1 fn-title" id="cta-heading" text={heading} />

          <p className="t-lede fn-lede">{lede}</p>

          <div className="fn-actions">
            <Magnetic>
              <a className="primary-cta" href={calendlyUrl} target="_blank" rel="noreferrer">
                Book on Calendly
                <span>
                  <ArrowUpRight />
                </span>
              </a>
            </Magnetic>
            <a className="fn-secondary" href={`mailto:${email}`}>
              {email} <ArrowUpRight />
            </a>
          </div>

          <span className="fn-rule" aria-hidden="true" />
        </div>
      </div>
    </PointerField>
  );
}
