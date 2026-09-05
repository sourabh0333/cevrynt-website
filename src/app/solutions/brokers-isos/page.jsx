import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { GapRoute } from "@/components/brokers/gap-route";
import { SignalLight } from "@/components/brokers/signal-light";
import { OwnerTriage } from "@/components/brokers/owner-triage";
import { IntakeScan } from "@/components/brokers/intake-scan";
import { CoverNote } from "@/components/brokers/cover-note";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

const page = pageByPath.get("solutions/brokers-isos");

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
   The package below is the one this site uses throughout — the borrower file
   for Cedar & Stone — and the prior submission is the cross-application match
   the product's own fraud view records against it.
   -------------------------------------------------------------------------- */

/** The lender's review, in the order this site describes it everywhere else. */
const reviewStages = ["Intake", "Documents", "Financials", "Verification", "Fraud", "Policy", "Report"];

/**
 * Each gap is placed at the stage it surfaces at, which is what makes its
 * position on the axis mean something — and why two of the three cost more
 * than the third.
 */
const packageGaps = [
  {
    name: "Second account on the statements",
    stage: "Financials",
    cost: "Cash flow cannot be closed out until the other account is in the pack.",
  },
  {
    name: "Ownership percentage",
    stage: "Verification",
    cost: "Surfaces after the file has already been read through financials.",
  },
  {
    name: "Landlord or lease contact",
    stage: "Verification",
    cost: "Same stage, second question — and the same trip back to the start.",
  },
];

const packagePresent = [
  "Signed application",
  "6 of 6 bank statements",
  "Photo identity",
  "Voided cheque",
  "Existing advance agreement",
  "Business registration",
];

const routeLabels = {
  passes: "passes over this file before a decision",
  open: "questions the lender still has to ask",
  origin: "Back to intake",
  missing: "What is missing",
  surfaces: "Surfaces at",
  costs: "What that costs",
  action: "In the pack",
  close: "Add it",
  reopen: "Undo",
  none: "Nothing — it travels with the file",
};

const routeNote =
  "A gap does not cost one question. It costs everything the lender had already read, again — which is why the two that surface at verification are more expensive than the one that surfaces at financials. Passes over the file is simply gaps plus one. Illustrative package · synthetic borrower data.";

const fraudShot = {
  src: "/media/Steps/Fraud Detection.png",
  alt: "The Cevrynt fraud detection screen for this submission: four signals surfaced from the package, each shown with the evidence behind it, and a human resolution queue in which auto-decline is disabled and a documented reason is required before any disposition.",
};

/**
 * The four signals as the screen raises them, with each card's bounds authored
 * as percentages of the export so the ring lands on the real element. Only the
 * closing line of each — what to put in the pack — is copy rather than artwork.
 */
const fraudSignals = [
  {
    name: "Document integrity",
    badge: "1 anomaly",
    what: "One bank-statement page has different PDF metadata and compression characteristics.",
    source: "Bank statement · p.84",
    at: { x: 5.4, y: 46.5, w: 24.2, h: 8.8 },
    answer: "Send a clean export of page 84 pulled from the bank, not a re-scan of the copy you already have.",
  },
  {
    name: "Duplicate submission",
    badge: "Potential duplicate",
    what: "Same bank account ending 7123 appears in a prior application submitted 42 days earlier.",
    source: "Cross-application match · APP-240708-092",
    at: { x: 5.4, y: 57.8, w: 24.2, h: 8.8 },
    answer: "Name the earlier submission yourself, and say plainly what the relationship between the two files is.",
  },
  {
    name: "Address conflict",
    badge: "Mismatch",
    what: "Application address differs from the current business-registry address by street number.",
    source: "Application vs KYB record",
    at: { x: 5.4, y: 69.2, w: 24.2, h: 8.4 },
    answer: "Whichever address is the current operating one, with the filing or utility record that shows it.",
  },
  {
    name: "Cash-flow inconsistency",
    badge: "Context needed",
    what: "Two large deposits are not consistent with the borrower's usual transaction rhythm.",
    source: "Financial analysis · May 14 and May 27",
    at: { x: 5.4, y: 80.5, w: 24.2, h: 8.4 },
    answer: "The invoice or contract behind each of the two deposits, so they read as revenue rather than as an outlier.",
  },
];

const fraudReadout = {
  raised: "signals raised on this file",
  declined: "of them auto-declined",
  answer: "What answers it in the pack",
};

const fraudFoot = {
  open: "03",
  text: "resolution steps still sitting open in an underwriter's queue, with the disposition intentionally withheld — every one of them a question that reaches you if the pack does not answer it first.",
};

const fraudNote =
  "None of these is an accusation, and the screen says so: a repeated account looks identical whether it is a resubmission, a second entity under one owner, or a borrower who went to two brokers, so the product raises it for a person rather than declining on it. What it is not is invisible. Illustrative deal · synthetic borrower data.";

/* --------------------------------------------------------------------------
   03 — the same seven items from the two sections above, sorted by who can
   close them. The counts are the point: two of the seven never need a call.
   -------------------------------------------------------------------------- */

const triageOwners = [
  { key: "desk", name: "Your desk", when: "Closeable today" },
  { key: "borrower", name: "The borrower", when: "One phone call" },
  { key: "lender", name: "The lender", when: "Their judgment, not yours" },
];

const triageItems = [
  {
    owner: "desk",
    name: "Duplicate submission",
    action: "Name the earlier application yourself, and say plainly how the two files relate.",
  },
  {
    owner: "desk",
    name: "Cash-flow inconsistency",
    action: "The invoice or contract behind each of the two deposits is usually already sitting in your deal folder.",
  },
  {
    owner: "borrower",
    name: "Second account on the statements",
    action: "Six statements for the other account, pulled from the borrower's own bank portal.",
  },
  {
    owner: "borrower",
    name: "Ownership percentage",
    action: "One number, from whoever holds the operating agreement.",
  },
  {
    owner: "borrower",
    name: "Landlord or lease contact",
    action: "A name and a phone number, read off the lease.",
  },
  {
    owner: "lender",
    name: "Document integrity",
    action: "You can send a clean export of page 84. Whether that settles it is an underwriter's call.",
  },
  {
    owner: "lender",
    name: "Address conflict",
    action: "You can supply both records. Which one governs is the lender's policy, not your paperwork.",
  },
];

const triageLabels = {
  total: "open questions this file leaves behind",
  yours: "of them close without calling anyone",
};

const triageNote =
  "Seven is not the number that matters. Two of these can be closed at a desk this afternoon, three take one call to the borrower, and two are a judgment no amount of paperwork on this side settles — for those, the pack can only make sure they are answered before they are asked. Illustrative package · synthetic borrower data.";

/* --------------------------------------------------------------------------
   04 — the intake screen the submission becomes, read left to right. The three
   columns are the three questions any new reader asks, in the order asked.
   -------------------------------------------------------------------------- */

const intakeShot = {
  src: "/media/Steps/intake.png",
  alt: "The Cevrynt intake screen for this submission: the borrower package listed file by file on the left, the classification and document map in the centre showing every document mapped to a page range across pages 1 to 143, and evidence provenance on the right showing structured values carrying the document, page and line they were read from.",
};

const intakeColumns = [
  {
    n: "01",
    question: "What did I receive?",
    answer:
      "Five files, one of them a hundred and twenty pages long, each identified before anything reaches underwriting.",
    fact: "5 files · the existing advance detected automatically",
    from: 0,
    to: 32.4,
    at: 6,
  },
  {
    n: "02",
    question: "What is it?",
    answer:
      "Every document classified and mapped to a page range, and the package normalised into one borrower schema.",
    fact: "5 documents mapped · pages 1–143",
    from: 32.4,
    to: 69.3,
    at: 34,
  },
  {
    n: "03",
    question: "Where did that number come from?",
    answer:
      "Each structured value keeps the document, page and line it was read from, so a figure can be checked without hunting for it.",
    fact: "Legal name p.1 line 4 · deposits p.84 lines 22–31",
    from: 69.3,
    to: 100,
    at: 71,
  },
];

const intakeReadout = {
  filesN: "05",
  files: "files handed over",
  pagesN: "143",
  pages: "pages accounted for",
};

const intakeNote =
  "Nothing is annotated on top of the screen and nothing is cropped out of it — the export is shown whole, and the only thing added is the order it gets read in. A submission does not get read sooner because it is friendlier. It gets read sooner because the reader's first three questions are already answered on the page. Illustrative deal · synthetic borrower data.";

/* --------------------------------------------------------------------------
   05 — the note a broker writes once the package has been read this way. Seven
   lines because the file has seven open questions; five can be answered and two
   can only be named, which is the same five-and-two split section 03 sorted.
   -------------------------------------------------------------------------- */

const noteMasthead = {
  kind: "Cover note · sits on top of the pack",
  re: "Cedar & Stone LLC · APP-240819-017",
  pack: "143 pages · 5 documents",
};

const noteLines = [
  {
    source: "Fraud · cross-application",
    starts: true,
    answered:
      "Account ending 7123 also appears on application APP-240708-092, submitted 42 days earlier. Both files came through this office.",
    open:
      "Account ending 7123 also appears on an earlier application. We are confirming the relationship between the two files.",
  },
  {
    source: "Financials · May 14 and May 27",
    starts: true,
    answered:
      "The two May deposits that sit outside the usual rhythm are invoiced work, and both invoices are attached.",
    open: "The two May deposits that sit outside the usual rhythm are still being sourced from the borrower.",
  },
  {
    source: "Financials · transfers",
    starts: true,
    answered: "A second operating account shows up in the transfers. Six statements for it are in the pack.",
    open:
      "A second operating account shows up in the transfers. Statements for it are requested and not here yet.",
  },
  {
    source: "Verification · ownership",
    starts: true,
    answered:
      "Ownership percentages are stated on the application, and the operating agreement confirming them is attached.",
    open: "Ownership percentages are on the application but not yet confirmed by the operating agreement.",
  },
  {
    source: "Verification · premises",
    starts: true,
    answered: "Landlord name and number are on the lease, attached.",
    open: "Landlord name and number are still being obtained from the borrower.",
  },
  {
    source: "Fraud · page 84",
    starts: false,
    answered:
      "A clean export of page 84, pulled from the bank rather than re-scanned, replaces the earlier copy.",
    open:
      "Page 84 carries different metadata from the rest of the statement. We are flagging it rather than explaining it away; the export is yours to judge.",
  },
  {
    source: "Verification · KYB record",
    starts: false,
    answered:
      "The current operating address is confirmed by the utility record attached; the registry filing is out of date.",
    open:
      "The application address and the registry address differ by street number. Both records are in the pack. Which one governs is your policy, not our judgement.",
  },
];

const noteSign = "Everything above is in the pack. Nothing above is an argument.";

const noteTally = {
  answered: "answered outright, in the pack",
  open: "named and handed over, not argued",
  answeredWord: "Answered",
  openWord: "Named open",
};

const coverNote =
  "The note is seven lines long because the file has seven open questions — a shorter one would mean fewer answers, not a better package. Five of them a broker can answer outright. Two are a judgment no broker settles, so they are named and handed over instead. Change any line to see what the note costs you. Cevrynt does not write this note and does not send it; it is what the package lets you write. Illustrative package · synthetic borrower data.";

export default function BrokersIsosPage() {
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

      {/* 01 — What sends a submission back, drawn as the trips it costs */}
      <section className="iso-route band-light" aria-labelledby="route-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">The package</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="route-heading"
              text="A gap does not cost a question. It costs everything read before it."
            />
          </div>
          <p className="eg-lede t-lede">
            Below is the review your file goes into, and where each missing item surfaces in it. Two of these
            three do not come up until verification — by which point the whole file has already been read.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <GapRoute
              stages={reviewStages}
              gaps={packageGaps}
              present={packagePresent}
              labels={routeLabels}
              note={routeNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — What the lender can see that the broker cannot */}
      <section className="iso-prior band-deep" aria-labelledby="prior-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">What the lender sees</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="prior-heading"
              text="This is the screen your submission lands on."
            />
          </div>
          <p className="eg-lede t-lede">
            Four signals, none of them declined by the system, and three steps left open for a person. Each
            one is a question that reaches you in a few days — unless the pack answers it first.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <SignalLight
              shot={fraudShot}
              signals={fraudSignals}
              readout={fraudReadout}
              foot={fraudFoot}
              note={fraudNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — the same open items, sorted by who can actually close them */}
      <section className="iso-triage band-light" aria-labelledby="triage-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Triage</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="triage-heading"
              text="Seven open questions. Two of them are yours."
            />
          </div>
          <p className="eg-lede t-lede">
            Everything the two sections above left open, sorted by who can close it — because a gap you can
            settle at your desk and a gap that needs the borrower on the phone are not the same problem.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <OwnerTriage
              owners={triageOwners}
              items={triageItems}
              labels={triageLabels}
              note={triageNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — the handoff itself, read in the order a lender reads it */}
      <section className="iso-handoff band-deep" aria-labelledby="handoff-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">The handoff</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="handoff-heading"
              text="You hand over a folder. They open a map."
            />
          </div>
          <p className="eg-lede t-lede">
            The intake screen your submission becomes, read the way any new reader reads a package: what did I
            receive, what is it, and where did each number come from.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <IntakeScan
              shot={intakeShot}
              columns={intakeColumns}
              readout={intakeReadout}
              note={intakeNote}
            />
          </div>
        </div>
      </section>

      {/* 05 — the note a broker writes once the package has been read this way */}
      <section className="iso-cover band-light" aria-labelledby="cover-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">The cover note</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="cover-heading"
              text="Seven questions. Seven lines. One of them you write."
            />
          </div>
          <p className="eg-lede t-lede">
            This is not a feature — it is a note you put on top of the pack. Five of the seven you can answer
            outright. Two are a judgment no broker settles, so you name them and hand them over.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <CoverNote
              masthead={noteMasthead}
              lines={noteLines}
              sign={noteSign}
              tally={noteTally}
              note={coverNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="06"
          kicker="Founder-led walkthrough"
          heading="Bring a submission that came back."
          lede="We will read it the way the lender did, name what would have been asked, and show you what the pack needed to carry the first time."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
