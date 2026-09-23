"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 02 — Every article, on the day it was published.
 *
 * The archive is usually the least designed part of a blog: a grid of cards
 * that all look the same. Here it is a calendar. Each month is a strip of its
 * days, and every article is a mark on the day it was published, so the
 * rhythm of the writing is visible before a single title is read — and the
 * full list for that month sits directly beneath its strip.
 *
 * A search field and the topic filter work together: every word typed must
 * appear in an article's title, summary or topic. Matching marks stay lit and
 * matching rows stay listed; the rest dim. Topic counts follow the search.
 * Pointing at a row lights its mark. Nothing is
 * hidden from search engines: every article's link is in the list.
 *
 * Server-rendered with every month, mark and article link present.
 */
export function PublishingCalendar({ months, categories, cadence, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.06);
  const [topic, setTopic] = useState(null);
  const [query, setQuery] = useState("");
  const [at, setAt] = useState(null);

  // Every word typed must appear in the title, summary or topic.
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  const matchesQuery = (p) => {
    const hay = `${p.title} ${p.excerpt} ${p.category}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  };
  const keeps = (p) => (topic === null || p.category === topic) && matchesQuery(p);

  const all = months.flatMap((m) => m.posts);
  const searched = all.filter(matchesQuery);
  const perTopic = new Map(categories.map((c) => [c, searched.filter((p) => p.category === c).length]));
  const showing = all.filter(keeps).length;
  const counts = { all: all.length, months: months.length, showing };

  return (
    <figure className={`bg2${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bg2-readout">
        {readout.figures.map((f) => (
          <div className={`bg2-fig${f.tone ? ` bg2-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bg2-fig-n">{f.of === "cadence" ? cadence : String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="bg2-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="bg2-search" role="search">
        <label className="bg2-search-k hx-mono" htmlFor="bg2-q">
          {readout.searchK}
        </label>
        <div className="bg2-field">
          <input
            className="bg2-input"
            id="bg2-q"
            type="search"
            value={query}
            placeholder={readout.placeholder}
            autoComplete="off"
            spellCheck="false"
            onChange={(e) => setQuery(e.target.value)}
          />
          {query ? (
            <button className="bg2-clear" type="button" onClick={() => setQuery("")}>
              {readout.clearK}
            </button>
          ) : null}
        </div>
      </div>

      <div className="bg2-topics" role="group" aria-label={readout.topicsK}>
        <button
          className={`bg2-topic${topic === null ? " is-on" : ""}`}
          type="button"
          aria-pressed={topic === null}
          onClick={() => setTopic(null)}
        >
          {readout.allK} <span className="bg2-topic-n hx-mono">{searched.length}</span>
        </button>
        {categories.map((c) => (
          <button
            className={`bg2-topic${topic === c ? " is-on" : ""}`}
            type="button"
            key={c}
            aria-pressed={topic === c}
            onClick={() => setTopic((cur) => (cur === c ? null : c))}
          >
            {c} <span className="bg2-topic-n hx-mono">{perTopic.get(c)}</span>
          </button>
        ))}
      </div>

      <p className="bg2-status hx-mono" aria-live="polite">
        {showing} {showing === 1 ? readout.oneK : readout.manyK}
        {topic ? ` · ${topic}` : ""}
        {words.length ? ` · “${query.trim()}”` : ""}
      </p>

      <ol className="bg2-months" onMouseLeave={() => setAt(null)}>
        {months.map((m, mi) => {
          const visible = m.posts.filter(keeps);
          return (
            <li className="bg2-month" key={m.key} style={{ "--m": mi }}>
              <p className="bg2-month-k">
                <span className="bg2-month-t">{m.label}</span>
                <span className="bg2-month-n hx-mono">
                  {m.posts.length} {m.posts.length === 1 ? readout.oneK : readout.manyK}
                </span>
              </p>

              <div className="bg2-cal">
                {/* The month as a strip of days; each article is a mark on its day. */}
                <div className="bg2-strip" aria-hidden="true" style={{ "--days": m.days }}>
                  {[1, 8, 15, 22, 29].filter((d) => d <= m.days).map((d) => (
                    <span className="bg2-tick hx-mono" key={d} style={{ "--d": d }}>
                      {d}
                    </span>
                  ))}
                  {m.posts.map((p, pi) => (
                    <span
                      className={`bg2-mark${keeps(p) ? "" : " is-out"}${at === p.slug ? " is-on" : ""}`}
                      key={p.slug}
                      style={{ "--d": p.day, "--i": pi }}
                      onMouseEnter={() => setAt(p.slug)}
                    />
                  ))}
                </div>

                {visible.length ? (
                  <ol className="bg2-list">
                    {visible.map((p) => (
                      <li className={`bg2-row${at === p.slug ? " is-on" : ""}`} key={p.slug}>
                        <Link
                          className="bg2-row-a"
                          href={`/blog/${p.slug}`}
                          onMouseEnter={() => setAt(p.slug)}
                          onFocus={() => setAt(p.slug)}
                        >
                          <span className="bg2-day hx-mono">{String(p.day).padStart(2, "0")}</span>
                          <span className="bg2-t">{p.title}</span>
                          <span className="bg2-cat hx-mono">{p.category}</span>
                          <span className="bg2-min hx-mono">
                            {p.minutes} {readout.minK}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="bg2-none">{readout.noneK}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="bg2-body">
        <div className="bg2-said">
          <p className="bg2-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="bg2-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="bg2-aside">
          <p className="bg2-aside-k hx-mono">{aside.title}</p>
          <ol className="bg2-audit">
            {aside.items.map((item) => (
              <li className="bg2-audit-row" key={item.k}>
                <span className="bg2-audit-k">{item.k}</span>
                <span className="bg2-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bg2-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bg2-close">{close}</p>
      <figcaption className="bg2-note">{note}</figcaption>
    </figure>
  );
}
