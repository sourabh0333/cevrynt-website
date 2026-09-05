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

const statements = ["Statement 1", "Statement 2", "Statement 3", "Statement 4", "Statement 5", "Statement 6"];

const seamsReadout = { series: "series to read, not six", days: "days of activity" };

const seamsNote =
  "Six statements, one hundred and eighty days. The panels above share their end points, so once the seams close the line is genuinely continuous rather than six shapes lined up to look continuous — which is the same thing Cevrynt does to the file before an underwriter sees it. Illustrative deal · synthetic borrower data, at the average monthly deposits this file is described by throughout the site.";

/** $84,613 a month across 30 days. */
const DAY_DEPOSITS = Math.round(84613 / 30);

const dayLabels = {
  combined: "of an average day already committed",
  headroom: "left of an average day",
  over: "past the end of the day",
  existing: "Existing position",
  proposed: "Proposed position",
  day: "An average day of deposits",
  control: "Proposed daily payment",
};

const dayNote =
  "The existing position collects $1,550 every business day, which is a share of each day's deposits committed before anybody opens a new file. Move the control to stack a second position on top of it. This is arithmetic and nothing more: the threshold that matters is the one in your own credit policy, and Cevrynt issues no approval, decline or funding recommendation on any deal.";

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

const policyReadout = { measured: "criteria, measured separately", exception: "exception, shown not averaged" };

const policyNote =
  "A score would have turned these five rows into one number, and the only interesting thing on this file — a deal that clears four criteria comfortably and misses the fifth by three days — would have disappeared into it. Nothing here is combined. Thresholds shown are an illustration of one lender's policy; yours replace them, and the line moves when you move it.";

/**
 * Four figures and the addresses the product's own intake screen records for
 * them. The quoted lines are the source text that screen shows against each
 * value; the surrounding lines are illustrative statement and application
 * copy, at the line numbers the addresses actually name.
 */
const sourceFigures = [
  {
    field: "Average monthly deposits",
    value: "$84,613",
    doc: "Bank statement · May 2026",
    address: "p.84 · lines 22–31",
    page: 84,
    from: 22,
    to: 31,
    window: [
      { n: 19, text: "CARD SETTLEMENT · 04/28", amount: "2,914.60" },
      { n: 20, text: "ACH CREDIT · 04/29", amount: "1,248.15" },
      { n: 21, text: "— DEPOSIT SUMMARY —", amount: "" },
      { n: 22, text: "Total deposits and credits", amount: "$84,613.42", hit: true },
      { n: 23, text: "Card settlements", amount: "61,204.18" },
      { n: 24, text: "ACH credits", amount: "18,880.06" },
      { n: 25, text: "Cash and cheque", amount: "4,529.18" },
      { n: 26, text: "Deposit count", amount: "214" },
      { n: 27, text: "Largest single deposit", amount: "5,140.00" },
      { n: 28, text: "Average daily deposits", amount: "2,820.44" },
      { n: 29, text: "Days with no deposit", amount: "6" },
      { n: 30, text: "Returned items", amount: "1" },
      { n: 31, text: "Statement period", amount: "04/01 – 04/30" },
      { n: 32, text: "— WITHDRAWAL SUMMARY —", amount: "" },
      { n: 33, text: "Total withdrawals and debits", amount: "71,902.55" },
    ],
  },
  {
    field: "Legal business name",
    value: "Cedar & Stone LLC",
    doc: "Business application",
    address: "p.1 · line 4",
    page: 1,
    from: 4,
    to: 4,
    window: [
      { n: 1, text: "MERCHANT FINANCING APPLICATION", amount: "" },
      { n: 2, text: "Submitted", amount: "19 Aug 2026" },
      { n: 3, text: "— BUSINESS —", amount: "" },
      { n: 4, text: "Legal Business Name", amount: "Cedar & Stone LLC", hit: true },
      { n: 5, text: "Trading name", amount: "Cedar & Stone" },
      { n: 6, text: "Entity type", amount: "LLC" },
      { n: 7, text: "Jurisdiction", amount: "Florida" },
    ],
  },
  {
    field: "Primary bank",
    value: "First Harbor Bank",
    doc: "Bank statement · header",
    address: "p.7 · lines 1–2",
    page: 7,
    from: 1,
    to: 2,
    window: [
      { n: 1, text: "First Harbor Bank", amount: "", hit: true },
      { n: 2, text: "Business Checking", amount: "····7123" },
      { n: 3, text: "Statement period", amount: "11/01 – 11/30" },
      { n: 4, text: "CEDAR & STONE LLC", amount: "" },
      { n: 5, text: "214 Westlake Dr", amount: "" },
    ],
  },
  {
    field: "Owner",
    value: "Michael Richards",
    doc: "Business application",
    address: "p.2 · line 6",
    page: 2,
    from: 6,
    to: 6,
    window: [
      { n: 3, text: "— OWNERSHIP —", amount: "" },
      { n: 4, text: "Ownership structure", amount: "Single member" },
      { n: 5, text: "Percentage held", amount: "100%" },
      { n: 6, text: "Owner", amount: "Michael Richards", hit: true },
      { n: 7, text: "Role", amount: "Managing member" },
      { n: 8, text: "Time in role", amount: "6 years" },
    ],
  },
];

const sourceLabels = {
  memo: "In the underwriting memo",
  page: "Page",
  of: "of",
  line: "Line",
  lines: "Lines",
  spanOne: "source line behind this figure",
  spanMany: "source lines behind this figure",
};

const sourceNote =
  "The bracket is the measurement: its height is the number of lines the value was read from, so a deposits total summed from a ten-line block and a business name copied off a single line do not look alike. Every address here is one the product records against the figure. Illustrative deal · synthetic borrower data.";

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
            <p className="hx-kicker">Bank activity</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="seams-heading"
              text="The file arrives as six PDFs. The rhythm is in all of them at once."
            />
          </div>
          <p className="eg-lede t-lede">
            Nobody underwrites a statement. They underwrite six months, which is why the first hour of an MCA
            file usually goes on putting the months back together in a spreadsheet.
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
            <p className="hx-kicker hx-kicker-invert">Existing positions</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="day-heading"
              text="Most of this day was sold before your file was opened."
            />
          </div>
          <p className="eg-lede t-lede">
            Stacking is not a policy question until it is an arithmetic one. This is one average day of
            deposits, and what a position already collecting against it leaves behind.
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
            <p className="hx-kicker">Policy</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="policy-heading"
              text="Four criteria clear. One misses by three days."
            />
          </div>
          <p className="eg-lede t-lede">
            That sentence is the whole file, and it is the sentence a single score cannot say. So nothing here
            is combined — every criterion keeps its own line, its own threshold and its own margin.
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
            <p className="hx-kicker hx-kicker-invert">Evidence</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="source-heading"
              text="Every figure in the memo has an address, not a footnote."
            />
          </div>
          <p className="eg-lede t-lede">
            A credit committee does not ask whether the figure is impressive. It asks where it came from — so
            pick one, and the page it was read from opens at the lines it was read from.
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
          kicker="Founder-led walkthrough"
          heading="Bring a file your team already argued about."
          lede="Six statements, an existing position and the one criterion that missed. We will read it the way your underwriters do and show you where Cevrynt would have saved the hour."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
