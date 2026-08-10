"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "@/components/icons";
import { navGroups } from "@/content/site-pages";

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
  About: "Meet the team building Cevrynt.",
  Investors: "Review the company vision and opportunity.",
  Contact: "Start a focused conversation with the founder.",
  Resources: "Explore practical underwriting guidance.",
  Blog: "Read product and market perspectives.",
  FAQ: "Get concise answers about Cevrynt.",
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

const visualCopy = {
  Platform: ["Connected workflow", "Intake to human decision, in one review path."],
  Product: ["Evidence-linked analysis", "Move from documents to evidence-backed review."],
  Solutions: ["Lender-controlled", "Adapt the workflow to the way your team underwrites."],
  Company: ["Founder-led", "Build the future of explainable underwriting with us."],
  Resources: ["Underwriting intelligence", "Practical context for modern lending teams."],
};

export function NavVector({ label }) {
  const key = label.toLowerCase();
  if (key.includes("bank") || key.includes("cash") || key.includes("investor")) {
    return <svg viewBox="0 0 24 24"><path d="M4 19V9m5 10V5m6 14v-7m5 7V3" /><path d="M3 19h18" /></svg>;
  }
  if (key.includes("document") || key.includes("report") || key.includes("resource") || key.includes("blog")) {
    return <svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 12h6M9 16h6" /></svg>;
  }
  if (key.includes("security") || key.includes("fraud") || key.includes("verification")) {
    return <svg viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6z" /><path d="m9 12 2 2 4-5" /></svg>;
  }
  if (key.includes("policy") || key.includes("faq")) {
    return <svg viewBox="0 0 24 24"><path d="M5 5h14M5 12h14M5 19h14" /><circle cx="9" cy="5" r="2" /><circle cx="15" cy="12" r="2" /><circle cx="10" cy="19" r="2" /></svg>;
  }
  if (key.includes("integration") || key.includes("platform") || key.includes("e-commerce")) {
    return <svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="m9 11 6-4M9 13l6 4" /></svg>;
  }
  if (key.includes("about") || key.includes("contact") || key.includes("broker") || key.includes("lender")) {
    return <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c.8-4.2 3.5-6.5 8-6.5s7.2 2.3 8 6.5" /></svg>;
  }
  return <svg viewBox="0 0 24 24"><path d="M4 17 9 12l3 3 8-9" /><path d="M15 6h5v5" /></svg>;
}

function MenuVisual({ group }) {
  const [kicker, title] = visualCopy[group] || visualCopy.Platform;
  const showGlobe = group === "Product" || group === "Solutions";
  return (
    <aside className={`nav-feature nav-feature-${group.toLowerCase()}`}>
      {showGlobe ? (
        <svg className="nav-feature-vector nav-feature-globe" viewBox="0 0 320 250" aria-hidden="true">
          <defs>
            <radialGradient id={`globe-${group}`} cx="38%" cy="27%"><stop offset="0" stopColor="#fff8d5" /><stop offset="0.48" stopColor="#cbe9e2" /><stop offset="1" stopColor="#76aaa1" /></radialGradient>
            <clipPath id={`globe-clip-${group}`}><circle cx="160" cy="96" r="103" /></clipPath>
            <filter id={`usa-glow-${group}`} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3" /></filter>
          </defs>
          <circle className="globe-sphere" cx="160" cy="96" r="103" fill={`url(#globe-${group})`} />
          <g clipPath={`url(#globe-clip-${group})`}>
            <path className="globe-grid" d="M48 96h224M57 56h206M59 136h202M160-10v212M105 1c39 48 39 142 0 190M215 1c-39 48-39 142 0 190M66 96c0-56 42-101 94-101s94 45 94 101-42 101-94 101S66 152 66 96Z" />
            <path className="globe-land globe-canada" d="M58 44 73 23l24-10 23 6 11-10 24 9 8 17-13 7-9 17-18 2-13 12-18-4-9-13-17 1Z" />
            <path className="globe-land globe-usa" d="m79 62 13 2 13 3 12-3 9-4 13 2 8 4 8 7 7 3-3 8-5 5-10 3-8 5-10 1-8-4-8 3-8-3-6-6-8-5-5-7Z" />
            <path className="globe-land globe-usa globe-usa-alaska" d="m62 47 8-5 8 2 5 7-7 5-9-2Z" />
            <path className="globe-land globe-usa globe-usa-hawaii" d="m97 108 3 1 2 2-3 1-3-2Zm8 4 2 1-1 2-3-1Z" />
            <path className="globe-land globe-mexico" d="m89 92 16 9 15-5 10 11 9 7-8 8-14-9-10-10-12 1Z" />
            <path className="globe-land globe-south-america" d="m134 119 17 3 15 14-3 20-12 19-4 23-11 19-8-17 3-22-9-17 2-17-8-11Z" />
            <path className="globe-land globe-europe" d="m210 45 17-8 24 7 12 13-7 12-19-2-10 10-14-8-12-12Z" />
            <path className="globe-land globe-africa" d="m220 76 25 2 15 16-4 25-14 25-13-10-4-22-13-18Z" />
            <path className="globe-land globe-asia" d="m248 45 24-8 25 9 16 23-16 22-20-9-17-19Z" />
            <path className="globe-usa-halo" d="m79 62 13 2 13 3 12-3 9-4 13 2 8 4 8 7 7 3-3 8-5 5-10 3-8 5-10 1-8-4-8 3-8-3-6-6-8-5-5-7Z" filter={`url(#usa-glow-${group})`} />
          </g>
          <ellipse className="globe-focus-ring" cx="119" cy="80" rx="47" ry="27" />
          <circle className="globe-signal" cx="119" cy="80" r="4.5" />
        </svg>
      ) : (
        <svg className="nav-feature-vector" viewBox="0 0 320 230" aria-hidden="true">
          <path className="vector-grid" d="M20 45h280M20 90h280M20 135h280M20 180h280M65 18v194M125 18v194M185 18v194M245 18v194" />
          <path className="vector-line" d="M25 170c42-3 52-75 94-68s54 52 91 20 44-71 84-67" />
          <circle cx="119" cy="102" r="6" /><circle cx="210" cy="122" r="6" /><circle cx="294" cy="55" r="6" />
        </svg>
      )}
      <div className="nav-feature-copy"><span>{kicker}</span><strong>{title}</strong></div>
    </aside>
  );
}

export function DesktopNavigation() {
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const header = navRef.current?.closest(".site-header");
    header?.toggleAttribute("data-menu-open", Boolean(openMenu));
    window.dispatchEvent(new Event("cevrynt-nav-sync"));
    return () => header?.removeAttribute("data-menu-open");
  }, [openMenu]);

  useEffect(() => {
    const closeOutside = (event) => {
      if (!navRef.current?.contains(event.target)) setOpenMenu(null);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <nav className="desktop-nav" aria-label="Primary navigation" ref={navRef}>
      {navGroups.map((group) => {
        if (!group.items) return <Link className="nav-link" href={group.href} key={group.label}>{group.label}</Link>;
        const isOpen = openMenu === group.label;
        const [secondaryLabel, secondaryLinks] = secondaryNavigation[group.label] || secondaryNavigation.Platform;
        return (
          <div className={`nav-menu${isOpen ? " is-open" : ""}`} key={group.label}>
            <button type="button" aria-expanded={isOpen} aria-haspopup="true" onClick={() => setOpenMenu(isOpen ? null : group.label)}>
              {group.label}<ChevronDown />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className={`nav-panel nav-panel-${group.label.toLowerCase()}`}
                  initial={reduceMotion ? { x: "-50%", opacity: 1 } : { x: "-50%", opacity: 0, scale: 0.985 }}
                  animate={{ x: "-50%", opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? { x: "-50%", opacity: 0 } : { x: "-50%", opacity: 0, scale: 0.99, transition: { duration: 0.16, ease: "easeOut" } }}
                  transition={{ delay: reduceMotion ? 0 : 0.1, duration: reduceMotion ? 0.01 : 0.46, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="nav-panel-inner">
                    <div className="nav-panel-content">
                      <div className="nav-panel-main">
                        <p className="nav-panel-label">Cevrynt {group.label}</p>
                        <div className="nav-panel-grid">
                          {group.items.map(([label, href], index) => (
                            <motion.div key={href} initial={reduceMotion ? false : { opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: reduceMotion ? 0 : 0.1 + 0.035 * index, duration: 0.34, ease: [0.22, 1, 0.36, 1] }}>
                              <Link href={href} onClick={() => setOpenMenu(null)}>
                                <span className="nav-item-icon" aria-hidden="true"><NavVector label={label} /></span>
                                <span className="nav-item-copy"><strong>{label}</strong><small>{descriptions[label] || "Explore Cevrynt's lender-first workflow."}</small></span>
                                <ArrowUpRight />
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div className="nav-use-cases">
                        <p className="nav-panel-label">{secondaryLabel}</p>
                        {secondaryLinks.map(([label, href]) => <Link href={href} key={href} onClick={() => setOpenMenu(null)}>{label}</Link>)}
                      </div>
                    </div>
                    <MenuVisual group={group.label} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}
