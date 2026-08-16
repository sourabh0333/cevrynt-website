"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const systems = [
  "Stripe",
  "Plaid",
  "Basis",
  "Fiserv",
  "Treasury Prime",
  "Equifax",
  "QuickBooks",
  "Xero",
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
          Underwriting files arrive from everywhere — bank portals, accounting exports, broker email,
          verification sources.
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
          Representative systems in the alternative-lending stack. Listing a system does not indicate a live
          integration, partnership, or endorsement.
        </p>
      </div>
    </section>
  );
}
