"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The gauge in the outer rail: how far through the article the reader is, and
 * which chapter they are in. On a phone it becomes a hairline across the top
 * of the screen instead.
 *
 * One passive scroll listener, coalesced into a single animation frame, which
 * writes one custom property and only re-renders React when the chapter
 * actually changes. Geometry is measured once and on resize, never per frame,
 * so scrolling stays off the layout path. Decorative: the contents is the
 * navigation, so this is hidden from assistive technology.
 */
export function ReadProgress({ targetId, chapters }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const article = document.getElementById(targetId);
    const node = ref.current;
    if (!article || !node) return undefined;
    if (!chapters.length) return undefined;

    let tops = [];
    let start = 0;
    let span = 1;
    let frame = 0;
    let last = -1;

    const measure = () => {
      const box = article.getBoundingClientRect();
      start = box.top + window.scrollY;
      span = Math.max(1, article.offsetHeight - window.innerHeight * 0.5);
      tops = chapters.map((c) => {
        const el = document.getElementById(c.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : start;
      });
    };

    const paint = () => {
      frame = 0;
      const line = window.scrollY + window.innerHeight * 0.3;
      const p = Math.min(1, Math.max(0, (line - start) / span));
      node.style.setProperty("--ar-p", p.toFixed(4));

      let index = -1;
      for (let i = 0; i < tops.length; i += 1) if (line >= tops[i]) index = i;
      if (index !== last) {
        last = index;
        setCurrent(index);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [targetId, chapters]);

  return (
    <div className="ar-pg" ref={ref} aria-hidden="true">
      <span className="ar-pg-n">{current >= 0 ? chapters[current].number : "00"}</span>
      <span className="ar-pg-rail">
        <span className="ar-pg-fill" />
        {chapters.map((c, i) => (
          <span
            className={`ar-pg-tick${i <= current ? " is-past" : ""}`}
            key={c.id}
            style={{ "--at": c.at }}
          />
        ))}
      </span>
      <span className="ar-pg-all">{String(chapters.length).padStart(2, "0")}</span>
    </div>
  );
}
