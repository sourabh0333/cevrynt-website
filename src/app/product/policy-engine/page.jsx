import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { PolicySpread } from "@/components/policy/policy-spread";
import { VersionShift } from "@/components/policy/version-shift";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

const page = pageByPath.get("product/policy-engine");

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
   Two sections for now, reviewed before the rest of the page is written. Same
   architecture and the same instrument language as Business Verification:
   figures on one baseline, then a measured chart, over the band-light /
   band-deep sequence.

   Both sections hold the file still and move the policy, which is the one
   thing this page has to establish. 01 puts three lenders' thresholds on one
   observation; 02 puts two versions of one lender's policy on the same
   observation and shows what that does to a decided deal.

   The detailed single-policy run already exists on the Alternative Lenders
   page — twelve criteria evaluated against one lender's rules — and is not
   repeated here. That figure moves through a policy; these hold the file and
   move the policy across it.

   Four constraints held throughout:

   1. Every observed value is the illustrative Cedar & Stone file this site
      uses throughout, and the figures match the ones already published on the
      Alternative Lenders page. The observations are constants; only the
      thresholds vary, because the thresholds are the subject.
   2. The three policies are illustrative lender configurations, not customers,
      not tiers, and not products Cevrynt offers. Cevrynt ships no default
      thresholds and recommends none.
   3. No score. The engine issues no aggregate number, no rating and no
      disposition — it reports each criterion against the lender's own line.
   4. No approval or decline. Cevrynt is not a lender, and an exception is
      raised for a person rather than resolved.
   -------------------------------------------------------------------------- */

/* 01 — one file, three policies -------------------------------------------- */

const spreadReadout = {
  figures: [
    { n: "01", k: "Borrower file" },
    { n: "03", k: "Lender policies" },
    { n: "03", k: "Different answers", tone: "held" },
  ],
  ofK: "of",
  legend: "Filled mark · the observation from the file    ·    Open marks · each lender's own line",
};

const spreadPolicies = [
  { k: "Policy A · permissive" },
  { k: "Policy B · middle" },
  { k: "Policy C · conservative" },
];

/* Observations are the published illustrative file. Only the lines differ. */
const spreadCriteria = [
  {
    k: "Average monthly deposits",
    scale: "$0 — $120K",
    value: 84.6,
    pct: 70.5,
    shown: "$84.6K",
    dir: "min",
    lines: [60, 75, 95],
    linePct: [50, 62.5, 79.2],
    lineShown: ["≥ $60K", "≥ $75K", "≥ $95K"],
    b: "The same deposits figure clears the first two lines and stops at the third. Nothing about the borrower is different in those three sentences.",
  },
  {
    k: "Average daily balance",
    scale: "$0 — $50K",
    value: 31.2,
    pct: 62.4,
    shown: "$31.2K",
    dir: "min",
    lines: [15, 20, 35],
    linePct: [30, 40, 70],
    lineShown: ["≥ $15K", "≥ $20K", "≥ $35K"],
    b: "A balance that two lenders treat as comfortable and a third treats as short of its floor.",
  },
  {
    k: "Time in business",
    scale: "0 — 36 months",
    value: 14,
    pct: 38.9,
    shown: "14 months",
    dir: "min",
    lines: [6, 12, 24],
    linePct: [16.7, 33.3, 66.7],
    lineShown: ["≥ 6 mo", "≥ 12 mo", "≥ 24 mo"],
    b: "Fourteen months is a young business or an established one depending entirely on who is reading it.",
  },
  {
    k: "Returned items · 90 days",
    scale: "0 — 12 events",
    value: 6,
    pct: 50,
    shown: "6 events",
    dir: "max",
    lines: [8, 5, 3],
    linePct: [66.7, 41.7, 25],
    lineShown: ["≤ 8", "≤ 5", "≤ 3"],
    b: "The one criterion where the line is a ceiling rather than a floor, and the only one this file clears for a single lender out of three.",
  },
];

const spreadAside = {
  title: "What the engine brings, and what it does not",
  items: [
    { k: "The arithmetic", v: "Ours" },
    { k: "The thresholds", v: "Yours" },
    { k: "A default policy", v: "None shipped" },
    { k: "A recommended line", v: "Never" },
  ],
  note: "Cevrynt ships no starting thresholds and suggests none. A policy engine that arrived with opinions about where a line belongs would be a lender with extra steps, and the three policies above are illustrative configurations rather than tiers on offer.",
};

const spreadShot = {
  src: "/media/placeholder/policy-led.png",
  w: 760,
  h: 520,
  alt: "The Cevrynt policy view: a borrower measured against lender-defined criteria, with each outcome shown against the lender's own threshold and one exception left open for judgment.",
  caption: "Illustrative product view · no universal score",
};

const spreadClose =
  "One file, three policies, three answers — and the file never changed between them. That is the whole of what a policy engine is for: the thresholds belong to the lender, the arithmetic belongs to us, and nobody's deal is measured against a number we invented.";

const spreadNote =
  "Illustrative lender configurations on the illustrative file used throughout this site. They are not customers, not tiers Cevrynt offers, and not a recommendation about where any threshold belongs.";

/* 02 — one policy, two versions -------------------------------------------- */

const shiftReadout = {
  figures: [
    { n: "04", k: "Criteria on the file" },
    { n: "03", k: "Thresholds that moved" },
    { n: "02", k: "Outcomes that flipped", tone: "held" },
  ],
  cornerK: "Criterion",
  outcomeK: "Outcome",
  saidK: "What the version is for",
  saidB:
    "{moved} of these thresholds moved and {flipped} outcomes flipped, in opposite directions, without the borrower doing anything at all. A deal evaluated under 3.3 keeps 3.3 attached to it for good — the engine does not re-judge a decided file against a rule written afterwards, because a file whose answer changes every time somebody edits a threshold is not an answer anybody can defend later.",
};

const shiftVersions = { from: "Policy v3.3", to: "Policy v3.4" };

const shiftCriteria = [
  {
    k: "Average monthly deposits",
    scale: "$0 — $120K",
    pct: 70.5,
    shown: "$84.6K",
    fromPct: 62.5,
    toPct: 75,
    fromShown: "≥ $75K",
    toShown: "≥ $90K",
    was: "Pass",
    now: "Stop",
    b: "The committee tightened deposits in the spring. The same $84.6K that cleared the old line sits below the new one, and the file it belongs to was decided months earlier.",
  },
  {
    k: "Returned items · 90 days",
    scale: "0 — 12 events",
    pct: 50,
    shown: "6 events",
    fromPct: 41.7,
    toPct: 66.7,
    fromShown: "≤ 5",
    toShown: "≤ 8",
    was: "Exception",
    now: "Pass",
    b: "Loosened in the same revision, and in the opposite direction. An exception that needed a reviewer under 3.3 would not be raised at all under 3.4.",
  },
  {
    k: "Average daily balance",
    scale: "$0 — $50K",
    pct: 62.4,
    shown: "$31.2K",
    fromPct: 40,
    toPct: 50,
    fromShown: "≥ $20K",
    toShown: "≥ $25K",
    was: "Pass",
    now: "Pass",
    b: "The line moved and the outcome did not. Worth recording anyway: the next file along may sit in the gap between the two.",
  },
  {
    k: "Time in business",
    scale: "0 — 36 months",
    pct: 38.9,
    shown: "14 months",
    fromPct: 33.3,
    toPct: 33.3,
    fromShown: "≥ 12 mo",
    toShown: "≥ 12 mo",
    was: "Pass",
    now: "Pass",
    b: "Untouched by the revision, and the only line on this chart where the two versions sit on top of each other.",
  },
];

const shiftAside = {
  title: "What travels with a decided deal",
  items: [
    { k: "The policy version", v: "Retained" },
    { k: "Each threshold as it stood", v: "Retained" },
    { k: "Re-judged on a later rule", v: "Never" },
    { k: "Who changed the rule", v: "Recorded" },
  ],
  note: "A policy change applies to what comes next. It does not reach back through files that have already been worked, and the version that evaluated a deal stays attached to that deal for as long as the record exists.",
};

const shiftClose =
  "Two outcomes flipped in opposite directions and neither borrower did anything. The version is not bookkeeping — it is the only reason anybody can answer the question every credit file eventually gets asked, which is not what the rule says now but what the rule said then.";

const shiftNote =
  "Illustrative policy versions on the illustrative file used throughout. Cevrynt issues no approval, decline or price at this stage or any other, and an exception is raised for a named reviewer rather than resolved.";

export default function PolicyEnginePage() {
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

      {/* 01 — the file held still while the policy moves */}
      <section className="pe-spread band-light" aria-labelledby="spread-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">Whose rules</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="spread-heading"
              text="One file, three policies, and three different answers."
            />
          </div>
          <p className="eg-lede t-lede">
            Four criteria, each on a measured scale, carrying one observation from the file and three lenders&rsquo;
            lines drawn across it. Read across a row and you are reading the borrower; read down a column and
            you are reading a lender.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PolicySpread
              criteria={spreadCriteria}
              policies={spreadPolicies}
              readout={spreadReadout}
              aside={spreadAside}
              shot={spreadShot}
              close={spreadClose}
              note={spreadNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — the policy moving underneath a decided deal */}
      <section className="pe-shift band-deep" aria-labelledby="shift-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">When the rule changes</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="shift-heading"
              text="Same file, same lender, and a policy that moved underneath it."
            />
          </div>
          <p className="eg-lede t-lede">
            One revision, three thresholds moved, two outcomes flipped in opposite directions — and the
            borrower did nothing in either case. What a deal keeps is the version that actually decided it.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <VersionShift
              criteria={shiftCriteria}
              versions={shiftVersions}
              readout={shiftReadout}
              aside={shiftAside}
              close={shiftClose}
              note={shiftNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="03"
          kicker="Founder-led"
          heading="Bring the rule nobody can write down."
          lede="Every credit team has one: the condition everybody applies and nobody has put into words, the exception that gets made for a particular kind of deal, the threshold that is really two thresholds depending on the season. Describe one of those and we will work out together whether it belongs in a policy engine or in front of a person."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
