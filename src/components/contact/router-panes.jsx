"use client";

import { useCallback, useRef, useState } from "react";
import { useReady } from "@/components/progressive";

/**
 * 01 — Who you are, and where that goes.
 *
 * A contact page is a routing problem, so this is a router rather than a wall
 * of addresses: pick the reason you are writing and the pane beside it changes
 * to the channel for it, what that conversation covers, and the one action
 * worth taking. Nothing else on this site asks for a click — every other
 * interaction here follows the pointer or the scroll — which is why it suits
 * the one page whose whole job is to send you somewhere.
 *
 * All four panes are rendered on the server and every address is a real link
 * in the markup, so the page is complete and crawlable before any of this
 * runs. Without JavaScript the panes simply stack and all four are readable;
 * the selection only collapses them once there is something to drive it.
 *
 * Proper tab semantics, including arrow keys and Home/End, because a vertical
 * list of controls that changes a pane is a tablist whatever it looks like.
 */
export function RouterPanes({ reasons, foot, note, readout }) {
  const ready = useReady();
  const [active, setActive] = useState(0);
  const tabsRef = useRef(null);

  const onKeyDown = useCallback(
    (event) => {
      const last = reasons.length - 1;
      let next = null;

      if (event.key === "ArrowDown" || event.key === "ArrowRight") next = active === last ? 0 : active + 1;
      else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = last;

      if (next === null) return;
      event.preventDefault();
      setActive(next);
      tabsRef.current?.querySelectorAll("[role='tab']")[next]?.focus();
    },
    [active, reasons.length],
  );

  return (
    <figure className={`rtr${ready ? " is-ready" : ""}`}>
      <p className="rtr-head hx-mono">{readout.head}</p>

      <div className="rtr-body">
        <div className="rtr-tabs" role="tablist" aria-orientation="vertical" ref={tabsRef} onKeyDown={onKeyDown}>
          {reasons.map((r, i) => (
            <button
              className={`rtr-tab${active === i ? " is-active" : ""}`}
              key={r.k}
              type="button"
              role="tab"
              id={`rtr-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`rtr-pane-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              style={{ "--i": i }}
            >
              <span className="rtr-tab-fill" aria-hidden="true" />
              <span className="rtr-tab-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="rtr-tab-k">{r.k}</span>
            </button>
          ))}
        </div>

        <div className="rtr-panes">
          {reasons.map((r, i) => (
            <section
              className={`rtr-pane${active === i ? " is-active" : ""}`}
              key={r.k}
              id={`rtr-pane-${i}`}
              role="tabpanel"
              aria-labelledby={`rtr-tab-${i}`}
              hidden={ready && active !== i}
            >
              <p className="rtr-pane-k hx-mono">{r.channelK}</p>
              <h3 className="rtr-pane-h">{r.channel}</h3>
              <p className="rtr-pane-b">{r.b}</p>

              <ul className="rtr-expect">
                {r.expect.map((e) => (
                  <li className="rtr-expect-item" key={e}>
                    {e}
                  </li>
                ))}
              </ul>

              <a className="rtr-action" href={r.href}>
                <span>{r.action}</span>
                <span className="rtr-action-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </section>
          ))}
        </div>
      </div>

      <p className="rtr-foot">{foot}</p>
      <figcaption className="rtr-note">{note}</figcaption>
    </figure>
  );
}
