import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { ExportDiff } from "@/components/signals/export-diff";
import { ReadingsBracket } from "@/components/signals/readings-bracket";
import { RunningCheck } from "@/components/signals/running-check";
import { CheckRegister } from "@/components/signals/check-register";
import { ClaimHinge } from "@/components/signals/claim-hinge";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";
import { flows, DAILY_DEBIT, WEEKLY_DEBIT, dailyDebits, weeklyDebits } from "@/content/cedar-stone-statements";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

const page = pageByPath.get("product/fraud-signals");

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
   Five sections, same architecture as the other product pages, over the
   band-light / band-deep sequence. 03 checks the statement against itself;
   04 itemises all five fraud-stage checks this file received and carries the
   one product view that fits this page, captioned as not this file; 05 holds
   the application's own figures against the statements, adding no finding.

   A fraud page is where a site is most tempted to overclaim — a detection rate,
   a risk score, a red badge that says "fraud". Both sections are built so that
   none of that can be read into them.

   01 resolves the most ordinary irregularity in this submission: July arrived
   twice. The two exports are compared line by line, and the comparison is
   computed from both, not asserted.
   02 takes the one open fraud-stage finding on this file and shows why it is a
   signal rather than a verdict: four quite different things leave exactly the
   same trace, and nothing that would tell them apart is in the file.

   Consistency with the rest of the site:

   - The July lines are built from the same daily flows as Bank Statement
     Analysis, so the page opens on that statement's $45,240 opening balance
     and each day's running balance ends on the published close.
   - The duplicate July export is the one Document Intelligence flagged.
   - The weekly debit is the same $610 every Tuesday, and this is the single
     open fraud-stage finding the Underwriting Report page counts.

   No detection rate, no accuracy figure, no score, and no decision.
   -------------------------------------------------------------------------- */

/* 01 — the same month, exported twice -------------------------------------- */

/* July 1–3 in cents. Credits and debits per day sum to exactly that day's
   inflow and outflow from the shared flows, so the running balance closes each
   day on the published figure. A few cents are moved between two lines of the
   same day so amounts read like a statement rather than like round numbers;
   the day's net is unchanged by that. */
function buildJulyExcerpt() {
  const JUN_30 = 60;
  const days = [
    {
      i: 61,
      d: "07/01",
      credits: (inflow) => [{ desc: "MERCH BANKCD DEP  CEDAR STONE LLC", c: inflow + 37 }],
      debits: (out) => [
        { desc: "ACH DEBIT  RAPID ADVANCE FUNDING", c: DAILY_DEBIT * 100 },
        { desc: "ACH DEBIT  BUSINESS CARD PMT", c: out - DAILY_DEBIT * 100 + 37 },
      ],
    },
    {
      i: 62,
      d: "07/02",
      credits: (inflow) => [
        { desc: "REFUND  ATLAS SUPPLY CO  CR MEMO", c: 245000 },
        { desc: "MERCH BANKCD DEP  CEDAR STONE LLC", c: inflow - 245000 + 64 },
      ],
      debits: (out) => [
        { desc: "ACH DEBIT  RAPID ADVANCE FUNDING", c: DAILY_DEBIT * 100 },
        { desc: "ACH DEBIT  ORIG CO ID 91-7730  PPD", c: WEEKLY_DEBIT * 100 },
        { desc: "ACH DEBIT  ATLAS SUPPLY CO", c: out - (DAILY_DEBIT + WEEKLY_DEBIT) * 100 + 64 },
      ],
    },
    {
      i: 63,
      d: "07/03",
      credits: (inflow) => [
        { desc: "ACH CREDIT  NORTHPOINT FURNISH  INV 2317", c: 174000 },
        { desc: "MERCH BANKCD DEP  CEDAR STONE LLC", c: inflow - 174000 + 18 },
      ],
      debits: (out) => [
        { desc: "ACH DEBIT  RAPID ADVANCE FUNDING", c: DAILY_DEBIT * 100 },
        { desc: "PAYROLL  CEDAR STONE LLC  PPD", c: out - DAILY_DEBIT * 100 + 18 },
      ],
    },
  ];

  let bal = flows.bal[JUN_30] * 100;
  const lines = [{ n: "—", d: "06/30", desc: "BEGINNING BALANCE", amt: null, bal }];
  let n = 0;

  days.forEach((day) => {
    /* Guard the construction against the shared data rather than trusting it. */
    if (!dailyDebits.includes(day.i)) throw new Error(`Expected a daily debit on day ${day.i}`);
    if (day.i === 62 && !weeklyDebits.includes(day.i)) throw new Error("Expected the weekly debit on July 2");

    const inflow = flows.inflow[day.i] * 100;
    const out = flows.out[day.i] * 100;
    const dayLines = [...day.credits(inflow), ...day.debits(out)];
    if (dayLines.some((l) => l.c <= 0)) throw new Error(`July excerpt has a non-positive line on day ${day.i}`);

    [...day.credits(inflow).map((l) => ({ ...l, c: l.c })), ...day.debits(out).map((l) => ({ ...l, c: -l.c }))].forEach((l) => {
      n += 1;
      bal += l.c;
      lines.push({ n: String(n), d: day.d, desc: l.desc, amt: l.c, bal });
    });

    if (bal !== flows.bal[day.i] * 100) throw new Error(`July excerpt does not close on day ${day.i}`);
  });

  return lines;
}

const julyLines = buildJulyExcerpt();

const diffExports = [
  { k: "Export one", file: "Statement_July.pdf" },
  { k: "Export two", file: "July statement (1).pdf" },
];

const diffMeta = [
  { k: "File name", a: "Statement_July.pdf", b: "July statement (1).pdf" },
  { k: "Exported", a: "Aug 2 · 09:14", b: "Aug 6 · 16:40" },
  { k: "Pages", a: "6", b: "6" },
  { k: "Transaction lines", a: "138", b: "138" },
  { k: "Closing balance · Jul 31", a: `$${(flows.bal[91]).toLocaleString("en-US")}.00`, b: `$${(flows.bal[91]).toLocaleString("en-US")}.00` },
];

const diffTotals = {
  lines: 138,
  pageK: "July · page 1 · lines 1–12 of 138",
  restK: "Pages 1–6 compared · 138 of 138 lines identical",
};

const diffReadout = {
  figures: [
    { of: "exports", k: "Exports of the same month" },
    { of: "lines", k: "Lines compared, field by field" },
    { of: "differ", k: "Lines that differ", tone: "none" },
  ],
  sameK: "Identical",
  diffK: "Differs",
  metaDiffK: "file properties differ, neither of them content",
  lineK: "Line",
  fieldK: { d: "Date", desc: "Description", amt: "Amount", bal: "Running balance" },
  restK: "Two files for one month",
  restB:
    "Choose a line to see its fields held against each other. Every date, description, amount and running balance is compared across both exports — the gutter is the result of that comparison, not a decoration. The only differences sit in the file properties above: a name and an export time.",
  saidK: "Why compare what looks like a copy",
  saidB: [
    "Two exports of one month are only interchangeable if they are the same, and that is exactly what cannot be assumed. A statement exported twice is ordinary — somebody downloaded it again, or a broker forwarded an older copy. A statement exported twice with one line changed between the two is the oldest trick in a document package.",
    "So neither is quietly dropped. Both stay in the file, as Document Intelligence recorded, and they are compared line by line before either is allowed to feed anything else. These two are identical in every line, which closes the finding — and the closure is recorded with the same detail it would have been raised with.",
  ],
};

const diffAside = {
  title: "What the comparison covers",
  items: [
    { k: "Every date, amount and balance", v: "Compared" },
    { k: "Both copies", v: "Kept" },
    { k: "One dropped without comparing", v: "Never" },
    { k: "An identical pair", v: "Closed, recorded" },
  ],
  note: "A difference between two exports would be raised for a reviewer with both lines side by side, not labelled as tampering. There are ordinary reasons for a statement to change between exports — a pending item that posted — and deciding which applies is a person's call.",
};

const diffClose =
  "Two files, one month, one hundred and thirty-eight lines each, and not a single field different between them. That is the least dramatic result a fraud check can produce, and it is still written down in full — because a check that only leaves a trace when it finds something cannot show anybody that it ran.";

const diffNote =
  "Illustrative exports of the illustrative July statement used throughout this site; the lines match the flows and balances published on the Bank Statement Analysis page. Cevrynt compares documents and raises differences; it issues no fraud determination.";

/* 02 — a signal is not a verdict ------------------------------------------- */

const readingsObservation = {
  kicker: "The observation",
  k: "$610 every Tuesday for nine weeks, and no funding credit anywhere on these statements.",
  line: "ACH DEBIT · ORIG CO ID 91-7730 · PPD",
};

/* What the statements actually show. Every reading is held against each. */
const readingsFeatures = [
  { key: "amount", k: "The same amount every week" },
  { key: "weekday", k: "The same weekday every week" },
  { key: "originator", k: "An originator ID with no name behind it" },
  { key: "credit", k: "No funding credit in May, June or July" },
];

const readingsList = [
  {
    k: "An advance funded before May",
    fits: { amount: true, weekday: true, originator: true, credit: true },
    decider: "The agreement, and the date it was funded",
    say: "The most ordinary reading. An advance taken in March or April would be repaying exactly like this through May, June and July, and its funding credit would sit on a statement that is outside the window. The statements are consistent with it and cannot confirm it.",
  },
  {
    k: "An advance funded into account ··4471",
    fits: { amount: true, weekday: true, originator: true, credit: true },
    decider: "The ··4471 statements, which were never submitted",
    say: "The owner's other account already appears in these statements as the source of six transfers. An advance funded there and repaid from here would leave exactly this trace. The one document that would show it is the one the file keeps pointing at without including.",
  },
  {
    k: "An equipment lease or term loan",
    fits: { amount: true, weekday: true, originator: true, credit: true },
    decider: "The name behind originator ID 91-7730",
    say: "Leases and loans debit weekly too, and many never deposit anything into the operating account at all. Nothing on the statement distinguishes a lease payment from an advance repayment when the originator is only an ID.",
  },
  {
    k: "An obligation the application did not disclose",
    fits: { amount: true, weekday: true, originator: true, credit: true },
    decider: "The agreement, held against what the application disclosed",
    say: "The reading a lender most needs to rule in or out — and the statements are exactly as consistent with it as with the other three. That is the whole reason this is a signal. Calling it this reading on the strength of the debits alone would be accusing a borrower of something the evidence does not show.",
  },
];

const readingsReadout = {
  figures: [
    { of: "observations", k: "Open fraud-stage finding on this file" },
    { of: "readings", k: "Readings that fit it" },
    { of: "ruledOut", k: "The statements can rule out", tone: "none" },
  ],
  edgeK: "Edge of the file",
  fitsK: "Consistent with the statements",
  outK: "Ruled out by the statements",
  decK: "Would tell it apart",
  consistentK: "Consistent",
  contradictsK: "Contradicts",
  restK: "Four readings, one trace",
  restB:
    "Choose a reading to see it held against every feature the statements show. Each one passes every test, which is precisely the problem: the statements cannot separate them. What would is drawn past the edge of the file, and none of it is here.",
  saidK: "Why the engine stops at the edge",
  saidB: [
    "A platform that wanted to look decisive would name this. The difficulty is that four very different things — two of them entirely routine — leave exactly the same trace on a bank statement, and a label chosen from that trace would be a guess wearing a verdict's clothes.",
    "So the signal goes to a person with the question already attached: here is the pattern, here is what fits it, and here is the one document that would separate them. That is a shorter phone call to the broker than a red badge would produce, and it does not accuse anybody of anything.",
  ],
};

const readingsAside = {
  title: "What a signal carries",
  items: [
    { k: "The pattern and its dates", v: "Attached" },
    { k: "What would tell readings apart", v: "Named" },
    { k: "A fraud label", v: "Never" },
    { k: "A risk score", v: "None" },
  ],
  note: "A signal is raised for a named reviewer and closed by one. The readings shown here illustrate what a reviewer weighs; Cevrynt reports the pattern and what would resolve it, and the lender retains final authority over what happens next.",
};

const readingsClose =
  "Nine Tuesdays, one amount, no funding credit. Four readings fit that exactly, and the statements cannot tell any of them apart — which is not a gap in the analysis. It is the analysis, stated honestly, with the one document that would settle it named on the way out.";

const readingsNote =
  "The open fraud-stage finding on the illustrative file used throughout this site, matching the weekly debit on the Bank Statement Analysis page and the finding counted on the Underwriting Report page. Cevrynt issues no fraud determination, score or decision.";

/* 03 — every line against the line above it -------------------------------- */

/* The illustration edits line 5 — the July 2 card deposit — by $1,000. Only
   the copy shown on the page is edited; the export it is compared against
   stays exactly as submitted. */
const runningEdit = { index: 5, delta: 100000 };

const runningModes = [
  {
    tag: "The file",
    k: "As submitted",
    banner: "The July statement exactly as submitted · every figure on this page is real to the illustrative file",
    restK: "Twelve lines, twelve agreements",
    restB:
      "Every printed running balance equals the one above it plus or minus that line's amount, and every line matches the other July export. Choose a line to see its printed and recomputed balance side by side, or switch to an illustration to see what an edit would do.",
  },
  {
    tag: "Illustration · a copy",
    k: "An amount changed",
    banner: "Illustration on an edited copy · line 5 raised by $1,000.00 and the printed balances left alone · not this file",
    restK: "The arithmetic breaks where the edit is",
    restB:
      "The July 2 deposit now reads $1,000 higher, and every printed balance below it no longer follows. The gap opens at line 5 and never closes, which points straight at the line that changed. Against the other July export, only line 5 differs.",
  },
  {
    tag: "Illustration · a copy",
    k: "Amount and balances changed",
    banner: "Illustration on an edited copy · line 5 raised by $1,000.00 and every balance below it rewritten to match · not this file",
    restK: "The arithmetic passes. The other export does not.",
    restB:
      "Edit the balances as carefully as the amount and the running check agrees on every line — there is nothing for it to find. The same edit now disagrees with the other July export on every line from 5 down, which is exactly the comparison section 01 makes. No single check is sufficient; they are layered so that passing one means failing another.",
  },
];

const runningReadout = {
  figures: [
    { of: "lines", k: "Lines recomputed" },
    { of: "breaks", k: "Where the arithmetic breaks", tone: "held" },
    { of: "differs", k: "Where the other export differs", tone: "held" },
  ],
  modesK: "Which copy of the statement to check",
  colK: {
    d: "Date",
    desc: "Description",
    amt: "Amount",
    printed: "Printed balance",
    recomputed: "Recomputed",
    delta: "Printed − recomputed",
    other: "Export two",
  },
  lineK: "Line",
  agreesK: "Agrees",
  offByK: "Off by",
  sameK: "Matches export two",
  diffK: "Differs from export two",
  saidK: "Why a statement can be checked against itself",
  saidB: [
    "A bank statement carries its own proof. Each running balance is the one above it plus or minus that line's amount, so recomputing the column turns every line into a check on every line before it. An amount that was changed without the balances following it cannot hide: the gap opens at that line and stays open all the way down.",
    "A careful edit rewrites the balances too, and then the arithmetic has nothing to say. That is not a flaw in the check; it is the reason checks are layered. The same careful edit is now a line-by-line disagreement with the other July export — and a change made consistently across every copy is not something arithmetic can find at all, which is exactly why these checks support a reviewer rather than replace one.",
  ],
};

const runningAside = {
  title: "What the recompute covers",
  items: [
    { k: "Every printed running balance", v: "Recomputed" },
    { k: "Where a gap first opens", v: "Pinned to the line" },
    { k: "An edit made consistently everywhere", v: "Not findable" },
    { k: "A gap called tampering", v: "Never" },
  ],
  note: "A break in the running balance is raised for a reviewer with the line where it opens, not labelled as fraud. There are ordinary causes — a statement page missing from the middle, a bank's own pending-item adjustment — and deciding which applies is a person's call.",
};

const runningClose =
  "The file as submitted agrees with itself on every line. The two illustrations show why that result is worth something: an edit that leaves the balances alone breaks exactly where it was made, and an edit careful enough to fix them walks straight into the other export.";

const runningNote =
  "The as-submitted view is the illustrative July statement used throughout this site. Both edited views are labelled illustrations on a copy and do not describe this file. Cevrynt recomputes and compares; it issues no fraud determination.";

/* 04 — the five checks this file received ----------------------------------- */

/* The five fraud-stage findings the Underwriting Report page counts for this
   file: four closed, one open. Northpoint Furnish is the largest named payer
   at $12.4K of $217.6K revenue-like deposits (Bank Statement section 01). */
const registerChecks = [
  {
    k: "Duplicate exports compared",
    shape: "copy",
    compared: "July · export one against export two",
    found: "138 of 138 lines identical. Only the file name and export time differ.",
    state: "closed",
    where: "Section 01",
    record:
      "Both exports kept in the file. Every date, description, amount and running balance compared. Closed as identical, with the two differing file properties recorded alongside it rather than left out.",
  },
  {
    k: "Running balances recomputed",
    shape: "steps",
    compared: "Every line · May, June and July",
    found: "Every printed balance equals the one above it plus or minus its amount.",
    state: "closed",
    where: "Section 03",
    record:
      "Each statement in the analysis window recomputed line by line from its opening balance. No gap opened on any line. Closed, with the statements and pages it covered named.",
  },
  {
    k: "Statements joined at their seams",
    shape: "seam",
    compared: "Close into next open · each statement's own totals",
    found: "Three statements reconcile to the dollar and both seams join.",
    state: "closed",
    where: "Bank Statement Analysis · 06",
    record:
      "Opening plus money in minus money out checked against each closing balance, and each close checked against the next open. Closed as continuous for May to July. March, outside the window, is noted as never supplied.",
  },
  {
    k: "A debit rhythm with no funding credit",
    shape: "rhythm",
    compared: "$610 · nine consecutive Tuesdays",
    found: "No funding credit anywhere on these statements. Four readings fit it; none can be ruled out.",
    state: "open",
    where: "With the broker · section 02",
    record:
      "Raised for a named reviewer with every debit dated, the originator ID, and the one document that would settle it: the agreement behind originator 91-7730. Not labelled, not scored, and still open.",
  },
  {
    k: "Payer concentration",
    shape: "share",
    compared: "Largest named payer · share of revenue-like deposits",
    found: "Northpoint Furnish, $12.4K of $217.6K — 5.7%. No single payer carries the account.",
    state: "closed",
    where: "Reported",
    record:
      "The share is reported with the payer named and the deposits behind it listed. Whether any share matters is the lender's policy, not ours; on this file there is nothing concentrated to raise.",
  },
];

const registerShot = {
  src: "/media/placeholder/Exception-aware.png",
  w: 760,
  h: 520,
  alt: "An illustrative Cevrynt exception view with synthetic data: a verification mismatch showing two conflicting business addresses side by side with their sources retained, and negative-day activity outside a lender's policy, beside a human judgment panel whose final state reads human review required.",
  caption: "Illustrative product view · synthetic data, not the Cedar & Stone file · where an open item waits for a person",
};

const registerReadout = {
  figures: [
    { of: "all", k: "Checks run on this file" },
    { of: "closed", k: "Came back clean, and recorded" },
    { of: "open", k: "Open, and with a person", tone: "open" },
  ],
  colK: { shape: "Compared", check: "Check", found: "What it found", state: "Where it went" },
  closedK: "Closed",
  openK: "Open",
  restK: "Clean is still a result",
  restB:
    "Choose a check to read the record it left. Four of the five came back clean, and each clean result is written down with the same detail an open finding gets — because a check that only leaves a trace when it finds something cannot show anybody that it ran.",
  saidK: "Why the clean ones are on the page",
  saidB: [
    "A fraud page that only shows what was caught quietly implies that everything else was never looked at. On this file, four checks found nothing, and those four are most of what a reviewer can rely on: the duplicate is identical, the arithmetic holds, the statements are continuous, and nobody is carrying the account alone.",
    "The fifth is open, and it is with a person. Not because the engine suspects anything in particular, but because the statements cannot tell four readings apart — and a platform that picked one would be making an accusation it cannot support.",
  ],
};

const registerAside = {
  title: "What every check leaves behind",
  items: [
    { k: "What was compared", v: "Named" },
    { k: "What it found, clean or not", v: "Recorded" },
    { k: "An open item's reviewer", v: "Named" },
    { k: "A fraud score for the file", v: "None" },
  ],
  note: "Open items wait for a person in a view like the one above — both sides of a conflict kept visible, and nothing converted into an approval, decline or score. The lender retains final authority over every file.",
};

const registerClose =
  "Five checks, four clean, one open. That is the whole fraud-stage account of this file — not a percentage, not a badge, but five records a reviewer can open, and one question that still needs somebody to pick up the phone.";

const registerNote =
  "The five fraud-stage checks on the illustrative file used throughout this site, matching the count on the Underwriting Report page. Cevrynt raises and records signals; it issues no fraud determination, score or decision.";

/* 05 — what the application says, against what the statements show -------- */

/* Numbers only. Names and addresses are held against the filing on the
   Business Verification page and are not repeated here. Every disagreement
   below is owned by a stage that already holds it, so this adds no finding:
   the one open row is the weekly debit from section 02. Figures are the
   published ones — $171,400 card settlements, $253,800 gross and $217,600
   revenue-like deposits across three months (Bank Statement Analysis 01). */
const claimRows = [
  {
    k: "Monthly card sales",
    said: "About $57,000",
    source: "Card settlements · May to July",
    shown: "$57,133 a month on average",
    state: "agree",
    where: "Bank Statement Analysis · 01",
    say: "Within a few hundred dollars of what the borrower stated, and drawn from seventy-eight processor settlements rather than from anybody's estimate. Nothing to raise, and the settlements behind the average stay attached to it.",
  },
  {
    k: "Operating account",
    said: "Account ending 2208",
    source: "Header of all three statements",
    shown: "Account ··2208, May, June and July",
    state: "agree",
    where: "Bank Statement Analysis · 06",
    say: "The account the application names is the account the statements come from, on every statement in the window. A mismatch here would be the first thing worth a phone call; there is not one.",
  },
  {
    k: "Monthly revenue",
    said: "$85,000",
    source: "Deposits · May to July",
    shown: "$84,600 gross · $72,533 revenue-like",
    state: "reported",
    where: "Lender's policy decides",
    say: "The stated figure agrees with gross deposits and is higher than revenue-like deposits, because gross includes transfers, a refund and another lender's advance. Which one counts as revenue is the lender's policy, not ours, so both are reported and neither is called wrong.",
  },
  {
    k: "Other accounts",
    said: "None listed",
    source: "Transfers in · May to July",
    shown: "Six transfers from the owner's account ··4471, $18,000",
    state: "noted",
    where: "Bank Statement Analysis · 06",
    say: "The application asks about business accounts and ··4471 is the owner's own, so this is not necessarily a contradiction. It is noted rather than raised, exactly as on the Bank Statement Analysis page — but a reader should know the statements point at an account the file does not include.",
  },
  {
    k: "Existing advances",
    said: "One, with Rapid Advance Funding",
    source: "Debits · May to July",
    shown: "Rapid Advance Funding at $1,550 a business day, and a $610 weekly debit that is not on the list",
    state: "open",
    where: "With the broker · section 02",
    say: "The disclosed advance is on the statements exactly as described. The weekly debit is not on the application's list, and it is the same open signal as section 02 — four readings fit it, and the statements cannot tell them apart. It is one finding shown in two places, not two findings.",
  },
];

const claimReadout = {
  figures: [
    { of: "all", k: "Figures the application states" },
    { of: "agree", k: "The statements agree with" },
    { of: "set", k: "Reported or noted, not raised" },
    { of: "open", k: "Open, and already counted", tone: "open" },
  ],
  colK: { claim: "Claim", said: "The application says", shown: "The statements show", owner: "Where it sits" },
  saidSrcK: "Signed application",
  stateK: { agree: "Agrees", reported: "Reported", noted: "Noted", open: "Open" },
  restK: "Names are elsewhere. These are the numbers.",
  restB:
    "Choose a claim to read how it was held against the statements. Each hinge is shut where the two agree, slightly apart where the difference is a question of definition, and open where the statements show something the application does not mention.",
  saidK: "Why the numbers get their own view",
  saidB: [
    "A borrower states figures about their own business — what it sells, what it banks, what it already owes — and the statements submitted with the application either bear those figures out or they do not. That comparison is the plainest meaning of what was submitted against what the evidence shows, and it is where a package most often stops holding together.",
    "On this file it mostly holds. Two figures agree, one differs only in how revenue is defined, one points at an account the file does not include, and one — the weekly debit — is the open signal from section 02 seen from the application's side. Nothing here is a new finding; it is the same file, read against the borrower's own words.",
  ],
};

const claimAside = {
  title: "What a claim is held against",
  items: [
    { k: "The borrower's own figure", v: "Quoted" },
    { k: "The documents behind the evidence", v: "Named" },
    { k: "A definitional difference", v: "Reported" },
    { k: "A borrower called dishonest", v: "Never" },
  ],
  note: "A stated figure that differs from the statements is surfaced with both sides quoted, not labelled as misrepresentation. Borrowers estimate, round and describe their business in their own terms; deciding whether a difference matters is the lender's call.",
};

const claimClose =
  "Five figures from the application, held against the statements sent with it. Two agree, two differ for reasons the page can name, and one is the question already on its way to the broker — which is what a package that mostly holds together looks like.";

const claimNote =
  "Illustrative application figures on the illustrative file used throughout this site. Names and addresses are compared on the Business Verification page. Cevrynt compares and reports; it issues no fraud determination, score or decision.";

export default function FraudSignalsPage() {
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

      {/* 01 — two exports of one month, compared rather than assumed */}
      <section className="sg-diff band-light" aria-labelledby="diff-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">Duplicate documents</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="diff-heading"
              text="July arrived twice. Nobody gets to assume the two are the same."
            />
          </div>
          <p className="eg-lede t-lede">
            Two exports of one statement, side by side, one row per line. Every date, description, amount and
            running balance is held against its counterpart before either copy is allowed to count.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ExportDiff
              exportsList={diffExports}
              meta={diffMeta}
              linesA={julyLines}
              linesB={julyLines.map((l) => ({ ...l }))}
              totals={diffTotals}
              readout={diffReadout}
              aside={diffAside}
              close={diffClose}
              note={diffNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — one trace, several readings, and what would separate them */}
      <section className="sg-readings band-deep" aria-labelledby="readings-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Signals, not verdicts</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="readings-heading"
              text="Four different things leave exactly this trace on a statement."
            />
          </div>
          <p className="eg-lede t-lede">
            The one open fraud-stage finding on this file, with every reading that fits it — and, past the edge
            of the file, the single thing that would tell each one apart.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ReadingsBracket
              observation={readingsObservation}
              features={readingsFeatures}
              readings={readingsList}
              readout={readingsReadout}
              aside={readingsAside}
              close={readingsClose}
              note={readingsNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — the statement checked against itself, one line at a time */}
      <section className="sg-running band-light" aria-labelledby="running-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Document signals</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="running-heading"
              text="Every line checked against the line above it."
            />
          </div>
          <p className="eg-lede t-lede">
            Each running balance is the one above it plus or minus that line&rsquo;s amount, so the statement
            can be checked against itself. The file as submitted, and two labelled illustrations of what an
            edit would look like.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <RunningCheck
              lines={julyLines}
              edit={runningEdit}
              modes={runningModes}
              readout={runningReadout}
              aside={runningAside}
              close={runningClose}
              note={runningNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — the five checks, four clean and one open */}
      <section className="sg-register band-deep" aria-labelledby="register-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Every check, recorded</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="register-heading"
              text="Five checks ran on this file. Four came back clean, and clean gets written down too."
            />
          </div>
          <p className="eg-lede t-lede">
            What each check compared, what it found, and where it went — including the four that found nothing,
            because those are most of what a reviewer can rely on.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <CheckRegister
              checks={registerChecks}
              shot={registerShot}
              readout={registerReadout}
              aside={registerAside}
              close={registerClose}
              note={registerNote}
            />
          </div>
        </div>
      </section>

      {/* 05 — the application's own figures, held against the statements */}
      <section className="sg-claims band-light" aria-labelledby="claims-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">Submitted against evidence</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="claims-heading"
              text="What the application says, held against what the statements show."
            />
          </div>
          <p className="eg-lede t-lede">
            The borrower&rsquo;s own figures — card sales, revenue, accounts, existing advances — each joined to
            the evidence submitted with them. Names and addresses are compared on Business Verification.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ClaimHinge
              claims={claimRows}
              readout={claimReadout}
              aside={claimAside}
              close={claimClose}
              note={claimNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="06"
          kicker="Founder-led"
          heading="Bring the package that looked fine until it did not."
          lede="The file where something was off and it took a week to say what — two statements that did not quite agree, a debit nobody could explain, a document that was clean on its own and wrong next to the others. Walk us through it, and we will show you where it would have surfaced and what it would have been attached to."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
