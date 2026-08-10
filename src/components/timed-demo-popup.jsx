"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@/components/icons";

const STORAGE_KEY = "cevrynt_demo_prompt_v1";
const SESSION_KEY = "cevrynt_demo_prompt_seen";
const ACTIVE_DELAY = 45_000;
const DISMISS_FOR = 7 * 24 * 60 * 60 * 1000;

export function TimedDemoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ dismissedUntil: Date.now() + DISMISS_FOR }));
    setIsOpen(false);
  }, []);

  useEffect(() => {
    let stored = {};
    try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch {}
    if (sessionStorage.getItem(SESSION_KEY) || Number(stored.dismissedUntil) > Date.now()) return undefined;

    let remaining = ACTIVE_DELAY;
    let startedAt = document.visibilityState === "visible" ? Date.now() : null;
    let timer;
    const schedule = () => {
      if (document.visibilityState !== "visible" || remaining <= 0) return;
      startedAt = Date.now();
      timer = window.setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, "1");
        setIsOpen(true);
      }, remaining);
    };
    const pause = () => {
      if (timer) window.clearTimeout(timer);
      if (startedAt) remaining = Math.max(0, remaining - (Date.now() - startedAt));
      timer = undefined;
      startedAt = null;
    };
    const visibility = () => { pause(); schedule(); };
    document.addEventListener("visibilitychange", visibility);
    schedule();
    return () => { pause(); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    closeRef.current?.focus();
    const escape = (event) => event.key === "Escape" && dismiss();
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [isOpen, dismiss]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="demo-prompt-backdrop" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.32 }} onMouseDown={(event) => event.target === event.currentTarget && dismiss()}>
          <motion.section className="demo-prompt" role="dialog" aria-modal="true" aria-labelledby="demo-prompt-title" initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.99 }} transition={{ duration: reduceMotion ? 0.01 : 0.52, ease: [0.16, 1, 0.3, 1] }}>
            <div className="demo-prompt-product" aria-hidden="true">
              <div className="demo-app-tabs"><span>Documents</span><span>Financials</span><span>Verification</span><span>Policy</span></div>
              <div className="demo-app-card"><small>BUSINESS &amp; IDENTITY</small><strong>Blue Ribbon Lawns Inc.</strong><div><span>Registry status</span><b>Active</b></div><div><span>Jurisdiction</span><b>Florida</b></div></div>
              <div className="demo-app-grid"><div><small>Bank statements</small><b>Reviewed</b></div><div><small>Risk signals</small><b>Needs review</b></div><div><small>Policy evaluation</small><b>3 conditions</b></div><div><small>Underwriting report</small><b>Ready</b></div></div>
              <div className="demo-app-status"><b>Business verified</b><span>Evidence linked to source</span></div>
            </div>
            <div className="demo-prompt-copy">
              <button ref={closeRef} className="demo-prompt-close" type="button" aria-label="Close demo invitation" onClick={dismiss}><i /><i /></button>
              <p className="eyebrow">See Cevrynt in context</p>
              <h2 id="demo-prompt-title">From borrower documents to decision-ready underwriting.</h2>
              <p>Walk through how Cevrynt structures documents, reviews financials, surfaces risk signals, and prepares evidence-linked analysis for your underwriting team.</p>
              <a className="demo-animated-cta" href="https://calendly.com/arin-cevrynt/cevrynt-demo" target="_blank" rel="noreferrer"><span className="cta-swap cta-swap-base">Get Demo <ArrowUpRight /></span><span className="cta-swap cta-swap-hover" aria-hidden="true">Get Demo <ArrowUpRight /></span></a>
              <small>Cevrynt supports human review. Lenders retain final decision authority.</small>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
