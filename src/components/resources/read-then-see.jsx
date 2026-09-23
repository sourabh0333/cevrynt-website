"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 03 — Read it, then see it.
 *
 * A guide explains an idea in prose; the product shows the same idea as a
 * screen. This section pairs three guides with the illustrative product view
 * that matches them, and marks the view with numbered pins. Each pin is one of
 * the guide's own section headings — taken from the article, not rewritten —
 * placed on the part of the screen that section is about, with a line saying
 * what to look at there.
 *
 * Pointing at a heading lights its pin, and pointing at a pin lights its
 * heading. Every heading links straight to that section of the guide.
 *
 * The three images share one size, so switching guides never moves the
 * layout. They are illustrative views on synthetic data, and the caption says
 * so under every one of them.
 *
 * Server-rendered with all three guides, every heading link and all three
 * images present; only the selected image is visible.
 */
export function ReadThenSee({ plates, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.12);
  const [at, setAt] = useState(0);
  const [mark, setMark] = useState(null);

  const pick = useCallback((i) => {
    setAt(i);
    setMark(null);
  }, []);

  const plate = plates[at];
  const counts = {
    plates: plates.length,
    marks: plates.reduce((n, p) => n + p.marks.length, 0),
    real: plates.filter((p) => p.realFile).length,
  };

  return (
    <figure className={`rs3${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="rs3-readout">
        {readout.figures.map((f) => (
          <div className={`rs3-fig${f.tone ? ` rs3-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="rs3-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="rs3-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="rs3-plate">
        <div className="rs3-read">
          <p className="rs3-col-k hx-mono">{readout.readK}</p>
          <ol className="rs3-guides">
            {plates.map((p, i) => (
              <li className={`rs3-guide${at === i ? " is-on" : ""}`} key={p.slug} style={{ "--i": i }}>
                <button className="rs3-guide-b" type="button" aria-pressed={at === i} onClick={() => pick(i)}>
                  <span className="rs3-guide-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rs3-guide-t">{p.title}</span>
                  <span className="rs3-guide-m hx-mono">
                    {p.group} · {p.minutes} min
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <p className="rs3-col-k is-marks hx-mono">{readout.marksK}</p>
          <ol className="rs3-marks" key={plate.slug} onMouseLeave={() => setMark(null)}>
            {plate.marks.map((m, i) => (
              <li className={`rs3-mark${mark === i ? " is-on" : ""}`} key={m.id} style={{ "--i": i }}>
                <Link
                  className="rs3-mark-a"
                  href={`/blog/${plate.slug}#${m.id}`}
                  onMouseEnter={() => setMark(i)}
                  onFocus={() => setMark(i)}
                  onBlur={() => setMark(null)}
                >
                  <span className="rs3-mark-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="rs3-mark-t">{m.heading}</span>
                  <span className="rs3-mark-b">{m.look}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className="rs3-see">
          <p className="rs3-col-k hx-mono">{readout.seeK}</p>
          <div className="rs3-frame" style={{ aspectRatio: `${plate.image.w} / ${plate.image.h}` }}>
            {plates.map((p, i) => (
              <div className={`rs3-shot${at === i ? " is-on" : ""}`} key={p.image.src} aria-hidden={at !== i}>
                <Image
                  className="rs3-img"
                  src={p.image.src}
                  alt={p.image.alt}
                  width={p.image.w}
                  height={p.image.h}
                  sizes="(max-width: 860px) 92vw, 640px"
                  loading="lazy"
                />
              </div>
            ))}
            <ol className="rs3-pins" key={plate.slug} aria-hidden="true">
              {plate.marks.map((m, i) => (
                <li
                  className={`rs3-pin${mark === i ? " is-on" : ""}`}
                  key={m.id}
                  style={{ left: `${m.x}%`, top: `${m.y}%`, "--i": i }}
                  onMouseEnter={() => setMark(i)}
                  onMouseLeave={() => setMark(null)}
                >
                  {i + 1}
                </li>
              ))}
            </ol>
          </div>
          <p className="rs3-caption">
            <span className="rs3-caption-k hx-mono">{readout.captionK}</span>
            <Link className="rs3-caption-a" href={plate.product.href}>
              {readout.productK} {plate.product.label} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </div>

      <div className="rs3-body">
        <div className="rs3-said">
          <p className="rs3-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="rs3-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="rs3-aside">
          <p className="rs3-aside-k hx-mono">{aside.title}</p>
          <ol className="rs3-audit">
            {aside.items.map((item) => (
              <li className="rs3-audit-row" key={item.k}>
                <span className="rs3-audit-k">{item.k}</span>
                <span className="rs3-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="rs3-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="rs3-close">{close}</p>
      <figcaption className="rs3-note">{note}</figcaption>
    </figure>
  );
}
