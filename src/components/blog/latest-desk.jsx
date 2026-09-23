"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 01 — The newest guide, and what came before it.
 *
 * A blog's front page has one job before any other: show what is new. So the
 * newest article is set as a lead story — its own words, large, with the
 * product view that matches the part of Cevrynt it relates to — and the six
 * before it run down a dated rail beside it, newest at the top.
 *
 * The lead's image is chosen from the article's own related product page, not
 * picked by hand, so when a newer article takes the lead the picture still
 * matches it; an article with no matching view simply leads without one.
 *
 * Both columns open on one label baseline. Every title is a link, and every
 * figure in the readout is counted from the articles.
 *
 * Server-rendered with the lead, the rail and every link present.
 */
export function LatestDesk({ lead, recent, totals, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.1);
  const [at, setAt] = useState(null);

  const counts = { ...totals, recent: recent.length };

  return (
    <figure className={`bg1${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="bg1-readout">
        {readout.figures.map((f) => (
          <div className={`bg1-fig${f.tone ? ` bg1-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="bg1-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="bg1-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="bg1-desk">
        <article className="bg1-lead">
          <p className="bg1-col-k hx-mono">{readout.leadK}</p>
          {lead.image ? (
            <div className="bg1-shot">
              <Image
                className="bg1-img"
                src={lead.image.src}
                alt={lead.image.alt}
                width={lead.image.w}
                height={lead.image.h}
                sizes="(max-width: 980px) 92vw, 760px"
                loading="lazy"
              />
              <p className="bg1-caption hx-mono">{readout.captionK}</p>
            </div>
          ) : null}
          <p className="bg1-meta hx-mono">
            <span className="bg1-cat">{lead.category}</span>
            <span>{lead.date}</span>
            <span>
              {lead.minutes} {readout.minK}
            </span>
          </p>
          <h3 className="bg1-title">
            <Link className="bg1-title-a" href={`/blog/${lead.slug}`}>
              {lead.title}
            </Link>
          </h3>
          <p className="bg1-excerpt">{lead.excerpt}</p>
          <p className="bg1-go">
            <Link className="bg1-go-a" href={`/blog/${lead.slug}`} aria-label={`${readout.readK}: ${lead.title}`}>
              {readout.readK} <span aria-hidden="true">→</span>
            </Link>
            {lead.product ? (
              <Link className="bg1-go-a is-product" href={lead.product.href}>
                {readout.productK} {lead.product.label} <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </p>
        </article>

        <div className="bg1-rail-col">
          <p className="bg1-col-k hx-mono">{readout.recentK}</p>
          <ol className="bg1-rail" onMouseLeave={() => setAt(null)}>
            {recent.map((p, i) => (
              <li className={`bg1-item${at === i ? " is-on" : ""}`} key={p.slug} style={{ "--i": i }}>
                <Link
                  className="bg1-item-a"
                  href={`/blog/${p.slug}`}
                  onMouseEnter={() => setAt(i)}
                  onFocus={() => setAt(i)}
                >
                  <span className="bg1-item-d hx-mono">{p.dateShort}</span>
                  <span className="bg1-node" aria-hidden="true" />
                  <span className="bg1-item-t">{p.title}</span>
                  <span className="bg1-item-m hx-mono">
                    {p.category} · {p.minutes} {readout.minK}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="bg1-more">
            <a className="bg1-more-a" href="#calendar-heading">
              {readout.moreK} <span aria-hidden="true">↓</span>
            </a>
          </p>
        </div>
      </div>

      <div className="bg1-body">
        <div className="bg1-said">
          <p className="bg1-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="bg1-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="bg1-aside">
          <p className="bg1-aside-k hx-mono">{aside.title}</p>
          <ol className="bg1-audit">
            {aside.items.map((item) => (
              <li className="bg1-audit-row" key={item.k}>
                <span className="bg1-audit-k">{item.k}</span>
                <span className="bg1-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="bg1-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="bg1-close">{close}</p>
      <figcaption className="bg1-note">{note}</figcaption>
    </figure>
  );
}
