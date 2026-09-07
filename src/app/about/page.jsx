import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { SevenThenOne } from "@/components/about/seven-then-one";
import { Refrain } from "@/components/about/refrain";
import { ClaimIndex } from "@/components/about/claim-index";
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
   The grounds are plain, deliberately and for now. Six background treatments
   were tried here — texture, light, folded seams, a wedge, cut zones — and each
   one was either invisible or fought the content it sat under. The reason they
   failed is worth keeping: a ground cannot be designed as a layer slid beneath
   a finished section. The section's composition and the surface it sits on are
   one decision, and the next attempt should design a single section together
   with its ground rather than a background system applied to four of them.

   Until then the bands carry colour only. Colour descends rather than
   alternating — near-white, soft green, mid green, deepest green — and the
   crossing, where the ground goes dark and the type flips with it, is section
   three: where the page stops describing the product and starts handing over
   the means to check it.

   Nothing on this page is a claim about customers, outcomes, accuracy or
   funding. Every product claim in the index points at a screen shown elsewhere
   on this site; the ones that point at nothing are listed with an empty source.
   -------------------------------------------------------------------------- */

/* 01 — seven stages, and then something that is not a stage ---------------- */

const workflowStages = [
  { k: "Intake", b: "Mixed borrower files identified before anything is read." },
  { k: "Documents", b: "Classified, mapped to page ranges, structured." },
  { k: "Financials", b: "Statements normalised into one period and read together." },
  { k: "Verification", b: "Application claims set against independent records." },
  { k: "Fraud", b: "Signals raised for a person, with the evidence attached." },
  { k: "Policy", b: "The lender's own criteria applied, exceptions kept visible." },
  { k: "Report", b: "Findings assembled with their sources still linked." },
];

const workflowLast = {
  k: "And then",
  v: "a human decision.",
  b: "It is drawn differently because it is different. The seven above are software; this one is a person taking responsibility for an outcome, and no amount of rendering it as an eighth box would make it part of the machine.",
};

const workflowReadout = {
  figures: [
    { n: "07", k: "stages the software is responsible for" },
    { n: "01", k: "that it is not", tone: "one" },
  ],
};

const workflowNote =
  "This is the workflow described everywhere else on this site, set out once in full. The break before the last step is the only editorial decision in the figure, and it is the point of the page. Cevrynt is AI-assisted infrastructure: it is not a lender, it does not make or guarantee funding offers, and it does not replace lender judgement.";

/* 02 — the same words, at every stage -------------------------------------- */

const refrainStages = [
  { k: "Intake", b: "A classified package with page ranges" },
  { k: "Documents", b: "Structured fields, each keeping its source" },
  { k: "Financials", b: "One normalised period and its readings" },
  { k: "Verification", b: "Claims set beside records, differences named" },
  { k: "Fraud", b: "Signals raised, with what raised them" },
  { k: "Policy", b: "Criteria evaluated, exceptions held open" },
  { k: "Report", b: "A memo with the evidence still attached" },
];

const refrainPhrase = "Nothing is decided here.";

const refrainReadout = {
  stages: "stages that produce something",
  times: "times the same sentence is true",
  stage: "Stage",
  makes: "What it produces",
  and: "And",
  said:
    "A single line at the foot of a page saying the software does not decide is a disclaimer, and disclaimers get skimmed. It is true at every one of the seven, so it is written at every one of the seven.",
};

const refrainNote =
  "Analysis is produced at each stage and no disposition is issued at any of them — not an approval, not a decline, and not a recommendation dressed as one. The decision, and the accountability that comes with it, belongs to the lender.";

/* 03 — the index, on the crossing ----------------------------------------- */

const indexCheckable = [
  { k: "No automated decline is issued, at any threshold.", v: "Policy engine · auto-decline: No" },
  { k: "Exceptions are raised and held, not smoothed away.", v: "Policy engine · 2 exceptions, 1 override" },
  { k: "An override records its reviewer, reason and time.", v: "Policy engine · documented override" },
  { k: "Every structured value keeps the page and lines it came from.", v: "Extract · p.4 · lines 12–14" },
  { k: "Verification names exactly where two records differ.", v: "KYB / KYC · 214 against 210 Westlake Dr" },
  { k: "New evidence re-runs the case; it does not reset it.", v: "Reanalysis · version 1 → version 2" },
  { k: "The disposition stays with the lender's team.", v: "Deal memo · four dispositions, none issued" },
];

const indexRefused = [
  "How many lenders use this, or what they decided",
  "An accuracy, precision or model-performance figure",
  "An approval rate, a funding rate, or time-to-decision",
  "A certification or regulatory endorsement",
  "Public pricing",
  "Any guarantee of funding, eligibility or outcome",
];

const indexReadout = {
  checkable: "claims with somewhere to check them",
  refused: "claims this site does not make",
  tableLabel: "Claims made on this site and where each one can be verified",
  claim: "The claim",
  where: "Where to check it",
  split: "And the ones with no source",
  none: "— nothing to point at",

};

const indexNote =
  "Every entry above the rule points at a product screen shown elsewhere on this site, so a reader does not have to take the sentence on trust. Every entry below it is a claim a company at this stage cannot support, listed rather than omitted — leaving them out is how a reader ends up assuming them anyway. An empty source column is a more honest entry than no entry at all.";

/* 04 — the plain statement ------------------------------------------------- */

const plainStatement = "We are early, and we would rather you knew exactly how early.";

const plainFacts = [
  { k: "What it is", v: "AI-assisted underwriting and decision-intelligence infrastructure." },
  { k: "Who it is for", v: "US alternative lenders and SMB finance teams, starting with merchant cash advance." },
  { k: "What it is not", v: "A lender. Cevrynt does not originate, fund, or take part in a credit decision." },
  { k: "How it is sold", v: "Founder-led. You will be talking to the person who built it." },
];

const plainNote =
  "This page carries no customer logos and no performance figures, because publishing a number we cannot stand behind would undermine the only thing we are actually selling — that the evidence behind an answer is checkable. A partnership with SHOPLINE exists as a documented development and referral relationship; it is not an integration, an investment, or an endorsement.";

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

      {/* 01 — near-white: the workflow, and the step that is not one */}
      <section className="ab-flow band-surface" aria-labelledby="flow-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">What we build</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="flow-heading"
              text="Seven stages we are responsible for. One we are not."
            />
          </div>
          <p className="eg-lede t-lede">
            The workflow in full, set out once. Seven of its steps are software. The eighth is drawn
            differently because it is a different kind of thing.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <SevenThenOne
              stages={workflowStages}
              last={workflowLast}
              readout={workflowReadout}
              note={workflowNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — soft green: the refrain */}
      <section className="ab-refrain band-soft" aria-labelledby="refrain-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker">What we refuse to do</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="refrain-heading"
              text="The same four words, seven times."
            />
          </div>
          <p className="eg-lede t-lede">
            Every stage produces something, and it is easy to read a list of outputs as a list of judgements.
            So here is the one thing that is true at all seven — written at all seven.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <Refrain
              stages={refrainStages}
              phrase={refrainPhrase}
              readout={refrainReadout}
              note={refrainNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — the crossing: the ground goes dark and the claims get sourced */}
      <section className="ab-index band-mid" aria-labelledby="index-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">How to check us</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="index-heading"
              text="Every claim on this site, and where to go and look."
            />
          </div>
          <p className="eg-lede t-lede">
            Company pages are where the unverifiable sentences usually live. This one is an index instead —
            including the entries whose source column is empty.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ClaimIndex
              checkable={indexCheckable}
              refused={indexRefused}
              readout={indexReadout}
              note={indexNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — the floor: no apparatus, one thing set to be read */}
      <section className="ab-plain band-deep" aria-labelledby="plain-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Where we are</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="plain-heading"
              text="Early, and specific about it."
            />
          </div>
          <p className="eg-lede t-lede">
            Three figures on this page already. This one has none — after the apparatus, one thing set to be
            read.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <figure className="pln">
              <p className="pln-v">{plainStatement}</p>
              <ol className="pln-facts">
                {plainFacts.map((f) => (
                  <li className="pln-fact" key={f.k}>
                    <span className="pln-fact-k hx-mono">{f.k}</span>
                    <span className="pln-fact-v">{f.v}</span>
                  </li>
                ))}
              </ol>
              <figcaption className="pln-note">{plainNote}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="05"
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
