import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { PolicySpread } from "@/components/policy/policy-spread";
import { VersionShift } from "@/components/policy/version-shift";
import { BandRange } from "@/components/policy/band-range";
import { RuleLimit } from "@/components/policy/rule-limit";
import { RuleChain } from "@/components/policy/rule-chain";
import { OverrideRecord } from "@/components/policy/override-record";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

const page = pageByPath.get("product/policy-engine");

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
   architecture and the same instrument language as Business Verification:
   figures on one baseline, then a measured chart, over the band-light /
   band-deep sequence.

   Both sections hold the file still and move the policy, which is the one
   thing this page has to establish. 01 puts three lenders' thresholds on one
   observation; 02 puts two versions of one lender's policy on the same
   observation and shows what that does to a decided deal.

   The detailed single-policy run already exists on the Alternative Lenders
   page — twelve criteria evaluated against one lender's rules — and is not
   repeated here. That figure moves through a policy; these hold the file and
   move the policy across it.

   Four constraints held throughout:

   1. Every observed value is the illustrative Cedar & Stone file this site
      uses throughout, and the figures match the ones already published on the
      Alternative Lenders page. The observations are constants; only the
      thresholds vary, because the thresholds are the subject.
   2. The three policies are illustrative lender configurations, not customers,
      not tiers, and not products Cevrynt offers. Cevrynt ships no default
      thresholds and recommends none.
   3. No score. The engine issues no aggregate number, no rating and no
      disposition — it reports each criterion against the lender's own line.
   4. No approval or decline. Cevrynt is not a lender, and an exception is
      raised for a person rather than resolved.
   -------------------------------------------------------------------------- */

/* 01 — one file, three policies -------------------------------------------- */

const spreadReadout = {
  figures: [
    { n: "01", k: "Borrower file" },
    { n: "03", k: "Lender policies" },
    { n: "03", k: "Different answers", tone: "held" },
  ],
  ofK: "of",
  legend: "Filled mark · the observation from the file    ·    Open marks · each lender's own line",
};

const spreadPolicies = [
  { k: "Policy A · permissive" },
  { k: "Policy B · middle" },
  { k: "Policy C · conservative" },
];

/* Observations are the published illustrative file. Only the lines differ. */
const spreadCriteria = [
  {
    k: "Average monthly deposits",
    scale: "$0 — $120K",
    value: 84.6,
    pct: 70.5,
    shown: "$84.6K",
    dir: "min",
    lines: [60, 75, 95],
    linePct: [50, 62.5, 79.2],
    lineShown: ["≥ $60K", "≥ $75K", "≥ $95K"],
    b: "The same deposits figure clears the first two lines and stops at the third. Nothing about the borrower is different in those three sentences.",
  },
  {
    k: "Average daily balance",
    scale: "$0 — $50K",
    value: 31.2,
    pct: 62.4,
    shown: "$31.2K",
    dir: "min",
    lines: [15, 20, 35],
    linePct: [30, 40, 70],
    lineShown: ["≥ $15K", "≥ $20K", "≥ $35K"],
    b: "A balance that two lenders treat as comfortable and a third treats as short of its floor.",
  },
  {
    k: "Time in business",
    scale: "0 — 36 months",
    value: 14,
    pct: 38.9,
    shown: "14 months",
    dir: "min",
    lines: [6, 12, 24],
    linePct: [16.7, 33.3, 66.7],
    lineShown: ["≥ 6 mo", "≥ 12 mo", "≥ 24 mo"],
    b: "Fourteen months is a young business or an established one depending entirely on who is reading it.",
  },
  {
    k: "Returned items · 90 days",
    scale: "0 — 12 events",
    value: 6,
    pct: 50,
    shown: "6 events",
    dir: "max",
    lines: [8, 5, 3],
    linePct: [66.7, 41.7, 25],
    lineShown: ["≤ 8", "≤ 5", "≤ 3"],
    b: "The one criterion where the line is a ceiling rather than a floor, and the only one this file clears for a single lender out of three.",
  },
];

const spreadAside = {
  title: "What the engine brings, and what it does not",
  items: [
    { k: "The arithmetic", v: "Ours" },
    { k: "The thresholds", v: "Yours" },
    { k: "A default policy", v: "None shipped" },
    { k: "A recommended line", v: "Never" },
  ],
  note: "Cevrynt ships no starting thresholds and suggests none. A policy engine that arrived with opinions about where a line belongs would be a lender with extra steps, and the three policies above are illustrative configurations rather than tiers on offer.",
};

const spreadShot = {
  src: "/media/placeholder/policy-led.png",
  w: 760,
  h: 520,
  alt: "The Cevrynt policy view: a borrower measured against lender-defined criteria, with each outcome shown against the lender's own threshold and one exception left open for judgment.",
  caption: "Illustrative product view · no universal score",
};

const spreadClose =
  "One file, three policies, three answers — and the file never changed between them. That is the whole of what a policy engine is for: the thresholds belong to the lender, the arithmetic belongs to us, and nobody's deal is measured against a number we invented.";

const spreadNote =
  "Illustrative lender configurations on the illustrative file used throughout this site. They are not customers, not tiers Cevrynt offers, and not a recommendation about where any threshold belongs.";

/* 02 — one policy, two versions -------------------------------------------- */

const shiftReadout = {
  figures: [
    { n: "04", k: "Criteria on the file" },
    { n: "03", k: "Thresholds that moved" },
    { n: "02", k: "Outcomes that flipped", tone: "held" },
  ],
  cornerK: "Criterion",
  outcomeK: "Outcome",
  saidK: "What the version is for",
  saidB:
    "{moved} of these thresholds moved and {flipped} outcomes flipped, in opposite directions, without the borrower doing anything at all. A deal evaluated under 3.3 keeps 3.3 attached to it for good — the engine does not re-judge a decided file against a rule written afterwards, because a file whose answer changes every time somebody edits a threshold is not an answer anybody can defend later.",
};

const shiftVersions = { from: "Policy v3.3", to: "Policy v3.4" };

const shiftCriteria = [
  {
    k: "Average monthly deposits",
    scale: "$0 — $120K",
    pct: 70.5,
    shown: "$84.6K",
    fromPct: 62.5,
    toPct: 75,
    fromShown: "≥ $75K",
    toShown: "≥ $90K",
    was: "Pass",
    now: "Stop",
    b: "The committee tightened deposits in the spring. The same $84.6K that cleared the old line sits below the new one, and the file it belongs to was decided months earlier.",
  },
  {
    k: "Returned items · 90 days",
    scale: "0 — 12 events",
    pct: 50,
    shown: "6 events",
    fromPct: 41.7,
    toPct: 66.7,
    fromShown: "≤ 5",
    toShown: "≤ 8",
    was: "Exception",
    now: "Pass",
    b: "Loosened in the same revision, and in the opposite direction. An exception that needed a reviewer under 3.3 would not be raised at all under 3.4.",
  },
  {
    k: "Average daily balance",
    scale: "$0 — $50K",
    pct: 62.4,
    shown: "$31.2K",
    fromPct: 40,
    toPct: 50,
    fromShown: "≥ $20K",
    toShown: "≥ $25K",
    was: "Pass",
    now: "Pass",
    b: "The line moved and the outcome did not. Worth recording anyway: the next file along may sit in the gap between the two.",
  },
  {
    k: "Time in business",
    scale: "0 — 36 months",
    pct: 38.9,
    shown: "14 months",
    fromPct: 33.3,
    toPct: 33.3,
    fromShown: "≥ 12 mo",
    toShown: "≥ 12 mo",
    was: "Pass",
    now: "Pass",
    b: "Untouched by the revision, and the only line on this chart where the two versions sit on top of each other.",
  },
];

const shiftAside = {
  title: "What travels with a decided deal",
  items: [
    { k: "The policy version", v: "Retained" },
    { k: "Each threshold as it stood", v: "Retained" },
    { k: "Re-judged on a later rule", v: "Never" },
    { k: "Who changed the rule", v: "Recorded" },
  ],
  note: "A policy change applies to what comes next. It does not reach back through files that have already been worked, and the version that evaluated a deal stays attached to that deal for as long as the record exists.",
};

const shiftClose =
  "Two outcomes flipped in opposite directions and neither borrower did anything. The version is not bookkeeping — it is the only reason anybody can answer the question every credit file eventually gets asked, which is not what the rule says now but what the rule said then.";

const shiftNote =
  "Illustrative policy versions on the illustrative file used throughout. Cevrynt issues no approval, decline or price at this stage or any other, and an exception is raised for a named reviewer rather than resolved.";

/* 03 — two lines, and the band between them -------------------------------- */

const bandReadout = {
  figures: [
    { n: "04", k: "Criteria on the file" },
    { n: "{band}", k: "In the band", tone: "held" },
    { n: "00", k: "Resolved by the engine" },
  ],
  restK: "Two lines, not one",
  restB:
    "Choose a criterion to see what happens to it. A file above the clearing line is stated and the reading attached; a file past the far line stops against the lender's own rule; a file in the band is raised for a person, and the engine writes nothing into that gap.",
};

const bandLabels = { stop: "Stop", band: "Exception", pass: "Pass" };

/* The same illustrative observations. What changes is that each criterion now
   carries two lines instead of one, which is how policies are actually written. */
const bandCriteria = [
  {
    k: "Average monthly deposits",
    hi: "$120K",
    lo: "$0",
    pct: 70.5,
    shown: "$84.6K",
    bandK: "$60K — $75K",
    zones: [
      { t: "stop", from: 0, to: 50 },
      { t: "band", from: 50, to: 62.5 },
      { t: "pass", from: 62.5, to: 100 },
    ],
    say: "Above the clearing line. The engine states it against the line the lender set, attaches the statements the figure was read from, and asks nobody to look at it.",
    b: "Two lines rather than one: a floor the file cannot fall below, and a higher point at which it clears outright. This file is above both, which is the only case a single threshold describes honestly.",
  },
  {
    k: "Average daily balance",
    hi: "$50K",
    lo: "$0",
    pct: 62.4,
    shown: "$31.2K",
    bandK: "$15K — $35K",
    zones: [
      { t: "stop", from: 0, to: 30 },
      { t: "band", from: 30, to: 70 },
      { t: "pass", from: 70, to: 100 },
    ],
    say: "In the band. The engine raises it for a named reviewer with the balance, the period it was measured over and both lines it sits between — and stops there.",
    b: "Comfortably above the floor and comfortably short of the clearing point, which is the honest description of most real files and the one thing a single threshold can never say.",
  },
  {
    k: "Time in business",
    hi: "36 mo",
    lo: "0",
    pct: 38.9,
    shown: "14 months",
    bandK: "9 — 18 months",
    zones: [
      { t: "stop", from: 0, to: 25 },
      { t: "band", from: 25, to: 50 },
      { t: "pass", from: 50, to: 100 },
    ],
    say: "In the band. Five months above the floor and four short of clearing, and the engine does not pretend the second line means the same thing as the first.",
    b: "Fourteen months is not a number that decides itself. Where the band sits and how wide it is, is a decision the credit team makes once; applying it the same way to every file afterwards is the part we take on.",
  },
  {
    k: "Returned items · 90 days",
    hi: "12",
    lo: "0",
    pct: 50,
    shown: "6 events",
    bandK: "3 — 5 events",
    zones: [
      { t: "pass", from: 0, to: 16.7 },
      { t: "band", from: 16.7, to: 41.7 },
      { t: "stop", from: 41.7, to: 100 },
    ],
    say: "Past the far line, so the file stops here against this policy. A stop is not a decline — it is the engine reporting that the lender's own rule has been crossed, and what follows is the lender's call.",
    b: "The one criterion whose scale runs the other way: fewer is better, so the pass region sits at the bottom of the track and the stop region at the top. Six returned items is past both lines.",
  },
];

const bandAside = {
  title: "What the engine does with the band",
  items: [
    { k: "Computes a verdict for it", v: "Never" },
    { k: "Raises it for a reviewer", v: "By name" },
    { k: "The reading behind it", v: "Attached" },
    { k: "Both lines it sits between", v: "Shown" },
  ],
  note: "The band is the part of a policy that is deliberately unfinished. Cevrynt does not close it, weight it or turn it into a score — it hands the reviewer what it read and the two lines the lender drew, and the lender retains final authority over what happens next.",
};

const bandClose =
  "A policy with one line per criterion pretends every file is cleanly on one side of something. Real policies have two, and the space between them is not a gap in the rules — it is the part of the work that was always going to need a person.";

const bandNote =
  "Illustrative lender lines on the illustrative file used throughout this site. Cevrynt is not a lender, issues no approval or decline, and a stop here is a rule being reported rather than a decision being made.";

/* 04 — what a rule can hold, and what it cannot ---------------------------- */

const limitReadout = {
  figures: [
    { of: "all", k: "Conditions on this list" },
    { of: "eng", k: "The engine can state" },
    { of: "ppl", k: "Go to a person", tone: "held" },
  ],
  ofK: "of",
  saidK: "Why the list is this shape",
  saidB: [
    "Most of what a credit team knows was never a threshold. It is a sense of an industry, a read on an owner, a memory of how the last three deals like this one performed — and none of it survives being turned into a number without losing the thing that made it worth knowing.",
    "So the engine states what can genuinely be stated, surfaces what it can see but cannot weigh, and leaves the rest alone entirely. The third group is not a roadmap item. It is a description of where this platform stops on purpose.",
  ],
};

const limitGroups = [
  {
    k: "Stated as a rule",
    kicker: "Threshold · direction · source",
    endpoint: 0,
    items: [
      {
        k: "Average monthly deposits over the statement period",
        b: "A number with a direction and a floor. The engine reads it from the statements, states it against your line, and shows the line it used and the pages the figure came from.",
      },
      {
        k: "Time in business from the filing date",
        b: "A date, a subtraction and a source. There is nothing here to interpret, which is exactly why it belongs in a rule rather than in front of somebody.",
      },
      {
        k: "Returned items in the last ninety days",
        b: "A count against a ceiling. The only judgment in it is what counts as a returned item, and that definition is yours — the engine applies the one you wrote rather than one of its own.",
      },
    ],
  },
  {
    k: "Surfaced, never scored",
    kicker: "Visible · not weighed",
    endpoint: 1,
    items: [
      {
        k: "Deposits that mostly come from one payer",
        b: "The engine can show that the concentration exists and which payer it is. Whether a single large customer is this borrower's strength or its entire risk is a judgment about that industry, and it does not become one by being multiplied by a weight.",
      },
      {
        k: "A second position appearing mid-statement",
        b: "Detectable, and worth putting in front of somebody the same day. What it means depends on terms that are not in the file, so the engine reports what it saw and leaves the reading open.",
      },
      {
        k: "A seasonal shape in the deposits",
        b: "The engine can describe the shape and show you the months. It cannot tell you whether this borrower's slow quarter is ordinary for the trade or the beginning of something, and it will not guess.",
      },
    ],
  },
  {
    k: "Not computed at all",
    kicker: "Nothing to calculate",
    endpoint: 1,
    items: [
      {
        k: "The owner's explanation for a bad month",
        b: "A sentence from a person about a situation. It is attached to the file as a reviewer note, in their words, and it is never converted into a number or a modifier.",
      },
      {
        k: "Whether this is a relationship worth keeping",
        b: "Renewal history, how the last advance was serviced, what the broker is like to work with. Real considerations, and none of them underwriting arithmetic.",
      },
      {
        k: "Whether to make the exception anyway",
        b: "The decision this whole platform exists to support and the one it never takes. Cevrynt is not a lender, no exception is closed here, and the authority to fund or decline stays where it already is.",
      },
    ],
  },
];

const limitEndpoints = [
  {
    k: "The engine answers",
    b: "Stated against your threshold, with the direction you set and the source reading attached to the statement.",
  },
  {
    k: "A person answers",
    b: "Raised for a named reviewer with everything the engine saw attached, a record of who it went to, and nothing decided on their behalf.",
  },
];

const limitAside = {
  title: "What an exception carries when it is raised",
  items: [
    { k: "Who it was raised for", v: "Named" },
    { k: "What the engine concluded", v: "Nothing" },
    { k: "The reading behind it", v: "Attached" },
    { k: "Closed automatically", v: "Never" },
  ],
  note: "An exception is a routing instruction, not a verdict held back. Nothing in the record claims an outcome the engine did not produce, and the reviewer's own note is what closes it.",
};

const limitClose =
  "Three of these nine can be written down. The other six are the reason a person is still reading the file, and a platform that quietly converted them into a score would be making underwriting decisions it has no standing to make.";

const limitNote =
  "Illustrative underwriting conditions drawn from the workflow this product supports. They are not a feature list, not a roadmap, and not a claim about any lender's policy.";

/* 05 — conditions, which are not thresholds --------------------------------- */

const chainReadout = {
  figures: [
    { of: "all", k: "Conditions on this policy" },
    { of: "armed", k: "Armed by this file" },
    { of: "dormant", k: "Did not fire, still recorded", tone: "dormant" },
  ],
  endK: "Chain ends",
  restK: "A policy is not a flat list",
  restB:
    "Choose a chain to see what it added to the file. Each one starts with something the file actually did, and what follows exists only because of it — including the last chain, which never fired and is on the record anyway.",
};

const chainColumns = ["What the file did", "What that arms", "And what that arms"];

const chainChains = [
  {
    k: "The guarantee chain",
    steps: [
      { k: "Time in business is 14 months, under the 24-month line", v: "Fired" },
      { k: "A personal guarantee is required on this file", v: "Armed" },
      { k: "Guarantor identity documents are added to the checklist", v: "Armed" },
    ],
    say: "Three deep, and only the first step is a threshold. The second and third exist purely because the first one fired, and neither would appear on a file from a four-year-old business.",
    b: "The longest chain here, and the clearest case for conditions being a separate thing from thresholds. Nothing in steps two and three is a number — they are requirements that came into existence because a number went one way.",
  },
  {
    k: "The sign-off chain",
    steps: [
      { k: "Returned items: 6 in 90 days, past the 5-event ceiling", v: "Fired" },
      { k: "Reviewer sign-off is required before the file moves on", v: "Armed" },
    ],
    say: "Two deep and then it stops. The engine adds the sign-off requirement to the file and names the step it is waiting on; it does not sign anything off, and nothing here advances on its own.",
    b: "A chain that ends after one step, which is what most conditions actually do. Padding it out to the width of the grid would make the policy look deeper than it is.",
  },
  {
    k: "The cash-flow note chain",
    steps: [
      { k: "Average daily balance falls inside the exception band", v: "Fired" },
      { k: "A 90-day cash-flow note is requested with the file", v: "Armed" },
    ],
    say: "Armed by a criterion that produced no verdict at all. A condition can hang off an exception as easily as off a pass or a stop, which is another reason the band cannot simply be rounded to one side.",
    b: "Worth noticing where this one starts: on the criterion from section 03 that the engine refused to settle. Conditions attach to what happened, not to what was decided.",
  },
  {
    dormant: true,
    k: "The seasonality chain, which never fired",
    steps: [
      { k: "Deposits are $84.6K, above the $75K line", v: "Did not fire" },
      { k: "A seasonality review would have been required below it", v: "Never armed" },
    ],
    say: "Nothing happened here, and that is the entry. The condition existed, the file was measured against it, and it did not apply — which is a fact about this file rather than an absence of one.",
    b: "A policy run that only showed the rules that fired would be hiding half of what it did. The rule that stayed quiet is recorded with the same detail as the three that did not, because the question later is never only what applied.",
  },
];

const chainAside = {
  title: "What a chain writes into the file",
  items: [
    { k: "The rule that armed it", v: "Named" },
    { k: "Conditions that did not fire", v: "Recorded" },
    { k: "The requirement itself", v: "Added" },
    { k: "Satisfied by the engine", v: "Never" },
  ],
  note: "An armed requirement is a thing the file now needs, not a thing the engine then provides. It appears on the checklist, it names the rule that put it there, and it is closed by whoever actually does the work.",
};

const chainClose =
  "Thresholds are the part of a policy that demonstrates well. Conditions are the part that makes it a policy — and the one that never fired is on the record for the same reason the other three are, which is that somebody may one day need to know what this file was measured against.";

const chainNote =
  "Illustrative conditions on the illustrative file used throughout this site. Cevrynt applies the conditions a lender writes, satisfies none of them on the lender's behalf, and issues no approval or decline at any point.";

/* 06 — documented overrides ------------------------------------------------- */

const overrideReadout = {
  figures: [
    { of: "all", k: "Criteria in this run" },
    { of: "entries", k: "Reviewer entries" },
    { of: "changed", k: "Engine outcomes changed", tone: "held" },
  ],
  restK: "Two lanes, and one of them never moves",
  restB:
    "Choose a row to read the reason that was entered with it. The left lane is what the engine produced and it is fixed; the right lane is what a person added afterwards. Nothing on the right rewrites anything on the left.",
  saidK: "Why it is appended rather than applied",
  saidB: [
    "An override that edited the finding would leave a file that looks like it always passed, and a policy engine whose output can be quietly rewritten is worth less than no policy engine at all — because everybody would know the record had been made to agree with the outcome.",
    "So both survive. The engine's finding stays exactly as it was produced, the reviewer's entry sits beside it under their name with their reason in their own words, and the version of the policy in force at the time stays attached to both.",
  ],
};

const overrideColumns = {
  crit: "Criterion",
  engine: "What the engine produced",
  added: "What the reviewer added",
};

const overrideRows = [
  {
    k: "Returned items · 90 days",
    tone: "stop",
    engine: "Stop",
    engineB: "Six events against a five-event ceiling. Reported as the lender's own rule being crossed.",
    entry: "Proceeded",
    who: "Credit lead",
    reasonK: "Reason entered with the override",
    reason:
      "Four of the six returns fall inside one week and match a processor error the borrower documented at the time. The pattern does not repeat across the other thirteen months on file, and the stop stands on the record next to this note rather than being removed by it.",
  },
  {
    k: "Average daily balance",
    tone: "held",
    engine: "Exception",
    engineB: "$31.2K, between the $15K floor and the $35K clearing point. No verdict produced.",
    entry: "Cleared",
    who: "Senior underwriter",
    reasonK: "Reason entered with the override",
    reason:
      "Short of the clearing point, but the deposit pattern behind the balance is steady across all fourteen months on file. Cleared on that basis, by a person, with the band it sat in still shown.",
  },
  {
    k: "Time in business",
    tone: "held",
    engine: "Exception",
    engineB: "Fourteen months, inside the nine-to-eighteen month band. No verdict produced.",
    entry: "Held",
    who: "Senior underwriter",
    reasonK: "Reason entered with the override",
    reason:
      "Held pending the guarantor documents the conditional rule armed in the previous section. A hold is a reviewer entry like any other — it is dated, attributed, and it is not a decision about the deal.",
  },
  {
    untouched: true,
    k: "Average monthly deposits",
    tone: "pass",
    engine: "Pass",
    engineB: "$84.6K above the $75K line, stated with the statements it was read from.",
    entry: "No entry",
    who: "Left as the engine stated it",
    reasonK: "The row nobody touched",
    reason:
      "Most of a policy run looks like this, and it is recorded with exactly the same weight as the three rows above it. A record that only kept the overrides would make every file look like an argument.",
  },
];

const overrideAside = {
  title: "What the override record keeps",
  items: [
    { k: "The policy version in force", v: "Retained" },
    { k: "The engine's own outcome", v: "Unchanged" },
    { k: "Who entered it", v: "Named" },
    { k: "Their reason, in their words", v: "Verbatim" },
    { k: "Editable afterwards", v: "Never" },
  ],
  note: "Cevrynt is not a lender and takes none of these decisions. The reviewer's entry is the decision; everything the platform does around it is keeping an honest account of what the rule said, what the file showed, and who departed from which.",
};

const overrideClose =
  "An override is not the engine being wrong and corrected. It is a person taking a decision the engine was never allowed to take — and the only thing that makes it defensible six months later is that anybody looking can still see the rule, the reading, the name and the reason, exactly as they stood.";

const overrideNote =
  "Illustrative reviewer entries on the illustrative file used throughout this site. Reviewer names are shown as roles rather than people, and nothing here represents a real lender's policy, a real decision or a real borrower.";

export default function PolicyEnginePage() {
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

      {/* 01 — the file held still while the policy moves */}
      <section className="pe-spread band-light" aria-labelledby="spread-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">Whose rules</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="spread-heading"
              text="One file, three policies, and three different answers."
            />
          </div>
          <p className="eg-lede t-lede">
            Four criteria, each on a measured scale, carrying one observation from the file and three lenders&rsquo;
            lines drawn across it. Read across a row and you are reading the borrower; read down a column and
            you are reading a lender.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PolicySpread
              criteria={spreadCriteria}
              policies={spreadPolicies}
              readout={spreadReadout}
              aside={spreadAside}
              shot={spreadShot}
              close={spreadClose}
              note={spreadNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — the policy moving underneath a decided deal */}
      <section className="pe-shift band-deep" aria-labelledby="shift-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">When the rule changes</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="shift-heading"
              text="Same file, same lender, and a policy that moved underneath it."
            />
          </div>
          <p className="eg-lede t-lede">
            One revision, three thresholds moved, two outcomes flipped in opposite directions — and the
            borrower did nothing in either case. What a deal keeps is the version that actually decided it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <VersionShift
              criteria={shiftCriteria}
              versions={shiftVersions}
              readout={shiftReadout}
              aside={shiftAside}
              close={shiftClose}
              note={shiftNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — the band a single threshold cannot describe */}
      <section className="pe-band band-light" aria-labelledby="band-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Where a rule stops</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="band-heading"
              text="A pass, a stop, and the gap in between that belongs to a person."
            />
          </div>
          <p className="eg-lede t-lede">
            Most criteria a credit team runs are not one line but two: a point below which the file stops, a
            point above which it clears, and a band in between that no threshold settles by itself.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <BandRange
              criteria={bandCriteria}
              readout={bandReadout}
              labels={bandLabels}
              aside={bandAside}
              close={bandClose}
              note={bandNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — the conditions a threshold was never going to hold */}
      <section className="pe-limit band-deep" aria-labelledby="limit-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">What a rule cannot hold</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="limit-heading"
              text="Three of these can be written down. Six of them go to a person."
            />
          </div>
          <p className="eg-lede t-lede">
            Nine conditions a credit team applies to a file, sorted by what a policy engine can honestly do
            with each one — state it, surface it without weighing it, or leave it alone entirely.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <RuleLimit
              groups={limitGroups}
              endpoints={limitEndpoints}
              readout={limitReadout}
              aside={limitAside}
              close={limitClose}
              note={limitNote}
            />
          </div>
        </div>
      </section>

      {/* 05 — the conditional half of a policy, which is not thresholds at all */}
      <section className="pe-chain band-light" aria-labelledby="chain-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">Conditions, not thresholds</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="chain-heading"
              text="Some rules only exist because another rule fired."
            />
          </div>
          <p className="eg-lede t-lede">
            Half of what a credit team wrote down is conditional: a requirement that appears only because
            something else happened, and one that quietly never applied because it didn&rsquo;t. Both belong on
            the record.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <RuleChain
              chains={chainChains}
              columns={chainColumns}
              readout={chainReadout}
              aside={chainAside}
              close={chainClose}
              note={chainNote}
            />
          </div>
        </div>
      </section>

      {/* 06 — going past the rule, and what the record keeps afterwards */}
      <section className="pe-override band-deep" aria-labelledby="override-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">06</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Documented overrides</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="override-heading"
              text="A reviewer can go past the rule. The record does not forget that they did."
            />
          </div>
          <p className="eg-lede t-lede">
            Overrides are most of the reason to have a policy engine — a lender who cannot depart from their
            own rule has a cage rather than a policy. What matters is what survives afterwards.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <OverrideRecord
              rows={overrideRows}
              columns={overrideColumns}
              readout={overrideReadout}
              aside={overrideAside}
              close={overrideClose}
              note={overrideNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="07"
          kicker="Founder-led"
          heading="Bring the rule nobody can write down."
          lede="Every credit team has one: the condition everybody applies and nobody has put into words, the exception that gets made for a particular kind of deal, the threshold that is really two thresholds depending on the season. Describe one of those and we will work out together whether it belongs in a policy engine or in front of a person."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
