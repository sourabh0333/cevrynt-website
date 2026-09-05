import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { ScopeField } from "@/components/security/scope-field";
import { RecordColumn } from "@/components/security/record-column";
import { RetentionDials } from "@/components/security/retention-dials";
import { CustodyRegister } from "@/components/security/custody-register";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

const page = pageByPath.get("security");

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

/**
 * The borrower package, at one mark per page. The five documents and their page
 * ranges are the ones the intake screen shows for this illustrative deal, and
 * they sum to the 143 pages the site quotes for it everywhere else.
 */
const packageGroups = [
  { name: "Business application", range: "1–6", pages: 6 },
  { name: "Bank statements", range: "7–126", pages: 120 },
  { name: "Identity documents", range: "127–128", pages: 2 },
  { name: "Bank proof", range: "129", pages: 1 },
  { name: "Existing MCA agreement", range: "130–143", pages: 14 },
];
const packagePages = packageGroups.reduce((sum, group) => sum + group.pages, 0);

/** This deal's trail, one entry per stratum, oldest at the top. */
const recordEntries = [
  {
    at: "09:14 UTC",
    who: "Broker",
    what: "Package received",
    detail: "Five documents and 143 pages, classified and mapped to their page ranges before anything reached underwriting.",
  },
  {
    at: "13:47 UTC",
    who: "System",
    what: "Four signals raised",
    detail: "Document integrity, duplicate submission, address conflict and cash-flow inconsistency. None of them auto-declined — a signal is raised for a person, never acted on by the system.",
  },
  {
    at: "14:02 UTC",
    who: "System",
    what: "Duplicate account signal",
    detail: "First Harbor ····7123 matched against an application submitted 42 days earlier, and recorded with the note that a match is not proof of fraud.",
  },
  {
    at: "14:19 UTC",
    who: "Underwriter",
    what: "Signal opened for review",
    detail: "Assigned to an underwriter with the resolution steps left open in the queue and the disposition intentionally withheld.",
  },
  {
    at: "14:22 UTC",
    who: "Underwriter",
    what: "Correction recorded",
    was: "Flagged — duplicate account pattern",
    now: "Resolved — same owner, second entity",
    detail: "Second entity confirmed against the registry filing; both accounts share a controlling owner. The correction was added as this entry — the finding above it is untouched.",
  },
  {
    at: "14:31 UTC",
    who: "Underwriter",
    what: "Memo sent for decision",
    detail: "Findings, supporting evidence and the correction assembled for a credit decision that stays with your team.",
  },
];

const removalRefusal = {
  label: "Try to remove the top entry",
  before:
    "The column is exactly as tall as the number of entries it holds. There is no control in the product that shortens it — use the one above and watch the height.",
  after:
    "It lifts, and it settles back at the height it left from. A correction is added to the record and stamped with who made it; nothing is ever taken out, on this deal or on any other.",
};

/**
 * Four surfaces, four clocks — and no durations, because none of them is ours
 * to state. The last two carry the marker: they are the ones a vendor review
 * usually finds unnamed.
 */
const surfaces = [
  { name: "The documents you send", what: "Bank statements, filings and the rest of the file, exactly as they arrived.", clock: "Deletion schedule set in your pilot" },
  { name: "The structured output", what: "The extraction, the analysis and the report derived from those documents.", clock: "Deletion schedule set in your pilot" },
  { name: "The run log", what: "What the system did, what a reviewer changed, and when.", clock: "Held for the audit period you set", quiet: true },
  { name: "Operational telemetry", what: "Timings, errors and throughput, used to keep the service running.", clock: "What it may carry is written into the agreement", quiet: true },
];

const retentionNote =
  "Every ring above stops short on purpose. What is settled is that each surface exists, that it has a clock of its own and who sets it — the arc left open is the duration, and that is agreed with your team before anything is sent rather than declared on a marketing page.";

/** The questions this page deliberately does not answer, and when each closes. */
const openQuestions = [
  { q: "Is our borrower data used to train models?", when: "Confirmed in writing before anything is sent" },
  { q: "Where does it live, and under whose account?", when: "Settled with your team at deployment" },
  { q: "Who else processes it?", when: "Named in your review" },
];

const custodyTally = { named: "hands, all named", undisclosed: "added without telling you" };

const holders = [
  { name: "Your systems", what: "The files you attach to a deal you send for review.", naming: "Origin" },
  { name: "Cevrynt", what: "Structures the file and runs the analysis your team reads.", naming: "Named in your agreement" },
  { name: "Cloud infrastructure", what: "Where that work runs, under a named agreement.", naming: "Named in your agreement" },
  { name: "Model providers", what: "What reads the text, and what it is permitted to do with it.", naming: "Named in your review" },
];

/** The line that stays ruled and unwritten. */
const custodyBlank = {
  note: "Not added without notice",
  body: "The fifth line is ruled and left blank on purpose. A list of four names can grow by one more line without anyone noticing; a register with a visible empty line cannot. Any name written onto it is raised with you before it happens, not after.",
};

export default function SecurityPage() {
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
            <RainbowCta href={calendlyUrl} label={page.cta || "Book a walkthrough"} />
          </div>
        </div>
      </HeroMotion>

      {/* 01 — Access: what a review can reach, and the boundary around it */}
      <section className="sec-access band-light" aria-labelledby="access-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">Access</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="access-heading"
              text="One deal in reach. Everything else stays out."
            />
          </div>
          <p className="eg-lede t-lede">
            Not a promise about scope — a count of it. Every mark below is one page of the package your team
            sent, and the review reaches those pages and no others.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ScopeField
              groups={packageGroups}
              total={packagePages}
              closing="One mark per page · the field is the whole of what a review can reach"
            />
          </div>
        </div>
      </section>

      {/* 02 — The record: the deal's own history, and what it will not drop */}
      <section className="sec-record band-deep" aria-labelledby="record-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">The record</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="record-heading"
              text="A reviewer overruled the system here. Everything about that survived."
            />
          </div>
          <p className="eg-lede t-lede">
            An auditor rarely asks whether your team may overrule a finding. They ask what is left afterwards —
            so the column below is exactly as tall as the number of entries it holds. Try to shorten it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <RecordColumn entries={recordEntries} refusal={removalRefusal} />
          </div>
        </div>
      </section>

      {/* 03 — Retention: four surfaces, four clocks, no invented durations */}
      <section className="sec-lifecycle band-light" aria-labelledby="lifecycle-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Retention</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="lifecycle-heading"
              text="Four surfaces. Four clocks. None of them set by us."
            />
          </div>
          <p className="eg-lede t-lede">
            A single retention promise is the answer that fails a review. These are the surfaces underneath
            it — and every dial stops short, because the duration is yours to set, not ours to publish.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <RetentionDials surfaces={surfaces} note={retentionNote} />
          </div>
        </div>
      </section>

      {/* 04 — Custody: the chain drawn closed, and what stays open */}
      <section className="sec-custody band-deep" aria-labelledby="custody-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Custody</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="custody-heading"
              text="Four hands, signed for. The fifth line is blank."
            />
          </div>
          <p className="eg-lede t-lede">
            The hard question in a vendor review is not who you are — it is who stands behind you, and whether
            that list can grow without anyone telling you. So it is kept as a register, with the next line ruled.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <CustodyRegister
              reference="APP-240819-017 · illustrative"
              holders={holders}
              blank={custodyBlank}
              tally={custodyTally}
              open={openQuestions}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="05"
          kicker="Founder-led review"
          heading="Bring the questionnaire to the call."
          lede="Access, retention, custody and audit worked through against your own review process, by the person who can commit to the answers."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
