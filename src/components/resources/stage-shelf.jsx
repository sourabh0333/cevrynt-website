"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 01 — The library, shelved along the workflow it explains.
 *
 * Every guide on the blog already names the workflow stage it belongs to, so
 * the hub does not need categories of its own: it shelves each guide over its
 * stage, Intake to Human Decision. A guide is a spine standing on the axis,
 * and its height is its reading time, so a shelf shows at a glance both how
 * much there is to read about a stage and how long it takes.
 *
 * Two stages have no guide of their own, and the shelf says so rather than
 * hiding the gap. What covers them is the set of whole-workflow guides, drawn
 * as a bracket spanning all eight stages above the shelf.
 *
 * Every spine is a real link to its guide. Pointing at or focusing one reads
 * it out below — category, reading time, excerpt and the product page it
 * relates to. On narrow screens the spines lie down and show their titles.
 *
 * Server-rendered with every guide title and link present.
 */
export function StageShelf({ shelves, across, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.12);
  const [at, setAt] = useState(null);

  const show = useCallback((slug) => setAt(slug), []);

  const all = [...shelves.flatMap((s) => s.guides), ...across];
  const bySlug = new Map(all.map((g) => [g.slug, g]));
  const shown = at ? bySlug.get(at) : null;
  const shownStage = shown ? shelves.find((s) => s.guides.includes(shown))?.stage || readout.acrossK : null;

  const counts = {
    staged: shelves.reduce((n, s) => n + s.guides.length, 0),
    across: across.length,
    covered: shelves.filter((s) => s.guides.length).length,
    uncovered: shelves.filter((s) => !s.guides.length).length,
  };

  const minutes = (list) => list.reduce((n, g) => n + g.minutes, 0);

  return (
    <figure className={`rs1${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="rs1-readout">
        {readout.figures.map((f) => (
          <div className={`rs1-fig${f.tone ? ` rs1-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="rs1-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="rs1-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className={`rs1-library${at ? " is-picked" : ""}`} onMouseLeave={() => setAt(null)}>
        {/* The whole-workflow guides span every stage. */}
        <div className="rs1-across">
          <p className="rs1-across-k hx-mono">
            {readout.acrossK} <span className="rs1-across-m">· {minutes(across)} min</span>
          </p>
          <ul className="rs1-across-list">
            {across.map((g, i) => (
              <li className={`rs1-across-i${at === g.slug ? " is-on" : ""}`} key={g.slug} style={{ "--i": i }}>
                <Link
                  className="rs1-across-a"
                  href={`/blog/${g.slug}`}
                  onMouseEnter={() => show(g.slug)}
                  onFocus={() => show(g.slug)}
                >
                  <span className="rs1-across-t">{g.title}</span>
                  <span className="rs1-across-min hx-mono">{g.minutes} min</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ol className="rs1-shelves">
          {shelves.map((s, c) => (
            <li className={`rs1-shelf${s.guides.length ? "" : " is-empty"}`} key={s.stage} style={{ "--c": c }}>
              <ul className="rs1-spines" aria-label={`${s.stage}: ${s.guides.length} guides`}>
                {s.guides.length ? (
                  s.guides.map((g, i) => (
                    <li className={`rs1-spine-i${at === g.slug ? " is-on" : ""}`} key={g.slug} style={{ "--m": g.minutes, "--i": i }}>
                      <Link
                        className="rs1-spine"
                        href={`/blog/${g.slug}`}
                        onMouseEnter={() => show(g.slug)}
                        onFocus={() => show(g.slug)}
                      >
                        <span className="rs1-spine-bar" aria-hidden="true" />
                        <span className="rs1-spine-t">{g.title}</span>
                        <span className="rs1-spine-min hx-mono">{g.minutes} min</span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="rs1-gap hx-mono">{readout.emptyK}</li>
                )}
              </ul>
              <p className="rs1-stage">
                <span className="rs1-stage-n hx-mono">{String(c + 1).padStart(2, "0")}</span>
                <span className="rs1-stage-k">{s.stage}</span>
                <span className="rs1-stage-m hx-mono">
                  {s.guides.length ? `${s.guides.length} · ${minutes(s.guides)} min` : readout.noneK}
                </span>
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="rs1-routed" aria-live="polite">
        {shown ? (
          <>
            <p className="rs1-routed-k hx-mono">
              {shownStage} · {shown.category} · {shown.minutes} min
            </p>
            <p className="rs1-routed-t">{shown.title}</p>
            <p className="rs1-routed-b">{shown.excerpt}</p>
            <p className="rs1-routed-go">
              <Link className="rs1-routed-a" href={`/blog/${shown.slug}`}>
                {readout.readK} <span aria-hidden="true">→</span>
              </Link>
              {shown.product ? (
                <Link className="rs1-routed-a is-product" href={shown.product.href}>
                  {shown.product.label} <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </p>
          </>
        ) : (
          <>
            <p className="rs1-routed-k hx-mono">{readout.restK}</p>
            <p className="rs1-routed-b">{readout.restB}</p>
          </>
        )}
      </div>

      <div className="rs1-body">
        <div className="rs1-said">
          <p className="rs1-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="rs1-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="rs1-aside">
          <p className="rs1-aside-k hx-mono">{aside.title}</p>
          <ol className="rs1-audit">
            {aside.items.map((item) => (
              <li className="rs1-audit-row" key={item.k}>
                <span className="rs1-audit-k">{item.k}</span>
                <span className="rs1-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="rs1-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="rs1-close">{close}</p>
      <figcaption className="rs1-note">{note}</figcaption>
    </figure>
  );
}
