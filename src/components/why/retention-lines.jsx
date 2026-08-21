"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Lane geometry, in each lane SVG's own units. The lane is stretched to the
 *  column width, so only the vertical numbers here are real pixels. */
const LANE_W = 1000;
const LANE_H = 46;
const TRACK_Y = [11, 23, 35];
const TICK = 6;
/** The visible break at the moment a track stops. Without it the tick and the
 *  remnant butt against the solid line, and the loss reads as a change of
 *  texture rather than as something ending. */
const BREAK = 7;

/**
 * Five things a review leaves behind, each on its own timeline, with a playhead
 * running the whole stack.
 *
 * The version before this was a step chart whose y-axis was an abstract count:
 * a reader could see that one approach ends on two and another on five, and had
 * no way to tell *which* two. That is the most persuasive part of the argument,
 * and it was the part the chart could not show.
 *
 * So the five things are named, and each gets its own lane across the same six
 * months. Every lane carries the same three tracks in the same order, so after
 * the key, vertical position alone identifies an approach — and they are graded
 * light to heavy, which is also the order of how much each one keeps.
 *
 * The motion is a single playhead sweeping left to right across all five lanes
 * at once. That is what makes the axis physical: tracks are not merely revealed
 * already broken, they are cut as the playhead reaches them, so the reader
 * watches a workflow lose things rather than being shown that it did. Period
 * rules run the full height of the stack behind it, giving the sweep structure
 * to move against.
 *
 * Everything here starts whole and comes apart. The section that follows runs
 * the other way — four separate readings gathering onto one page — so the two
 * share a vocabulary without repeating a shape.
 *
 * A track runs while its approach can still produce that thing without
 * rebuilding the file, breaks on a tick, and continues as a dotted remnant for
 * the rest of the period: the information did not evaporate, it stopped being
 * retrievable, and a bare gap would read as a rendering fault rather than a
 * loss.
 *
 * The claim stays exactly as narrow as it was: still held *without rebuilding
 * the file*. That is a property of where an approach keeps its work, not a
 * benchmark about anybody's performance, and the alternatives are approaches
 * rather than named products.
 *
 * Without JS or with reduced motion every track is drawn to its own end, every
 * remnant is showing and the playhead is parked at the right — month six, which
 * is the conclusion.
 */
export function RetentionLines({ periods, approaches, artefacts, note }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const clock = root.querySelector(".ln-clock");
      const counts = gsap.utils.toArray(".ln-score-value", root);
      const head = root.querySelector(".ln-head-line");
      const headTrack = root.querySelector(".ln-head");

      // Scoped to the lanes: the key above draws sample strokes with the same
      // class, and they carry no stop of their own to be driven by.
      // Lengths are measured in *screen* space, not user units. These lanes are
      // stretched horizontally (a 1000-unit viewBox rendered wider) and carry
      // `vector-effect: non-scaling-stroke`, which makes the browser compute the
      // dash pattern in screen space as well. Handing it `getTotalLength()` — a
      // user-unit figure — set a dash shorter than the line it had to cover, so
      // the last ~5% of every track fell into the gap and never painted. It read
      // as each line stopping just short of its own tick.
      const tracks = gsap.utils.toArray(".ln-lane-plot .ln-held", root).map((line) => ({
        line,
        userLen: line.getTotalLength(),
        stop: Number(line.dataset.stop),
        dash: 0,
      }));

      /** Re-measured on refresh: the horizontal scale changes with width. */
      const measureTracks = () => {
        for (const track of tracks) {
          const svg = track.line.ownerSVGElement;
          const box = svg?.getBoundingClientRect();
          const vb = svg?.viewBox.baseVal;
          const xScale = box?.width && vb?.width ? box.width / vb.width : 1;
          // A pixel of slack, so rounding can never leave a hairline unpainted.
          track.dash = track.userLen * xScale + 1;
          track.line.style.strokeDasharray = String(track.dash);
          track.line.style.strokeDashoffset = String(track.dash);
        }
      };
      measureTracks();

      const marks = gsap.utils.toArray(".ln-stopmark", root).map((mark) => ({
        mark,
        stop: Number(mark.dataset.stop),
      }));
      const remnants = gsap.utils.toArray(".ln-gone", root).map((line) => ({
        line,
        stop: Number(line.dataset.stop),
      }));

      gsap.set([...marks.map((m) => m.mark), ...remnants.map((r) => r.line)], { autoAlpha: 0 });

      // The playhead travels in pixels along its own track, so the distance has
      // to be re-measured whenever the column resizes. It is authored parked at
      // `left: 100%`; re-anchor it to the left edge now that something is going
      // to drive it, or the pixel offsets below would be measured from the far
      // end of the track.
      if (head) head.style.left = "0px";
      let travel = headTrack ? headTrack.clientWidth : 0;

      let shownPeriod = -1;
      const shownCount = counts.map(() => -1);
      const state = { t: 0 };

      const apply = (t) => {
        // Every lane advances on the same clock, so all five read the same
        // instant at any point in the scroll. Each track is drawn against its
        // own stop rather than against the full width, so a track that ends at
        // month two is complete when the playhead gets there.
        for (const track of tracks) {
          const drawn = track.stop > 0 ? Math.min(t, track.stop) / track.stop : 1;
          track.line.style.strokeDashoffset = String(track.dash * (1 - drawn));
        }

        for (const { mark, stop } of marks) {
          const on = t >= stop;
          if ((mark.dataset.on === "true") === on) continue;
          mark.dataset.on = String(on);
          gsap.to(mark, { autoAlpha: on ? 1 : 0, duration: 0.26, ease: "none", overwrite: true });
        }

        for (const { line, stop } of remnants) {
          const on = t >= stop;
          if ((line.dataset.on === "true") === on) continue;
          line.dataset.on = String(on);
          gsap.to(line, { autoAlpha: on ? 1 : 0, duration: 0.42, ease: "none", overwrite: true });
        }

        if (head) gsap.set(head, { x: travel * t });

        // The running totals are the punchline the old chart ended on, so they
        // are kept — but they now count something the reader can see.
        approaches.forEach((approach, i) => {
          const value = artefacts.reduce(
            (acc, item) => acc + (t < (item.lost[approach.key] ?? Infinity) ? 1 : 0),
            0,
          );
          if (shownCount[i] === value) return;
          shownCount[i] = value;
          if (counts[i]) counts[i].textContent = String(value);
        });

        // Nearest station, not the last one passed. The readout names where the
        // playhead actually is; with onset logic it would still say "month two"
        // with the head sitting on the month-six rule.
        let index = 0;
        let best = Infinity;
        periods.forEach((period, i) => {
          const d = Math.abs(t - period.at);
          if (d < best) { best = d; index = i; }
        });
        if (index === shownPeriod) return;
        shownPeriod = index;
        if (clock) clock.textContent = periods[index].label;
      };

      const tween = gsap.to(state, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 76%",
          end: "bottom 80%",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefresh: () => {
            measureTracks();
            travel = headTrack ? headTrack.clientWidth : 0;
            apply(state.t);
          },
        },
        onUpdate: () => apply(state.t),
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        if (head) {
          head.style.left = "";
          head.style.transform = "";
        }
        for (const track of tracks) {
          track.line.style.strokeDasharray = "";
          track.line.style.strokeDashoffset = "";
        }
      };
    });

    return () => media.revert();
  }, [periods, approaches, artefacts]);

  const summary = approaches
    .map((approach) => {
      const kept = artefacts.filter((item) => item.lost[approach.key] == null).length;
      return `${approach.name}, ${kept} of ${artefacts.length}`;
    })
    .join("; ");

  return (
    <figure className="ln" ref={scope}>
      <figcaption className="ln-clock-row">
        <span className="hx-mono ln-clock-k">Time since the decision</span>
        <span className="hx-mono ln-clock">{periods[periods.length - 1].label}</span>
      </figcaption>

      {/* Named once. After this, a track's position in its lane identifies it. */}
      <div className="ln-key" aria-hidden="true">
        {approaches.map((approach, index) => (
          <span className={`ln-key-item${approach.lead ? " is-lead" : ""}`} key={approach.key}>
            <svg className="ln-key-mark" viewBox="0 0 26 8" preserveAspectRatio="none">
              <line className={`ln-key-line ln-t${index}`} x1="0" y1="4" x2="26" y2="4" />
            </svg>
            <span className="hx-mono ln-key-name">{approach.name}</span>
          </span>
        ))}
      </div>

      <div
        className="ln-lanes"
        role="img"
        aria-label={`What each approach can still produce six months after the decision, without rebuilding the file: ${summary}`}
      >
        {/* One overlay for the whole stack, so the period rules and the playhead
            are continuous lines through all five lanes rather than five separate
            segments that have to be kept in step. */}
        <div className="ln-head" aria-hidden="true">
          {periods
            .filter((period) => period.at > 0 && period.at < 1)
            .map((period) => (
              <span className="ln-period" key={period.label} style={{ left: `${period.at * 100}%` }} />
            ))}
          <span className="ln-head-line" />
        </div>

        {artefacts.map((item) => (
          <div className="ln-lane" key={item.name}>
            <p className="ln-lane-name">{item.name}</p>

            <svg
              className="ln-lane-plot"
              viewBox={`0 0 ${LANE_W} ${LANE_H}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {approaches.map((approach, index) => {
                const y = TRACK_Y[index];
                const lost = item.lost[approach.key];
                const stop = lost == null ? 1 : lost;
                const x = stop * LANE_W;

                return (
                  <g key={approach.key}>
                    {/* The rest of the period, once this approach can no longer
                        produce the thing. Drawn, not omitted — the gap is the
                        point, and an absent line would read as a rendering
                        failure rather than as a loss. */}
                    {lost == null ? null : (
                      <line
                        className={`ln-gone ln-t${index}`}
                        data-stop={stop}
                        x1={Math.min(x + BREAK, LANE_W)}
                        y1={y}
                        x2={LANE_W}
                        y2={y}
                      />
                    )}

                    <line
                      className={`ln-held ln-t${index}`}
                      data-stop={stop}
                      x1="0"
                      y1={y}
                      x2={lost == null ? x : Math.max(x - BREAK, 0)}
                      y2={y}
                    />

                    {lost == null ? null : (
                      <line
                        className={`ln-stopmark ln-t${index}`}
                        data-stop={stop}
                        x1={x}
                        y1={y - TICK}
                        x2={x}
                        y2={y + TICK}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        ))}
      </div>

      {/* Every period, positioned where its rule is, rather than only the two
          ends — the sweep needs its stations named. */}
      <p className="ln-axis" aria-hidden="true">
        {periods.map((period) => (
          <span className="hx-mono ln-axis-mark" key={period.label} style={{ left: `${period.at * 100}%` }}>
            {period.label}
          </span>
        ))}
      </p>

      <div className="ln-score">
        {approaches.map((approach) => {
          const kept = artefacts.filter((item) => item.lost[approach.key] == null).length;
          return (
            <p className={`ln-score-item${approach.lead ? " is-lead" : ""}`} key={approach.key}>
              <span className="ln-score-value">{kept}</span>
              <span className="ln-score-of">of {artefacts.length}</span>
              <span className="hx-mono ln-score-name">{approach.name}</span>
            </p>
          );
        })}
      </div>

      {note ? <p className="ln-note">{note}</p> : null}
    </figure>
  );
}
