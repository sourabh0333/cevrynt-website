"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHasEntered, useReady } from "@/components/progressive";
import { RichText } from "@/components/rich-text";

/**
 * 01 — The short answer first.
 *
 * Most people open an FAQ with one question and want the answer to it, not a
 * paragraph to read before they find out whether it is yes or no. So every
 * question here is set on one line with its short answer beside it — "No.",
 * "By design", "Case by case" — and the full answer opens underneath only when
 * the reader wants the reasoning.
 *
 * The short answers that are a plain "No." are set in amber, because they are
 * the boundaries: not a lender, not a replacement for the underwriter, no
 * published approval rates, no live SHOPLINE integration, no public pricing.
 * The readout counts them from the rows, and separately counts answers that
 * quote a performance number: none do.
 *
 * Every row has its own anchor. A link to #some-question — including the ones
 * in the next section — opens that row.
 *
 * Server-rendered with every question, short answer and full answer present;
 * closed answers are collapsed and hidden from assistive technology until
 * opened.
 */
export function AnswerLedger({ groups, guides, readout, aside, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const entered = useHasEntered(scope, 0.08);
  const [open, setOpen] = useState(() => new Set());

  const items = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const numberOf = useMemo(() => new Map(items.map((item, i) => [item.id, i + 1])), [items]);
  const allOpen = open.size === items.length;

  const toggle = useCallback(
    (id) =>
      setOpen((cur) => {
        const next = new Set(cur);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      }),
    [],
  );

  // A link to a question's anchor opens it — on arrival, on hash changes, and
  // on a repeat click of the same in-page link, which changes no hash.
  useEffect(() => {
    const ids = new Set(items.map((i) => i.id));
    const openId = (id) => {
      if (ids.has(id)) setOpen((cur) => (cur.has(id) ? cur : new Set(cur).add(id)));
    };
    const follow = () => openId(decodeURIComponent(window.location.hash.slice(1)));
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (a) openId(decodeURIComponent(a.hash.slice(1)));
    };
    const first = window.setTimeout(follow, 0);
    window.addEventListener("hashchange", follow);
    document.addEventListener("click", onClick);
    return () => {
      window.clearTimeout(first);
      window.removeEventListener("hashchange", follow);
      document.removeEventListener("click", onClick);
    };
  }, [items]);

  const counts = {
    all: items.length,
    groups: groups.length,
    no: items.filter((i) => i.tone === "no").length,
    figures: items.filter((i) => /\d+(\.\d+)?\s?%/.test(i.a)).length,
  };

  return (
    <figure className={`fq1${ready ? " is-ready" : ""}${entered ? " is-in" : ""}`} ref={scope}>
      <dl className="fq1-readout">
        {readout.figures.map((f) => (
          <div className={`fq1-fig${f.tone ? ` fq1-fig-${f.tone}` : ""}`} key={f.k}>
            <dt className="fq1-fig-n">{String(counts[f.of]).padStart(2, "0")}</dt>
            <dd className="fq1-fig-k hx-mono">{f.k}</dd>
          </div>
        ))}
      </dl>

      <div className="fq1-controls">
        <p className="fq1-controls-k hx-mono">{readout.tryK}</p>
        <button
          className="fq1-all"
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(items.map((i) => i.id)))}
        >
          {allOpen ? readout.closeAllK : readout.openAllK}
        </button>
      </div>

      <div className="fq1-ledger">
        <p className="fq1-head hx-mono" aria-hidden="true">
          <span />
          <span>{readout.questionK}</span>
          <span>{readout.shortK}</span>
          <span />
        </p>

        {groups.map((g, gi) => (
          <section className="fq1-group" key={g.title} aria-labelledby={`fq1-g-${gi}`}>
            <h3 className="fq1-group-k" id={`fq1-g-${gi}`}>
              <span className="fq1-group-n hx-mono">{String(gi + 1).padStart(2, "0")}</span>
              {g.title}
              <span className="fq1-group-m hx-mono">
                {g.items.length} {readout.questionsK}
              </span>
            </h3>
            <ol className="fq1-rows">
              {g.items.map((item) => {
                const n = numberOf.get(item.id);
                const isOpen = open.has(item.id);
                return (
                  <li className={`fq1-row${isOpen ? " is-open" : ""}`} key={item.id} id={item.id} style={{ "--i": n }}>
                    <button
                      className="fq1-row-b"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-a`}
                      onClick={() => toggle(item.id)}
                    >
                      <span className="fq1-n hx-mono">{String(n).padStart(2, "0")}</span>
                      <span className="fq1-q">{item.q}</span>
                      <span className={`fq1-short is-${item.tone}`}>{item.short}</span>
                      <span className="fq1-toggle" aria-hidden="true" />
                    </button>
                    <div className="fq1-a" id={`${item.id}-a`} role="region" aria-label={item.q}>
                      <div className="fq1-a-in">
                        <p className="fq1-a-b">
                          <RichText text={item.a} />
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>

      {/* These answers are about Cevrynt; questions about underwriting practice
          are answered in the guides, and indexed on the resources page. */}
      <p className="fq1-guides">
        <span className="fq1-guides-k hx-mono">{guides.k}</span>
        <Link className="fq1-guides-a" href={guides.href}>
          {guides.label} <span aria-hidden="true">→</span>
        </Link>
      </p>

      <div className="fq1-body">
        <div className="fq1-said">
          <p className="fq1-said-k hx-mono">{readout.saidK}</p>
          {readout.saidB.map((b) => (
            <p className="fq1-said-b" key={b}>
              {b}
            </p>
          ))}
        </div>

        <div className="fq1-aside">
          <p className="fq1-aside-k hx-mono">{aside.title}</p>
          <ol className="fq1-audit">
            {aside.items.map((item) => (
              <li className="fq1-audit-row" key={item.k}>
                <span className="fq1-audit-k">{item.k}</span>
                <span className="fq1-audit-v hx-mono">{item.v}</span>
              </li>
            ))}
          </ol>
          <p className="fq1-audit-note">{aside.note}</p>
        </div>
      </div>

      <p className="fq1-close">{close}</p>
      <figcaption className="fq1-note">{note}</figcaption>
    </figure>
  );
}
