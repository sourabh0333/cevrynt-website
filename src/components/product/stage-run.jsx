"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * 03 — Eight stages, and the five that read what this one wrote.
 *
 * Same architecture as the solutions pages: figures on one baseline, then a
 * body split between the run and what the run is required to keep.
 *
 * The section makes an argument — five later stages are reading the output of
 * this one — so the effect draws it rather than asserting it. As the reader
 * carries the file down the list, every stage that depends on stage two throws
 * a line back up to stage two, and the lines accumulate until five of them
 * converge on a single entry. The claim and the picture end up being the same
 * object.
 *
 * The run is driven by the scroll rather than by a timer, which is the
 * distinction from the policy run on the lenders page: a policy evaluation
 * happens without you, and a file only reaches the stage you have carried it
 * to.
 *
 * Nothing here changes the strength of any text — a stage further down is
 * later, not lesser — and the finished state is the default. Every entry is
 * reached and every line drawn unless the scrub is actually running, so a
 * reader with no JavaScript or with reduced motion gets the completed picture
 * rather than an empty one.
 */
export function StageRun({ stages, readout, aside, close, note }) {
  const scope = useRef(null);
  const listRef = useRef(null);
  const [wires, setWires] = useState(null);

  const anchor = stages.findIndex((s) => s.here);

  /* The convergence, measured off the layout rather than approximated. */
  const measureWires = useCallback(() => {
    const list = listRef.current;
    if (!list || anchor < 0) return;

    const rows = Array.from(list.querySelectorAll(".di3-entry"));
    const home = rows[anchor];
    if (!home) return;

    const box = list.getBoundingClientRect();
    const hb = home.getBoundingClientRect();
    const hy = hb.top + hb.height / 2 - box.top;
    const gutter = Math.min(46, Math.max(18, box.width * 0.06));

    const paths = [];
    for (let i = 0; i < rows.length; i += 1) {
      if (!stages[i].reads) continue;
      const r = rows[i].getBoundingClientRect();
      const y = r.top + r.height / 2 - box.top;
      const x = box.width;
      const out = x + gutter;
      paths.push({
        i,
        d: `M ${x.toFixed(1)} ${y.toFixed(1)} C ${out.toFixed(1)} ${y.toFixed(1)}, ${out.toFixed(1)} ${hy.toFixed(1)}, ${x.toFixed(1)} ${hy.toFixed(1)}`,
      });
    }

    setWires({ w: Math.round(box.width + gutter + 3), h: Math.round(box.height), paths });
  }, [anchor, stages]);

  useLayoutEffect(() => {
    measureWires();
    window.addEventListener("resize", measureWires);
    return () => window.removeEventListener("resize", measureWires);
  }, [measureWires]);

  /* The paths mount after the scroll position has already been computed, so
     they have to be brought up to date once rather than waiting for the next
     scroll event to notice them. */
  useLayoutEffect(() => {
    const root = scope.current;
    const list = listRef.current;
    if (!root || !list || !wires) return;

    const rows = Array.from(list.querySelectorAll(".di3-entry"));
    const staged = root.classList.contains("is-scrub");
    for (const p of root.querySelectorAll(".di3-wire")) {
      const row = rows[Number(p.dataset.row)];
      p.classList.toggle("is-drawn", !staged || Boolean(row && row.classList.contains("is-at")));
    }
  }, [wires]);

  useGSAP(
    () => {
      const root = scope.current;
      const list = listRef.current;
      if (!root || !list) return undefined;

      const media = gsap.matchMedia();

      media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
        if (!conditions.motionOk) return undefined;

        const rows = Array.from(list.querySelectorAll(".di3-entry"));
        let marks = [];
        // Cached on refresh: eight offsetTop reads per scroll event would be
        // eight forced layouts. The list is positioned, so these are offsets
        // inside it rather than inside the section.
        const measure = () => {
          marks = rows.map((el) => el.offsetTop + el.offsetHeight * 0.4);
          measureWires();
        };

        root.classList.add("is-scrub");
        measure();

        const trigger = ScrollTrigger.create({
          trigger: list,
          start: "top 78%",
          end: "bottom 78%",
          invalidateOnRefresh: true,
          onRefresh: measure,
          onUpdate: (self) => {
            const y = self.progress * list.offsetHeight;
            for (let i = 0; i < rows.length; i += 1) {
              rows[i].classList.toggle("is-at", marks[i] <= y);
            }
            // Five paths, so this is cheaper than wiring each one through
            // React and re-rendering the section on every scroll frame.
            const paths = root.querySelectorAll(".di3-wire");
            for (const p of paths) {
              p.classList.toggle("is-drawn", marks[Number(p.dataset.row)] <= y);
            }
          },
        });

        return () => {
          trigger.kill();
          root.classList.remove("is-scrub");
          for (const el of rows) el.classList.remove("is-at");
        };
      });

      return () => media.revert();
    },
    { dependencies: [measureWires], scope },
  );

  return (
    <figure className="di3" ref={scope}>
      <dl className="di3-readout">
        {readout.figures.map((f) => (
          <div className={`di3-fig${f.tone ? ` di3-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="di3-fig-n">{f.n}</dt>
            <dd className="di3-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="di3-body">
        <div className="di3-run">
          {wires ? (
            <svg className="di3-wires" viewBox={`0 0 ${wires.w} ${wires.h}`} aria-hidden="true">
              {wires.paths.map((p) => (
                <path className="di3-wire" d={p.d} pathLength="1" data-row={p.i} key={p.i} />
              ))}
            </svg>
          ) : null}

          <ol className="di3-list" ref={listRef}>
            {stages.map((s, i) => (
              <li className={`di3-entry${s.here ? " is-here" : ""}`} key={s.k} style={{ "--i": i }}>
                <span className="di3-edge" aria-hidden="true" />
                <span className="di3-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="di3-name">{s.k}</span>
                <span className="di3-state hx-mono">{s.here ? readout.hereK : s.tag}</span>
                <span className="di3-b">{s.b}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="di3-aside">
          <p className="di3-aside-k hx-mono">{aside.title}</p>
          <ol className="di3-audit">
            {aside.items.map((item) => (
              <li className="di3-audit-row" key={item.k}>
                <span className="di3-audit-k">{item.k}</span>
                <span className="di3-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="di3-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="di3-close">{close}</p>
      <figcaption className="di3-note">{note}</figcaption>
    </figure>
  );
}
