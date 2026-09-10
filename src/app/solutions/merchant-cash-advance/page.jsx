import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { StatementSeams } from "@/components/mca/statement-seams";
import { DaySplit } from "@/components/mca/day-split";
import { PolicyMargins } from "@/components/mca/policy-margins";
import { SourceAddress } from "@/components/mca/source-address";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

const page = pageByPath.get("solutions/merchant-cash-advance");

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
   Every figure below is one this site already publishes for its illustrative
   deal — $84,613 in average monthly deposits and a recurring $1,550/day MCA
   debit — or plain arithmetic on those. Nothing here is a new claim.
   -------------------------------------------------------------------------- */

const statements = [
  "Month 1",
  "Month 2",
  "Month 3",
  "Month 4",
  "Month 5",
  "Month 6",
];

const seamsReadout = { series: "BANK STATEMENTS REVIEWED", days: "DAYS OF CASH-FLOW ACTIVITY" };

const seamsNote =
  "Cevrynt normalizes the statement period into one reviewable timeline, making it easier to spot changes in deposit volume, liquidity, NSF frequency, negative-balance days, and recurring MCA debits across the full six months.";

/** $84,613 a month across 30 days. */
const DAY_DEPOSITS = Math.round(84613 / 30);

const dayLabels = {
  combined: "of average daily deposits committed",
  headroom: "remaining daily cash flow",
  over: "above average daily deposits",
  existing: "Existing MCA repayment",
  proposed: "Proposed MCA repayment",
  day: "Average daily deposits",
  control: "Proposed daily repayment",
};

const dayNote =
  "Cevrynt shows how much of the merchant’s average daily cash flow is already committed to existing MCA repayments, then models what another proposed payment would add. The calculation stays separate from the decision: your lender policy defines what level is acceptable, and your team makes the final call.";
/**
 * The same deal against an example lender policy. The deal's own figures are
 * the ones published throughout the site; the thresholds beside them are an
 * illustration of one lender's criteria, which is the point — they are the
 * lender's numbers, not Cevrynt's.
 */
const policyCriteria = [
  {
    name: "Average monthly deposits",
    value: "$84,613",
    threshold: "min $50,000",
    margin: 69,
    marginLabel: "+69% clear",
  },
  {
    name: "Ending balance",
    value: "$31,240",
    threshold: "min $10,000",
    margin: 212,
    marginLabel: "+212% clear",
  },
  {
    name: "Committed share of a day",
    value: "55%",
    threshold: "max 60%",
    margin: 8,
    marginLabel: "+8% clear",
  },
  {
    name: "Existing positions",
    value: "1",
    threshold: "max 1",
    margin: 0,
    marginLabel: "on the line",
  },
  {
    name: "Negative days, worst month",
    value: "7",
    threshold: "max 4",
    margin: -75,
    marginLabel: "3 over",
    flag: "Exception · needs reviewer judgment",
  },
];

const policyReadout = {
  measured: "policy criteria checked",
  exception: "exception requires review",
};

const policyNote =
  "Cevrynt keeps each policy criterion visible instead of collapsing the file into one score. This deal passes four rules and exceeds the negative-day threshold by three days, so the exception stays explicit for human review. The thresholds shown are illustrative — your lender policy replaces them.";

/**
 * Four figures and the addresses the product's own intake screen records for
 * them. The quoted lines are the source text that screen shows against each
 * value; the surrounding lines are illustrative statement and application
 * copy, at the line numbers the addresses actually name.
 */
const sourceFigures = [
  {
    field: "Monthly deposits · Apr 2026",
    value: "$84,613",
    doc: "First Harbor Bank statement · Apr 2026",
    address: "p. 84 · lines 21–31",
    page: 84,
    from: 21,
    to: 31,
    window: [
      { n: 19, text: "CARD SETTLEMENT · 04/28", amount: "2,914.60" },
      { n: 20, text: "ACH CREDIT · 04/29", amount: "1,248.15" },
      { n: 21, text: "— DEPOSIT SUMMARY —", amount: "" },
      {
        n: 22,
        text: "Total deposits and credits",
        amount: "$84,613.42",
        hit: true,
      },
      { n: 23, text: "Card settlements", amount: "61,204.18" },
      { n: 24, text: "ACH credits", amount: "18,880.06" },
      { n: 25, text: "Cash and cheque", amount: "4,529.18" },
      { n: 26, text: "Deposit count", amount: "214" },
      { n: 27, text: "Largest single deposit", amount: "5,140.00" },
      { n: 28, text: "Average daily deposits", amount: "2,820.44" },
      { n: 29, text: "Days with no deposit", amount: "6" },
      { n: 30, text: "Returned items", amount: "1" },
      { n: 31, text: "Statement period", amount: "04/01 – 04/30" },
    ],
  },

  {
    field: "Average daily balance · Apr 2026",
    value: "$31,240",
    doc: "First Harbor Bank statement · Apr 2026",
    address: "p. 84 · lines 32–39",
    page: 84,
    from: 32,
    to: 39,
    window: [
      { n: 32, text: "— BALANCE SUMMARY —", amount: "" },
      { n: 33, text: "Opening balance", amount: "$29,415.60" },
      {
        n: 34,
        text: "Average daily balance",
        amount: "$31,240.19",
        hit: true,
      },
      { n: 35, text: "Lowest daily balance", amount: "$18,904.42" },
      { n: 36, text: "Highest daily balance", amount: "$47,806.11" },
      { n: 37, text: "Negative-balance days", amount: "0" },
      { n: 38, text: "NSF events", amount: "1" },
      { n: 39, text: "Ending balance", amount: "$34,850.20" },
    ],
  },

  {
    field: "Recurring MCA repayment",
    value: "$1,550 / day",
    doc: "First Harbor Bank statement · ACH activity",
    address: "p. 46 · lines 41–46",
    page: 46,
    from: 41,
    to: 46,
    window: [
      { n: 40, text: "— ACH DEBITS —", amount: "" },
      {
        n: 41,
        text: "RAPID ADVANCE FUNDING",
        amount: "-$1,550.00",
        hit: true,
      },
      { n: 42, text: "RAPID ADVANCE FUNDING", amount: "-$1,550.00" },
      { n: 43, text: "RAPID ADVANCE FUNDING", amount: "-$1,550.00" },
      { n: 44, text: "RAPID ADVANCE FUNDING", amount: "-$1,550.00" },
      { n: 45, text: "RAPID ADVANCE FUNDING", amount: "-$1,550.00" },
      { n: 46, text: "Observed frequency", amount: "Business daily" },
    ],
  },

  {
    field: "Legal business name",
    value: "Cedar & Stone LLC",
    doc: "Business application",
    address: "p. 1 · line 4",
    page: 1,
    from: 4,
    to: 4,
    window: [
      { n: 1, text: "MERCHANT FINANCING APPLICATION", amount: "" },
      { n: 2, text: "Submitted", amount: "19 Aug 2026" },
      { n: 3, text: "— BUSINESS —", amount: "" },
      {
        n: 4,
        text: "Legal Business Name",
        amount: "Cedar & Stone LLC",
        hit: true,
      },
      { n: 5, text: "Trading name", amount: "Cedar & Stone" },
      { n: 6, text: "Entity type", amount: "LLC" },
      { n: 7, text: "Jurisdiction", amount: "Florida" },
    ],
  },
];

const sourceLabels = {
  memo: "In the underwriting review",
  page: "Source page",
  of: "of",
  line: "Source line",
  lines: "Source lines",
  spanOne: "source line supporting this finding",
  spanMany: "source lines supporting this finding",
};
const sourceNote =
  "Cevrynt keeps each material finding connected to the evidence behind it. Some values come from a single field, others from a wider statement range or calculation, and the source trace preserves that difference. Illustrative deal · synthetic borrower data.";

export default function MerchantCashAdvancePage() {
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

      {/* 01 — Six statements read as one series */}
      <section className="mca-seams band-light" aria-labelledby="seams-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">BANK STATEMENT ANALYSIS</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="seams-heading"
              text="Six statements become one cash-flow story."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt reads the full statement period together, so your underwriter can see how deposits, balances,
             NSF activity, negative days, transfers, and recurring obligations behave across the deal — not month by month in isolation.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <StatementSeams statements={statements} readout={seamsReadout} note={seamsNote} />
          </div>
        </div>
      </section>

      {/* 02 — One day, and what an existing position already takes from it */}
      <section className="mca-day band-deep" aria-labelledby="day-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">EXISTING MCA POSITIONS</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="day-heading"
              text="See what the merchant is already carrying before you add another position."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt surfaces recurring MCA payments from bank activity, connects them 
            to the supporting transactions and agreements, and shows how much of the merchant’s daily cash flow is already committed.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <DaySplit
              dayDeposits={DAY_DEPOSITS}
              existingDaily={1550}
              maxProposed={1800}
              startProposed={600}
              labels={dayLabels}
              note={dayNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — Your policy, with the one exception left visible */}
      <section className="mca-policy band-light" aria-labelledby="policy-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">LENDER POLICY</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="policy-heading"
              text="One exception shouldn’t disappear inside a score."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt evaluates each MCA underwriting criterion separately against your own buy
             box — showing the observed value, required threshold, margin, and exception status before the file reaches human review.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PolicyMargins criteria={policyCriteria} readout={policyReadout} note={policyNote} />
          </div>
        </div>
      </section>

      {/* 04 — From a figure in the memo to the line it was read from */}
      <section className="mca-source band-deep" aria-labelledby="source-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">SOURCE-LINKED EVIDENCE</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="source-heading"
              text="Every underwriting number should open back to its source."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt keeps material MCA underwriting findings connected to the evidence behind them — statement pages, transactions, application fields, agreements, and verification results — so 
            your underwriter can check the number instead of taking the system’s word for it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <SourceAddress
              figures={sourceFigures}
              packagePages={143}
              labels={sourceLabels}
              note={sourceNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="05"
          kicker="FOUNDER-LED MCA WALKTHROUGH"
          heading="Bring an MCA file your team already knows."
          lede="Walk through the statements, existing positions, cash-flow signals, lender policy, and exceptions with Cevrynt. Compare what the platform surfaces with the underwriting work your team already trusts."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
