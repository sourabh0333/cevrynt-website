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
  "Four different buyers, and the same three facts are true in all of them.";

const wedgeReadout = { corner: "Reading across" };

/* The four solution areas the site already serves, in the order it lists them. */
const wedgeSegments = [
  { k: "MCA funders" },
  { k: "Alternative lenders" },
  { k: "Brokers and ISOs" },
  { k: "E-commerce merchant underwriting" },
];

const wedgeProperties = [
  {
    k: "The file",
    cells: [
      "Six months of bank statements, read by hand.",
      "Statements, filings and an application, assembled per deal.",
      "A package put together for whichever funder it is going to.",
      "Statements alongside platform settlement and order history.",
    ],
  },
  {
    k: "Who decides",
    cells: [
      "An underwriter, on the file in front of them.",
      "A credit or risk team, against written policy.",
      "The funder they submit to, not the broker.",
      "The funder, on a merchant introduced by the platform.",
    ],
  },
  {
    k: "What varies",
    cells: [
      "Each funder's own thresholds and appetite.",
      "Each lender's written policy, and its version.",
      "What each funder will accept in a submission.",
      "The funder's policy, and what the platform can evidence.",
    ],
  },
];

const wedgeFoot =
  "Document-led intake, a person making the call, and policy that is never the same twice. That combination is why this work is still manual, and it is the reason the product is configured per lender rather than sold as one model.";

const wedgeClose =
  "The same three facts across four buyers is what makes this infrastructure rather than a point tool. Cevrynt is built underneath all four, not for any one of them.";

const wedgeNote =
  "These describe shapes of lending operation, not customers. Cevrynt claims no clients, pilots or contracts anywhere on this site, and nothing here states that any particular lender or platform uses the platform.";

/* 02 — what exists, and what proved it ------------------------------------ */

const surfaceReadout = {
  builtK: "Built · six product surfaces",
};

/* The six product pages the site already publishes. Four of them have a view
   below; `shown` marks those so the rail can say which is which. */
const surfaces = [
  { shown: true, k: "Document intelligence", b: "Page and line references kept attached to every extracted field." },
  { k: "Bank statement analysis", b: "Deposits, balances, cash flow and transaction patterns across the set." },
  { shown: true, k: "Business verification", b: "Conflicting records held open rather than normalised away." },
  { k: "Fraud signals", b: "Document-integrity and duplicate-submission checks raised against the file." },
  { shown: true, k: "Policy engine", b: "Evaluation against the criteria and thresholds each lender configures." },
  { shown: true, k: "Underwriting report", b: "Every figure still pointing back to the document it came from." },
];

const surfaceFigure = "200+";

const surfaceFigureK =
  "real-world underwriting files the working product was evaluated and corrected against, internally";

/* In surface order, so the rail lights top to bottom as these go past. */
const surfacePlates = [
  {
    surface: 0,
    k: "A figure opened back to the statement page and the transactions underneath it.",
    shot: {
      src: "/media/placeholder/Traceable.png",
      alt: "An illustrative Cevrynt evidence trace: a finding of $84,613 average monthly deposits linked to page 4 of a bank statement showing total deposits, then to the individual card settlement and ACH deposit transactions underneath it, with a trace path running finding to statement to page to transaction.",
    },
  },
  {
    surface: 2,
    k: "A verification mismatch held open, with both values and their sources kept.",
    shot: {
      src: "/media/placeholder/Exception-aware.png",
      alt: "An illustrative Cevrynt exception view: a verification mismatch showing two conflicting business addresses side by side with their sources retained, and negative-day activity crossing the lender's configured threshold, beside a human judgment panel listing the reviewer's steps and a final state of human review required.",
    },
  },
  {
    surface: 4,
    k: "The lender's own thresholds, and the rule that needs judgment left open.",
    shot: {
      src: "/media/placeholder/policy-led.png",
      alt: "An illustrative Cevrynt policy fit matrix: three lender-defined criteria with the borrower's position plotted against each threshold, two passing and one flagged for judgment, beside a panel stating that the exception needs reviewer judgment rather than a hidden score.",
    },
  },
  {
    surface: 5,
    k: "The file arrives prepared, and the reviewer's reasoning stays on the record.",
    shot: {
      src: "/media/placeholder/Human-owned.png",
      alt: "An illustrative Cevrynt reviewer control view: a prepared file listing the financial picture, a verification conflict and a policy exception, a named decision owner marked as the final call, and a decision record holding the reviewer's outcome, note and override reason.",
    },
  },
];

const surfaceClose =
  "Six surfaces, corrected against real files rather than written to a specification — which is the difference between a product that survives a messy submission and one that demonstrates well.";

const surfaceNote =
  "An internal evaluation figure and illustrative product views using synthetic borrower data. No accuracy, approval-rate, coverage or performance figure is published anywhere on this site. Cevrynt is AI-assisted infrastructure and is not a lender.";

/* 03 — how a lender comes in --------------------------------------------- */

const routeReadout = { head: "Four steps · in order · one path, not a menu" };

/* Each carries a short tag naming what it costs the lender to take the step —
   the stack is about how little is asked before anything is proven. */
const routeSteps = [
  {
    k: "A conversation with the founder",
    b: "The first call is with the person who builds it, and it is about what the product cannot do yet as much as what it can.",
    tag: "Costs an hour",
  },
  {
    k: "Their policy, written down",
    b: "Criteria and thresholds are configured per lender. Nothing is inferred, and nothing ships with a default policy.",
    tag: "Costs a document they already have",
  },
  {
    k: "A file of their own, run end to end",
    b: "Their documents through the workflow, with the evidence kept attached at every stage — so what is being judged is their own paperwork, not a demo file.",
    tag: "Costs one deal's paperwork",
  },
  {
    k: "Their underwriter's verdict",
    b: "The output is analysis. The disposition, and the accountability attached to it, stays exactly where it already was.",
    tag: "Costs nothing that was theirs",
  },
];

const routeNoteLine =
  "Configuration is the install. Because policy is the lender's and is written down rather than learned, adoption is an act of setting thresholds — not a model that has to be trusted before it can be used.";

const routeAside = {
  k: "One documented route through a platform",
  b: "Cevrynt and SHOPLINE have a documented development and referral partnership around e-commerce merchant-underwriting workflows. It is not an integration, an investment, an endorsement, or eligibility for any merchant, and lender decisions stay independent of it.",
};

const routeClose =
  "Founder-led at the front, configured per lender in the middle, and the decision left exactly where it started. That is the whole motion, and there is no step in it that asks anyone to trust a black box.";

const routeNote =
  "This describes how an engagement would proceed. Cevrynt claims no clients, pilots or contracts anywhere on this site, and nothing here states that any lender or platform has completed these steps.";

/* 04 — who you would be backing ------------------------------------------ */

const founderStatement = [
  "One founder.",
  "No sales team, no account layer,",
  "and nothing between you and the",
  "person who makes the decisions.",
];

/* Two sides of one fact, at the same size. Neither is the default and the risk
   column is not the one that has to be opened. */
const founderSides = [
  {
    k: "What that gives",
    foot: "All three are consequences of there being nobody in between.",
    items: [
      {
        k: "Direct answers.",
        b: "Questions about what it cannot do go to the person who knows, and come back the same day rather than through a filter.",
      },
      {
        k: "Decisions in one conversation.",
        b: "Scope, priorities and commitments are settled with the person who will do the work, not relayed to somebody who might.",
      },
      {
        k: "Nothing oversold.",
        b: "There is no incentive layer between the product and the claim, which is most of why this site publishes no metric it cannot stand behind.",
      },
    ],
  },
  {
    cost: true,
    k: "What that costs",
    foot: "All three are the same absence, read from the other side.",
    items: [
      {
        k: "Narrow scope.",
        b: "One person builds one thing at a time. The boundary in the sections above is tight partly because it has to be.",
      },
      {
        k: "Early, with no cushion.",
        b: "There is no team to absorb a bad month, and no second line of delivery if the first one stalls.",
      },
      {
        k: "Concentration.",
        b: "Everything depends on one person continuing. That is a real risk to underwrite, and it is better named here than discovered later.",
      },
    ],
  },
];

const founderClose =
  "The advantages and the risk are the same fact seen from two sides. An investor is going to work that out in the first five minutes, so both sides are set down here at the same size.";

const founderNote =
  "Cevrynt is early and founder-led. No team size, hiring plan or org structure beyond this is stated, because there is none to state.";

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
    k: "Lenders want to keep the decision.",
    b: "The engine issues no score, approval or decline, and that choice is built into every surface rather than configured on top of one. Undoing it would mean rebuilding the product, not changing a setting.",
    fail: "If lenders would rather hand the disposition over than keep it, the boundary this company is built around is a liability and a decision engine wins the category.",
  },
  {
    k: "Policy differs enough per lender that configuring beats one model.",
    b: "Evaluation runs against the criteria and thresholds each lender sets, and nothing ships with a default policy. Every install is a configuration exercise by design.",
    fail: "If one generic scorecard turned out to satisfy most lenders, per-lender configuration is cost without advantage and a single model undercuts it.",
  },
  {
    k: "Provenance is worth engineering for.",
    b: "Page and line references are carried through every stage rather than reconstructed at the end, which is most of the engineering and all of the discipline.",
    fail: "If lenders are content with a figure they cannot open, the most expensive part of this product is solving a problem nobody is paying to have solved.",
  },
];

const betFoot =
  "These are not predictions about the market. They are the assumptions already spent — each one is visible in a design decision that has been made and would be costly to reverse, which is exactly why they are the ones worth arguing about.";

const betClose =
  "Every one of them can be checked against the product rather than debated in the abstract. That is the only reason they are worth putting on a public page.";

const betNote =
  "These describe the assumptions behind design decisions already taken. They are not forecasts, and no market outcome, adoption or result is claimed or implied. Nothing on this page or elsewhere on this site is an offer to sell or a solicitation of an offer to buy any security.";

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
            <p className="hx-kicker">The market</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="wedge-heading"
              text="Four buyers. One shape of problem."
            />
          </div>
          <p className="eg-lede t-lede">
            U.S. alternative lending, merchant cash advance first. The four segments this is built for look
            different from the outside and are identical where it matters — read across the rows.
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
            <p className="hx-kicker hx-kicker-invert">What is built</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="surfaces-heading"
              text="Six surfaces, and the files that corrected them."
            />
          </div>
          <p className="eg-lede t-lede">
            A functional product across six areas, evaluated internally against real underwriting files rather
            than written to a specification. The list stays with you as four of the six go past.
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
            <p className="hx-kicker">How it reaches a lender</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="route-heading"
              text="Four steps, and none of them ask for trust up front."
            />
          </div>
          <p className="eg-lede t-lede">
            Distribution is the question after the product one. This is the whole motion — who the first
            conversation is with, what gets configured, and where the decision ends up.
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
            <p className="hx-kicker hx-kicker-invert">Who you would be backing</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="founder-heading"
              text="One founder. Lean on either side of that."
            />
          </div>
          <p className="eg-lede t-lede">
            Founder-led is usually written up as an advantage and left there. It is also a concentration risk,
            so both sides are here, in one grid, at the same size.
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
            <p className="hx-kicker">What you would be underwriting</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="bet-heading"
              text="Three assumptions, each with its own way of being wrong."
            />
          </div>
          <p className="eg-lede t-lede">
            Not forecasts — the assumptions the design has already spent, and what would show each one wrong.
            They are the expensive ones because reversing any of them means rebuilding.
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
          kicker="Founder-led"
          heading="The rest is a conversation."
          lede="Revenue, pipeline, ownership and what ships next are not published on an open page — some of it does not exist yet, and the rest is not ours to post. There is no deck link here, so those questions get answered in person or not at all."
          calendlyUrl={`mailto:${founderEmail}`}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
