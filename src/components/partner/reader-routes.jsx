"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 06 — Three readers, three routes, and none of them is an application.
 *
 * A partner page is read by people who need different things from it: a
 * merchant who sells on SHOPLINE, a lender funding e-commerce merchants, and a
 * platform thinking about merchant financing. Leaving them to work out where
 * to go is how a merchant ends up believing they can apply here.
 *
 * So the figure is a fork. One trunk splits into three branches, each ending
 * at a reader's row: what the partnership means for them, what it does not,
 * and where to go next. Pointing at a row lights its branch; every row is
 * always readable. The merchant's route deliberately ends at information, not
 * at a Cevrynt form, because Cevrynt is not a lender and takes no funding
 * applications — the readout counts that as zero.
 *
 * Server-rendered with every reader, every destination and the fork present.
 */
export function ReaderRoutes({ readers, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);

  const counts = {
    readers: readers.length,
    destinations: readers.reduce((n, r) => n + r.go.length, 0),
    applications: readers.reduce((n, r) => n + r.go.filter((g) => g.application).length, 0),
  };
  const y = (i) => ((i + 0.5) / readers.length) * 100;

  return (
    <figure className={`sp6${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="sp6-readout">
        {readout.figures.map((f) => (
          <div className={`sp6-fig${f.tone ? ` sp6-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="sp6-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="sp6-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className={`sp6-fork${at === null ? "" : " is-picked"}`} onMouseLeave={() => setAt(null)}>
        <div className="sp6-trunk" aria-hidden="true">
          <span className="sp6-trunk-k hx-mono">{readout.trunkK}</span>
          <svg className="sp6-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {readers.map((r, i) => (
              <path
                className={`sp6-branch${at === i ? " is-on" : ""}`}
                key={`${r.k}-branch`}
                d={`M 0 50 C 50 50, 50 ${y(i)}, 100 ${y(i)}`}
                pathLength="1"
                style={{ "--i": i }}
              />
            ))}
          </svg>
        </div>

        <ol className="sp6-readers">
          {readers.map((r, i) => (
            <li
              className={`sp6-reader${at === i ? " is-on" : ""}`}
              key={r.k}
              style={{ "--i": i }}
              onMouseEnter={() => setAt(i)}
              onFocus={() => setAt(i)}
            >
              <p className="sp6-reader-k">
                <span className="sp6-reader-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                {r.k}
              </p>
              <dl className="sp6-lines">
                <div className="sp6-line">
                  <dt className="sp6-line-k hx-mono">{readout.meansK}</dt>
                  <dd className="sp6-line-b">{r.means}</dd>
                </div>
                <div className="sp6-line is-not">
                  <dt className="sp6-line-k hx-mono">{readout.notK}</dt>
                  <dd className="sp6-line-b">{r.not}</dd>
                </div>
              </dl>
              <ul className="sp6-go">
                {r.go.map((g) => (
                  <li className="sp6-go-i" key={g.label}>
                    {g.external ? (
                      <a className="sp6-go-a" href={g.href}>
                        {g.label}
                        <span className="sp6-go-arrow" aria-hidden="true">
                          →
                        </span>
                      </a>
                    ) : (
                      <Link className="sp6-go-a" href={g.href}>
                        {g.label}
                        <span className="sp6-go-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>

      <div className="sp6-body">
        <div className="sp6-said">
          <p className="sp6-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="sp6-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="sp6-aside">
          <p className="sp6-aside-k hx-mono">{aside.title}</p>
          <ol className="sp6-audit">
            {aside.items.map((item) => (
              <li className="sp6-audit-row" key={item.k}>
                <span className="sp6-audit-k">{item.k}</span>
                <span className="sp6-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="sp6-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="sp6-close">{close}</p>
      <figcaption className="sp6-note">{note}</figcaption>
    </figure>
  );
}
