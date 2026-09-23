"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 05 — The terms the guides use, defined once.
 *
 * The library leans on shorthand an underwriting team uses every day and a
 * newer reader may not: ADB, DSCR, NSF, stacking, bust-out, KYB, override.
 * This section defines each once, in a sentence or two, and points to the
 * exact guide section that explains it properly — the definition is the
 * doorway, not the substitute.
 *
 * It is set as a dictionary rather than a list of cards: a strip of the
 * letters that have entries across the top, each letter hanging in its own
 * column beside its first term, and every entry on one grid — letter, term,
 * definition, and where it is explained — so the columns read straight down
 * the page.
 *
 * Every link target is checked against the guide at build time, so an entry
 * can never point at a section that does not exist.
 *
 * Server-rendered with every term, definition and link present.
 */
export function TermGlossary({ terms, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.1);
  const [at, setAt] = useState(null);

  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term));
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const firstOf = new Map();
  sorted.forEach((t) => {
    const l = t.term[0].toUpperCase();
    if (!firstOf.has(l)) firstOf.set(l, t.id);
  });

  const counts = {
    terms: terms.length,
    guides: new Set(terms.map((t) => t.slug)).size,
    groups: new Set(terms.map((t) => t.group)).size,
  };

  return (
    <figure className={`rs5${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="rs5-readout">
        {readout.figures.map((f) => (
          <div className="rs5-fig" key={f.k}>
            <dt className="rs5-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="rs5-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="rs5-book">
        <nav className="rs5-rail" aria-label={readout.railK}>
          <ol className="rs5-letters">
            {letters
              .filter((l) => firstOf.has(l))
              .map((l, i) => (
                <li className={`rs5-letter${at === l ? " is-on" : ""}`} key={l} style={{ "--i": i }}>
                  <a className="rs5-letter-a" href={`#${firstOf.get(l)}`}>
                    {l}
                  </a>
                </li>
              ))}
          </ol>
        </nav>

        <div className="rs5-entries">
          <p className="rs5-head hx-mono" aria-hidden="true">
            <span />
            <span className="rs5-head-k">{readout.termK}</span>
            <span className="rs5-head-k">{readout.meansK}</span>
            <span className="rs5-head-k">{readout.explainedK}</span>
          </p>
          <dl className="rs5-list" onMouseLeave={() => setAt(null)}>
            {sorted.map((t, i) => {
              const l = t.term[0].toUpperCase();
              const first = firstOf.get(l) === t.id;
              return (
                <div
                  className={`rs5-entry${first ? " is-first" : ""}`}
                  id={t.id}
                  key={t.id}
                  style={{ "--i": i }}
                  onMouseEnter={() => setAt(l)}
                >
                  <dt className="rs5-term">
                    {first ? (
                      <span className="rs5-initial" aria-hidden="true">
                        {l}
                      </span>
                    ) : null}
                    <span className="rs5-term-k">{t.term}</span>
                    {t.abbr ? <span className="rs5-term-abbr hx-mono">{t.abbr}</span> : null}
                    <span className="rs5-term-g hx-mono">{t.group}</span>
                  </dt>
                  <dd className="rs5-def">{t.def}</dd>
                  <dd className="rs5-src">
                    <Link className="rs5-src-a" href={`/blog/${t.slug}#${t.section}`}>
                      <span className="rs5-src-s">{t.sectionTitle}</span>
                      <span className="rs5-src-g hx-mono">
                        {t.guide} <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>

      <div className="rs5-body">
        <div className="rs5-said">
          <p className="rs5-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="rs5-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="rs5-aside">
          <p className="rs5-aside-k hx-mono">{aside.title}</p>
          <ol className="rs5-audit">
            {aside.items.map((item) => (
              <li className="rs5-audit-row" key={item.k}>
                <span className="rs5-audit-k">{item.k}</span>
                <span className="rs5-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="rs5-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="rs5-close">{close}</p>
      <figcaption className="rs5-note">{note}</figcaption>
    </figure>
  );
}
