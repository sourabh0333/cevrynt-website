"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 02 — Reading routes, drawn as a line map.
 *
 * A shelf answers "what is there about this stage". Most readers arrive with a
 * different question — "I fund merchant cash advances, where do I start?" — so
 * this section lays the same guides out as routes: one line per kind of
 * reader, four stops in reading order, ending at the page on this site that
 * describes their workflow.
 *
 * Some guides sit on more than one route. Those are interchanges, drawn as
 * open rings and computed from the routes themselves, and pointing at one
 * lights it everywhere it appears — which is the quickest way to see that the
 * bank-statement guide, for instance, is where two different readers begin to
 * overlap.
 *
 * Each route's length in minutes is summed from the guides' own reading times.
 * Every stop is a real link to a public guide; nothing on a route sits behind
 * a form.
 *
 * Server-rendered with every route, stop and link present.
 */
export function ReadingRoutes({ routes, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.12);
  const [atRoute, setAtRoute] = useState(null);
  const [atSlug, setAtSlug] = useState(null);

  const seen = new Map();
  routes.forEach((r, ri) =>
    r.stops.forEach((s) => seen.set(s.slug, [...(seen.get(s.slug) || []), ri])),
  );
  const shared = new Set([...seen].filter(([, on]) => on.length > 1).map(([slug]) => slug));

  const counts = {
    routes: routes.length,
    guides: seen.size,
    shared: shared.size,
    gated: routes.reduce((n, r) => n + r.stops.filter((s) => s.gated).length, 0),
  };

  const minutes = (r) => r.stops.reduce((n, s) => n + s.minutes, 0);
  const alsoOn = (slug, ri) =>
    (seen.get(slug) || [])
      .filter((x) => x !== ri)
      .map((x) => String(x + 1).padStart(2, "0"))
      .join(", ");

  return (
    <figure className={`rs2${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="rs2-readout">
        {readout.figures.map((f) => (
          <div className={`rs2-fig${f.tone ? ` rs2-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="rs2-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="rs2-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <ol
        className={`rs2-map${atRoute === null ? "" : " is-picked"}`}
        onMouseLeave={() => {
          setAtRoute(null);
          setAtSlug(null);
        }}
      >
        {routes.map((r, ri) => (
          <li
            className={`rs2-route${atRoute === ri ? " is-on" : ""}`}
            key={r.k}
            style={{ "--r": ri }}
            onMouseEnter={() => setAtRoute(ri)}
            onFocus={() => setAtRoute(ri)}
          >
            <p className="rs2-route-k">
              <span className="rs2-route-n hx-mono">
                {readout.routeK} {String(ri + 1).padStart(2, "0")}
              </span>
              <span className="rs2-route-t">{r.k}</span>
              <span className="rs2-route-m hx-mono">
                {r.stops.length} {readout.stopsK} · {minutes(r)} min
              </span>
            </p>

            <ol className="rs2-line" style={{ "--n": r.stops.length }}>
              {r.stops.map((s, si) => {
                const inter = shared.has(s.slug);
                return (
                  <li
                    className={`rs2-stop${inter ? " is-inter" : ""}${atSlug === s.slug ? " is-on" : ""}`}
                    key={s.slug}
                    style={{ "--s": si }}
                  >
                    <Link
                      className="rs2-stop-a"
                      href={`/blog/${s.slug}`}
                      title={s.title}
                      onMouseEnter={() => setAtSlug(s.slug)}
                      onFocus={() => setAtSlug(s.slug)}
                    >
                      <span className="rs2-node" aria-hidden="true" />
                      <span className="rs2-stop-t">{s.short}</span>
                      <span className="rs2-stop-m hx-mono">
                        {s.minutes} min
                        {inter ? ` · ${readout.alsoK} ${alsoOn(s.slug, ri)}` : ""}
                      </span>
                    </Link>
                  </li>
                );
              })}
              <li className="rs2-end">
                <Link className="rs2-end-a" href={r.terminus.href}>
                  <span className="rs2-end-mark" aria-hidden="true" />
                  <span className="rs2-end-k hx-mono">{readout.endK}</span>
                  <span className="rs2-end-t">
                    {r.terminus.label} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            </ol>
          </li>
        ))}
      </ol>

      <p className="rs2-legend hx-mono">
        <span className="rs2-leg is-stop">{readout.legendStopK}</span>
        <span className="rs2-leg is-inter">{readout.legendInterK}</span>
        <span className="rs2-leg is-end">{readout.legendEndK}</span>
      </p>

      <div className="rs2-body">
        <div className="rs2-said">
          <p className="rs2-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="rs2-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="rs2-aside">
          <p className="rs2-aside-k hx-mono">{aside.title}</p>
          <ol className="rs2-audit">
            {aside.items.map((item) => (
              <li className="rs2-audit-row" key={item.k}>
                <span className="rs2-audit-k">{item.k}</span>
                <span className="rs2-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="rs2-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="rs2-close">{close}</p>
      <figcaption className="rs2-note">{note}</figcaption>
    </figure>
  );
}
