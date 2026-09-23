import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { ReferralPath } from "@/components/partner/referral-path";
import { ScopeRings } from "@/components/partner/scope-rings";
import { QuestionGrid } from "@/components/partner/question-grid";
import { ConditionGate } from "@/components/partner/condition-gate";
import { TwoDoors } from "@/components/partner/two-doors";
import { ReaderRoutes } from "@/components/partner/reader-routes";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

const page = pageByPath.get("partners/shopline");

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
   Six sections, same architecture as the product pages, over the
   band-light / band-deep sequence. 03 lists the questions being worked through
   as questions, with none marked live; 04 turns the four conditions the site
   already names for any production data flow into a gate that only opens when
   all four hold. 05 answers the lender's question — is a referral reviewed
   differently? — by merging both routes into one line through all eight
   stages. 06 routes each kind of reader, and the merchant's route ends at
   information because Cevrynt takes no funding applications.

   This page carries the strictest wording on the site. Cevrynt × SHOPLINE is
   described only as a documented development and referral partnership around
   e-commerce merchant-underwriting workflows, and nothing on it may imply a
   generally available live integration, an investment, exclusivity, an
   endorsement, automatic data sharing, universal merchant eligibility or
   guaranteed funding.

   The homepage already draws the partnership as two lanes meeting at a shared
   question, and E-commerce sets out its limits as a clause. Neither is
   repeated here:

   01 draws how a referral is meant to move — people and decisions on a track,
      a gate that needs a named party's yes between each pair, and the
      shortcuts a reader might assume struck through above it.
   02 draws scope as concentric rings — the lender's decision at the centre,
      Cevrynt's review around it, the partnership around both — with the seven
      things it is not listed outside every ring.

   Both logos are the supplied artwork, shown whole at the same size and never
   recoloured, cropped or reshaped.
   -------------------------------------------------------------------------- */

/* 01 — the referral path ---------------------------------------------------- */

const pathParties = [
  {
    k: "The merchant",
    role: "Runs their business on SHOPLINE, and decides whether to look for financing at all.",
  },
  {
    k: "SHOPLINE",
    logo: { src: "/brand/shopline-logo.png", alt: "SHOPLINE", w: 768, h: 269 },
    role: "Coordinates a qualified referral under the documented partnership.",
  },
  {
    k: "Cevrynt",
    logo: { src: "/brand/cevrynt-logo-v2.png", alt: "Cevrynt", w: 1029, h: 366 },
    role: "Structures the underwriting file for a lender, with the evidence attached.",
  },
  {
    k: "The lender",
    role: "Applies its own policy and makes every credit decision.",
    ends: "Decides · including no",
  },
];

const pathGates = [
  {
    k: "Gate 01",
    cond: "The merchant chooses to be referred.",
    who: "the merchant",
    automatic: false,
    say: "Being a SHOPLINE merchant does not put anybody on this path. A referral starts with a merchant choosing to be introduced — not with the platform deciding that they should be.",
  },
  {
    k: "Gate 02",
    cond: "The merchant authorises what may be shared, for this workflow only.",
    who: "the merchant",
    automatic: false,
    say: "No commerce data moves because the partnership exists. What can be used depends on the workflow, the merchant's authorisation and the data scope agreed for the use case — and where that is absent, the file is worked from the documents the merchant submits, like any other.",
  },
  {
    k: "Gate 03",
    cond: "The lender's own eligibility criteria and policy apply.",
    who: "the lender",
    automatic: false,
    say: "Cevrynt structures the file; it does not decide whether the merchant qualifies. The lender's policy is applied exactly as it would be to a merchant who arrived any other way, and a referral carries no eligibility with it.",
  },
];

/* Station indexes: 0 merchant · 1 SHOPLINE · 2 Cevrynt · 3 lender. `h` is the
   arc's height in the figure's 40-unit space. */
const pathShortcuts = [
  { letter: "A", k: "Commerce data shared automatically", from: 1, to: 2, h: 11 },
  { letter: "B", k: "A credit decision made by Cevrynt", from: 2, to: 3, h: 11 },
  { letter: "C", k: "Eligibility set by the platform", from: 1, to: 3, h: 23 },
  { letter: "D", k: "Funding guaranteed by being on the platform", from: 0, to: 3, h: 35 },
];

const pathReadout = {
  figures: [
    { of: "parties", k: "Parties on the path" },
    { of: "gates", k: "Points that need a yes" },
    { of: "automatic", k: "Steps that happen by themselves", tone: "none" },
    { of: "shortcuts", k: "Shortcuts it does not take" },
  ],
  arcsK: "Shortcuts a reader might assume · none of them exist",
  notK: "Not part of it",
  whoK: "decided by",
  restK: "Nothing on this path moves by itself",
  restB:
    "Choose a gate to read what has to be true before anything moves past it, and who decides. Above the track are the shortcuts people tend to assume a platform partnership creates; each one is struck because none of them exists.",
  saidK: "Why a path of decisions and not a flow of data",
  saidB: [
    "The easiest way to draw a platform partnership is as a pipe: merchant data in one end, underwriting out the other. That drawing would describe a live integration and automatic data sharing, and this partnership is neither — so the figure draws the people who have to say yes instead.",
    "Two of the three gates belong to the merchant and one to the lender. None belongs to SHOPLINE or to Cevrynt, which is the point: the partnership coordinates development and qualified referrals, and every decision that matters to a merchant or a lender stays with them.",
  ],
};

const pathAside = {
  title: "Who holds each decision",
  items: [
    { k: "Whether to be referred", v: "The merchant" },
    { k: "What may be shared", v: "The merchant" },
    { k: "Eligibility and pricing", v: "The lender" },
    { k: "The credit decision", v: "The lender" },
  ],
  note: "The partnership coordinates development and qualified referrals. It does not move a merchant's data, set eligibility or fund anything, and lenders remain independent in every decision they make.",
};

const pathClose =
  "Three gates, three yeses, and not one of them given by the partnership itself. That is what a documented development and referral partnership looks like when it is drawn honestly: a route a merchant can choose, not a pipe they are already in.";

const pathNote = `${page.notice} The path shown is illustrative of how a referral is intended to work, not a description of a live production flow.`;

/* 02 — scope, ring by ring ------------------------------------------------- */

const scopeRings = [
  {
    k: "The lender's decision",
    whose: "The lender's alone",
    r: 34,
    decides: true,
    partnership: false,
    items: ["Eligibility", "Pricing", "Approval or decline", "Funding"],
    say: "The centre, and the part nothing else on this page reaches. A referral does not change it, Cevrynt's review informs it without taking it, and the partnership has no part in it at all.",
  },
  {
    k: "Cevrynt's underwriting review",
    whose: "Supports the decision",
    r: 66,
    decides: false,
    partnership: false,
    items: ["Document structuring", "Financial analysis", "Verification and signals", "Policy evaluation", "Evidence-linked report"],
    say: "Close enough to the decision to support it, and never inside it. The same review the rest of this site describes, applied the same way whichever route a file arrived by.",
  },
  {
    k: "The documented partnership",
    whose: "Around the work",
    r: 96,
    decides: false,
    partnership: true,
    items: ["Developing e-commerce merchant-underwriting workflows", "Coordinating qualified referrals"],
    say: "The outer ring, and deliberately the smallest in what it contains: development work on e-commerce merchant-underwriting workflows, and the coordination of qualified referrals. It sits around the review and the decision and reaches into neither.",
  },
];

const scopeOutside = [
  "A generally available live integration",
  "An investment",
  "Exclusivity",
  "An endorsement",
  "Automatic data sharing",
  "Universal merchant eligibility",
  "Guaranteed funding",
];

const scopeReadout = {
  figures: [
    { of: "rings", k: "Rings of scope" },
    { of: "outside", k: "Things the partnership is not" },
    { of: "decisions", k: "Decisions the partnership takes", tone: "none" },
  ],
  svgK: "Three concentric rings: the lender's decision at the centre, Cevrynt's underwriting review around it, and the documented partnership around both.",
  outsideK: "Outside every ring",
  restK: "The decision is in the middle",
  restB:
    "Choose a ring to read what sits inside it. The partnership is the outer ring: it surrounds the work, and reaches neither the review nor the decision.",
  saidK: "Why the outside is listed at the same weight",
  saidB: [
    "A reader who only saw what a partnership includes would fill in the rest for themselves, and the usual assumptions about a platform partnership — an integration, an investment, an endorsement, some kind of eligibility — are exactly the ones that are not true here.",
    "So the seven things this partnership is not sit beside the three rings it is, in the same type and at the same size. The shape does the rest: the decision is at the centre, and the partnership is the ring furthest from it.",
  ],
};

const scopeAside = {
  title: "What the partnership documents",
  items: [
    { k: "Workflow development", v: "Documented" },
    { k: "Qualified referrals", v: "Coordinated" },
    { k: "Lender eligibility", v: "Independent" },
    { k: "Credit decisions", v: "Independent" },
  ],
  note: "Cevrynt is not a lender. It issues no approval, decline or price, and lenders retain final authority over every file — including every file that arrived through a referral.",
};

const scopeClose =
  "Three rings, and the partnership is the outermost. It surrounds the work of building better e-commerce merchant underwriting; it does not reach the review, and it never reaches the decision.";

const scopeNote =
  "Describes the scope of a documented development and referral partnership around e-commerce merchant-underwriting workflows. It does not imply a generally available live integration, an investment, exclusivity, an endorsement, automatic data sharing, universal merchant eligibility or guaranteed funding.";

/* 03 — questions being worked through -------------------------------------- */

const questionSources = [
  { k: "Bank statements", sub: "Already in any file", kind: "file" },
  { k: "Commerce context", sub: "Only if authorised", kind: "conditional" },
  { k: "Lender policy", sub: "Only the lender", kind: "lender" },
];

/* needs: [bank statements, commerce context, lender policy]. None is live. */
const questionList = [
  {
    k: "Do payout schedules explain the gaps between deposits?",
    needs: [true, true, false],
    live: false,
    say: "A bank statement shows when money arrived, not why it arrived on that day. Whether payout timing accounts for the quiet stretches between deposits is a question that needs both records — and the commerce half is only ever available where a merchant has authorised it for the workflow.",
  },
  {
    k: "How much of a month's sales came back as refunds or disputes?",
    needs: [true, true, false],
    live: false,
    say: "Refunds and disputes are settled before a payout reaches the bank, so a deposit alone cannot show them. The question is how that context could sit beside the bank evidence in a review, not a claim that it already does.",
  },
  {
    k: "Are platform fees already netted out of what the bank shows?",
    needs: [true, true, false],
    live: false,
    say: "A net settlement and gross sales can look like the same business or very different ones depending on what was taken out before payout. Working out how that should be presented to an underwriter is development work, not a feature.",
  },
  {
    k: "Does order volume follow the same seasonality as deposits?",
    needs: [true, true, false],
    live: false,
    say: "If a slow month in the bank matches a slow month in orders, that is one kind of file; if it does not, that is another. Comparing the two is one of the questions being explored, with the bank statement as the part that is always present.",
  },
  {
    k: "Which of these signals should a lender's policy actually use?",
    needs: [false, false, true],
    live: false,
    say: "The one question neither partner answers. Whether commerce context has any place in a lender's criteria is written by the lender, in the lender's policy, and nothing about the partnership decides it for them.",
  },
];

const questionReadout = {
  figures: [
    { of: "all", k: "Questions being worked through" },
    { of: "conditional", k: "That need commerce context, only if authorised" },
    { of: "lender", k: "Only a lender can answer" },
    { of: "live", k: "That are live features", tone: "none" },
  ],
  questionK: "Question",
  statusK: "Status",
  exploringK: "Being explored",
  liveK: "Live",
  neededK: "needed",
  notNeededK: "not needed",
  legendFileK: "Available in any file",
  legendConditionalK: "Only where the merchant has authorised it",
  legendLenderK: "Written by the lender",
  restK: "Questions, not features",
  restB:
    "Choose a question to read what it is actually asking. Every row carries the same status on purpose: these are questions the partnership is working through, and none of them describes something that is available today.",
  saidK: "Why the page lists questions instead of capabilities",
  saidB: [
    "A development partnership is easy to overstate. Put a question in a product-page layout and it reads like a feature, and the gap between the two is precisely what a lender or merchant is entitled to know about. So everything here is phrased as a question and marked with the one status that is true of all of them.",
    "The marks are the other half of the honesty. Four of these questions need commerce context, and commerce context is conditional in a way bank statements are not — which is why those marks are drawn open, inside a dashed ring, and why the next section is about what has to be true before any of it is used.",
  ],
};

const questionAside = {
  title: "What a question here is not",
  items: [
    { k: "A shipped capability", v: "No" },
    { k: "A commitment to a date", v: "No" },
    { k: "Data already being used", v: "No" },
    { k: "A change to lender policy", v: "No" },
  ],
  note: "These are the e-commerce merchant-underwriting questions the partnership exists to develop. Where commerce context would help answer one, it depends on the conditions set out in the next section — and the lender decides whether it has any place in the review at all.",
};

const questionClose =
  "Five questions, one status. Four would need commerce context a merchant has authorised, one can only be answered by a lender, and none is a feature — which is the most useful thing a development partnership page can say plainly.";

const questionNote =
  "Describes the development focus of a documented development and referral partnership around e-commerce merchant-underwriting workflows. It does not describe available functionality, a generally available integration or automatic data sharing.";

/* 04 — four conditions, joined by "and" ------------------------------------ */

/* The four conditions are the ones the homepage and FAQ already name for any
   production data flow: implementation, merchant authorisation, permitted data
   access, and the lender's use case. */
const gateConditions = [
  {
    k: "A specific implementation, agreed for the use case",
    who: "Agreed for that use case",
    byPartnershipAlone: false,
    b: "There is no general-purpose connection to switch on. Anything beyond submitted documents depends on an implementation agreed for the specific use case.",
  },
  {
    k: "The merchant's authorisation",
    who: "The merchant",
    byPartnershipAlone: false,
    b: "Given by the merchant, for this workflow. Being on the platform is not authorisation, and without it nothing is used.",
  },
  {
    k: "Permitted data access",
    who: "The agreed data scope",
    byPartnershipAlone: false,
    b: "Only what the permitted access covers, and only for the purpose it was permitted for — not everything a platform happens to hold.",
  },
  {
    k: "A lender use case that calls for it",
    who: "The lender",
    byPartnershipAlone: false,
    b: "The lender decides whether commerce context has any place in its review. A lender that does not use it is not missing anything the partnership requires.",
  },
];

const gateOutputs = {
  on: {
    k: "Commerce context may inform this review",
    b: "Alongside the submitted documents, within the permitted scope, for this workflow — and still as context for the lender's own decision, never as the decision.",
  },
  off: {
    k: "Submitted documents only",
    b: "The file is worked exactly like any other. Nothing is assumed, nothing is filled in, and what is missing is named:",
  },
};

const gateReadout = {
  figures: [
    { of: "all", k: "Conditions that must all hold" },
    { of: "enough", k: "Missing is enough to fall back" },
    { of: "alone", k: "Met by the partnership on its own", tone: "none" },
  ],
  tryK: "Switch conditions on to see what changes · they start off because nothing is assumed",
  allOnK: "Turn all four on",
  resetK: "Reset",
  gateK: "All four",
  openK: "All four hold",
  closedK: "Not all four hold",
  saidK: "Why a gate, and not a list",
  saidB: [
    "Every page on this site that mentions SHOPLINE says the same thing: any production data flow depends on the specific implementation, merchant authorisation, permitted data access and the lender's use case. Written as a sentence, that reads like four considerations. It is four conditions joined by \"and\".",
    "So the figure computes it. Turn one off and the output falls back to submitted documents and names what is missing. The switches start off because that is the honest default, and none of the four can be met by the partnership on its own — two belong to the merchant and the lender outright.",
  ],
};

const gateAside = {
  title: "When a condition is missing",
  items: [
    { k: "Commerce context used anyway", v: "Never" },
    { k: "Gaps filled by inference", v: "Never" },
    { k: "The file still worked", v: "From documents" },
    { k: "What is missing", v: "Named" },
  ],
  note: "The partnership does not imply a generally available live integration or automatic data sharing. Where the conditions are not all in place, a merchant's file is reviewed from the documents submitted, and the lender's authority over the decision is unchanged either way.",
};

const gateClose =
  "Four conditions, one gate, and the gate opens only when all four are true. That is the whole of what \"it depends on the implementation, the merchant's authorisation, permitted access and the lender's use case\" means — drawn so it cannot be read as anything looser.";

const gateNote =
  "An illustration of the conditions the site already states for any production data flow under the partnership. It is not a description of a live integration, and switching conditions on here does not represent any merchant's actual authorisation or any lender's configuration.";

/* 05 — two doors, one file --------------------------------------------------- */

const doorLabels = ["Referred", "Submitted directly"];

/* kind: "same" | "noted" | "conditional". `eased` would mark a stage where a
   referral is held to a lower bar; none is. */
const doorStages = [
  {
    k: "Intake",
    kind: "noted",
    mark: "Origin noted",
    eased: false,
    referred: "Arrives with a note that it came through a referral.",
    direct: "Arrives as a submission, with nothing to note about its route.",
    diff: "Where the file came from is recorded for the audit trail. It is not a signal, and nothing downstream weighs it.",
  },
  {
    k: "Documents",
    kind: "same",
    mark: "Same",
    eased: false,
    referred: "The documents the merchant submits, structured with each figure linked to its page.",
    direct: "The documents the merchant submits, structured with each figure linked to its page.",
    diff: "None. A referral does not replace or shorten the document set.",
  },
  {
    k: "Financials",
    kind: "conditional",
    mark: "Only if all four hold",
    eased: false,
    referred: "Bank-statement analysis, with commerce context alongside it only where all four conditions in section 04 hold.",
    direct: "Bank-statement analysis from the statements submitted.",
    diff: "The one place a referred file could differ — and only as added context. With any condition missing, it is worked exactly like the direct file.",
  },
  {
    k: "Verification",
    kind: "same",
    mark: "Same",
    eased: false,
    referred: "The business compared across the same sources, with conflicts left open until a reviewer settles them.",
    direct: "The business compared across the same sources, with conflicts left open until a reviewer settles them.",
    diff: "None. Arriving through a referral verifies nothing about a business.",
  },
  {
    k: "Fraud signals",
    kind: "same",
    mark: "Same",
    eased: false,
    referred: "The same checks, raising signals for a reviewer to read.",
    direct: "The same checks, raising signals for a reviewer to read.",
    diff: "None. No signal is suppressed or softened because of the route.",
  },
  {
    k: "Policy",
    kind: "same",
    mark: "Same",
    eased: false,
    referred: "The lender's own policy, at the version the lender has active.",
    direct: "The lender's own policy, at the version the lender has active.",
    diff: "None. No rule is relaxed for a referral, and the partnership writes none of them.",
  },
  {
    k: "Report",
    kind: "same",
    mark: "Same",
    eased: false,
    referred: "An evidence-linked report, with open findings left visibly open.",
    direct: "An evidence-linked report, with open findings left visibly open.",
    diff: "None. The report carries the same evidence and the same open items.",
  },
  {
    k: "Human decision",
    kind: "same",
    mark: "The lender's",
    eased: false,
    referred: "Made by the lender's underwriter, including the decision not to fund.",
    direct: "Made by the lender's underwriter, including the decision not to fund.",
    diff: "None. A referral carries no eligibility and no expectation of funding.",
  },
];

const doorReadout = {
  figures: [
    { of: "all", k: "Stages every file passes" },
    { of: "same", k: "Identical whichever way it arrived" },
    { of: "differs", k: "Where the route shows at all" },
    { of: "eased", k: "Stages eased for a referral", tone: "none" },
  ],
  stageK: "Stage",
  diffK: "Difference",
  restK: "Two doors, one line",
  restB:
    "Choose a stage to set the referred file beside the direct one. Six stages are identical. Intake notes the route, and Financials is the one place commerce context could be added — only where all four conditions hold.",
  saidK: "Why a referral gets no lane of its own",
  saidB: [
    "A referral that bought a softer review would be worth less to a lender, not more: every file from that route would need a second look. The value of a referral is that it reaches the same review, under the same policy, as everything else.",
    "So the two doors merge before the first stage. The only mark the route leaves is a note at intake for the audit trail, and the only possible addition is commerce context — which is context for the underwriter, never a substitute for the documents and never a decision.",
  ],
};

const doorAside = {
  title: "What a referral changes",
  items: [
    { k: "The documents required", v: "Nothing" },
    { k: "The checks that run", v: "Nothing" },
    { k: "The lender's policy", v: "Nothing" },
    { k: "Who decides", v: "Nothing" },
  ],
  note: "A referred merchant is reviewed like any other applicant to that lender. The lender may still decline, and a referral is never an indication that it will not.",
};

const doorClose =
  "Two doors, one file. A referral changes how a merchant arrives, not how the file is read — and the lender's decision at the end of the line is the same decision either way.";

const doorNote =
  "An illustration of how a referred file is intended to be treated in the workflow described across this site. It does not describe a live production flow, and commerce context appears only where the conditions in section 04 all hold.";

/* 06 — where each reader goes next ------------------------------------------ */

const readerRoutes = [
  {
    k: "A merchant selling on SHOPLINE",
    means:
      "Cevrynt is software that lenders use to review a financing file. It is not a lender: it does not offer funding, take funding applications, or decide whether a business qualifies.",
    not: "Selling on SHOPLINE does not make a business eligible, pre-approved or referred, and no store data is shared because this partnership exists.",
    go: [
      { label: "Read the FAQ", href: "/faq" },
      { label: "How e-commerce files are reviewed", href: "/solutions/ecommerce-merchant-underwriting" },
    ],
  },
  {
    k: "A lender funding e-commerce merchants",
    means:
      "A route by which qualified e-commerce referrals may be coordinated, and a review that treats each one exactly like any other file under your own policy.",
    not: "No obligation to fund a referral, no eligibility criteria set for you, and no commerce context unless all four conditions hold for your use case.",
    go: [
      { label: "Book a walkthrough", href: "https://calendly.com/arin-cevrynt/cevrynt-demo", external: true },
      { label: "E-commerce merchant underwriting", href: "/solutions/ecommerce-merchant-underwriting" },
    ],
  },
  {
    k: "A commerce or embedded-finance platform",
    means:
      "An example of how a development and referral partnership can be structured: workflow development and coordinated referrals, with every credit decision left with lenders.",
    not: "Not a programme to join or an integration to switch on. Any conversation starts from your own merchants, your permissions and the lenders involved.",
    go: [{ label: "Talk to the founder", href: "mailto:arin@cevrynt.com", external: true }],
  },
];

const readerReadout = {
  figures: [
    { of: "readers", k: "Readers this page is for" },
    { of: "destinations", k: "Places to go next" },
    { of: "applications", k: "Funding applications taken here", tone: "none" },
  ],
  trunkK: "Reading as",
  meansK: "What it means for you",
  notK: "What it does not mean",
  saidK: "Why the merchant's route ends at information",
  saidB: [
    "A page about a platform partnership is easy for a merchant to read as an invitation to apply. It is not one, and the kindest thing the page can do is say so before anybody fills in a form expecting funding.",
    "Lenders and platforms get a conversation, because a walkthrough or a founder call is genuinely where their questions get answered. A merchant gets the FAQ and the explanation of how e-commerce files are reviewed — because the decision about their financing belongs to a lender, not to Cevrynt or SHOPLINE.",
  ],
};

const readerAside = {
  title: "Who to contact, for what",
  items: [
    { k: "Walkthroughs", v: "Calendly" },
    { k: "Partnership questions", v: "arin@cevrynt.com" },
    { k: "Sales enquiries", v: "sales@cevrynt.com" },
    { k: "Funding applications", v: "Not taken" },
  ],
  note: "Cevrynt does not lend, broker or arrange funding. Questions about financing a specific business belong with a lender, and every decision about it stays with that lender.",
};

const readerClose =
  "Three readers, three routes, and not one of them ends in an application — because the only party that can say yes to funding is a lender, and this page should never suggest otherwise.";

const readerNote =
  "Describes where to go for more about a documented development and referral partnership around e-commerce merchant-underwriting workflows. It is not an offer of financing, an application route, or an invitation to a partner programme.";

export default function ShoplinePartnerPage() {
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

      {/* 01 — how a referral is meant to move, drawn as decisions */}
      <section className="sp-path band-light" aria-labelledby="path-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">How a referral moves</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="path-heading"
              text="A route a merchant can choose, not a pipe they are already in."
            />
          </div>
          <p className="eg-lede t-lede">
            Four parties, and between each pair a gate that only opens when a named party says yes. Above the
            track, the shortcuts people assume a platform partnership creates — each one struck through.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ReferralPath
              parties={pathParties}
              gates={pathGates}
              shortcuts={pathShortcuts}
              readout={pathReadout}
              aside={pathAside}
              close={pathClose}
              note={pathNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — what the partnership covers, ring by ring */}
      <section className="sp-scope band-deep" aria-labelledby="scope-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">What it covers</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="scope-heading"
              text="The partnership surrounds the work. The decision sits at the centre, out of its reach."
            />
          </div>
          <p className="eg-lede t-lede">
            Three rings of scope — the lender&rsquo;s decision, Cevrynt&rsquo;s review, and the documented
            partnership — with the seven things it is not set out beside them at the same weight.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ScopeRings
              rings={scopeRings}
              outside={scopeOutside}
              readout={scopeReadout}
              aside={scopeAside}
              close={scopeClose}
              note={scopeNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — what the partnership is working through, as questions */}
      <section className="sp-questions band-light" aria-labelledby="questions-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">What is being developed</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="questions-heading"
              text="Five questions the partnership is working through, and not one feature."
            />
          </div>
          <p className="eg-lede t-lede">
            Each question is marked against where an answer could come from: the bank statements already in any
            file, commerce context only where a merchant has authorised it, or the lender&rsquo;s own policy.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <QuestionGrid
              sources={questionSources}
              questions={questionList}
              readout={questionReadout}
              aside={questionAside}
              close={questionClose}
              note={questionNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — the four conditions, computed rather than listed */}
      <section className="sp-gate band-deep" aria-labelledby="gate-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Before any commerce context is used</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="gate-heading"
              text="Four conditions, joined by “and”. Miss one and the file is worked from documents."
            />
          </div>
          <p className="eg-lede t-lede">
            The implementation, the merchant&rsquo;s authorisation, permitted access and the lender&rsquo;s use
            case — each a switch wired into one gate that only opens when all four hold.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ConditionGate
              conditions={gateConditions}
              outputs={gateOutputs}
              readout={gateReadout}
              aside={gateAside}
              close={gateClose}
              note={gateNote}
            />
          </div>
        </div>
      </section>

      {/* 05 — a referred file and a direct one, stage by stage */}
      <section className="sp-doors band-light" aria-labelledby="doors-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">For lenders</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="doors-heading"
              text="Two doors, one file. A referral changes how a merchant arrives, not how the file is read."
            />
          </div>
          <p className="eg-lede t-lede">
            A referred file and a directly submitted one merge before the first stage and run as one line through
            all eight. Only two stages show the route at all, and neither lowers the bar.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <TwoDoors
              doors={doorLabels}
              stages={doorStages}
              readout={doorReadout}
              aside={doorAside}
              close={doorClose}
              note={doorNote}
            />
          </div>
        </div>
      </section>

      {/* 06 — where each kind of reader goes next */}
      <section className="sp-routes band-deep" aria-labelledby="routes-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">06</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Where to go from here</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="routes-heading"
              text="Three readers, three routes, and none of them is an application."
            />
          </div>
          <p className="eg-lede t-lede">
            A merchant, a lender and a platform read this page for different reasons. Each gets what the
            partnership means for them, what it does not, and where to go next.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ReaderRoutes
              readers={readerRoutes}
              readout={readerReadout}
              aside={readerAside}
              close={readerClose}
              note={readerNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="07"
          kicker="Founder-led"
          heading="Ask what the partnership covers — and what it does not."
          lede="If you lend to e-commerce merchants and want to understand where this work is heading, we will walk you through what the partnership documents, what is still being developed, and where your own policy stays in charge of every decision."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
