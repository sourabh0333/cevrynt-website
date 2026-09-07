import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { FounderClose } from "@/components/home/founder-close";
import { RevealLines } from "@/components/home/reveal-lines";
import { JsonLd } from "@/components/json-ld";
import { RetentionLines } from "@/components/why/retention-lines";
import { ReadingSpread } from "@/components/why/reading-spread";
import { PolicyDivergence } from "@/components/why/policy-divergence";
import { FileRevision } from "@/components/why/file-revision";
import { BoundaryLines } from "@/components/why/boundary-lines";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

const page = pageByPath.get("why-cevrynt");

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
 * Stations along the section's scroll, read as elapsed time since the decision.
 *
 * Month six sits at 1, the far end of every lane, because the heading asks what
 * you still hold six months on — leaving the last quarter of the axis past the
 * final station made that stretch read as unlabelled time the question never
 * asked about.
 */
const timePeriods = [
  { at: 0, label: "Day one" },
  { at: 0.2, label: "Week two" },
  { at: 0.55, label: "Month two" },
  { at: 1, label: "Month six" },
];

/**
 * The three approaches, in the order their tracks appear in every lane. Position
 * is what identifies them after the key, so this order is load-bearing.
 */
const approaches = [
  { key: "review", name: "Initial review" },
  { key: "reanalysis", name: "After reanalysis" },
  { key: "later", name: "Months later", lead: true },
];

/**
 * The five things a review leaves behind, each with the point on the section's
 * scroll — read as time — at which an approach stops being able to produce it
 * without rebuilding the file. `null` means it is still there at month six.
 *
 * Ordered by durability, most durable first. The figures survive almost
 * anything, because they are what gets copied into the memo in the first place.
 * What the reviewer was actually looking at is the first to go, because nothing
 * in a manual or bolt-on workflow ever captured it.
 *
 * The claim is narrow on purpose: still held *without rebuilding the file*. That
 * is a property of where an approach stores its work, not a benchmark about
 * anybody's performance, and the alternatives are approaches rather than named
 * products.
 */
const artefacts = [
  {
    name: "Financial facts",
    lost: {
      review: null,
      reanalysis: null,
      later: null,
    },
  },
  {
    name: "Source evidence",
    lost: {
      review: null,
      reanalysis: null,
      later: null,
    },
  },
  {
    name: "Policy version",
    lost: {
      review: null,
      reanalysis: null,
      later: null,
    },
  },
  {
    name: "Exception rationale",
    lost: {
      review: null,
      reanalysis: null,
      later: null,
    },
  },
  {
    name: "Reviewer history",
    lost: {
      review: null,
      reanalysis: null,
      later: null,
    },
  },
];

const retentionNote =
  "The value is not just preserving the final outcome. Cevrynt keeps the evidence, policy context, exceptions, and reviewer history together so the deal can still explain itself later.";
/**
 * One page of the illustrative Cedar & Stone file, and four things a reviewer
 * could reasonably key on in it.
 *
 * `x`/`y` are coordinates in the export's own 1600x760 pixel space, each one
 * sitting on something actually visible in the artwork: the headline deposit
 * average, the original statement line behind it, the recurring daily debit,
 * and the page-and-line reference in the evidence trace.
 *
 * The point is not that any of these four is the wrong thing to look at. Each
 * is a perfectly sensible read. None of them is the whole page, which is why
 * four people doing this independently arrive at four different answers.
 */
const readingAnchors = [
  {
    key: "A",
    x: 690,
    y: 300,
    read: "Start from the same underwriting facts",
    at: "Structured findings",
  },
  {
    key: "B",
    x: 300,
    y: 498,
    read: "Go straight back to the source",
    at: "Document · page · transaction",
  },
  {
    key: "C",
    x: 690,
    y: 545,
    read: "Surface the same material signals",
    at: "Recurring MCA debit",
  },
  {
    key: "D",
    x: 1420,
    y: 515,
    read: "Apply the same policy context",
    at: "Evidence + policy trace",
  },
];

const readingShot = {
  src: "/media/Steps/Cevrynt Extract.png",
  alt: "Cevrynt Extract view of one illustrative bank statement page: values read from the original document, normalized into underwriting fields, each keeping a page and line reference back to its source",
  caption: "Illustrative workspace · synthetic borrower data",
};

/**
 * The four acts of the graphic above, lighting as each one happens. The closing
 * mark is deliberate: this narrows disagreement, it does not remove it, and a
 * page claiming otherwise would be claiming something the product does not do.
 */
const spreadMarks = [
  "One deal",
  "Same financial facts",
  "Same source evidence",
  "Judgment stays human",
];
/**
 * Two lender policies, and the same illustrative Cedar & Stone file read
 * against both. Every value here is the one the rest of the site uses for this
 * deal, so the page does not quietly invent a second version of it.
 *
 * The two policies cross on purpose. Lender A is tighter on negative days;
 * Lender B refuses a second position outright and wants four years in business.
 * Neither is the strict one, because a diagram where one side simply loses
 * would be a strawman — and would imply Cevrynt has a view about whose credit
 * policy is right, which it does not.
 */
const policyLenders = [{ key: "a", name: "Lender A" }, { key: "b", name: "Lender B" }];

const policyCriteria = [
  {
    name: "Average monthly deposits",
    value: "$84.6K",
    a: {
      rule: "Minimum $50K",
      verdict: "pass",
    },
    b: {
      rule: "Minimum $75K",
      verdict: "pass",
    },
  },
  {
    name: "Active MCA positions",
    value: "1 active",
    a: {
      rule: "Second position allowed",
      verdict: "pass",
    },
    b: {
      rule: "No second position",
      verdict: "fail",
    },
  },
  {
    name: "Negative days · 90 days",
    value: "6 days",
    a: {
      rule: "Maximum 5",
      verdict: "exception",
    },
    b: {
      rule: "Maximum 8",
      verdict: "pass",
    },
  },
  {
    name: "Average daily balance",
    value: "$31.2K",
    a: {
      rule: "Minimum $10K",
      verdict: "pass",
    },
    b: {
      rule: "Minimum $25K",
      verdict: "pass",
    },
  },
  {
    name: "Time in business",
    value: "3 years 2 months",
    a: {
      rule: "Minimum 2 years",
      verdict: "pass",
    },
    b: {
      rule: "Minimum 4 years",
      verdict: "fail",
    },
  },
];

const policyOutcomes = [
  "4 rules pass · 1 exception. Moves to human review with the exception and supporting evidence attached.",
  "3 rules pass · 2 outside policy. The failed thresholds remain visible with the supporting evidence attached.",
];

/**
 * The note reconciles the two readings; this is what to do about it. The site
 * says policy configuration is worked through in a walkthrough, so that is where
 * this points rather than at a generic contact route.
 */
const policyCta = { label: "Book a walkthrough", href: calendlyUrl, external: true };

const policyNote =
   "The borrower evidence did not change — the lender policy did. Cevrynt applies each policy as written and keeps the policy version, threshold, observed value, exception, and reviewer action attached to the deal.";

/**
 * The re-run, read straight off the export rendered beneath it.
 *
 * Every figure here appears in that artwork — deposits, balance, NSF events,
 * positions, exceptions, debt pressure — so a reader can find each one in the
 * picture. That is the entire reason for putting the two together, and it is why
 * these must never drift from the image.
 *
 * `from`/`to` drive the count; `was`/`now` are the authored strings the figure
 * settles on, so rounding cannot leave a value a hair off what the product says.
 */
const revisionVersions = [
  {
    label: "Version 1 · 10:42 AM",
    short: "Initial review",
    note: "Original borrower package analyzed",
  },
  {
    label: "Version 2 · 12:14 PM",
    short: "New evidence added",
    note: "One new bank statement and a corrected MCA agreement added",
  },
];

const revisionRows = [
  {
    signal: "Average monthly deposits",
    was: "$84.6K",
    now: "$91.3K",
    from: 84.6,
    to: 91.3,
    decimals: 1,
    prefix: "$",
    suffix: "K",
    moved: "+7.9%",
    tone: "up",
  },
  {
    signal: "Average daily balance",
    was: "$31.2K",
    now: "$34.8K",
    from: 31.2,
    to: 34.8,
    decimals: 1,
    prefix: "$",
    suffix: "K",
    moved: "+$3.6K",
    tone: "up",
  },
  {
    signal: "NSF activity · 90 days",
    was: "6 events",
    now: "4 events",
    from: 6,
    to: 4,
    moved: "Exception cleared",
    tone: "up",
  },
  {
    signal: "Active MCA positions",
    was: "2 active",
    now: "1 active",
    from: 2,
    to: 1,
    moved: "Position updated",
    tone: "up",
  },
  {
    signal: "Policy exceptions",
    was: "2 open",
    now: "1 open",
    from: 2,
    to: 1,
    moved: "1 cleared",
    tone: "up",
  },
  {
    signal: "Daily repayment load",
    was: "$1,550 / day",
    now: "$775 / day",
    from: 1550,
    to: 775,
    prefix: "$",
    suffix: " / day",
    moved: "Reduced",
    tone: "up",
  },
];

const revisionShot = {
  src: "/media/Steps/Reanalysis.png",
  alt: "Cevrynt reanalysis view of an illustrative deal: new evidence listed on the left, the affected signals recomputed against their previous values in the centre, and the changes summarised against version two on the right",
  caption: "The same re-run, in the product · illustrative workspace, synthetic borrower data",
};

/**
 * The honest half. The re-run improved most of this file, and one thing it did
 * not touch stays open — which is the behaviour the rest of the page argues for.
 */
const revisionNote =
  "Not every issue disappears when new evidence arrives. The address discrepancy remains open in Version 2 and is carried forward for reviewer resolution. Reanalysis updates what changed without silently clearing what still needs judgment.";
/**
 * The limits, stated before anyone has to ask for them. Each claim is something
 * people genuinely assume about AI underwriting, and each answer is a real
 * constraint rather than a modest-sounding restatement of a feature.
 */
const boundaryItems = [
  {
    claim: "It decides the deal.",
    answer:
      "It prepares the underwriting review. Approval, decline, counter, pricing, structure, and final sign-off remain with your team.",
  },
  {
    claim: "It replaces your credit policy with a score.",
    answer:
      "It applies lender-defined thresholds, conditions, and exception rules, then shows what passed, what failed, and what still needs judgment.",
  },
  {
    claim: "It turns uncertainty into a clean answer.",
    answer:
      "Conflicting evidence, verification mismatches, low-confidence findings, and policy exceptions remain visible until a reviewer resolves them.",
  },
  {
    claim: "It hides the reasoning behind the output.",
    answer:
      "Material findings stay connected to the document, page, transaction, verification result, or policy rule that supports them.",
  },
  {
    claim: "It rewrites the case when new evidence arrives.",
    answer:
      "Reanalysis creates a new review version and shows what changed while preserving previous findings, exceptions, policy results, and reviewer actions.",
  },
];

const boundaryNote =
  "Cevrynt is built to preserve lender control, visible exceptions, source-linked evidence, and review history. If your workflow needs the system to replace those judgment points, it is probably not the right fit.";

const spreadNote =
  "Cevrynt does not force underwriters to agree. It removes avoidable disagreement by giving every reviewer the same facts, source evidence, material signals, and lender-policy context.";

export default function WhyCevryntPage() {
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

      {/* Hero unchanged — the same composition PageShell renders for this page. */}
      <HeroMotion>
        <div className="page-hero-dark-inner">
          <PageHeroCopy heading={page.title} lede={page.description} />
          <div className="hero-actions">
            <RainbowCta href={calendlyUrl} label={page.cta || "Book a walkthrough"} />
          </div>
        </div>
      </HeroMotion>

      {/* 01 — What you still hold */}
      <section className="wc-retention band-light" aria-labelledby="retention-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">DECISION MEMORY</p>
            <RevealLines as="h2" className="t-display-2" id="retention-heading" text="Six months later, the file should still explain itself." />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt keeps the evidence, policy context, exceptions, and reviewer actions with the same deal
            record — so a future reviewer can understand what was known, what changed, and why the team made the call.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <RetentionLines
              periods={timePeriods}
              approaches={approaches}
              artefacts={artefacts}
              note={retentionNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — The spread between reviewers */}
      <section className="wc-spread band-deep" aria-labelledby="spread-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">CONSISTENCY</p>
            <RevealLines as="h2" className="t-display-2" id="spread-heading" text="Same file. Same evidence. Judgment can still differ." />
          </div>
          <p className="eg-lede t-lede">
           Cevrynt gives every reviewer the same structured financial facts, source evidence, risk signals, and lender-policy context. If two underwriters disagree, the disagreement
            is about the deal — not because one of them missed a page or rebuilt the numbers differently.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ReadingSpread
              shot={readingShot}
              anchors={readingAnchors}
              marks={spreadMarks}
              note={spreadNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — Whose policy decides */}
      <section className="wc-policy band-light" aria-labelledby="policy-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">LENDER-SPECIFIC POLICY</p>
            <RevealLines as="h2" className="t-display-2" id="policy-heading" text="Same deal. Different credit boxes. Both should be explainable." />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt evaluates the same borrower evidence against each lender’s own underwriting thresholds,
             conditions, and exception rules. The facts stay the same; the policy interpretation changes.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PolicyDivergence
              lenders={policyLenders}
              criteria={policyCriteria}
              outcomes={policyOutcomes}
              note={policyNote}
              cta={policyCta}
            />
          </div>
        </div>
      </section>

      {/* 04 — When the file changes */}
      <section className="wc-revision band-light" aria-labelledby="revision-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker">CHANGE-AWARE REVIEW</p>
            <RevealLines as="h2" className="t-display-2" id="revision-heading" text="The file can change. The history shouldn’t disappear." />
          </div>
          <p className="eg-lede t-lede">
            Borrowers send another statement. An agreement gets corrected. A missing document arrives. Cevrynt re-runs what the new evidence affects, shows what moved,
             and keeps the previous review visible instead of silently replacing it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <FileRevision
              versions={revisionVersions}
              rows={revisionRows}
              shot={revisionShot}
              note={revisionNote}
            />
          </div>
        </div>
      </section>

      {/* 05 — The limits, before anyone asks */}
      <section className="wc-boundary band-deep" aria-labelledby="boundary-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">WHAT CEVRYNT DELIBERATELY DOESN’T DO</p>
            <RevealLines as="h2" className="t-display-2" id="boundary-heading" text="Five shortcuts we chose not to take." />
          </div>
          <p className="eg-lede t-lede">
           Cevrynt automates the work around an underwriting decision. It does not hide the evidence, replace lender policy, resolve uncertainty silently, or take the final judgment away from your team.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <BoundaryLines items={boundaryItems} note={boundaryNote} />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="06"
          kicker="FOUNDER-LED EVALUATION"
          heading="Put Cevrynt against files your team already knows."
          lede="Bring representative historical deals and the underwriting criteria your team actually uses. Compare Cevrynt’s facts, source evidence, policy results, exceptions, and review history against the work you already trust."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
