"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * Two streams converging on one question.
 *
 * The heading says "two teams, one merchant-underwriting question", so the
 * section draws exactly that: a lane from each side merging into a single lit
 * node that holds the question. It replaces a large white logo plate, which
 * dominated the band and said nothing beyond "two companies exist".
 *
 * Deliberately a shared *question*, not a pipeline — a flow diagram of merchant
 * data moving into underwriting would imply a live integration and automatic
 * data sharing, which this partnership is not.
 *
 * Both marks are dark artwork on transparent backgrounds, so on this deep band
 * they need light behind them. A soft fade-out lens was tried and read as a
 * smudge against a page otherwise built from flat surfaces, so each mark sits
 * on a plain cool-white plate in the site's own background token instead.
 *
 * Neither logo is recoloured, cropped or reshaped, and both plates are the same
 * size so neither company outweighs the other.
 */
export function PartnerQuestion({ question, scope, href }) {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const lanes = gsap.utils.toArray(".pq-lane", el);
      const marks = gsap.utils.toArray(".pq-mark", el);
      const paths = gsap.utils.toArray(".pq-path", el);
      const node = el.querySelector(".pq-node");
      const card = el.querySelector(".pq-question");
      const items = gsap.utils.toArray(".pq-scope-item", el);

      paths.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });

      // Populated before its trigger is attached — see control-boundary.jsx.
      const tl = gsap.timeline({ paused: true });
      tl.from(lanes, { x: -26, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 }, 0);
      tl.from(marks, { scale: 0.94, duration: 0.86, ease: "power3.out", stagger: 0.12 }, 0.05);
      tl.to(paths, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 0.28);
      tl.from(node, { scale: 0, autoAlpha: 0, duration: 0.55, ease: "back.out(2.4)" }, 0.95);
      tl.from(card, { x: 26, autoAlpha: 0, duration: 0.72, ease: "power3.out" }, 1.02);
      tl.from(items, { y: 16, autoAlpha: 0, duration: 0.56, ease: "power3.out", stagger: 0.08 }, 1.2);
      ScrollTrigger.create({ trigger: el, start: "top 74%", animation: tl });
    });

    return () => media.revert();
  }, []);

  return (
    <div className="pq" ref={root}>
      <div className="pq-merge">
        <div className="pq-lanes">
          <div className="pq-lane">
            <span className="pq-mark">
              <Image src="/brand/shopline-logo.png" alt="SHOPLINE" width={768} height={269} loading="lazy" sizes="(max-width: 860px) 34vw, 200px" />
            </span>
            <span className="hx-mono pq-lane-note">Commerce platform</span>
          </div>

          <div className="pq-lane">
            <span className="pq-mark">
              <Image src="/brand/cevrynt-logo-v2.png" alt="Cevrynt" width={1029} height={366} loading="lazy" sizes="(max-width: 860px) 34vw, 200px" />
            </span>
            <span className="hx-mono pq-lane-note">Underwriting infrastructure</span>
          </div>
        </div>

        {/* Two draw-in paths, plus two dashes that keep travelling toward the
            node — the only continuous motion in the band, and it is switched
            off for reduced motion and coarse pointers. */}
        <svg className="pq-wires" viewBox="0 0 130 220" preserveAspectRatio="none" aria-hidden="true">
          <path className="pq-path" d="M0 46 C 68 46, 62 110, 130 110" />
          <path className="pq-path" d="M0 174 C 68 174, 62 110, 130 110" />
          <path className="pq-flow" d="M0 46 C 68 46, 62 110, 130 110" />
          <path className="pq-flow pq-flow-b" d="M0 174 C 68 174, 62 110, 130 110" />
        </svg>

        {/* No "The shared question" label here any more: the heading already
            says "one merchant-underwriting question", and two lanes visibly
            merging into one lit node says it a second time. A third statement
            in words was just noise around the focal point. */}
        <div className="pq-question">
          <span className="pq-node" aria-hidden="true" />
          <p className="pq-question-text">{question}</p>
        </div>
      </div>

      {/* Was two text columns of equal weight side by side — a bulleted list
          against a block of small print — with nothing telling the eye which to
          read first. Now it descends: scope across the full width, then the
          fine print and the link as one quiet closing row. */}
      <div className="pq-foot">
        <ul className="pq-scope">
          {scope.map((item) => (
            <li className="pq-scope-item" key={item}>{item}</li>
          ))}
        </ul>

        <div className="pq-fine">
          {/* The lede above already calls this "a documented development and
              referral partnership", so that sentence is not repeated here.
              Every required negation is kept. */}
          <p className="pq-limits">
            Development and referral partnership. Product availability, data access and underwriting workflows depend on implementation, merchant authorization, applicable permissions, lender requirements and market availability. Cevrynt is not a lender and does not guarantee approval or funding.
          </p>
          <Link className="pq-link" href={href}>
            Explore e-commerce merchant underwriting <ArrowUpRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
