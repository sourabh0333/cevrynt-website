"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 04 — Every question the guides already answer.
 *
 * Each guide ends with its own short FAQ. Spread across the library, those are
 * the questions lending teams most often bring, and they are hard to find one
 * article at a time. This section gathers every one of them into a single
 * index that can be searched as you type.
 *
 * The filter strip doubles as a chart: one column per group — six stages, the
 * whole-workflow guides and the audience guides — with a bar showing how many
 * questions in that group match the current search. Type "stacking" and the
 * bars redraw to show where the answers live before you read a single row.
 *
 * Each row links to the answering guide's FAQ. Answers are not copied here;
 * they stay in the guide, next to the reasoning they belong to. When nothing
 * matches, the section says so plainly and offers the founder's inbox.
 *
 * Server-rendered with the search field, the full strip and the first rows;
 * every other question appears as soon as the reader searches, filters or
 * asks for all of them. The questions themselves are also on each guide.
 */
const FIRST = 12;

function terms(query) {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.replace(/[^a-z0-9%$.-]/g, ""))
    .filter((t) => t.length > 1);
}

function Marked({ text, words }) {
  if (!words.length) return text;
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return text.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

export function QuestionIndex({ questions, groups, readout, aside, close, note, askHref }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.12);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState(null);
  const [all, setAll] = useState(false);

  const words = useMemo(() => terms(query), [query]);
  const matching = useMemo(
    () =>
      questions.filter((q) => {
        const hay = `${q.q} ${q.guide}`.toLowerCase();
        return words.every((w) => hay.includes(w));
      }),
    [questions, words],
  );
  const perGroup = groups.map((g) => matching.filter((q) => q.group === g.k).length);
  const peak = Math.max(1, ...groups.map((g) => questions.filter((q) => q.group === g.k).length));
  const shown = group === null ? matching : matching.filter((q) => q.group === group);
  const visible = all || words.length || group !== null ? shown : shown.slice(0, FIRST);

  const counts = {
    all: questions.length,
    guides: new Set(questions.map((q) => q.slug)).size,
    matching: shown.length,
  };

  return (
    <figure className={`rs4${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="rs4-readout">
        {readout.figures.map((f) => (
          <div className={`rs4-fig${f.tone ? ` rs4-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="rs4-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="rs4-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="rs4-search" role="search">
        <label className="rs4-search-k hx-mono" htmlFor="rs4-q">
          {readout.searchK}
        </label>
        <div className="rs4-field">
          <input
            className="rs4-input"
            id="rs4-q"
            type="search"
            value={query}
            placeholder={readout.placeholder}
            autoComplete="off"
            spellCheck="false"
            onChange={(e) => setQuery(e.target.value)}
          />
          {query ? (
            <button className="rs4-clear" type="button" onClick={() => setQuery("")}>
              {readout.clearK}
            </button>
          ) : null}
        </div>
      </div>

      {/* The filter strip is also a histogram of where the matches live. */}
      <div className="rs4-strip" role="group" aria-label={readout.stripK}>
        <button
          className={`rs4-group is-all${group === null ? " is-on" : ""}`}
          type="button"
          aria-pressed={group === null}
          onClick={() => setGroup(null)}
        >
          <span className="rs4-bar" aria-hidden="true">
            <span className="rs4-bar-fill" style={{ "--h": matching.length ? 1 : 0 }} />
          </span>
          <span className="rs4-group-n hx-mono">{matching.length}</span>
          <span className="rs4-group-k">{readout.allK}</span>
        </button>
        {groups.map((g, i) => (
          <button
            className={`rs4-group${group === g.k ? " is-on" : ""}${perGroup[i] ? "" : " is-zero"}`}
            type="button"
            key={g.k}
            aria-pressed={group === g.k}
            onClick={() => setGroup((cur) => (cur === g.k ? null : g.k))}
            style={{ "--i": i }}
          >
            <span className="rs4-bar" aria-hidden="true">
              <span className="rs4-bar-fill" style={{ "--h": perGroup[i] / peak }} />
            </span>
            <span className="rs4-group-n hx-mono">{perGroup[i]}</span>
            <span className="rs4-group-k">{g.label}</span>
          </button>
        ))}
      </div>

      <p className="rs4-status hx-mono" aria-live="polite">
        {shown.length
          ? `${shown.length} ${shown.length === 1 ? readout.oneK : readout.manyK}${
              group ? ` · ${groups.find((g) => g.k === group).label}` : ""
            }`
          : readout.noneK}
      </p>

      {shown.length ? (
        <ol className="rs4-list">
          {visible.map((q) => (
            <li className="rs4-row" key={`${q.slug}-${q.q}`}>
              <Link className="rs4-row-a" href={`/blog/${q.slug}#faq`}>
                <span className="rs4-q">
                  <Marked text={q.q} words={words} />
                </span>
                <span className="rs4-src">
                  <span className="rs4-src-t">{q.guide}</span>
                  <span className="rs4-src-g hx-mono">{groups.find((g) => g.k === q.group).label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="rs4-empty">
          <p className="rs4-empty-b">{readout.emptyB}</p>
          <a className="rs4-empty-a" href={askHref}>
            {readout.askK} <span aria-hidden="true">→</span>
          </a>
        </div>
      )}

      <div className="rs4-foot">
        {visible.length < shown.length ? (
          <button className="rs4-more" type="button" onClick={() => setAll(true)}>
            {readout.moreK} {shown.length} <span aria-hidden="true">↓</span>
          </button>
        ) : (
          <span />
        )}
        {/* Guide FAQs are about underwriting; questions about Cevrynt itself live on the site FAQ. */}
        <Link className="rs4-site" href={readout.siteFaq.href}>
          {readout.siteFaq.label} <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="rs4-body">
        <div className="rs4-said">
          <p className="rs4-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="rs4-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="rs4-aside">
          <p className="rs4-aside-k hx-mono">{aside.title}</p>
          <ol className="rs4-audit">
            {aside.items.map((item) => (
              <li className="rs4-audit-row" key={item.k}>
                <span className="rs4-audit-k">{item.k}</span>
                <span className="rs4-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="rs4-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="rs4-close">{close}</p>
      <figcaption className="rs4-note">{note}</figcaption>
    </figure>
  );
}
