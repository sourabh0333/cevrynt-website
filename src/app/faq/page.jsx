import Image from "next/image";
import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { AnswerLedger } from "@/components/faq/answer-ledger";
import { BoundaryLine } from "@/components/faq/boundary-line";
import { ResolutionTrack } from "@/components/faq/resolution-track";
import { FinalCall } from "@/components/faq/final-call";
import { JsonLd } from "@/components/json-ld";
import { posts } from "@/content/blog";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Straightforward answers about what Cevrynt does, who it is for, how lender control is preserved, and how a pilot works.",
  keywords: ["Cevrynt FAQ", "AI underwriting platform questions", "MCA underwriting software FAQ"],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Cevrynt",
    description: "Straightforward answers about what Cevrynt does, who it is for, and how lender control is preserved.",
    url: "/faq",
  },
};

/* --------------------------------------------------------------------------
   The FAQ, same architecture as the product pages: the shared dark hero, then
   the band-light / band-deep sequence. The answers are unchanged and remain the single source
   for the FAQPage JSON-LD; each now also carries a short answer and an anchor.

   01 sets every question on one line with its short answer beside it, the
      full answer opening beneath on request.
   02 draws the line the answers keep drawing — what Cevrynt does against what
      it does not — with every pair citing the question that states it.
   03 draws how far each answer travels before it is finished — this page, a
      walkthrough or a pilot — quoting the sentence that places it.
   04 follows the two answers on who decides through an illustrative reviewer
      view, one spotlighted step at a time.
   Every quote on the page is checked word for word against its answer.
   -------------------------------------------------------------------------- */

/* tone: "no" for a plain no (the boundaries), "yes" for a plain yes, "info"
   for everything that needs a phrase. `short` must never say more than `a`. */
const faqGroups = [
  {
    title: "About Cevrynt",
    items: [
      {
        id: "what-is-cevrynt",
        q: "What is Cevrynt?",
        short: "Underwriting infrastructure",
        tone: "info",
        a: "Cevrynt is an AI-assisted underwriting infrastructure platform for alternative lenders and SMB finance teams. It structures borrower documents and business signals into evidence-linked analysis that human underwriters use to make faster, more consistent decisions.",
      },
      {
        id: "is-cevrynt-a-lender",
        q: "Is Cevrynt a lender?",
        short: "No.",
        tone: "no",
        a: "No. Cevrynt is not a lender and does not make or guarantee funding offers. Cevrynt supports the underwriting process; lenders retain final approval authority in every case.",
      },
      {
        id: "who-is-cevrynt-built-for",
        q: "Who is Cevrynt built for?",
        short: "MCA funders and alternative lenders",
        tone: "info",
        a: "Cevrynt is built primarily for merchant cash advance funders, alternative lenders, and revenue-based finance companies, along with the underwriting, credit, risk, and operations teams inside those organizations. Brokers, ISOs, and commerce platforms are also part of the audience Cevrynt supports.",
      },
      {
        id: "does-cevrynt-replace-human-underwriters",
        q: "Does Cevrynt replace human underwriters?",
        short: "No.",
        tone: "no",
        a: "No. Cevrynt is designed to give underwriters a more complete, evidence-linked picture of a deal faster — not to replace their judgment. Every workflow keeps a human decision-maker in the loop for the final approve, decline, or counter-offer call.",
      },
    ],
  },
  {
    title: "The underwriting workflow",
    items: [
      {
        id: "what-does-the-workflow-cover",
        q: "What does Cevrynt's underwriting workflow actually cover?",
        short: "Intake to a human decision",
        tone: "info",
        a: "Cevrynt connects intake, document structuring, bank-statement and financial analysis, business verification, fraud and risk signals, lender-specific policy evaluation, and evidence-linked reporting into one workflow that ends with a human decision.",
      },
      {
        id: "can-cevrynt-work-with-our-credit-policy",
        q: "Can Cevrynt work with our existing credit policy?",
        short: "Yes — by design",
        tone: "yes",
        a: "Cevrynt is designed to evaluate deals against a lender's own policy, including specific exceptions and override rules, rather than imposing a generic scoring model. Policy configuration is discussed directly during a walkthrough or pilot.",
      },
      {
        id: "when-an-underwriter-disagrees",
        q: "What happens when an underwriter disagrees with a finding?",
        short: "A documented override",
        tone: "info",
        a: "Underwriters can apply a documented override at the policy stage. Reviewer notes, overrides, and audit history are part of the workflow rather than something handled outside the system.",
      },
      {
        id: "approval-rates-accuracy-guarantees",
        q: "Does Cevrynt provide approval rates, accuracy metrics, or performance guarantees?",
        short: "No.",
        tone: "no",
        a: "No. Cevrynt does not publish approval rates, accuracy percentages, or performance guarantees, and does not guarantee universal borrower eligibility. Fit and expected value are best assessed against your own file mix during a walkthrough or pilot.",
      },
    ],
  },
  {
    title: "Security, data, and integrations",
    items: [
      {
        id: "access-and-data-security",
        q: "How does Cevrynt handle access and data security?",
        short: "Reviewed with you before a pilot",
        tone: "info",
        a: "Access controls, data handling, audit requirements, and deployment requirements are reviewed directly with the Cevrynt team before a pilot. See the [security page](/security) for what to bring to that conversation.",
      },
      {
        id: "loan-origination-integration",
        q: "Does Cevrynt integrate with our existing loan origination system?",
        short: "Scoped case by case",
        tone: "info",
        a: "Integration needs are mapped on a case-by-case basis during a qualified walkthrough. Cevrynt does not claim live integrations that have not been documented and verified for a specific lender's stack. See [integrations](/integrations) for how this is scoped.",
      },
      {
        id: "shopline-live-integration",
        q: "Is the Cevrynt × SHOPLINE partnership a live integration?",
        short: "No.",
        tone: "no",
        a: "No. It is a documented development and referral partnership exploring e-commerce merchant-underwriting workflows. It does not imply a generally available live integration, automatic data sharing, universal merchant eligibility, or guaranteed funding. See the [partnership page](/partners/shopline) for details.",
      },
    ],
  },
  {
    title: "Getting started",
    items: [
      {
        id: "public-pricing",
        q: "Does Cevrynt publish pricing?",
        short: "No.",
        tone: "no",
        a: "No. Cevrynt does not publish public pricing. The website is built around qualified walkthroughs and pilot conversations rather than self-serve signup, so pricing and scope are discussed directly with your team.",
      },
      {
        id: "what-happens-during-a-pilot",
        q: "What happens during a pilot?",
        short: "A bounded, founder-led workflow",
        tone: "info",
        a: "A pilot starts with a focused, bounded workflow: representative files, lender-specific review criteria, and clear evaluation goals defined directly with the founder. Human approval authority stays explicit throughout. See [pilot](/pilot) for more detail.",
      },
      {
        id: "book-a-walkthrough",
        q: "How do I book a walkthrough?",
        short: "Calendly, or email the founder",
        tone: "info",
        a: "You can [book a walkthrough directly on Calendly](https://calendly.com/arin-cevrynt/cevrynt-demo), reach founder-led sales at arin@cevrynt.com, or contact sales@cevrynt.com for other enquiries.",
      },
      {
        id: "cedar-and-stone",
        q: "What is the 'Cedar & Stone LLC' deal referenced across the site?",
        short: "An illustrative deal",
        tone: "info",
        a: "It is a single, persistent illustrative deal used across Cevrynt's product storytelling to demonstrate how the workflow behaves on a representative file. It is clearly labeled as illustrative and does not represent a real borrower, customer, or completed transaction.",
      },
      {
        id: "sign-in-vs-demo",
        q: "How is Sign In different from booking a demo?",
        short: "Existing users vs. new lenders",
        tone: "info",
        a: "Sign In links to the separate Cevrynt application for existing users. Booking a demo or walkthrough is for prospective lenders evaluating the platform for the first time.",
      },
    ],
  },
];

const allQuestions = new Map(faqGroups.flatMap((g) => g.items).map((i) => [i.id, i]));

/* These answers are about Cevrynt. Questions about underwriting practice are
   answered at the end of each guide and indexed on /resources; the count is
   taken from the guides so it can never go stale. */
const guideQuestionCount = posts.reduce((n, p) => n + (p.faqs?.length || 0), 0);

const guidesLink = {
  k: "About underwriting itself, not Cevrynt?",
  label: `Search the ${guideQuestionCount} questions answered in the guides`,
  href: "/resources#index-heading",
};

/* 01 — the ledger ----------------------------------------------------------- */

const ledgerReadout = {
  figures: [
    { of: "all", k: "Questions answered" },
    { of: "groups", k: "Groups" },
    { of: "no", k: "Answered with a plain no", tone: "no" },
    { of: "figures", k: "Answers quoting a performance number", tone: "none" },
  ],
  tryK: "Choose a question to open its full answer",
  openAllK: "Open every answer",
  closeAllK: "Close every answer",
  questionK: "Question",
  shortK: "Short answer",
  questionsK: "questions",
  saidK: "Why the short answer comes first",
  saidB: [
    "Most people arrive at an FAQ with one question and want to know straight away whether the answer is yes or no. So each question sits on one line with its short answer beside it, and the full reasoning opens underneath only if you want it.",
    "The plain noes are set apart in amber because they are the boundaries — not a lender, not a replacement for the underwriter, no published approval rates, no live SHOPLINE integration, no public pricing. The short answers never say more than the full ones; they only say it first.",
  ],
};

const ledgerAside = {
  title: "How to read a row",
  items: [
    { k: "Amber", v: "A plain no" },
    { k: "Green", v: "A plain yes" },
    { k: "Ink", v: "Needs a phrase" },
    { k: "Full answer", v: "Opens beneath" },
  ],
  note: "Every question has its own link. Share the address of a row and it opens on arrival — which is also how the citations in the next section work.",
};

const ledgerClose =
  "Sixteen questions, each with its answer in a few words first. Five of them are a plain no, and none of them quotes a number Cevrynt could not stand behind.";

const ledgerNote =
  "Answers describe how Cevrynt works and what it does not claim. Lenders retain final approval authority in every case; nothing here is a funding offer or a performance guarantee.";

/* 02 — the boundary line ---------------------------------------------------- */

function cite(id) {
  const q = allQuestions.get(id);
  if (!q) throw new Error(`Boundary cites a question that does not exist: ${id}`);
  return { id, q: q.q };
}

const boundaryPairs = [
  {
    does: "Supports the underwriting process with evidence-linked analysis",
    doesNot: "Lend, or make or guarantee funding offers",
    cite: cite("is-cevrynt-a-lender"),
  },
  {
    does: "Gives underwriters a fuller, evidence-linked picture of each deal",
    doesNot: "Replace the underwriter's judgment on the final call",
    cite: cite("does-cevrynt-replace-human-underwriters"),
  },
  {
    does: "Evaluates deals against the lender's own policy",
    doesNot: "Impose a generic scoring model",
    cite: cite("can-cevrynt-work-with-our-credit-policy"),
  },
  {
    does: "Keeps overrides, reviewer notes and audit history in the workflow",
    doesNot: "Leave disagreements to be handled outside the system",
    cite: cite("when-an-underwriter-disagrees"),
  },
  {
    does: "Assesses fit against your own file mix in a walkthrough or pilot",
    doesNot: "Publish approval rates, accuracy percentages or guarantees",
    cite: cite("approval-rates-accuracy-guarantees"),
  },
  {
    does: "Maps integration needs case by case",
    doesNot: "Claim live integrations not documented for your stack",
    cite: cite("loan-origination-integration"),
  },
  {
    does: "Holds a documented development and referral partnership with SHOPLINE",
    doesNot: "Share data automatically, or promise eligibility or funding",
    cite: cite("shopline-live-integration"),
  },
  {
    does: "Discusses pricing and scope directly with your team",
    doesNot: "Publish public pricing",
    cite: cite("public-pricing"),
  },
];

const boundaryReadout = {
  figures: [
    { of: "does", k: "Things Cevrynt does" },
    { of: "doesNot", k: "Things it does not do" },
    { of: "questions", k: "Answers they are taken from" },
  ],
  doesK: "Does",
  doesNotK: "Does not",
  citeK: "Stated in",
  saidK: "Why the boundaries get a section of their own",
  saidB: [
    "Read one at a time, the answers above are separate replies. Read together, half of them draw the same line: what Cevrynt does on one side, and what it pointedly does not do on the other. For a lender deciding whether to take a walkthrough, that line is often the most useful thing on the page.",
    "Nothing here is new. Every pair restates an answer already given above and links back to it, so the two sections can never drift apart — and the right-hand column is exactly what you should expect Cevrynt never to claim.",
  ],
};

const boundaryAside = {
  title: "What stays with the lender",
  items: [
    { k: "Final approval", v: "The lender" },
    { k: "Credit policy", v: "The lender's own" },
    { k: "Overrides", v: "Documented" },
    { k: "Funding offers", v: "Never Cevrynt's" },
  ],
  note: "Cevrynt supports the underwriting process. The approval, the decline, the counter-offer and the policy they are measured against all remain the lender's.",
};

const boundaryClose =
  "Eight things Cevrynt does, eight it does not, and one line between them that every answer on this page respects.";

const boundaryNote =
  "Each pair restates an answer from section 01 and links to it. Where a pair and its answer ever seem to differ, the full answer is the one that applies.";

/* Quotes on this page must be word for word from an answer. */
function quoted(id, text) {
  const q = allQuestions.get(id);
  if (!q) throw new Error(`No question "${id}"`);
  if (!q.a.includes(text)) throw new Error(`The answer to "${id}" does not contain: ${text}`);
  return text;
}

/* 03 — where each answer is finished ---------------------------------------- */

const trackStations = [
  { k: "here", label: "On this page" },
  { k: "walkthrough", label: "In a walkthrough" },
  { k: "pilot", label: "In a pilot" },
];

/* station: the earliest step where the answer is complete. `because` is the
   sentence in the answer that puts it there; `rest` is what stays open. */
const trackSpecs = [
  { id: "what-is-cevrynt", station: 0, because: "It structures borrower documents and business signals into evidence-linked analysis" },
  { id: "is-cevrynt-a-lender", station: 0, because: "Cevrynt is not a lender and does not make or guarantee funding offers." },
  { id: "who-is-cevrynt-built-for", station: 0, because: "built primarily for merchant cash advance funders, alternative lenders, and revenue-based finance companies" },
  { id: "does-cevrynt-replace-human-underwriters", station: 0, because: "not to replace their judgment" },
  { id: "what-does-the-workflow-cover", station: 0, because: "into one workflow that ends with a human decision" },
  { id: "when-an-underwriter-disagrees", station: 0, because: "Underwriters can apply a documented override at the policy stage." },
  { id: "shopline-live-integration", station: 0, because: "It is a documented development and referral partnership" },
  { id: "book-a-walkthrough", station: 0, because: "book a walkthrough directly on Calendly" },
  { id: "cedar-and-stone", station: 0, because: "does not represent a real borrower, customer, or completed transaction" },
  { id: "sign-in-vs-demo", station: 0, because: "Sign In links to the separate Cevrynt application for existing users." },
  { id: "can-cevrynt-work-with-our-credit-policy", station: 1, because: "Policy configuration is discussed directly during a walkthrough or pilot.", rest: "How your own policy, exceptions and override rules are set up" },
  { id: "approval-rates-accuracy-guarantees", station: 1, because: "Fit and expected value are best assessed against your own file mix during a walkthrough or pilot.", rest: "How Cevrynt fits your own file mix" },
  { id: "loan-origination-integration", station: 1, because: "Integration needs are mapped on a case-by-case basis during a qualified walkthrough.", rest: "How Cevrynt fits around your own stack" },
  { id: "public-pricing", station: 1, because: "pricing and scope are discussed directly with your team", rest: "Pricing and scope for your team" },
  { id: "access-and-data-security", station: 2, because: "reviewed directly with the Cevrynt team before a pilot", rest: "Your access, data-handling, audit and deployment requirements" },
  { id: "what-happens-during-a-pilot", station: 2, because: "representative files, lender-specific review criteria, and clear evaluation goals defined directly with the founder", rest: "Your files, your criteria and your evaluation goals" },
];

const trackRows = trackSpecs.map((spec) => ({
  ...spec,
  q: allQuestions.get(spec.id).q,
  because: quoted(spec.id, spec.because),
  rest: spec.rest || null,
}));

const trackReadout = {
  figures: [
    { of: "here", k: "Answered in full on this page" },
    { of: "walkthrough", k: "Finished in a walkthrough" },
    { of: "pilot", k: "Finished in a pilot" },
  ],
  questionK: "Question",
  answeredK: "Answered",
  openK: "Still open until then:",
  nothingK: "Nothing — the answer above is complete.",
  restK: "How far each answer has to travel",
  restB:
    "Each line runs to the step where its answer is finished. Point at a row to read the sentence in that answer that puts it there, and what is left open until then; choose it to jump to the answer.",
  saidK: "Why the page shows where it stops",
  saidB: [
    "Ten of these questions are answered completely right here. Six are not, and pretending otherwise would be the one dishonest thing an FAQ can do: policy configuration, integration, fit, pricing, security review and the pilot itself all depend on your files, your stack and your criteria.",
    "So instead of blurring the difference, the chart draws it. A short line means the page has done its job; a long one means the answer genuinely needs your team in the room — and says exactly which part.",
  ],
};

const trackAside = {
  title: "What decides a line's length",
  items: [
    { k: "Where it stops", v: "Its own answer" },
    { k: "The reason shown", v: "Quoted word for word" },
    { k: "Quotes", v: "Checked at build" },
    { k: "Choosing a row", v: "Opens the answer" },
  ],
  note: "Security requirements are reviewed before a pilot begins, so that line stops at the pilot. A walkthrough is where the remaining questions about your policy, stack, fit and pricing are worked through.",
};

const trackClose =
  "Ten answers finished here, four in a walkthrough, two in a pilot. The page says which is which, and quotes itself to prove it.";

const trackNote =
  "Placement follows the wording of each answer in section 01. A walkthrough or pilot is scoped with the founder; nothing here is an offer, a guarantee or a commitment to a result.";

/* 04 — the final call ------------------------------------------------------- */

function citeQ(id) {
  const q = allQuestions.get(id);
  if (!q) throw new Error(`No question "${id}"`);
  return { id, q: q.q };
}

/* `area` frames the part of the 760 × 520 view each step describes, in
   percent. `decidedBySoftware` is false for every step, and the readout
   counts it. */
const finalSteps = [
  {
    k: "The file arrives prepared, not decided",
    quote: quoted("does-cevrynt-replace-human-underwriters", "give underwriters a more complete, evidence-linked picture of a deal faster"),
    cite: citeQ("does-cevrynt-replace-human-underwriters"),
    area: { x: 2.4, y: 13.2, w: 32.6, h: 66.2 },
    decidedBySoftware: false,
  },
  {
    k: "A named person owns the decision",
    quote: quoted("does-cevrynt-replace-human-underwriters", "Every workflow keeps a human decision-maker in the loop for the final approve, decline, or counter-offer call."),
    cite: citeQ("does-cevrynt-replace-human-underwriters"),
    area: { x: 36.6, y: 25.4, w: 15.4, h: 42 },
    decidedBySoftware: false,
  },
  {
    k: "Disagreement becomes a documented override",
    quote: quoted("when-an-underwriter-disagrees", "Underwriters can apply a documented override at the policy stage."),
    cite: citeQ("when-an-underwriter-disagrees"),
    area: { x: 55, y: 22.7, w: 41.2, h: 23.6 },
    decidedBySoftware: false,
  },
  {
    k: "The reason stays on the record",
    quote: quoted("when-an-underwriter-disagrees", "Reviewer notes, overrides, and audit history are part of the workflow rather than something handled outside the system."),
    cite: citeQ("when-an-underwriter-disagrees"),
    area: { x: 55, y: 46.2, w: 41.2, h: 31.4 },
    decidedBySoftware: false,
  },
];

const finalImage = {
  src: "/media/placeholder/Human-owned.png",
  w: 760,
  h: 520,
  alt: "Illustrative reviewer view: findings prepared for the call on the left, a named decision owner in the middle, and the reviewer's recorded outcome, note and override reason on the right.",
};

const finalReadout = {
  figures: [
    { of: "steps", k: "Steps from finding to decision" },
    { of: "answers", k: "Answers they are quoted from" },
    { of: "software", k: "Steps decided by software", tone: "none" },
  ],
  stepsK: "Follow the call",
  viewK: "On the reviewer view",
  fromK: "From:",
  captionK: "Illustrative product view · synthetic data",
  saidK: "Why the answer is walked through on a screen",
  saidB: [
    "\"Cevrynt does not replace underwriters\" is the kind of sentence every vendor writes. What makes it true or not is what the screen does when an underwriter disagrees — so this section follows one call from the prepared file to the recorded reason, on an illustrative view.",
    "Each step is a sentence from one of the two answers that make the claim, quoted word for word. The spotlight only shows where on the screen that sentence becomes something you can see.",
  ],
};

const finalAside = {
  title: "Who does what in the call",
  items: [
    { k: "Prepares the evidence", v: "Cevrynt" },
    { k: "Makes the call", v: "The underwriter" },
    { k: "Records the reason", v: "The underwriter" },
    { k: "Owns the policy", v: "The lender" },
  ],
  note: "The reviewer, the outcome and the figures in the view are illustrative, on synthetic data. In every real file, final approval authority stays with the lender.",
};

const finalClose =
  "Four steps from a prepared file to a recorded reason, and not one of them decided by software. That is what \"the underwriter stays in charge\" looks like when you can see it.";

const finalNote =
  "Illustrative product view on synthetic data; the reviewer and outcome shown are not a real person or decision. Quotes are taken word for word from the answers in section 01.";

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") },
      }))
    ),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${siteConfig.url}/faq` },
    ],
  };

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* The same hero composition as the product, solution and partner pages. */}
      <HeroMotion>
        <div className="page-hero-dark-inner">
          <PageHeroCopy
            heading="Frequently asked questions"
            lede="Straightforward answers about what Cevrynt does, who it is for, and how lender control is preserved."
          />
          <div className="hero-actions">
            <RainbowCta href={calendlyUrl} label="Book a walkthrough" />
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

      {/* 01 — every question, short answer first */}
      <section className="fq-ledger band-light" aria-labelledby="ledger-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">The short answer first</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="ledger-heading"
              text="Sixteen questions, each answered in a few words before the full reasoning."
            />
          </div>
          <p className="eg-lede t-lede">
            Read down the short answers to get the whole picture in a minute. Open any row for the full answer and
            the page that goes further.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <AnswerLedger
              groups={faqGroups}
              guides={guidesLink}
              readout={ledgerReadout}
              aside={ledgerAside}
              close={ledgerClose}
              note={ledgerNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — what Cevrynt does, set against what it does not */}
      <section className="fq-boundary band-deep" aria-labelledby="boundary-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Where the line is</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="boundary-heading"
              text="What Cevrynt does on one side of the line, and what it never claims on the other."
            />
          </div>
          <p className="eg-lede t-lede">
            Eight pairs taken straight from the answers above, each crossing the same line and each linking back
            to the question that states it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <BoundaryLine
              pairs={boundaryPairs}
              readout={boundaryReadout}
              aside={boundaryAside}
              close={boundaryClose}
              note={boundaryNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — how far each answer has to travel before it is finished */}
      <section className="fq-track band-light" aria-labelledby="track-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Answered here, or answered with you</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="track-heading"
              text="Ten answers are finished on this page. Six need your files, your stack or your team."
            />
          </div>
          <p className="eg-lede t-lede">
            Each question runs as far as the step where its answer is complete, and quotes the sentence that puts
            it there.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ResolutionTrack
              stations={trackStations}
              rows={trackRows}
              readout={trackReadout}
              aside={trackAside}
              close={trackClose}
              note={trackNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — the two answers on who decides, followed through on a screen */}
      <section className="fq-final band-deep" aria-labelledby="final-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">The final call, followed through</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="final-heading"
              text="From a prepared file to a recorded reason, with a person making the call."
            />
          </div>
          <p className="eg-lede t-lede">
            Four sentences from the answers on who decides, each spotlighting the part of an illustrative reviewer
            view where it becomes visible.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <FinalCall
              steps={finalSteps}
              image={finalImage}
              readout={finalReadout}
              aside={finalAside}
              close={finalClose}
              note={finalNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="05"
          kicker="Founder-led"
          heading="Ask the question that is not on this page."
          lede="If your team's question is about your own files, policy or stack, the quickest answer is a walkthrough with the founder — against your criteria, with your underwriters making every decision."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
