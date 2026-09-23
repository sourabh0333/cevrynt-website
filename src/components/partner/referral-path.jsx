"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 01 — A referral path where every step needs somebody's yes.
 *
 * The homepage draws this partnership as two lanes meeting at a question, and
 * E-commerce sets out its limits as a clause. What neither shows is how a
 * referral actually moves, and a partner page is where a reader goes to find
 * that out — so this draws the path.
 *
 * It is a path of people and decisions, not a pipe of data. Four parties sit on
 * a ruled track, and between each pair is a gate that only opens when a named
 * party says yes: the merchant choosing to be referred, the merchant
 * authorising what may be shared for this workflow, and the lender's own
 * policy. Nothing on the track moves by itself.
 *
 * Above the track are the shortcuts a reader might assume exist — data flowing
 * straight from the platform, funding guaranteed by being on it, eligibility
 * set by it, a decision made by Cevrynt — each drawn as an arc and struck
 * through. They are the partnership's notice, drawn where the assumption would
 * sit rather than written in small print underneath.
 *
 * Both marks are shown whole, at the same size, on the light band they were
 * drawn for. Neither is recoloured, cropped or reshaped.
 *
 * Server-rendered with every party, gate and struck shortcut present; arcs are
 * laid out from fixed station positions, not measured.
 */
export function ReferralPath({ parties, gates, shortcuts, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.16);
  const [at, setAt] = useState(null);
  const [cut, setCut] = useState(null);

  const pick = useCallback((i) => setAt((cur) => (cur === i ? null : i)), []);

  /* Stations sit at the centre of four equal columns. */
  const x = (i) => ((i + 0.5) / parties.length) * 100;
  const H = 40;

  const counts = {
    parties: parties.length,
    gates: gates.length,
    automatic: gates.filter((g) => g.automatic).length,
    shortcuts: shortcuts.length,
  };
  const shown = at === null ? null : gates[at];

  return (
    <figure className={`sp1${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="sp1-readout">
        {readout.figures.map((f) => (
          <div className={`sp1-fig${f.tone ? ` sp1-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="sp1-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="sp1-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="sp1-frame">
        <p className="sp1-arcs-k hx-mono">{readout.arcsK}</p>

        {/* The shortcuts a reader might assume, drawn where they would sit and struck. */}
        <div className={`sp1-arcs${cut === null ? "" : " is-cut"}`}>
          <svg className="sp1-svg" viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" aria-hidden="true">
            {shortcuts.map((s, i) => {
              const a = x(s.from);
              const b = x(s.to);
              return (
                <path
                  className={`sp1-arc${cut === i ? " is-on" : ""}`}
                  key={s.k}
                  d={`M ${a} ${H} Q ${(a + b) / 2} ${H - s.h * 2} ${b} ${H}`}
                  style={{ "--i": i }}
                />
              );
            })}
          </svg>

          {shortcuts.map((s, i) => (
            <span
              className={`sp1-x hx-mono${cut === i ? " is-on" : ""}`}
              key={`${s.k}-x`}
              style={{ "--x": `${(x(s.from) + x(s.to)) / 2}%`, "--y": `${((H - s.h) / H) * 100}%`, "--i": i }}
              aria-hidden="true"
            >
              {s.letter}
            </span>
          ))}
        </div>

        {/* The track: four parties, and a gate between each pair. */}
        <div className="sp1-track">
          <span className="sp1-rule" aria-hidden="true" />

          <ol className="sp1-parties">
            {parties.map((p, i) => (
              <li className="sp1-party" key={p.k} style={{ "--i": i }}>
                <span className="sp1-dot" aria-hidden="true" />
                <span className="sp1-mark">
                  {p.logo ? (
                    <Image
                      className="sp1-logo"
                      src={p.logo.src}
                      alt={p.logo.alt}
                      width={p.logo.w}
                      height={p.logo.h}
                      sizes="140px"
                      loading="lazy"
                    />
                  ) : (
                    <span className="sp1-name">{p.k}</span>
                  )}
                </span>
                <span className="sp1-role">{p.role}</span>
                {p.ends ? <span className="sp1-ends hx-mono">{p.ends}</span> : null}
                {/* Stacked on a phone, the gate after this party is written out
                    in place, where the floating gate would have been. */}
                {gates[i] ? (
                  <span className="sp1-inline-gate">
                    <span className="sp1-inline-gate-k hx-mono">{gates[i].k}</span>
                    <span className="sp1-inline-gate-v">{gates[i].cond}</span>
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <ol className="sp1-gates">
            {gates.map((g, i) => (
              <li className={`sp1-gate${at === i ? " is-on" : ""}`} key={g.k} style={{ "--x": `${((i + 1) / parties.length) * 100}%`, "--i": i }}>
                <button
                  className="sp1-gate-b"
                  type="button"
                  aria-pressed={at === i}
                  aria-label={`${g.k}: ${g.cond}`}
                  onClick={() => pick(i)}
                  onMouseEnter={() => setAt(i)}
                >
                  <span className="sp1-gate-m" aria-hidden="true" />
                  <span className="sp1-gate-k hx-mono">{g.k}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <ol className="sp1-key">
          {shortcuts.map((s, i) => (
            <li
              className={`sp1-key-row${cut === i ? " is-on" : ""}`}
              key={s.k}
              onMouseEnter={() => setCut(i)}
              onMouseLeave={() => setCut(null)}
            >
              <span className="sp1-key-x hx-mono" aria-hidden="true">
                {s.letter}
              </span>
              <span className="sp1-key-k">{s.k}</span>
              <span className="sp1-key-v hx-mono">{readout.notK}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="sp1-routed" aria-live="polite">
        <p className="sp1-routed-k hx-mono">{shown ? `${shown.k} · ${readout.whoK} ${shown.who}` : readout.restK}</p>
        <p className="sp1-routed-c">{shown ? shown.cond : null}</p>
        <p className="sp1-routed-b">{shown ? shown.say : readout.restB}</p>
      </div>

      <div className="sp1-body">
        <div className="sp1-said">
          <p className="sp1-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="sp1-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="sp1-aside">
          <p className="sp1-aside-k hx-mono">{aside.title}</p>
          <ol className="sp1-audit">
            {aside.items.map((item) => (
              <li className="sp1-audit-row" key={item.k}>
                <span className="sp1-audit-k">{item.k}</span>
                <span className="sp1-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="sp1-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="sp1-close">{close}</p>
      <figcaption className="sp1-note">{note}</figcaption>
    </figure>
  );
}
