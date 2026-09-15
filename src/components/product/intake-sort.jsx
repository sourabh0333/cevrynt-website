"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/progressive";

/** How long a file takes to travel from the pile to its group. */
const FLIGHT = 920;
/** Stagger between files, so they land in sequence rather than all at once. */
const STEP = 44;

/**
 * 01 — Fifteen files, twelve verdicts and three refusals.
 *
 * Same architecture as the solutions pages: the figures come first on one
 * baseline, then a body split between the run itself and what the run is
 * required to keep.
 *
 * The effect is a real sort rather than an impression of one. Every filename is
 * server-rendered in the group it ends up in — that is the finished state and
 * the state a reader without JavaScript gets — and on entry the section
 * measures where each name actually sits, throws it back into a single unsorted
 * column, and lets it fly to the position it was already in. The distances come
 * out of the layout rather than being invented, so what you watch is the page's
 * own arrangement being assembled.
 *
 * That is worth the trouble here because it is the literal claim of the stage:
 * a submission arrives as one undifferentiated pile and leaves it grouped, and
 * the three that cannot be grouped are still in the pile at the end.
 *
 * One transform and one opacity per name, cleared the moment the flight ends,
 * so nothing is left on the compositor afterwards. Skipped entirely under
 * reduced motion, where the sorted state simply stands.
 */
export function IntakeSort({ verdicts, readout, aside, close, note }) {
  const scope = useRef(null);
  const listRef = useRef(null);
  const reduced = useReducedMotion();

  const total = verdicts.reduce((n, v) => n + v.items.length, 0);
  const held = verdicts.filter((v) => v.held).reduce((n, v) => n + v.items.length, 0);

  useEffect(() => {
    const root = scope.current;
    const list = listRef.current;
    if (!root || !list || reduced) return undefined;
    if (typeof IntersectionObserver === "undefined") return undefined;

    let done = false;
    let timer = 0;

    const fly = () => {
      if (done) return;
      done = true;
      observer.disconnect();

      const files = Array.from(list.querySelectorAll(".di1-file"));
      if (!files.length) return;

      // Where they are. The sorted layout is the truth and the pile is derived
      // from it, which is why the flight lands exactly rather than nearly.
      const last = files.map((el) => el.getBoundingClientRect());
      const box = list.getBoundingClientRect();
      const lane = box.height / files.length;

      for (let i = 0; i < files.length; i += 1) {
        const el = files[i];
        el.style.transition = "none";
        el.style.transform = `translate(${box.left - last[i].left}px, ${box.top + i * lane - last[i].top}px)`;
        el.style.opacity = "0";
      }

      // One forced reflow for the whole set, so the pile is a real frame rather
      // than a value the browser coalesces away.
      void list.offsetWidth;

      for (let i = 0; i < files.length; i += 1) {
        const el = files[i];
        el.style.transition = `transform ${FLIGHT}ms cubic-bezier(0.22, 1, 0.36, 1) ${i * STEP}ms, opacity 460ms ease ${i * STEP}ms`;
        el.style.transform = "";
        el.style.opacity = "";
      }

      root.classList.add("is-sorted");

      // Nothing is left on the compositor once they have landed.
      timer = window.setTimeout(
        () => {
          for (const el of files) el.removeAttribute("style");
        },
        FLIGHT + files.length * STEP + 140,
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) fly();
      },
      { threshold: 0.2 },
    );
    observer.observe(list);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [reduced]);

  return (
    <figure className="di1" ref={scope}>
      <dl className="di1-readout">
        {readout.figures.map((f) => (
          <div className={`di1-fig${f.tone ? ` di1-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="di1-fig-n">{f.n}</dt>
            <dd className="di1-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      {/* One rule, divided where the submission divides. */}
      <p className="di1-share" style={{ "--held": held / total }}>
        <span className="di1-share-kept" />
        <span className="di1-share-held" />
      </p>

      <div className="di1-body">
        <ol className="di1-list" ref={listRef}>
          {verdicts.map((v, i) => (
            <li className={`di1-entry${v.held ? " is-held" : " is-settled"}`} key={v.k} style={{ "--i": i }}>
              <span className="di1-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="di1-name">{v.k}</span>
              <span className="di1-count hx-mono">{String(v.items.length).padStart(2, "0")}</span>

              <span className="di1-files">
                {v.items.map((f) => (
                  <span className="di1-file" key={f}>
                    {f}
                  </span>
                ))}
              </span>

              {/* Only the one that stops has anything more to say. */}
              {v.record ? (
                <span className="di1-record">
                  <span className="di1-record-t">{v.record.what}</span>
                  <span className="di1-record-m hx-mono">{v.record.who}</span>
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="di1-aside">
          <p className="di1-aside-k hx-mono">{aside.title}</p>
          <ol className="di1-audit">
            {aside.items.map((item) => (
              <li className="di1-audit-row" key={item.k}>
                <span className="di1-audit-k">{item.k}</span>
                <span className="di1-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="di1-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="di1-close">{close}</p>
      <figcaption className="di1-note">{note}</figcaption>
    </figure>
  );
}
