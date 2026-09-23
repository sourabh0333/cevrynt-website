import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { SegmentTracks } from "@/components/investors/segment-tracks";
import { StickySurfaces } from "@/components/investors/sticky-surfaces";
import { StepStack } from "@/components/investors/step-stack";
import { WeightedSides } from "@/components/investors/weighted-sides";
import { BetPanels } from "@/components/investors/bet-panels";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const founderEmail = "arin@cevrynt.com";

const page = pageByPath.get("investors");

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
   Earlier drafts of this page were product marketing and page meta-commentary:
   four product claims with four screens, and a list of what the page would not
   tell you. An investor is not buying the product, and a page about the page
   answers nothing. The two questions that actually come first are why this
   market, and whether anything has been built — then distribution, then team.

   Five sections: the market, what is built, how it reaches a lender, who is
   behind it, and the assumptions underneath. Everything is grounded in
   documented facts: the segments are the four solution areas the site already
   serves, the six surfaces are the six product pages, the evaluation figure and the SHOPLINE wording are quoted exactly.

   Standing constraints for this page:

   1. The "200+ real-world underwriting files" proof point is approved for
      publication. It is an internal evaluation figure and nothing more — not
      customers, not pilots, not contracts, not revenue, and not a claim about
      accuracy or performance.
   2. No raise information anywhere. No stage, amount, valuation, terms or use
      of funds is stated or implied.
   3. SHOPLINE is described only as a documented development and referral
      partnership around e-commerce merchant-underwriting workflows — never as
      an integration, investment, endorsement, or eligibility for anybody.
   -------------------------------------------------------------------------- */

/* 01 — why this market, and why these entry points ------------------------ */

const wedgePremise =
  "Different entry points. The same underwriting infrastructure underneath.";

const wedgeReadout = {
  corner: "Market entry paths",
};

const wedgeSegments = [
  { k: "MCA funders" },
  { k: "Alternative lenders" },
  { k: "Brokers & ISOs" },
  { k: "E-commerce underwriting" },
];

const wedgeProperties = [
  {
    k: "The file",
    cells: [
      "Applications, bank statements, existing positions, and business evidence.",
      "Borrower documents, financials, verification, and supporting records.",
      "A submission package prepared for one or more downstream funders.",
      "Bank evidence alongside approved commerce activity, payouts, and operating history.",
    ],
  },
  {
    k: "Who decides",
    cells: [
      "The funder's underwriting team.",
      "The lender's credit or risk team.",
      "The downstream funder, not the broker.",
      "The financing provider reviewing the merchant.",
    ],
  },
  {
    k: "What varies",
    cells: [
      "Repayment tolerance, stacking rules, thresholds, and risk appetite.",
      "Product criteria, eligibility rules, exceptions, and policy version.",
      "Required documents, lender appetite, stipulations, and submission requirements.",
      "Available commerce evidence, lender criteria, and how platform activity is weighed.",
    ],
  },
];

const wedgeFoot =
  "The segments are not identical, but the underwriting work underneath them repeats: assemble the evidence, understand the financials, verify the business, apply lender-specific policy, surface exceptions, and prepare the case for human review.";

const wedgeClose =
  "Cevrynt is not building four separate underwriting products. It is building one evidence and policy layer that can support multiple small-business financing workflows.";

const wedgeNote =
  "These describe Cevrynt's current market-entry paths, not customer counts, market share, or active deployments. Each workflow has different underwriting requirements, data availability, and lender policy.";

/* 02 — what exists, and what proved it ------------------------------------ */

const surfaceReadout = {
  builtK: "Built · six connected underwriting surfaces",
};

/* The six product pages the site already publishes. Four of them have a view
   below; `shown` marks those so the rail can say which is which. */
const surfaces = [
  {
    shown: true,
    k: "Document intelligence",
    b: "Classifies borrower files, extracts material fields, and keeps source references attached.",
  },
  {
    k: "Bank statement analysis",
    b: "Structures deposits, balances, cash flow, NSF activity, transfers, and repayment obligations.",
  },
  {
    shown: true,
    k: "Business verification",
    b: "Compares submitted claims with verification evidence while keeping conflicts visible.",
  },
  {
    k: "Fraud & review signals",
    b: "Surfaces document issues, inconsistencies, unusual activity, and other review signals with evidence attached.",
  },
  {
    shown: true,
    k: "Lender policy",
    b: "Applies configured criteria and thresholds while preserving observed values, exceptions, and policy context.",
  },
  {
    shown: true,
    k: "Underwriting record",
    b: "Assembles findings, verification, policy outcomes, exceptions, and source-linked evidence into one reviewable case.",
  },
];

const surfaceFigure = "200+";

const surfaceFigureK =
  "historical deal files used to test and refine the working underwriting workflow internally";

/* In surface order, so the rail lights top to bottom as these go past. */
const surfacePlates = [
  {
    surface: 0,
    k: "A financial finding traced back to the statement page and supporting transactions.",
    shot: {
      src: "/media/placeholder/Traceable.png",
      alt: "Illustrative Cevrynt evidence-trace view showing an $84,613 financial finding linked back to the supporting bank statement page, source lines, and underlying transaction evidence.",
    },
  },
  {
    surface: 2,
    k: "A verification conflict kept open with both values and their evidence preserved.",
    shot: {
      src: "/media/placeholder/Exception-aware.png",
      alt: "Illustrative Cevrynt verification view showing conflicting business information side by side, both source values preserved, and the mismatch held open for human review.",
    },
  },
  {
    surface: 4,
    k: "Lender-defined criteria applied with the exception left visible for judgment.",
    shot: {
      src: "/media/placeholder/policy-led.png",
      alt: "Illustrative Cevrynt policy view showing lender-configured criteria, observed values, thresholds, passing checks, and one exception kept open for reviewer judgment.",
    },
  },
  {
    surface: 5,
    k: "A decision-ready review assembled with the evidence, policy context, and reviewer record intact.",
    shot: {
      src: "/media/placeholder/Human-owned.png",
      alt: "Illustrative Cevrynt underwriting-record view bringing financial findings, verification issues, policy exceptions, source-linked evidence, and reviewer context into one reviewable case.",
    },
  },
];

const surfaceClose =
  "Six connected underwriting surfaces, tested and refined against historical deal files rather than designed from a specification alone. The goal is a workflow that can hold up when the submission is incomplete, inconsistent, or messy.";

const surfaceNote =
  "Historical deal files have been used during internal product development and evaluation. Product views shown here use illustrative synthetic borrower data. They should not be read as customer deployments, funded transactions, or independently validated accuracy, approval-rate, coverage, or performance results.";
/* 03 — how a lender comes in --------------------------------------------- */

const routeReadout = {
  head: "Four steps · one lender-led evaluation path",
};

/* Each carries a short tag naming what it costs the lender to take the step —
   the stack is about how little is asked before anything is proven. */
const routeSteps = [
  {
    k: "Founder-led workflow review",
    b: "Start with how the lender already underwrites: the file, policy rules, exception handling, evidence requirements, and what still depends on reviewer judgment.",
    tag: "Start with their workflow",
  },
  {
    k: "Configure their policy",
    b: "Use the lender's own criteria, thresholds, eligibility rules, and exception logic rather than replacing them with a default model.",
    tag: "Their rules · their policy",
  },
  {
    k: "Run a file they already know",
    b: "Put a familiar deal through the full workflow so the team can inspect the findings, exceptions, and source-linked evidence against a case they already understand.",
    tag: "Known file · end to end",
  },
  {
    k: "Let the underwriting team judge the output",
    b: "The lender compares Cevrynt's review with its own process, identifies what holds up, what needs context, and whether the workflow is worth taking deeper.",
    tag: "The lender decides what comes next",
  },
];

const routeNoteLine =
  "The first proof is not a benchmark slide. It is whether an underwriter recognizes their policy, understands the output, and can trace the important findings back to the file.";

const routeAside = {
  k: "A second distribution path",
  b: "Direct lender evaluation is founder-led today. The Cevrynt × SHOPLINE relationship creates an additional path for exploring e-commerce merchant-underwriting workflows where approved commerce context can sit alongside traditional underwriting evidence. It should not be read as universal live integration, automatic data access, merchant eligibility, or guaranteed funding.",
};

const routeClose =
  "Founder-led at the front. Lender-specific policy in the middle. Evidence-based evaluation before deeper deployment. Cevrynt earns the right to go further by holding up on a file the underwriting team already understands.";

const routeNote =
  "This describes Cevrynt's current go-to-market approach, not completed customer deployments or scaled distribution. Deeper pilots, integrations, and production requirements would depend on the lender, workflow, policy, and evaluation results.";
/* 04 — who you would be backing ------------------------------------------ */

const founderStatement = [
  "One founder at the center today.",
  "Fast product and market feedback now.",
  "Not the intended shape forever.",
  "The goal is to turn founder knowledge into company capability.",
];

/* Two sides of one fact, at the same size. Neither is the default and the risk
   column is not the one that has to be opened. */
const founderSides = [
  {
    k: "What that gives",
    foot: "Three advantages of keeping product, market learning, and decisions close together.",
    items: [
      {
        k: "Fast product decisions.",
        b: "Lender feedback, workflow gaps, and product questions reach the person making the decisions without layers of translation.",
      },
      {
        k: "Direct market learning.",
        b: "Underwriting objections, edge cases, partnership conversations, and buyer feedback feed directly back into what Cevrynt builds next.",
      },
      {
        k: "Capital efficiency.",
        b: "A lean operating structure keeps fixed cost low while Cevrynt is still proving product-market fit and a repeatable go-to-market motion.",
      },
    ],
  },

  {
    cost: true,
    k: "What has to change",
    foot: "The same founder concentration that creates speed today becomes a risk if it remains unchanged as the company grows.",
    items: [
      {
        k: "Reduce key-person dependency.",
        b: "Product knowledge, lender context, operating processes, and relationships need to move from one person into documented systems and a broader team.",
      },
      {
        k: "Build delivery depth.",
        b: "Production underwriting infrastructure will require additional engineering, product, security, implementation, and lender-facing capacity.",
      },
      {
        k: "Make distribution repeatable.",
        b: "Founder-led selling works for early discovery, but the company ultimately needs a motion that does not depend on the founder for every evaluation and relationship.",
      },
    ],
  },
];

const founderClose =
  "Founder-led execution creates speed and direct learning today, but the long-term goal is not founder dependence. Capital should help turn what currently sits with one person into repeatable systems, broader capability, and a company that can scale beyond the founder.";

const founderNote =
  "Cevrynt is founder-led and early-stage today. The section describes the current operating reality and the capabilities that need to broaden over time, not a fixed future org chart or committed hiring plan.";
/* 05 — the assumptions underneath all of it ------------------------------- */

const betReadout = {
  head: "Three assumptions · each with what would show it wrong",
  failK: "Wrong if",
};

/* Not forecasts. Each is an assumption the product's design has already
   committed to, which is why it is expensive to be wrong about — and each is
   published with its falsifier, because an assumption nobody can disprove is a
   slogan rather than an assumption. */
const bets = [
  {
    k: "Lenders will value automation without giving up the final call.",
    b: "Cevrynt prepares the underwriting case: evidence, financial analysis, verification, policy checks, and exceptions. The final disposition remains with the lender by design, not as a setting layered on top.",
    fail: "If target lenders consistently prefer fully autonomous approval and decline engines, keeping human ownership of the decision becomes a constraint rather than an advantage.",
  },
  {
    k: "Lender-specific policy matters enough to configure explicitly.",
    b: "Cevrynt applies each lender's criteria, thresholds, eligibility rules, and exception logic rather than relying on one universal scorecard or default underwriting policy.",
    fail: "If one generic model satisfies most target lenders well enough, per-lender configuration adds complexity without enough corresponding value.",
  },
  {
    k: "Traceable evidence is valuable enough to justify the engineering.",
    b: "Material findings remain connected to the documents, pages, transactions, verification evidence, calculations, and policy rules that support them throughout the review.",
    fail: "If underwriting teams consistently prefer summarized outputs over source traceability, one of the most deliberate parts of the product is solving a problem buyers do not value enough.",
  },
];

const betFoot =
  "These are not forecasts. They are assumptions already embedded in Cevrynt's architecture, product boundaries, and go-to-market approach — which is exactly why they are worth testing early.";

const betClose =
  "The product already embodies all three bets. The next proof is whether lenders value them enough to drive adoption, repeat usage, and deeper deployment.";

const betNote =
  "These describe product and market assumptions, not forecasts or claims of future adoption, revenue, or performance. Nothing on this page constitutes an offer to sell or a solicitation of an offer to buy any security.";

export default function InvestorsPage() {
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
            <RainbowCta href={page.ctaHref || `mailto:${founderEmail}`} label={page.cta || "Contact the founder"} />
          </div>
        </div>
      </HeroMotion>

      {/* 01 — why this market */}
      <section className="iv-wedge band-light" aria-labelledby="wedge-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">THE MARKET</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="wedge-heading"
              text="Four buyers. One shape of problem."
            />
          </div>
          <p className="eg-lede t-lede">
           Cevrynt starts in U.S. small-business finance, where the inputs vary by channel but the underlying work repeats: 
           assemble fragmented evidence, understand cash flow, verify the business, apply lender-specific policy, surface exceptions, and prepare the case for human judgment.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <SegmentTracks
              segments={wedgeSegments}
              properties={wedgeProperties}
              premise={wedgePremise}
              foot={wedgeFoot}
              close={wedgeClose}
              note={wedgeNote}
              readout={wedgeReadout}
            />
          </div>
        </div>
      </section>

      {/* 02 — what exists */}
      <section className="iv-surfaces band-deep" aria-labelledby="surfaces-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">WHAT IS BUILT</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="surfaces-heading"
              text="The core underwriting workflow already exists."
            />
          </div>
          <p className="eg-lede t-lede">
           Cevrynt is early-stage, but the product is beyond a specification. The working system connects the core underwriting surfaces from raw borrower evidence through financial analysis,
            verification, policy, exceptions, and the final review.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <StickySurfaces
              surfaces={surfaces}
              plates={surfacePlates}
              figure={surfaceFigure}
              figureK={surfaceFigureK}
              close={surfaceClose}
              note={surfaceNote}
              readout={surfaceReadout}
            />
          </div>
        </div>
      </section>

      {/* 03 — how it reaches a lender */}
      <section className="iv-route band-light" aria-labelledby="route-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">HOW IT REACHES A LENDER</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="route-heading"
              text="Start with one known file. Earn the right to go deeper."
            />
          </div>
          <p className="eg-lede t-lede">
            The first evaluation should not require a lender to replace its workflow or trust a benchmark. Cevrynt starts with the lender’s existing policy and a deal file the team already understands, then makes the output inspectable before any deeper deployment conversation.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <StepStack
              steps={routeSteps}
              noteLine={routeNoteLine}
              aside={routeAside}
              close={routeClose}
              note={routeNote}
              readout={routeReadout}
            />
          </div>
        </div>
      </section>

      {/* 04 — who is behind it */}
      <section className="iv-founder band-deep" aria-labelledby="founder-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">THE TEAM TODAY</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="founder-heading"
              text="Founder-led today. Built to become bigger than the founder."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt is still close enough to the product that underwriting feedback, product decisions, partnerships, and investor conversations reach the founder directly. That creates speed and context today. It also creates concentration risk that the company has to reduce as it grows.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <WeightedSides
              statement={founderStatement}
              sides={founderSides}
              close={founderClose}
              note={founderNote}
            />
          </div>
        </div>
      </section>

      {/* 05 — the assumptions underneath all of it */}
      <section className="iv-bet band-light" aria-labelledby="bet-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">WHAT YOU WOULD BE UNDERWRITING</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="bet-heading"
              text="Three product bets. Three clear ways to prove us wrong."
            />
          </div>
          <p className="eg-lede t-lede">
            These are not forecasts about revenue or market share. They are assumptions already embedded in Cevrynt’s architecture, product boundaries, and go-to-market motion. If any of them are materially wrong, the company would need more than a feature change.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <BetPanels bets={bets} foot={betFoot} close={betClose} note={betNote} readout={betReadout} />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="06"
          kicker="FOUNDER-LED INVESTOR CONVERSATION"
          heading="If the thesis is relevant, let’s go deeper."
          lede="This page covers what Cevrynt is building, where we are starting, what exists today, and the assumptions still to prove. Current fundraising context, company structure, roadmap priorities, operating detail, and investor materials are shared directly with prospective investors."
          calendlyUrl={`mailto:${founderEmail}`}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
