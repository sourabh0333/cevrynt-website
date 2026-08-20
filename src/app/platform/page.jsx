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
    name: "Evidence",
    question: "What it knows, and where that came from",
    body: "Mixed borrower files are classified and structured, and every captured value keeps a pointer back to the document, page and line it was read from.",
  },
  {
    name: "Analysis",
    question: "What it concludes, and who decides",
    body: "Cash-flow behaviour, business identity and risk signals are derived from that evidence and surfaced for a reviewer. Nothing is auto-declined on a signal alone.",
  },
  {
    name: "Control",
    question: "Whose rules apply, and who has final say",
    body: "Your criteria are applied as written, with exceptions raised and overrides recorded. The approve, decline or counter stays with your team.",
  },
  {
    name: "Record",
    question: "What survives, and what happens when things change",
    body: "Findings stay attached to their sources, and new evidence re-runs the file against the previous version instead of starting it over.",
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
    document: "First Harbor Bank Statement · April 2026 · p.4 · lines 12–14",
    quote: "“Deposit — ACH Credit · $18,700.00 · Balance $31,150.00”",
    confidence: "99%",
  },
  {
    field: "Ending balance",
    value: "$31,240.19",
    document: "First Harbor Bank Statement · April 2026 · p.4 · lines 28–31",
    quote: "“Deposit — Card Settlement · $24,850.00 · Balance $47,060.00”",
    confidence: "98%",
  },
  {
    field: "Recurring MCA debit",
    value: "$1,550 / day",
    document: "First Harbor Bank Statement · April 2026 · p.4 · lines 44–48",
    quote: "“Rapid Advance Funding · ACH debit · $1,550.00”",
    confidence: "95%",
  },
];


/**
 * The signal tree. One root fans into three families and the families converge
 * on a decision node that is deliberately never filled — the shape carries the
 * claim that Cevrynt issues no automated decision.
 */
const treeRoot = { kicker: "Derived from", name: "Source-linked evidence" };

const signalFamilies = [
  {
    key: "cash",
    name: "Cash flow & balances",
    signals: ["Average monthly deposits", "Average daily balance", "NSF events · 90 days", "Active MCA positions"],
  },
  {
    key: "identity",
    name: "Business identity",
    signals: ["Entity standing", "Officer records", "Time in business", "Address consistency"],
  },
  {
    key: "risk",
    name: "Risk & integrity",
    signals: ["Document integrity", "Duplicate submission", "Conflicting details", "Debt pressure"],
  },
];

const treeDecision = {
  kicker: "Left open",
  name: "Approve · decline · counter",
  note: "Every branch above ends here, and Cevrynt does not close it. The approve, decline or counter is made by your team.",
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
  { value: "No", label: "Auto decline", emphasis: true },
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
    "Four NSF events occurred more than 60 days ago. Recent cash flow is stable and average daily balance remains above policy.",
  code: "Reason code · improving cash flow",
};

/**
 * The record layer, read off the Reanalysis screen's own previous/current diff.
 * None of the comparable products show a diff between analysis versions, which
 * is why this is a section rather than a footnote.
 */
const recordVersions = [
  { label: "Version 1 · 10:42 AM", note: "Initial package analysed" },
  { label: "Version 2 · 12:14 PM", note: "New statement and corrected agreement included" },
];

const recordSummary = ["2 new inputs", "7 signals changed", "1 policy result moved"];

const recordChanges = [
  { name: "Average monthly deposits", from: "$84.6K", to: "$91.3K", delta: "+7.9%", better: true },
  { name: "Average daily balance", from: "$31.2K", to: "$34.8K", delta: "+$3.6K", better: true },
  { name: "NSF events · 90 days", from: "6", to: "4", delta: "Improved", better: true },
  { name: "Active MCA positions", from: "2", to: "1", delta: "Reduced", better: true },
  { name: "Policy exceptions", from: "2", to: "1", delta: "−1", better: true },
  { name: "Debt pressure", from: "63", to: "48", delta: "Lower risk", better: true },
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
            <RevealLines as="h2" className="t-display-2" id="layers-heading" text="Four layers, not eight steps." />
          </div>
          <p className="eg-lede t-lede">
            A deal moves through Cevrynt in order. The platform underneath it is built in layers — each one
            answering a different question about how the system actually works.
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
            <p className="hx-kicker hx-kicker-invert">Evidence layer</p>
            <RevealLines as="h2" className="t-display-2" id="evidence-heading" text="Every value carries its receipt." />
          </div>
          <p className="eg-lede t-lede">
            No figure here stands on its own. Lift any one of them and the line it was read from is sitting
            underneath — document, page, the words themselves.
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
            <RevealLines as="h2" className="t-display-2" id="signals-heading" text="It reasons all the way to the decision, then stops." />
          </div>
          <p className="eg-lede t-lede">
            Evidence fans out into twelve signals across three families, and every branch converges on the same
            node — the one Cevrynt leaves open.
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
            <p className="hx-kicker hx-kicker-invert">Control layer</p>
            <RevealLines as="h2" className="t-display-2" id="control-heading" text="Your thresholds. Your override." />
          </div>
          <p className="eg-lede t-lede">
            The policy applied here is the one your team wrote, at the version it was written in. Where a deal
            crosses a line, it says so — and a person can overrule it on the record.
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
            <p className="hx-kicker">Record layer</p>
            <RevealLines as="h2" className="t-display-2" id="record-heading" text="New evidence updates the case. It never resets it." />
          </div>
          <p className="eg-lede t-lede">
            A corrected agreement and one more statement arrive. Cevrynt re-runs what they touch and shows every
            reading that moved against the version before it.
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
          kicker="Founder-led next step"
          heading="Bring one workflow. We'll map how it fits."
          lede="Scope a walkthrough or pilot directly with the founder — real files, your own review criteria."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
