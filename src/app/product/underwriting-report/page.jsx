import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { OpenResidue } from "@/components/report/open-residue";
import { TrailDepth } from "@/components/report/trail-depth";
import { NotIssued } from "@/components/report/not-issued";
import { DecisionSeal } from "@/components/report/decision-seal";
import { WaitingLanes } from "@/components/report/waiting-lanes";
import { ReopenFork } from "@/components/report/reopen-fork";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

const page = pageByPath.get("product/underwriting-report");

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
   architecture as the other three product pages: figures on one baseline, a
   measured instrument, then a body split over the band-light / band-deep
   sequence.

   This page is the end of the workflow, so its risk is different from the
   others. Everything upstream argues that a particular kind of reading is
   possible; a report page is where a site normally starts claiming outcomes —
   a score, a recommendation, a decision. Both sections are built to make that
   claim impossible to read into them.

   01 refuses to be a summary. It counts what the file produced and shows that
   the report is the remainder, not the restatement.
   02 refuses to assert source-linking and draws the descent instead, including
   the one trail whose floor is a person rather than a document.

   Four constraints held throughout:

   1. The file is the illustrative Cedar & Stone file used across this site,
      and the observations reused here match the figures already published on
      the Policy Engine and Alternative Lenders pages.
   2. No score, no rating, no recommendation and no disposition. The report
      carries findings and the judgment they still need.
   3. Cevrynt is not a lender. A decision is the lender's, entered by a named
      person, and nothing here claims one was produced by the platform.
   4. Nothing is deleted. Settled findings stay in the file underneath the
      report and any reviewer can reopen one.
   -------------------------------------------------------------------------- */

/* 01 — what the file could not settle -------------------------------------- */

const residueReadout = {
  figures: [
    { of: "all", k: "Findings off this file" },
    { of: "closed", k: "Closed behind the report" },
    { of: "open", k: "Carried into it", tone: "open" },
  ],
  openK: "open",
  restK: "The report is the remainder",
  restB:
    "Choose a stage to read what it left open. Every mark is one finding; the ones lying flat are closed and stay in the file underneath, and the ones standing up are what a person still has to weigh.",
};

const residueStages = [
  {
    k: "Documents",
    n: 14,
    open: 0,
    say: "Fourteen findings and nothing left open. Every page was classified, every field read, and the readings agree with the documents they came from — which is what a document stage looks like when it has finished, and why none of it reaches the report.",
    b: "",
  },
  {
    k: "Financials",
    n: 11,
    open: 1,
    say: "One open finding: a month whose deposits break the pattern of the other four on file. The arithmetic is settled and the explanation is not, and the difference between those two things is the entire reason a report exists.",
    b: "A month that does not look like the others. The deposits are counted, the gap is measured, and what it means is not something a statement can answer.",
  },
  {
    k: "Verification",
    n: 9,
    open: 2,
    say: "Two open: an address that differs between the filing and the application, and an owner on the filing who is not named on the application. Both are conflicts between sources rather than errors, so neither can be resolved by reading harder.",
    b: "Two conflicts between sources. Cevrynt shows what each record says and which record it came from, and does not pick a winner between two documents that disagree.",
  },
  {
    k: "Fraud and risk signals",
    n: 5,
    open: 1,
    say: "One open: a recurring debit pattern consistent with a second position. A signal is not a finding of fraud and is never scored as one — it is surfaced, attributed to what produced it, and left for a person.",
    b: "A pattern worth somebody looking at the same day. Detectable in the statements; what it means depends on terms that are not in the file.",
  },
  {
    k: "Policy",
    n: 8,
    open: 2,
    say: "Two open: the exception the lender's own band left unresolved, and the criterion held pending the guarantor documents a conditional rule armed. Both are the policy engine working as intended rather than failing.",
    b: "The two criteria the lender's own policy declined to settle. They arrive at the report as questions, with both lines they sit between still shown.",
  },
  {
    k: "Reviewer notes",
    n: 3,
    open: 1,
    say: "One open: a note a reviewer entered that has no answer yet. It is carried into the report in their words, under their name, and nothing about it has been summarised or shortened on the way.",
    b: "A question one reviewer left for the next. Carried forward verbatim, because a note that gets rewritten on the way to the report is not really a record of anything.",
  },
];

const residueAside = {
  title: "What closed means here",
  items: [
    { k: "A decision was taken", v: "No" },
    { k: "The readings agree", v: "Yes" },
    { k: "It stays in the file", v: "Always" },
    { k: "Reopened by a reviewer", v: "Any time" },
  ],
  note: "Closed means nothing about that finding is outstanding — not that Cevrynt concluded anything. Nothing is deleted or hidden: every closed finding stays in the file underneath the report, with its source attached, and any reviewer can reopen one.",
};

const residueClose =
  "A report that restates everything makes the reader do the sorting a second time. The work is not in the forty-three — it is in putting the seven at the top, and keeping the other forty-three one click underneath them for the moment somebody wants to check.";

const residueNote =
  "Counts from the illustrative file used throughout this site. They describe one worked example and are not a performance figure, an average, or a claim about what any real file produces.";

/* 02 — the descent under each line ----------------------------------------- */

const trailReadout = {
  figures: [
    { of: "all", k: "Lines opened here" },
    { of: "doc", k: "Reaching a document" },
    { of: "person", k: "Whose floor is a person", tone: "held" },
  ],
  restK: "Four lines, opened all the way down",
  restB:
    "Choose a line to read what its descent is for. Each step is one layer closer to the thing the sentence rests on, and the last item stops a step early because there is no document underneath a person saying something.",
  saidK: "Why the depth is drawn rather than asserted",
  saidB: [
    "Every underwriting product claims its findings are source-linked, which makes the claim worth roughly nothing on its own. What can be checked is the shape: how many layers there are, whether each one names the stage that produced it, and whether the bottom is an actual page and line or a confident-sounding sentence with nothing under it.",
    "So the figure descends in public. Three of these four reach a document, and one does not — and the one that does not says so in its own row rather than being quietly drawn to the same depth as the others.",
  ],
};

const trailItems = [
  {
    k: "Two addresses on the same business",
    floor: "doc",
    floorK: "Ends at a document",
    layers: [
      { k: "Report line", v: "An address conflict is unresolved and carried into the report." },
      {
        k: "Finding · Verification",
        v: "The address on the state filing and the address on the application are not the same address.",
      },
      {
        k: "Reading",
        v: "Both addresses read and held separately, each attached to the record it was taken from, with neither treated as the correct one.",
      },
      { k: "Source", v: "Application, page 1, line 4 · State filing record, registered agent section." },
    ],
    say: "Four layers, and the useful one is the third. Cevrynt holds both addresses rather than merging them, because the moment two sources are collapsed into one value the conflict stops being visible and the report starts asserting something nobody checked.",
  },
  {
    k: "Six returned items in ninety days",
    floor: "doc",
    floorK: "Ends at a document",
    layers: [
      {
        k: "Report line",
        v: "A policy stop, overridden by the credit lead, with both the stop and the override on the record.",
      },
      {
        k: "Finding · Policy",
        v: "Six returned items against the lender's own five-event ceiling over the last ninety days.",
      },
      { k: "Reading", v: "Six return entries counted across three statement periods, each one located individually." },
      { k: "Source", v: "Bank statement, June, page 3, lines 11–14 · July, page 2, line 6." },
    ],
    say: "The override sits at the top and the six entries sit at the bottom, and the trail runs the whole way between them. Somebody who disagrees with the override can go and read the four lines in June for themselves rather than taking the count on trust.",
  },
  {
    k: "A second position appearing mid-statement",
    floor: "doc",
    floorK: "Ends at a document",
    layers: [
      { k: "Report line", v: "Surfaced for the reviewer. Not scored, and not called fraud." },
      {
        k: "Finding · Fraud and risk signals",
        v: "A recurring debit pattern consistent with a second position taken during the statement period.",
      },
      {
        k: "Reading",
        v: "Debits of the same amount, on the same weekday, across nine consecutive weeks, with the first occurrence dated.",
      },
      { k: "Source", v: "Bank statements, May to July, pages 2–7." },
    ],
    say: "The word doing the work in the second layer is consistent with. The engine describes a pattern it can see and stops there; what the pattern is depends on terms that are not in the file, and no amount of reading the statements harder will produce them.",
  },
  {
    k: "The owner's explanation for February",
    floor: "person",
    floorK: "Ends at a person · no layer below",
    layers: [
      { k: "Report line", v: "Carried into the report exactly as it was entered." },
      {
        k: "Finding · Reviewer note",
        v: "Entered by the senior underwriter on day two, after a call with the owner, in their own words.",
      },
      {
        k: "Floor",
        v: "There is nothing underneath this. The source is a person, and the report says so rather than inventing a document to sit under it.",
      },
    ],
    say: "This is the trail worth checking a product on. It would have been easy to draw a fourth step here and let the shape match the other three — and that fourth step would have been a fabrication, in the one section of the site that exists to argue nothing here is fabricated.",
  },
];

const trailAside = {
  title: "What a trail keeps",
  items: [
    { k: "The document and page", v: "Named" },
    { k: "The stage that produced it", v: "Named" },
    { k: "A line with no source", v: "Never" },
    { k: "A floor that is a person", v: "Said so" },
  ],
  note: "A report line with nothing under it does not get written. Where the deepest layer is a reviewer rather than a record, that is what the trail shows — attributed, dated, and in the reviewer's own words rather than paraphrased into something that sounds like a finding.",
};

const trailClose =
  "The test of an underwriting report is not whether it sounds confident. It is whether somebody who was not there can get from any sentence in it down to the page that sentence rests on — and be told plainly, in the same voice, when the floor is a person rather than a document.";

const trailNote =
  "Illustrative trails on the illustrative file used throughout this site. Page and line references describe that worked example. Cevrynt issues no score, no recommendation and no decision at this stage or any other.";

/* 03 — the numbers it does not contain ------------------------------------- */

const notIssuedReadout = {
  figures: [
    { of: "all", k: "Things it does not issue" },
    { of: "invented", k: "Numbers of our own", tone: "none" },
    { of: "stated", k: "Said plainly on the page" },
  ],
  notIssuedK: "Not issued",
  insteadK: "Instead",
  restK: "The section a report page usually skips",
  restB:
    "Choose a row to read why it is ruled out. Each one names the value a reader arrives expecting, shows the slot it would sit in, and rules that slot through — and the middle figure above is the one that matters, because there is no number in this product that Cevrynt invented.",
  saidK: "Why this is a section rather than a footnote",
  saidB: [
    "A report is where an underwriting platform starts emitting a score, because by that point in the workflow it has read everything and the temptation to summarise it as one number is enormous. The number always looks like the most valuable thing on the page and is always the least defensible, because it is the only figure nobody can trace to a document.",
    "Ruling these out is not modesty about what the platform can do. It is the condition that makes everything else on this site checkable: if the report contained one invented number, a reader would be right to wonder which of the others were invented too.",
  ],
};

const notIssuedColumns = {
  k: "What a reader expects",
  slot: "Where it would sit",
  instead: "What the report carries",
};

const notIssuedRows = [
  {
    k: "A score or rating",
    slot: "0 — 100",
    instead: "Each criterion stated against the lender's own line, with both lines it sits between.",
    why: "A score is a compression, and the thing it compresses away is always the reason. Two files with the same number got there completely differently, and that difference is the entire job of an underwriter.",
  },
  {
    k: "A recommendation",
    slot: "APPROVE / DECLINE",
    instead: "The seven open findings, and what each one is waiting on.",
    why: "Cevrynt is not a lender. A recommendation is a decision with a disclaimer attached to it, and the disclaimer is the part nobody reads at four o'clock on a Friday.",
  },
  {
    k: "An approval or a decline",
    slot: "YES / NO",
    instead: "A record of the decision a named person entered, and when they entered it.",
    why: "The authority to fund sits with the lender and stays there. What the platform contributes is the account of how the question was arrived at, not an answer to it.",
  },
  {
    k: "A price, rate or factor",
    slot: "1.00 — 1.00",
    instead: "Nothing at all.",
    why: "Pricing is the lender's, and the report has no opinion about it. A report that priced a deal would be underwriting it, and this one does not underwrite anything.",
  },
  {
    k: "A probability or a likelihood",
    slot: "0.00",
    instead: "Counts and dates, with the source under each one.",
    why: "A likelihood implies a population this file was compared against. There isn't one. Printing a decimal that looks like there is would be the quietest dishonesty available to us, which is exactly why it is on this list.",
  },
  {
    k: "A ranking against other files",
    slot: "#— of —",
    instead: "This file, against this lender's policy, and nothing else.",
    why: "A borrower is measured against the rules their lender wrote, not against a queue of other people's deals. Nothing in the report is relative to somebody else's file.",
  },
];

const notIssuedAside = {
  title: "What that leaves the report doing",
  items: [
    { k: "Producing a number", v: "Never" },
    { k: "Carrying what is open", v: "Always" },
    { k: "Naming what each is waiting on", v: "Always" },
    { k: "Deciding any of it", v: "Never" },
  ],
  note: "None of this makes the report shorter. It makes it a different kind of document: an account of what the file showed and what remains unresolved, rather than a verdict with the working folded up inside it.",
};

const notIssuedClose =
  "The number would have been the easiest thing on this page to build and the first thing anybody asked for. It is not here because the moment a report contains one figure nobody can trace to a document, every other figure in it becomes a matter of trust rather than a matter of record.";

const notIssuedNote =
  "This describes what the underwriting report itself contains. Cevrynt is not a lender, issues no approval, decline, price or score, and lenders retain final authority over every funding decision.";

/* 04 — the decision, and what sits outside it ------------------------------ */

const sealReadout = {
  figures: [
    { of: "before", k: "Events before the decision" },
    { of: "decision", k: "Decision, entered by a person" },
    { of: "after", k: "After it, and outside it", tone: "after" },
  ],
  restK: "One chronology, cut once",
  restB:
    "Choose an entry to read what it did or did not change. Everything above the seal formed the decided report. Everything below it happened afterwards, sits on the file, and is deliberately not folded back into what was decided.",
  saidK: "Why the cut is the product",
  saidB: [
    "A file keeps moving after it has been worked. A statement arrives late, the credit committee edits a threshold, somebody pulls the deal for a portfolio review a month on. Without a seal, the report quietly answers a different question every time it is opened — and the one question it stops being able to answer is the only one that ever gets asked in a dispute.",
    "So the report answers what was decided, not what would be decided now. Everything after the seal is kept, dated and visible; none of it is allowed to reach back into a decision that was taken before it existed.",
  ],
};

const sealBefore = [
  {
    t: "D1 · 09:14",
    stage: "Documents",
    k: "File received. Fifteen documents, sorted and classified.",
    say: "The start of the chronology, and the only entry here that is purely mechanical. Nothing has been read yet — the documents have only been told apart.",
  },
  {
    t: "D1 · 11:02",
    stage: "Financials",
    k: "Three statement periods structured; deposits, balance and returns read.",
    say: "Where the figures used everywhere else on this site enter the file. Each one is attached to the page it came from at this point and never detaches from it.",
  },
  {
    t: "D2 · 14:30",
    stage: "Verification",
    k: "Address conflict raised. Both records held, neither treated as correct.",
    say: "A conflict between two sources, raised rather than resolved. It is still open when the decision is taken, and the report says so instead of quietly picking one.",
  },
  {
    t: "D2 · 16:05",
    stage: "Reviewer note",
    k: "Note entered after a call with the owner, in the reviewer's own words.",
    say: "The one entry with no document under it. It is on the record because a person put it there, attributed and dated, and it is never paraphrased into something that reads like a finding.",
  },
  {
    t: "D3 · 10:41",
    stage: "Policy",
    k: "Run against policy v3.3. Two exceptions raised, one stop reported.",
    say: "The version matters more than the outcome. v3.3 is what evaluated this file, and v3.3 is what stays attached to it for as long as the record exists.",
  },
  {
    t: "D3 · 11:58",
    stage: "Reviewer override",
    k: "Credit lead proceeds past the returned-items stop, reason entered.",
    say: "The override is appended beside the stop rather than over it. Both are above the seal, because both formed the decision that follows.",
  },
];

const sealSeal = {
  t: "D3 · 14:22 — the report is sealed",
  k: "A decision is entered by a named person.",
  fields: [
    { k: "Entered by", v: "Senior underwriter" },
    { k: "Policy in force", v: "v3.3" },
    { k: "Open findings at the time", v: "Seven" },
    { k: "Produced by Cevrynt", v: "None of it" },
  ],
  b: "Cevrynt records that a decision was entered, by whom, at what time, and against which version of the policy. What the decision was belongs to the lender — it is their call, made on their authority, and it is not ours to print on a marketing page or to generate on their behalf.",
};

const sealAfter = [
  {
    t: "D9",
    stage: "Policy",
    k: "Policy v3.4 is published. Deposits tightened, returned items loosened.",
    outside: "Outside the decision · v3.3 stays attached",
    say: "The revision from the Policy Engine page, arriving six days too late to touch this file. Under v3.4 two of these outcomes would flip in opposite directions, and this deal is still a v3.3 deal.",
  },
  {
    t: "D12",
    stage: "Documents",
    k: "A fourth bank statement arrives and is added to the file.",
    outside: "Outside the decision · on the file, not in the report",
    say: "Read, structured and attached like everything else — and pointedly not folded into a report that was sealed nine days earlier. A new document makes a new reading, not a new past.",
  },
  {
    t: "D40",
    stage: "Portfolio review",
    k: "The file is pulled and read by somebody who was not there.",
    outside: "Reads what was decided, not what would be decided now",
    say: "This is what the seal is for. The reviewer sees the seven open findings as they stood, the policy version that evaluated them, and the name against the decision — rather than a document that has been quietly agreeing with the present ever since.",
  },
];

const sealAside = {
  title: "What the seal fixes in place",
  items: [
    { k: "The policy version used", v: "Fixed" },
    { k: "What was open at the time", v: "Fixed" },
    { k: "Who entered the decision", v: "Named" },
    { k: "Re-run on a later rule", v: "Never" },
    { k: "Later events on the file", v: "Kept, and outside" },
  ],
  note: "Nothing after the seal is discarded — it is dated, visible and attached to the file. What it cannot do is change a report that was already decided, because a record that keeps agreeing with the present is not a record of anything.",
};

const sealClose =
  "Six months on, nobody asks what the rules say now. They ask what was known on day three, which version was in force, who decided, and what was still open when they did — and a report that cannot answer those four questions in that order was never really evidence of anything.";

const sealNote =
  "An illustrative chronology on the illustrative file used throughout this site. Times and roles are worked-example detail. Cevrynt records that a decision was entered and by whom; the decision itself is the lender's, taken on their authority.";

/* 05 — the seven, sorted by what unblocks them ----------------------------- */

const waitingReadout = {
  figures: [
    { of: "all", k: "Open findings in the report" },
    { of: "paper", k: "Waiting on paper" },
    { of: "person", k: "Waiting on a person", tone: "person" },
  ],
  oneK: "finding",
  manyK: "findings",
  restK: "Sorted by what unblocks them",
  restB:
    "Choose a finding to read what it is waiting on. Sorting these by severity would be a score wearing a different hat, so they are sorted by what actually clears them — and four of the seven turn out to be errands rather than judgments.",
  saidK: "Why this ordering and not another",
  saidB: [
    "Every instinct says to rank these by how bad they are, and every ranking like that is a score with the arithmetic hidden. It would also be the least useful thing to hand somebody at nine in the morning, because severity does not tell you what to do next.",
    "What unblocks a finding does. Four of these clear when a document turns up and need nobody's opinion at all; two need a named reviewer to weigh something; one needs a question put to the broker. That is a morning's work described accurately, rather than a queue with a number next to it.",
  ],
};

/* Each of the seven maps to an open finding counted in section 01, so the two
   figures cannot drift apart: 1 financials, 2 verification, 1 fraud signal,
   2 policy, 1 reviewer note. */
const waitingLanes = [
  {
    k: "Waiting on a document",
    kind: "paper",
    items: [
      {
        stage: "Verification",
        k: "The filing address and the application address are not the same address.",
        with: "With operations",
        say: "Neither record is wrong; they disagree. A current lease or a filed change of address settles it and nothing else will — which is why Cevrynt holds both rather than picking the one that looks more official.",
      },
      {
        stage: "Fraud and risk signals",
        k: "A recurring debit pattern consistent with a second position.",
        with: "With the broker",
        say: "The statements show the pattern and cannot show the agreement behind it. This clears when somebody produces the agreement, not when anybody reasons harder about the debits.",
      },
      {
        stage: "Policy",
        k: "Time in business is held pending the guarantor documents a conditional rule armed.",
        with: "With the broker",
        say: "The rule that armed this requirement fired on day three. The requirement is on the checklist with the rule that put it there named beside it, and it closes when the documents arrive.",
      },
      {
        stage: "Policy",
        k: "The ninety-day cash-flow note armed by the balance exception has not come back.",
        with: "With the broker",
        say: "A condition hanging off a criterion the policy engine deliberately did not settle. It is outstanding rather than overdue, and the report distinguishes between those two things.",
      },
    ],
  },
  {
    k: "Waiting on the borrower",
    kind: "person",
    items: [
      {
        stage: "Verification",
        k: "An owner on the state filing is not named anywhere on the application.",
        with: "One question, via the broker",
        say: "Ownership on this file is incomplete rather than incorrect, and the difference matters. One question answers it, and until it is answered the report says incomplete rather than guessing which of the two records is current.",
      },
    ],
  },
  {
    k: "Waiting on a reviewer's judgment",
    kind: "person",
    items: [
      {
        stage: "Financials",
        k: "February deposits fall well below the four other months on file.",
        with: "With the senior underwriter",
        say: "The owner's explanation is already on the file, entered after a call on day two. Accepting it or not is a judgment about a person and a business, and no amount of reading the statements again will produce it.",
      },
      {
        stage: "Reviewer note",
        k: "A question one reviewer left on the file for the next one.",
        with: "With whoever picks the file up",
        say: "Carried forward in the words it was written in. A note that gets summarised on its way to the report stops being a record of what somebody thought and becomes a record of what a summariser thought they meant.",
      },
    ],
  },
];

const waitingAside = {
  title: "What each finding carries",
  items: [
    { k: "What clears it", v: "Stated" },
    { k: "Who it is with", v: "Named" },
    { k: "The stage it came from", v: "Named" },
    { k: "A severity number", v: "None" },
  ],
  note: "No finding here is ranked against another. The lanes are uneven because the work is uneven, and the only ordering in the report is the one that tells a reader which of these they can actually do something about today.",
};

const waitingClose =
  "Four errands, one question and two judgments. That is what forty-three closed findings and one sealed decision leave behind — and it is a far more useful thing to hand somebody than a number between one and a hundred that they would have had to take apart again anyway.";

const waitingNote =
  "The seven open findings from the illustrative file used throughout this site, matching the counts in section 01. Roles are shown rather than people. Cevrynt raises and routes findings; it resolves none of them.";

/* 06 — reopening, before and after the seal -------------------------------- */

const forkReadout = {
  figures: [
    { of: "paths", k: "Paths a reopening can take" },
    { of: "changes", k: "Where the report is rebuilt" },
    { of: "edited", k: "Sealed reports edited", tone: "none" },
  ],
  saidK: "The two rules, and why they are not in conflict",
  saidB: [
    "This page makes two promises that look like they contradict each other: any reviewer can reopen a closed finding at any time, and a sealed report never changes. A reader who noticed both would be right to ask which one is actually true.",
    "Both are, because they apply to different things. A finding is a live object on a file and stays reopenable for as long as the file exists. A report is a statement about a moment, and the moment does not come back. Reopening after a seal does not edit the sealed report — it starts a new evaluation underneath it, dated, with the old one still readable exactly as it stood.",
  ],
};

const forkSubject = {
  kicker: "One request",
  k: "A reviewer wants a closed finding reopened.",
  b: "The finding was closed on day two: the deposits for three statement periods were read, structured and agreed with the statements they came from. Somebody now believes one of those periods was read against the wrong account. The request is identical in both branches below. What it does is not.",
};

const forkBranches = [
  {
    when: "While the file is open · before day three",
    k: "The finding reopens in place.",
    writes: true,
    steps: [
      "The finding moves back to open, with the reviewer who reopened it and the reason recorded against it.",
      "Its earlier closed state is kept in the file's history rather than overwritten, so both readings stay visible.",
      "The report is rebuilt: forty-three closed becomes forty-two, and the open count moves from seven to eight.",
      "Nothing is contradicted, because nothing has been decided yet.",
    ],
    verdict: "The report is rebuilt · nothing is overwritten",
  },
  {
    when: "After the report is sealed · day three onward",
    k: "The sealed report is not touched at all.",
    writes: false,
    steps: [
      "The sealed report still reads seven open findings, policy v3.3, and the name against the decision. None of those numbers move.",
      "The reopening opens a new evaluation, dated, sitting below the seal with everything else that happened afterwards.",
      "Anybody reading the decision sees what was known on day three. Anybody reading the file sees that and the reopening.",
      "If the reopening changes the answer, that is a new decision with its own record — not a correction folded back into the old one.",
    ],
    verdict: "A new evaluation below the seal · the old one stands",
  },
];

const forkAside = {
  title: "What reopening never does",
  items: [
    { k: "Overwrite the earlier reading", v: "Never" },
    { k: "Alter a sealed report", v: "Never" },
    { k: "Remove the original finding", v: "Never" },
    { k: "Happen without a name on it", v: "Never" },
  ],
  note: "Reopening is generous on purpose — the cost of making a reviewer feel they cannot revisit something is far higher than the cost of keeping two readings. What it is not allowed to do is reach backwards into a decision that was taken before the second reading existed.",
};

const forkClose =
  "A file that cannot be reopened makes people quietly wrong rather than publicly corrected. A report that can be edited after the fact is not evidence of anything. Keeping both is not a compromise between them — it is the only arrangement in which either one is worth having.";

const forkNote =
  "An illustrative reopening on the illustrative file used throughout this site. Cevrynt is not a lender, takes no decision in either branch, and a new evaluation is a new record rather than a revised outcome.";

export default function UnderwritingReportPage() {
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

      {/* 01 — the report as the remainder rather than the restatement */}
      <section className="ur-residue band-light" aria-labelledby="residue-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">What is left</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="residue-heading"
              text="The report is not a summary of the file. It is what the file could not settle."
            />
          </div>
          <p className="eg-lede t-lede">
            Fifty findings came off this file. Forty-three are closed and stay in the file underneath. Seven are
            not, and those seven are the report.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <OpenResidue
              stages={residueStages}
              readout={residueReadout}
              aside={residueAside}
              close={residueClose}
              note={residueNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — the descent under each line, including the one that stops early */}
      <section className="ur-trail band-deep" aria-labelledby="trail-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Evidence, all the way down</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="trail-heading"
              text="Every line in the report has a floor under it."
            />
          </div>
          <p className="eg-lede t-lede">
            Open a line and it descends: the finding that produced it, the reading behind the finding, and the
            page it was taken from. One of these four stops early, and the report says so.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <TrailDepth
              items={trailItems}
              readout={trailReadout}
              aside={trailAside}
              close={trailClose}
              note={trailNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — the values it deliberately does not emit */}
      <section className="ur-notissued band-light" aria-labelledby="notissued-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">What it does not contain</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="notissued-heading"
              text="Six things a reader arrives expecting, and none of them are here."
            />
          </div>
          <p className="eg-lede t-lede">
            A report is exactly where an underwriting platform starts emitting a score. Each row names the value
            you came looking for, shows the slot it would sit in, and rules that slot through.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <NotIssued
              rows={notIssuedRows}
              columns={notIssuedColumns}
              readout={notIssuedReadout}
              aside={notIssuedAside}
              close={notIssuedClose}
              note={notIssuedNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — the cut between what was decided and everything after it */}
      <section className="ur-seal band-deep" aria-labelledby="seal-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">The decision record</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="seal-heading"
              text="The moment somebody decides, the report stops moving."
            />
          </div>
          <p className="eg-lede t-lede">
            One chronology, cut once. Above the seal, everything that formed the decided report. Below it,
            everything that happened afterwards — kept, dated, and deliberately outside it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <DecisionSeal
              before={sealBefore}
              seal={sealSeal}
              after={sealAfter}
              readout={sealReadout}
              aside={sealAside}
              close={sealClose}
              note={sealNote}
            />
          </div>
        </div>
      </section>

      {/* 05 — the seven the rest of the page keeps citing */}
      <section className="ur-waiting band-light" aria-labelledby="waiting-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">The seven</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="waiting-heading"
              text="Four errands, one question, and two judgments."
            />
          </div>
          <p className="eg-lede t-lede">
            Here are the seven, sorted by what unblocks them rather than by how serious they look. Severity
            ordering is a score with the arithmetic hidden, and it never tells anybody what to do next.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <WaitingLanes
              lanes={waitingLanes}
              readout={waitingReadout}
              aside={waitingAside}
              close={waitingClose}
              note={waitingNote}
            />
          </div>
        </div>
      </section>

      {/* 06 — the two immutability rules, and why they do not conflict */}
      <section className="ur-fork band-deep" aria-labelledby="fork-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">06</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Reopening</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="fork-heading"
              text="Closed can be reopened. Sealed cannot be edited."
            />
          </div>
          <p className="eg-lede t-lede">
            Those two promises look like they contradict each other. One request, put before and after a
            decision, is the clearest way to show that they do not.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ReopenFork
              subject={forkSubject}
              branches={forkBranches}
              readout={forkReadout}
              aside={forkAside}
              close={forkClose}
              note={forkNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="07"
          kicker="Founder-led"
          heading="Send us the file that took the longest to write up."
          lede="Not the clean one. The file where the answer was obvious to whoever worked it and took two days to explain to anybody else, because the reasoning was spread across a spreadsheet, a thread and somebody's memory. That is the file worth walking through together."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
