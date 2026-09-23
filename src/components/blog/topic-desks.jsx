"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 04 — One desk per topic.
 *
 * The oldest shape a blog has is the section front: pick a topic, see what has
 * been written about it. Here each of the eight topics is a desk — a one-line
 * brief, every article filed under it, and the page on this site where that
 * topic becomes product.
 *
 * Where a topic has an illustrative product view that genuinely matches it,
 * the desk shows it; where it does not, the desk shows a typeset plate of the
 * topic instead of reaching for an unrelated picture. Views and plates share
 * one frame size, so switching topics never moves the layout; wide views are
 * letterboxed on their own background rather than cropped or stretched.
 *
 * The topic list is also the tab list, with arrow keys moving between topics.
 *
 * Server-rendered with every topic, the default desk and its links present;
 * every article is also listed in the archive above.
 */
export function TopicDesks({ desks, initial, readout, aside, close, note }) {
  const scope = useRef(null);
  const tabs = useRef([]);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.1);
  const [at, setAt] = useState(initial);

  const onKey = (e, i) => {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + desks.length) % desks.length;
    setAt(next);
    tabs.current[next]?.focus();
  };

  const desk = desks[at];
  const counts = {
    topics: desks.length,
    views: desks.filter((d) => d.image).length,
    all: desks.reduce((n, d) => n + d.articles.length, 0),
  };

  return (
    <figure className={`bg4${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bg4-readout">
        {readout.figures.map((f) => (
          <div className="bg4-fig" key={f.k}>
            <dt className="bg4-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="bg4-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="bg4-room">
        <div className="bg4-index">
          <p className="bg4-col-k hx-mono">{readout.topicsK}</p>
          <div className="bg4-tabs" role="tablist" aria-label={readout.topicsK} aria-orientation="vertical">
            {desks.map((d, i) => (
              <button
                className={`bg4-tab${at === i ? " is-on" : ""}`}
                type="button"
                role="tab"
                key={d.k}
                id={`bg4-tab-${i}`}
                aria-selected={at === i}
                aria-controls="bg4-desk"
                tabIndex={at === i ? 0 : -1}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                onClick={() => setAt(i)}
                onKeyDown={(e) => onKey(e, i)}
                style={{ "--i": i }}
              >
                <span className="bg4-tab-k">{d.k}</span>
                <span className="bg4-tab-n hx-mono">{d.articles.length}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg4-desk" id="bg4-desk" role="tabpanel" aria-labelledby={`bg4-tab-${at}`} key={desk.k}>
          <p className="bg4-col-k hx-mono">{readout.deskK}</p>
          <div className="bg4-pic">
          <div className={`bg4-frame${desk.image ? "" : " is-plate"}${desk.image?.wide ? " is-wide" : ""}`}>
            {desk.image ? (
              <Image
                className="bg4-img"
                src={desk.image.src}
                alt={desk.image.alt}
                width={desk.image.w}
                height={desk.image.h}
                sizes="(max-width: 980px) 92vw, 560px"
                loading="lazy"
              />
            ) : (
              <span className="bg4-plate" aria-hidden="true">
                <span className="bg4-plate-k">{desk.plate}</span>
                <span className="bg4-plate-n hx-mono">
                  {desk.articles.length} {readout.articlesK}
                </span>
              </span>
            )}
          </div>
          {desk.image ? <p className="bg4-caption hx-mono">{readout.captionK}</p> : null}
          </div>

          <div className="bg4-text">
          <p className="bg4-brief">{desk.brief}</p>

          <ol className="bg4-list">
            {desk.articles.map((a) => (
              <li className="bg4-row" key={a.slug}>
                <Link className="bg4-row-a" href={`/blog/${a.slug}`}>
                  <span className="bg4-t">{a.title}</span>
                  <span className="bg4-m hx-mono">
                    {a.date} · {a.minutes} {readout.minK}
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          {desk.product ? (
            <p className="bg4-go">
              <Link className="bg4-go-a" href={desk.product.href}>
                {readout.productK} {desk.product.label} <span aria-hidden="true">→</span>
              </Link>
            </p>
          ) : null}
          </div>
        </div>
      </div>

      <div className="bg4-body">
        <div className="bg4-said">
          <p className="bg4-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="bg4-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="bg4-aside">
          <p className="bg4-aside-k hx-mono">{aside.title}</p>
          <ol className="bg4-audit">
            {aside.items.map((item) => (
              <li className="bg4-audit-row" key={item.k}>
                <span className="bg4-audit-k">{item.k}</span>
                <span className="bg4-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bg4-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bg4-close">{close}</p>
      <figcaption className="bg4-note">{note}</figcaption>
    </figure>
  );
}
