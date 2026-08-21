"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * Diagram geometry. These are viewBox units AND the CSS pixel values the rows
 * are laid out with — the component hands them to CSS as custom properties so
 * there is one source of truth. The vertical mapping is then 1:1, which is what
 * lets a tick authored at a row's centre land on that row's centre.
 *
 * HEAD is generous because the flare lives inside it. Both paths have to reach
 * their bands before the first row begins, and a flare given too little depth is
 * a nearly horizontal move — which is both ungainly and, once the draw is driven
 * by depth rather than by length, close to instantaneous.
 */
const W = 1000;
const HEAD = 176;
const STEM = 56;
const ROW = 108;
/** Deep enough for the two branches to settle onto their leaves. */
const FOOT = 116;
/** Where each branch terminates: the outer end of its own leaf's rule.
 *
 *  The leaves used to sit in the narrow threshold columns, which aligned them
 *  with the table above but left roughly half the footer's width empty — 16% dead
 *  on each outer edge and the centre column dead between them. The two
 *  conclusions now take a half of the width each, so a branch lands on the outer
 *  tip of its own rule and the footer is as wide as the diagram it belongs to. */
const A_END = 0;
const B_END = W;
/** The two path bands. The innermost value is the binding one: a tick is 16
 *  units either side of its path, and the text columns start at 16% of the
 *  width, so anything above ~134 puts the first row's tick under the type. */
const A_X = [132, 99, 66, 33];
const B_X = [868, 901, 934, 967];

/** Samples for the depth-to-length lookup below. */
const SAMPLES = 600;

/**
 * Builds a lookup from depth to distance along a path.
 *
 * Lengths here are accumulated in *screen* space rather than in user units, and
 * that distinction is load-bearing. This diagram is stretched horizontally — a
 * 1000-unit viewBox rendered ~1320px wide — and its paths carry
 * `vector-effect: non-scaling-stroke`, which makes the browser compute the dash
 * pattern in screen space too. Handing it `getTotalLength()` set a dash of 1120
 * against a path 1243 long on screen, so the pattern wrapped and the final 123px
 * fell into the gap. The bottom of the tree could not be drawn at any scroll
 * position — it was not a timing problem, the ink was never there.
 *
 * Both paths only ever descend, so this is a plain ascending search. The other
 * reason this exists: drawing a path by its own length runs the head at a constant
 * *length* rate, and this shape does not spend its length evenly down the page.
 * The flare at the top covered 64 units of depth in 374 units of length, so a
 * length-driven draw spent about a third of its time moving sideways across the
 * top eighth of the diagram and then raced through the rows. It read as a stall
 * followed by a rush — precisely what a diagram whose whole argument is an
 * orderly descent must not do.
 *
 * Driving by depth instead keeps the head at the same height on both paths at
 * every moment, descending at a constant rate.
 */
function depthLookup(path, xScale, yScale) {
  const userTotal = path.getTotalLength();
  const ys = [];
  const lengths = [];
  let prev = null;
  let acc = 0;

  for (let i = 0; i <= SAMPLES; i += 1) {
    const point = path.getPointAtLength((i / SAMPLES) * userTotal);
    if (prev) {
      acc += Math.hypot((point.x - prev.x) * xScale, (point.y - prev.y) * yScale);
    }
    ys.push(point.y);
    lengths.push(acc);
    prev = point;
  }

  return { total: acc, ys, lengths };
}

/** Distance along the path at which it reaches a given depth. */
function lengthAtDepth(lookup, y) {
  const { ys, lengths, total } = lookup;
  if (y <= ys[0]) return 0;
  if (y >= ys[ys.length - 1]) return total;

  let low = 0;
  let high = ys.length - 1;
  while (low < high - 1) {
    const mid = (low + high) >> 1;
    if (ys[mid] <= y) low = mid;
    else high = mid;
  }

  const span = ys[high] - ys[low];
  const fraction = span > 0 ? (y - ys[low]) / span : 0;
  return lengths[low] + fraction * (lengths[high] - lengths[low]);
}

/**
 * A verdict, marked on the branch.
 *
 * These three used to differ only by stroke width — 2.4 against 1.2 — which at a
 * hairline is no difference at all, so a pass and a fail looked the same. They
 * now differ in kind rather than in degree: a pass closes, an exception is
 * longer and carries the only colour on the diagram because it is the one a
 * person has to resolve, and a fail is drawn broken, because that is what the
 * criterion did.
 *
 * The depth travels on the element, so the effect can light marks by comparing
 * against the head without assuming how many strokes a row happens to contain.
 */
function VerdictMark({ verdict, x, y }) {
  if (verdict === "fail") {
    return (
      <>
        <line className="pd-tick is-fail" data-depth={y} x1={x - 20} y1={y} x2={x - 7} y2={y} />
        <line className="pd-tick is-fail" data-depth={y} x1={x + 7} y1={y} x2={x + 20} y2={y} />
      </>
    );
  }
  const reach = verdict === "exception" ? 21 : 14;
  return (
    <line
      className={`pd-tick is-${verdict}`}
      data-depth={y}
      x1={x - reach}
      y1={y}
      x2={x + reach}
      y2={y}
    />
  );
}

/**
 * One file, two policies, two answers.
 *
 * The page promises a shared process "without forcing every lender into the
 * same credit policy", and until this section nothing on it showed the second
 * half. So this runs the identical file past two different lender policies and
 * lets them disagree.
 *
 * The geometry is the argument. A single stem enters at the top — one deal —
 * and flares into two. The paths then run in parallel through every criterion
 * the two lenders read the same way, and kink outward at exactly the criteria
 * where their thresholds disagree. By the bottom they are far apart, and the
 * distance between them is literally the number of places their policies
 * differ. The deal's own facts hold the centre column the whole way down: the
 * file never moves, the policies do.
 *
 * One descending head drives the entire section. Its depth draws both paths,
 * lights each row and reveals each verdict tick as it arrives — so a row cannot
 * light before the line reaches it, and the whole thing reads as a single pass
 * down the page instead of as several effects on separate clocks, which is what
 * it was.
 *
 * The two policies deliberately cross rather than one being uniformly stricter.
 * Lender A is tighter on negative days; Lender B is tighter on time in business
 * and refuses a second position outright. A diagram where one side simply loses
 * would be a strawman, and would also quietly imply Cevrynt has a view about
 * which policy is right. It does not.
 *
 * This is a third geometry on this page rather than a third instance of one.
 * The first section runs horizontally across time and comes apart; the second is
 * centred on a product export and gathers inward; this one descends and divides.
 *
 * On a phone the diagram is dropped entirely and the same rows read as stacked
 * text on a plain stagger. Two paths kinking apart inside a 360px column
 * communicates nothing.
 *
 * Without JS or with reduced motion every path is drawn and every verdict is
 * showing, which is the conclusion.
 */
export function PolicyDivergence({ lenders, criteria, outcomes, note, cta }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add(
      { motionOk: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 861px)" },
      ({ conditions }) => {
        if (!conditions.motionOk) return undefined;

        const rows = gsap.utils.toArray(".pd-row", root);
        const outcomeEls = gsap.utils.toArray(".pd-outcome", root);
        const paths = conditions.wide ? gsap.utils.toArray(".pd-path", root) : [];
        const ticks = conditions.wide ? gsap.utils.toArray(".pd-tick", root) : [];

        const height = HEAD + rows.length * ROW + FOOT;
        /** The depth at which each row's verdict sits. */
        const rowDepth = rows.map((_, i) => HEAD + i * ROW + ROW / 2);

        const svg = root.querySelector(".pd-lines");
        let tracks = [];

        /** Re-measured on refresh: the horizontal scale changes with width. */
        const measure = () => {
          const box = svg?.getBoundingClientRect();
          const vb = svg?.viewBox.baseVal;
          if (!box?.width || !vb?.width) return;
          const xScale = box.width / vb.width;
          const yScale = box.height / vb.height;
          tracks = paths.map((path) => {
            const lookup = depthLookup(path, xScale, yScale);
            // A pixel of slack, so sampling error can never leave a hairline
            // unpainted at the very end of the descent.
            const dash = lookup.total + 1;
            path.style.strokeDasharray = String(dash);
            path.style.strokeDashoffset = String(dash);
            return { path, lookup, dash };
          });
        };
        measure();

        // Arming is what hides things, and it is done here rather than in the
        // stylesheet so the server-rendered page shows the finished diagram.
        root.dataset.armed = "";
        rows.forEach((row) => row.classList.add("is-dim"));

        let deepest = 0;
        const state = { t: 0 };

        /**
         * The head reaches the foot of the diagram at 0.78, so the line lands
         * while the bottom of the diagram is still comfortably on screen and the
         * finished state is held for the rest of the section. At 0.9 it was
         * arriving as the diagram was already leaving.
         *
         * Descent is linear in depth — no easing — because an eased head reads
         * as hesitation on a diagram this literal.
         *
         * It is also monotonic: the head only ever goes deeper. Everything else
         * in this section latches, and leaving the paths free to retract meant
         * scrolling back up stranded lit ticks at depths the line no longer
         * reached — ticks floating in space with nothing joining them. A drawn
         * line is legible in both directions on its own, but not while the marks
         * hanging off it are one-way.
         */
        const apply = (t) => {
          const reach = gsap.utils.clamp(0, 1, t / 0.78) * height;
          const headY = reach > deepest ? reach : deepest;
          deepest = headY;

          for (const track of tracks) {
            const drawn = headY >= height ? track.dash : lengthAtDepth(track.lookup, headY);
            track.path.style.strokeDashoffset = String(track.dash - drawn);
          }

          // Everything below is *derived* from the head, re-read every frame,
          // rather than latched in its own flag. Separate latches could disagree
          // with the line: a refresh or a hot reload reset the head while the
          // marks stayed lit, which stranded ticks at depths the line no longer
          // reached — marks hanging in space with nothing joining them. One
          // monotonic value cannot desync from itself.
          //
          // The fades are CSS transitions on a class, so none of this depends on
          // the GSAP ticker having run either.

          // Everything below this point latches: once a row has been read it
          // stays read. The paths keep scrubbing both ways, because a line being
          // drawn and undrawn is legible either direction — but text is not.
          // Bound to raw scrub progress, a row lit on the way down and unlit
          // again on the smallest upward movement: trackpad jitter, a momentum
          // bounce, the address bar on a phone. The section read as though it
          // never finished and kept snapping backwards.
          rows.forEach((row, i) => {
            // Narrow has no head to follow, so the rows keep a plain stagger.
            const on = conditions.wide
              ? headY >= rowDepth[i]
              : t >= 0.16 + (i / rows.length) * 0.62;
            row.classList.toggle("is-dim", !on);
          });

          // Each mark carries its own depth, so this holds however many strokes
          // a verdict is drawn with — a fail is two.
          ticks.forEach((tick) => {
            tick.classList.toggle("is-on", headY >= Number(tick.dataset.depth));
          });

          // The leaves arrive as the branches land on them, not before.
          const done = conditions.wide ? headY >= height - 26 : t > 0.86;
          outcomeEls.forEach((el) => el.classList.toggle("is-on", done));
        };

        // Triggered on the diagram rather than on the whole figure. The figure
        // also carries the two outcomes and the note, and including them
        // stretched the descent across ~300px of footer copy that the head has
        // nothing to do with — the line crawled while you read prose.
        //
        // invalidateOnRefresh because a webfont landing or a resize changes this
        // section's height, and a trigger holding stale start/end positions is
        // the usual reason a scrubbed section appears to jump.
        const body = root.querySelector(".pd-body");
        const tween = gsap.to(state, {
          t: 1,
          ease: "none",
          scrollTrigger: {
            trigger: body || root,
            start: "top 78%",
            end: "bottom 62%",
            // Tighter than the rest of the page on purpose. At 0.6 a fast flick
            // left the head most of a section behind the scroll, so the diagram
            // could leave the viewport with the line still part-way down it.
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
          onUpdate: () => apply(state.t),
          // Applied once up front and again on every refresh, so the diagram is
          // never left in a half-drawn state waiting for a scroll event that may
          // not come.
          onRefresh: () => {
            measure();
            apply(state.t);
          },
        });

        apply(state.t);

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          delete root.dataset.armed;
          ticks.forEach((tick) => tick.classList.remove("is-on"));
          outcomeEls.forEach((el) => el.classList.remove("is-on"));
          rows.forEach((row) => row.classList.remove("is-dim"));
          for (const track of tracks) {
            track.path.style.strokeDasharray = "";
            track.path.style.strokeDashoffset = "";
          }
        };
      },
    );

    return () => media.revert();
  }, [criteria]);

  const height = HEAD + criteria.length * ROW + FOOT;

  // How many criteria the two policies have disagreed on by the end of each
  // row. That running count is the only thing driving how far apart the paths
  // are: they stay parallel through agreement and kink outward at a difference.
  const splits = criteria.reduce((acc, criterion) => {
    const before = acc.length ? acc[acc.length - 1].after : 0;
    const after = criterion.a.verdict === criterion.b.verdict ? before : before + 1;
    acc.push({ before, after });
    return acc;
  }, []);
  const total = splits.length ? splits[splits.length - 1].after : 0;

  const clampIndex = (i) => Math.min(i, A_X.length - 1);
  const rowsEnd = HEAD + criteria.length * ROW;
  const buildPath = (xs, endX) => {
    const x0 = xs[0];
    const lastX = xs[clampIndex(total)];
    // The flare is a cubic rather than a straight run, so the split eases out of
    // the stem instead of cornering off it. Both control points descend, which
    // keeps the curve monotonic in depth — the lookup above depends on that.
    let d = `M ${W / 2} 0 L ${W / 2} ${STEM}`;
    d += ` C ${W / 2} ${STEM + 46}, ${x0} ${HEAD - 54}, ${x0} ${HEAD}`;
    splits.forEach((split, i) => {
      const y = HEAD + (i + 1) * ROW;
      d += ` L ${xs[clampIndex(split.after)]} ${y}`;
    });
    // The leaf. Every branch of a tree has to end somewhere that means
    // something, and until now these two ran past the last criterion and stopped
    // at an arbitrary empty coordinate — which looks identical to a line that has
    // been cut off, however correctly it was drawn. They now carry on down and
    // settle onto the rule above their own lender's conclusion, so the file that
    // entered at the top arrives somewhere.
    //
    // Control points descend monotonically. The depth lookup binary-searches y,
    // so a curve that doubles back even slightly breaks the draw.
    d += ` L ${lastX} ${rowsEnd + 40}`;
    d += ` C ${lastX} ${rowsEnd + 82}, ${endX} ${height - 34}, ${endX} ${height}`;
    return d;
  };

  return (
    <figure className="pd" ref={scope}>
      <div className="pd-heads" aria-hidden="true">
        <span className="hx-mono pd-head pd-head-a">{lenders[0].name}</span>
        <span className="hx-mono pd-head pd-head-file">The same file</span>
        <span className="hx-mono pd-head pd-head-b">{lenders[1].name}</span>
      </div>

      <div
        className="pd-body"
        style={{
          "--pd-head": `${HEAD}px`,
          "--pd-row": `${ROW}px`,
          "--pd-foot": `${FOOT}px`,
          "--pd-rows": criteria.length,
        }}
      >
        {/* Stretched to the block, so every mark is a line that opts out of the
            horizontal distortion. The vertical mapping is 1:1 because the CSS
            lays the rows out in the same numbers this viewBox uses. */}
        <svg
          className="pd-lines"
          viewBox={`0 0 ${W} ${height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="pd-path pd-path-a" d={buildPath(A_X, A_END)} fill="none" />
          <path className="pd-path pd-path-b" d={buildPath(B_X, B_END)} fill="none" />

          {criteria.map((criterion, i) => {
            const y = HEAD + i * ROW + ROW / 2;
            const ax = A_X[clampIndex(splits[i].after)];
            const bx = B_X[clampIndex(splits[i].after)];
            return (
              <g key={criterion.name}>
                <VerdictMark verdict={criterion.a.verdict} x={ax} y={y} />
                <VerdictMark verdict={criterion.b.verdict} x={bx} y={y} />
              </g>
            );
          })}
        </svg>

        <ol className="pd-rows">
          {criteria.map((criterion) => (
            <li className="pd-row" key={criterion.name}>
              <div className="pd-side pd-side-a">
                <span className="pd-rule">{criterion.a.rule}</span>
                <span className={`hx-mono pd-verdict is-${criterion.a.verdict}`}>
                  {criterion.a.verdict}
                </span>
              </div>

              <div className="pd-fact">
                <span className="hx-mono pd-crit">{criterion.name}</span>
                <span className="pd-value">{criterion.value}</span>
              </div>

              <div className="pd-side pd-side-b">
                <span className="pd-rule">{criterion.b.rule}</span>
                <span className={`hx-mono pd-verdict is-${criterion.b.verdict}`}>
                  {criterion.b.verdict}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="pd-outcomes">
        <p className="pd-outcome pd-outcome-a">
          <span className="hx-mono pd-outcome-who">{lenders[0].name}</span>
          <span className="pd-outcome-text">{outcomes[0]}</span>
        </p>
        <p className="pd-outcome pd-outcome-b">
          <span className="hx-mono pd-outcome-who">{lenders[1].name}</span>
          <span className="pd-outcome-text">{outcomes[1]}</span>
        </p>
      </div>

      {note || cta ? (
        <div className="pd-foot">
          {note ? <p className="pd-note">{note}</p> : null}
          {cta ? (
            <a
              className="pd-cta"
              href={cta.href}
              {...(cta.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {cta.label}
              <ArrowUpRight />
            </a>
          ) : null}
        </div>
      ) : null}
    </figure>
  );
}
