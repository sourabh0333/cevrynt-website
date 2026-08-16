"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Words illuminate in step with scroll position. Every word ships as real text
 * and the CSS default is fully lit, so the sentence reads normally without JS.
 */
export function ScrubStatement({ text, className = "" }) {
  const scope = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      // fromTo, not to: GSAP cannot read a custom property's start value off the
      // cascade, and a bare to() snaps every word lit before the scrub engages.
      gsap.fromTo(
        ".ss-word",
        { "--lit": 0 },
        {
          "--lit": 1,
          ease: "none",
          stagger: 1,
          scrollTrigger: { trigger: root, start: "top 82%", end: "bottom 66%", scrub: 0.5 },
        },
      );
    });

    return () => media.revert();
  }, []);

  return (
    <p className={`ss-copy ${className}`} ref={scope}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="ss-word">{word}</span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}
