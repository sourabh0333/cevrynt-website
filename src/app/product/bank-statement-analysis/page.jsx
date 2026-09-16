import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { DepositClasses } from "@/components/bank/deposit-classes";
import { DayGrid } from "@/components/bank/day-grid";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

const page = pageByPath.get("product/bank-statement-analysis");

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
   Two sections for now, reviewed before the rest of the page is written. Same
   architecture as the other product pages, over the band-light / band-deep
   sequence.

   Both sections attack the same habit, which is quoting a bank statement as a
   total. 01 shows that gross deposits and revenue are different numbers and
   that the gap is made of ordinary, identifiable things. 02 shows that a count
   of returned items says almost nothing until you know which days they landed
   on.

   The figures are the illustrative Cedar & Stone file used across this site.
   Gross deposits of $253.8K over three statement periods is exactly the
   $84.6K monthly average published on the Policy Engine and Alternative
   Lenders pages, and the six returned items are the same six the Underwriting
   Report page traces to June and July.

   Three constraints held throughout:

   1. Cevrynt separates and labels. Which categories a lender counts as revenue
      is the lender's policy, and no revenue total is asserted here.
   2. What the statement does not say, the engine does not guess. Three
      deposits carry no descriptor and are flagged rather than classified.
   3. No score, no risk rating and no decision. A cluster of negative days is
      reported as a cluster of negative days.
   -------------------------------------------------------------------------- */

/* 01 — a deposit is not revenue -------------------------------------------- */

const depositReadout = {
  figures: [
    { of: "all", k: "Deposits in the period" },
    { of: "classes", k: "Categories they fall into" },
    { of: "flagged", k: "It will not classify", tone: "flag" },
  ],
  lineK: "As it appears on the statement",
  restK: "The descriptor is the evidence",
  restB:
    "Choose a category to lift one of its lines off the statement. Nothing here rests on trusting a classification: the reason a transfer from the owner's other account is not a sale is visible in the line itself, which is a better argument than any figure attached to the same conclusion.",
  saidK: "Why no revenue total appears here",
  saidB: [
    "Whether a supplier refund reduces revenue or simply is not revenue, whether owner contributions count at all, whether the proceeds of another advance are netted or ignored — these are policy questions, and different lenders answer them differently for good reasons of their own.",
    "So the engine separates the deposits, labels what it can read, and stops. The total belongs to whoever set the policy, and a platform that produced one anyway would be making an underwriting decision in the least visible place it could possibly make it.",
  ],
};

const depositColumns = {
  k: "What the deposits are",
  n: "Count",
  amount: "Amount",
  treat: "How it is treated",
};

/* Six categories over three statement periods, summing to the $253.8K gross
   behind the $84.6K monthly average published elsewhere on this site. */
const depositClasses = [
  {
    k: "Card settlements from the processor",
    n: 78,
    amount: "$171.4K",
    treat: "rev",
    treatK: "Revenue-like",
    line: { d: "06/11", desc: "MERCH BANKCD DEP  CEDAR STONE LLC", amt: "$2,184.60" },
    say: "Daily batches from one processor, which is why there are seventy-eight of them across three statements. The regularity is the useful part: a gap in this series is a closed day, and the engine can tell you which days those were.",
  },
  {
    k: "ACH received from named customers",
    n: 24,
    amount: "$46.2K",
    treat: "rev",
    treatK: "Revenue-like",
    line: { d: "06/18", desc: "ACH CREDIT  NORTHPOINT FURNISH  INV 2291", amt: "$4,120.00" },
    say: "Invoice payments from trade customers, each carrying a payer name the engine keeps. Those names are what the concentration reading on the Fraud Signals side is built from — one payer at a high share is a fact worth a person seeing.",
  },
  {
    k: "Transfers in from the owner's other account",
    n: 6,
    amount: "$18.0K",
    treat: "not",
    treatK: "Not revenue",
    line: { d: "05/09", desc: "TRNSFR FROM CHK *4471", amt: "$3,000.00" },
    say: "Money moved between two accounts the same person controls. It is a real deposit and it is not a sale, and counting it as revenue would inflate the figure that half a dozen thresholds are measured against.",
  },
  {
    k: "A refund returned by a supplier",
    n: 2,
    amount: "$4.9K",
    treat: "not",
    treatK: "Not revenue",
    line: { d: "07/02", desc: "REFUND  ATLAS SUPPLY CO  CR MEMO", amt: "$2,450.00" },
    say: "Money coming back that already went out. Whether it reduces an expense or is simply set aside is the lender's accounting policy, but it is nobody's definition of a sale.",
  },
  {
    k: "Proceeds from an existing advance",
    n: 1,
    amount: "$9.5K",
    treat: "not",
    treatK: "Not revenue",
    line: { d: "05/21", desc: "ACH CREDIT  FUNDING DISB  REF 88301", amt: "$9,500.00" },
    say: "Somebody else's money, arriving once. It is also the clearest signal on the statement that a position already exists, which is why the debits that follow it matter more than the credit itself.",
  },
  {
    k: "Deposits with no descriptor at all",
    n: 3,
    amount: "$3.8K",
    treat: "flag",
    treatK: "Flagged, not classified",
    line: { d: "05/02", desc: "DEPOSIT", amt: "$1,200.00" },
    say: "That is the whole line. There is no payer, no reference and no channel, so the engine does not classify it — it flags it for somebody to ask about. Guessing here would put invented revenue into an underwriting file, which is the one thing worse than leaving a gap.",
  },
];

const depositTotals = {
  k: "Gross deposits",
  amount: "$253.8K",
  b: "$32.4K of that is not revenue under any definition, and $3.8K the engine declines to call either way. The monthly average everybody quotes — $84.6K — is an average of the whole column, which is exactly why what sits inside it is worth a section of its own.",
};

const depositAside = {
  title: "What the engine does with a deposit",
  items: [
    { k: "Reads the descriptor", v: "Always" },
    { k: "Keeps the payer name", v: "When there is one" },
    { k: "Decides what counts as revenue", v: "Never" },
    { k: "Guesses an unlabelled line", v: "Never" },
  ],
  note: "Categories are applied from what the statement says, not inferred from what would be convenient. Where the descriptor is missing the deposit stays unclassified and visible, rather than being quietly absorbed into whichever bucket is largest.",
};

const depositClose =
  "Gross deposits is the number in every submission email and the one that is wrong most often — not because anybody lied, but because a bank statement makes no distinction between money a business earned and money that merely arrived. Separating those two things is most of the work, and deciding what to do about it is not ours.";

const depositNote =
  "Illustrative statement lines from the worked file used throughout this site. Descriptors are representative of the formats these statements use. Cevrynt structures and labels bank activity; it issues no revenue figure, score or decision.";

/* 02 — the period, one day at a time --------------------------------------- */

const gridReadout = {
  figures: [
    { of: "days", k: "Days in the period" },
    { of: "negatives", k: "Days closing below zero" },
    { of: "both", k: "Returns on a day already below zero", tone: "both" },
  ],
};

const gridWeekdays = ["S", "M", "T", "W", "T", "F", "S"];

/* The same six returned items the Policy Engine and Underwriting Report pages
   cite, placed on the dates those pages already point at. */
const gridMonths = [
  { k: "May", n: "31 days", days: 31, offset: 3, negatives: [], returns: [22] },
  {
    k: "June",
    n: "30 days",
    days: 30,
    offset: 6,
    negatives: [9, 10, 11, 12, 13, 14, 15],
    returns: [10, 12, 13, 15],
  },
  { k: "July", n: "31 days", days: 31, offset: 1, negatives: [28, 29], returns: [29] },
];

const gridReadings = [
  {
    k: "Everything, on the days it happened",
    of: "days",
    say: "Ninety-two days drawn as ninety-two days. May is clean, July has a wobble at the very end, and June has a week in the middle that does not look like the rest of the period at all — and nobody had to be told that, because it is simply visible.",
    b: "The period as it actually is, rather than as three monthly totals. Totals are what hide a bad fortnight inside an acceptable quarter.",
  },
  {
    k: "Days the account closed below zero",
    of: "negatives",
    say: "Nine negative days, and seven of them are consecutive. Nine spread evenly across three months would describe a business that runs permanently close to the line; seven in a row describes one week going wrong, and those two files need completely different conversations.",
    b: "Nine days below zero. Where they sit turns out to matter far more than how many there are, and a count on its own cannot carry that.",
  },
  {
    k: "Returns that landed on a negative day",
    of: "both",
    say: "Five of the six returned items fall on a day the account was already below zero. That makes them a symptom of the balance rather than six independent events — and no count of returns, however accurate, could ever have said so.",
    b: "The reading worth having. It is not a new measurement; it is two existing ones held against each other, which is the kind of thing that only becomes possible once the period is drawn as days.",
  },
];

const gridAside = {
  title: "What is reported, and what is not",
  items: [
    { k: "The date of every event", v: "Kept" },
    { k: "The statement page behind it", v: "Attached" },
    { k: "A cluster called out as a cluster", v: "Yes" },
    { k: "A risk rating for the period", v: "None" },
  ],
  note: "A cluster of negative days is reported as a cluster of negative days. What it means — a seasonal trough, one late customer, a processor holding a batch — is not in the statement, and Cevrynt does not supply an answer the document cannot support.",
};

const gridClose =
  "Six returned items across three statements is true and almost useless. Four of them inside one week, five of them on days the account was already overdrawn, and eighty-three days either side that look completely ordinary — that is the same period, described in a way somebody can actually act on.";

const gridNote =
  "The illustrative period used throughout this site, showing the same six returned items cited on the Policy Engine and Underwriting Report pages. Cevrynt reports what the statements show and issues no rating, score or decision about the period.";

export default function BankStatementAnalysisPage() {
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

      {/* 01 — the gap between gross deposits and revenue */}
      <section className="bk-deposits band-light" aria-labelledby="deposits-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">Deposits and revenue</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="deposits-heading"
              text="A deposit is not revenue, and the statement will not tell you which is which."
            />
          </div>
          <p className="eg-lede t-lede">
            One hundred and fourteen deposits across three statement periods, separated by what they actually
            are. Choose a category and the line itself comes off the statement, descriptor and all.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <DepositClasses
              classes={depositClasses}
              totals={depositTotals}
              columns={depositColumns}
              readout={depositReadout}
              aside={depositAside}
              close={depositClose}
              note={depositNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — the period as days rather than as totals */}
      <section className="bk-days band-deep" aria-labelledby="days-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">The shape of the period</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="days-heading"
              text="Six returned items across three statements is a count. Where they landed is the fact."
            />
          </div>
          <p className="eg-lede t-lede">
            The period drawn as ninety-two days rather than three totals, with every negative day and every
            returned item on the date it happened.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <DayGrid
              months={gridMonths}
              readings={gridReadings}
              weekdays={gridWeekdays}
              readout={gridReadout}
              aside={gridAside}
              close={gridClose}
              note={gridNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="03"
          kicker="Founder-led"
          heading="Bring three months that argued with each other."
          lede="A file where the deposits looked fine and the balance did not, or where the monthly average was comfortable and one week inside it was not. Walk us through how you read it and what you asked for next, and we will show you the same period the way this works."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
