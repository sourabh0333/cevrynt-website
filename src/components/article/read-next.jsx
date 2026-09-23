"use client";

import { useRef } from "react";
import Link from "next/link";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * The suggestions, in the margin and in view while the article is read: three
 * related pieces, numbered, that arrive one after another when the column is
 * reached. Hovering one draws its rule down and carries the title across.
 *
 * Server-rendered complete, so it reads without JavaScript; the entrance is
 * the only thing the client adds. On narrow screens the same markup falls
 * under the article.
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
        {readout.headingK}
      </p>
      <ol className="ar-nx-list">
        {items.map((p, i) => (
          <li className="ar-nx-i" key={p.slug} style={{ "--i": i }}>
            <Link className="ar-nx-a" href={`/blog/${p.slug}`}>
              <span aria-hidden="true" className="ar-nx-n">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="ar-nx-t">{p.title}</span>
              <span className="ar-nx-m">
                {p.category} · {p.minutes} {readout.minK}
              </span>
              <span aria-hidden="true" className="ar-nx-rule" />
            </Link>
          </li>
        ))}
      </ol>
      <p className="ar-nx-all" style={{ "--i": items.length }}>
        <Link className="ar-nx-all-a" href="/blog">
          {readout.allK} <span aria-hidden="true">→</span>
        </Link>
      </p>
    </aside>
  );
}
