"use client";

import { useRef } from "react";
import Link from "next/link";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * Read next, in the right margin: the label set on its side against a rule,
 * and three related pieces beside it — topic and length on one line, the title
 * under it in the reading serif.
 *
 * The entries arrive one after another when the column is reached; hovering
 * one lights its rule and carries it inwards. Server-rendered complete, so it
 * reads without JavaScript, and on narrow screens the same markup lays itself
 * out under the article with the label turned upright.
 */
export function ReadNext({ items, readout }) {
  const ref = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(ref, 0.1);

  return (
    <aside
      aria-labelledby="next-heading"
      className={`ar-nx${ready ? " is-armed" : ""}${entered ? " is-in" : ""}`}
      ref={ref}
    >
      <p className="ar-nx-k" id="next-heading">
        <span className="ar-nx-k-t">{readout.headingK}</span>
      </p>
      <div className="ar-nx-body">
        <ol className="ar-nx-list">
          {items.map((p, i) => (
            <li className="ar-nx-i" key={p.slug} style={{ "--i": i }}>
              <Link className="ar-nx-a" href={`/blog/${p.slug}`}>
                <span className="ar-nx-meta">
                  <span className="ar-nx-cat">{p.category}</span>
                  <span className="ar-nx-min">
                    {p.minutes} {readout.minK}
                  </span>
                </span>
                <span className="ar-nx-t">{p.title}</span>
                <span aria-hidden="true" className="ar-nx-rule" />
              </Link>
            </li>
          ))}
        </ol>
        <p className="ar-nx-all" style={{ "--i": items.length }}>
          <Link className="ar-nx-all-a" href="/blog">
            {readout.allK}
            <span aria-hidden="true" className="ar-nx-all-arrow">
              →
            </span>
          </Link>
        </p>
      </div>
    </aside>
  );
}
