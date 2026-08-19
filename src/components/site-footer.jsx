import Link from "next/link";
import { navGroups } from "@/content/site-pages";
import { ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";

const WORDMARK = "Cevrynt";

const legal = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Cookie Policy", "/cookie-policy"],
];

/**
 * The name as architecture.
 *
 * Every previous attempt stacked the footer: links in a band, then a rule, then
 * a big word underneath. That is why it never felt like one thing — the
 * wordmark was a decoration sitting below the footer rather than part of it.
 *
 * Here the name is not below the content, it is *behind* it. The word fills the
 * whole footer at browser width, drawn as a hairline outline rather than a
 * fill, and the statement, navigation and meta line sit on top of it on their
 * own layer. The outline is the same device the problem section uses for its
 * numerals — outlined so they read as structure instead of competing with the
 * copy — scaled up until it becomes the footer's architecture.
 *
 * Two things hold the layers together: a full-bleed hairline that runs straight
 * across the letters, so a grid line visibly passes in front of the type; and
 * the scale gap itself — 380px letterforms against 12px labels. Only the lower
 * edge of the word carries any fill, so it reads as lit from below and the crop
 * at the page edge lands on the brightest part.
 *
 * aria-hidden on the wordmark: the accessible name is already on the links, and
 * letter-split text would be announced one character at a time.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-bleed" aria-hidden="true" />

      <Reveal className="footer-signature" variant="letters" aria-hidden="true">
        {WORDMARK.split("").map((character, index) => (
          <span className="fw-letter" key={`${character}-${index}`} style={{ "--i": index }}>
            <span className="fw-letter-inner">{character}</span>
          </span>
        ))}
      </Reveal>

      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-say">
            <p className="footer-statement">
              From borrower documents to decision-ready underwriting.
            </p>
            <a className="footer-mail" href="mailto:sales@cevrynt.com">
              <span>sales@cevrynt.com</span>
              <ArrowUpRight />
            </a>
            {/* Lives here rather than in the meta line. As a full sentence laid
                across the middle of the letterforms it was the single most
                cluttered thing in the footer — and it belongs with the brand
                statement anyway. Moving it up also fills the dead space that
                had opened under this column. */}
            <p className="footer-disclaimer">
              Cevrynt is not a lender. Lenders retain final approval authority.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            {navGroups.slice(0, 3).map((group) => (
              <div className="footer-col" key={group.label}>
                <p className="hx-mono footer-col-label">{group.label}</p>
                {group.href && <Link href={group.href}><span>Overview</span></Link>}
                {group.items?.slice(0, 4).map(([label, href]) => (
                  <Link href={href} key={href}><span>{label}</span></Link>
                ))}
              </div>
            ))}
            <div className="footer-col">
              <p className="hx-mono footer-col-label">Company</p>
              <Link href="/about"><span>About</span></Link>
              <Link href="/investors"><span>Investors</span></Link>
              <Link href="/contact"><span>Contact</span></Link>
              <Link href="/partners/shopline"><span>Cevrynt × SHOPLINE</span></Link>
            </div>
          </nav>
        </div>

        {/* Only two short items cross the type now, one hard left and one hard
            right, where the letterforms are quietest. */}
        <div className="footer-meta">
          <span className="hx-mono footer-copy">© {new Date().getFullYear()} Cevrynt</span>
          <ul className="footer-legal">
            {legal.map(([label, href]) => (
              <li key={href}><Link href={href}><span>{label}</span></Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
