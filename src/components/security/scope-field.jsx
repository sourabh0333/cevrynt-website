"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/** Smoothstepped progress of `t` across [a, b]. */
const span = (t, a, b) => {
  const p = clamp01((t - a) / (b - a));
  return p * p * (3 - 2 * p);
};

/**
 * 01 Access, drawn at one mark per page.
 *
 * Four passes at this section drew the scope as a shape that stood for a
 * quantity — bars, a shelf, a pool of light — and none of those shapes was
 * measuring anything. The sections on this site that work do the opposite: the
 * gap between two paths is the count of policy disagreements, and a stack of
 * paper is exactly as tall as its page count. So this one is drawn at the only
 * resolution that cannot be argued with. Every mark below is one page of the
 * borrower package, in reading order: six of application, a hundred and twenty
 * of bank statements, two of identity, one of bank proof, fourteen of the
 * existing agreement. A hundred and forty-three, and the run of statements is
 * visibly most of the field because it genuinely is most of the file.
 *
 * The reach of a review is that field and nothing else, so the section counts
 * it. The figure climbs to 143 as the pages arrive, the marks sort into the
 * five documents the product identified, a boundary closes around them, and
 * then the figure falls back to nought as the review ends and the access with
 * it. Beside it the second figure — every page anywhere else — is nought
 * throughout and never moves, which is the whole claim in one number that
 * refuses to animate.
 *
 * One scrubbed value drives all of it, written to the container as --reveal and
 * --release. Each mark reads its own index against those, so a hundred and
 * forty-three marks cost two custom-property writes a frame rather than a
 * hundred and forty-three style writes, and the sort is a class with a CSS
 * transition rather than a tween.
 *
 * Server-rendered with the field complete, sorted and counted, which is what
 * ships without JavaScript and what reduced motion is given.
 */
export function ScopeField({ groups, total, closing }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const field = root.querySelector(".pg-field");
      const counter = root.querySelector(".pg-count-live");
      const bound = root.querySelector(".pg-bound-rect");
      const groupEls = gsap.utils.toArray(".pg-group", root);
      if (!field) return undefined;

      // Armed here rather than in the stylesheet, so the field ships finished.
      root.dataset.armed = "";

      const state = { t: 0 };
      let shown = -1;

      const apply = (t) => {
        const reveal = span(t, 0.06, 0.46) * total;
        const release = span(t, 0.84, 1) * total;

        field.style.setProperty("--reveal", reveal.toFixed(2));
        field.style.setProperty("--release", release.toFixed(2));

        // The pages that are in reach, right now.
        const live = Math.max(0, Math.round(reveal) - Math.round(release));
        if (counter && live !== shown) {
          shown = live;
          counter.textContent = String(live);
        }

        // Classified once they have all arrived, in the order they arrived.
        field.classList.toggle("is-sorted", t >= 0.5);

        // The boundary closes around them, and stays closed.
        if (bound) bound.style.strokeDashoffset = String(1 - span(t, 0.58, 0.78));

        groupEls.forEach((el, i) => {
          el.classList.toggle("is-dim", t < 0.52 + i * 0.02);
        });
      };

      const tween = gsap.to(state, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: field,
          start: "top 78%",
          end: "bottom 30%",
          scrub: 0.4,
          invalidateOnRefresh: true,
          onRefresh: () => apply(state.t),
        },
        onUpdate: () => apply(state.t),
      });

      apply(state.t);

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        delete root.dataset.armed;
        field.classList.remove("is-sorted");
        field.style.removeProperty("--reveal");
        field.style.removeProperty("--release");
        if (bound) bound.style.removeProperty("stroke-dashoffset");
        if (counter) counter.textContent = String(total);
        groupEls.forEach((el) => el.classList.remove("is-dim"));
      };
    });

    return () => media.revert();
  }, [total]);

  // One mark per page, in reading order, carrying the document it belongs to.
  const marks = [];
  groups.forEach((group, gi) => {
    for (let page = 0; page < group.pages; page += 1) marks.push(gi);
  });

  return (
    <figure className="pg" ref={scope}>
      <div className="pg-readout">
        <p className="pg-count">
          <span className="pg-count-n pg-count-live">{total}</span>
          <span className="pg-count-k hx-mono">pages in reach</span>
        </p>
        <span className="pg-readout-rule" aria-hidden="true" />
        <p className="pg-count pg-count-nil">
          <span className="pg-count-n">0</span>
          <span className="pg-count-k hx-mono">pages anywhere else</span>
        </p>
      </div>

      <div className="pg-field">
        <div
          className="pg-marks"
          role="img"
          aria-label={`The borrower package for this review, one mark per page: ${groups
            .map((g) => `${g.name}, ${g.pages} ${g.pages === 1 ? "page" : "pages"}`)
            .join("; ")}. ${total} pages in total.`}
        >
          {marks.map((gi, i) => (
            <span className="pg-mark" key={i} style={{ "--i": i }} data-g={gi} />
          ))}
        </div>

        {/* Closes around the package, and does not open again. */}
        <svg className="pg-bound" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 100">
          <rect
            className="pg-bound-rect"
            x="0.4"
            y="0.4"
            width="99.2"
            height="99.2"
            rx="1.2"
            pathLength="1"
          />
        </svg>
      </div>

      <ol className="pg-groups">
        {groups.map((group, i) => (
          <li className="pg-group" key={group.name} data-g={i}>
            <span className="pg-group-swatch" aria-hidden="true" />
            <span className="pg-group-name">{group.name}</span>
            <span className="pg-group-meta hx-mono">
              <span className="pg-group-range">pp. {group.range}</span>
              <span className="pg-group-pages">
                {group.pages} {group.pages === 1 ? "page" : "pages"}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <figcaption className="pg-closing hx-mono">{closing}</figcaption>
    </figure>
  );
}
