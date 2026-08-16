"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The pilot as a progress track rather than three numbered cards.
 *
 * Onboarding guidance is that a visible timeline with completion feedback
 * reduces the anxiety of committing to something — which is exactly the job
 * this section has to do. So each stage carries a plain-language marker
 * ("First call", "Before we start") instead of a number, a rail fills as you
 * scroll, and each check ticks in when its stage is reached.
 *
 * Checks are drawn as SVG strokes so they draw on rather than pop, and the
 * track ends on the lender's decision, not ours.
 */
export function PilotTimeline({ stages, close }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const steps = gsap.utils.toArray(".pt2-step", root);
      const fill = root.querySelector(".pt2-rail-fill");
      const checks = gsap.utils.toArray(".pt2-check-path", root);

      checks.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });

      steps.forEach((step, index) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: step, start: "top 84%", once: true } });
        tl.from(step.querySelector(".pt2-step-body"), { y: 26, autoAlpha: 0, duration: 0.68, ease: "power3.out" }, 0);
        tl.to(checks[index], { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, 0.2);
        tl.add(() => step.classList.add("is-done"), 0.2);
      });

      if (fill) {
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 78%", end: "bottom 74%", scrub: 0.5 },
          },
        );
      }
    });

    return () => media.revert();
  }, []);

  return (
    <div className="pt2" ref={scope}>
      <div className="pt2-track">
        <span className="pt2-rail" aria-hidden="true">
          <span className="pt2-rail-fill" />
        </span>

        <ol className="pt2-steps">
          {stages.map(({ marker, title, body }) => (
            <li className="pt2-step" key={title}>
              <span className="pt2-check" aria-hidden="true">
                <svg viewBox="0 0 26 26">
                  <circle className="pt2-check-ring" cx="13" cy="13" r="11" />
                  <path className="pt2-check-path" d="M7.5 13.4 11.2 17 18.5 9.5" />
                </svg>
              </span>

              <div className="pt2-step-body">
                <span className="hx-mono pt2-marker">{marker}</span>
                <h3 className="pt2-title">{title}</h3>
                <p className="pt2-text">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {close && (
        <p className="pt2-close">
          <span className="pt2-close-dot" aria-hidden="true" />
          {close}
        </p>
      )}
    </div>
  );
}
