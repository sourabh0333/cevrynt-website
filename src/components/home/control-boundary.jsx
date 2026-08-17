"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The boundary itself, drawn.
 *
 * This section is about a line Cevrynt does not cross, so the layout is that
 * line: what the software does on the left, what stays with the lender on the
 * right, and a rule down the middle that draws as you scroll. Each pair slides
 * in from its own side and stops at the divider — the motion is the argument.
 *
 * Split guidance says one column should explain and the other carry weight, so
 * the machine side is set quiet and the authority side is set solid.
 *
 * On mobile the divider disappears and each pair stacks in narrative order:
 * what Cevrynt does, then who decides.
 */
export function ControlBoundary({ rows }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add(
      { motionOk: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 861px)" },
      ({ conditions }) => {
        if (!conditions.motionOk) return undefined;

        const items = gsap.utils.toArray(".cb-row", root);
        const fill = root.querySelector(".cb-divider-fill");

        // Note on the row timelines below, which used to carry `once: true`.
        //
        // ScrollTrigger defers any trigger attached to a *timeline*. From its
        // own source: `if (animation && animation.add && !change)` sets
        // start = end = 0 and schedules the real refresh a tick later. So for
        // one tick every timeline-driven trigger on the page has no `end` —
        // whether or not the timeline has been populated.
        //
        // When another trigger is created in that window, its refresh() walks
        // the trigger list and force-refreshes every entry with a falsy `end`,
        // i.e. all of those. That forced update runs the trigger's callbacks,
        // and `once` responds by calling self.kill(), which splices the very
        // array the walk is still indexing. The next read returns undefined:
        // "Cannot read properties of undefined (reading 'end')".
        //
        // It only surfaced on a cold load because the kill only fires for a
        // trigger that already reads as fully past, and before images and fonts
        // land the document is short enough that a section this far down
        // computes both start and end above the current scroll. A warm reload
        // has the real layout, nothing is prematurely past, nothing kills
        // itself — which is why refreshing appeared to "fix" it.
        //
        // Dropping `once` removes the self-kill. These are one-way entrance
        // tweens, so re-entering only calls play() on an already-finished
        // timeline and nothing moves. The trigger now stays alive instead of
        // destroying itself, which is the entire behavioural difference.
        if (fill && conditions.wide) {
          gsap.set(fill, { scaleY: 0 });
          ScrollTrigger.create({
            trigger: root,
            start: "top 74%",
            end: "bottom 76%",
            onUpdate: (self) => {
              gsap.set(fill, { scaleY: self.progress });
              items.forEach((row, i) =>
                row.classList.toggle("is-lit", self.progress >= (i + 0.3) / items.length)
              );
            },
          });
        }

        items.forEach((row) => {
          const left = row.querySelector(".cb-machine");
          const right = row.querySelector(".cb-human");
          const node = row.querySelector(".cb-node");

          // Populated first, trigger attached after — see the note above.
          const tl = gsap.timeline({ paused: true });
          if (conditions.wide) {
            tl.fromTo(left, { x: -34, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.72, ease: "power3.out" }, 0);
            tl.fromTo(right, { x: 34, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.72, ease: "power3.out" }, 0);
          } else {
            tl.fromTo([left, right], { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.66, ease: "power3.out", stagger: 0.08 }, 0);
          }
          tl.fromTo(node, { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(2)" }, 0.24);
          ScrollTrigger.create({ trigger: row, start: "top 86%", animation: tl });
        });
      },
    );

    return () => media.revert();
  }, []);

  return (
    <div className="cb" ref={scope}>
      <div className="cb-heads" aria-hidden="true">
        <span className="hx-mono cb-head-machine">Cevrynt does</span>
        <span className="hx-mono cb-head-human">Your team decides</span>
      </div>

      <span className="cb-divider" aria-hidden="true">
        <span className="cb-divider-fill" />
      </span>

      <ol className="cb-list">
        {rows.map(({ topic, machine, human }) => (
          <li className="cb-row" key={topic}>
            <div className="cb-machine">
              <span className="hx-mono cb-topic">{topic}</span>
              <p>{machine}</p>
            </div>

            <span className="cb-node" aria-hidden="true" />

            <div className="cb-human">
              <p>{human}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="cb-foot hx-mono">
        Cevrynt is not a lender. It does not approve, decline, or price a deal.
      </p>
    </div>
  );
}
