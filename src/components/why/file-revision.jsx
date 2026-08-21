"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** The export's own pixel space. */
const SHOT_W = 1600;
const SHOT_H = 760;

/**
 * What happens when the file changes.
 *
 * Every section before this argues the clean path: what a review leaves behind,
 * why reviewers diverge, whose policy decides. None shows the messy moment — and
 * the messy moment is what a lender actually tests before buying.
 *
 * The first attempt at this section put the product view across the top and two
 * columns of prose underneath it, which is the brochure pattern: the picture sat
 * there being looked at while the words did the work somewhere else. Worse, the
 * prose claimed the financial findings held — and the export directly above it
 * shows deposits, balance and NSF events all moving. The copy contradicted the
 * screenshot it was sitting under.
 *
 * So this does not describe the re-run. It performs it. The section is the delta
 * the product itself produces: every signal, its value at version one, its value
 * at version two, and what moved. As the version stamp flips, each figure counts
 * from its old value to its new one — motion that answers the only question this
 * section exists to answer, which is *what changed*. Nothing else on this page
 * animates a number, so the register is its own.
 *
 * Every figure here is read from the export rendered below it, so a reader can
 * find each one in the picture. That is the whole point of putting them
 * together, and it is why the numbers must not drift from the artwork.
 *
 * A real table, because this is genuinely tabular: two versions compared row by
 * row. The counting figure is hidden from assistive technology and the settled
 * value is exposed beside it, so a screen reader is never handed a number caught
 * mid-tween.
 *
 * Without JS or with reduced motion every figure is already at its version-two
 * value, which is the conclusion.
 */
export function FileRevision({ versions, rows, shot, note }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const stamps = gsap.utils.toArray(".fr-stamp", root);
      const trs = gsap.utils.toArray(".fr-row", root);
      const frame = root.querySelector(".fr-frame");

      root.dataset.armed = "";
      // Set explicitly rather than inherited from the markup. An effect cleanup
      // strips it, and React runs mount/cleanup/mount in development — after
      // which neither stamp was live, because nothing re-asserted the authored
      // state on the way back in.
      stamps.forEach((s, i) => s.classList.toggle("is-live", i === 0));

      let flipped = false;
      let frameOpen = false;
      const rolled = trs.map(() => false);
      const state = { t: 0 };

      /** Counts one figure from its previous value to its current one. */
      const roll = (row) => {
        const el = row.querySelector(".fr-num");
        if (!el) return;
        const from = Number(el.dataset.from);
        const to = Number(el.dataset.to);
        const decimals = Number(el.dataset.decimals || 0);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const settled = el.dataset.settled || el.textContent;
        if (!Number.isFinite(from) || !Number.isFinite(to)) return;

        const proxy = { v: from };
        el.textContent = prefix + from.toFixed(decimals) + suffix;
        gsap.to(proxy, {
          v: to,
          duration: 0.62,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = prefix + proxy.v.toFixed(decimals) + suffix;
          },
          // Restored from the authored string rather than from the tween, so
          // rounding can never leave a figure a hair off what the export says.
          onComplete: () => {
            el.textContent = settled;
          },
        });
      };

      const apply = (t) => {
        // The version flips first. Everything after is a consequence of it.
        if (!flipped && t >= 0.16) {
          flipped = true;
          stamps.forEach((s, i) => s.classList.toggle("is-live", i === 1));
        }

        trs.forEach((row, i) => {
          if (rolled[i]) return;
          if (t < 0.24 + i * 0.07) return;
          rolled[i] = true;
          row.classList.add("is-on");
          roll(row);
        });

        // The proof arrives last: the same re-run as the product renders it.
        if (frame && !frameOpen) {
          const open = gsap.utils.clamp(0, 1, (t - 0.62) / 0.3);
          gsap.set(frame, { clipPath: `inset(0% 0% ${(1 - open) * 100}% 0%)` });
          if (open >= 1) frameOpen = true;
        }
      };

      const tween = gsap.to(state, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          end: "bottom 86%",
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
        trs.forEach((row) => row.classList.remove("is-on"));
        // Back to the authored state, not to no state at all.
        stamps.forEach((s, i) => s.classList.toggle("is-live", i === 0));
        if (frame) frame.style.clipPath = "";
      };
    });

    return () => media.revert();
  }, [rows]);

  return (
    <figure className="fr" ref={scope}>
      {/* Which pass you are looking at. The flip is the section's first move. */}
      <ol className="fr-versions">
        {versions.map((version, index) => (
          <li className={`fr-stamp${index === 0 ? " is-live" : ""}`} key={version.label}>
            <span className="hx-mono fr-stamp-label">{version.label}</span>
            <span className="fr-stamp-note">{version.note}</span>
          </li>
        ))}
      </ol>

      <table className="fr-delta">
        {/* Declared here so the fixed layout has real widths to honour. */}
        <colgroup>
          <col className="fr-c-signal" />
          <col className="fr-c-was" />
          <col className="fr-c-now" />
          <col className="fr-c-moved" />
        </colgroup>
        <caption className="sr-only">
          Signals recomputed between analysis version one and version two, with the change to each.
        </caption>
        <thead>
          <tr>
            <th scope="col">Signal</th>
            <th scope="col">{versions[0].short}</th>
            <th scope="col">{versions[1].short}</th>
            <th scope="col">Moved</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="fr-row" key={row.signal}>
              <th scope="row" className="fr-signal">{row.signal}</th>
              <td className="fr-prev">{row.was}</td>
              <td className="fr-next">
                <span
                  className="fr-num"
                  aria-hidden="true"
                  data-from={row.from}
                  data-to={row.to}
                  data-decimals={row.decimals || 0}
                  data-prefix={row.prefix || ""}
                  data-suffix={row.suffix || ""}
                  data-settled={row.now}
                >
                  {row.now}
                </span>
                <span className="sr-only">{row.now}</span>
              </td>
              <td className={`fr-moved${row.tone ? ` is-${row.tone}` : ""}`}>{row.moved}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fr-shot">
        <div className="fr-frame">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={SHOT_W}
            height={SHOT_H}
            sizes="(max-width: 900px) 92vw, 1180px"
            loading="lazy"
          />
        </div>
        <p className="hx-mono fr-caption">{shot.caption}</p>
      </div>

      {note ? <p className="fr-note">{note}</p> : null}
    </figure>
  );
}
