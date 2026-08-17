import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import { HeroMotion } from "@/components/hero-motion";
import { AnimatedHeroCopy } from "@/components/animated-hero-copy";
import { SystemsBar } from "@/components/home/systems-bar";
import { HowItWorks } from "@/components/home/how-it-works";
import { AudienceRouter } from "@/components/home/audience-router";
import { BenefitRows } from "@/components/home/benefit-rows";
import { WorkedExample } from "@/components/home/worked-example";
import { ScrubStatement } from "@/components/home/scrub-statement";
import { ObjectionBlock } from "@/components/home/objection-block";

import { RevealLines } from "@/components/home/reveal-lines";
import { ParallaxLayers } from "@/components/home/scroll-fx";
import { RoadmapTrack } from "@/components/home/roadmap-track";
import { ProblemCards } from "@/components/home/problem-cards";
import { WhyList } from "@/components/home/why-list";
import { ControlBoundary } from "@/components/home/control-boundary";
import { PartnerQuestion } from "@/components/home/partner-question";
import { PilotTimeline } from "@/components/home/pilot-timeline";
import { ResourceLines } from "@/components/home/resource-lines";
import { FounderClose } from "@/components/home/founder-close";
import { ProductShot } from "@/components/home/product-shot";
import { ScrollProgress, PointerField } from "@/components/home/fx";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { workflow, sitePages } from "@/content/site-pages";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const deal = "Illustrative deal · Cedar & Stone LLC";

const productThumbs = {
  "product/document-intelligence": [
    "thumb-documents",
    "Document intelligence preview"
  ],
  "product/bank-statement-analysis": [
    "thumb-bank",
    "Bank statement analysis preview"
  ],
  "product/business-verification": [
    "thumb-verification",
    "Business verification preview"
  ],
  "product/fraud-signals": [
    "thumb-fraud",
    "Fraud signals preview"
  ],
  "product/policy-engine": [
    "thumb-policy",
    "Policy engine preview"
  ],
  "product/underwriting-report": [
    "thumb-report",
    "Underwriting report preview"
  ]
};

const stageLabels = {
  "product/document-intelligence": "Intake → Documents",
  "product/bank-statement-analysis": "Financials",
  "product/business-verification": "Verification",
  "product/fraud-signals": "Fraud",
  "product/policy-engine": "Policy",
  "product/underwriting-report": "Report"
};

const products = sitePages
  .filter((page) => page.group === "Product")
  .map((page) => ({
    ...page,
    thumb: productThumbs[page.path]?.[0],
    thumbAlt: productThumbs[page.path]?.[1],
    stage: stageLabels[page.path],
  }));
const audiences = sitePages.filter((page) => page.group === "Solutions");

const problems = [
  ["Evidence", "Context dies between tools", "Analysts move between borrower files, spreadsheets, portals, and review tools. The reasoning behind a call lives in whichever window was open at the time."],
  ["Consistency", "Two reviewers, two reviews", "Checks vary by reviewer, by queue, and by how complex the deal looked on a Friday afternoon — not because anyone is careless."],
  ["Explainability", "Outcomes that can't be retraced", "A decision needs its sources, its context, and a record of the human judgment applied on top. Without it, every past deal becomes an argument."],
];

/** `markUpTo` lights the shared Intake→Decision strip. Add `image`/`imageAlt` to swap in a screenshot. */
const stages = [
  { title: "Document intelligence", body: "Mixed borrower files are classified and structured, and every extracted field keeps a pointer back to the page it came from.", href: "/product/document-intelligence", figure: "documents", image: "/media/placeholder/stage-documents.webp", imageAlt: "Document intelligence view: borrower files classified, each field linked to its source page", markUpTo: 1 },
  { title: "Financial analysis", body: "Deposits, balances, cash-flow rhythm, and transaction patterns are read as one view instead of six spreadsheets.", href: "/product/bank-statement-analysis", figure: "financials", image: "/media/placeholder/stage-financials.webp", imageAlt: "Cash-flow analysis view: deposit rhythm across six months with negative days flagged", markUpTo: 2 },
  { title: "Verification and fraud", body: "Business identity and operating signals are gathered, and anything that disagrees with the file is raised for a person to resolve.", href: "/product/fraud-signals", figure: "verification", image: "/media/placeholder/stage-verification.webp", imageAlt: "Verification view: entity and officer records compared against the application", markUpTo: 4 },
  { title: "Policy evaluation", body: "Your review criteria are applied to the deal, with exceptions and documented overrides kept visible rather than buried.", href: "/product/policy-engine", figure: "policy", image: "/media/placeholder/stage-policy.webp", imageAlt: "Policy evaluation view: lender criteria applied with an exception raised", markUpTo: 5 },
  { title: "Evidence-backed report", body: "Findings, sources, reviewer notes, and policy outcomes arrive as one review — and the decision stays with your team.", href: "/product/underwriting-report", figure: "report", image: "/media/placeholder/stage-report.webp", imageAlt: "Underwriting report view: findings assembled with evidence attached", markUpTo: 6 },
];

const benefits = [
  {
    label: "Outcome 01",
    title: "Stop re-reading the same bank statement three times.",
    body: "Statement activity is structured once, then stays structured for everyone who touches the file afterwards.",
    points: ["Deposits, balances, and cash-flow rhythm in one view", "Negative days and unusual patterns surfaced, not buried", "Every figure still linked to the page it came from"],
    href: "/product/bank-statement-analysis",
    linkLabel: "Bank statement analysis",
    figure: "financials",
    caption: "Cash-flow review",
    image: "/media/placeholder/outcome-cashflow.webp",
    imageAlt: "Cash-flow review: deposits, balances and negative days in one connected view",
  },
  {
    label: "Outcome 02",
    title: "Find the conflict before the funder does.",
    body: "Identity, entity, and document signals are checked against the file, and disagreements are raised for a person to resolve rather than silently scored.",
    points: ["Entity and officer records compared to the application", "Document integrity and duplicate submissions flagged", "Nothing auto-declined on a signal alone"],
    href: "/product/fraud-signals",
    linkLabel: "Fraud signals",
    figure: "verification",
    caption: "Verification review",
    image: "/media/placeholder/outcome-verification.webp",
    imageAlt: "Verification review: entity, officer and document checks with one conflict surfaced",
  },
  {
    label: "Outcome 03",
    title: "Hand the next reviewer a decision they can defend.",
    body: "Findings, sources, notes, and policy outcomes arrive as one review that can be retraced months later by someone who wasn't in the room.",
    points: ["Every finding linked to supporting evidence", "Exceptions and overrides recorded, not hidden", "Final approve, decline, or counter stays with your team"],
    href: "/product/underwriting-report",
    linkLabel: "Underwriting report",
    figure: "report",
    caption: "Decision record",
    image: "/media/placeholder/outcome-report.webp",
    imageAlt: "Decision record: findings, sources, notes and policy outcomes in one review",
  },
  {
    label: "Outcome 04",
    title: "Settle the policy question before the meeting starts.",
    body: "Every deal is measured against your own criteria, with exceptions raised and overrides recorded, so the conversation begins from the same set of facts.",
    points: ["Your thresholds, not a generic scorecard", "Exceptions surfaced with the reasoning attached", "Overrides recorded against the file, not lost in chat"],
    href: "/product/policy-engine",
    linkLabel: "Policy engine",
    figure: "policy",
    caption: "Policy evaluation",
    image: "/media/placeholder/outcome-policy.webp",
    imageAlt: "Policy evaluation: lender criteria applied to a deal with one exception raised and an override recorded",
  },
];

const ledger = [
  ["Intake", "Broker submission received with 10 files attached", "10 files"],
  ["Documents", "Classified and structured; nothing left unidentified", "10 linked"],
  ["Financials", "Six months of statements read as one cash-flow view", "6 statements"],
  ["Verification", "Entity active; registered address disagrees with the application", "1 conflict"],
  ["Fraud", "Document integrity checked; no duplicate submission found", "0 flags"],
  ["Policy", "Meets deposit and time-in-business criteria; negative-day exception raised", "1 exception"],
  ["Report", "Findings, notes, and sources assembled into one review", "12 findings"],
  ["Human decision", "Returned to the underwriter with the exception documented", "With lender"],
];

const principles = [
  {
    term: "Consistent",
    detail: "Bring every reviewer onto one shared review path instead of four private ones.",
    image: "/media/placeholder/why-consistent.webp",
    imageAlt: "One shared review path applied across a queue of files",
  },
  {
    term: "Explainable",
    detail: "Findings stay attached to the document that produced them.",
    image: "/media/placeholder/why-explainable.webp",
    imageAlt: "A finding shown with the source document it was drawn from",
  },
  {
    term: "Configurable",
    detail: "Your credit policy and your exceptions, not a fixed box.",
    image: "/media/placeholder/why-configurable.webp",
    imageAlt: "Lender-defined policy criteria with an exception recorded",
  },
  {
    term: "Human-led",
    detail: "Notes, overrides, and final authority stay with your team.",
    image: "/media/placeholder/why-human.webp",
    imageAlt: "A reviewer override recorded against a policy outcome",
  },
];

const boundaries = [
  {
    topic: "Policy",
    machine: "Evaluates each deal against the criteria your team defined, and shows the outcome with its reasoning.",
    human: "You override any outcome. The override is recorded against the file with its reasoning, not applied quietly.",
  },
  {
    topic: "Evidence",
    machine: "Keeps every finding attached to the document and page it came from, and records notes and changes as they happen.",
    human: "You own the audit trail. A file can be reconstructed after the fact by someone who was not in the room.",
  },
  {
    topic: "Access",
    machine: "Proposes an access model, data-handling approach, and deployment shape for review.",
    human: "You approve access, data handling, and deployment requirements before any pilot begins.",
  },
  {
    topic: "Decision",
    machine: "Surfaces signals, conflicts, and policy outcomes for a person to weigh.",
    human: "You approve, decline, or price. Cevrynt never does, and is not a lender.",
  },
];

const partnershipScope = [
  "Exploring merchant-underwriting workflows for e-commerce sellers",
  "Coordinated development between the two teams",
  "Qualified referrals, with lender eligibility decided independently",
];

const pilotStages = [
  {
    marker: "First call",
    title: "Scope one workflow",
    body: "Pick a bounded, representative use case — usually one product and one file type — rather than the whole book.",
  },
  {
    marker: "Before we start",
    title: "Agree how it is judged",
    body: "Define what a good result looks like up front, so the evaluation runs against your criteria and not a demo script.",
  },
  {
    marker: "In the pilot",
    title: "Work through real files",
    body: "Use files that look like your actual submissions, including the messy ones that break rules of thumb.",
  },
];

const resources = [
  {
    kind: "Article",
    title: "From documents to decision-ready underwriting",
    href: "/blog/from-documents-to-decision-ready-underwriting",
    image: "/media/placeholder/res-article.webp",
    imageAlt: "Article preview: borrower documents turned into an evidence-linked review",
    meta: "Read the article",
  },
  {
    kind: "Guide",
    title: "Evidence-focused underwriting workflows",
    href: "/resources",
    image: "/media/placeholder/res-guide.webp",
    imageAlt: "Guide preview: workflow stages with evidence attached at each step",
    meta: "Browse resources",
  },
  {
    kind: "Platform",
    title: "How the workflow connects end to end",
    href: "/platform",
    image: "/media/placeholder/res-platform.webp",
    imageAlt: "Platform preview: intake through to a decision-ready report",
    meta: "See the platform",
  },
  {
    kind: "Security",
    title: "Access, data handling, and audit requirements",
    href: "/security",
    image: "/media/placeholder/res-security.webp",
    imageAlt: "Security preview: access controls and audit history requirements",
    meta: "Review security",
  },
];

const objections = [
  ["Does Cevrynt replace human underwriters?", "No. Cevrynt gives underwriters a more complete, evidence-linked picture of a deal faster. Every workflow keeps a human decision-maker in the loop for the final approve, decline, or counter-offer call."],
  ["Is Cevrynt a lender?", "No. Cevrynt is not a lender and does not make or guarantee funding offers. Lenders retain final approval authority in every case."],
  ["Can Cevrynt work with our existing credit policy?", "Cevrynt evaluates deals against your own policy, including specific exceptions and override rules, rather than imposing a generic scoring model. Policy configuration is discussed during a walkthrough or pilot."],
  ["Do you publish approval rates or accuracy metrics?", "No. Cevrynt does not publish approval rates, accuracy percentages, or performance guarantees, and does not guarantee universal borrower eligibility. Fit is best assessed against your own file mix during a walkthrough."],
  ["Is the Cevrynt × SHOPLINE partnership a live integration?", "No. It is a documented development and referral partnership exploring e-commerce merchant-underwriting workflows. It does not imply a generally available live integration, automatic data sharing, universal merchant eligibility, or guaranteed funding."],
];

const keepReading = [
  ["Full FAQ", "/faq"],
  ["Integrations scope", "/integrations"],
  ["Cevrynt × SHOPLINE", "/partners/shopline"],
  ["About Cevrynt", "/about"],
];

function SectionHead({ index, kicker, heading, lede, invert, id }) {
  return (
    <div className="eg sec-head">
      <span className="eg-rail hx-mono">{index}</span>
      <div className="eg-head">
        <p className={`hx-kicker${invert ? " hx-kicker-invert" : ""}`}>{kicker}</p>
        <RevealLines as="h2" className="t-display-2" text={heading} id={id} />
      </div>
      {lede ? <p className="eg-lede t-lede">{lede}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content">
      <ScrollProgress />
      <HeroMotion>
        <div className="home-hero-inner">
          <AnimatedHeroCopy />
          <div className="hero-actions hero-reveal">
            <RainbowCta href={calendlyUrl} label="Get a demo" />
          </div>
        </div>
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

      <SystemsBar />

      {/* 02 — Problem */}
      <section className="pb band-deep" aria-labelledby="problem-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">The fragmented-workflow problem</p>
            <h2 className="sr-only" id="problem-heading">Why underwriting context gets lost between tools</h2>
            <ScrubStatement
              className="t-display-1"
              text="Underwriting context should not disappear between files, spreadsheets, checks, and policy reviews."
            />
          </div>
        </div>
        <ParallaxLayers />
        <div className="eg pb-body">
          <ProblemCards items={problems} />
        </div>
      </section>

      {/* 03 — Audience routing */}
      <section className="au band-light" aria-labelledby="audience-heading">
        <SectionHead
          index="03"
          id="audience-heading"
          kicker="Who it's for"
          heading="Four teams, four different reasons the file is hard."
          lede="Cevrynt is built first for MCA funders and alternative lenders, with workflows that also serve brokers and commerce-platform partners."
        />
        <div className="eg au-body">
          <PointerField className="au-full" selector=".ar-card" tilt>
            <AudienceRouter audiences={audiences} />
          </PointerField>
        </div>
      </section>

      <HowItWorks deal={deal} workflow={workflow} stages={stages} />

      {/* 05 — Outcome rows */}
      <section className="bs band-light" aria-labelledby="benefits-heading">
        <SectionHead
          index="05"
          id="benefits-heading"
          kicker="What changes"
          heading="Outcomes underwriting teams can feel by the second file."
          lede="Not a feature list. These are the three things reviewers notice first."
        />
        <div className="eg bs-body">
          <div className="bs-full">
            <BenefitRows rows={benefits} />
          </div>
        </div>
        <div className="eg sec-cta">
          <p className="eg-head t-lede">See these run against your own files.</p>
          <a className="inline-cta" href={calendlyUrl} target="_blank" rel="noreferrer">
            Book a walkthrough <ArrowUpRight />
          </a>
        </div>
      </section>

      {/* 06 — Platform */}
      <section className="pf band-light" aria-labelledby="capabilities-heading">
        <SectionHead
          index="06"
          id="capabilities-heading"
          kicker="The platform"
          heading="One route from intake to a decision your team owns."
          lede="Six capabilities, in the order a file moves through them."
        />
        <div className="eg pf-body">
          <div className="pf-full">
            <RoadmapTrack stations={products} />
          </div>
        </div>
      </section>

      {/* 07 — Worked example */}
      <section className="wk band-deep" aria-labelledby="worked-heading">
        <SectionHead
          index="07"
          id="worked-heading"
          kicker="A worked example"
          heading="One deal, and the record it leaves behind."
          lede="The same eight stages, applied to a single illustrative file. This record is the product."
          invert
        />
        <ParallaxLayers />
        <div className="eg wk-body">
          <div className="wk-full">
            <ProductShot
              src="/media/placeholder/worked-example.webp"
              alt="Underwriting workspace showing the full audit trail for one illustrative deal"
              width={1600}
              height={900}
              label="Audit trail"
              sizes="(max-width: 860px) 92vw, 1100px"
              parallax={false}
              className="wk-shot"
            />
            <WorkedExample deal={deal} entries={ledger} />
          </div>
        </div>
      </section>

      {/* 08 — Why Cevrynt */}
      <section className="wy band-light" aria-labelledby="why-heading">
        <SectionHead
          index="08"
          id="why-heading"
          kicker="Why Cevrynt"
          heading="Decision intelligence that keeps lenders in control."
          lede="The point is not speed for its own sake. It is a review your team can stand behind."
        />
        <div className="eg wy-body">
          <div className="wy-full">
            <WhyList items={principles} />
          </div>
        </div>
      </section>

      {/* 09 — Lender control */}
      <section className="ct band-light" aria-labelledby="control-heading">
        <SectionHead
          index="09"
          id="control-heading"
          kicker="Lender control"
          heading="The line we deliberately did not cross."
          lede="Cevrynt is AI-assisted infrastructure, not a decision-maker. These boundaries are design choices, not gaps."
        />
        <div className="eg ct-body">
          <div className="ct-full">
            <ControlBoundary rows={boundaries} />
          </div>
        </div>
      </section>

      {/* 10 — SHOPLINE */}
      <section className="pt band-deep" aria-labelledby="partner-heading">
        <ParallaxLayers />
        <div className="eg pt-head">
          <span className="eg-rail hx-mono">10</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Cevrynt × SHOPLINE</p>
            <RevealLines as="h2" className="t-display-2" id="partner-heading" text="Two teams, one merchant-underwriting question." />
          </div>
          <p className="eg-lede t-lede pt-lede">
            A documented development and referral partnership exploring how e-commerce merchants are
            underwritten.
          </p>
        </div>
        <div className="eg pt-body">
          <div className="pt-full">
            <PartnerQuestion
              question="How should an e-commerce merchant be underwritten when the signals live on a commerce platform?"
              scope={partnershipScope}
              href="/partners/shopline"
            />
          </div>
        </div>
      </section>

      {/* 11 — Pilot */}
      <section className="pl band-light" aria-labelledby="pilot-heading">
        <SectionHead
          index="11"
          id="pilot-heading"
          kicker="Founder-led pilot"
          heading="Three steps, and no procurement theatre."
          lede="Pilots are scoped directly with the founder. The goal is a decision about fit, quickly."
        />
        <div className="eg pl-body">
          <div className="pl-full">
            <PilotTimeline
              stages={pilotStages}
            />
          </div>
        </div>
        <div className="eg sec-cta">
          <p className="eg-head t-lede">Scope a pilot with the founder.</p>
          <a className="inline-cta" href="mailto:arin@cevrynt.com">
            arin@cevrynt.com <ArrowUpRight />
          </a>
        </div>
      </section>

      {/* 12 — Resources */}
      <section className="rs band-light" aria-labelledby="resources-heading">
        <SectionHead
          index="12"
          id="resources-heading"
          kicker="Resources"
          heading="Practical thinking for underwriting teams."
          lede="Longer reads on the workflow, the platform, and how data is handled."
        />
        <div className="eg rs-body">
          <div className="rs-full">
            <ResourceLines items={resources} />
          </div>
        </div>
      </section>

      <ObjectionBlock items={objections} links={keepReading} />

      {/* 14 — Finale */}
      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="14"
          kicker="Founder-led walkthrough"
          heading="Bring one real workflow. We'll map the review together."
          lede="Define representative files, lender-specific review criteria, and a clear evaluation plan with the founder."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
