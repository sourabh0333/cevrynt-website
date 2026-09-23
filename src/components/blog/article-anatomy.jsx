"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 03 — Where the article ends and the product begins.
 *
 * The fair question to ask of any vendor's blog is how much of it is a pitch.
 * This figure answers it for every article at once. Each article is one bar,
 * divided into its sections in proportion to their length; the section about
 * Cevrynt is drawn in amber, and in every one of them it is a single section,
 * and it is the last.
 *
 * Because every bar is scaled to the same width, the amber sits in one narrow
 * column at the right-hand edge of the whole chart — which is the point. The
 * readout counts the articles where it comes anywhere but last: none.
 *
 * Pointing at a row names the article's sections and links straight to its
 * Cevrynt section, so the claim can be checked in the article itself.
 *
 * Server-rendered with every article, every segment and every link present.
 */
export function ArticleAnatomy({ articles, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.08);
  const [at, setAt] = useState(null);

  const shares = articles.map((a) => a.cevryntShare);
  const counts = {
    all: articles.length,
    last: articles.filter((a) => a.cevryntLast).length,
    avg: Math.round(shares.reduce((n, s) => n + s, 0) / Math.max(1, shares.length)),
    before: articles.filter((a) => !a.cevryntLast).length,
  };
  const shown = at === null ? null : articles[at];

  return (
    <figure className={`bg3${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bg3-readout">
        {readout.figures.map((f) => (
          <div className={`bg3-fig${f.tone ? ` bg3-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bg3-fig-n">
              {/* Counts are padded to two digits; a percentage is not a count. */}
              {f.unit ? counts[f.of] : String(counts[f.of]).padStart(2, "0")}
              {f.unit ? <span className="bg3-fig-u">{f.unit}</span> : null}
            </dt>
            <dd className="bg3-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className={`bg3-chart${at === null ? "" : " is-picked"}`}>
        <p className="bg3-head hx-mono" aria-hidden="true">
          <span>{readout.articleK}</span>
          <span className="bg3-head-bar">
            <span>{readout.startK}</span>
            <span>{readout.endK}</span>
          </span>
          <span className="bg3-head-r">{readout.shareK}</span>
        </p>

        <ol className="bg3-rows" onMouseLeave={() => setAt(null)}>
          {articles.map((a, i) => (
            <li className={`bg3-row${at === i ? " is-on" : ""}`} key={a.slug} style={{ "--i": i }}>
              <Link
                className="bg3-row-a"
                href={`/blog/${a.slug}#${a.cevryntId}`}
                onMouseEnter={() => setAt(i)}
                onFocus={() => setAt(i)}
                aria-label={`${a.title}: ${a.sections.length} sections, the Cevrynt section is ${a.cevryntShare}% and comes last`}
              >
                <span className="bg3-t">{a.short}</span>
                <span className="bg3-bar" aria-hidden="true">
                  {a.sections.map((s) => (
                    <span
                      className={`bg3-seg${s.cevrynt ? " is-cevrynt" : ""}`}
                      key={s.id}
                      style={{ flexGrow: s.share }}
                    />
                  ))}
                </span>
                <span className="bg3-share hx-mono">{a.cevryntShare}%</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <p className="bg3-legend hx-mono">
        <span className="bg3-leg">{readout.legendGuideK}</span>
        <span className="bg3-leg is-cevrynt">{readout.legendCevryntK}</span>
      </p>

      <div className="bg3-routed" aria-live="polite">
        {shown ? (
          <>
            <p className="bg3-routed-k hx-mono">
              {shown.sections.length} {readout.sectionsK} · {readout.cevryntIsK} {shown.cevryntShare}%
            </p>
            <p className="bg3-routed-t">{shown.title}</p>
            <p className="bg3-routed-b">
              <span className="bg3-routed-l hx-mono">{readout.lastK}</span>“{shown.cevryntTitle}”
            </p>
          </>
        ) : (
          <>
            <p className="bg3-routed-k hx-mono">{readout.restK}</p>
            <p className="bg3-routed-b">{readout.restB}</p>
          </>
        )}
      </div>

      <div className="bg3-body">
        <div className="bg3-said">
          <p className="bg3-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="bg3-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="bg3-aside">
          <p className="bg3-aside-k hx-mono">{aside.title}</p>
          <ol className="bg3-audit">
            {aside.items.map((item) => (
              <li className="bg3-audit-row" key={item.k}>
                <span className="bg3-audit-k">{item.k}</span>
                <span className="bg3-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bg3-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bg3-close">{close}</p>
      <figcaption className="bg3-note">{note}</figcaption>
    </figure>
  );
}
