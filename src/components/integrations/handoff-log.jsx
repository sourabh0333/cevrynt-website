"use client";

import { useRef, useState } from "react";
import { PointerField } from "@/components/home/fx";
import { useReady } from "@/components/progressive";

/**
 * The same deal's trail, with and without a connection.
 *
 * A connection's whole value is that steps stop existing, so this is the
 * artifact where steps are recorded — an audit trail, which this product
 * genuinely keeps rather than a diagram invented for a marketing page.
 *
 * Earlier passes rendered it as flat ruled rows, which was the same mistake the
 * section above was making: austere hairlines on a page whose own vocabulary is
 * elevation, translucency and light. So the rows are glass now, lifted off a lit
 * stage, and switching to the connected trail does not merely collapse the
 * manual ones — they lift, blur, and dissolve out of the stack while the
 * survivors settle up into their place. The log renumbers itself around them
 * with a CSS counter, so the tally and the numbers down the margin can never
 * disagree with what is actually on screen.
 *
 * The rows that survive are the more important half of the argument: everything
 * a connection removes is clerical, and the underwriter's review, notes and
 * approval stand in both trails, untouched.
 *
 * Without JavaScript the full trail renders with its hand-offs marked.
 */
export function HandoffLog({ steps, caveat }) {
  const ready = useReady();
  const groupRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const mode = connected ? "connected" : "today";

  const manual = steps.filter((step) => step.manual).length;
  const remaining = steps.length - manual;

  const onKeyDown = (event) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const next = !connected;
    setConnected(next);
    groupRef.current?.querySelectorAll("[role='radio']")[next ? 1 : 0]?.focus();
  };

  return (
    <div className={`hl${ready ? " is-ready" : ""}`} data-mode={mode}>
      <div className="hl-control">
       <div
  className="hl-seg"
  ref={groupRef}
  role={ready ? "radiogroup" : undefined}
  aria-label={
    ready
      ? "Compare the current underwriting workflow with a connected workflow"
      : undefined
  }
  onKeyDown={ready ? onKeyDown : undefined}
>
  <span className="hl-thumb" aria-hidden="true" />

  <button
    type="button"
    className={`hl-opt${connected ? "" : " is-live"}`}
    role={ready ? "radio" : undefined}
    aria-checked={ready ? !connected : undefined}
    tabIndex={ready && connected ? -1 : 0}
    onClick={() => setConnected(false)}
  >
    Current workflow
  </button>

  <button
    type="button"
    className={`hl-opt${connected ? " is-live" : ""}`}
    role={ready ? "radio" : undefined}
    aria-checked={ready ? connected : undefined}
    tabIndex={ready && !connected ? -1 : 0}
    onClick={() => setConnected(true)}
  >
    With a connection
  </button>
</div>
        <p className="hl-caveat">{caveat}</p>
      </div>

      <PointerField selector=".hl-stage" className="hl-field">
        <div className="hl-stage">
          <span className="hl-ambient" aria-hidden="true" />
          <span className="hl-key" aria-hidden="true" />

          <p className="hl-tally" aria-live="polite">
            <span className="hl-tally-n">{ready && connected ? remaining : steps.length}</span>
            <span className="hl-tally-l">steps</span>
            <span className="hl-tally-sep" aria-hidden="true" />
            <span className="hl-tally-n hl-tally-hand">{ready && connected ? "none" : manual}</span>
            <span className="hl-tally-l">by hand</span>
          </p>

          <ol className="hl-log">
            {steps.map((step, index) => (
              <li className={`hl-step${step.manual ? " is-manual" : ""}`} key={step.text} style={{ "--i": index }}>
                <span className="hl-step-inner">
                  <span className="hl-step-card">
                    <span className="hx-mono hl-step-no" aria-hidden="true" />
                    <span className="hx-mono hl-step-actor">{step.actor}</span>
                    <span className="hl-step-text">{step.text}</span>
                    {step.manual ? <span className="hx-mono hl-step-flag">by hand</span> : null}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </PointerField>

      <p className="hl-close">
       Connections remove the clerical handoffs. Review, judgment, notes, exceptions, and final approval stay with your team.
      </p>
    </div>
  );
}
