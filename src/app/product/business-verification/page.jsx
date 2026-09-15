import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { SourceMatrix } from "@/components/verification/source-matrix";
import { VerdictColumn } from "@/components/verification/verdict-column";
import { ChangePlot } from "@/components/verification/change-plot";
import { HolderPlot } from "@/components/verification/holder-plot";
import { CoverageSpan } from "@/components/verification/coverage-span";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

const page = pageByPath.get("product/business-verification");

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
   Two sections for now, built and reviewed before the rest of the page is
   written. Same architecture as the Alternative Lenders, Brokers/ISOs and
   Document Intelligence pages: figures on one baseline, then the run, over the
   band-light / band-deep sequence.

   Both sections are the same rigid grid, because a grid is the honest form for
   this work and because alignment is the point rather than an afterthought.
   01 sets five facts against four documents and lets the emptiness show; 02
   sets four conflicts against their readings and adds the column a reader is
   looking for, with every cell in it blank.

   Four constraints held throughout:

   1. No data provider is named and no live registry connection is claimed.
      Cevrynt's documented capability is organising verification findings and
      surfacing conflicts — not operating a data service.
   2. No confidence, coverage, match-rate or accuracy figure appears anywhere.
   3. No determination. No identity finding, no sanctions or watchlist
      determination, no credit opinion, no approval or decline.
   4. The illustrative entity is Cedar & Stone LLC, the one this site uses
      throughout. Every name, date and address here is illustrative.

   The character-level comparison of a claim against a record already exists on
   the Alternative Lenders page and is not repeated. This page shows the grid
   that comparison sits inside, and then what a disagreement in it means.
   -------------------------------------------------------------------------- */

/* 01 — the grid, and the nine cells nobody filled in ---------------------- */

const matrixReadout = {
  figures: [
    { n: "20", k: "Cells in the grid" },
    { n: "11", k: "Where a document speaks" },
    { n: "09", k: "Where nothing does", tone: "held" },
  ],
  cornerK: "Fact · document",
  idle: "Read any cell to see exactly what that document says.",
  statedK: "Stated",
  clashK: "Stated twice, differently",
  silentK: "Not stated by this document",
  legend: [
    { s: "ok", k: "Stated" },
    { s: "clash", k: "Two values" },
    { s: "none", k: "Silent" },
  ],
};

const matrixSources = [
  { k: "Application" },
  { k: "Articles of organisation" },
  { k: "Bank account" },
  { k: "Processing statement" },
];

const matrixFacts = [
  {
    k: "Legal name",
    cells: [
      { s: "ok", v: ["Cedar & Stone LLC"] },
      { s: "ok", v: ["Cedar & Stone, LLC"] },
      { s: "ok", v: ["Cedar and Stone"] },
      { s: "ok", v: ["CEDAR & STONE LLC"] },
    ],
  },
  {
    k: "Entity type",
    cells: [
      { s: "ok", v: ["Limited liability company"] },
      { s: "ok", v: ["Limited liability company"] },
      { s: "none", v: [] },
      { s: "none", v: [] },
    ],
  },
  {
    k: "Principal address",
    cells: [
      { s: "clash", v: ["214 Westlake Dr", "210 Westlake Dr on the filing"] },
      { s: "clash", v: ["210 Westlake Dr", "214 Westlake Dr on the application"] },
      { s: "none", v: [] },
      { s: "none", v: [] },
    ],
  },
  {
    k: "Registered agent",
    cells: [
      { s: "none", v: [] },
      { s: "ok", v: ["Changed 19 June 2026"] },
      { s: "none", v: [] },
      { s: "none", v: [] },
    ],
  },
  {
    k: "Entity on the signature block",
    cells: [
      { s: "clash", v: ["Cedar & Stone LLC on p.1", "Cedarstone Holdings LLC on p.2"] },
      { s: "none", v: [] },
      { s: "none", v: [] },
      { s: "clash", v: ["CEDAR & STONE LLC as the DBA", "no holding company named anywhere"] },
    ],
  },
];

const matrixAside = {
  title: "What an empty cell is",
  items: [
    { k: "A document with no opinion", v: "Most of them" },
    { k: "A failed check", v: "Not the same thing" },
    { k: "Filled in from elsewhere", v: "Never" },
    { k: "Whether it matters", v: "A person" },
  ],
  note: "Nine empty cells is the ordinary shape of a submission, not a shortfall. A bank statement has no view on entity type and a processing statement has none on a registered agent, and inventing one would be worse than leaving the cell blank.",
};

const matrixShot = {
  src: "/media/placeholder/Exception-aware.png",
  w: 760,
  h: 520,
  alt: "The Cevrynt exception view: a business address on the application that does not line up with the address on the current filing, held open for a reviewer with both sources retained.",
  caption: "Illustrative product view · the mismatch stays open",
};

const matrixClose =
  "{stated} cells with a document behind them and {silent} with nothing at all. The empty ones are not the gaps in the work — they are most of what a submission actually is, and a grid that quietly filled them would be inventing a business rather than verifying one.";

const matrixNote =
  "An illustrative file. No data provider is named on this page and no live registry connection is claimed; every cell is a document in the submission or it is empty.";

/* 02 — twelve readings, and the column left empty ------------------------- */

const verdictReadout = {
  figures: [
    { n: "04", k: "Conflicts this grid produced" },
    { n: "12", k: "Ways to read them" },
    { n: "00", k: "Conclusions issued", tone: "never" },
  ],
  cornerK: "Conflict",
  voidK: "No conclusion is issued",
  saidK: "Why the fourth column is empty",
  saidB:
    "There is no most-likely, no ranking, no score and no recommended reading. A conflict with two dull explanations and one that is not cannot be separated by processing — it is separated by a phone call. Printing something in that column would make this page easier to sell and the file harder to defend.",
};

const verdictColumns = ["Reading A", "Reading B", "Reading C", "What Cevrynt concludes"];

const verdictConflicts = [
  {
    k: "The address on the application is not the address on the filing.",
    readings: [
      "The business moved and the filing has not caught up yet.",
      "The application gave a mailing address rather than a premises.",
      "The application describes a location the business does not operate from.",
    ],
  },
  {
    k: "The registered agent changed weeks before the application.",
    readings: [
      "A routine change of service provider on renewal.",
      "A change of counsel ahead of a transaction.",
      "A deliberate move of where legal notice is served.",
    ],
  },
  {
    k: "The signature block names an entity that appears nowhere else in the file.",
    readings: [
      "A holding company that owns the applicant.",
      "A typing error carried over from another document.",
      "The wrong entity is the one applying.",
    ],
  },
  {
    k: "The filing lists a holder the application does not.",
    readings: [
      "A passive investor nobody thought to list.",
      "A holder added after the application was drafted.",
      "A holder the applicant chose not to disclose.",
    ],
  },
];

const verdictAside = {
  title: "What the platform will not do with any of them",
  items: [
    { k: "Rank the readings", v: "Never" },
    { k: "Select one", v: "Never" },
    { k: "Score the conflict", v: "Never" },
    { k: "Put it to a person", v: "Always" },
  ],
  note: "Cevrynt makes no identity finding, no sanctions or watchlist determination and no credit opinion. A conflict is surfaced with its sources attached and its readings intact, and the lender's reviewer decides which one is true.",
};

const verdictClose =
  "Four conflicts and {total} ways to read them. Software that picks one is guessing with a straight face; software that hands you three is doing the only honest thing it can with a question that needs somebody to pick up the phone.";

const verdictNote =
  "Illustrative conflicts on the illustrative file used throughout. Cevrynt is AI-assisted infrastructure for human underwriting: it is not a lender, issues no approval or decline, and lenders retain final approval authority.";


/* 03 — when anything about it last changed -------------------------------- */

const plotReadout = {
  figures: [
    { n: "06", k: "Events on the entity record" },
    { n: "02", k: "Inside the lookback window", tone: "held" },
    { n: "00", k: "Findings on their own", tone: "never" },
  ],
  plotK: "Placed by date, on a ruled axis — not spaced evenly",
};

/* Gridlines. Real dates, so the axis is measured rather than implied. */
const plotYears = [
  { k: "2020", on: "2020-01-01" },
  { k: "2021", on: "2021-01-01" },
  { k: "2022", on: "2022-01-01" },
  { k: "2023", on: "2023-01-01" },
  { k: "2024", on: "2024-01-01" },
  { k: "2025", on: "2025-01-01" },
  { k: "2026", on: "2026-01-01" },
];

const plotEvents = [
  {
    k: "Entity formed",
    on: "2019-03-14",
    row: 0,
    shown: "14 Mar 2019",
    b: "Seven years of standing behind the file. It is the single most useful thing on this axis and the easiest to skip past, because nothing about it is recent.",
  },
  {
    k: "Officer added",
    on: "2024-01-11",
    row: 0,
    shown: "11 Jan 2024",
    b: "Two years before the application, and unremarkable at that distance.",
  },
  {
    k: "Registration renewed",
    on: "2026-02-02",
    row: 1,
    shown: "02 Feb 2026",
    b: "Routine, on schedule, and outside the window.",
  },
  {
    k: "Registered agent changed",
    on: "2026-06-19",
    row: 2,
    shown: "19 Jun 2026",
    b: "Inside the window. A change of service provider and a change of where legal notice is served look identical from here.",
  },
  {
    k: "Principal address changed",
    on: "2026-07-05",
    row: 3,
    shown: "05 Jul 2026",
    b: "Inside the window, and the reason the address on the application no longer matches the filing in section one.",
  },
  {
    k: "Application submitted",
    on: "2026-08-19",
    row: 4,
    shown: "19 Aug 2026",
    anchor: true,
    b: "The date everything else is measured back from.",
  },
];

const plotWindow = {
  days: 90,
  b: "Ninety days back from the application, because that is what this lender configured. A different lender sets a different window and the same six events produce a different count — the window is theirs, not ours.",
};

const plotAside = {
  title: "What a recent change is",
  items: [
    { k: "A change near the application", v: "Noted" },
    { k: "Why it changed", v: "Not inferred" },
    { k: "Whether it matters", v: "A person" },
    { k: "A finding on its own", v: "Never" },
  ],
  note: "Recency is a property of a date, not a judgement about a business. Nothing on this axis is scored, weighted or converted into a signal, and no event here is treated as adverse.",
};

const plotClose =
  "A registered agent and a principal address that both moved in the eight weeks before an application is not evidence of anything. It is a coincidence worth exactly one question — and the distance between those two sentences is the whole discipline of this stage.";

const plotNote =
  "Illustrative dates on the illustrative entity used throughout this site. The lookback window is lender-configured; Cevrynt sets no default that could be mistaken for a standard.";

/* 04 — who owns enough of it to matter ------------------------------------ */

const holderReadout = {
  figures: [
    { n: "03", k: "Holdings on the record" },
    { n: "02", k: "Above the lender threshold" },
    { n: "01", k: "The application does not list", tone: "held" },
  ],
  plotK: "Each holding on a ruled scale, against the line this lender drew",
  overK: "Identify",
  underK: "Counted",
};

const holderTicks = [25, 50, 75, 100];

const holders = [
  {
    k: "Managing member",
    pct: 55,
    src: "Application · filing",
    b: "Signatory and majority holder, and the only person on the file who is both. Worth stating rather than assuming.",
  },
  {
    k: "Second holder",
    pct: 30,
    src: "Filing only",
    gap: true,
    b: "Over the line, named in the filing, and absent from the application. This is the fourth conflict from section two with a number attached to it.",
  },
  {
    k: "Third holder",
    pct: 15,
    src: "Application · filing",
    b: "Under the line, so not required to be identified. Still on the file, still on this chart, and still at full strength.",
  },
];

const holderThreshold = {
  at: 25,
  k: "Lender threshold",
  b: "The line is configuration — not law, not a recommendation and not our opinion. Cevrynt holds no view on where a threshold belongs and gives no guidance on setting one.",
};

const holderAside = {
  title: "Where a holding is read from",
  items: [
    { k: "The filing", v: "Where it lists holders" },
    { k: "The application", v: "What it claims" },
    { k: "Where they disagree", v: "Both kept" },
    { k: "Undocumented ownership", v: "Named as undocumented" },
  ],
  note: "Where the documents do not establish ownership, the gap is reported as a gap. No holding is estimated, apportioned or inferred from anything other than a document that states it, and Cevrynt makes no beneficial-ownership determination.",
};

const holderClose =
  "Two holdings over the line, one under it, and one of the two that nobody put on the application. The chart is not the finding — the finding is that a thirty per cent holder reached this stage without the borrower mentioning them, and that is a question for a person.";

const holderNote =
  "Illustrative holdings. Cevrynt makes no beneficial-ownership determination, holds no view on any threshold, and provides no legal or regulatory guidance about disclosure.";


/* 05 — where the documents run out --------------------------------------- */

const spanReadout = {
  figures: [
    { n: "04", k: "Situations with less to check" },
    { n: "05", k: "Stages the chain can reach" },
    { n: "00", k: "Reported as a failure", tone: "never" },
  ],
  cornerK: "Situation",
  stopK: "What is returned",
  plotK: "How far the documents actually reach — ruled by stage, not by score",
  plotB:
    "No coverage percentage appears anywhere on this page. A coverage figure would read as an accuracy claim about the product, and there is no documented figure behind one.",
};

const spanStages = [
  "Entity exists",
  "Type and formation",
  "Current standing",
  "Officers",
  "Ownership chain",
];

const spanCases = [
  {
    k: "A sole proprietor with no filing",
    spans: [],
    stop: "No entity record",
    b: "There is no entity record because there is no entity. That is the correct output, not an empty result, and it is reported in those words rather than as a check that did not pass.",
  },
  {
    k: "An entity formed weeks ago",
    spans: [{ from: 1, to: 3 }],
    stop: "Thin history",
    b: "A filing exists and has almost nothing behind it. Thin is reported as thin rather than padded out with whatever else happens to be in the submission.",
  },
  {
    k: "Registered in one state, operating in another",
    spans: [
      { from: 1, to: 3 },
      { from: 1, to: 5 },
    ],
    stop: "Two records",
    b: "Both are stated and neither is promoted to being the real one. Which of them governs is a question about the lender's policy, not about the business — and not one this stage gets to answer.",
  },
  {
    k: "A name held through a holding company",
    spans: [{ from: 1, to: 4 }],
    stop: "Chain incomplete",
    b: "The chain is followed as far as the documents go and stops being reported where they stop. An unfinished chain is shown unfinished rather than closed off at the last name anybody could find.",
  },
];

const spanAside = {
  title: "What absence means here",
  items: [
    { k: "No record found", v: "Reported as such" },
    { k: "A failed verification", v: "Not the same thing" },
    { k: "A reason to decline", v: "Never ours" },
    { k: "What happens next", v: "A person" },
  ],
  note: "A short span is a fact about the documents in front of us, never a finding about the borrower. Nothing on this chart is scored, and nothing about a thin record is passed downstream as a signal.",
};

const spanClose =
  "Absence of a record is not evidence of anything. The most expensive mistake this stage can make is to report a gap in its own coverage as a finding about the borrower — and it is the mistake that looks most like diligence.";

const spanNote =
  "Cevrynt is AI-assisted infrastructure for human underwriting. It is not a lender, makes no identity, sanctions or credit determination, issues no approval or decline, and lenders retain final approval authority.";

export default function BusinessVerificationPage() {
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

      {/* 01 — the grid, and how much of it is empty */}
      <section className="bv-matrix band-light" aria-labelledby="matrix-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">What verification produces</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="matrix-heading"
              text="Five facts against four documents. Nine of the twenty cells are empty."
            />
          </div>
          <p className="eg-lede t-lede">
            Verification is a grid before it is anything else, and the interesting thing about the grid is how
            much of it nobody filled in. Read any cell to see exactly what that document says.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <SourceMatrix
              facts={matrixFacts}
              sources={matrixSources}
              readout={matrixReadout}
              aside={matrixAside}
              shot={matrixShot}
              close={matrixClose}
              note={matrixNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — the column that stays empty */}
      <section className="bv-verdict band-deep" aria-labelledby="verdict-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">What a conflict means</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="verdict-heading"
              text="Twelve readings, four conflicts, and one column that is empty all the way down."
            />
          </div>
          <p className="eg-lede t-lede">
            Every conflict has several readings and none of them can be separated by processing. The column
            you are looking for is on the grid, labelled, and blank in every row.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <VerdictColumn
              conflicts={verdictConflicts}
              columns={verdictColumns}
              readout={verdictReadout}
              aside={verdictAside}
              close={verdictClose}
              note={verdictNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — the chronology */}
      <section className="bv-plot band-light" aria-labelledby="plot-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">When it changed</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="plot-heading"
              text="Seven years on one axis, and two changes in the last eight weeks."
            />
          </div>
          <p className="eg-lede t-lede">
            Six events placed by when they actually happened, on an axis ruled by year. The long gap on the
            left and the cluster on the right are the whole of what this chart has to say.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ChangePlot
              events={plotEvents}
              window={plotWindow}
              years={plotYears}
              readout={plotReadout}
              aside={plotAside}
              close={plotClose}
              note={plotNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — ownership against the lender's line */}
      <section className="bv-holder band-deep" aria-labelledby="holder-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Who owns it</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="holder-heading"
              text="Two holdings over the line, and one of them is not on the application."
            />
          </div>
          <p className="eg-lede t-lede">
            The line is the threshold this lender drew, not a rule we brought. What sits above it has to be
            identified — and one of the two that does was never mentioned by the borrower.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <HolderPlot
              holders={holders}
              threshold={holderThreshold}
              ticks={holderTicks}
              readout={holderReadout}
              aside={holderAside}
              close={holderClose}
              note={holderNote}
            />
          </div>
        </div>
      </section>

      {/* 05 — where the documents run out */}
      <section className="bv-span band-light" aria-labelledby="span-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">Where there is nothing to check</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="span-heading"
              text="Absence of a record is not evidence of anything."
            />
          </div>
          <p className="eg-lede t-lede">
            Four situations where the documents run out early, and how far each one actually reaches. None of
            them is a failed check, and none of them is a finding about the borrower.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <CoverageSpan
              cases={spanCases}
              stages={spanStages}
              readout={spanReadout}
              aside={spanAside}
              close={spanClose}
              note={spanNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="06"
          kicker="Founder-led"
          heading="Bring the entity that never quite matches."
          lede="The interesting file is the one where the name on the filing, the name on the account and the name on the signature block are three different things, and somebody has to decide whether that is housekeeping or something else. Describe one of those and we will run it against the real thing rather than a tidy demo."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
