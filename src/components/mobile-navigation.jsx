"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "@/components/icons";
import { NavVector } from "@/components/desktop-navigation";
import { navGroups } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

const descriptions = {
  "Platform overview": "Connect the complete underwriting review.",
  "Why Cevrynt": "Make decisions consistent and explainable.",
  Integrations: "Plan controlled workflow connections.",
  Security: "Review data, access, and audit requirements.",
  "Document Intelligence": "Structure files with source-linked evidence.",
  "Bank Statement Analysis": "Review cash flow and transaction patterns.",
  "Business Verification": "Bring identity signals into the review.",
  "Fraud Signals": "Surface inconsistencies for human analysis.",
  "Policy Engine": "Evaluate lender-defined criteria.",
  "Underwriting Report": "Prepare an evidence-backed deal summary.",
  "Merchant Cash Advance": "Support document-heavy MCA underwriting.",
  "Alternative Lenders": "Standardize SMB finance review.",
  "Brokers and ISOs": "Prepare clearer lender submissions.",
  "E-commerce Merchant Underwriting": "Review commerce-context workflows.",
};

const useCases = [
  ["MCA funders", "/solutions/merchant-cash-advance"],
  ["Alternative lenders", "/solutions/alternative-lenders"],
  ["Brokers and ISOs", "/solutions/brokers-isos"],
  ["E-commerce", "/solutions/ecommerce-merchant-underwriting"],
];

const secondaryNavigation = {
  Platform: ["Workflow", [["Document intake", "/product/document-intelligence"], ["Financial review", "/product/bank-statement-analysis"], ["Human decision", "/platform"]]],
  Product: ["For underwriting teams", [["MCA funders", "/solutions/merchant-cash-advance"], ["Risk and operations", "/why-cevrynt"], ["Policy review", "/product/policy-engine"]]],
  Solutions: ["By use case", useCases],
  Company: ["Company", [["Founder-led pilot", "/pilot"], ["Contact", "/company/contact"], ["Investors", "/company/investors"]]],
  Resources: ["Explore", [["Resource hub", "/resources"], ["Blog", "/blog"], ["FAQ", "/faq"]]],
};

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const reduceMotion = useReducedMotion();
  const close = () => {
    setIsOpen(false);
  };
  const portalTarget = typeof document === "undefined" ? null : document.body;

  useEffect(() => {
    document.body.toggleAttribute("data-mobile-menu-open", isOpen);
    return () => document.body.removeAttribute("data-mobile-menu-open");
  }, [isOpen]);

  useEffect(() => {
    const escape = (event) => event.key === "Escape" && close();
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);

  return (
    <div className="mobile-navigation">
      <a className="mobile-quick-cta" href="https://calendly.com/arin-cevrynt/cevrynt-demo">Get a demo</a>
      <button className="mobile-trigger" type="button" aria-label="Open navigation" aria-controls="mobile-navigation-overlay" aria-expanded={isOpen} onClick={() => setIsOpen(true)}><i /><i /><i /></button>
      {portalTarget && createPortal(<AnimatePresence onExitComplete={() => setActiveGroup(null)}>
        {isOpen && (
          <motion.div className="mobile-overlay" id="mobile-navigation-overlay" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.54, ease: [0.16, 1, 0.3, 1] }}>
            <div className="mobile-overlay-top">
              {activeGroup ? <button className="mobile-back" type="button" onClick={() => setActiveGroup(null)}>← Back</button> : <Link href="/" onClick={close}><Image src="/brand/cevrynt-logo-v2.png" alt="Cevrynt" width={1029} height={366} priority loading="eager" sizes="124px" /></Link>}
              <button className="mobile-close" type="button" aria-label="Close navigation" onClick={close}><i /><i /></button>
            </div>
            <div className="mobile-panel-stage">
            <AnimatePresence initial={false} mode="popLayout">
              {!activeGroup ? (
                <motion.div className="mobile-main-panel" key="main" initial={reduceMotion ? false : { opacity: 0, scale: 0.995 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.995 }} transition={{ duration: reduceMotion ? 0.01 : 0.56, ease: [0.16, 1, 0.3, 1] }}>
                  <nav aria-label="Mobile navigation">
                    {navGroups.map((group) => group.items ? (
                      <button type="button" key={group.label} onClick={() => setActiveGroup(group)}><span>{group.label}</span><ChevronDown /></button>
                    ) : <Link href={group.href} key={group.label} onClick={close}>{group.label}</Link>)}
                  </nav>
                  <div className="mobile-menu-actions"><a href={siteConfig.appUrl}>Sign In</a><a href="https://calendly.com/arin-cevrynt/cevrynt-demo">Get Demo</a></div>
                </motion.div>
              ) : (
                <motion.div className="mobile-sub-panel" key={activeGroup.label} initial={reduceMotion ? false : { opacity: 0, x: 14, scale: 0.995 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 14, scale: 0.995 }} transition={{ duration: reduceMotion ? 0.01 : 0.58, ease: [0.16, 1, 0.3, 1] }}>
                  <section>
                    <p>Cevrynt {activeGroup.label}</p>
                    {activeGroup.items.map(([label, href]) => (
                      <Link href={href} key={href} onClick={close}><span className="mobile-sub-icon"><NavVector label={label} /></span><span><strong>{label}</strong><small>{descriptions[label] || "Explore the Cevrynt workflow."}</small></span></Link>
                    ))}
                  </section>
                  <section className="mobile-use-cases"><p>{secondaryNavigation[activeGroup.label]?.[0] || "Explore"}</p>{(secondaryNavigation[activeGroup.label]?.[1] || []).map(([label, href]) => <Link href={href} key={href} onClick={close}>{label}</Link>)}</section>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </div>
  );
}
