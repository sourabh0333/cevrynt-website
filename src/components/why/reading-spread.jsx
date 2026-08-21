"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** The export's own pixel space. Anchors are authored in it, so the overlay
 *  lines up with the artwork at any rendered size. */
const SHOT_W = 1600;
const SHOT_H = 760;

/**
 * Four readings of one page, gathering onto a single thread.
 *
 * This section used to be four sine curves that started wide and converged. The
 * wobble was literally `Math.sin` — nothing in it corresponded to anything, so
 * it asserted "alignment" as a shape without ever saying what was being
 * aligned, and the marks underneath were left doing all the explaining. Its
 * replacement was four horizontal coverage lanes, which was truthful but was
 * the same geometry as the section above it: both were stacked horizontal
 * tracks with segments drawn across a width, so the two read as duplicates
 * rather than as a pair.
 *
 * This one is built to run the other way round from that section in every
 * respect that matters. That one is wide, sparse, on a light band, and sweeps
 * left to right as one whole thing comes apart over six months. This one is
 * centred, dense, on a deep band, anchored to a real product export, and
 * gathers four separate readings inward onto one. Same vocabulary — hairlines,
 * mono micro-labels, rail green for Cevrynt, the secondary reserved for what
 * survives — opposite motion.
 *
 * The argument is carried by the artwork rather than by an abstraction. Every
 * anchor sits on something genuinely in the export: the headline deposit
 * average, the original statement line it was read from, the recurring daily
 * debit, and the page-and-line reference behind it. Four underwriters keying on
 * four different real things in one file is why they arrive at four different
 * answers, and each of those four is a perfectly reasonable thing to have
 * looked at. None of them is the whole page.
 *
 * Then the thread draws through all four. That is the only claim being made:
 * everyone is now working from the same four signals. It deliberately does not
 * merge the four reviewers into one — the closing note says so in words, and
 * the four markers stay four.
 *
 * Without JS or with reduced motion every marker is showing and the thread is
 * drawn, which is the conclusion.
 */
export function ReadingSpread({ shot, anchors, marks, note }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const frame = root.querySelector(".rv-frame");
      const nodes = gsap.utils.toArray(".rv-node", root);
      const rows = gsap.utils.toArray(".rv-row", root);
      const thread = root.querySelector(".rv-thread");
      const stageEls = gsap.utils.toArray(".rv-mark", root);

      const threadLen = thread ? thread.getTotalLength() : 0;
      if (thread) {
        thread.style.strokeDasharray = String(threadLen);
        thread.style.strokeDashoffset = String(threadLen);
      }

      gsap.set(nodes, { autoAlpha: 0, scale: 0.4, transformOrigin: "center" });
      if (frame) gsap.set(frame, { clipPath: "inset(0% 0% 100% 0%)" });

      const shownRow = rows.map(() => false);
      let shownStage = -1;
      let frameOpen = false;
      let threadDrawn = 0;
      const state = { t: 0 };

      const apply = (t) => {
        // Act one: the page itself, wiped open from the top. Latched once fully
        // open — a screenshot that un-wipes on an upward nudge reads as a
        // rendering glitch, not as a scrub.
        if (frame && !frameOpen) {
          const open = gsap.utils.clamp(0, 1, t / 0.26);
          gsap.set(frame, { clipPath: `inset(0% 0% ${(1 - open) * 100}% 0%)` });
          if (open >= 1) frameOpen = true;
        }

        // Act two: one reviewer at a time. Each marker and its row arrive
        // together, so the reader watches four different people key on four
        // different things rather than being shown that they did.
        //
        // Latched, like the policy section further down. Assigned in both
        // directions these switched back off on the smallest upward movement —
        // a 90px trackpad bounce took the markers from three to one and back —
        // which reads as the section resetting rather than as a scrub. Only the
        // thread below still runs both ways, because a line being drawn and
        // undrawn is legible either direction.
        nodes.forEach((node, i) => {
          if (shownRow[i]) return;
          if (t < 0.3 + i * 0.1) return;
          shownRow[i] = true;
          gsap.to(node, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.42,
            ease: "back.out(2)",
            overwrite: true,
          });
          rows[i]?.classList.remove("is-dim");
        });

        // Act three: the thread through all four. This is the gather, and it is
        // the only place the secondary appears.
        // Monotonic, for the same reason the markers are: the thread joins four
        // latched markers, so a thread that retracts leaves them unconnected.
        if (thread) {
          const reach = gsap.utils.clamp(0, 1, (t - 0.72) / 0.24);
          const drawn = reach > threadDrawn ? reach : threadDrawn;
          threadDrawn = drawn;
          thread.style.strokeDashoffset = String(threadLen * (1 - drawn));
        }

        const stage = t > 0.86 ? 3 : t > 0.6 ? 2 : t > 0.28 ? 1 : 0;
        if (stage <= shownStage) return;
        shownStage = stage;
        stageEls.forEach((el, i) => {
          if (i <= stage) el.classList.remove("is-dim");
        });
      };

      const tween = gsap.to(state, {
        t: 1,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top 78%", end: "bottom 82%", scrub: 0.6 },
        onUpdate: () => apply(state.t),
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        if (thread) {
          thread.style.strokeDasharray = "";
          thread.style.strokeDashoffset = "";
        }
        if (frame) frame.style.clipPath = "";
      };
    });

    return () => media.revert();
  }, [anchors]);

  const threadPath = anchors
    .map((a, i) => `${i === 0 ? "M" : "L"} ${a.x} ${a.y}`)
    .join(" ");

  return (
    <figure className="rv" ref={scope}>
      <div className="rv-stage">
        <div className="rv-shot">
          <div className="rv-frame">
            <Image
              src={shot.src}
              alt={shot.alt}
              width={SHOT_W}
              height={SHOT_H}
              sizes="(max-width: 900px) 92vw, 56vw"
              loading="lazy"
            />

            {/* Authored in the export's own pixel space, so a marker stays on the
                value it points at whatever the rendered width. */}
            <svg
              className="rv-overlay"
              viewBox={`0 0 ${SHOT_W} ${SHOT_H}`}
              aria-hidden="true"
            >
              <path className="rv-thread" d={threadPath} fill="none" />

              {anchors.map((anchor) => (
                <g className="rv-node" key={anchor.key}>
                  <circle className="rv-node-halo" cx={anchor.x} cy={anchor.y} r="26" />
                  <circle className="rv-node-dot" cx={anchor.x} cy={anchor.y} r="17" />
                  <text className="rv-node-key" x={anchor.x} y={anchor.y + 7}>
                    {anchor.key}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <p className="hx-mono rv-shot-note">{shot.caption}</p>
        </div>

        <ol className="rv-list">
          {anchors.map((anchor) => (
            <li className="rv-row" key={anchor.key}>
              <span className="hx-mono rv-row-key" aria-hidden="true">{anchor.key}</span>
              <span className="rv-row-body">
                <span className="rv-row-read">{anchor.read}</span>
                <span className="rv-row-at">{anchor.at}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <p className="rv-marks">
        {marks.map((mark) => (
          <span className="hx-mono rv-mark" key={mark}>
            {mark}
          </span>
        ))}
      </p>

      {note ? <p className="rv-note">{note}</p> : null}
    </figure>
  );
}
