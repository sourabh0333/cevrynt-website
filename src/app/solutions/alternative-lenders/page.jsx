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
  { name: "Monthly revenue", observed: "$84.6K", threshold: "≥ $75K", result: "Settled", held: false },
  { name: "Average daily balance", observed: "$31.2K", threshold: "≥ $20K", result: "Settled", held: false },
  {
    name: "NSF events · 90d",
    observed: "6",
    threshold: "≤ 5",
    result: "Exception",
    held: true,
    record: {
      what: "One event over the policy limit. Four of the six occurred more than sixty days ago, and recent cash flow and average daily balance remain above policy — so an override was approved rather than the exception being cleared away.",
      who: "Override approved · Sarah Kim · Senior Underwriter · 12:18 · reason code “improving cash flow”",
    },
  },
  { name: "Active MCA positions", observed: "2", threshold: "≤ 2", result: "Settled", held: false },
  { name: "Time in business", observed: "14 mo", threshold: "≥ 12 mo", result: "Settled", held: false },
  {
    name: "Address consistency",
    observed: "Minor mismatch",
    threshold: "Exact / explainable",
    result: "Exception",
    held: true,
    record: {
      what: "The application shows 214 Westlake Dr and the registry shows 210. A reviewer has to decide whether that is a recent move or a data-entry error; officer identity and the entity record otherwise match.",
      who: "No override recorded · still open",
    },
  },
];

const policyReadout = {
  figures: [
    { n: "10 / 12", k: "rules settled without a reader" },
    { n: "02", k: "held for a named person", tone: "held" },
    { n: "No", k: "auto-decline, at any threshold", tone: "never" },
  ],
};

const policyAudit = {
  title: "What the engine keeps, whatever the answer is",
  items: [
    { k: "Policy version retained", v: "Yes · v3.4" },
    { k: "Exception reason visible", v: "Required" },
    { k: "Override reviewer recorded", v: "Required" },
    { k: "Evidence linked to decision", v: "Required" },
  ],
  note:
    "Six of the twelve criteria are tabulated on the screen for this deal; the four settled ones above are one line long because one line is all they cost anybody.",
};

const policyNote =
  "The two entries that open out are the whole section. Ten criteria settle on arithmetic and take nobody's afternoon; the two that stop carry a named reviewer, a timestamp and a reason code — or, in the second case, carry the fact that no override exists and the exception is simply still open. What the engine never does is decide. It raises, holds, records, and keeps the policy version with the file. Illustrative deal · synthetic borrower data.";

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
    field: "Legal entity",
    claim: [{ t: "Cedar & Stone LLC" }],
    record: [{ t: "Cedar & Stone LLC" }],
    claimFrom: "Application · p.1",
    recordFrom: "Texas business registry",
    verdict: "Exact match",
    matched: true,
  },
  {
    field: "Entity standing",
    claim: [{ t: "Active business" }],
    record: [{ t: "Active · in good standing" }],
    claimFrom: "Application · p.1",
    recordFrom: "State filing record",
    verdict: "Active",
    matched: true,
  },
  {
    field: "Tax identifier",
    claim: [{ t: "**-***4821" }],
    record: [{ t: "Ending 4821" }],
    claimFrom: "Application · p.1",
    recordFrom: "Business identity source",
    verdict: "Matched",
    matched: true,
  },
  {
    field: "Business address",
    claim: [{ t: "2" }, { t: "14", diff: true }, { t: " Westlake Dr" }],
    record: [{ t: "2" }, { t: "10", diff: true }, { t: " Westlake Dr" }],
    claimFrom: "Application · p.1",
    recordFrom: "Registry record",
    verdict: "Review",
    matched: false,
  },
];

const verifyReadout = {
  checked: "claims checked against a record",
  open: "that did not close",
  said:
    "Three resolve to a single reading. The fourth disagrees by two characters, marked above on both sides — which is a recent move, a typo, or something worth asking about, and the screen does not pretend to know which. It goes to a person with both records attached.",
};

const verifyNote =
  "Nothing here is a fraud finding and none of it is a decision. A registry that disagrees with an application by one digit is the most ordinary thing in SMB lending, and the useful behaviour is to say exactly where it differs rather than to score it. Three matched and one open is what this one file did; no rate is being claimed. Illustrative deal · synthetic verification data.";

/* 03 — the lens on the borrower's own document ---------------------------- */

const extractShot = {
  src: "/media/Steps/Cevrynt Extract.png",
  alt: "The Cevrynt extract view: a page of the borrower's original bank statement beside the underwriting fields read from it, with each structured value keeping the page and line range it came from and a trace panel showing the quoted source text.",
};

const extractFields = [
  {
    name: "Average monthly deposits",
    value: "$84,613",
    source: "p.4 · lines 12–14",
    raw: "“Deposit — ACH Credit · $18,700.00 · Balance $31,150.00”",
    at: { x: 18.6, y: 65.7 },
  },
  {
    name: "Ending balance evidence",
    value: "$31,240.19",
    source: "p.4 · lines 28–31",
    raw: "“Deposit — Card Settlement · $24,850.00 · Balance $47,060.00”",
    at: { x: 18.6, y: 82 },
  },
  {
    name: "Recurring MCA debit",
    value: "$1,550 / day",
    source: "p.4 · lines 44–46",
    raw: "“Rapid Advance Funding · ACH debit · $1,550.00”",
    at: { x: 18.6, y: 73.8 },
  },
];

const extractReadout = {
  fieldsN: "164",
  fields: "fields read off this file",
  retypedN: "00",
  retyped: "of them retyped by anyone",
};

const extractNote =
  "The lens magnifies the borrower's own statement; the screen underneath is not cropped, moved or annotated. That is the point of the section — the document is being examined rather than reformatted for the argument. The claim is not that a reading is always right, which no picture can show. It is that there is no untraceable step between a page of the file and the number a credit committee is looking at, because every field keeps its page and its lines. Illustrative deal · synthetic borrower data.";

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
    k: "Customer deposits",
    v: "Consistent",
    b: "Weekly clusters, with 41% of deposit value from recurring counterparties.",
  },
  {
    k: "Payroll rhythm",
    v: "Bi-weekly",
    b: "Stable payroll windows across eleven of the twelve months.",
  },
  {
    k: "Debt / MCA payments",
    v: "2 positions",
    b: "An estimated $6.2K a month already committed to existing advances.",
    watch: true,
  },
  {
    k: "Overdraft pressure",
    v: "Low",
    b: "Five negative-balance days, with no sustained decline behind them.",
  },
];

const ledgerReadout = {
  figures: [
    { n: "6 → 1", k: "statements into one ledger" },
    { n: "12", k: "months normalised, no gap" },
    { n: "10 / 12", k: "months of positive net cash flow", tone: "lit" },
  ],
  span: "Width is the period each statement covers · height is how long the document is",
  unstated: "not listed",
  saying: "What the ledger is saying",
};

const ledgerInsight = {
  k: "The screen's own conclusion",
  v: "Cash flow is broadly stable. The watch item is the recurring repayment load already committed — not deposit volatility.",
};

const ledgerNote =
  "Six documents covering the same two months each are not six documents of the same size — eighteen pages against twenty-two — which is exactly the work that gets done by hand when a period has to be rebuilt in a spreadsheet. The sixth block is an outline because the screen tallies that statement without stating its length, and drawing a plausible height for it would have been invisible and wrong. The closing line is the screen's own reading of this file, not a general finding. Illustrative deal · synthetic borrower data.";

/* 05 — the line the software stops at ------------------------------------- */

const memoShot = {
  src: "/media/Steps/Deal Memo.png",
  alt: "The Cevrynt deal memo: borrower context, the findings with their evidence and sources attached, the policy outcomes, and a decision summary in which no automated approval or decline has been issued and the four dispositions remain with the lender's team.",
};

const memoSummary = [
  { k: "Financial analysis", v: "Supportive", open: false },
  { k: "KYB / KYC", v: "Verified", open: false },
  { k: "Fraud review", v: "Resolved", open: false },
  { k: "Policy exceptions", v: "1 open", open: true },
];

const memoDispositions = ["Approve", "Conditional", "Request info", "Decline"];

const memoReadout = {
  available: "dispositions on this file",
  issued: "of them issued by Cevrynt",
  summary: "Decision summary · team-owned",
  choice: "The four your team chooses from",
  stop:
    "These are drawn the way the product draws them, and they do nothing here. They are not controls in this page's markup, because pressing one is not something this software does.",
};

const memoNote =
  "The memo assembles: findings, the evidence behind each one, the policy outcomes, and the exception that is still open — which the summary states rather than rounds away. Then it stops. Cevrynt organizes what a reviewer needs and issues no approval, no decline and no recommendation dressed as one; the disposition, and the accountability that comes with it, stays with the lender. Illustrative deal · synthetic borrower data.";

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
            <p className="hx-kicker">The review path</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="policy-heading"
              text="Ten rules read themselves. Two stop the run."
            />
          </div>
          <p className="eg-lede t-lede">
            Your criteria, your thresholds, applied in the same order to every file — and a run that slows to
            the length of each exception, because that is where a credit team&rsquo;s time is actually spent.
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
            <p className="hx-kicker hx-kicker-invert">Verification</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="verify-heading"
              text="Four claims. Three close. One is four digits apart."
            />
          </div>
          <p className="eg-lede t-lede">
            What the borrower wrote, set against what the registry and officer records say — with the distance
            between them drawn, and left open where it does not close.
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
            <p className="hx-kicker">Evidence</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="extract-heading"
              text="A hundred and sixty-four fields. None of them retyped."
            />
          </div>
          <p className="eg-lede t-lede">
            Every value keeps the page and the lines it was read from. The lens below sits on the borrower&rsquo;s
            own statement — nothing is cropped, moved, or annotated.
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
            <p className="hx-kicker hx-kicker-invert">The ledger</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="ledger-heading"
              text="Six statements. Twelve months. Nobody rebuilt them."
            />
          </div>
          <p className="eg-lede t-lede">
            Every figure the policy above was judged against comes from here. Each statement is laid on the
            period it covers, and the six of them tile twelve months with no gap and no overlap.
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
            <p className="hx-kicker hx-kicker-invert">The final call</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="memo-heading"
              text="The memo assembles itself. The four buttons do not."
            />
          </div>
          <p className="eg-lede t-lede">
            Findings, evidence, policy outcomes and what is still open, gathered into one review-ready memo —
            and then a line the software does not cross.
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
          kicker="Founder-led walkthrough"
          heading="Bring a file your team argued about."
          lede="We will run it against your own criteria, show you where the exceptions land and what the memo would carry — and leave the call exactly where it belongs."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
