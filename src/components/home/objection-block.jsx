"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

/**
 * Objection handling as a bare, magazine-style disclosure list.
 *
 * Still native details/summary, so keyboard operation, screen-reader semantics
 * and no-JS all come for free — the "expand all" control only toggles the open
 * attribute those elements already have.
 *
 * The visual change is that the cards are gone. Each question was previously a
 * rounded, bordered, shadowed panel; now the only separator is a hairline, the
 * question is set in the page serif at a size worth reading, and the open state
 * is signalled by an accent hairline drawing itself across the full row rather
 * than by a container lighting up. That is the current shape of this pattern —
 * "floating"/"ghost" accordions drop the background and borders and let the
 * dividers and type carry the structure.
 *
 * Opening is animated with `::details-content` plus `interpolate-size`, the CSS
 * approach that can transition to an intrinsic height. Browsers without it open
 * instantly, which is the correct degradation for a disclosure widget.
 */
export function ObjectionBlock({ items, links }) {
  const listRef = useRef(null);
  const [allOpen, setAllOpen] = useState(false);

  const toggleAll = () => {
    const next = !allOpen;
    setAllOpen(next);
    listRef.current?.querySelectorAll("details").forEach((d) => { d.open = next; });
  };

  // Keep the control honest if someone opens or closes rows individually.
  const syncFromItems = () => {
    const all = [...(listRef.current?.querySelectorAll("details") ?? [])];
    if (all.length) setAllOpen(all.every((d) => d.open));
  };

  return (
    <section className="ob band-light" aria-labelledby="objections-heading">
      <div className="eg ob-head">
        <span className="eg-rail hx-mono">13</span>
        <div className="eg-head">
          <p className="hx-kicker">Before you ask</p>
          <h2 className="t-display-2" id="objections-heading">
            The questions underwriting teams actually open with.
          </h2>
        </div>
        <p className="eg-lede t-lede">
          Short answers here. The full set, including security and integration scope, lives on the FAQ.
        </p>
      </div>

      <div className="eg ob-body">
        <div className="ob-main">
          {/* <div className="ob-bar">
            <span className="hx-mono ob-count">{String(items.length).padStart(2, "0")} questions</span>
            <button type="button" className="ob-toggle-all" onClick={toggleAll} aria-expanded={allOpen}>
              <span>{allOpen ? "Collapse all" : "Expand all"}</span>
            </button>
          </div> */}

          <div className="ob-list" ref={listRef}>
            {items.map(([question, answer], index) => (
              <details className="ob-item" key={question} onToggle={syncFromItems}>
                <summary>
                  <span className="hx-mono ob-item-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="ob-item-q">{question}</span>
                  <span className="ob-item-icon" aria-hidden="true">
                    <i />
                    <i />
                  </span>
                  <span className="ob-item-rule" aria-hidden="true" />
                </summary>
                <div className="ob-item-answer">
                  <p>{answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        <aside className="ob-aside">
          <p className="hx-mono ob-aside-label">Keep reading</p>
          <ul className="ob-links">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link href={href}>
                  <span>{label}</span>
                  <ArrowUpRight />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
