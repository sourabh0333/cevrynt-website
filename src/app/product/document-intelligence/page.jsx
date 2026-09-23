import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { IntakeSort } from "@/components/product/intake-sort";
import { ReadLine } from "@/components/product/read-line";
import { DocQuality } from "@/components/product/doc-quality";
import { ReviewerEdit } from "@/components/product/reviewer-edit";
import { StageRun } from "@/components/product/stage-run";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

const page = pageByPath.get("product/document-intelligence");

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
   Built on the same architecture as the Alternative Lenders and Brokers/ISOs
   pages: figures first on one baseline, then a body split between the run
   itself and what the run is required to keep, over the same band-light /
   band-deep sequence.

   Five sections, in the order the stage actually runs: what arrives, what is
   read off it, what is still wrong once the reading is right, what a person
   changes, and where the result goes. Each carries one mechanism of its own —
   files that fly into the group they were sorted into, a redaction that
   resolves into an address rather than a value, a period run that steps over
   the month nobody sent, a correction that adds a line instead of replacing
   one, and connectors that converge on the stage everything downstream reads.

   Section 03 exists because of section 01: the six statements there are all
   correctly typed and still cover only five months. Getting the type right and
   getting the period right are different problems, and the second one is the
   expensive one.

   Three content rules held throughout:

   1. No borrower values anywhere. The submission in 01 is an illustrative set
      of filenames; every value on every document in 02 is redacted, and that is
      the argument rather than a precaution — the route back to the line is what
      this stage produces, not the figure.
   2. The unrecognised pile is never hidden. A classifier that finds a type for
      every file it is handed is silently wrong about some of them, and the
      honest behaviour — hold it, name it unrecognised, hand it to a person — is
      the thing worth designing the section around.
   3. Cevrynt structures documents for human underwriting. It is not a lender,
      it issues no approval or decline, and the lender keeps the decision.

   The page furniture in 02 (institution, registered agent, settlement account,
   and so on) is the ordinary furniture of those document types. No figure,
   name, address or identifier appears anywhere.
   -------------------------------------------------------------------------- */

/* 01 — what arrives, and what will not be named --------------------------- */

const intakeReadout = {
  figures: [
    { n: "15", k: "Files in one illustrative submission" },
    { n: "12", k: "Given a type and grouped" },
    { n: "03", k: "Held and handed back", tone: "held" },
  ],
};

const intakeVerdicts = [
  {
    k: "Bank statements",
    items: [
      "Statement · February",
      "Statement · April",
      "Statement · May",
      "Statement · June",
      "Statement · July",
      "Statement · July (duplicate export)",
    ],
  },
  { k: "The application", items: ["Signed application", "Funding request form"] },
  { k: "Business filings", items: ["Articles of organisation", "State licence"] },
  { k: "Identity and ownership", items: ["Owner ID", "Ownership schedule"] },
  {
    k: "Not recognised",
    items: ["IMG_4417.HEIC", "scan (3).pdf", "Untitled document"],
    held: true,
    record: {
      what: "Held exactly as they arrived, named as unrecognised, and put in front of a person. Nothing here is given a type it might not have, and nothing downstream is told these are something they are not.",
      who: "Handed back · no type assigned",
    },
  },
];

const intakeAside = {
  title: "What the sort is required to keep",
  items: [
    { k: "The file as it arrived", v: "Unaltered" },
    { k: "Why a type was assigned", v: "Recorded" },
    { k: "Files with no type", v: "Named, not guessed" },
    { k: "Who decides on those", v: "A person" },
  ],
  note: "Classification is a reading, not a decision. Nothing about a document's type changes what a lender does with the deal, and no file is discarded for being unrecognisable.",
};

const intakeClose =
  "Twelve and three, not fifteen. Anything that finds a type for every file it is handed will be quietly wrong about some of them — and quietly is the expensive part, because a wrong type here becomes a confident wrong number four stages later.";

const intakeNote =
  "An illustrative submission used to show how a file is organised. It is not a customer, a deal or a real borrower package, and no filename or count here describes anybody's business.";

/* 02 — the reading, and the line it came from ----------------------------- */

const readReadout = {
  figures: [
    { n: "05", k: "Readings shown" },
    { n: "04", k: "Documents they come from" },
    { n: "00", k: "Values printed on this page", tone: "never" },
  ],
  sourceK: "What the reading carries",
  docK: "Document",
  pageK: "Page",
  spotK: "Position",
  redacted: "Redacted",
};

const readFields = [
  {
    k: "Statement period",
    b: "Which months the file actually covers, rather than which months it was said to cover.",
    doc: "Bank statement",
    page: "Page 1",
    spot: "Header block, line 4",
    line: 3,
    sheet: {
      t: "Account statement",
      rows: [
        { l: "Institution", v: "████████████" },
        { l: "Account holder", v: "█████████████████" },
        { l: "Account type", v: "█████████" },
        { l: "Statement period", v: "████████ — ████████" },
        { l: "Opening balance", v: "████████" },
        { l: "Deposits and credits", v: "████████" },
        { l: "Withdrawals and debits", v: "████████" },
      ],
    },
  },
  {
    k: "Closing balance",
    b: "Taken from the statement's own summary, not recomputed from transactions and hoped to match.",
    doc: "Bank statement",
    page: "Page 4",
    spot: "Summary block, line 6",
    line: 5,
    sheet: {
      t: "Account statement · summary",
      rows: [
        { l: "Statement period", v: "████████ — ████████" },
        { l: "Days in period", v: "███" },
        { l: "Average daily balance", v: "████████" },
        { l: "Lowest daily balance", v: "████████" },
        { l: "Days below zero", v: "███" },
        { l: "Closing balance", v: "████████" },
        { l: "Returned items", v: "███" },
      ],
    },
  },
  {
    k: "Legal entity name",
    b: "The name as the filing spells it, which is frequently not the name on the application.",
    doc: "Articles of organisation",
    page: "Page 1",
    spot: "First article, line 2",
    line: 1,
    sheet: {
      t: "Articles of organisation",
      rows: [
        { l: "Filing state", v: "██████████" },
        { l: "Name of company", v: "███████████████████" },
        { l: "Effective date", v: "██████████" },
        { l: "Registered agent", v: "██████████████" },
        { l: "Principal office", v: "███████████████████" },
        { l: "Management", v: "███████████" },
        { l: "Organiser signature", v: "█████████████" },
      ],
    },
  },
  {
    k: "Signing officer",
    b: "Whoever actually signed, kept separate from whoever the application says runs the business.",
    doc: "Signed application",
    page: "Page 2",
    spot: "Signature block, line 5",
    line: 4,
    sheet: {
      t: "Funding application · certification",
      rows: [
        { l: "Applicant business", v: "██████████████████" },
        { l: "Requested amount", v: "████████" },
        { l: "Use of funds", v: "████████████" },
        { l: "Certified by", v: "███████████████" },
        { l: "Title of signatory", v: "████████████" },
        { l: "Date signed", v: "██████████" },
        { l: "Consent to verification", v: "███" },
      ],
    },
  },
  {
    k: "Card processor",
    b: "Which processor the merchant settles through, read off the processing statement itself.",
    doc: "Processing statement",
    page: "Page 1",
    spot: "Account header, line 3",
    line: 2,
    sheet: {
      t: "Merchant processing statement",
      rows: [
        { l: "Merchant number", v: "███████████" },
        { l: "Doing business as", v: "███████████████" },
        { l: "Processor", v: "█████████████" },
        { l: "Settlement account", v: "██████████" },
        { l: "Gross volume", v: "████████" },
        { l: "Transaction count", v: "██████" },
        { l: "Chargebacks", v: "███" },
      ],
    },
  },
];

const readClose =
  "A structured field with no route back to the page is a claim. A structured field carrying its document, its page and its position is evidence — and only one of the two is worth putting in front of somebody who has to sign for it.";

const readNote =
  "The documents above are typeset illustrations of ordinary document furniture, with every value redacted. They are not screenshots, not real documents, and contain no borrower data.";

/* 03 — typed correctly, and still not six months --------------------------- */

const qualityReadout = {
  figures: [
    { n: "06", k: "Files typed as bank statements" },
    { n: "05", k: "Distinct months they cover" },
    { n: "01", k: "Month nobody supplied", tone: "held" },
  ],
};

const qualityStrip = {
  k: "The period those six files actually cover",
  cells: [
    { k: "February" },
    { k: "March", state: "gap", note: "Not supplied" },
    { k: "April" },
    { k: "May" },
    { k: "June" },
    { k: "July", state: "dupe", note: "Two exports" },
  ],
  b: "Every one of the six was recognised for what it is. The type was never the problem — the period was, and no amount of correct classification finds a month that was not sent.",
};

const qualityConditions = [
  {
    k: "A month that never arrived",
    state: "Named",
    b: "Stated as a gap. Nothing is interpolated across it, and no average is computed as though the month were there.",
    held: true,
  },
  {
    k: "The same month twice",
    state: "Flagged",
    b: "Both copies kept and the duplicate flagged, because two exports of one month are not always the same export.",
  },
  {
    k: "Pages in the wrong order",
    state: "Reordered",
    b: "Put back in order by the numbering the document carries on itself, and the reordering is recorded rather than done quietly.",
  },
  {
    k: "A statement photographed rather than exported",
    state: "Partial",
    b: "Read where it can be read. Pages that cannot be are named as unread rather than filled in from the ones that could.",
  },
  {
    k: "A file nobody can open",
    state: "Held",
    b: "Named as unopened and handed over as it arrived. It is not inferred from its filename.",
    held: true,
  },
  {
    k: "A portal screenshot instead of a statement",
    state: "Handed back",
    b: "Recognised as not being a statement, and put in front of a person alongside the three from stage one.",
    held: true,
  },
];

const qualityAside = {
  title: "What it will not do about any of them",
  items: [
    { k: "Interpolate a missing month", v: "Never" },
    { k: "Drop a duplicate quietly", v: "Never" },
    { k: "Infer a file from its name", v: "Never" },
    { k: "Call the submission complete", v: "A person" },
  ],
  note: "None of these are repaired. They are stated on the file so that whoever reads it next knows what they are working with, and so that a gap is never mistaken for a zero.",
};

const qualityClose =
  "Six files, five months. The type was right and the period still had a hole in it — and a hole is only visible if something lines the months up and refuses to fill it in.";

const qualityNote =
  "An illustrative submission. No detection rate, accuracy figure or completeness guarantee is claimed for any of these conditions, and Cevrynt does not decide whether a file is good enough to fund.";

/* 04 — what a reviewer changes -------------------------------------------- */

const reviewReadout = {
  figures: [
    { n: "03", k: "Changes a reviewer can make" },
    { n: "00", k: "That overwrite the original", tone: "never" },
    { n: "01", k: "Person named against each one" },
  ],
  wasK: "Was read as",
  nowK: "Corrected to",
  applyK: "Apply the correction",
  doneK: "Recorded",
  resetK: "Reset this illustration",
  resetNote:
    "This reset exists on this page and nowhere else. In the product a recorded correction cannot be taken back out of the record.",
};

const reviewChanges = [
  {
    k: "Re-type a document.",
    b: "The processing statement read as a bank statement is told what it is, and everything downstream is told as well.",
    was: "Bank statement",
    now: "Processing statement",
    log: "Recorded with the reviewer and the time · original reading retained",
  },
  {
    k: "Repoint a reading.",
    b: "A figure taken off the wrong line is pointed at the right one, and the line it used to point at stays attached to the file.",
    was: "Closing balance · page 4, summary block",
    now: "Closing balance · page 6, closing block",
    log: "Recorded with the reviewer and the time · original reading retained",
  },
  {
    k: "Name a held file.",
    b: "One of the three nobody could name is named by a person, and it is recorded as a person's call rather than the platform's.",
    was: "Not recognised · held for review",
    now: "Owner ID · named by a reviewer",
    log: "Recorded with the reviewer and the time · named by a person, not by the platform",
  },
];

const reviewAside = {
  title: "What a correction cannot do",
  items: [
    { k: "Delete the original reading", v: "Never" },
    { k: "Be applied without a person", v: "Never" },
    { k: "Be reversed out of the record", v: "Never" },
    { k: "Change the lending decision", v: "A person" },
  ],
  note: "Corrections move in one direction: they add. Cevrynt does not correct reviewers, does not re-open a change a reviewer has made, and issues no approval, decline or price at this stage or any other.",
};

const reviewShot = {
  src: "/media/placeholder/Human-owned.png",
  alt:
    "The Cevrynt reviewer view: the final call, the reviewer note and the override reason recorded against the deal, with the decision marked as the reviewer’s rather than the platform’s.",
  caption: "Illustrative product view · the reasoning stays with the decision",
};

const reviewClose =
  "A correction that erases what it corrects is not a correction, it is a rewrite. Every change here adds a line and removes nothing — which is the only version that still answers the question six months later, when somebody asks why the file says what it says.";

const reviewNote =
  "Illustrative corrections on the illustrative submission used throughout this page. No reviewer, business or figure here describes a real file.";


/* 05 — where the structure goes ------------------------------------------- */

const stageReadout = {
  figures: [
    { n: "08", k: "Stages from intake to a decision" },
    { n: "02", k: "Where this page sits" },
    { n: "05", k: "Stages reading what it produced", tone: "never" },
  ],
  hereK: "This page",
};

const stageStages = [
  {
    k: "Intake",
    b: "The submission arrives as it was sent: whole, unsorted, and in whatever the broker had to hand.",
    tag: "Before this",
  },
  {
    k: "Documents",
    b: "Files are told apart, structured, and kept attached to the line each reading came from. Everything below inherits this.",
    here: true,
  },
  {
    k: "Financials",
    b: "Reads the statements this stage identified as statements, across the period it established.",
    reads: true,
    tag: "Reads this",
  },
  {
    k: "Verification",
    b: "Checks the entity against the filing this stage pulled the legal name out of.",
    reads: true,
    tag: "Reads this",
  },
  {
    k: "Fraud",
    b: "Compares what the application claimed with what the documents underneath it actually show.",
    reads: true,
    tag: "Reads this",
  },
  {
    k: "Policy",
    b: "Evaluates your thresholds against structured figures instead of against a scanned page.",
    reads: true,
    tag: "Reads this",
  },
  {
    k: "Report",
    b: "Carries every finding back to the document, page and line it came from.",
    reads: true,
    tag: "Reads this",
  },
  {
    k: "Human decision",
    b: "The underwriter decides. Cevrynt does not approve, decline or price anything.",
    tag: "A person",
  },
];

const stageAside = {
  title: "What travels with the structure",
  items: [
    { k: "Document it came from", v: "Retained" },
    { k: "Page and position", v: "Retained" },
    { k: "Files with no type", v: "Flagged, not filled in" },
    { k: "Final disposition", v: "None issued" },
  ],
  note: "Cevrynt is AI-assisted infrastructure for human underwriting. It is not a lender, it makes no funding offer, and lenders retain final approval authority.",
};

const stageClose =
  "Five of the eight are reading something this one wrote down, and the last one is a person. That is why the unrecognised pile is handed back rather than guessed at: an error here does not stay here, and it stops announcing itself as an error the moment it becomes a number.";

const stageNote =
  "The stages are the canonical Cevrynt workflow this site describes throughout. No timing, throughput or accuracy is claimed for any of them.";

export default function DocumentIntelligencePage() {
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

      {/* 01 — the submission, sorted */}
      <section className="di-intake band-light" aria-labelledby="intake-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">What arrives</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="intake-heading"
              text="Nothing arrives labelled. That is the first problem, not a footnote."
            />
          </div>
          <p className="eg-lede t-lede">
            A submission is whatever was to hand when it was sent. Twelve of these resolve into something the
            rest of the platform can work with. Three do not, and what happens to those three is the part
            worth watching.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <IntakeSort
              verdicts={intakeVerdicts}
              readout={intakeReadout}
              aside={intakeAside}
              close={intakeClose}
              note={intakeNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — the reading, and the line it came from */}
      <section className="di-read band-deep" aria-labelledby="read-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Source-linked extraction</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="read-heading"
              text="Every reading keeps a finger on the line it came from."
            />
          </div>
          <p className="eg-lede t-lede">
            Extraction that hands over a value and loses the page is a rewrite, not a reading. Pick a
            reading and you get the document it was taken from, the page, and the line itself.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ReadLine fields={readFields} readout={readReadout} close={readClose} note={readNote} />
          </div>
        </div>
      </section>

      {/* 03 — typed correctly, and still not six months */}
      <section className="di-quality band-light" aria-labelledby="quality-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">When the type was never the problem</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="quality-heading"
              text="Six files, all read correctly, covering five months."
            />
          </div>
          <p className="eg-lede t-lede">
            Getting the type right is not the same as getting the period right. July arrived twice and March
            never arrived at all — and nothing about correct classification finds a month that was not sent.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <DocQuality
              strip={qualityStrip}
              conditions={qualityConditions}
              readout={qualityReadout}
              aside={qualityAside}
              close={qualityClose}
              note={qualityNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — the person who overrules it */}
      <section className="di-review band-deep" aria-labelledby="review-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Reviewer control</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="review-heading"
              text="A structure you cannot correct is not being offered for review."
            />
          </div>
          <p className="eg-lede t-lede">
            Three things a reviewer changes, and one rule underneath all of them: a correction adds a line and
            removes nothing. Apply one and watch the record grow rather than swap.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ReviewerEdit
              changes={reviewChanges}
              readout={reviewReadout}
              aside={reviewAside}
              shot={reviewShot}
              close={reviewClose}
              note={reviewNote}
            />
          </div>
        </div>
      </section>

      {/* 05 — the stages that read what this one produced */}
      <section className="di-stage band-light" aria-labelledby="stage-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">Downstream</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="stage-heading"
              text="This is stage two. Everything after it reads what it produced."
            />
          </div>
          <p className="eg-lede t-lede">
            Structuring documents is not the product; it is the floor the product stands on. Eight stages run
            from intake to a human decision, and the file passes through every one of them.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <StageRun
              stages={stageStages}
              readout={stageReadout}
              aside={stageAside}
              close={stageClose}
              note={stageNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="06"
          kicker="Founder-led"
          heading="Bring the submission that usually breaks things."
          lede="The interesting half of a walkthrough is the file nobody wants to open: the statement that arrived as photographs, the month that is missing, the name that does not match the filing. Describe one of those and we will run it against the real thing rather than a tidy demo."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
