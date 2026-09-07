import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { FounderClose } from "@/components/home/founder-close";
import { RevealLines } from "@/components/home/reveal-lines";
import { JsonLd } from "@/components/json-ld";
import { SignalMark } from "@/components/icons";
import { LayerStack } from "@/components/platform/layer-stack";
import { ProvenancePlanes } from "@/components/platform/provenance-planes";
import { SignalTree } from "@/components/platform/signal-tree";
import { PolicySheet } from "@/components/platform/policy-sheet";
import { ChangeRecord } from "@/components/platform/change-record";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

const page = pageByPath.get("platform");

export function generateMetadata() {
  const title = page.metaTitle || page.title;
  const description = page.metaDescription || page.description;

  return {
    title,
    description,
    keywords: page.keywords,
    alternates: { canonical: `/${page.path}` },
    openGraph: { title, description, url: `/${page.path}` },
    twitter: { title, description },
  };
}

/**
 * The four layers.
 *
 * Deliberately not the eight workflow stages — the homepage owns that sequence
 * and shows all eight screens once each. Each layer here answers a different
 * evaluation question, so this page says what the system is composed of rather
 * than restating the order a deal moves through.
 */
const layers = [
  {
    name: "Source Evidence",
    question: "Every finding can be traced back.",
    body: "Documents, statement pages, transactions and verification results stay linked to the values and findings derived from them.",
  },
  {
    name: "Underwriting Context",
    question: "The deal stays one story, not eight separate reviews.",
    body: "Cash flow, business identity, existing obligations, fraud signals and reviewer notes remain connected as the file moves through underwriting.",
  },
  {
    name: "Lender Policy",
    question: "Your rules travel with the deal.",
    body: "Thresholds, conditions and exception rules stay attached to the review. Cevrynt shows where the file fits policy, where it does not, and where human judgment is still needed.",
  },
  {
    name: "Decision Record",
    question: "What happened stays with the file.",
    body: "Findings, evidence, policy results, corrections, reanalysis, notes and overrides remain in the same record so another reviewer can understand what changed and why.",
  },
];

/**
 * Three captured values and the lines they were read from. Every figure,
 * location and quotation is taken from the Extract screen; confidence appears
 * as a property the record carries, not as an accuracy claim.
 */
const provenance = [
  {
    field: "Average monthly deposits",
    value: "$84,613",
    document: "First Harbor Bank Statement · Apr 2026 · pages 4–12",
    quote: "Calculated from qualifying deposit activity · internal transfers excluded",
    confidence: "99%",
  },
  {
    field: "Legal business identity",
    value: "VERIFIED",
    document: "Borrower application + business verification result",
    quote: "Cedar & Stone LLC · legal-name match confirmed",
    confidence: "Verified",
  },
  {
    field: "Recurring MCA debit",
    value: "$1,550 / day",
    document: "First Harbor Bank Statement · recurring ACH activity",
    quote: "Rapid Advance Funding · repeated daily debit pattern detected",
    confidence: "95%",
  },
];


/**
 * The signal tree. One root fans into three families and the families converge
 * on a decision node that is deliberately never filled — the shape carries the
 * claim that Cevrynt issues no automated decision.
 */
const treeRoot = { kicker: "Derived from", name: "Structured financial evidence" };

const signalFamilies = [
  {
    key: "revenue",
    name: "Revenue & deposits",
    signals: ["Monthly qualifying deposits", "Deposit consistency and trend", "Large or unusual inflows", "Revenue concentration"],
  },
  {
    key: "liquidity",
    name: "Liquidity & cash flow",
    signals: ["Average and ending balances", "Negative-balance days", "NSF / returned-item activity", "Cash-flow volatility"],
  },
  {
    key: "obligations",
    name: "Existing obligations",
    signals: ["Recurring MCA debits", "Active loan / MCA positions", "Daily or weekly repayment load", "Stacking and repayment pressure"],
  },
];

const treeDecision = {
  kicker: "Structured underwriting findings",
  name: "KYB/KYC → Fraud Detection → Policy Engine → Human Review",
  note: "Analysis does not make the funding decision. It gives the next stages a structured financial picture with the evidence still attached.",
};

/**
 * The control layer, read off the Policy Engine screen: the lender's own policy
 * version, its configured thresholds, the observed values, and the override a
 * named reviewer recorded against it.
 *
 * `observedPct` and `thresholdPct` are positions on each meter's own scale —
 * a visual scale for an illustrative deal, with the real threshold and observed
 * figures printed as text beside it.
 */
const lenderPolicy = { name: "Growth Capital · Standard MCA", meta: "Policy v3.4 · updated 12 Aug 2026 · active" };

const policySummary = [
  { value: "10 / 12", label: "Rules passed" },
  { value: "2", label: "Exceptions" },
  { value: "1", label: "Override" },
  { value: "REVIEW", label: "REQUIRED", emphasis: true },
];

const policyRules = [
  {
    name: "Minimum monthly revenue",
    observed: "$84.6K",
    threshold: "≥ $75K",
    direction: "min",
    observedPct: 70.5,
    thresholdPct: 62.5,
    exception: false,
  },
  {
    name: "Average daily balance",
    observed: "$31.2K",
    threshold: "≥ $20K",
    direction: "min",
    observedPct: 62.4,
    thresholdPct: 40,
    exception: false,
  },
  {
    name: "NSF tolerance · 90 days",
    observed: "6 events",
    threshold: "≤ 5",
    direction: "max",
    observedPct: 60,
    thresholdPct: 50,
    exception: true,
  },
  {
    name: "Time in business",
    observed: "14 months",
    threshold: "≥ 12 mo",
    direction: "min",
    observedPct: 58.3,
    thresholdPct: 50,
    exception: false,
  },
];

const policyOverride = {
  kicker: "Override recorded",
  who: "Sarah Kim",
  role: "Senior Underwriter",
  when: "12:18 PM",
  reason:
    "NSF activity exceeds policy by one event. Four of the six events occurred more than 60 days ago; recent cash flow and average daily balance remain above policy thresholds.",
  code: "Reason : Improving recent cash flow",
};

/**
 * The record layer, read off the Reanalysis screen's own previous/current diff.
 * None of the comparable products show a diff between analysis versions, which
 * is why this is a section rather than a footnote.
 */
const recordVersions = [
  { label: "Version 1 · 10:42 AM", note: "Initial underwriting review" },
  { label: "Version 2 · 12:14 PM", note: "New evidence received" },
];

const recordSummary = ["2 NEW INPUTS", "5 FINDINGS CHANGED", "1 POLICY EXCEPTION CLEARED"];

const recordChanges = [
  {
    name: "Average monthly deposits",
    from: "$84.6K",
    to: "$91.3K",
    delta: "+7.9%",
    better: true,
  },
  {
    name: "Average daily balance",
    from: "$31.2K",
    to: "$34.8K",
    delta: "+$3.6K",
    better: true,
  },
  {
    name: "NSF activity · 90 days",
    from: "6 events",
    to: "4 events",
    delta: "Exception cleared",
    better: true,
  },
  {
    name: "Existing MCA positions",
    from: "2 active",
    to: "1 active",
    delta: "1 position updated",
    better: true,
  },
  {
    name: "Policy exceptions",
    from: "2 open",
    to: "1 open",
    delta: "1 cleared",
    better: true,
  },
  {
    name: "Daily repayment load",
    from: "$1,550 / day",
    to: "$775 / day",
    delta: "Reduced",
    better: true,
  },
];


export default function PlatformPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: page.group, item: `${siteConfig.url}/${page.path}` },
      { "@type": "ListItem", position: 3, name: page.title, item: `${siteConfig.url}/${page.path}` },
    ],
  };

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd} />

      <HeroMotion>
        <div className="page-hero-dark-inner">
          <SignalMark className="hero-signal" />
          <h1 className="page-hero-dark-heading">{page.title}</h1>
          <p className="home-hero-lede">{page.description}</p>
          <div className="hero-actions">
            <RainbowCta href={calendlyUrl} label="Book a walkthrough" />
          </div>
        </div>
      </HeroMotion>

      {/* 01 — The four layers. A light band establishes the model before any
          product screen appears, and keeps the dark hero from touching the
          first deep section below it. */}
      <section className="plt-layers band-light" aria-labelledby="layers-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">The platform</p>
            <RevealLines as="h2" className="t-display-2" id="layers-heading" text="Four things stay connected through every underwriting step." />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt still moves a deal through eight stages. These are not additional steps — they
            are the four things the platform keeps attached to the file from intake through final review.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <LayerStack layers={layers} />
          </div>
        </div>
      </section>

      {/* 02 — Evidence layer */}
      <section className="plt-evidence band-deep" aria-labelledby="evidence-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">SOURCE EVIDENCE</p>
            <RevealLines as="h2" className="t-display-2" id="evidence-heading" text="Every underwriting fact can be checked." />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt keeps the source behind each material finding — the document, page,
            transaction, or verification result — so an underwriter can verify what the system found before relying on it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ProvenancePlanes items={provenance} />
          </div>
        </div>
      </section>

      {/* 03 — Analysis layer */}
      <section className="plt-signals band-light" aria-labelledby="signals-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Analysis layer</p>
            <RevealLines as="h2" className="t-display-2" id="signals-heading" text="Turn bank activity into the signals an underwriter actually reviews." />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt reads the financial evidence as a whole — separating inflows, measuring liquidity, identifying cash-flow stress and surfacing recurring debt obligations.
            Each finding stays connected to the activity behind it and moves forward to verification, fraud and policy review.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <SignalTree root={treeRoot} families={signalFamilies} decision={treeDecision} />
          </div>
        </div>
      </section>

      {/* 04 — Control layer */}
      <section className="plt-control band-deep" aria-labelledby="control-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">LENDER POLICY</p>
            <RevealLines as="h2" className="t-display-2" id="control-heading" text="Your credit policy, applied rule by rule." />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt evaluates the deal against the underwriting criteria your team defines.
            Every rule shows the borrower value, required threshold, outcome,
            and exception — while human overrides remain visible in the deal record.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PolicySheet
              policy={lenderPolicy}
              summary={policySummary}
              rules={policyRules}
              override={policyOverride}
            />
          </div>
        </div>
      </section>

      {/* 05 — Record layer */}
      <section className="plt-record band-light" aria-labelledby="record-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">REANALYSIS & HISTORY</p>
            <RevealLines as="h2" className="t-display-2" id="record-heading" text="When the file changes, Cevrynt shows what changed with it." />
          </div>
          <p className="eg-lede t-lede">
            A new bank statement, corrected agreement, or missing document should not erase the first review. Cevrynt re-runs the updated file,
            compares it with the previous version, and surfaces which financial findings, risk signals, and policy results actually moved.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ChangeRecord versions={recordVersions} summary={recordSummary} changes={recordChanges} />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="06"
          kicker="FOUNDER-LED PLATFORM WALKTHROUGH"
          heading="See exactly where Cevrynt fits."
          lede="Walk through a real MCA or SMB underwriting process with the founder. We’ll map the documents, analysis, verification, policy rules, exceptions,
           and reviewer decisions Cevrynt can support — without forcing you to change the workflow first."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
