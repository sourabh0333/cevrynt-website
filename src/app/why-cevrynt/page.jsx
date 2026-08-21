import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { FounderClose } from "@/components/home/founder-close";
import { RevealLines } from "@/components/home/reveal-lines";
import { JsonLd } from "@/components/json-ld";
import { RetentionLines } from "@/components/why/retention-lines";
import { ReadingSpread } from "@/components/why/reading-spread";
import { PolicyDivergence } from "@/components/why/policy-divergence";
import { FileRevision } from "@/components/why/file-revision";
import { BoundaryLines } from "@/components/why/boundary-lines";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

const page = pageByPath.get("why-cevrynt");

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
 * Stations along the section's scroll, read as elapsed time since the decision.
 *
 * Month six sits at 1, the far end of every lane, because the heading asks what
 * you still hold six months on — leaving the last quarter of the axis past the
 * final station made that stretch read as unlabelled time the question never
 * asked about.
 */
const timePeriods = [
  { at: 0, label: "Day one" },
  { at: 0.2, label: "Week two" },
  { at: 0.55, label: "Month two" },
  { at: 1, label: "Month six" },
];

/**
 * The three approaches, in the order their tracks appear in every lane. Position
 * is what identifies them after the key, so this order is load-bearing.
 */
const approaches = [
  { key: "hand", name: "By hand" },
  { key: "bolton", name: "Bolt-on extraction" },
  { key: "built", name: "Built for this", lead: true },
];

/**
 * The five things a review leaves behind, each with the point on the section's
 * scroll — read as time — at which an approach stops being able to produce it
 * without rebuilding the file. `null` means it is still there at month six.
 *
 * Ordered by durability, most durable first. The figures survive almost
 * anything, because they are what gets copied into the memo in the first place.
 * What the reviewer was actually looking at is the first to go, because nothing
 * in a manual or bolt-on workflow ever captured it.
 *
 * The claim is narrow on purpose: still held *without rebuilding the file*. That
 * is a property of where an approach stores its work, not a benchmark about
 * anybody's performance, and the alternatives are approaches rather than named
 * products.
 */
const artefacts = [
  { name: "The figures", lost: { hand: null, bolton: null, built: null } },
  { name: "The page each came from", lost: { hand: 0.58, bolton: null, built: null } },
  { name: "Who signed it off", lost: { hand: 0.7, bolton: 0.58, built: null } },
  { name: "Why an exception was allowed", lost: { hand: 0.45, bolton: 0.45, built: null } },
  { name: "What the reviewer was looking at", lost: { hand: 0.3, bolton: 0.3, built: null } },
];

const retentionNote =
  "If your volume is genuinely manageable by hand today, the first number is a perfectly good answer, and we would rather you kept it.";

/**
 * One page of the illustrative Cedar & Stone file, and four things a reviewer
 * could reasonably key on in it.
 *
 * `x`/`y` are coordinates in the export's own 1600x760 pixel space, each one
 * sitting on something actually visible in the artwork: the headline deposit
 * average, the original statement line behind it, the recurring daily debit,
 * and the page-and-line reference in the evidence trace.
 *
 * The point is not that any of these four is the wrong thing to look at. Each
 * is a perfectly sensible read. None of them is the whole page, which is why
 * four people doing this independently arrive at four different answers.
 */
const readingAnchors = [
  {
    key: "A",
    x: 690,
    y: 300,
    read: "Took the deposit average at face value",
    at: "Average monthly deposits",
  },
  {
    key: "B",
    x: 300,
    y: 498,
    read: "Went back to the original statement line",
    at: "Source document, page 4",
  },
  {
    key: "C",
    x: 690,
    y: 545,
    read: "Caught the recurring daily debit",
    at: "Recurring MCA debit",
  },
  {
    key: "D",
    x: 1420,
    y: 515,
    read: "Checked the page and line behind the number",
    at: "Evidence trace",
  },
];

const readingShot = {
  src: "/media/Steps/Cevrynt Extract.png",
  alt: "Cevrynt Extract view of one illustrative bank statement page: values read from the original document, normalized into underwriting fields, each keeping a page and line reference back to its source",
  caption: "Illustrative workspace · synthetic borrower data",
};

/**
 * The four acts of the graphic above, lighting as each one happens. The closing
 * mark is deliberate: this narrows disagreement, it does not remove it, and a
 * page claiming otherwise would be claiming something the product does not do.
 */
const spreadMarks = ["Four reviewers", "One page", "Same four signals", "What is left is the deal"];

/**
 * Two lender policies, and the same illustrative Cedar & Stone file read
 * against both. Every value here is the one the rest of the site uses for this
 * deal, so the page does not quietly invent a second version of it.
 *
 * The two policies cross on purpose. Lender A is tighter on negative days;
 * Lender B refuses a second position outright and wants four years in business.
 * Neither is the strict one, because a diagram where one side simply loses
 * would be a strawman — and would imply Cevrynt has a view about whose credit
 * policy is right, which it does not.
 */
const policyLenders = [{ key: "a", name: "Lender A" }, { key: "b", name: "Lender B" }];

const policyCriteria = [
  {
    name: "Monthly deposit volume",
    value: "$84,613",
    a: { rule: "Minimum $50,000", verdict: "pass" },
    b: { rule: "Minimum $75,000", verdict: "pass" },
  },
  {
    name: "Existing position",
    value: "$1,550 / day",
    a: { rule: "Second position allowed", verdict: "pass" },
    b: { rule: "No second position", verdict: "fail" },
  },
  {
    name: "Negative days, last 90",
    value: "6 days",
    a: { rule: "Maximum 3", verdict: "exception" },
    b: { rule: "Maximum 8", verdict: "pass" },
  },
  {
    name: "Ending balance",
    value: "$31,240",
    a: { rule: "Minimum $10,000", verdict: "pass" },
    b: { rule: "Minimum $25,000", verdict: "pass" },
  },
  {
    name: "Time in business",
    value: "3 years 2 months",
    a: { rule: "Minimum 2 years", verdict: "pass" },
    b: { rule: "Minimum 4 years", verdict: "fail" },
  },
];

const policyOutcomes = [
  "Proceeds to a human decision, with the negative-day exception recorded against the file.",
  "Falls outside policy on two criteria, both of them visible with the reasoning attached.",
];

/**
 * The note reconciles the two readings; this is what to do about it. The site
 * says policy configuration is worked through in a walkthrough, so that is where
 * this points rather than at a generic contact route.
 */
const policyCta = { label: "Book a walkthrough", href: calendlyUrl, external: true };

const policyNote =
  "Both readings are correct. Nothing about the file changed between them — the policy did. Cevrynt evaluates against whichever one is yours, and leaves the exception on the record either way.";

/**
 * The re-run, read straight off the export rendered beneath it.
 *
 * Every figure here appears in that artwork — deposits, balance, NSF events,
 * positions, exceptions, debt pressure — so a reader can find each one in the
 * picture. That is the entire reason for putting the two together, and it is why
 * these must never drift from the image.
 *
 * `from`/`to` drive the count; `was`/`now` are the authored strings the figure
 * settles on, so rounding cannot leave a value a hair off what the product says.
 */
const revisionVersions = [
  { label: "Version 1 · 10:42", short: "Version 1", note: "Initial package analysed" },
  { label: "Version 2 · 12:14", short: "Version 2", note: "New statement and corrected agreement included" },
];

const revisionRows = [
  {
    signal: "Average monthly deposits",
    was: "$84.6K", now: "$91.3K",
    from: 84.6, to: 91.3, decimals: 1, prefix: "$", suffix: "K",
    moved: "+7.9%", tone: "up",
  },
  {
    signal: "Average daily balance",
    was: "$31.2K", now: "$34.8K",
    from: 31.2, to: 34.8, decimals: 1, prefix: "$", suffix: "K",
    moved: "+$3.6K", tone: "up",
  },
  {
    signal: "NSF events, last 90 days",
    was: "6", now: "4",
    from: 6, to: 4,
    moved: "Improved", tone: "up",
  },
  {
    signal: "Active MCA positions",
    was: "2", now: "1",
    from: 2, to: 1,
    moved: "Reduced", tone: "up",
  },
  {
    signal: "Policy exceptions",
    was: "2", now: "1",
    from: 2, to: 1,
    moved: "−1", tone: "up",
  },
  {
    signal: "Debt pressure",
    was: "63", now: "48",
    from: 63, to: 48,
    moved: "Lower risk", tone: "up",
  },
];

const revisionShot = {
  src: "/media/Steps/Reanalysis.png",
  alt: "Cevrynt reanalysis view of an illustrative deal: new evidence listed on the left, the affected signals recomputed against their previous values in the centre, and the changes summarised against version two on the right",
  caption: "The same re-run, in the product · illustrative workspace, synthetic borrower data",
};

/**
 * The honest half. The re-run improved most of this file, and one thing it did
 * not touch stays open — which is the behaviour the rest of the page argues for.
 */
const revisionNote =
  "Not everything resolves. The address mismatch verification raised is still open against version two, carried forward rather than cleared by the re-run — because a second pass is meant to update the case, not tidy it.";

/**
 * The limits, stated before anyone has to ask for them. Each claim is something
 * people genuinely assume about AI underwriting, and each answer is a real
 * constraint rather than a modest-sounding restatement of a feature.
 */
const boundaryItems = [
  {
    claim: "It decides the deal.",
    answer:
      "It prepares the review. Your team approves, declines or prices, and the call is recorded as theirs.",
  },
  {
    claim: "It replaces your credit policy with a score.",
    answer:
      "It applies the policy you define, and shows where a deal falls outside it rather than resolving that into a number.",
  },
  {
    claim: "It is a lender.",
    answer:
      "It is not, and it does not make or guarantee funding offers. Lenders keep final approval authority in every case.",
  },
  {
    claim: "It publishes accuracy and approval rates.",
    answer:
      "It does not. Those numbers mean very little across different file mixes, so fit is assessed against your own.",
  },
  {
    claim: "It runs without a person in the loop.",
    answer:
      "Every workflow keeps a human decision-maker. That is a design choice, not a stage we intend to grow out of.",
  },
];

const boundaryNote =
  "If any of these is the thing you actually needed, we are the wrong fit, and the walkthrough is the fastest way to find that out.";

const spreadNote =
  "It will not make four underwriters agree, and it should not. What it removes is the part of the disagreement that was really about who had read which page.";

export default function WhyCevryntPage() {
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

      {/* 01 — What you still hold */}
      <section className="wc-retention band-light" aria-labelledby="retention-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">The honest comparison</p>
            <RevealLines as="h2" className="t-display-2" id="retention-heading" text="Six months on, how much of the review do you still hold?" />
          </div>
          <p className="eg-lede t-lede">
            Five things a review leaves behind, and how long each approach can still produce them without
            rebuilding the file. Scroll to move time.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <RetentionLines
              periods={timePeriods}
              approaches={approaches}
              artefacts={artefacts}
              note={retentionNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — The spread between reviewers */}
      <section className="wc-spread band-deep" aria-labelledby="spread-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Consistency</p>
            <RevealLines as="h2" className="t-display-2" id="spread-heading" text="Four underwriters. One file. Four answers." />
          </div>
          <p className="eg-lede t-lede">
            Some of that gap is the deal. Some of it is that each of them keyed on something different in the
            same page — and every one of those reads is reasonable on its own.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ReadingSpread
              shot={readingShot}
              anchors={readingAnchors}
              marks={spreadMarks}
              note={spreadNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — Whose policy decides */}
      <section className="wc-policy band-light" aria-labelledby="policy-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Lender-specific judgment</p>
            <RevealLines as="h2" className="t-display-2" id="policy-heading" text="One file. Two policies. Two answers." />
          </div>
          <p className="eg-lede t-lede">
            The same illustrative deal, read against two different lending policies. Neither lender is being
            careless, and the paths pull apart only where their own thresholds disagree.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PolicyDivergence
              lenders={policyLenders}
              criteria={policyCriteria}
              outcomes={policyOutcomes}
              note={policyNote}
              cta={policyCta}
            />
          </div>
        </div>
      </section>

      {/* 04 — When the file changes */}
      <section className="wc-revision band-light" aria-labelledby="revision-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker">When the file changes</p>
            <RevealLines as="h2" className="t-display-2" id="revision-heading" text="A file is not reviewed once." />
          </div>
          <p className="eg-lede t-lede">
            New evidence arrives mid-review — a corrected agreement, a statement that was missing. The
            case updates rather than resetting, and every signal that moved is named.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <FileRevision
              versions={revisionVersions}
              rows={revisionRows}
              shot={revisionShot}
              note={revisionNote}
            />
          </div>
        </div>
      </section>

      {/* 05 — The limits, before anyone asks */}
      <section className="wc-boundary band-deep" aria-labelledby="boundary-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">What it will not do</p>
            <RevealLines as="h2" className="t-display-2" id="boundary-heading" text="Five things Cevrynt is assumed to do, and does not." />
          </div>
          <p className="eg-lede t-lede">
            Worth reading before a walkthrough rather than during one.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <BoundaryLines items={boundaryItems} note={boundaryNote} />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="06"
          kicker="Founder-led evaluation"
          heading="Judge it against your own files."
          lede="Bring a representative workflow and the review questions your team needs answered. The evaluation runs on your criteria, not a demo script."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
