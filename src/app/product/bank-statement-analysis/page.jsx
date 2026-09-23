import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { DepositClasses } from "@/components/bank/deposit-classes";
import { DayGrid } from "@/components/bank/day-grid";
import { PositionRails } from "@/components/bank/position-rails";
import { BalanceCurve } from "@/components/bank/balance-curve";
import { FlowWeeks } from "@/components/bank/flow-weeks";
import { StatementSeams } from "@/components/bank/statement-seams";
import {
  PERIOD_DAYS,
  periodMonths,
  monthStarts,
  dayLabel,
  positionHolidays,
  dailyDebits,
  weeklyDebits,
  DAILY_DEBIT,
  WEEKLY_DEBIT,
  RENEWAL_DAY,
  RENEWAL_NET,
  balanceSeries,
  OPENING_BALANCE,
  flows,
  sumRange,
} from "@/content/cedar-stone-statements";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

const page = pageByPath.get("product/bank-statement-analysis");

/* Whole dollars, formatted the way the statements print them. */
const usd = (d) => `$${d.toLocaleString("en-US")}`;

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
   Six sections, same architecture as the other product pages, over the
   band-light / band-deep sequence. Every one attacks the same habit, which is
   quoting a bank statement as a total.

   01 deposits are not revenue · 02 where the negative days and returns landed ·
   03 the positions already paying out · 04 what an average balance hides ·
   05 money in against money out, week by week · 06 whether the statements are
   one unbroken record, and what they point at that is not in the file.

   04, 05 and 06 share one daily series. The balance is built to the published
   $31.2K average; daily flows are derived from it; weekly and statement totals
   are summed from those. Nothing downstream is authored separately, so the
   curve, the weekly nets and the three reconciliations cannot disagree.

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
    k: "Net proceeds of an advance renewal",
    n: 1,
    amount: "$9.5K",
    treat: "not",
    treatK: "Not revenue",
    line: { d: "05/21", desc: "ACH CREDIT  RAPID ADVANCE FUNDING  RENEWAL", amt: "$9,500.00" },
    say: "Somebody else's money, arriving once. Rapid Advance Funding renewed the position it already debits every business day, netted off what was still owed and deposited the rest. The credit carries the same lender's name as the daily debits, which is how the two are tied to one position rather than read as two.",
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

/* 03 — existing positions --------------------------------------------------- */

const positionReadout = {
  figures: [
    { of: "all", k: "Positions on the statements" },
    { of: "seen", k: "With a funding credit visible" },
    { of: "inferred", k: "Seen only by its payments", tone: "inferred" },
  ],
  cornerK: "Position",
  restK: "The rhythm is the evidence",
  restB:
    "Choose a position to read what the rail shows. One tick per debit, on the date it cleared. A tick every business day is one kind of agreement and a tick every Tuesday is another — and the rail with no funding credit on it is exactly why it arrives as a question rather than a fact.",
};

const positionList = [
  {
    k: "Rapid Advance Funding, renewed on May 21",
    cadenceK: "Daily · every business day",
    credit: { i: RENEWAL_DAY, k: `${usd(RENEWAL_NET)} in · renewal proceeds` },
    debits: dailyDebits,
    amount: usd(DAILY_DEBIT),
    total: usd(dailyDebits.length * DAILY_DEBIT),
    say: "An existing position: the $1,550 debit runs every business day from the first day of the window to the last, on both sides of the renewal credit on May 21. The two holes in the rail are Memorial Day and Independence Day — no ACH settles, so nothing is missed, and the engine does not report them as missed.",
    b: `The easy case, and still worth drawing: a daily debit with a lender's name on it, and a renewal credit from the same lender in the middle of it. ${dailyDebits.length} payments in the window, with the two bank holidays left as gaps rather than counted as failures.`,
  },
  {
    k: "A weekly debit with no funding credit",
    cadenceK: "Weekly · every Tuesday",
    credit: null,
    absentK: "No funding credit on these statements",
    debits: weeklyDebits,
    amount: usd(WEEKLY_DEBIT),
    total: usd(weeklyDebits.length * WEEKLY_DEBIT),
    say: "Nine Tuesdays in a row at the same amount, and nothing anywhere in these statements that funded it. It may predate the period, it may have landed in another account, or it may be something else entirely — the statements cannot say which, so this goes to a person as a signal rather than on to the file as a confirmed position.",
    b: "The hard case. The payments are unmistakable and the origin is invisible, which is precisely the gap a reviewer needs to close by asking — and precisely the gap a platform should never close by assuming.",
  },
];

const positionAside = {
  title: "What the engine does with a debit rhythm",
  items: [
    { k: "Places every debit on its date", v: "Always" },
    { k: "Separates holidays from misses", v: "Yes" },
    { k: "Confirms a position it cannot see funded", v: "Never" },
    { k: "Stacking calculation or holdback advice", v: "None" },
  ],
  note: "A rhythm with no funding credit is reported as a rhythm with no funding credit. What it is, what else is owed on it, and whether it changes anything are questions for the broker and the reviewer — Cevrynt is not a lender and prices nothing.",
};

const positionClose =
  "One position arrived with its own name on it. The other has been paying every Tuesday for nine weeks without ever appearing on these statements as money received — and the second is the one worth an underwriter's first phone call of the morning.";

const positionNote =
  "Illustrative debit patterns on the illustrative file used throughout this site, matching the funding credit shown in section 01 and the weekly pattern cited on the Underwriting Report page. Descriptors and amounts are worked-example detail.";

/* 04 — what the average hides ---------------------------------------------- */

const balanceReadout = {
  figures: [
    { of: "average", k: "Average daily balance" },
    { of: "negatives", k: "Days closing below zero" },
    { of: "low", k: "Lowest close in the period", tone: "low" },
  ],
  avgK: "Average",
  sliderK: "Daily closing balance, May to July. Use the arrow keys to move one day, Page Up and Page Down to move a week.",
  hintK: "Move across the chart, or focus it and use the arrow keys, to read any single day",
  monthAvgK: "Average",
  monthNegK: "Days below zero",
  monthLowK: "Lowest close",
  saidK: "Why the curve and not the number",
  saidB: [
    "Average daily balance is in half the thresholds a lender writes, and it is precisely the kind of figure that is accurate and misleading at the same time. The average here is correct to the cent. So is the week in June, and one number has no way of carrying both.",
    "Monthly averages do not rescue it either: June averaged comfortably above zero and still closed overdrawn on seven of its days. The only form that keeps both facts is the day-by-day series, which is why the engine keeps it and puts the average on top of it rather than in place of it.",
  ],
};

const balanceAside = {
  title: "What travels with an average",
  items: [
    { k: "The daily series behind it", v: "Kept" },
    { k: "Days below zero, by date", v: "Listed" },
    { k: "The lowest close and when", v: "Stated" },
    { k: "An average reported alone", v: "Never" },
  ],
  note: "The average is still reported, because lenders' policies are written against it. It simply never travels without the series underneath it, so the reader can see what it averaged over — and whether a comfortable number is sitting on top of an uncomfortable week.",
};

const balanceClose =
  "$31.2K is the true average of this account, and the account could not cover itself for seven days in a row in June. Both are facts. A report that could only hold one of them would have to choose, and the one it would choose is the one that fits in a table.";

const balanceNote =
  "An illustrative daily balance built to match the $31.2K average and the nine negative days already published for this file. Cevrynt reports what the statements show and issues no rating, score or decision about the balance.";

/* 05 and 06 — money in and money out --------------------------------------- */

const flowWeeks = Array.from({ length: 13 }, (_, w) => {
  const a = w * 7;
  const b = w === 12 ? PERIOD_DAYS - 1 : a + 6;
  const inflow = sumRange(flows.inflow, a, b);
  const outflow = sumRange(flows.out, a, b);
  const positions =
    dailyDebits.filter((d) => d >= a && d <= b).length * DAILY_DEBIT +
    weeklyDebits.filter((d) => d >= a && d <= b).length * WEEKLY_DEBIT;
  return {
    k: dayLabel(a),
    range: `${dayLabel(a)} – ${dayLabel(b)}`,
    in: inflow,
    out: outflow,
    net: inflow - outflow,
    positions,
    advance: a <= 20 && b >= 20 ? 9500 : 0,
    neg: balanceSeries.slice(a, b + 1).filter((v) => v < 0).length,
  };
});

const flowTotals = { in: flows.inflow.reduce((s, v) => s + v, 0), out: flows.out.reduce((s, v) => s + v, 0) };

const flowReadout = {
  figures: [
    { of: "in", k: "Money in across the period" },
    { of: "out", k: "Money out across the period" },
    { of: "net", k: "Net, start to finish", tone: "net" },
  ],
  inK: "Money in",
  outK: "Money out",
  netK: "Net for the week",
  posK: "Loan repayments inside it",
  negK: "Days below zero",
  restK: "Two columns, held against each other",
  restB:
    "Choose a week to read its figures in whole dollars. Money in rises above the line and money out falls below it; the black mark is the week's net, which is exactly that week's change in the balance curve above — nothing here is estimated separately from it.",
  saidK: "Why both columns, and why weekly",
  saidB: [
    "Everything earlier on this page reads one side of the statement. Deposits, the balance they produce, the repayments drawing on it — none of that shows what the business spends, and cash flow is only ever the two columns against each other.",
    "Weekly is the grain where it shows. Across the whole period the totals nearly balance; inside it, three weeks had spending run at between two and a half and nearly five times income. The first two are back to back at the turn of May into June, and they drain the account into the overdrawn week the calendar and the curve already show. The third, in mid-July, does the same on a smaller scale and leads into the last two negative days.",
  ],
};

const flowAside = {
  title: "What the engine does with outflows",
  items: [
    { k: "Reads both columns", v: "Always" },
    { k: "Reconciles to the balance", v: "To the dollar" },
    { k: "Separates loan repayments", v: "Yes" },
    { k: "Judges what the spending was for", v: "Never" },
  ],
  note: "A week where more went out than came in is reported as that week. Whether it was a stock purchase, a late customer or something worse is not in the statement, and Cevrynt does not supply a reason the document cannot support.",
};

const flowClose =
  "Across three months the account took in $253,800 and paid out a little more than that. Both totals are true and neither is the story — the story is three weeks where spending ran at several times income, and you can only find them by holding the columns against each other one week at a time.";

const flowNote =
  "Illustrative weekly flows derived from the same daily balance as section 04, so every net reconciles exactly with the curve. Cevrynt structures bank activity and issues no affordability figure, score or decision.";

const statementList = periodMonths.map((m, i) => {
  const a = monthStarts[i];
  const b = a + m.days - 1;
  return {
    k: `${m.full} statement`,
    account: "Account ··2208",
    pages: [6, 7, 6][i],
    days: m.days,
    open: a === 0 ? OPENING_BALANCE : flows.bal[a - 1],
    in: sumRange(flows.inflow, a, b),
    out: sumRange(flows.out, a, b),
    close: flows.bal[b],
    say: [
      "Opens on the closing balance of April, which sits just outside this window — the opening figure is printed on this statement, and the arithmetic below it closes to the dollar.",
      "Opens exactly where May closed, and closes to the dollar despite containing the worst week in the period. A statement reconciling says nothing about whether the month was good; it says the record is whole.",
      "Opens exactly where June closed. The heaviest month for spending, and the arithmetic still closes — which is precisely the point: continuity is checked before any of the analysis above it is allowed to count.",
    ][i],
  };
});

const statementGhost = {
  k: "Account ··4471",
  meta: "Referenced 6 times · $18,000 in transfers · section 01",
  status: "Not in the file · noted, not raised",
  say: "The six owner transfers in section 01 all came from this account, and its statements were not submitted. The transfers are already classified from their own descriptors, so nothing in this analysis depends on it — it is noted rather than raised. But a reader should know the file points past itself, because the other account may show exactly where that $18,000 came from.",
};

const statementReadout = {
  figures: [
    { of: "statements", k: "Statements in the analysis window" },
    { of: "joins", k: "Seams that join to the dollar" },
    { of: "ghosts", k: "Account referenced, not submitted", tone: "ghost" },
  ],
  coverK: "Period covered · May 1 to July 31",
  ofK: "of",
  daysK: "days · no gaps",
  pagesK: "pages",
  openK: "Opening balance",
  inK: "Money in",
  outK: "Money out",
  closeK: "Closing balance",
  closesK: "Reconciles",
  offK: "Does not reconcile",
  joinsK: "Close = next open",
  carryK: "Opens on the previous close",
  breaksK: "Seam does not join",
  restK: "Checked before anything else counts",
  restB:
    "Choose a statement to read what its reconciliation says. Each one closes because opening plus money in minus money out equals the closing figure, computed here rather than asserted — and each seam joins because one statement's close is exactly the next one's open.",
  saidK: "Why continuity comes first and gets shown last",
  saidB: [
    "Six statement files arrived — February to July, with March never supplied and July exported twice, as the Document Intelligence page shows. Everything on this page reads the most recent three months, May to July, and assumes those three are one unbroken record of one account. That is the first thing an analyst checks by hand, usually with a calculator and the first and last page of each statement, and it is the last thing a summary ever puts in front of anybody.",
    "So it is shown in full: the calendar they cover, each statement's arithmetic written out, and the two seams where a close has to become an open. When all of that holds, nothing is reported. When it does not, that becomes the first finding on the file rather than a footnote under the last one.",
  ],
};

const statementAside = {
  title: "What the continuity check covers",
  items: [
    { k: "Each statement's arithmetic", v: "Reconciled" },
    { k: "Close into the next open", v: "Checked" },
    { k: "Days missing from the period", v: "Counted" },
    { k: "Accounts referenced, not submitted", v: "Listed" },
  ],
  note: "A statement that fails to reconcile, or a seam that does not join, is reported as exactly that and routed to a person. What it means — a missing page, a different account, an altered document — is a question the Fraud Signals side is built to put in front of a reviewer, not one this page answers.",
};

const statementClose =
  "Three statements, ninety-two days, two seams that join to the dollar — and one account the file keeps pointing at without ever including. None of that is exciting, which is exactly why it has to be checked before anything more interesting on this page is allowed to count.";

const statementNote =
  "Illustrative statements on the illustrative file used throughout this site. February and April were also supplied and sit outside this window; the two July exports are compared line by line on the Fraud Signals page. Account numbers are shortened and page counts are worked-example detail. Cevrynt checks continuity and structure; it issues no approval, decline or verdict on the documents.";

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

      {/* 03 — the positions already on the statements */}
      <section className="bk-positions band-light" aria-labelledby="positions-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Existing positions</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="positions-heading"
              text="One advance you can see renewed, and one you can only see paying."
            />
          </div>
          <p className="eg-lede t-lede">
            Each position drawn as a rail across the period, one tick per debit on the date it cleared. The
            rhythm is the evidence — and one of these rails has no funding credit anywhere on it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PositionRails
              positions={positionList}
              months={periodMonths}
              days={PERIOD_DAYS}
              holidays={positionHolidays}
              readout={positionReadout}
              aside={positionAside}
              close={positionClose}
              note={positionNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — the average laid over the days it averages */}
      <section className="bk-balance band-deep" aria-labelledby="balance-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">What an average hides</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="balance-heading"
              text="The average is true, and the account still spent nine days overdrawn."
            />
          </div>
          <p className="eg-lede t-lede">
            The daily closing balance as a curve, with the average laid flat across it. The distance between
            that line and the dip in June needs no annotation.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <BalanceCurve
              series={balanceSeries}
              months={periodMonths}
              average={31.2}
              readout={balanceReadout}
              aside={balanceAside}
              close={balanceClose}
              note={balanceNote}
            />
          </div>
        </div>
      </section>

      {/* 05 — money in against money out, a week at a time */}
      <section className="bk-flows band-light" aria-labelledby="flows-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">Cash-flow movement</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="flows-heading"
              text="The totals nearly balance. Three weeks inside them do not."
            />
          </div>
          <p className="eg-lede t-lede">
            Every section so far reads one side of the statement. Here is the other column: each week split at
            the axis, money in above and money out below, with the net ruled across it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <FlowWeeks
              weeks={flowWeeks}
              scaleMax={36000}
              totals={flowTotals}
              readout={flowReadout}
              aside={flowAside}
              close={flowClose}
              note={flowNote}
            />
          </div>
        </div>
      </section>

      {/* 06 — whether the three statements are one unbroken record */}
      <section className="bk-seams band-deep" aria-labelledby="seams-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">06</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Structure and continuity</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="seams-heading"
              text="Three statements, whether they join up, and what they point at."
            />
          </div>
          <p className="eg-lede t-lede">
            Everything above assumes one unbroken record of one account. Each statement&rsquo;s arithmetic, each
            seam between them, and the account the file keeps referring to without including.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <StatementSeams
              statements={statementList}
              ghost={statementGhost}
              readout={statementReadout}
              aside={statementAside}
              close={statementClose}
              note={statementNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="07"
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
