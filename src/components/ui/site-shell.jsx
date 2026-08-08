"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerGroups } from "@/content/site-config";
import { Breadcrumb, ButtonLink, Eyebrow, Status, TextLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><Link href="/" className="brand">CEVRYNT<span aria-hidden="true">.</span></Link><p>Underwriting intelligence and decision-support infrastructure for teams making funding decisions.</p><ButtonLink href="/contact" tone="secondary">Book a demo</ButtonLink></div><div className="footer-links">{footerGroups.map((group) => <section key={group.label}><h2>{group.label}</h2>{group.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</section>)}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Cevrynt</span><nav aria-label="Legal navigation"><Link href="/privacy">Privacy draft</Link><Link href="/terms">Terms draft</Link></nav></div></footer>;
}

export function ConversionSection() { return <section className="conversion-section"><Reveal><div><Eyebrow>Build a more defensible decision process</Eyebrow><h2>Bring the next application into focus.</h2><p>See how Cevrynt can help your team connect documents, evidence, policy, and underwriting judgment.</p></div><ButtonLink href="/contact">Book a demo</ButtonLink></Reveal></section>; }

export function FoundationPage({ route }) {
  const isLegalDraft = route.path === "/privacy" || route.path === "/terms";
  return <><main id="main-content"><section className="page-intro"><Breadcrumb route={route} /><Reveal><Eyebrow>{isLegalDraft ? "Draft - pending legal review" : route.eyebrow}</Eyebrow><h1>{route.title.replace(" | Cevrynt", "").replace("Cevrynt | ", "")}</h1><p>{route.intro}</p><div className="page-intro__actions">{route.path === "/contact" ? <Status tone="amber">Contact submissions are not yet configured</Status> : <TextLink href="/contact">Talk with Cevrynt</TextLink>}</div></Reveal></section><section className="foundation-detail"><Reveal><p className="detail-index">01 / Shared foundation</p><h2>{isLegalDraft ? "Prepared for review, not publication." : "A focused introduction, with the product story to follow."}</h2><p>{isLegalDraft ? "This page does not state legal entities, retention periods, compliance commitments, or jurisdictional terms. Those details require founder and legal confirmation." : route.description}</p><Link href={route.path === "/platform" ? "/underwriting" : "/platform"} className="foundation-detail__link">Explore the platform <ArrowUpRight aria-hidden="true" size={18} /></Link></Reveal></section></main><ConversionSection /></>;
}
