import { ConversionSection } from "@/components/ui/site-shell";
import { ButtonLink, Eyebrow, Status, TextLink } from "@/components/ui/primitives";
import {
  DecisionScene,
  FinancialScene,
  HeroScene,
  IntegrationScene,
  PolicyScene,
  SalesPricingScene,
  VerificationScene,
  WorkflowScene,
  WorkspaceScene,
} from "@/components/product/scenes";
import { resources } from "@/content/demo-data";

function EnvironmentHeading({ eyebrow, title, copy, align = "start" }) {
  return <header className={`environment-heading environment-heading--${align}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2>{title}</h2>
    {copy && <p>{copy}</p>}
  </header>;
}

export default function Home() {
  return <><main id="main-content" className="art-home">
    <section id="hero-environment" className="art-hero" aria-labelledby="hero-title">
      <div className="art-hero__copy">
        <Eyebrow>Underwriting intelligence</Eyebrow>
        <h1 id="hero-title">Turn documents into evidence your funding team can review.</h1>
        <p>Cevrynt turns financial documents, business evidence, organisation-specific policy, and analyst context into recommendation-ready underwriting decision support.</p>
        <div className="hero-actions"><ButtonLink href="/contact">Book a demo</ButtonLink><TextLink href="#workflow-environment">See the workflow</TextLink></div>
        <div className="art-hero__assurance"><Status tone="blue">Decision-support infrastructure</Status><span>Funder review and final decision remain with your team.</span></div>
      </div>
      <div className="art-hero__product"><HeroScene /></div>
      <div className="art-hero__proof" aria-label="Confirmed Cevrynt capabilities"><span>Tested across 200+ financial files</span><span>Approximately 2–4 minute analysis</span><span>Organisation-specific policy</span><span>Evidence-backed reports</span></div>
    </section>

    <section id="workflow-environment" className="art-environment art-workflow" aria-labelledby="workflow-title">
      <EnvironmentHeading eyebrow="A single decision thread" title="Move from scattered files to connected underwriting evidence." copy="Instead of forcing a team to rebuild the application context across tools, Cevrynt keeps documents, extracted signals, verification observations, policy outcomes, and review notes in the same decision path." />
      <div className="art-workflow__composition">
        <aside className="art-fragmented" aria-label="Fragmented workflow comparison"><span>Without shared context</span><strong>Files, checks, policy, and notes drift apart.</strong><ul><li>Statements interpreted in isolation</li><li>Exceptions tracked outside the deal</li><li>Decision rationale rebuilt at review</li></ul></aside>
        <div className="art-workflow__canvas"><WorkflowScene /></div>
      </div>
    </section>

    <section id="workspace-environment" className="art-environment art-workspace" aria-labelledby="workspace-title">
      <EnvironmentHeading eyebrow="The underwriting workspace" title="A full decision surface for the evidence behind every application." copy="The application remains visible while reviewers connect uploaded documents to financial behaviour, existing obligations, and a recommendation that is ready for human review." />
      <div className="art-workspace__canvas"><WorkspaceScene /><FinancialScene /></div>
      <div className="art-workspace__footnote"><span>Application context</span><span>Financial evidence</span><span>Obligation review</span><span>Decision rationale</span></div>
    </section>

    <section id="policy-environment" className="art-environment art-policy" aria-labelledby="policy-title">
      <EnvironmentHeading eyebrow="Organisation-specific policy" title="Make policy visible in the deal—not buried in a separate checklist." copy="Cevrynt can show criteria, observed evidence, passed rules, exceptions, and the manual review route in the same shared underwriting context." />
      <div className="art-policy__canvas"><PolicyScene /><SalesPricingScene /></div>
      <TextLink href="/policy-intelligence">Explore policy intelligence</TextLink>
    </section>

    <section id="investigation-environment" className="art-investigation" aria-labelledby="investigation-title">
      <div className="art-investigation__inner">
        <EnvironmentHeading eyebrow="Verification and discrepancy evidence" title="Investigate what conflicts before it becomes a decision." copy="Business, owner, address, document, and obligation evidence remains linked to the same application. Signals requiring attention become an analyst’s review context—not an automated conclusion." />
        <VerificationScene />
        <div className="art-investigation__note"><Status tone="amber">Manual review state</Status><span>Evidence remains available for inspection, notes, override, and resolution before a funder makes a final decision.</span></div>
      </div>
    </section>

    <section id="recommendation-environment" className="art-environment art-recommendation" aria-labelledby="recommendation-title">
      <div className="art-recommendation__intro"><EnvironmentHeading eyebrow="Explainable recommendation" title="Deliver a recommendation with the evidence already attached." copy="A decision report surfaces the financial context, policy results, verification observations, analyst notes, and review requirements behind the recommendation." /><TextLink href="/reports">Explore decision reports</TextLink></div>
      <div className="art-recommendation__canvas"><DecisionScene /></div>
    </section>

    <section id="ecosystem-environment" className="art-environment art-ecosystem" aria-labelledby="ecosystem-title">
      <EnvironmentHeading eyebrow="Funder workflow and ecosystem" title="Put better qualification, pricing context, and commerce workflows around the same decision record." copy="Funder Sales and Funder Pricing draw from the underwriting evidence base. Cevrynt also has a confirmed SHOPLINE ecosystem partnership; current capability, work under development, and future opportunity remain distinct." />
      <div className="art-ecosystem__canvas"><SalesPricingScene /><IntegrationScene /></div>
      <div className="art-shopline"><div><span>Confirmed partnership activity</span><strong>SHOPLINE ecosystem partnership</strong></div><p>This illustrative workflow does not imply a live technical integration, automatic merchant information access, universal financing availability, exclusivity, or endorsement of individual decisions.</p><TextLink href="/partners/shopline">Explore the SHOPLINE partnership</TextLink></div>
    </section>

    <section id="control-environment" className="art-environment art-control" aria-labelledby="control-title">
      <div><EnvironmentHeading eyebrow="Human control and platform direction" title="Intelligence that strengthens experienced judgment." copy="Cevrynt supports policy application and decision review; it does not replace the funder’s governance or final human control." /></div>
      <div className="art-control__content"><ul><li>Inspect source evidence and recommendation rationale</li><li>Route exceptions to the right reviewer</li><li>Record analyst notes, overrides, and decision history</li><li>Keep an auditable context around each recommendation</li></ul><div className="art-roadmap"><span>Platform direction</span><strong>Underwriting intelligence, expanding responsibly.</strong><p>Potential future product directions include broader alternative lending, embedded eligibility, and portfolio intelligence.</p></div></div>
      <div className="art-resources"><span>Resources</span>{resources.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p><TextLink href="/resources">Read the perspective</TextLink></article>)}</div>
    </section>
  </main><ConversionSection /></>;
}
