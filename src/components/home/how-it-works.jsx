"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@/components/icons";
import { stageFigures } from "@/components/home/stage-figures";
import { ProductShot } from "@/components/home/product-shot";

gsap.registerPlugin(ScrollTrigger);

/**
 * Vertical scrollytelling: the figure column pins while stages scroll past it.
 * Sticky positioning does the pinning, so keyboard paging and zoom keep working
 * and there is no horizontal scroll to trap focus.
 */
export function HowItWorks({ deal, workflow, stages }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const steps = gsap.utils.toArray(".hw-step", root);
      const figures = gsap.utils.toArray(".hw-figure", root);
      const marks = gsap.utils.toArray(".hw-mark", root);
      const counter = root.querySelector(".hw-count-now");
      const stageLabel = root.querySelector(".hw-stage-label");

      const activate = (index) => {
        figures.forEach((f, i) => f.classList.toggle("is-live", i === index));
        steps.forEach((s, i) => s.classList.toggle("is-live", i === index));
        marks.forEach((m, i) => m.classList.toggle("is-done", i <= stages[index].markUpTo));
        if (counter) counter.textContent = String(index + 1).padStart(2, "0");
        if (stageLabel) stageLabel.textContent = stages[index].title;
      };

      steps.map((step, index) =>
        ScrollTrigger.create({
          trigger: step,
          start: "top 58%",
          end: "bottom 58%",
          onEnter: () => activate(index),
          onEnterBack: () => activate(index),
        }),
      );

      const rail = root.querySelector(".hw-rail-fill");
      if (rail) {
        gsap.fromTo(
          rail,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".hw-steps", start: "top 62%", end: "bottom 62%", scrub: 0.4 },
          },
        );
      }
    });

    return () => media.revert();
  }, [stages]);

  return (
    <section className="hw band-light" ref={scope} aria-labelledby="how-heading">
      <div className="eg hw-head">
        <span className="eg-rail hx-mono">02</span>
        <div className="eg-head">
          <p className="hx-kicker">How it works</p>
          <h2 className="t-display-2" id="how-heading">
            One file, walked from intake to a decision that can be retraced.
          </h2>
        </div>
        <p className="eg-lede t-lede">
          Each stage hands the next one structured evidence instead of a fresh pile of PDFs. Nothing is
          discarded along the way.
        </p>
      </div>

      <div className="eg hw-body">
        <div className="hw-figures">
          <div className="hw-figure-sticky">
            <div className="hw-panel">
              <div className="hw-panel-top">
                <span className="hx-mono">{deal}</span>
                <span className="hx-mono hw-count">
                  <span className="hw-count-now">01</span> / 05
                </span>
              </div>

              <p className="hw-stage-now">
                <span className="hw-stage-label">{stages[0].title}</span>
              </p>

              <ol className="hw-marks" aria-hidden="true">
                {workflow.map((step, index) => (
                  <li className={`hw-mark${index <= stages[0].markUpTo ? " is-done" : ""}`} key={step} title={step}>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div className="hw-figure-stack">
                {stages.map((stage, index) => {
                  const Figure = stageFigures[stage.figure];
                  return (
                    <div className={`hw-figure${index === 0 ? " is-live" : ""}`} key={stage.title}>
                      {stage.image ? (
                        // The crossfade between stages is the effect here, so the
                        // shot brings its frame but not its own scroll motion.
                        <ProductShot
                          src={stage.image}
                          alt={stage.imageAlt}
                          width={1200}
                          height={900}
                          label={stage.title}
                          aspect="16 / 10"
                          sizes="(max-width: 900px) 92vw, 560px"
                          motion={false}
                          parallax={false}
                        />
                      ) : (
                        <Figure />
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="hw-panel-note">Illustrative workspace. Not real borrower data.</p>
            </div>
          </div>
        </div>

        <div className="hw-steps">
          <div className="hw-rail" aria-hidden="true">
            <span className="hw-rail-fill" />
          </div>

          {stages.map((stage, index) => (
            <article className={`hw-step${index === 0 ? " is-live" : ""}`} key={stage.title}>
              <span className="hx-mono hw-step-index">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="t-h3">{stage.title}</h3>
              <p className="t-body">{stage.body}</p>
              <Link className="hw-step-link" href={stage.href}>
                Explore capability <ArrowUpRight />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
