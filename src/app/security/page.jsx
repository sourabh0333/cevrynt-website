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
  {
    name: "Business application",
    range: "1–6",
    pages: 6,
  },
  {
    name: "Bank statements",
    range: "7–126",
    pages: 120,
  },
  {
    name: "Owner identity",
    range: "127–128",
    pages: 2,
  },
  {
    name: "Bank proof",
    range: "129",
    pages: 1,
  },
  {
    name: "Existing MCA agreement",
    range: "130–143",
    pages: 14,
  },
];
const packagePages = packageGroups.reduce((sum, group) => sum + group.pages, 0);

/** This deal's trail, one entry per stratum, oldest at the top. */
const recordEntries = [
  {
    at: "09:14 UTC",
    who: "Intake",
    what: "Package received",
    detail:
      "The borrower package was added to the deal record, classified, and mapped before underwriting began.",
  },
  {
    at: "13:47 UTC",
    who: "Cevrynt",
    what: "Analysis completed",
    detail:
      "Financial findings and source-linked evidence were prepared and attached to the deal for reviewer inspection.",
  },
  {
    at: "14:02 UTC",
    who: "Cevrynt",
    what: "Policy exception raised",
    detail:
      "NSF activity exceeded the lender-defined threshold, leaving the exception open for human review.",
  },
  {
    at: "14:19 UTC",
    who: "Underwriter",
    what: "Exception opened for review",
    detail:
      "Sarah Kim reviewed the underlying statement activity, supporting evidence, and applicable policy rule before taking action.",
  },
  {
    at: "14:22 UTC",
    who: "Underwriter",
    what: "Override recorded",
    was: "Policy exception open",
    now: "Override accepted",
    detail:
      "Recent cash flow had improved, and four of six NSF events occurred more than 60 days earlier. The reviewer rationale was recorded with the override.",
  },
  {
    at: "14:31 UTC",
    who: "Underwriter",
    what: "Underwriting memo prepared",
    detail:
      "Updated findings, supporting evidence, policy outcomes, and reviewer rationale were assembled into the same deal record for final review.",
  },
];

const removalRefusal = {
  label: "Why this activity stays visible",
  before:
    "Material review actions stay attached to the underwriting record so a later reviewer can see what happened, when it happened, and who took the action.",
  after:
    "If a finding is corrected or overridden, Cevrynt records the new action and its rationale alongside the earlier review history rather than silently replacing the context that came before it.",
};

/**
 * Four surfaces, four clocks — and no durations, because none of them is ours
 * to state. The last two carry the marker: they are the ones a vendor review
 * usually finds unnamed.
 */
const surfaces = [
  {
    name: "Borrower source files",
    what:
      "Bank statements, applications, identity evidence, agreements, and other documents submitted for the underwriting review.",
    clock:
      "Retention defined for the approved underwriting workflow",
  },
  {
    name: "Underwriting record",
    what:
      "Structured values, analysis results, verification findings, policy outcomes, exceptions, and memo content derived from the deal.",
    clock:
      "Retention defined around review, audit, and business requirements",
  },
  {
    name: "Review activity",
    what:
      "Material reviewer actions such as exceptions opened, overrides recorded, corrections made, and review-state changes.",
    clock:
      "Retained according to the audit history your organization needs",
    quiet: true,
  },
  {
    name: "Operational & security logs",
    what:
      "Authentication events, errors, access-control events, processing status, and technical telemetry used to operate and secure the service.",
    clock:
      "Retention defined separately from borrower-file data",
    quiet: true,
  },
];

const retentionNote =
  "Retention is defined by data type, not by one blanket clock. Source files, underwriting records, review activity, and operational logs can each follow the retention and deletion requirements agreed for the workflow.";
/** The questions this page deliberately does not answer, and when each closes. */
const openQuestions = [
  {
    q: "Which providers may process borrower data?",
    when: "Documented for the approved production architecture",
  },
  {
    q: "What data does each provider actually receive?",
    when: "Scoped to the function that provider performs",
  },
  {
    q: "Where is borrower data stored and processed?",
    when: "Reviewed against agreed deployment and data-handling requirements",
  },
];

const custodyTally = {
  named: "processing layers documented",
  undisclosed: "unreviewed providers",
};

const holders = [
  {
    name: "Your intake & systems",
    what:
      "The borrower data, files, and deal information your team chooses to send into the underwriting workflow.",
    naming: "Your approved source",
  },
  {
    name: "Cevrynt application",
    what:
      "Deal organization, structured underwriting data, findings, policy results, reviewer actions, and workflow state.",
    naming: "Cevrynt processing scope",
  },
  {
    name: "Infrastructure services",
    what:
      "Storage, compute, database, queue, and delivery functions required to operate the approved environment.",
    naming: "Approved infrastructure providers",
  },
  {
    name: "AI & document-processing services",
    what:
      "Only the content required for the extraction, analysis, or verification task those services are used to perform.",
    naming: "Approved processing providers",
  },
];

/** The line that stays ruled and unwritten. */
const custodyBlank = {
  note: "Provider changes follow review",
  body:
    "The processing chain can change as the production architecture evolves. Any new provider that may handle borrower data should be reviewed under the applicable security, contractual, and change-management process before it becomes part of the approved workflow.",
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
            <p className="hx-kicker">DEAL-SCOPED ACCESS</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="access-heading"
              text="Give the review the deal — not the whole book."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt can scope an underwriting review around the borrower package and records required for that case. Unrelated deals, borrowers,
            and historical files do not need to become part of the review just because they exist in the same organization.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ScopeField
              groups={packageGroups}
              total={packagePages}
              closing="One mark per page · the review scope is the approved deal package"
            />
          </div>
        </div>
      </section>

      {/* 02 — The record: the deal's own history, and what it will not drop */}
      <section className="sec-record band-deep" aria-labelledby="record-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Review activity</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="record-heading"
              text="If something changes on a deal, the record should show who changed it and why."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt keeps material review activity attached to the same underwriting record — findings raised,
            evidence reviewed, policy exceptions handled, corrections made, and reviewer actions recorded with
            their timing and context.
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
            <p className="hx-kicker">RETENTION & DELETION</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="lifecycle-heading"
              text="Not every part of an underwriting file needs the same clock."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt separates source documents, derived underwriting data, review activity,
            and operational logs so retention can be defined around the purpose of each data type — rather than applying one blanket period to everything.
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
            <p className="hx-kicker hx-kicker-invert">DATA CUSTODY & PROCESSING</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="custody-heading"
              text="Every system that can process the file should be accounted for."
            />
          </div>
          <p className="eg-lede t-lede">
            A production Cevrynt workflow should make the processing path clear: what
            borrower data enters, which approved service layers may handle it, why each one needs access, and where responsibility sits.
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
          kicker="FOUNDER-LED SECURITY REVIEW"
          heading="Bring your security requirements."
          lede="Walk through your questionnaire, access model, retention rules, data-processing requirements, audit expectations, and deployment constraints directly with the team responsible for the product."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
