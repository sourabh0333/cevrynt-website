import Image from "next/image";
import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { Sentence } from "@/components/about/sentence";
import { AuthorityBar } from "@/components/about/authority-bar";
import { EvidenceShown } from "@/components/about/evidence-shown";
import { BuiltAgainst } from "@/components/about/built-against";
import { PageField } from "@/components/about/page-field";
import { AskMatrix } from "@/components/about/ask-matrix";
import { GateLanes } from "@/components/about/gate-lanes";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

const page = pageByPath.get("about");

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
   Seven sections, built two at a time.

   The content is about the company, not the product. Earlier drafts set out
   the workflow stages and counted what the engine does and does not issue; all
   of that is true and all of it belongs on Platform.

   Each section makes its argument once. Sections 02, 04 and 06 all sit near the
   question of who decides, so the division is deliberate: 02 is who issues the
   disposition, 04 is which work needs a person, 06 is what we get asked to
   build and why it is declined. An earlier draft had 04 and 06 listing the same
   four refusals, and 03 repeats one line from 02 on purpose and says so.

   The full not-a-lender statement sits under 02 and 07 and nowhere else —
   under every figure it stopped reading as care and started reading as
   boilerplate.

   Nothing here claims customers, outcomes, accuracy, certifications or
   funding. Cevrynt is AI-assisted infrastructure: not a lender, and not a party
   to any credit decision made using its output.
   -------------------------------------------------------------------------- */

/* 01 — the sentence the company was started on, set as the section -------- */

const claimParts = [
  { t: "An underwriting " },
  { t: "answer", mark: "1" },
  { t: " is only as strong as the " },
  { t: "evidence", mark: "2" },
  { t: " you can " },
  { t: "trace it back to", mark: "3" },
  { t: "." },
];

const claimReadout = {
  figures: [
    {
      n: "08",
      k: "stages from intake to deal memo",
    },
    {
      n: "03",
      k: "things every material finding should keep",
    },
    {
      n: "01",
      tone: "hold",
      k: "evidence path through the review",
    },
  ],

  from: "From · statement p.4, lines 22–31",

  to: "To · $92,418.60 total deposits",
};

const claimStages = [
  "Intake",
  "Extract",
  "Financials",
  "KYB / KYC",
  "Fraud & Review",
  "Policy",
  "Reanalysis",
  "Deal Memo",
];

const claimNotes = [
  {
    mark: "1",
    phrase: "answer",
    k: "A finding, not the final decision.",
    b: "Cevrynt can calculate, compare, verify, and apply policy, but approval, decline, pricing, conditions, and funding remain with the lender.",
  },
  {
    mark: "2",
    phrase: "evidence",
    k: "The material behind the finding.",
    b: "A document page, transaction, bank period, verification result, submitted field, calculation input, or lender policy rule can remain attached to the conclusion it supports.",
  },
  {
    mark: "3",
    phrase: "trace it back to",
    k: "The source path survives the workflow.",
    b: "Material findings remain connected to their source as they move through analysis, exceptions, reanalysis, and the final underwriting memo.",
  },
];

const claimInsight = {
  k: "What the rule above preserves",

  v: "The evidence path should survive all eight stages. If the source drops away anywhere in the workflow, the finding at the far end becomes harder to verify and easier to misread as an unsupported assertion.",
};

const claimNote =
  "This principle sits underneath the entire product: material underwriting findings should remain connected to the evidence that supports them. Cevrynt is designed to preserve that path across extraction, analysis, verification, policy, reanalysis, and the final memo rather than reconstructing it after the fact. Illustrative file · synthetic borrower data.";

/* 02 — who issues the decision, drawn to scale ---------------------------- */

const heldReadout = {
  figures: [
    {
      n: "04",
      k: "lender dispositions available",
    },
    {
      n: "00",
      tone: "zero",
      k: "issued by Cevrynt",
    },
    {
      n: "01",
      k: "accountable decision owner",
    },
  ],

  lenderK: "Available to the lender",

  usK: "Issued by Cevrynt",

  scale:
    "Cevrynt prepares the underwriting record underneath these choices. The lender selects the disposition and retains responsibility for the outcome.",

  signed: "Who is accountable for building it",
};

const heldDispositions = [
  "Approve",
  "Conditional",
  "Request information",
  "Decline",
];

const heldCommitments = [
  {
    k: "No score replaces lender policy.",
    b: "Commerce activity, cash flow, verification, and risk signals stay visible instead of being collapsed into one universal number that quietly becomes the decision.",
  },
  {
    k: "Exceptions stay visible.",
    b: "When evidence conflicts with the lender's criteria, Cevrynt keeps the observed value, applicable rule, and supporting source in the review.",
  },
  {
    k: "Evidence stays attached.",
    b: "Material findings remain connected to the document, transaction, verification result, calculation, or policy rule that supports them.",
  },
  {
    k: "Claims stop where evidence stops.",
    b: "Product behavior can be demonstrated. Performance, certification, customer-outcome, and scale claims should only appear when there is evidence to support them.",
  },
];

const heldSignature = {
  name: "Arin",
  role: "Founder, Cevrynt",
  email: "arin@cevrynt.com",
};

const heldInsight = {
  k: "What that means today",
  v: "Cevrynt is early and founder-led. Product reviews, lender conversations, workflow questions, and feedback still come directly to the founder.",
};

/* The page's one full statement of the position. It is not repeated under
   every other figure, so it has to be complete here. */
const heldNote =
  "These are operating boundaries, not positioning lines. Cevrynt is built to reduce the work around underwriting while preserving evidence, lender-defined policy, reviewer judgment, and lender accountability. Cevrynt does not originate, fund, or make the final credit decision.";

/* 03 — which of those restrictions a reader can actually be shown ---------- */

const shownReadout = {
  figures: [
    {
      n: "03",
      k: "product behaviors you can inspect",
    },
    {
      n: "01",
      tone: "none",
      k: "claim we withhold until proven",
    },
    {
      n: "01",
      k: "illustrative file used across the views",
    },
  ],

  shown: "Claim · where to inspect it · what to look for",

  look: "Inspect",
};

const shownRows = [
  {
    n: "01",
    k: "The evidence stays attached to the finding.",
    look:
      "A material value keeps the document, page, lines, transaction, or other source reference that supports it — so the reviewer can move from the finding back to the evidence.",
    shot: {
      src: "/media/placeholder/outcame1.png",
      alt: "Illustrative Cevrynt bank analysis view showing source-linked financial findings with the supporting statement page and line references preserved.",
    },
  },
  {
    n: "02",
    k: "The lender's rule stays visible.",
    look:
      "The observed value, configured threshold, policy result, and exception remain visible instead of being collapsed into a generic score or automatic decision.",
    shot: {
      src: "/media/placeholder/outcame4.png",
      alt: "Illustrative Cevrynt policy view showing lender-defined criteria, observed values, thresholds, and an exception held open for review.",
    },
  },
  {
    n: "03",
    k: "New evidence does not erase the earlier review.",
    look:
      "When the file changes, affected findings can be reanalyzed while prior context, exceptions, reviewer actions, and the policy version remain available for comparison.",
    shot: {
      src: "/media/placeholder/outcame3.png",
      alt: "Illustrative Cevrynt review-history view showing source-linked findings, a policy exception, reviewer action, policy version, and preserved prior context.",
    },
  },
];

/* Repeats the second restriction from 02 word for word, and says so — without
   the back-reference it reads as an accidental duplicate rather than the audit
   it is meant to be. */
const shownOpen = {
  k: "The fourth claim · withheld until proven",

  claim: "No performance number without evidence.",

  b: "Cevrynt does not currently publish a universal accuracy figure, approval uplift, funding-rate improvement, or production-scale time-to-decision benchmark. Those claims require representative measured results and a clear methodology, so we leave them out until the evidence exists.",
};

const shownInsight = {
  k: "Why we separate them",

  v: "A product behavior you can inspect is different from a performance claim that depends on measured evidence. Cevrynt keeps those categories separate rather than letting demonstrable product behavior imply results we have not yet proven.",
};

/* The full not-a-lender statement lives in 02 and 07. Repeating it under every
   figure turned five sections into five disclaimers. */
const shownNote =
  "Illustrative Cevrynt product views using synthetic borrower data. The same example file is used across the screens so the source evidence, policy context, and review history can be followed consistently from one view to the next.";

/* 04 — the division of labour --------------------------------------------
   This section used to list the four things Cevrynt will not build, which is
   the same argument section 06 makes with a better figure. It draws the line
   instead: what the platform does, and what it hands to the person reading the
   output. Nothing on the right is a refusal — it is work that needs somebody
   who knows the borrower and the book. */

const builtReadout = {
  figures: [
    {
      n: "07",
      k: "underwriting tasks Cevrynt prepares",
    },
    {
      n: "04",
      tone: "out",
      k: "judgments that stay human",
    },
    {
      n: "01",
      k: "final decision owner",
    },
  ],

  builtK: "Cevrynt prepares this",

  withheldK: "The lender decides this",

  plate: "Illustrative underwriting record · synthetic borrower data",
};
const builtShot = {
  src: "/media/placeholder/outcame3.png",
  alt: "An illustrative Cevrynt decision record: a reason chain running from a policy result through an exception to a recorded human override and a final judgment, beside a panel naming the reviewer, the policy version in force and the written reason the exception was accepted.",
};

const builtItems = [
  "Structure borrower documents and keep source references attached to material fields",

  "Analyze bank activity across deposits, balances, cash flow, NSF activity, transfers, and repayment obligations",

  "Compare submitted business and identity claims with available verification evidence",

  "Surface fraud, document-integrity, and other review signals with supporting evidence attached",

  "Apply lender-configured criteria while keeping observed values, thresholds, and exceptions visible",

  "Incorporate new evidence, update affected findings, and preserve prior review context",

  "Assemble findings, policy outcomes, exceptions, and source-linked evidence into a decision-ready deal memo",
];

const withheldItems = [
  {
    k: "Interpreting an exception in context.",
    b: "Cevrynt can surface the threshold break and the evidence around it. Whether that exception materially changes the case remains a judgment for the lender.",
  },
  {
    k: "Resolving conflicting evidence.",
    b: "Cevrynt can preserve both values and show where each came from. The reviewer determines which evidence should govern the case.",
  },
  {
    k: "Defining the underwriting policy.",
    b: "Eligibility rules, thresholds, exception logic, and risk appetite belong to the lender. Cevrynt applies the configured policy rather than inventing one.",
  },
  {
    k: "Making the final disposition.",
    b: "Approval, decline, conditions, requests for more information, pricing, and funding remain lender actions.",
  },
];

const builtInsight = {
  k: "Why the line sits here",

  v: "Cevrynt handles the work that can be made consistent across files. Context, policy judgment, and accountability stay with the lender because those decisions depend on the borrower, the product, and the lender's own risk appetite.",
};

const builtNote =
  "The seven items above describe what Cevrynt is designed to do, not a claim of universal accuracy, coverage, or performance. Those measures should only be published once there is representative evidence and a clear methodology behind them.";

/* 05 — one file, drawn at its real size ----------------------------------
   The page count, the document count and the pages the headline figures were
   read from all come from the illustrative file already shown elsewhere on
   this site. Nothing here is a claim about speed, reduction or accuracy — the
   argument runs the other way, that the pages stay attached. */

const filePages = 143;

const fileReadout = {
  figures: [
    {
      n: "10",
      k: "source documents in one borrower package",
    },
    {
      n: "143",
      k: "pages mapped into the underwriting review",
    },
    {
      n: "04",
      tone: "lit",
      k: "example findings traced below",
    },
  ],

  fieldLabel:
    "A row of 143 marks, one for each page in a single illustrative underwriting file, shown in page order from left to right. Four marks are highlighted to show example findings traced back to their supporting pages.",

  hoverRest: "Each mark represents one source page · move across to read its number",

  hoverPrefix: "Page",

  litK: "Example findings traced to these pages",
};

/* Page 4 carries the deposits figure because that is the trace the product
   views on this site actually show — page 4, lines 22–31. The other three sit
   further into the pack, which is both what a six-month statement set looks
   like and what keeps the ruler readable. */
const fileLit = [
  {
    page: 1,
    v: "Legal business name",
    b: "Cedar & Stone LLC remains linked to the application field it was extracted from.",
  },
  {
    page: 46,
    v: "Recurring MCA repayment",
    b: "A repeating $1,550 daily ACH pattern is surfaced as an existing repayment obligation while the underlying transactions remain available.",
  },
  {
    page: 84,
    v: "April deposits",
    b: "The $84,613 deposit finding stays linked to the bank statement page and source lines supporting the value.",
  },
  {
    page: 129,
    v: "Bank account evidence",
    b: "Bank proof for the account ending 7123 remains available alongside the account information used elsewhere in the review.",
  },
];

const fileAside = {
  k: "The record this row is drawn from",
  b: "Ten files received, 143 pages linked, and every stage of the trail still pointing back into them. That is the reason the other 139 pages have to stay where they are.",
  shot: {
    src: "/media/placeholder/cevrynt-worked.png",
    alt: "An illustrative Cevrynt decision record for Cedar & Stone LLC: counters reading ten files received, six statements analysed and one policy exception, above a worked underwriting audit trail listing what happened at each stage of the file with the evidence linked to it.",
  },
};

const fileInsight = {
  k: "What the field is actually showing",

  v: "The memo is a map into the evidence, not a replacement for it. The full 143-page package remains available behind the review, so each material finding can be traced back to the source that supports it.",
};

const fileNote =
  "Illustrative file · synthetic borrower data. The document and page counts describe this example package only and should not be read as claims about typical file size, processing speed, reduction, accuracy, or performance.";

/* 06 — what gets asked for, against the tests it would have to pass -------- */

const askReadout = {
  figures: [
    {
      n: "04",
      k: "shortcuts that look faster",
    },
    {
      n: "04",
      k: "tests every idea must pass",
    },
    {
      n: "00",
      tone: "all",
      k: "allowed to quietly move judgment",
    },
  ],

  corner: "Shortcut ↓ · tested against →",

  legend: "Open ring · passes    Struck ring · fails",

  legendNames:
    "01 The lender can inspect it · 02 Judgment stays with the lender · 03 The evidence stays attached · 04 It survives a messy file",

  pass: "passes",

  fail: "fails",
};

const askTests = [
  { k: "The lender can inspect it" },

  { k: "Judgment stays with the lender" },

  { k: "The evidence stays attached" },

  { k: "It survives a messy file" },
];

/* Four distinct verdict patterns, deliberately. An earlier draft had two rows
   failing the same single test with near-identical wording, which made a matrix
   headed "four different requests" contain the same request twice. Every row
   still fails 02 — that is the finding, not a coincidence — but no two rows now
   read the same across the other three. */
const askItems = [
  {
    k: "One universal underwriting score.",
    b: "Collapse the file into a single number that can rank or sort deals.",
    cells: [false, false, false, true],
  },
  {
    k: "An API that returns approve or decline.",
    b: "Submit the file and receive a disposition instead of a review.",
    cells: [true, false, true, true],
  },
  {
    k: "A no-review lane for clean files.",
    b: "Treat the absence of flagged exceptions as permission to proceed automatically.",
    cells: [true, false, true, false],
  },
  {
    k: "A model that infers lender policy.",
    b: "Skip configured criteria and let the system determine thresholds and risk appetite.",
    cells: [false, false, true, true],
  },
];

const askReading = {
  k: "The column that rules them out",

  claim: "Four different shortcuts. The same boundary every time.",

  b: "Test 02 fails for all four. The mechanics differ, but the consequence is the same: judgment moves from the lender into the software. Cevrynt can automate preparation, analysis, and policy evaluation without crossing that line.",

  shot: {
    src: "/media/placeholder/outcame4.png",

    alt: "Illustrative Cevrynt policy view showing a lender-defined rule, an exception held open for review, supporting evidence, and no automatic decline issued.",
  },
};

const askInsight = {
  k: "Why the boundary matters",

  v: "Each shortcut could make the workflow look faster, but each also transfers judgment into the software. Cevrynt is designed to automate the work around the decision without becoming the decision-maker.",
};

const askNote =
  "These examples illustrate product boundaries, not a roadmap or a list of requested features. They show the kinds of shortcuts Cevrynt is deliberately designed not to take when they would weaken inspectability, evidence traceability, or lender control.";
/* 07 — who this is for, run at one gate ----------------------------------- */

const gateReadout = {
  figures: [
    {
      n: "04",
      k: "workflows Cevrynt is built for",
    },
    {
      n: "04",
      tone: "stop",
      k: "workflows outside its product scope",
    },
    {
      n: "01",
      k: "question that settles the fit",
    },
  ],

  gate: "The fit test",

  passK: "Built for this",

  stopK: "Stops here",
};

const gateQuestion = "Does someone on your underwriting team still own the final call?";

const gateLanes = [
  {
    k: "MCA funders reviewing borrower files",
    b: "Bank statements, applications, existing obligations, verification, and policy need to become one reviewable underwriting case.",
  },
  {
    k: "Alternative lenders with lender-defined policy",
    b: "Your thresholds, eligibility rules, and exception logic already exist. Cevrynt helps apply them consistently while keeping the reasoning visible.",
  },
  {
    k: "Underwriting teams that need evidence-linked review",
    b: "Reviewers need to move from a finding back to the document, transaction, verification result, or policy rule that supports it.",
  },
  {
    k: "E-commerce merchant underwriting teams",
    b: "Commerce activity can add operating context alongside bank evidence, borrower documents, verification, and lender policy when approved data is available.",
  },
  {
    stops: true,
    k: "Consumer lending",
    b: "Cevrynt is currently focused on business financing and alternative lending, not consumer-credit workflows.",
  },
  {
    stops: true,
    k: "Fully autonomous credit decisions",
    b: "If the requirement is an unattended engine that returns approve or decline, that sits outside Cevrynt's product boundary.",
  },
  {
    stops: true,
    k: "A system that invents lender policy",
    b: "Cevrynt applies lender-defined criteria rather than inferring risk appetite or quietly substituting its own thresholds.",
  },
  {
    stops: true,
    k: "Lead sourcing or a lender marketplace",
    b: "Cevrynt begins with the underwriting file. It does not originate borrowers, broker deals, or match applicants with capital.",
  },
];

const gateReading = {
  k: "What the built-for workflows receive",

  claim: "A review queue of unresolved issues, not another pile of documents.",

  b: "Cevrynt structures the evidence, resolves what can be verified, and keeps conflicts, mismatches, and open questions attached to their sources. The remaining queue is there for an underwriter to judge — which is why the fit test starts with whether a person still owns the call.",

  shot: {
    src: "/media/placeholder/outcame2.png",

    alt: "Illustrative Cevrynt verification view showing borrower claims compared with verification evidence, one mismatch held open for review, both source values preserved, and no automatic decline issued.",
  },
};

const gateInsight = {
  k: "Why we publish the boundary",

  v: "A clear fit test saves both sides time. Cevrynt is built for teams that want less manual underwriting work while keeping human judgment, lender-defined policy, and final decision authority in place.",
};

const gateNote =
  "These lanes describe Cevrynt's current product focus, not customer relationships or a statement about how any particular lender operates. They do not imply that a named lender uses Cevrynt, nor do they constitute an offer, approval, or guarantee of financing.";

export default function AboutPage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cevrynt",
    url: siteConfig.url,
    description: page.description,
  };

  return (
    <main id="main-content">
      <JsonLd data={orgJsonLd} />

      {/* Hero unchanged — the same composition PageShell renders for this page. */}
      <HeroMotion>
        <div className="page-hero-dark-inner">
          <PageHeroCopy heading={page.title} lede={page.description} />
          <div className="hero-actions">
            <RainbowCta href={page.ctaHref || calendlyUrl} label={page.cta || "Talk to the founder"} />
          </div>
        </div>
        {/* The same illustrative workspace the homepage opens on, in the same
            folded frame. */}
        <div className="hero-dashboard-wrap">
          <div className="hero-dashboard-frame">
            <div className="hero-dashboard-float">
              <Image
                src="/media/cevrynt-dashboard-website-analytics.webp"
                alt="Illustrative Cevrynt underwriting workspace showing business verification, cash-flow analysis, fraud review, and underwriting status"
                width={1672}
                height={941}
                priority
                loading="eager"
                sizes="(max-width: 760px) 96vw, 1180px"
              />
            </div>
          </div>
        </div>
      </HeroMotion>

      {/* 01 — why the company exists */}
      <section className="ab-why band-light" aria-labelledby="why-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">WHY THIS EXISTS</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="why-heading"
              text="One principle runs through the whole product."
            />
          </div>
          <p className="eg-lede t-lede">
            Every stage can transform the file — extracting, calculating, comparing, checking, or applying policy. But the source path should survive the transformation. Otherwise a faster answer is simply harder to review.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <Sentence
              claim={claimParts}
              stages={claimStages}
              notes={claimNotes}
              insight={claimInsight}
              note={claimNote}
              readout={claimReadout}
            />
          </div>
        </div>
      </section>

      {/* 02 — what the company holds itself to */}
      <section className="ab-signed band-deep" aria-labelledby="signed-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">WHAT WE HOLD OURSELVES TO</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="signed-heading"
              text="The review is ours to prepare. The decision is theirs to own."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt can extract, calculate, compare, verify, apply policy, surface exceptions, and assemble the underwriting record. It does not turn those outputs into an automatic approval or decline. The final disposition stays with the lender.

          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <AuthorityBar
              dispositions={heldDispositions}
              commitments={heldCommitments}
              signature={heldSignature}
              insight={heldInsight}
              note={heldNote}
              readout={heldReadout}
            />
          </div>
        </div>
      </section>

      {/* 03 — which of those you can actually be shown */}
      <section className="ab-shown band-light" aria-labelledby="shown-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">CHECKABLE, NOT CLAIMABLE</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="shown-heading"
              text="Three claims you can inspect. One we will not invent."
            />
          </div>
          <p className="eg-lede t-lede">
            A product claim should have something behind it that a lender can actually inspect. These three can be demonstrated inside Cevrynt. 
            The fourth requires performance evidence we do not yet have, so we do not make it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <EvidenceShown
              rows={shownRows}
              open={shownOpen}
              insight={shownInsight}
              note={shownNote}
              readout={shownReadout}
            />
          </div>
        </div>
      </section>

      {/* 04 — the boundary, published instead of a roadmap */}
      <section className="ab-built band-deep" aria-labelledby="built-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">DIVISION OF LABOUR</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="built-heading"
              text="Automate the preparation. Preserve the judgment."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt handles the repetitive, evidence-heavy work around underwriting.
             The lender still decides what the evidence means when context, policy, or accountability requires human judgment.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <BuiltAgainst
              built={builtItems}
              withheld={withheldItems}
              shot={builtShot}
              insight={builtInsight}
              note={builtNote}
              readout={builtReadout}
            />
          </div>
        </div>
      </section>

      {/* 05 — one file, at its real size */}
      <section className="ab-file band-light" aria-labelledby="file-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">WHAT ONE FILE BECOMES</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="file-heading"
              text="143 pages in. One review out. The evidence stays behind it."
            />
          </div>
          <p className="eg-lede t-lede">
            A useful underwriting memo should make a large borrower package easier to review without pretending 
            the package disappeared. Cevrynt structures the file, surfaces the material findings, and keeps the path back to the supporting evidence available.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PageField
              pages={filePages}
              lit={fileLit}
              aside={fileAside}
              insight={fileInsight}
              note={fileNote}
              readout={fileReadout}
            />
          </div>
        </div>
      </section>

      {/* 06 — what gets asked for, tested */}
      <section className="ab-ask band-deep" aria-labelledby="ask-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">06</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">WHAT WE WON'T OPTIMIZE AWAY</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="ask-heading"
              text="Four tempting shortcuts. One boundary rules them out."
            />
          </div>
          <p className="eg-lede t-lede">
            Every new Cevrynt workflow should pass four tests: can the lender inspect it, does judgment stay with the lender, does the evidence remain attached, and does it still work when the file is messy? The important column is the 
            second one — each shortcut below would quietly move judgment toward the software.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <AskMatrix
              tests={askTests}
              asks={askItems}
              reading={askReading}
              insight={askInsight}
              note={askNote}
              readout={askReadout}
            />
          </div>
        </div>
      </section>
      {/* 07 — who it is for, run at one gate */}
      <section className="ab-gate band-light" aria-labelledby="gate-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">07</span>
          <div className="eg-head">
            <p className="hx-kicker">WHO THIS IS FOR</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="gate-heading"
              text="Four workflows we are built around. Four we are not."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt fits underwriting operations where software prepares the evidence and a person still owns the judgment. If the goal is to remove the reviewer entirely, originate consumer credit,
             or turn underwriting into lead routing, this is a different product.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <GateLanes
              question={gateQuestion}
              lanes={gateLanes}
              reading={gateReading}
              insight={gateInsight}
              note={gateNote}
              readout={gateReadout}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="08"
          kicker="FOUNDER-LED"
          heading="Bring the messy file. Ask the hard questions."
          lede="If you are evaluating Cevrynt, bring the underwriting case, policy exception, evidence conflict, workflow constraint, or edge case your team actually deals with. We will show you what Cevrynt can handle today, where it still needs work, and how it fits around the judgment your team already owns."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
