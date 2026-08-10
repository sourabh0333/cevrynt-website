import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import { HeroMotion } from "@/components/hero-motion";
import { AnimatedHeroCopy } from "@/components/animated-hero-copy";
import { workflow } from "@/content/site-pages";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const deal = "Illustrative deal · Cedar & Stone LLC";

const productJourney = [
  ["Document intelligence", "Structure borrower files and keep extracted inputs linked to their sources."],
  ["Financial analysis", "Review deposits, balances, cash flow, and transaction patterns in one connected view."],
  ["Verification and fraud", "Surface business conflicts and risk signals for underwriter review."],
  ["Policy evaluation", "Apply lender-defined review criteria while preserving exceptions and overrides."],
  ["Evidence-backed report", "Bring findings, sources, notes, and policy outcomes into a decision-ready report."],
];

export default function Home() {
  return (
    <main id="main-content">
      <HeroMotion>
        <div className="home-hero-inner">
          <AnimatedHeroCopy />
          <div className="hero-actions hero-reveal">
            <a className="primary-cta hero-primary-cta" href={calendlyUrl} target="_blank" rel="noreferrer">Get a demo <span><ArrowUpRight /></span></a>
          </div>
        </div>
        <div className="hero-dashboard-wrap">
          <div className="hero-dashboard-frame">
            <div className="hero-dashboard-float">
              <Image
                src="/media/cevrynt-dashboard-website-analytics.webp"
                alt="Illustrative Cevrynt underwriting workspace showing business verification, cash-flow analysis, fraud review, and underwriting status"
                width={1672}
                height={941}
                priority
                loading="eager"
                sizes="(max-width: 760px) 96vw, 1180px"
              />
            </div>
          </div>
        </div>
      </HeroMotion>

      <section className="canvas-section section-shell">
        <div className="section-heading">
          <p className="section-kicker">Connected underwriting canvas</p>
          <h2>One review surface from intake to report.</h2>
          <p>Keep files, findings, sources, policy outcomes, and reviewer judgment connected throughout the deal.</p>
        </div>
        <div className="deal-canvas">
          <div className="deal-topline"><span>{deal}</span><span>Human review required</span></div>
          <ol className="workflow-list compact">
            {workflow.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
          </ol>
          <div className="canvas-cards">
            <article><span>Documents</span><strong>Files organized</strong><small>Evidence remains source-linked</small></article>
            <article><span>Financials</span><strong>Review prepared</strong><small>Patterns surfaced for analysis</small></article>
            <article><span>Policy</span><strong>Criteria evaluated</strong><small>Exceptions remain visible</small></article>
          </div>
        </div>
      </section>

      <section className="credibility-strip">
        <div className="section-shell credibility-grid">
          <p>Designed for MCA and alternative-lending workflows</p>
          <p>Evidence-linked analysis</p>
          <p>Lender-specific policies</p>
          <p>Human-controlled decisions</p>
        </div>
      </section>

      <section className="problem-section section-shell">
        <p className="section-kicker">The fragmented-workflow problem</p>
        <h2>Underwriting context should not disappear between files, spreadsheets, checks, and policy reviews.</h2>
        <div className="problem-grid">
          <article><span>01</span><h3>Disconnected evidence</h3><p>Analysts spend time moving between borrower files and review tools.</p></article>
          <article><span>02</span><h3>Inconsistent review</h3><p>Important checks can vary by reviewer, queue, or deal complexity.</p></article>
          <article><span>03</span><h3>Hard-to-explain outcomes</h3><p>Findings need sources, context, and a clear record of human judgment.</p></article>
        </div>
      </section>

      <section className="journey-section">
        <div className="section-shell journey-layout">
          <div className="journey-intro">
            <p className="section-kicker">Intake-to-report journey</p>
            <h2>Follow one illustrative deal through every review stage.</h2>
            <p>{deal}</p>
          </div>
          <div className="journey-steps">
            {productJourney.map(([title, description], index) => (
              <article key={title}>
                <div><span>0{index + 1}</span><small>{deal}</small></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link href={[
                  "/product/document-intelligence",
                  "/product/bank-statement-analysis",
                  "/product/fraud-signals",
                  "/product/policy-engine",
                  "/product/underwriting-report",
                ][index]}>Explore capability <ArrowUpRight /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section section-shell">
        <div><p className="section-kicker">Why Cevrynt</p><h2>Decision intelligence that keeps lenders in control.</h2></div>
        <div className="why-list">
          <p><strong>Consistent</strong><span>Bring teams into a shared review workflow.</span></p>
          <p><strong>Explainable</strong><span>Keep findings linked to supporting evidence.</span></p>
          <p><strong>Configurable</strong><span>Evaluate lender-specific policy criteria.</span></p>
          <p><strong>Human-led</strong><span>Preserve notes, overrides, and final authority.</span></p>
        </div>
      </section>

      <section className="shopline-section section-shell">
        <p className="section-kicker">Cevrynt × SHOPLINE</p>
        <h2>Exploring e-commerce merchant-underwriting workflows.</h2>
        <p>A documented development and referral partnership. It does not imply a generally available live integration, automatic data sharing, universal eligibility, or guaranteed funding.</p>
        <Link className="text-link" href="/partners/shopline">Read the partnership context <ArrowUpRight /></Link>
      </section>

      <section className="pilot-section section-shell">
        <div><p className="section-kicker">Founder-led pilot</p><h2>Start with one focused underwriting workflow.</h2></div>
        <div><p>Define representative files, lender-specific review criteria, and a clear evaluation plan with the founder.</p><a className="text-link" href="mailto:arin@cevrynt.com">arin@cevrynt.com <ArrowUpRight /></a></div>
      </section>

      <section className="resources-section section-shell">
        <div className="section-heading"><p className="section-kicker">Resources</p><h2>Practical thinking for modern underwriting teams.</h2></div>
        <div className="resource-grid">
          <Link href="/blog/from-documents-to-decision-ready-underwriting"><span>Article</span><h3>From documents to decision-ready underwriting</h3><ArrowUpRight /></Link>
          <Link href="/faq"><span>FAQ</span><h3>How Cevrynt supports human underwriting</h3><ArrowUpRight /></Link>
          <Link href="/resources"><span>Resources</span><h3>Explore evidence-focused underwriting workflows</h3><ArrowUpRight /></Link>
        </div>
      </section>

      <section className="final-cta">
        <div className="section-shell">
          <p className="section-kicker">Qualified walkthrough</p>
          <h2>Bring your underwriting workflow. We’ll map the review together.</h2>
          <a className="primary-cta" href={calendlyUrl} target="_blank" rel="noreferrer">Book on Calendly <span><ArrowUpRight /></span></a>
        </div>
      </section>
    </main>
  );
}
