"use client";

import { useMemo, useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 03 — The same open questions, sorted by who can actually close them.
 *
 * Sections one and two leave a broker with seven open things, and the useful
 * fact about those seven is not how many there are. It is that they do not all
 * cost the same: two of them can be closed at a desk this afternoon, three need
 * one phone call to the borrower, and two are somebody else's judgment and will
 * not be closed by anybody on this side of the file.
 *
 * So the figure sorts them. Every question starts in one pile and lands in the
 * column of whoever can close it, and the depth of each stack is the answer:
 * the middle one runs deepest because most of this needs the borrower, and the
 * work a broker is actually holding is two rows long.
 *
 * The geometry is allocation, which nothing else on this site does — the pages
 * around it join, divide, descend, stack, nest and pan. And the sort is the
 * motion: the items travel to their owner rather than fading in where they
 * already were, because watching the pile come apart is the point.
 *
 * Server-rendered already sorted, every item in its column, which is the
 * finished state and what reduced motion is given.
 */
export function OwnerTriage({ owners, items, labels, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const sorted = useHasEntered(scope, 0.24);

  const byOwner = useMemo(
    () => owners.map((owner) => ({ ...owner, items: items.filter((item) => item.owner === owner.key) })),
    [owners, items],
  );

  const yours = byOwner.find((o) => o.key === owners[0].key)?.items.length ?? 0;

  return (
    <figure className={`ot${ready ? " is-ready" : ""}${sorted ? " is-sorted" : ""}`} ref={scope}>
      <div className="ot-readout">
        <p className="ot-fig">
          <span className="ot-fig-n">{String(items.length).padStart(2, "0")}</span>
          <span className="ot-fig-k hx-mono">{labels.total}</span>
        </p>
        <span className="ot-readout-rule" aria-hidden="true" />
        <p className="ot-fig ot-fig-quiet">
          <span className="ot-fig-n">{String(yours).padStart(2, "0")}</span>
          <span className="ot-fig-k hx-mono">{labels.yours}</span>
        </p>
      </div>

      <div className="ot-cols">
        {byOwner.map((owner, col) => (
          <section className={`ot-col ot-col-${owner.key}`} key={owner.key}>
            <header className="ot-col-head">
              <span className="ot-col-n">{String(owner.items.length).padStart(2, "0")}</span>
              <div>
                <p className="ot-col-t">{owner.name}</p>
                <p className="ot-col-b hx-mono">{owner.when}</p>
              </div>
            </header>

            <ol className="ot-items">
              {owner.items.map((item, i) => (
                <li
                  className="ot-item"
                  key={item.name}
                  style={{ "--d": `${(col * 3 + i) * 70}ms`, "--from": `${(1 - col) * 40}px` }}
                >
                  <p className="ot-item-n">{item.name}</p>
                  <p className="ot-item-w">{item.action}</p>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <figcaption className="ot-note">{note}</figcaption>
    </figure>
  );
}
