"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const systems = [
  "Chasing Docs",
  "Re-keying",
  "Cross-checking",
  "Missing Pages",
  "Duplicate Files",
  "Data Mismatches",
  "Follow-ups",
  "Waiting",
];

export function SystemsBar() {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const track = root.querySelector(".sb-track");
      if (!track) return undefined;

      // The track holds the set twice, so a -50% shift loops seamlessly.
      // startAt forces an immediate render so the track has a transform before the
      // first tick, which matters for pages that open in a background tab.
      const loop = gsap.to(track, {
        xPercent: -50,
        startAt: { xPercent: 0 },
        duration: 34,
        ease: "none",
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(1, 4, 1 + Math.abs(self.getVelocity()) / 1100);
          loop.timeScale(boost);
        },
      });
    });

    return () => media.revert();
  }, []);

  return (
    <section className="sb band-light" ref={scope}>
      <div className="eg sb-head">
        <span className="eg-rail hx-mono">01</span>
        <p className="eg-head t-eyebrow-lg">
          Most underwriting doesn't start with analysis. It starts with hunting for the file.
        </p>
      </div>

      <div className="sb-marquee">
        <div className="sb-track">
          {[...systems, ...systems].map((name, index) => (
            <span className="sb-item" key={`${name}-${index}`} aria-hidden={index >= systems.length}>
              {name}
            </span>
          ))}
        </div>
        <div className="sb-fade sb-fade-left" aria-hidden="true" />
        <div className="sb-fade sb-fade-right" aria-hidden="true" />
      </div>

      <div className="eg">
        <p className="eg-note hx-mono">
          A deal can be straightforward. Getting everything into a state where an underwriter can actually review it often isn’t. Cevrynt handles the work between receiving the file and understanding what’s really there.
        </p>
      </div>
    </section>
  );
}
