import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { StageShelf } from "@/components/resources/stage-shelf";
import { ReadingRoutes } from "@/components/resources/reading-routes";
import { ReadThenSee } from "@/components/resources/read-then-see";
import { QuestionIndex } from "@/components/resources/question-index";
import { TermGlossary } from "@/components/resources/term-glossary";
import { JsonLd } from "@/components/json-ld";
import { pageByPath, workflow } from "@/content/site-pages";
import { posts } from "@/content/blog";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

const page = pageByPath.get("resources");

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
   The resource hub, same architecture as the product pages, over the
   band-light / band-deep sequence. Everything on it is built from the blog's
   own metadata — each guide's workflow stage, category, reading time and
   related pages — so the hub cannot drift from the articles it points to, and
   no count on it is typed by hand.

   01 shelves every staged guide over its workflow stage, spine height as
      reading time, with the whole-workflow guides as a bracket over all eight.
   02 lays guides out as reading routes for the kinds of reader the site
      serves, with the guides shared between routes computed as interchanges.
   03 pairs three guides with the illustrative product view that matches them,
      pinning each guide's own section headings onto the screen.
   04 indexes every FAQ question in the library, searchable as you type, with
      a strip that is also a histogram of where the matches live.
   05 defines the terms the guides lean on, A to Z, each linked to the guide
      section that explains it; every link target is checked at build time.
   -------------------------------------------------------------------------- */

/* Short names for the pages a guide relates to; the page titles themselves
   are headlines. */
const relatedLabels = {
  "product/document-intelligence": "Document Intelligence",
  "product/bank-statement-analysis": "Bank Statement Analysis",
  "product/business-verification": "Business Verification",
  "product/fraud-signals": "Fraud Signals",
  "product/policy-engine": "Policy Engine",
  "product/underwriting-report": "Underwriting Report",
  platform: "The platform",
  "why-cevrynt": "Why Cevrynt",
  security: "Security",
  "solutions/merchant-cash-advance": "Merchant Cash Advance",
  "solutions/alternative-lenders": "Alternative Lenders",
  "solutions/brokers-isos": "Brokers & ISOs",
  "solutions/ecommerce-merchant-underwriting": "E-commerce Merchant Underwriting",
  "partners/shopline": "Cevrynt × SHOPLINE",
};

const oldestFirst = [...posts].sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));

function guideOf(post) {
  const path = (post.relatedProductPaths || [])[0];
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    minutes: post.readingTime,
    product: path && relatedLabels[path] ? { label: relatedLabels[path], href: `/${path}` } : null,
  };
}

/* 01 — the shelf ------------------------------------------------------------ */

const stageShelves = workflow.map((stage) => ({
  stage,
  guides: oldestFirst.filter((p) => p.workflowStage === stage).map(guideOf),
}));

const acrossGuides = oldestFirst
  .filter((p) => !p.workflowStage && p.category === "Underwriting Workflow")
  .map(guideOf);

const shelfReadout = {
  figures: [
    { of: "staged", k: "Guides on a single stage" },
    { of: "across", k: "Guides across the whole workflow" },
    { of: "covered", k: "Stages with guides of their own" },
    { of: "uncovered", k: "Stages without one yet", tone: "gap" },
  ],
  acrossK: "Across the whole workflow",
  emptyK: "No guide yet",
  noneK: "Covered above",
  readK: "Read the guide",
  restK: "Spine height is reading time",
  restB:
    "Point at a spine, or tab to it, to read what the guide covers, how long it takes and which part of Cevrynt it relates to. Every spine is a link straight to the article.",
  saidK: "Why the library is shelved by stage",
  saidB: [
    "An underwriting team rarely goes looking for \"fraud content\". It goes looking for help with the part of the file it is stuck on — the statements, the verification, the rule a deal keeps missing. So the guides stand over the stage they help with, in the same order as the workflow the rest of this site describes.",
    "The empty shelves are left empty on purpose. Intake and the human decision have no guide of their own yet; what covers them today are the four guides that span the whole workflow, drawn as a bracket over every stage rather than squeezed onto a shelf they do not belong to.",
  ],
};

const shelfAside = {
  title: "How the shelf is built",
  items: [
    { k: "Where a guide stands", v: "Its own stage tag" },
    { k: "Spine height", v: "Reading time" },
    { k: "Order on a shelf", v: "Oldest first" },
    { k: "Audience guides", v: "Routes, in 02" },
  ],
  note: "Nothing on the shelf is placed by hand. Each guide's stage, category and reading time come from the article itself, so a new guide appears over its stage the moment it is published.",
};

const shelfClose =
  "Six stages with guides of their own, two covered by the guides that span them all, and every spine a link. The shelf shows where the writing is deep, where it is thin, and exactly how long each part takes to read.";

const shelfNote =
  "Built from each article's workflow stage, category and reading-time estimate. The guides are general perspectives on underwriting practice for lending teams; they are not legal, compliance or credit advice.";

/* 02 — reading routes ------------------------------------------------------- */

const bySlug = new Map(posts.map((p) => [p.slug, p]));

/* Stop names are shortened for the map; each stop keeps its full title. */
const shortTitles = {
  "bank-statement-analysis-for-underwriting-guide": "Bank statement analysis, the complete guide",
  "dscr-average-daily-balance-mca-underwriting-metrics": "ADB, DSCR and deposit consistency",
  "detecting-stacking-in-merchant-cash-advance-underwriting": "Detecting stacking",
  "bust-out-fraud-in-mca-lending": "Bust-out fraud in MCA lending",
  "cash-flow-underwriting-for-smb-loans": "Cash flow underwriting for SMB loans",
  "revenue-based-financing-underwriting-vs-term-loans": "Revenue-based financing vs. term loans",
  "nsf-patterns-overdrafts-underwriting-risk-signal": "NSF patterns and overdrafts",
  "ecommerce-merchant-underwriting-shopify-marketplace-sellers": "Underwriting Shopify and marketplace sellers",
  "kyb-for-lenders-business-verification-guide": "KYB for lenders",
  "document-fraud-detection-in-underwriting": "Document fraud detection",
  "how-brokers-isos-submit-cleaner-deals-faster-decisions": "Submitting cleaner deals",
  "hidden-cost-of-manual-document-review-mca": "The hidden cost of manual review",
  "source-linked-extraction-underwriting-evidence": "Source-linked extraction",
  "buyers-guide-merchant-cash-advance-underwriting-software": "Buying MCA underwriting software",
  "decision-engine-vs-underwriting-engine": "Decision engine vs. underwriting engine",
  "human-in-the-loop-ai-underwriting": "Human-in-the-loop underwriting",
  "explainable-ai-in-underwriting-compliance": "Explainable AI and compliance",
};

function stop(slug) {
  const post = bySlug.get(slug);
  if (!post) throw new Error(`Reading route points at a guide that does not exist: ${slug}`);
  // Every guide on the blog is public; no route stop sits behind a form.
  return { slug, title: post.title, short: shortTitles[slug] || post.title, minutes: post.readingTime, gated: false };
}

const readingRoutes = [
  {
    k: "You fund merchant cash advances",
    stops: [
      "bank-statement-analysis-for-underwriting-guide",
      "dscr-average-daily-balance-mca-underwriting-metrics",
      "detecting-stacking-in-merchant-cash-advance-underwriting",
      "bust-out-fraud-in-mca-lending",
    ].map(stop),
    terminus: { label: relatedLabels["solutions/merchant-cash-advance"], href: "/solutions/merchant-cash-advance" },
  },
  {
    k: "You lend on revenue or cash flow",
    stops: [
      "cash-flow-underwriting-for-smb-loans",
      "revenue-based-financing-underwriting-vs-term-loans",
      "nsf-patterns-overdrafts-underwriting-risk-signal",
      "bank-statement-analysis-for-underwriting-guide",
    ].map(stop),
    terminus: { label: relatedLabels["solutions/alternative-lenders"], href: "/solutions/alternative-lenders" },
  },
  {
    k: "You lend to online sellers",
    stops: [
      "ecommerce-merchant-underwriting-shopify-marketplace-sellers",
      "revenue-based-financing-underwriting-vs-term-loans",
      "kyb-for-lenders-business-verification-guide",
      "document-fraud-detection-in-underwriting",
    ].map(stop),
    terminus: {
      label: relatedLabels["solutions/ecommerce-merchant-underwriting"],
      href: "/solutions/ecommerce-merchant-underwriting",
    },
  },
  {
    k: "You submit deals as a broker or ISO",
    stops: [
      "how-brokers-isos-submit-cleaner-deals-faster-decisions",
      "hidden-cost-of-manual-document-review-mca",
      "source-linked-extraction-underwriting-evidence",
      "detecting-stacking-in-merchant-cash-advance-underwriting",
    ].map(stop),
    terminus: { label: relatedLabels["solutions/brokers-isos"], href: "/solutions/brokers-isos" },
  },
  {
    k: "You are choosing underwriting software",
    stops: [
      "buyers-guide-merchant-cash-advance-underwriting-software",
      "decision-engine-vs-underwriting-engine",
      "human-in-the-loop-ai-underwriting",
      "explainable-ai-in-underwriting-compliance",
    ].map(stop),
    terminus: { label: relatedLabels.platform, href: "/platform" },
  },
];

const routeReadout = {
  figures: [
    { of: "routes", k: "Reading routes" },
    { of: "guides", k: "Guides they stop at" },
    { of: "shared", k: "Interchanges between routes" },
    { of: "gated", k: "Forms before a guide", tone: "none" },
  ],
  routeK: "Route",
  stopsK: "guides",
  alsoK: "also on",
  endK: "Ends at",
  legendStopK: "A guide",
  legendInterK: "On more than one route",
  legendEndK: "The page for that work",
  saidK: "Why a route ends at a page, not a sign-up form",
  saidB: [
    "Four guides in order is about half an hour's reading, and it is enough to know whether the way Cevrynt thinks about underwriting fits the way your team works. The natural next step after that is the page describing your own workflow — not a form asking for your email first.",
    "The interchanges are worth noticing. The bank-statement guide is where an MCA funder and a cash-flow lender start to share a problem; stacking is where a funder and a broker do. Pointing at one lights it on every route it belongs to.",
  ],
};

const routeAside = {
  title: "What a route is",
  items: [
    { k: "Reading order", v: "Suggested" },
    { k: "Where it ends", v: "A page on this site" },
    { k: "Email needed to read", v: "No" },
    { k: "Length", v: "Summed reading time" },
  ],
  note: "Routes are a starting order, not a curriculum. Every guide stands on its own, and the full library — including everything not on a route — is on the shelf above and in the blog.",
};

const routeClose =
  "Five kinds of reader, four guides each, and three places where their routes cross. Start with the line that sounds like your work, and it ends at the page that describes it.";

const routeNote =
  "Route lengths are the sum of each guide's reading-time estimate. Routes are suggested reading orders written for lending teams, and do not describe any customer's evaluation or results.";

/* 03 — read it, then see it ------------------------------------------------- */

/* `x`/`y` place each pin, in percent of the image, just off the edge of the
   part of the view the section is about — never on top of its text. */
const plateSpecs = [
  {
    slug: "what-is-a-loan-policy-engine",
    group: "Policy",
    product: "product/policy-engine",
    image: {
      src: "/media/placeholder/policy-led.png",
      w: 760,
      h: 520,
      alt: "Illustrative policy view: a borrower's revenue, average daily balance and negative-day activity plotted against the lender's own thresholds, with one item needing judgment.",
    },
    marks: [
      { id: "lender-specific-configuration", x: 84.5, y: 4.6, look: "The policy name and version the whole view is evaluated against." },
      { id: "what-good-output-looks-like", x: 2.9, y: 34.6, look: "Each rule shows the lender's threshold, the borrower's value and the outcome on one line." },
      { id: "policy-engine-vs-scoring-model", x: 62.2, y: 21, look: "The item near its limit is surfaced for judgment instead of folded into a score." },
    ],
  },
  {
    slug: "policy-exceptions-overrides-audit-trail",
    group: "Policy",
    product: "product/policy-engine",
    image: {
      src: "/media/placeholder/Exception-aware.png",
      w: 760,
      h: 520,
      alt: "Illustrative exception view: an address mismatch and an out-of-policy negative-day reading kept visible, with the steps a reviewer takes to record a judgment.",
    },
    marks: [
      { id: "exception-vs-override", x: 4.7, y: 62.7, look: "An exception: the observed value sits outside the configured threshold, and says so." },
      { id: "what-a-good-record-includes", x: 69.2, y: 50, look: "Both sources, the policy context, then the judgment, recorded in that order." },
      { id: "why-undocumented-overrides-are-risky", x: 71.1, y: 87.5, look: "Nothing is converted into an approval or decline without a reviewer." },
    ],
  },
  {
    slug: "human-in-the-loop-ai-underwriting",
    group: "Whole workflow",
    product: "why-cevrynt",
    image: {
      src: "/media/placeholder/Human-owned.png",
      w: 760,
      h: 520,
      alt: "Illustrative reviewer view: findings prepared for the call on the left, a named decision owner in the middle, and the reviewer's recorded outcome and override reason on the right.",
    },
    marks: [
      { id: "where-automation-earns-its-place", x: 2.6, y: 19.8, look: "What the software prepares: the financial picture, a verification conflict, a policy exception." },
      { id: "why-full-automation-is-wrong", x: 37, y: 48, look: "The decision has a named owner, and it is a person." },
      { id: "what-it-requires", x: 53.7, y: 49, look: "The outcome, the reviewer's note and the override reason stay on the record together." },
    ],
  },
];

const readPlates = plateSpecs.map((spec) => {
  const post = bySlug.get(spec.slug);
  if (!post) throw new Error(`Plate points at a guide that does not exist: ${spec.slug}`);
  const headings = new Map(post.body.filter((b) => b.type === "h2").map((b) => [b.id, b.text]));
  return {
    slug: post.slug,
    title: post.title,
    minutes: post.readingTime,
    group: spec.group,
    image: spec.image,
    product: { label: relatedLabels[spec.product], href: `/${spec.product}` },
    realFile: false,
    marks: spec.marks.map((m) => {
      if (!headings.has(m.id)) throw new Error(`No section "${m.id}" in ${spec.slug}`);
      return { ...m, heading: headings.get(m.id) };
    }),
  };
});

const plateReadout = {
  figures: [
    { of: "plates", k: "Guides paired with a product view" },
    { of: "marks", k: "Guide sections marked on the views" },
    { of: "real", k: "Real borrower files shown", tone: "none" },
  ],
  readK: "Read",
  marksK: "Where each section shows",
  seeK: "See",
  captionK: "Illustrative product view · synthetic data",
  productK: "In context:",
  saidK: "Why the view sits beside the guide",
  saidB: [
    "\"Keep exceptions visible\" is easy to agree with in a paragraph and hard to picture. Set beside a screen where the exception is visibly still open, the idea stops being abstract — so each guide here is paired with the one view that shows what it argues.",
    "The pins are the guide's own section headings, word for word, and each links straight to that section. Nothing on the screen is a real borrower: these are illustrative views on synthetic data, and every caption says so.",
  ],
};

const plateAside = {
  title: "How to read a plate",
  items: [
    { k: "A numbered pin", v: "A section of the guide" },
    { k: "Its heading", v: "Links to that section" },
    { k: "The view", v: "Illustrative, synthetic" },
    { k: "In context", v: "The product page" },
  ],
  note: "Three guides have a view that matches them closely enough to pin. The rest are on the shelf and routes above; a pairing is added only where the screen genuinely shows what the guide describes.",
};

const plateClose =
  "Read the section, then find it on the screen. Nine headings, three views, and every pin a link back to the paragraph that explains it.";

const plateNote =
  "Product views are illustrative and use synthetic data; they are not a real borrower, lender or decision. Pin positions mark the area of the view each guide section discusses.";

/* 04 — the question index --------------------------------------------------- */

const questionGroups = [
  ...workflow.filter((stage) => posts.some((p) => p.workflowStage === stage)).map((stage) => ({ k: stage, label: stage })),
  { k: "workflow", label: "Whole workflow" },
  { k: "audience", label: "By audience" },
];

const guideName = (title) => title.split(/[:?(]/)[0].trim();

const guideQuestions = oldestFirst.flatMap((post) =>
  (post.faqs || []).map((f) => ({
    q: f.q,
    slug: post.slug,
    guide: guideName(post.title),
    group: post.workflowStage || (post.category === "Solutions" ? "audience" : "workflow"),
  })),
);

const indexReadout = {
  figures: [
    { of: "all", k: "Questions the guides answer" },
    { of: "guides", k: "Guides they come from" },
    { of: "matching", k: "Showing now" },
  ],
  searchK: "Search every question",
  placeholder: "Try stacking, NSF, override or KYB",
  clearK: "Clear",
  stripK: "Filter by where the answer lives",
  allK: "All",
  oneK: "question",
  manyK: "questions",
  noneK: "No matches",
  emptyB: "None of the guides answers that yet. If it is a question your team keeps coming back to, send it over — it may well become the next guide.",
  askK: "Ask the founder",
  moreK: "Show all",
  siteFaq: { label: "Questions about Cevrynt itself? The site FAQ", href: "/faq" },
  saidK: "Why the answers stay in the guides",
  saidB: [
    "Every guide ends with the questions readers most often ask about its subject. Spread across the library they are hard to find, so this index gathers all of them and lets you search as you type. The bars above the list redraw with each keystroke to show which part of the workflow the matches come from.",
    "The answers are deliberately not repeated here. A two-line answer lifted out of a guide loses the reasoning around it, so each row takes you to the guide's own FAQ, where the answer sits next to the explanation it depends on.",
  ],
};

const indexAside = {
  title: "What the index is",
  items: [
    { k: "Where questions come from", v: "Each guide's FAQ" },
    { k: "Where answers live", v: "In the guide" },
    { k: "Search", v: "As you type" },
    { k: "Nothing matches", v: "Ask the founder" },
  ],
  note: "Questions are taken word for word from the guides' FAQ sections and update whenever a guide does. They are general answers about underwriting practice, not advice about a particular file or lender.",
};

const indexClose =
  "Every question the library answers, in one place, and one keystroke from the guide that answers it. If yours is not on the list, that is worth telling us.";

const indexNote =
  "Built from the FAQ section of every published guide. Guides are general perspectives for lending teams and are not legal, compliance or credit advice.";

/* 05 — glossary -------------------------------------------------------------- */

/* Definitions are general, plain-language meanings as the guides use them;
   each points to the guide section that explains the term properly. */
const glossarySpecs = [
  { term: "Average daily balance", abbr: "ADB", group: "Financials", slug: "dscr-average-daily-balance-mca-underwriting-metrics", section: "average-daily-balance", def: "The average of an account's end-of-day balances across a period — a steadier read of liquidity than any one statement's closing balance." },
  { term: "Debt service coverage ratio", abbr: "DSCR", group: "Financials", slug: "dscr-average-daily-balance-mca-underwriting-metrics", section: "debt-service-coverage", def: "Cash available for debt payments divided by the payments due. Below 1.0, the obligations are larger than the cash flow meant to cover them." },
  { term: "Deposit consistency", group: "Financials", slug: "dscr-average-daily-balance-mca-underwriting-metrics", section: "deposit-consistency", def: "How evenly deposits arrive from month to month. A steady business and a volatile one can share the same average." },
  { term: "Lookback period", group: "Financials", slug: "dscr-average-daily-balance-mca-underwriting-metrics", section: "lookback-period-choice", def: "The span of statement history an analysis covers. Every other metric moves when it changes, so it belongs next to every figure." },
  { term: "Non-sufficient funds event", abbr: "NSF", group: "Financials", slug: "nsf-patterns-overdrafts-underwriting-risk-signal", section: "what-nsf-indicates", def: "A payment presented when the account cannot cover it, either returned or paid into overdraft. The pattern matters far more than the count." },
  { term: "Cap and term", group: "Financials", slug: "revenue-based-financing-underwriting-vs-term-loans", section: "cap-and-term", def: "In revenue-based financing, the total to be repaid and the period over which a share of revenue is expected to repay it." },
  { term: "Know your business", abbr: "KYB", group: "Verification", slug: "kyb-vs-kyc-alternative-lenders", section: "kyb-defined", def: "Confirming that a business exists, is in good standing, and is the entity the application says it is." },
  { term: "Know your customer", abbr: "KYC", group: "Verification", slug: "kyb-vs-kyc-alternative-lenders", section: "kyc-defined", def: "Confirming the identity of the people behind the business — owners, officers and whoever signs." },
  { term: "Beneficial owner", group: "Verification", slug: "kyb-vs-kyc-alternative-lenders", section: "beneficial-ownership-intersection", def: "A person who ultimately owns or controls the business, whether or not they appear on the application. Where KYB and KYC meet." },
  { term: "Synthetic business identity", group: "Verification", slug: "shell-companies-synthetic-business-identities-smb-lending", section: "synthetic-identities-defined", def: "A business assembled from real-looking records to borrow against, rather than one that genuinely trades." },
  { term: "Stacking", group: "Fraud", slug: "detecting-stacking-in-merchant-cash-advance-underwriting", section: "why-it-happens", def: "Taking further advances from other funders while existing positions are still being repaid." },
  { term: "Bust-out", group: "Fraud", slug: "bust-out-fraud-in-mca-lending", section: "how-it-unfolds", def: "A scheme that builds a normal-looking history, then draws as much credit as possible in a short window with no intention of repaying." },
  { term: "Composite document", group: "Fraud", slug: "document-fraud-detection-in-underwriting", section: "composite-documents", def: "A document stitched together from parts of genuine ones, so each piece looks authentic on its own." },
  { term: "Policy exception", group: "Policy", slug: "policy-exceptions-overrides-audit-trail", section: "exception-vs-override", def: "A file where an observed value falls outside one of the lender's policy thresholds. It is a finding, not a decision." },
  { term: "Override", group: "Policy", slug: "policy-exceptions-overrides-audit-trail", section: "what-a-good-record-includes", def: "A reviewer's documented decision to proceed differently from what the policy outcome indicated, with the reason recorded." },
  { term: "Decision engine", group: "Policy", slug: "decision-engine-vs-underwriting-engine", section: "decision-engine-defined", def: "The logic layer that renders a result from rules — narrower than an underwriting engine, which covers the whole review." },
  { term: "Source-linked extraction", group: "Report", slug: "source-linked-extraction-underwriting-evidence", section: "what-good-looks-like", def: "Pulling a value from a document while keeping a pointer to the exact page and line it came from." },
  { term: "Audit trail", group: "Report", slug: "underwriting-audit-trails-evidence-linked-decisions", section: "components-of-a-record", def: "The evidence, policy outcome, notes and overrides behind a decision, kept so the decision can be reconstructed later." },
  { term: "Human-in-the-loop", group: "Whole workflow", slug: "human-in-the-loop-ai-underwriting", section: "what-it-requires", def: "A design where software prepares the file and a named person makes — and owns — the decision." },
  { term: "Decision intelligence", group: "Whole workflow", slug: "what-is-decision-intelligence-in-underwriting", section: "workflow-property", def: "Connecting data, analysis and human judgment in one underwriting workflow. A property of the workflow, not a model." },
];

const glossaryTerms = glossarySpecs.map((spec) => {
  const post = bySlug.get(spec.slug);
  if (!post) throw new Error(`Glossary points at a guide that does not exist: ${spec.slug}`);
  const heading = post.body.find((b) => (b.type === "h2" || b.type === "h3") && b.id === spec.section);
  if (!heading) throw new Error(`No section "${spec.section}" in ${spec.slug}`);
  return {
    ...spec,
    id: `term-${spec.term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
    guide: guideName(post.title),
    sectionTitle: heading.text,
  };
});

const glossaryReadout = {
  figures: [
    { of: "terms", k: "Terms defined" },
    { of: "guides", k: "Guides they point into" },
    { of: "groups", k: "Parts of the workflow" },
  ],
  railK: "Jump to a letter",
  termK: "Term",
  meansK: "What it means",
  explainedK: "Explained properly in",
  saidK: "Why each definition is only a sentence or two",
  saidB: [
    "A glossary that tried to explain DSCR or stacking in full would be a worse version of the guide that already does. So each entry gives just enough to keep reading — the meaning as the guides use it — and hands off to the exact section where the term is worked through, with its caveats.",
    "The terms are the ones the library actually leans on, not a dictionary of lending. Each is tagged with the part of the workflow it belongs to, and each link lands on a section heading, not just the top of an article.",
  ],
};

const glossaryAside = {
  title: "How an entry is built",
  items: [
    { k: "The definition", v: "Plain language" },
    { k: "The link", v: "A guide section" },
    { k: "Link targets", v: "Checked at build" },
    { k: "Order", v: "A to Z" },
  ],
  note: "Definitions describe how these terms are generally used in underwriting and in the guides. They are not regulatory definitions and are not advice on any particular file.",
};

const glossaryClose =
  "Twenty terms the library leans on, a sentence each, and a link from every one to the section that explains it properly.";

const glossaryNote =
  "General plain-language definitions for lending teams. Where a lender's own policy defines a term differently, the lender's definition applies.";

export default function ResourcesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: page.group, item: `${siteConfig.url}/${page.path}` },
      { "@type": "ListItem", position: 3, name: page.title, item: `${siteConfig.url}/${page.path}` },
    ],
  };

  const shelved = [...stageShelves.flatMap((s) => s.guides), ...acrossGuides];
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.title,
    itemListElement: shelved.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: `${siteConfig.url}/blog/${g.slug}`,
    })),
  };

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      {/* Hero unchanged — the same composition PageShell renders for this page. */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{page.group}</span>
          </nav>
          <p className="eyebrow">{page.group}</p>
          <h1>{page.title}</h1>
          <p className="page-lede">{page.description}</p>
          <a className="primary-cta" href={page.ctaHref || calendlyUrl} target="_blank" rel="noreferrer">
            {page.cta || "Book a walkthrough"}
            <span>
              <ArrowUpRight />
            </span>
          </a>
        </div>
        <div className="page-hero-orb" aria-hidden="true" />
      </section>

      {/* 01 — every staged guide, shelved over its workflow stage */}
      <section className="rs-shelf band-light" aria-labelledby="shelf-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">The library, by stage</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="shelf-heading"
              text="Every guide, shelved over the stage of underwriting it explains."
            />
          </div>
          <p className="eg-lede t-lede">
            Each spine is one guide, standing over its workflow stage, and its height is how long it takes to read.
            Two stages have no guide of their own yet, and the shelf leaves them empty.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <StageShelf
              shelves={stageShelves}
              across={acrossGuides}
              readout={shelfReadout}
              aside={shelfAside}
              close={shelfClose}
              note={shelfNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — guides laid out as routes, one per kind of reader */}
      <section className="rs-routes band-deep" aria-labelledby="routes-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Reading routes</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="routes-heading"
              text="Start from the work you do, and follow four guides to the page that describes it."
            />
          </div>
          <p className="eg-lede t-lede">
            One line for each kind of reader, stops in reading order, and the guides two routes share drawn as
            interchanges.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ReadingRoutes
              routes={readingRoutes}
              readout={routeReadout}
              aside={routeAside}
              close={routeClose}
              note={routeNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — three guides beside the product view each one describes */}
      <section className="rs-plates band-light" aria-labelledby="plates-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Read it, then see it</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="plates-heading"
              text="Three guides, each pinned to the screen that shows what it describes."
            />
          </div>
          <p className="eg-lede t-lede">
            Every pin is one of the guide&rsquo;s own section headings, placed on the part of the product view it
            is about. Choose a guide, then follow the numbers.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ReadThenSee
              plates={readPlates}
              readout={plateReadout}
              aside={plateAside}
              close={plateClose}
              note={plateNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — every FAQ question in the library, searchable */}
      <section className="rs-index band-deep" aria-labelledby="index-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Question index</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="index-heading"
              text="Every question the guides already answer, searchable as you type."
            />
          </div>
          <p className="eg-lede t-lede">
            Gathered from the FAQ at the end of every guide. The bars show where in the workflow the matching
            answers live; each row opens the guide that answers it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <QuestionIndex
              questions={guideQuestions}
              groups={questionGroups}
              readout={indexReadout}
              aside={indexAside}
              close={indexClose}
              note={indexNote}
              askHref={`mailto:${founderEmail}`}
            />
          </div>
        </div>
      </section>

      {/* 05 — the terms the guides use, each linked to its section */}
      <section className="rs-glossary band-light" aria-labelledby="glossary-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">Glossary</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="glossary-heading"
              text="The terms the guides lean on, each defined once and linked to where it is explained."
            />
          </div>
          <p className="eg-lede t-lede">
            From ADB to stacking: a sentence or two for each, tagged by the part of the workflow it belongs to,
            and a link to the guide section that works it through.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <TermGlossary
              terms={glossaryTerms}
              readout={glossaryReadout}
              aside={glossaryAside}
              close={glossaryClose}
              note={glossaryNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="06"
          kicker="Founder-led"
          heading="Bring the question your underwriting team keeps coming back to."
          lede="If a guide raised something your team handles differently, we will walk through how Cevrynt shows the evidence for it — against your own criteria, with your underwriters making every decision."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
