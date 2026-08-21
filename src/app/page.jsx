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
import { sitePages } from "@/content/site-pages";

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
  "product/document-intelligence": "BUSINESS IDENTITY",
  "product/bank-statement-analysis": "CASH FLOW",
  "product/business-verification": "EXISTING OBLIGATIONS",
  "product/fraud-signals": "FILE INTEGRITY",
  "product/policy-engine": "POLICY FIT",
  "product/underwriting-report": "HUMAN REVIEW"
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
  ["Evidence", "The number is there. The source isn't.", "Revenue, balances, NSFs and existing positions get copied into notes and spreadsheets. A few steps later, it becomes difficult to tell exactly which statement, transaction or document supported the number."],
  ["Consistency", "Same deal. Different underwriter. Different call.", "One reviewer catches the deposit pattern. Another focuses on the negative days. Someone else weighs an existing position differently. The file hasn't changed — the way it was reviewed has."],
  ["Explainability", "Six months later, “why?” becomes hard to answer.", "When a deal is approved, reduced, conditioned or declined, the reasoning often lives across comments, spreadsheets and someone's memory. Revisiting that decision shouldn't mean rebuilding the underwriting from scratch."],
];

/** The eight stages of one file. Swap `image`/`imageAlt` for a real export at 10:3. */
const stages = [
  { title: "Intake", body: "Whatever arrives — applications, statements, IDs, agreements or supporting files — lands against the same deal. Cevrynt keeps the package together before underwriting begins.", href: "/platform", image: "/media/Steps/intake.png", imageAlt: "Intake view: mixed borrower files arriving and queued for review" },
  { title: "Extract", body: "The file is read and structured into the fields underwriting actually needs. Names, dates, balances, deposits and other key values stay linked to the page they came from.", href: "/product/document-intelligence", image: "/media/Steps/Cevrynt Extract.png", imageWidth: 1600, imageHeight: 760, canvas: "#2a4742", imageAlt: "Extract view: values read from the original bank statement into normalized underwriting fields, each keeping a page and line reference back to its source" },
  { title: "Analysis", body: "Bank activity becomes something an underwriter can reason through: revenue behaviour, cash flow, negative days, unusual deposits, existing obligations and the patterns behind the numbers.", href: "/product/bank-statement-analysis", image: "/media/Steps/analysis.png", imageWidth: 1080, imageHeight: 850, canvas: "#0e2d2b", imageAlt: "Financial analysis view: six bank statements unified into one cash-flow rhythm, transaction pattern and quality read" },
  { title: "KYB/KYC", body: "What the application says about the business and its people is checked against available identity, entity and verification evidence. Differences are surfaced instead of quietly reconciled.", href: "/product/business-verification", image: "/media/Steps/KYB KYC.png", imageAlt: "Verification view: application record set against the verified record" },
  { title: "Fraud Detection", body: "Cevrynt looks for things worth a second look — altered documents, duplicate submissions, conflicting details and signals that do not line up across the file. It flags the issue; your team makes the call.", href: "/product/fraud-signals", image: "/media/Steps/Fraud Detection.png", imageAlt: "Fraud view: signals converging with one raised for a reviewer to resolve" },
  { title: "Policy Engine", body: "Your underwriting rules are applied to the deal as written — including limits, conditions and exceptions. When something falls outside policy, the reason stays visible rather than disappearing into a score.", href: "/product/policy-engine", image: "/media/Steps/Policy Engine.png", imageAlt: "Policy view: lender criteria applied with an exception and a recorded override" },
  { title: "Reanalysis", body: "A corrected statement or newly received document should not mean starting again. Cevrynt reruns the affected analysis and shows what changed from the previous review.", href: "/platform", image: "/media/Steps/Reanalysis.png", imageAlt: "Reanalysis view: the file re-run against new evidence with changes called out" },
  { title: "Deal Memo", body: "The important findings, supporting evidence, verification results, policy outcomes and reviewer notes come together in one record — ready for the underwriter’s final decision.", href: "/product/underwriting-report", image: "/media/Steps/Deal Memo.png", imageAlt: "Deal memo view: findings assembled with their evidence attached" },
];

const benefits = [
  {
    label: "Outcome 01",
    title: "Read the bank statement once. Keep the analysis for everyone.",
    body: "Cevrynt structures bank statement activity at the deal level, so the next reviewer does not have to reconstruct deposits, balances and cash-flow behaviour from the original PDFs again.",
    points: ["Deposits, balances, negative days and cash-flow patterns in one view","Unusual activity surfaced with the underlying transaction or statement", "Every important figure traceable back to its original source"],
    href: "/product/bank-statement-analysis",
    linkLabel: "Bank statement analysis",
    figure: "financials",
    caption: "Cash-flow review",
    image: "/media/placeholder/outcome-cashflow.webp",
    imageAlt: "Cash-flow review: deposits, balances and negative days in one connected view",
  },
  {
    label: "Outcome 02",
    title: "Catch the mismatch before it becomes someone else's problem.",
    body: "Application details, business records, identity checks and document signals are compared while the file is being reviewed. When something does not line up, Cevrynt shows the conflict instead of quietly smoothing it over.",
    points: ["Business and officer records checked against the application", "Duplicate, conflicting and suspicious document signals surfaced", "KYB/KYC and fraud findings stay visible for human review"],
    href: "/product/fraud-signals",
    linkLabel: "Fraud signals",
    figure: "verification",
    caption: "Verification review",
    image: "/media/placeholder/outcome-verification.webp",
    imageAlt: "Verification review: entity, officer and document checks with one conflict surfaced",
  },
  {
    label: "Outcome 03",
    title: "Leave the next reviewer the reason — not just the result.",
    body: "An underwriting decision should carry more than an approve, decline or counter. Cevrynt keeps the findings, source evidence, policy results and reviewer judgment together in the same deal record.",
    points: ["Findings linked directly to supporting evidence", "Exceptions, notes and human overrides preserved with the file", "Past decisions can be retraced without rebuilding the underwriting"],
    href: "/product/underwriting-report",
    linkLabel: "Underwriting report",
    figure: "report",
    caption: "Decision record",
    image: "/media/placeholder/outcome-report.webp",
    imageAlt: "Decision record: findings, sources, notes and policy outcomes in one review",
  },
  {
    label: "Outcome 04",
    title: "Know where the deal breaks policy before the credit conversation starts.",
    body: "Cevrynt evaluates the file against your own MCA or SMB lending criteria, so the team can see what passed, what failed and what needs judgment before discussing the deal.",
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
  ["Intake", "BrokBroker package received and opened as one underwriting file.", "10 files received"],
  ["Extract", "Application, six bank statements, identity documents, bank proof and existing MCA agreement were classified and mapped.", "10 / 10 files mapped"],
  ["Analysis", "Six months of bank activity were reviewed together. Average monthly deposits were $84,613, ending balance was $31,240, and a recurring $1,550/day MCA debit was surfaced.", "6 statements analysed"],
  ["KYB/KYC", "Business entity is active and the legal name matches. The registered address does not match the address on the application.", "1 conflict open"],
  ["Fraud Detection", "Duplicate-submission and document-integrity checks produced no separate fraud flag. The address conflict remains visible rather than being treated as fraud automatically.", "0 fraud flags"],
  ["Policy Engine", "Deposit volume and core business criteria pass. Negative-day activity falls outside the lender-defined threshold and needs reviewer judgment.", "1 policy exception"],
  ["Reanalysis", "Additional address evidence was added and the affected verification checks were rerun. Financial findings remained unchanged, and the revised evidence was preserved against the same deal.", "1 change recorded"],
  ["Deal Memo", "Financial findings, verification results, fraud review, policy exception, source evidence and reviewer notes were assembled into one underwriting memo.", "Ready for human review"],
];

const principles = [
  {
    term: "Traceable",
    detail: "Every important number and finding keeps the source behind it — the statement, page, transaction or verification result your underwriter can go back and inspect.",
    image: "/media/placeholder/why-consistent.webp",
    imageAlt: "One shared review path applied across a queue of files",
  },
  {
    term: "Policy-led",
    detail: "Cevrynt works from your underwriting criteria, thresholds and exceptions. It does not replace your credit policy with a universal score that your team has to work around.",
    image: "/media/placeholder/why-explainable.webp",
    imageAlt: "A finding shown with the source document it was drawn from",
  },
  {
    term: "Exception-aware",
    detail: "A mismatch should look like a mismatch. An out-of-policy condition should look like an exception. Cevrynt surfaces the gray areas instead of quietly turning them into a clean answer.",
    image: "/media/placeholder/why-configurable.webp",
    imageAlt: "Lender-defined policy criteria with an exception recorded",
  },
  {
    term: "Human-owned",
    detail: "The system prepares the review; your team makes the credit decision. Notes, overrides and the reasoning behind the call stay with the deal instead of disappearing into chat, spreadsheets or memory.",
    image: "/media/placeholder/why-human.webp",
    imageAlt: "A reviewer override recorded against a policy outcome",
  },
];

const boundaries = [
  {
    topic: "Policy",
    machine: "Cevrynt evaluates each deal against the underwriting rules, thresholds and conditions your team has defined, and shows what passed, what failed and why.",
    human: "You decide the risk appetite, thresholds, conditions and who has authority to approve an exception.",
  },
  {
    topic: "Evidence",
    machine: "Cevrynt structures the borrower file and keeps important figures, findings and risk signals connected to the document, page or transaction behind them.",
    human: "An underwriter can inspect the source, correct a finding, request more information or decide that the evidence needs a different interpretation.",
  },
  {
    topic: "Access",
    machine: "Cevrynt surfaces policy exceptions, conflicting information and unresolved signals instead of quietly turning them into a clean answer.",
    human: "You decide whether an exception is acceptable, whether conditions are needed, whether the deal should be escalated and why an override was made.",
  },
  {
    topic: "Decision",
    machine: "Cevrynt assembles the financial analysis, verification results, policy outcomes, open issues and supporting evidence into a reviewable underwriting record.",
    human: "Approval, decline, counteroffer, pricing, structure and final sign-off remain with the lender or funder.",
  },
];

const partnershipScope = [
  "Where permitted and implemented, commerce activity can add operating context around the merchant instead of asking the lender to understand the business from borrower documents alone.",
  "Cevrynt is being built to evaluate relevant merchant context alongside bank activity, borrower documents, business verification and lender-defined underwriting policy.",
  "Eligibility, pricing, structure, exceptions and the final funding decision remain independently controlled by the participating lender or funder.",
];

const pilotStages = [
  {
    marker: "First",
    title: "Choose the workflow worth testing.",
    body: "Start with a real bottleneck — bank statement review, document intake, verification, policy review, or the full underwriting file. We keep the scope narrow enough to learn something useful quickly.",
  },
  {
    marker: "BEFORE WE RUN A FILE ",
    title: "Decide what “better” actually means.",
    body: "Agree on the measures before seeing the results: review time, manual touches, extraction quality, missed conflicts, policy consistency, or how often an underwriter needs to correct the output.",
  },
  {
    marker: "In the pilot",
    title: "Compare Cevrynt with the review you already trust.",
    body: "Run a representative set of historical files — including the messy ones and edge cases. Compare what Cevrynt surfaces with what your team found, inspect the evidence behind it, and decide whether it belongs in the workflow.",
  },
];

const resources = [
  {
    kind: "Article",
    title: "Bank statement analysis for MCA underwriting: what the cash flow actually tells you",
    href: "/blog/from-documents-to-decision-ready-underwriting",
    image: "/media/placeholder/res-article.webp",
    imageAlt: "Article preview: borrower documents turned into an evidence-linked review",
    meta: "Read the article",
  },
  {
    kind: "Guide",
    title: "Existing MCA positions and stacking risk: what recurring debits can reveal",
    href: "/resources",
    image: "/media/placeholder/res-guide.webp",
    imageAlt: "Guide preview: workflow stages with evidence attached at each step",
    meta: "Browse resources",
  },
  {
    kind: "Platform",
    title: "SMB lending fraud is changing. Here's what deserves a second look.",
    href: "/platform",
    image: "/media/placeholder/res-platform.webp",
    imageAlt: "Platform preview: intake through to a decision-ready report",
    meta: "See the platform",
  },
  {
    kind: "Security",
    title: "What a useful underwriting audit trail should preserve",
    href: "/security",
    image: "/media/placeholder/res-security.webp",
    imageAlt: "Security preview: access controls and audit history requirements",
    meta: "Review security",
  },
];

const objections = [
  ["Does Cevrynt make credit decisions or replace underwriters?", "No. Cevrynt prepares the underwriting work — structuring documents, analysing bank activity, checking business and fraud signals, applying lender-defined policy, and keeping the evidence together. Your team reviews the exceptions and makes the final approval, decline, counter, pricing, or structuring decision."],
  ["Can Cevrynt work with our existing underwriting policy?", "Yes. Cevrynt is designed around the rules your team already uses, including thresholds, conditions, document requirements, and exception paths. It shows where a deal fits policy, where it does not, and why. If an underwriter overrides the result, that judgment stays recorded with the file."],
  ["Do we need an LOS or API integration before we can test Cevrynt?", "No. A pilot can start with a bounded workflow and representative historical files, without turning the first evaluation into an integration project. If the results justify moving forward, the production workflow and integrations can be scoped around the systems your team already uses."],
  ["How do you measure whether Cevrynt is accurate enough for our workflow?", "We do not treat approval rate as an accuracy metric — approval depends on your policy and risk appetite. In a pilot, we compare Cevrynt against files your underwriters already know and measure things that can actually be checked: extracted values, financial calculations, source links, conflicts surfaced, policy results, false or missed flags, and how often a reviewer needs to correct the output."],
  ["Is the Cevrynt × SHOPLINE partnership a live integration?", "Not as a universally available, plug-and-play integration today. Cevrynt and SHOPLINE have a development and referral partnership around e-commerce merchant underwriting. Any production data flow depends on the specific implementation, merchant authorization, permitted data access, and lender use case. The partnership should not be read as automatic data sharing, automatic underwriting, or guaranteed funding eligibility."],
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
            <p className="hx-kicker hx-kicker-invert">THE UNDERWRITING CONTEXT PROBLEM</p>
            {/* <h2 className="sr-only" id="problem-heading">Why underwriting context gets lost between tools</h2> */}
            <ScrubStatement
              className="t-display-1"
              text="The numbers may be in the file.The reason behind the decision usually isn’t."
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
          heading="Same deal. Different pressure depending on where you sit."
          lede="Cevrynt is built around the funder-side underwriting workflow first, while giving every team around the deal a cleaner way to prepare, review and understand the same borrower story."
        />
        <div className="eg au-body">
          <PointerField className="au-full" selector=".ar-card" tilt>
            <AudienceRouter audiences={audiences} />
          </PointerField>
        </div>
      </section>

      <HowItWorks deal={deal} stages={stages} />

      {/* 05 — Outcome rows */}
      <section className="bs band-light" aria-labelledby="benefits-heading">
        <SectionHead
          index="05"
          id="benefits-heading"
          kicker="What changes"
          heading="The difference shows up in the work your underwriters stop repeating."
          lede="For MCA funders and alternative lenders, the payoff is practical: less re-reading, earlier conflict detection, more consistent policy review, and a decision record that still makes sense months later."
        />
        <div className="eg bs-body">
          <div className="bs-full">
            <BenefitRows rows={benefits} />
          </div>
        </div>
        <div className="eg sec-cta">
          <p className="eg-head t-lede">See how Cevrynt handles your own underwriting files.</p>
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
          kicker="THE UNDERWRITING VIEW"
          heading="Six questions every deal should answer before your team makes the call."
          lede="Cevrynt brings the answers into one review — financial behaviour, business identity, existing obligations, file integrity and policy fit — with the evidence behind each one."
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
          heading="A deal should leave behind more than a status."
          lede="Here's one illustrative MCA underwriting file after Cevrynt has worked through it — the numbers, conflicts, policy exceptions and source evidence are still there when it reaches the underwriter."
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
          heading="Underwriting automation that shows its work."
          lede="Cevrynt does the repetitive work around an MCA or SMB underwriting file, but it does not hide how it got there. The evidence, lender policy, exceptions and human judgment remain visible all the way to the final review."
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
          heading="Automate the review. Keep the credit authority."
          lede="Cevrynt prepares the underwriting work — structuring evidence, applying lender-defined policy, surfacing exceptions and building the decision record. Your team keeps control of risk appetite, judgment and the final credit or funding decision."
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
            <RevealLines as="h2" className="t-display-2" id="partner-heading" text="Bringing underwriting closer to where commerce actually happens." />
          </div>
          <p className="eg-lede t-lede pt-lede">
            Cevrynt and SHOPLINE are working through a development and referral partnership around a simple question: how can e-commerce merchant underwriting use real operating context without taking the credit decision away from the lender?
          </p>
        </div>
        <div className="eg pt-body">
          <div className="pt-full">
           
            <PartnerQuestion
              question="What changes when the underwriting file can understand the business behind it?"
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
          heading="Test Cevrynt on files your underwriters already know."
          lede="A pilot starts small on purpose. Pick one underwriting workflow, agree what a useful result looks like, then run Cevrynt against representative historical files your team has already reviewed."
        />
        <div className="eg pl-body">
          <div className="pl-full">
            <PilotTimeline
              stages={pilotStages}
            />
          </div>
        </div>
        <div className="eg sec-cta">
          <p className="eg-head t-lede">Bring a workflow and a small set of representative files.</p>
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
          heading="Practical guidance for MCA and SMB underwriting teams."
          lede="Deep dives on bank statement analysis, existing positions, fraud signals and the evidence an underwriting decision should leave behind."
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
