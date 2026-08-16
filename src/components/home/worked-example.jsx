"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ticker } from "@/components/home/fx";

gsap.registerPlugin(ScrollTrigger);

/**
 * The audit trail as a ledger: one row per canonical workflow stage, filling in
 * as the section scrolls. Deliberately reads like a record rather than a card
 * grid, because that is what the product actually produces.
 */
export function WorkedExample({ deal, entries }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const rows = gsap.utils.toArray(".we-row", root);
      const meter = root.querySelector(".we-meter-fill");

      rows.map((row) =>
        ScrollTrigger.create({
          trigger: row,
          start: "top 84%",
          once: true,
          onEnter: () => row.classList.add("is-in"),
        }),
      );

      if (meter) {
        gsap.fromTo(
          meter,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: ".we-ledger", start: "top 76%", end: "bottom 80%", scrub: 0.5 },
          },
        );
      }
    });

    return () => media.revert();
  }, []);

  return (
    <div className="we" ref={scope}>
      <div className="we-topline">
        <span className="hx-mono">{deal}</span>
        <span className="hx-mono we-topline-end">Human review required</span>
      </div>

      <div className="we-meter" aria-hidden="true">
        <span className="we-meter-fill" />
      </div>

      <table className="we-ledger">
        <caption className="sr-only">
          Illustrative audit trail for one deal, from intake through human decision
        </caption>
        <thead>
          <tr>
            <th scope="col">Stage</th>
            <th scope="col">What happened</th>
            <th scope="col">Evidence</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([stage, what, evidence], index) => (
            <tr className="we-row" key={stage} style={{ "--row": index }}>
              <th scope="row">
                <span className="hx-mono we-row-index">{String(index + 1).padStart(2, "0")}</span>
                {stage}
              </th>
              <td>{what}</td>
              <td className="we-evidence hx-mono">
                <Ticker value={evidence} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="we-note">
        Illustrative only. Figures do not represent a real borrower, and no funding outcome is implied.
      </p>
    </div>
  );
}
