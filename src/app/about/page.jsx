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
  { t: " is worth what the evidence behind it can " },
  { t: "still", mark: "2" },
  { t: " be " },
  { t: "pointed at", mark: "3" },
  { t: "." },
];

const claimReadout = {
  figures: [
    { n: "7", k: "Stages between a document and a person reading a figure" },
    { n: "3", k: "Phrases in that sentence we treated as restrictions" },
    { n: "0", tone: "hold", k: "Places the source is allowed to drop off" },
  ],
  /* These two must match the source trace in the product view shown in section
     03 — page 4, lines 22–31 — or the page contradicts its own screenshot. */
  from: "From · statement p.4, lines 22–31",
  to: "To · $92,418.60 total deposits",
};

const claimStages = [
  "Intake",
  "Documents",
  "Financials",
  "Verification",
  "Fraud",
  "Policy",
  "Report",
];

const claimNotes = [
  {
    mark: "1",
    phrase: "answer",
    k: "An answer, not a decision.",
    b: "Cevrynt produces the analysis a person decides from, and issues no approval, decline or recommendation dressed as one. The disposition stays with the lender, and so does the accountability.",
  },
  {
    mark: "2",
    phrase: "still",
    k: "Still — at the far end.",
    b: "A figure that loses its source at intake cannot be checked at the report, so provenance is carried through all seven stages rather than reconstructed once the analysis is finished.",
  },
  {
    mark: "3",
    phrase: "pointed at",
    k: "Pointed at, not explained.",
    b: "A page and a line in the borrower's own document is a different standard from a plausible account of where a number probably came from.",
  },
];

const claimInsight = {
  k: "What the rule above is measuring",
  v: "The link runs all seven stages without a break. Cut it anywhere and the figure at the far end stops being evidence and starts being an assertion.",
};

const claimNote =
  "That sentence is the whole reason this company exists, and it is also the thing most easily said and least often held to. Each mark is a restriction we accepted, and every one is checkable against a product screen shown elsewhere on this site. The file referenced is illustrative, with synthetic borrower data.";

/* 02 — who issues the decision, drawn to scale ---------------------------- */

const heldReadout = {
  figures: [
    { n: "4", k: "Dispositions a lender chooses between" },
    { n: "0", tone: "zero", k: "Of them issued by Cevrynt" },
    { n: "1", k: "Person you will be asking about it" },
  ],
  lenderK: "Issued by the lender",
  usK: "Issued by Cevrynt",
  scale: "One bar, drawn to scale. Every disposition sits on the left of it; the tick at the right edge is the whole of our share.",
  signed: "Who is behind that",
};

const heldDispositions = ["Approve", "Decline", "Counter-offer", "Refer"];

const heldCommitments = [
  {
    k: "No score a queue can be sorted on.",
    b: "The obvious thing to build here, and the thing that would quietly move the judgment from the lender to us.",
  },
  {
    k: "No number we cannot stand behind.",
    b: "Which is why there are no approval rates, accuracy figures or customer counts anywhere on this site.",
  },
  {
    k: "The partnership described as what it is.",
    b: "Cevrynt and SHOPLINE have a documented development and referral partnership around e-commerce merchant-underwriting workflows — not an integration, an investment, an endorsement, or eligibility for anybody.",
  },
  {
    k: "The document stays with the figure.",
    b: "The shortcut this category eventually takes is presenting a clean number and dropping the page it came from.",
  },
];

const heldSignature = {
  name: "Arin",
  role: "Founder, Cevrynt",
  email: "arin@cevrynt.com",
};

const heldInsight = {
  k: "What that leaves",
  v: "Cevrynt is early, founder-led, and narrow on purpose. There is no sales team to hand you to.",
};

/* The page's one full statement of the position. It is not repeated under
   every other figure, so it has to be complete here. */
const heldNote =
  "Each line above is a restriction rather than an aspiration, because an aspiration costs nothing and cannot be checked. Cevrynt is not a lender, is not a party to any credit decision made using its output, and lenders retain final authority over every decision they make with it.";

/* 03 — which of those restrictions a reader can actually be shown ---------- */

const shownReadout = {
  figures: [
    { n: "3", k: "Restrictions with a screen behind them" },
    { n: "1", tone: "none", k: "With none, named at the end" },
    { n: "1", k: "Illustrative file behind all three views" },
  ],
  shown: "Restriction · the view it is visible in · what to look at",
  look: "Look at",
};

const shownRows = [
  {
    n: "01",
    k: "The document stays attached to the figure.",
    look: "The source trace under the statement pack — page 4, lines 22–31 — still carried beside the figure it produced, and the original PDF left intact behind it.",
    shot: {
      src: "/media/placeholder/outcame1.png",
      alt: "An illustrative Cevrynt product view titled Read once, reuse the analysis: a bank statement pack with total deposits and ending balance highlighted, a source trace reading page 4 lines 22 to 31, a column of cash-flow signals, and a reusable analysis panel showing average deposits, average daily balance and NSF days.",
    },
  },
  {
    n: "02",
    k: "The lender's own rules, not a generic score.",
    look: "Each criterion plotted against the threshold that lender configured, and the one policy break marked for judgment rather than resolved into a decline.",
    shot: {
      src: "/media/placeholder/outcame4.png",
      alt: "An illustrative Cevrynt policy boundary map for Cedar & Stone LLC: five configured lending rules plotted as bands with the borrower's position marked on each, three passing, one near limit and one breaking policy, alongside a panel noting that a policy break is not an automatic decline.",
    },
  },
  {
    n: "03",
    k: "The reviewer's reasoning stays in the record.",
    look: "A human override kept with the file — what was accepted, who accepted it, the policy version in force, and the reason written out rather than reduced to a status.",
    shot: {
      src: "/media/placeholder/outcame3.png",
      alt: "An illustrative Cevrynt decision memory view: source-linked findings on the left, a reason chain showing a policy result, an exception, a recorded human override and a final judgment, and a decision record naming the reviewer, the policy version and the linked evidence.",
    },
  },
];

/* Repeats the second restriction from 02 word for word, and says so — without
   the back-reference it reads as an accidental duplicate rather than the audit
   it is meant to be. */
const shownOpen = {
  k: "The fourth one, from 02 · no screen behind it",
  claim: "No number we cannot stand behind.",
  b: "This is a claim about the website rather than about the product, so there is nothing to open and point at. The only way to check it is to read the rest of this site and find no approval rate, no accuracy figure, no customer count and no pricing anywhere on it.",
};

const shownInsight = {
  k: "Why it is split this way",
  v: "A claim you can be shown is a different kind of claim from one you have to take on trust. We would rather say which is which than let the second borrow from the first.",
};

/* The full not-a-lender statement lives in 02 and 07. Repeating it under every
   figure turned five sections into five disclaimers. */
const shownNote =
  "Illustrative product views using synthetic borrower data, all drawn from the same example file used elsewhere on this site.";

/* 04 — the division of labour --------------------------------------------
   This section used to list the four things Cevrynt will not build, which is
   the same argument section 06 makes with a better figure. It draws the line
   instead: what the platform does, and what it hands to the person reading the
   output. Nothing on the right is a refusal — it is work that needs somebody
   who knows the borrower and the book. */

const builtReadout = {
  figures: [
    { n: "7", k: "What the platform does today" },
    { n: "4", tone: "out", k: "What stays with the reviewer" },
    { n: "1", k: "Illustrative record behind the view" },
  ],
  builtK: "The platform does this",
  withheldK: "A person does this",
  plate: "Illustrative decision record · synthetic borrower data",
};

const builtShot = {
  src: "/media/placeholder/outcame3.png",
  alt: "An illustrative Cevrynt decision record: a reason chain running from a policy result through an exception to a recorded human override and a final judgment, beside a panel naming the reviewer, the policy version in force and the written reason the exception was accepted.",
};

const builtItems = [
  "Document structuring that keeps page and line references attached to every extracted field",
  "Bank-statement analysis across deposits, balances, cash flow and transaction patterns",
  "Business verification, with conflicting records left visible instead of normalised away",
  "Fraud and document-integrity signals raised against the file rather than scored into it",
  "Policy evaluation against criteria and thresholds the lender configures",
  "Reviewer notes, overrides and audit history preserved with the deal",
  "An underwriting report in which each figure still points back to its source",
];

const withheldItems = [
  {
    k: "Weighing an exception against the rest of the file.",
    b: "The break is surfaced with its threshold and its context. Whether it matters, given everything else in the pack, is a judgment about this borrower.",
  },
  {
    k: "Deciding which conflicting record is current.",
    b: "Verification holds both values and where each came from. Which one is true today is often a phone call, not a data problem.",
  },
  {
    k: "Setting the criteria in the first place.",
    b: "Thresholds are the lender's and stay configured by the lender. Nothing here infers a policy, and nothing quietly adjusts one.",
  },
  {
    k: "Judging the file complete enough to act on.",
    b: "The platform says what is missing and what it could not read. Whether that is enough to proceed is the reviewer's call.",
  },
];

const builtInsight = {
  k: "Why the line sits here",
  v: "Nothing on the right is missing work. Every line of it needs somebody who knows this borrower and this book — which is the part we are not the ones to do.",
};

const builtNote =
  "The seven on the left describe what the platform does, not how well it does it; no accuracy, coverage or performance figures are published anywhere on this site.";

/* 05 — one file, drawn at its real size ----------------------------------
   The page count, the document count and the pages the headline figures were
   read from all come from the illustrative file already shown elsewhere on
   this site. Nothing here is a claim about speed, reduction or accuracy — the
   argument runs the other way, that the pages stay attached. */

const filePages = 143;

const fileReadout = {
  figures: [
    { n: "10", k: "Documents in one borrower package" },
    { n: "143", k: "Pages linked inside them" },
    { n: "4", tone: "lit", k: "Pages the memo's figures were read from" },
  ],
  fieldLabel:
    "A row of 143 marks, one for each page in a single illustrative underwriting file, in page order from left to right. Four marks are drawn taller and in colour: pages 4, 39, 76 and 118, the pages the headline figures on the underwriting memo were read from.",
  hoverRest: "Every mark is one page · move across the field to read its number",
  hoverPrefix: "Page",
  litK: "Where each one was read from",
};

/* Page 4 carries the deposits figure because that is the trace the product
   views on this site actually show — page 4, lines 22–31. The other three sit
   further into the pack, which is both what a six-month statement set looks
   like and what keeps the ruler readable. */
const fileLit = [
  { page: 4, v: "Total deposits for the period", b: "Traced to lines 22–31 on that page, which is the source trace shown on the product views elsewhere on this site." },
  { page: 39, v: "Average daily balance", b: "Derived across the statement set, with every statement it was derived from still attached to it." },
  { page: 76, v: "Recurring daily debit", b: "A repeating ACH pattern grouped into one position rather than counted as many separate debits." },
  { page: 118, v: "Negative days in the period", b: "Counted against the lender's own threshold, with the days themselves still openable." },
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
  k: "What the field is actually saying",
  v: "The point is not how few end up on the memo. It is that the other 139 never leave — which is the only reason the ones that do can be checked.",
};

const fileNote =
  "One illustrative file with synthetic borrower data, the same one used elsewhere on this site. The counts describe that example and are not a claim about typical files, processing speed, reduction or accuracy, none of which are published anywhere on this site.";

/* 06 — what gets asked for, against the tests it would have to pass -------- */

const askReadout = {
  figures: [
    { n: "4", k: "Things we are regularly asked to build" },
    { n: "4", k: "Tests anything new has to pass" },
    { n: "0", tone: "all", k: "Of the four that clear all four" },
  ],
  corner: "Asked for ↓ · tested against →",
  legend: "Open ring · passes    Struck ring · fails",
  /* Only shown where the column heads collapse to numbers. Above that the
     heads carry the names and printing them again is just a second copy. */
  legendNames:
    "01 A lender can check it · 02 It does not move the decision · 03 The source stays attached · 04 It survives a messy file",
  pass: "passes",
  fail: "fails",
};

const askTests = [
  { k: "A lender can check it" },
  { k: "It does not move the decision" },
  { k: "The source stays attached" },
  { k: "It survives a messy file" },
];

/* Four distinct verdict patterns, deliberately. An earlier draft had two rows
   failing the same single test with near-identical wording, which made a matrix
   headed "four different requests" contain the same request twice. Every row
   still fails 02 — that is the finding, not a coincidence — but no two rows now
   read the same across the other three. */
const askItems = [
  {
    k: "One underwriting score.",
    b: "A single number a queue could be sorted on.",
    cells: [false, false, false, true],
  },
  {
    k: "A decision API returning approve or decline.",
    b: "Post the file, receive the disposition.",
    cells: [true, false, true, true],
  },
  {
    k: "A straight-through lane for clean files.",
    b: "If nothing is flagged, fund it without a reviewer.",
    cells: [true, false, true, false],
  },
  {
    k: "A model that works without configuring policy.",
    b: "Skip the setup; let it infer the criteria.",
    cells: [false, false, true, true],
  },
];

const askReading = {
  k: "The column that is solid",
  claim: "Four different requests. The same test, every time.",
  b: "Test 02 fails for all four, which is the tell: they are not four ideas but one idea asked four ways — move the judgment across to the vendor. Every other column varies. That one does not.",
  shot: {
    src: "/media/placeholder/outcame4.png",
    alt: "A detail of an illustrative Cevrynt policy view: a single rule that the borrower breaks, held open with the reviewer action attached to it and a note recording that a policy break is not an automatic decline.",
  },
};

const askInsight = {
  k: "Why we keep saying no to it",
  v: "Each of these would demonstrate well. Each one also hands us a decision we are not the ones accountable for.",
};

const askNote =
  "These are the requests we get, not a roadmap. No timing is implied for anything on this page, and nothing here is on a list to be built later.";

/* 07 — who this is for, run at one gate ----------------------------------- */

const gateReadout = {
  figures: [
    { n: "4", k: "Operations this is built for" },
    { n: "4", tone: "stop", k: "It is the wrong tool for" },
    { n: "1", k: "Question every lane is run at" },
  ],
  gate: "The gate",
  passK: "Through",
  stopK: "Stops",
};

const gateQuestion = "Does a person at your shop still make the call?";

const gateLanes = [
  {
    k: "MCA funders underwriting from bank statements",
    b: "Where most of the work is reading deposits, balances and debits out of a statement pack and keeping the figures attached to it.",
  },
  {
    k: "Alternative lenders with policy already written down",
    b: "Criteria and thresholds that exist as rules somebody owns, rather than as a feel for the file living in one head.",
  },
  {
    k: "Brokers and ISOs packaging files for those lenders",
    b: "Where a cleaner submission with its evidence attached is worth something at the other end.",
  },
  {
    k: "Teams where an underwriter signs the decision",
    b: "The output is analysis for a person to weigh. With nobody weighing it, the main thing it produces goes unused.",
  },
  {
    stops: true,
    k: "Consumer lending",
    b: "A different regulatory surface and a different file entirely. None of this is built for it.",
  },
  {
    stops: true,
    k: "Anyone wanting a decision engine to run unattended",
    b: "Cevrynt issues no approval, decline or score, so there is nothing here to run a queue on without a reviewer.",
  },
  {
    stops: true,
    k: "Teams with no written policy to encode",
    b: "Policy evaluation runs against criteria a lender configures. With nothing to configure, that whole stage sits idle.",
  },
  {
    stops: true,
    k: "Anyone looking for a lead source or a marketplace",
    b: "Cevrynt does not originate, broker or place deals, and introduces no borrowers to anybody.",
  },
];

const gateReading = {
  k: "What the four that got through are left holding",
  claim: "A short queue of unresolved conflicts, not another stack of documents.",
  b: "Verified facts leave quietly; the conflicts stay attached to the records they came from, with both values visible. That queue is only worth producing if somebody is still reading it — which is the question the gate asks.",
  shot: {
    src: "/media/placeholder/outcame2.png",
    alt: "An illustrative Cevrynt verification view: borrower claims on the left, entity, address and submission checks across the middle showing one verified, one mismatch and one for review, and a human review panel listing only the unresolved signals alongside a note that a mismatch is not an automatic decline.",
  },
};

const gateInsight = {
  k: "Why we publish the bottom half",
  v: "Four kinds of operation would get nothing out of this. Saying so costs us conversations, and saves the ones that were never going to work.",
};

const gateNote =
  "These describe shapes of lending operation, not customers. Cevrynt claims no clients, pilots or contracts anywhere on this site, and nothing here states that any particular lender uses the platform or constitutes an offer of finance.";

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
      </HeroMotion>

      {/* 01 — why the company exists */}
      <section className="ab-why band-light" aria-labelledby="why-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">Why this exists</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="why-heading"
              text="The whole company is one sentence long."
            />
          </div>
          <p className="eg-lede t-lede">
            Three phrases in it are load-bearing, and each one cost us something to keep. The rule above the
            sentence is what it has to survive: seven stages, one unbroken link.
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
            <p className="hx-kicker hx-kicker-invert">What we hold ourselves to</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="signed-heading"
              text="All of the decision is theirs. Drawn to scale."
            />
          </div>
          <p className="eg-lede t-lede">
            Not a list of values. One bar, with every disposition a lender makes on one side of it and our
            share — nothing — at the other, then the restrictions that keeps us to, and a name at the foot.
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
            <p className="hx-kicker">Checkable, not claimable</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="shown-heading"
              text="Three of those you can look at. One you cannot."
            />
          </div>
          <p className="eg-lede t-lede">
            A promise on an About page is worth very little, so here are the four restrictions from the section
            above, each beside the product view it is visible in — and the one with no screen behind it.
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
            <p className="hx-kicker hx-kicker-invert">Division of labour</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="built-heading"
              text="Seven things it does. Four it hands back."
            />
          </div>
          <p className="eg-lede t-lede">
            The useful thing to publish is not a feature list but a line: what the platform does with a file,
            and what it puts in front of a person because the answer depends on knowing the borrower.
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
            <p className="hx-kicker">What one file is</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="file-heading"
              text="One hundred and forty-three pages. Four of them on the memo."
            />
          </div>
          <p className="eg-lede t-lede">
            A mark for every page in a single borrower package, in order. The four in colour are the pages the
            headline figures were read from — and the argument is about the other hundred and thirty-nine.
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
            <p className="hx-kicker hx-kicker-invert">What we get asked for</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="ask-heading"
              text="Four requests. One column fails all of them."
            />
          </div>
          <p className="eg-lede t-lede">
            The four things people most often want built, set against the four tests anything new has to pass.
            The interesting part is not which ones fail, but where.
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
            <p className="hx-kicker">Who this is for</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="gate-heading"
              text="Eight lanes. Four of them stop here."
            />
          </div>
          <p className="eg-lede t-lede">
            Whether this is any use to you is mostly settled by one question. Every kind of operation runs at
            that gate, including the ones we would rather not have to turn away.
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
          kicker="Founder-led"
          heading="Ask the awkward questions."
          lede="The ones about what it cannot do, what is not built yet, and what happens when the file is a mess. Those are the useful conversations at this stage, and you will be having them with the person who built it."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
