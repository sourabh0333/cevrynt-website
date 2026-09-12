import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { GapRoute } from "@/components/brokers/gap-route";
import { SignalLight } from "@/components/brokers/signal-light";
import { OwnerTriage } from "@/components/brokers/owner-triage";
import { IntakeScan } from "@/components/brokers/intake-scan";
import { VersionScrub } from "@/components/brokers/version-scrub";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

const page = pageByPath.get("solutions/brokers-isos");

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

/* --------------------------------------------------------------------------
   The package below is the one this site uses throughout — the borrower file
   for Cedar & Stone — and the prior submission is the cross-application match
   the product's own fraud view records against it.
   -------------------------------------------------------------------------- */

/** The lender's review, in the order this site describes it everywhere else. */
const reviewStages = ["Intake", "Documents", "Financials", "Verification", "Fraud", "Policy", "Report"];

/**
 * Each gap is placed at the stage it surfaces at, which is what makes its
 * position on the axis mean something — and why two of the three cost more
 * than the third.
 */
const packageGaps = [
  {
    name: "Second bank account statements",
    stage: "Financial analysis",
    cost:
      "Deposits appear to move through another operating account, so the lender cannot see the full cash-flow picture until those statements are included.",
  },
  {
    name: "Ownership percentage",
    stage: "Business verification",
    cost:
      "The application identifies the owner but does not provide enough ownership detail to reconcile the submitted business record.",
  },
  {
    name: "Business address support",
    stage: "Business verification",
    cost:
      "The application and verification source show different addresses, leaving the reviewer to determine whether it is an operating address, recent move, or data-entry issue.",
  },
];

const packagePresent = [
  "Signed application",
  "6 of 6 bank statements",
  "Owner identity",
  "Bank proof",
  "Existing obligation disclosure",
  "Business verification documents",
];

const routeLabels = {
  passes: "core package checks",
  open: "items need attention",
  origin: "Before submission",
  missing: "Item to resolve",
  surfaces: "Surfaces during",
  costs: "Why it matters",
  action: "Broker action",
  close: "Resolve",
  reopen: "Reopen",
  none: "Already complete",
};

const routeNote =
  "Cevrynt helps surface preventable submission gaps before the lender has to stop the review and ask for more. The earlier a missing statement, ownership detail, address discrepancy, or existing obligation is resolved, the cleaner the file is when underwriting begins. Illustrative package · synthetic borrower data.";

const fraudShot = {
  src: "/media/Steps/Fraud Detection.png",
  alt: "The Cevrynt fraud detection screen for this submission: four signals surfaced from the package, each shown with the evidence behind it, and a human resolution queue in which auto-decline is disabled and a documented reason is required before any disposition.",
};

/**
 * The four signals as the screen raises them, with each card's bounds authored
 * as percentages of the export so the ring lands on the real element. Only the
 * closing line of each — what to put in the pack — is copy rather than artwork.
 */
const fraudSignals = [
  {
    name: "Document integrity",
    badge: "Needs review",
    what:
      "One bank-statement page differs from the rest of the bank-exported file and should be checked against the original source.",
    source: "Bank statement · p.84",
    at: { x: 5.4, y: 46.5, w: 24.2, h: 8.8 },
    answer:
      "Provide the original bank-downloaded statement or clean source file so the lender can compare it directly.",
  },
  {
    name: "Duplicate submission",
    badge: "Context needed",
    what:
      "The same business account ending 7123 appears in an earlier application submitted 42 days ago.",
    source: "Cross-application match · APP-240708-092",
    at: { x: 5.4, y: 57.8, w: 24.2, h: 8.8 },
    answer:
      "Identify the earlier submission and explain whether this is a resubmission, revised request, or separate application.",
  },
  {
    name: "Business address mismatch",
    badge: "Context needed",
    what:
      "The application lists 214 Westlake Dr while the business verification source lists 210 Westlake Dr.",
    source: "Application · Business verification",
    at: { x: 5.4, y: 69.2, w: 24.2, h: 8.4 },
    answer:
      "Add supporting address context if the difference is known, such as a recent move, operating address, or corrected filing.",
  },
  {
    name: "Unusual deposit activity",
    badge: "Context needed",
    what:
      "Two deposits are materially outside the merchant’s normal transaction pattern and may require supporting context.",
    source: "Bank analysis · May 14 and May 27",
    at: { x: 5.4, y: 80.5, w: 24.2, h: 8.4 },
    answer:
      "Attach the invoice, contract, settlement detail, or other supporting context already available for those deposits.",
  },
];

const fraudReadout = {
  raised: "review signals surfaced",
  declined: "automatic declines",
  answer: "What your team can add now",
};

const fraudFoot = {
  open: "03",
  text: "resolution steps still sitting open in an underwriter's queue, with the disposition intentionally withheld — every one of them a question that reaches you if the pack does not answer it first.",
};

const fraudNote =
  "These signals are review items, not accusations or automatic decline reasons. Cevrynt makes the underlying issue visible, keeps the supporting evidence attached, and leaves the interpretation with the broker and lender. Illustrative deal · synthetic borrower data.";
/* --------------------------------------------------------------------------
   03 — the same seven items from the two sections above, sorted by who can
   close them. The counts are the point: two of the seven never need a call.
   -------------------------------------------------------------------------- */

const triageOwners = [
  {
    key: "desk",
    name: "Your desk",
    when: "Resolve before submission",
  },
  {
    key: "borrower",
    name: "The borrower",
    when: "Request before submission",
  },
  {
    key: "lender",
    name: "The lender",
    when: "Requires underwriting judgment",
  },
];

const triageItems = [
  {
    owner: "desk",
    name: "Duplicate submission",
    action:
      "Link the earlier application to the current deal and explain whether this is a resubmission, revised request, or separate application.",
  },
  {
    owner: "desk",
    name: "Cash-flow context",
    action:
      "Add supporting context for unusual deposits, transfers, or revenue movements already identified in the borrower package.",
  },
  {
    owner: "desk",
    name: "Existing obligation disclosure",
    action:
      "Confirm recurring repayment obligations surfaced in bank activity and attach the relevant agreement when available.",
  },
  {
    owner: "borrower",
    name: "Second bank account statements",
    action:
      "Request the missing statement period for the additional operating account so the lender receives the complete cash-flow picture.",
  },
  {
    owner: "borrower",
    name: "Ownership percentage",
    action:
      "Confirm the ownership split and provide the supporting company or operating document needed to reconcile the application.",
  },
  {
    owner: "borrower",
    name: "Business address support",
    action:
      "Clarify the difference between the submitted and verified addresses and provide supporting evidence where needed.",
  },
  {
    owner: "lender",
    name: "Document integrity review",
    action:
      "Cevrynt surfaces the document concern and supporting evidence, but whether the document is acceptable remains an underwriting judgment.",
  },
];

const triageLabels = {
  total: "open items identified",
  yours: "your desk can resolve",
  dial:
    "Your desk sits at the centre. Three items can be resolved by your team before submission, three require borrower input, and one remains with the lender because it depends on underwriting judgment rather than missing paperwork.",
};

const triageNote =
  "Cevrynt separates open items by who can actually move them forward. Three can be resolved by your desk before submission, three require borrower input, and one remains with the lender because it depends on underwriting judgment rather than missing paperwork. Illustrative package · synthetic borrower data.";

/* --------------------------------------------------------------------------
   04 — the intake screen the submission becomes, read left to right. The three
   columns are the three questions any new reader asks, in the order asked.
   -------------------------------------------------------------------------- */

const intakeShot = {
  src: "/media/Steps/intake.png",
  alt: "The Cevrynt intake screen for this submission: the borrower package listed file by file on the left, the classification and document map in the centre showing every document mapped to a page range across pages 1 to 143, and evidence provenance on the right showing structured values carrying the document, page and line they were read from.",
};

const intakeColumns = [
  {
    n: "01",
    question: "What arrived?",
    answer:
      "Five submitted files are accounted for and attached to the same deal before underwriting begins.",
    fact: "5 files · 143 pages · one borrower package",
    from: 0,
    to: 32.4,
    at: 6,
  },
  {
    n: "02",
    question: "How is it organized?",
    answer:
      "Cevrynt classifies each document, maps its page range, and structures the package into one underwriting record.",
    fact: "5 documents mapped · pages 1–143",
    from: 32.4,
    to: 69.3,
    at: 34,
  },
  {
    n: "03",
    question: "Where did the finding come from?",
    answer:
      "Material underwriting values stay connected to the document, page, transaction, or source evidence behind them.",
    fact:
      "Legal business name · p.1 line 4 · monthly deposits · p.84 lines 21–31",
    from: 69.3,
    to: 100,
    at: 71,
  },
];

const intakeReadout = {
  filesN: "05",
  files: "files organized",
  pagesN: "143",
  pages: "pages mapped to the deal",
};

const intakeNote =
  "Cevrynt turns the submitted folder into a structured underwriting map: what arrived, where each document belongs, what the review found, and where the supporting evidence lives. The lender still makes the underwriting judgment; the package simply arrives easier to navigate. Illustrative deal · synthetic borrower data.";

/* --------------------------------------------------------------------------
   05 — the product's re-run. Every previous and current value below is read off
   the screen it sits under; the one row that does not move is on that screen
   too, held open across both versions rather than dropped.
   -------------------------------------------------------------------------- */

const rerunShot = {
  src: "/media/Steps/Reanalysis.png",
  alt: "The Cevrynt reanalysis screen for this submission: two new documents added to the existing file, the affected signals recomputed instead of the case being rebuilt, and a what-moved panel setting version two against version one with every change called out, including one item that stays unresolved.",
};

const rerunVersions = [
  {
    name: "Version 1",
    at: "10:42 AM",
    what: "Initial borrower package reviewed as originally submitted.",
  },
  {
    name: "Version 2",
    at: "12:14 PM",
    what: "One new bank statement and a corrected agreement added to the same deal.",
  },
];

const rerunSignals = [
  {
    name: "Average monthly deposits",
    from: 84.6,
    to: 91.3,
    prefix: "$",
    suffix: "K",
    decimals: 1,
    badge: "+7.9%",
  },
  {
    name: "Average daily balance",
    from: 31.2,
    to: 34.8,
    prefix: "$",
    suffix: "K",
    decimals: 1,
    badge: "+$3.6K",
  },
  {
    name: "NSF activity · 90 days",
    from: 6,
    to: 4,
    decimals: 0,
    badge: "Improved",
  },
  {
    name: "Existing repayment obligations",
    from: 2,
    to: 1,
    decimals: 0,
    badge: "Reduced",
  },
  {
    name: "Policy exceptions",
    from: 2,
    to: 1,
    decimals: 0,
    badge: "1 cleared",
  },
  {
    name: "Daily repayment load",
    from: 1550,
    to: 775,
    prefix: "$",
    suffix: " / day",
    decimals: 0,
    badge: "Reduced",
  },
];

const rerunStill = {
  name: "Business address mismatch",
  value: "Unresolved",
  badge: "Still open",
  said:
    "The new financial evidence changes the cash-flow picture, but it does not explain the address discrepancy. Cevrynt carries the review item forward into Version 2 instead of silently clearing it during reanalysis.",
};

const rerunReadout = {
  figures: [
    { n: "02", k: "new inputs" },
    { n: "07", k: "signals changed" },
    { n: "01", k: "policy result moved" },
  ],
  signal: "Signal",
  previous: "Previous",
  movement: "Movement",
  current: "Current",
  change: "Change",
  scrubLabel: "Scrub between analysis version one and version two",
  tableLabel: "Signals recomputed by the re-run, previous pass against current pass",
};

const rerunNote =
  "Cevrynt keeps the previous review beside the updated one, highlights the findings affected by new evidence, and carries unresolved items forward. A policy result can move without becoming an approval or decline — the lender still makes the credit decision. Illustrative deal · synthetic borrower data.";

export default function BrokersIsosPage() {
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
            <RainbowCta href={page.ctaHref || calendlyUrl} label={page.cta || "Book a walkthrough"} />
          </div>
        </div>
      </HeroMotion>

      {/* 01 — What sends a submission back, drawn as the trips it costs */}
      <section className="iso-route band-light" aria-labelledby="route-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">SUBMISSION READINESS</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="route-heading"
              text="Find the stip before the lender sends the file back."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt checks the borrower package before submission and shows what is complete, what is missing, and where that missing information is likely
             to interrupt underwriting — so your team can fix avoidable gaps before the lender finds them.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <GapRoute
              stages={reviewStages}
              gaps={packageGaps}
              present={packagePresent}
              labels={routeLabels}
              note={routeNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — What the lender can see that the broker cannot */}
      <section className="iso-prior band-deep" aria-labelledby="prior-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">FUNDER-FACING SIGNALS</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="prior-heading"
              text="Don’t just send the file. Send the context with it."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt surfaces the issues a lender is likely to notice in the package — duplicate submissions, document concerns, verification conflicts, and unusual cash-flow activity — so your team can answer what it can before underwriting has to ask.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <SignalLight
              shot={fraudShot}
              signals={fraudSignals}
              readout={fraudReadout}
              foot={fraudFoot}
              note={fraudNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — the same open items, sorted by who can actually close them */}
      <section className="iso-triage band-light" aria-labelledby="triage-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">SUBMISSION TRIAGE</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="triage-heading"
              text="Seven open items. Know who can close each one."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt separates what your desk can fix, what needs another borrower document, and what must stay with the lender. Your team spends time on the questions it can actually move instead of chasing every issue the same way.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <OwnerTriage
              owners={triageOwners}
              items={triageItems}
              labels={triageLabels}
              note={triageNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — the handoff itself, read in the order a lender reads it */}
      <section className="iso-handoff band-deep" aria-labelledby="handoff-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">SUBMISSION MAP</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="handoff-heading"
              text="Turn the folder into a file the lender can navigate."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt organizes the borrower package before handoff — classifying each document, mapping the pages, structuring the underwriting fields, and keeping important findings connected to their source.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <IntakeScan
              shot={intakeShot}
              columns={intakeColumns}
              readout={intakeReadout}
              note={intakeNote}
            />
          </div>
        </div>
      </section>

      {/* 05 — what happens when the missing thing finally arrives */}
      <section className="iso-rerun band-deep" aria-labelledby="rerun-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">THE RE-RUN</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="rerun-heading"
              text="Add what was missing. See exactly what changed."
            />
          </div>
          <p className="eg-lede t-lede">
            A new bank statement or corrected agreement goes back into the same deal. Cevrynt re-runs the affected analysis, compares it with the previous review, and shows what improved, what moved, and what is still unresolved.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <VersionScrub
              shot={rerunShot}
              versions={rerunVersions}
              signals={rerunSignals}
              still={rerunStill}
              readout={rerunReadout}
              note={rerunNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="06"
          kicker="FOUNDER-LED SUBMISSION REVIEW"
          heading="Bring a deal that came back. See what should go back with it."
          lede="Walk through the borrower package, missing items, lender-facing signals, borrower follow-ups, and anything that changed since the first submission. Cevrynt shows what can be resolved before the file goes back to underwriting."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
