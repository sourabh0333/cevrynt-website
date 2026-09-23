"use client";

import { useEffect, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * The index: the article's own chapters, kept in view down the left of the
 * read, and the instrument that shows where in it you are.
 *
 * Every row keeps the same rhythm, on the same three columns — number, chapter,
 * the minute of the read it opens on. A lit spine runs as far as the chapter
 * being read with a dot at its end, and every chapter it has passed stays lit.
 *
 * One passive scroll listener, coalesced into a single animation frame, which
 * writes one custom property for the dot and only re-renders React when the
 * chapter actually changes. Geometry is measured once and on resize, never per
 * frame. Rendered complete on the server, so it is a plain list of links with
 * no JavaScript.
 */
export function ArticleIndex({ items, faqLabel, label, targetId }) {
  const ref = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(ref, 0.05);
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const article = document.getElementById(targetId);
    const node = ref.current;
    if (!article || !node || !items.length) return undefined;

    let tops = [];
    let start = 0;
    let span = 1;
    let frame = 0;
    let last = -1;

    const measure = () => {
      start = article.getBoundingClientRect().top + window.scrollY;
      span = Math.max(1, article.offsetHeight - window.innerHeight * 0.5);
      tops = items.map((c) => {
        const el = document.getElementById(c.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : start;
      });
    };

    /* The dot and the lit spine sit on the chapter being read, not on a raw
       scroll fraction, so they always agree with the row that is marked. Read
       once per chapter change rather than per frame. */
    const place = (index) => {
      const list = node.querySelector(".ar-ix-list");
      const row = list && list.children[index + 1];
      const y = index < 0 || !row ? 0 : row.offsetTop + row.offsetHeight / 2;
      node.style.setProperty("--ar-y", `${Math.round(y)}px`);
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
        place(index);
        setCurrent(index);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const onResize = () => {
      measure();
      place(last);
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
  }, [targetId, items]);

  return (
    <nav
      aria-label={label}
      className={`ar-ix${ready ? " is-armed" : ""}${entered ? " is-in" : ""}`}
      ref={ref}
    >
      <p className="ar-ix-k">
        <span>{label}</span>
        <span className="ar-ix-ku">Min</span>
      </p>
      <ol className="ar-ix-list">
        <li aria-hidden="true" className="ar-ix-dot" />
        {items.map((s, i) => (
          <li className="ar-ix-i" key={s.id} style={{ "--i": i }}>
            <a
              aria-current={current === i ? "location" : undefined}
              className={`ar-ix-a${current === i ? " is-on" : ""}${i < current ? " is-past" : ""}${
                s.cevrynt ? " is-cevrynt" : ""
              }`}
              href={`#${s.id}`}
            >
              <span aria-hidden="true" className="ar-ix-n">
                {s.number}
              </span>
              <span className="ar-ix-t">{s.title}</span>
              <span className="ar-ix-m">{s.page}</span>
            </a>
          </li>
        ))}
        {faqLabel ? (
          <li className="ar-ix-i ar-ix-i-end" style={{ "--i": items.length }}>
            <a className="ar-ix-a" href="#faq">
              <span aria-hidden="true" className="ar-ix-n">
                {"—"}
              </span>
              <span className="ar-ix-t">{faqLabel}</span>
            </a>
          </li>
        ) : null}
      </ol>
    </nav>
  );
}
