import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { PolicyRun } from "@/components/lenders/policy-run";
import { ClaimGap } from "@/components/lenders/claim-gap";
import { EvidenceLoupe } from "@/components/lenders/evidence-loupe";
import { LedgerSpan } from "@/components/lenders/ledger-span";
import { FinalCall } from "@/components/lenders/final-call";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

const page = pageByPath.get("solutions/alternative-lenders");

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
   Every value on this page is read off a Cevrynt product screen for the same
   illustrative borrower this site uses throughout — the policy engine, the
   verification view, the extract, the financial analysis and the deal memo.
   Nothing here is a rate, an accuracy figure or a claim about outcomes.
   -------------------------------------------------------------------------- */

/* 01 — the policy run, and where a person's time actually goes ------------- */

const policyCriteria = [
  {
    name: "Average monthly deposits",
    observed: "$84.6K",
    threshold: "≥ $75K",
    result: "Pass",
    held: false,
  },
  {
    name: "Average daily balance",
    observed: "$31.2K",
    threshold: "≥ $20K",
    result: "Pass",
    held: false,
  },
  {
    name: "NSF activity · 90 days",
    observed: "6 events",
    threshold: "≤ 5",
    result: "Exception",
    held: true,
    record: {
      what:
        "The file exceeds policy by one event. Cevrynt keeps the underlying statement activity available so the reviewer can see when the events occurred and how recent cash flow compares with policy.",
      who:
        "Reviewer action required · exception remains open",
    },
  },
  {
    name: "Existing repayment obligations",
    observed: "$1,550 / day",
    threshold: "Within lender-defined limit",
    result: "Pass",
    held: false,
  },
  {
    name: "Time in business",
    observed: "14 months",
    threshold: "≥ 12 months",
    result: "Pass",
    held: false,
  },
  {
    name: "Address consistency",
    observed: "214 vs 210 Westlake Dr",
    threshold: "Application and verification records align",
    result: "Exception",
    held: true,
    record: {
      what:
        "The application lists 214 Westlake Dr while the verification source lists 210 Westlake Dr. Cevrynt keeps both values and their sources visible rather than silently selecting one.",
      who:
        "Reviewer action required · discrepancy remains open",
    },
  },
];
const policyReadout = {
  figures: [
    {
      n: "10 / 12",
      k: "policy checks resolved",
    },
    {
      n: "02",
      k: "exceptions routed for review",
      tone: "held",
    },
    {
      n: "No",
      k: "automatic decline from an exception alone",
      tone: "never",
    },
  ],
};

const policyAudit = {
  title: "What stays with every policy result",
  items: [
    {
      k: "Policy version",
      v: "v3.4 retained",
    },
    {
      k: "Observed value + threshold",
      v: "Visible",
    },
    {
      k: "Exception reason",
      v: "Required when outside policy",
    },
    {
      k: "Source evidence",
      v: "Linked to the finding",
    },
    {
      k: "Reviewer action",
      v: "Recorded when resolved",
    },
  ],
  note:
    "Six of the twelve policy checks are shown in this example. Routine passes stay compact; exceptions expand to show the observed value, applicable rule, supporting evidence, and reviewer action still required.",
};

const policyNote =
  "Cevrynt resolves the routine policy checks and keeps the exceptions explicit. Each exception stays attached to the observed value, lender-defined threshold, supporting evidence, and reviewer action still required. The engine does not make the credit decision — it applies the policy, surfaces what falls outside it, records what happens next, and keeps the policy version with the deal. Illustrative deal · synthetic borrower data.";
/* 02 — four claims, four records, and the characters that disagree --------- */

const verifyShot = {
  src: "/media/Steps/KYB KYC.png",
  alt: "The Cevrynt verification screen for this borrower: the claims submitted on the application shown beside the independent business and officer records they were checked against, with legal entity, entity standing and tax identifier agreeing and the business address flagged for review over a street-number mismatch.",
};

/**
 * Each value is written as segments so the disagreement can be marked inside
 * it. The marks are authored rather than diffed at render, because the point of
 * the section is that this comparison is exact.
 */
const verifyPairs = [
  {
    field: "Legal business name",
    claim: [{ t: "Cedar & Stone LLC" }],
    record: [{ t: "Cedar & Stone LLC" }],
    claimFrom: "Business application · p.1",
    recordFrom: "Business verification source",
    verdict: "Match",
    matched: true,
  },
  {
    field: "Entity status",
    claim: [{ t: "Active business" }],
    record: [{ t: "Active · in good standing" }],
    claimFrom: "Business application · p.1",
    recordFrom: "State filing record",
    verdict: "Match",
    matched: true,
  },
  {
    field: "Tax identifier",
    claim: [{ t: "**-***4821" }],
    record: [{ t: "Ending 4821" }],
    claimFrom: "Business application · p.1",
    recordFrom: "Business identity source",
    verdict: "Match",
    matched: true,
  },
  {
    field: "Business address",
    claim: [
      { t: "2" },
      { t: "14", diff: true },
      { t: " Westlake Dr" },
    ],
    record: [
      { t: "2" },
      { t: "10", diff: true },
      { t: " Westlake Dr" },
    ],
    claimFrom: "Business application · p.1",
    recordFrom: "Business verification source",
    verdict: "Review",
    matched: false,
  },
];

const verifyReadout = {
  checked: "business fields compared",
  open: "review item still open",
  said:
    "Three fields align across the application and verification sources. The business address does not. Cevrynt keeps both values and their sources visible, then leaves the discrepancy open for reviewer resolution instead of silently choosing one.",
};

const verifyNote =
  "A mismatch is not a fraud finding and it is not a credit decision. Cevrynt shows exactly which business details align, which do not, and the source behind each one, then leaves unresolved differences open for reviewer judgment. Illustrative deal · synthetic verification data.";
/* 03 — the lens on the borrower's own document ---------------------------- */

const extractShot = {
  src: "/media/Steps/Cevrynt Extract.png",
  alt: "The Cevrynt extract view: a page of the borrower's original bank statement beside the underwriting fields read from it, with each structured value keeping the page and line range it came from and a trace panel showing the quoted source text.",
};

const extractFields = [
  {
    name: "Monthly deposits · Apr 2026",
    value: "$84,613",
    source: "Bank statement · p.84 · lines 21–31",
    raw:
      "“Total deposits and credits · $84,613.42 · Statement period 04/01–04/30”",
    at: { x: 18.6, y: 65.7 },
  },
  {
    name: "Average daily balance · Apr 2026",
    value: "$31,240",
    source: "Bank statement · p.84 · lines 32–39",
    raw:
      "“Average daily balance · $31,240.19 · Lowest daily balance $18,904.42”",
    at: { x: 18.6, y: 82 },
  },
  {
    name: "Recurring repayment",
    value: "$1,550 / day",
    source: "Bank statement · p.46 · lines 41–46",
    raw:
      "“Rapid Advance Funding · ACH debit · $1,550.00 · observed business-daily”",
    at: { x: 18.6, y: 73.8 },
  },
];

const extractReadout = {
  fieldsN: "143",
  fields: "pages mapped to one deal",
  retypedN: "01",
  retyped: "structured underwriting record",
};

const extractNote =
  "Cevrynt turns the borrower package into structured underwriting data while keeping material findings connected to the original evidence behind them. An underwriter can move from the review back to the relevant document, page, and source lines instead of relying on a detached extracted value. Illustrative deal · synthetic borrower data.";
/* 04 — where twelve months of banking actually comes from ------------------ */

const ledgerMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Five statements are listed on the screen with their page counts and a sixth
 * is tallied without one. The period it covers is the only one left; its length
 * is not stated, so the figure draws it as an outline rather than inventing a
 * height for it.
 */
const ledgerStatements = [
  { period: "Jan–Feb", pages: 18 },
  { period: "Mar–Apr", pages: 21 },
  { period: "May–Jun", pages: 20 },
  { period: "Jul–Aug", pages: 19 },
  { period: "Sep–Oct", pages: 22 },
  { period: "Nov–Dec", pages: null },
];

const ledgerFindings = [
  {
    k: "Deposit consistency",
    v: "Consistent",
    b: "Monthly inflows remain broadly stable across the six-statement review period.",
  },
  {
    k: "Liquidity",
    v: "Stable",
    b: "Average balances remain positive with no sustained deterioration across the period.",
  },
  {
    k: "Existing repayment obligations",
    v: "Watch",
    b: "Recurring debt payments remain a meaningful draw on operating cash flow and warrant underwriter review.",
    watch: true,
  },
  {
    k: "Cash-flow stress",
    v: "Limited",
    b: "NSF and negative-balance activity appears intermittently rather than as a persistent deterioration pattern.",
  },
];
const ledgerReadout = {
  figures: [
    {
      n: "6 → 1",
      k: "bank statements connected",
    },
    {
      n: "06",
      k: "months normalized",
    },
    {
      n: "05 / 06",
      k: "months with positive net cash flow",
      tone: "lit",
    },
  ],

  span:
    "Each block represents one statement period · height reflects the source-page volume behind it",

  unstated: "not available",

  saying: "What the six-month view shows",
};

const ledgerInsight = {
  k: "What the six-month view shows",
  v: "Cash flow is broadly stable. The main watch item is the recurring repayment burden already drawing from operating cash flow — not deposit volatility.",
};

const ledgerNote =
  "Cevrynt normalizes six monthly bank statements into one continuous cash-flow view so deposit consistency, liquidity, repayment obligations, and cash-flow stress can be reviewed together rather than rebuilt month by month. The conclusion shown here is specific to this illustrative file, and the underlying statement evidence remains available for review. Illustrative deal · synthetic borrower data.";
/* 05 — the line the software stops at ------------------------------------- */

const memoShot = {
  src: "/media/Steps/Deal Memo.png",
  alt: "The Cevrynt deal memo: borrower context, the findings with their evidence and sources attached, the policy outcomes, and a decision summary in which no automated approval or decline has been issued and the four dispositions remain with the lender's team.",
};

const memoSummary = [
  {
    k: "Financial analysis",
    v: "Supportive",
    open: false,
  },
  {
    k: "Business verification",
    v: "1 review item",
    open: true,
  },
  {
    k: "Fraud review",
    v: "No unresolved material finding",
    open: false,
  },
  {
    k: "Policy exceptions",
    v: "1 open",
    open: true,
  },
  {
    k: "Evidence trace",
    v: "Attached",
    open: false,
  },
];

const memoDispositions = [
  "Approve",
  "Conditional",
  "Request information",
  "Decline",
];
const memoReadout = {
  available: "available lender dispositions",
  issued: "issued by Cevrynt",
  summary: "Decision summary · lender-owned",
  choice: "Your team makes the final credit decision",
  stop:
    "These are lender actions, not Cevrynt recommendations. Cevrynt assembles the review, keeps the evidence and policy context attached, and leaves approval, decline, conditions, and information requests with your team.",
};

const memoNote =
  "Cevrynt assembles the financial findings, business verification, policy results, open exceptions, and supporting evidence into one review-ready memo. Anything unresolved stays visible for the lender to address. Cevrynt does not issue the approval, decline, condition, or recommendation — the final credit decision and accountability remain with your team. Illustrative deal · synthetic borrower data.";
export default function AlternativeLendersPage() {
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

      {/* 01 — a repeatable path, and where the reading time actually goes */}
      <section className="al-policy band-light" aria-labelledby="policy-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">POLICY & EXCEPTIONS</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="policy-heading"
              text="Ten rules settle. Two need an underwriter."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt applies your credit policy criterion by criterion. Clear checks resolve against the
             evidence; exceptions stay open with the observed value, threshold, source, and reason attached for human review.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PolicyRun
              criteria={policyCriteria}
              readout={policyReadout}
              audit={policyAudit}
              note={policyNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — claimed against verified, with the gap that stays open */}
      <section className="al-verify band-deep" aria-labelledby="verify-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">BUSINESS VERIFICATION</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="verify-heading"
              text="Verify the business claim by claim — not with one green check."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt compares what the borrower submitted with business verification sources. Fields that align can close; anything that conflicts stays visible with both values and its source for an underwriter to resolve.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ClaimGap shot={verifyShot} pairs={verifyPairs} readout={verifyReadout} note={verifyNote} />
          </div>
        </div>
      </section>

      {/* 03 — evidence, examined rather than reformatted */}
      <section className="al-extract band-light" aria-labelledby="extract-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">DOCUMENT INTELLIGENCE</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="extract-heading"
              text="Turn the borrower package into underwriting data — without losing the source."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt classifies the submitted files, structures the fields your underwriting workflow needs, and keeps material values connected to the document, page, transaction, or verification result they came from.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <EvidenceLoupe
              shot={extractShot}
              fields={extractFields}
              readout={extractReadout}
              note={extractNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — the memo assembles, and then the software stops */}
      {/* 04 — where the twelve months the policy is judged against come from */}
      <section className="al-ledger band-deep" aria-labelledby="ledger-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">CASH-FLOW CONTEXT</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="ledger-heading"
              text="Six statements become one view of how the business actually moves."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt normalizes the statement period into one continuous underwriting view, so deposits, liquidity,
             recurring obligations, and cash-flow stress can be read across time instead of reconstructed month by month.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <LedgerSpan
              months={ledgerMonths}
              statements={ledgerStatements}
              findings={ledgerFindings}
              readout={ledgerReadout}
              insight={ledgerInsight}
              note={ledgerNote}
            />
          </div>
        </div>
      </section>

      <section className="al-memo band-deep" aria-labelledby="memo-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">DECISION MEMO</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="memo-heading"
              text="The review comes together. The decision stays with your team."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt assembles the borrower facts, financial analysis, business verification, policy results, open exceptions, and supporting evidence into one review-ready underwriting memo. Your team resolves what is still open and makes the final credit call.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <FinalCall
              shot={memoShot}
              summary={memoSummary}
              dispositions={memoDispositions}
              readout={memoReadout}
              note={memoNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="06"
          kicker="FOUNDER-LED SMB UNDERWRITING REVIEW"
          heading="Bring one SMB file your team already knows."
          lede="Walk through the borrower package, cash-flow evidence, business verification, lender policy, and open exceptions with Cevrynt. Compare what the platform surfaces with the underwriting work your team already trusts."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
