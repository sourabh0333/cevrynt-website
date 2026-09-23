"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * The contents: the chapter number, the chapter, a leader across, and the
 * minute of the read it opens on.
 *
 * The rows draw themselves in once, one after another, when the block is
 * reached — the leader rules grow out from the left while the text settles.
 * Rendered in its finished state on the server, so it is complete and
 * readable with no JavaScript and for anything that never plays the entrance.
 */
export function ArticleContents({ items, faqLabel, label }) {
  const ref = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(ref, 0.15);

  return (
    <nav
      aria-label={label}
      className={`ar-cn${ready ? " is-armed" : ""}${entered ? " is-in" : ""}`}
      ref={ref}
    >
      <p className="ar-cn-k">
        <span>{label}</span>
        <span className="ar-cn-ku">Minute</span>
      </p>
      <ol className="ar-cn-list">
        {items.map((s, i) => (
          <li className="ar-cn-i" key={s.id} style={{ "--i": i }}>
            <a className={`ar-cn-a${s.cevrynt ? " is-cevrynt" : ""}`} href={`#${s.id}`}>
              <span aria-hidden="true" className="ar-cn-n">
                {s.number}
              </span>
              <span className="ar-cn-t">
                <span className="ar-cn-tt">{s.title}</span>
              </span>
              <span className="ar-cn-m">{s.page}</span>
            </a>
          </li>
        ))}
        {faqLabel ? (
          <li className="ar-cn-i" key="faq" style={{ "--i": items.length }}>
            <a className="ar-cn-a" href="#faq">
              <span aria-hidden="true" className="ar-cn-n">
                ??
              </span>
              <span className="ar-cn-t">
                <span className="ar-cn-tt">{faqLabel}</span>
              </span>
            </a>
          </li>
        ) : null}
      </ol>
    </nav>
  );
}
