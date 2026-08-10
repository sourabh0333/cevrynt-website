import Image from "next/image";
import Link from "next/link";
import { navGroups } from "@/content/site-pages";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <Image src="/brand/cevrynt-logo-v2.png" alt="Cevrynt" width={1029} height={366} priority loading="eager" sizes="144px" />
          <p>From borrower documents to decision-ready underwriting.</p>
          <p className="footer-disclaimer">Cevrynt is not a lender. Lenders retain final approval authority.</p>
        </div>
        <div className="footer-links">
          {navGroups.slice(0, 3).map((group) => (
            <div key={group.label}>
              <strong>{group.label}</strong>
              {group.href && <Link href={group.href}>Overview</Link>}
              {group.items?.slice(0, 4).map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            </div>
          ))}
          <div>
            <strong>Company</strong>
            <Link href="/about">About</Link>
            <Link href="/investors">Investors</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/partners/shopline">Cevrynt × SHOPLINE</Link>
          </div>
          <div>
            <strong>Legal</strong>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Cevrynt</span>
        <a href="mailto:sales@cevrynt.com">sales@cevrynt.com</a>
      </div>
    </footer>
  );
}
