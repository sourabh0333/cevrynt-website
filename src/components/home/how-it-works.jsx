"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@/components/icons";
import { ProductShot } from "@/components/home/product-shot";

/** How long each stage holds before the strip advances itself. */
const CYCLE_MS = 6800;

/** Circumference of the dial's r=14 circle, used as its dash length. */
const DIAL_LENGTH = 87.96;

const REDUCED = "(prefers-reduced-motion: reduce)";
const COARSE = "(pointer: coarse)";

/** Every store reads false on the server, so the markup ships fully expanded. */
const neverChanges = () => () => {};
const subscribeQuery = (query) => (notify) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", notify);
  return () => mq.removeEventListener("change", notify);
};
const subscribeReduced = subscribeQuery(REDUCED);
const subscribeCoarse = subscribeQuery(COARSE);

/**
 * A stage panel above a row of stage cards.
 *
 * The open card is the active stage, and the panel above it shows that stage's
 * view. The row advances itself on a timer drawn as a ring around the open
 * card's number — hovering the row or tabbing into it visibly stops that ring,
 * so the copy never moves while it is being read, and picking a card restarts
 * the count on the one you chose.
 *
 * Everything is server-rendered plain text. Without JavaScript the accordion
 * simply stays open on every card and the whole section still reads.
 */
export function HowItWorks({ deal, stages }) {
  const scope = useRef(null);
  const stripRef = useRef(null);
  const uid = useId();

  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const [runKey, setRunKey] = useState(0);

  // Progressive enhancement: the accordion only engages once JS is running.
  const ready = useSyncExternalStore(neverChanges, () => true, () => false);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const coarse = useSyncExternalStore(subscribeCoarse, () => window.matchMedia(COARSE).matches, () => false);

  // Arming the accordion collapses eight open steps into one, which takes about
  // 900px out of the document. Every ScrollTrigger below this section was
  // measured against the taller version, so they all have to be re-measured or
  // they fire hundreds of pixels away from where they should — the section's
  // own animation looks fine while the ones under it appear dead.
  useEffect(() => {
    if (!ready) return;
    ScrollTrigger.refresh();
  }, [ready]);

  // Nothing should tick while the section is off-screen.
  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    // No observer means no gate rather than no rotation: the strip is the
    // point, the off-screen saving is only an optimisation.
    if (typeof IntersectionObserver === "undefined") {
      window.setTimeout(() => setInView(true), 0);
      return undefined;
    }

    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(root);

    return () => io.disconnect();
  }, []);

  // Native listeners rather than React's synthetic enter/leave, so the hold is
  // driven by the element itself and behaves the same however it is triggered.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return undefined;

    const hold = () => setHeld(true);
    const release = () => setHeld(false);

    strip.addEventListener("mouseenter", hold);
    strip.addEventListener("mouseleave", release);
    strip.addEventListener("focusin", hold);
    strip.addEventListener("focusout", release);

    return () => {
      strip.removeEventListener("mouseenter", hold);
      strip.removeEventListener("mouseleave", release);
      strip.removeEventListener("focusin", hold);
      strip.removeEventListener("focusout", release);
    };
  }, []);

  // Touch devices get a plain accordion: there is no hover with which to hold
  // the rotation still, and continuous work does not belong on them anyway.
  const running = ready && inView && !held && !reduced && !coarse;

  // Holding keeps the time already served, so releasing continues the same
  // stage rather than restarting it — which is what the dial shows.
  const remainingRef = useRef(CYCLE_MS);
  const startedRef = useRef(0);

  useEffect(() => {
    remainingRef.current = CYCLE_MS;
  }, [active, runKey]);

  useEffect(() => {
    if (!running) {
      if (startedRef.current) {
        const served = Date.now() - startedRef.current;
        remainingRef.current = Math.max(500, remainingRef.current - served);
        startedRef.current = 0;
      }
      return undefined;
    }

    startedRef.current = Date.now();
    const id = window.setTimeout(() => {
      startedRef.current = 0;
      setActive((index) => (index + 1) % stages.length);
    }, remainingRef.current);

    return () => window.clearTimeout(id);
  }, [running, active, runKey, stages.length]);

  const select = useCallback((index) => {
    setActive(index);
    setRunKey((key) => key + 1);
  }, []);

  const stage = stages[active];
  const total = String(stages.length).padStart(2, "0");

  return (
    <section
      className={`hw band-light${ready ? " is-ready" : ""}`}
      ref={scope}
      aria-labelledby="how-heading"
    >
      <div className="eg hw-head">
        <span className="eg-rail hx-mono">02</span>
        <div className="eg-head">
          <p className="hx-kicker">How it works</p>
          <h2 className="t-display-2" id="how-heading">
            One deal. Eight steps. Nothing important gets lost between them.
          </h2>
        </div>
        <p className="eg-lede t-lede">
          A file moves through Cevrynt as one continuous underwriting record — from the documents that came in to the evidence, checks, policy calls and final memo your team reviews.
        </p>
      </div>

      <div className="eg hw-body">
        <div className="hw-stage-col">
          <div className="hw-panel">
            <div className="hw-panel-top">
              <span className="hx-mono hw-panel-deal">{deal}</span>
              <span className="hx-mono hw-count">
                <span className="hw-count-now">{String(active + 1).padStart(2, "0")}</span> / {total}
              </span>
            </div>

            <p className="hw-stage-now">
              <span className="hw-stage-label">{stage.title}</span>
            </p>

            <div className="hw-figure-stack" role="group" aria-label="Illustrative view for the selected stage">
              {stages.map((item, index) => {
                const live = index === active;
                return (
                  <div
                    className={`hw-figure${live ? " is-live" : ""}`}
                    key={item.title}
                    aria-hidden={ready && !live ? "true" : undefined}
                    // The export's own canvas colour, so the letterboxing that
                    // keeps the shot uncropped reads as the panel continuing
                    // rather than as bars around a picture.
                    style={item.canvas ? { "--stage-canvas": item.canvas } : undefined}
                  >
                    {/* The crossfade between stages is the effect here, so the
                        shot brings its frame but not its own scroll motion. */}
                    <ProductShot
                      src={item.image}
                      alt={item.imageAlt}
                      // Real exports carry their own intrinsic size; the
                      // placeholders are drawn at the same ratio as a real export.
                      width={item.imageWidth || 1600}
                      height={item.imageHeight || 760}
                      label={item.title}
                      // Only the stacked layout uses this — the desktop band
                      // sets an explicit height, which overrides the ratio. So
                      // a phone gets a box shaped to the export and fills its
                      // width, while the band stays one height for all stages.
                      aspect={
                        item.imageWidth && item.imageHeight
                          ? `${item.imageWidth} / ${item.imageHeight}`
                          : "1600 / 760"
                      }
                      sizes="(max-width: 1080px) 92vw, (max-width: 1518px) calc(100vw - 48px), 1470px"
                      motion={false}
                      parallax={false}
                    />
                  </div>
                );
              })}
            </div>

            <p className="hw-panel-note">Illustrative workspace. Not real borrower data.</p>
          </div>
        </div>

        <div className="hw-strip" ref={stripRef}>
          {stages.map((item, index) => {
            const live = index === active;
            const headId = `${uid}-h${index}`;
            const panelId = `${uid}-p${index}`;

            return (
              <article className={`hwc${live ? " is-live" : ""}`} key={item.title}>
                <h3 className="hwc-title">
                  <button
                    type="button"
                    className="hwc-btn"
                    id={headId}
                    aria-expanded={live}
                    aria-controls={panelId}
                    onClick={() => select(index)}
                  >
                    <span className="hwc-mark">
                      <span className="hx-mono hwc-index">{String(index + 1).padStart(2, "0")}</span>
                      {live && ready && !reduced && !coarse ? (
                        <svg className="hwc-dial" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
                          <circle className="hwc-dial-track" cx="16" cy="16" r="14" />
                          <circle
                            className="hwc-dial-run"
                            cx="16"
                            cy="16"
                            r="14"
                            key={`${active}:${runKey}`}
                            // Freezing the sweep rather than restarting it is
                            // what keeps the dial honest about the time owed.
                            style={{
                              strokeDasharray: DIAL_LENGTH,
                              animationDuration: `${CYCLE_MS}ms`,
                              animationPlayState: running ? "running" : "paused",
                            }}
                          />
                        </svg>
                      ) : null}
                    </span>
                    <span className="hwc-name">{item.title}</span>
                  </button>
                </h3>

                <div className="hwc-panel" id={panelId} role="region" aria-labelledby={headId} inert={ready && !live}>
                  <div className="hwc-panel-in">
                    <p className="t-body">{item.body}</p>
                    <Link className="hwc-link" href={item.href}>
                      Explore capability <ArrowUpRight />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
