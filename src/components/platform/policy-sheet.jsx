"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The lender's policy, measured against — then overruled by a person.
 *
 * The category's own vocabulary for this layer is threshold-crossing: Alloy
 * describes rules that "flag activity that crosses a threshold", Taktile sells
 * "versioning, audit trails and approval controls" around "evolving thresholds
 * and human touch points". So the transformation here is measurement — each
 * meter fills to the observed value and lands relative to a fixed threshold
 * mark, and the outcome follows from where it stopped.
 *
 * The section is one large sheet rather than a stack of cards, because the
 * claim is that this is *your policy document*, applied as written. Every other
 * section on the page is built from separate planes; this one deliberately is
 * not, which is what keeps five sections from reading the same way.
 *
 * The override card overlaps the sheet's lower edge on purpose: a person acting
 * on top of the machine's output, recorded rather than quiet. It is written as
 * an audit line — who, what role, when, and why — which is the pattern audit
 * trails actually use.
 *
 * Direction matters and is shown, not implied: on a minimum rule a bar past the
 * mark passes, on a maximum rule the same bar fails, so each meter states which
 * it is.
 */
export function PolicySheet({ policy, summary, rules, override }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      root.dataset.measuring = "true";

      const fills = gsap.utils.toArray(".cl-fill", root);
      const marks = gsap.utils.toArray(".cl-mark", root);
      const outcomes = gsap.utils.toArray(".cl-outcome", root);
      const card = root.querySelector(".cl-override");

      // Populated before the trigger is attached — see control-boundary.jsx.
      const tl = gsap.timeline({ paused: true });
      tl.from(marks, { scaleY: 0, duration: 0.3, ease: "power2.out", stagger: 0.08 }, 0);
      // Each meter grows to its own observed width, which is set per element as
      // a custom property rather than animated from a shared value.
      tl.from(fills, { scaleX: 0, duration: 0.7, ease: "power2.out", stagger: 0.1 }, 0.12);
      tl.from(outcomes, { autoAlpha: 0, x: -8, duration: 0.34, ease: "power3.out", stagger: 0.1 }, 0.5);
      if (card) tl.from(card, { y: 26, autoAlpha: 0, duration: 0.5, ease: "power3.out" }, 0.85);

      ScrollTrigger.create({ trigger: root, start: "top 74%", end: "bottom 72%", scrub: 0.7, animation: tl });

      return () => {
        delete root.dataset.measuring;
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div className="cl" ref={scope}>
      <div className="cl-sheet">
        <div className="cl-sheet-head">
          <div>
            <p className="cl-policy-name">{policy.name}</p>
            <p className="hx-mono cl-policy-meta">{policy.meta}</p>
          </div>
          <ul className="cl-summary">
            {summary.map((stat) => (
              <li className={`cl-stat${stat.emphasis ? " is-emphasis" : ""}`} key={stat.label}>
                <span className="cl-stat-value">{stat.value}</span>
                <span className="hx-mono cl-stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <ol className="cl-rules">
          {rules.map((rule) => (
            <li className={`cl-rule${rule.exception ? " is-exception" : ""}`} key={rule.name}>
              <span className="cl-rule-name">{rule.name}</span>

              <span className="cl-observed">{rule.observed}</span>

              <span className="cl-meter">
                <span className="cl-track" />
                {/* The disallowed side of the mark, hatched. Without it every
                    bar crosses its threshold and pass reads identically to
                    exception apart from colour — which is also the wrong thing
                    to depend on. Now the bar visibly ends inside or outside the
                    zone, whichever direction the rule runs. */}
                <span className="cl-zone" data-dir={rule.direction} style={{ "--mark": `${rule.thresholdPct}%` }} />
                <span className="cl-fill" style={{ "--fill": `${rule.observedPct}%` }} />
                <span className="cl-mark" style={{ "--mark": `${rule.thresholdPct}%` }} />
                <span className="hx-mono cl-threshold" style={{ "--mark": `${rule.thresholdPct}%` }}>
                  {rule.threshold}
                </span>
              </span>

              <span className="hx-mono cl-outcome">{rule.exception ? "Exception" : "Pass"}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* A person, on top of the machine's output — written as an audit line. */}
      <aside className="cl-override">
        <span className="hx-mono cl-override-k">{override.kicker}</span>
        <p className="cl-override-line">
          <strong>{override.who}</strong> · {override.role} · {override.when}
        </p>
        <p className="cl-override-reason">{override.reason}</p>
        <span className="hx-mono cl-override-code">{override.code}</span>
      </aside>
    </div>
  );
}
