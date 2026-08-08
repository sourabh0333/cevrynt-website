"use client";

import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navigationGroups } from "@/content/site-config";

function GroupLinks({ group, onNavigate, pathname }) {
  return <div className="nav-group"><p>{group.label}</p>{group.links.map((link) => <Link key={link.href} href={link.href} onClick={onNavigate} className={pathname === link.href ? "is-active" : ""}><strong>{link.label}</strong><span>{link.description}</span></Link>)}</div>;
}

export default function SiteNavigation() {
  const [openGroup, setOpenGroup] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const close = () => { setOpenGroup(null); setMobileOpen(false); };

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === "Escape") { close(); toggleRef.current?.focus(); } };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  useEffect(() => {
    const updateScrolled = () => setScrolled((previous) => {
      const next = window.scrollY > 12;
      return previous === next ? previous : next;
    });
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);
  useEffect(() => {
    const onPointerDown = (event) => { if (menuRef.current && !menuRef.current.contains(event.target)) setOpenGroup(null); };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`} ref={menuRef}>
    <Link href="/" className="brand" aria-label="Cevrynt home" onClick={close}>CEVRYNT<span aria-hidden="true">.</span></Link>
    <nav className="desktop-nav" aria-label="Primary navigation">
      {navigationGroups.map((group) => <div className="nav-dropdown" key={group.label}><button type="button" className={group.links.some((link) => pathname === link.href) ? "is-active" : ""} aria-expanded={openGroup === group.label} aria-controls={`nav-${group.label}`} onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}>{group.label}<ChevronDown size={15} aria-hidden="true" /></button><AnimatePresence>{openGroup === group.label && <motion.div id={`nav-${group.label}`} className="mega-menu" initial={reducedMotion ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}><GroupLinks group={group} onNavigate={close} pathname={pathname} /></motion.div>}</AnimatePresence></div>)}
      <Link href="/partners/shopline" onClick={close} className={pathname === "/partners/shopline" ? "is-active" : ""}>SHOPLINE</Link><Link href="/resources" onClick={close} className={pathname === "/resources" ? "is-active" : ""}>Resources</Link>
    </nav>
    <Link href="/contact" className="button button--primary header-cta">Book a demo</Link>
    <button type="button" className="menu-toggle" ref={toggleRef} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
    <AnimatePresence>{mobileOpen && <motion.nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation" initial={reducedMotion ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}><div className="mobile-menu__inner">{navigationGroups.map((group) => <GroupLinks key={group.label} group={group} onNavigate={close} pathname={pathname} />)}<div className="nav-group"><p>Explore</p><Link href="/partners/shopline" onClick={close} className={pathname === "/partners/shopline" ? "is-active" : ""}><strong>SHOPLINE partnership</strong><span>Commerce underwriting intelligence.</span></Link><Link href="/resources" onClick={close} className={pathname === "/resources" ? "is-active" : ""}><strong>Resources</strong><span>Practical thinking for lending teams.</span></Link><Link href="/company" onClick={close} className={pathname === "/company" ? "is-active" : ""}><strong>Company</strong><span>Why Cevrynt is being built.</span></Link></div><Link href="/contact" className="button button--primary mobile-cta" onClick={close}>Book a demo</Link></div></motion.nav>}</AnimatePresence>
  </header>;
}
