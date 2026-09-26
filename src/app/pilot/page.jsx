import Image from "next/image";
import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { ScopeSlabs } from "@/components/pilot/scope-slabs";
import { ComparisonLadder } from "@/components/pilot/comparison-ladder";
import { CriteriaManifold } from "@/components/pilot/criteria-manifold";
import { SettleMatrix } from "@/components/pilot/settle-matrix";
import { AfterSplit } from "@/components/pilot/after-split";
import { LimitsList } from "@/components/pilot/limits-list";
import { JsonLd } from "@/components/json-ld";
import { pageByPath, workflow } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

const page = pageByPath.get("pilot");

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
   The pilot page, on the same architecture as the product and partner pages:
   numbered sections over the band-light / band-deep sequence, each carrying one
   drawn figure rather than a list.

   01 writes the workflow out stage by stage with what a pilot would compare at
   each, and draws the scopes as nested brackets down the margin — so "bounded
   use case" is literal, and the stage every bracket stops short of is visible.
   02 draws the run as a ladder between the review a team already did and what
   Cevrynt prepared from the same file, one rung per comparison, with the rung
   a pilot refuses to make drawn cut.
   -------------------------------------------------------------------------- */

/* Where each stage is explained in full. The last one is the lender's own work,
   so it carries no product link. */
const stageLinks = {
  Intake: "/platform",
  Documents: "/product/document-intelligence",
  Financials: "/product/bank-statement-analysis",
  Verification: "/product/business-verification",
  Fraud: "/product/fraud-signals",
  Policy: "/product/policy-engine",
  Report: "/product/underwriting-report",
};

/* What the comparison actually looks at, stage by stage. Each line names
   something a reviewer can check on a file they have already worked. */
const stageChecks = {
  Intake: "Whether every document that arrived is accounted for, and what was still missing when it did.",
  Documents: "Whether each value read from a document matches the page and line it was taken from.",
  Financials: "Whether deposits, ending balances and debt rhythm reproduce the numbers your analyst reached.",
  Verification: "Whether registry and identity results agree with what the application claimed, and where they differ.",
  Fraud: "Whether the conflicts your reviewers found were surfaced — and whether any were raised that were not real.",
  Policy: "Whether your own thresholds produce the same passes and exceptions your team recorded.",
  Report: "Whether the deal memo carries the evidence a second underwriter would need to take the file over.",
  "Human Decision": "Not tested at any scope. The call stays with your underwriter, recorded against the file.",
};

const scopeStages = workflow.map((name) => ({
  name,
  href: stageLinks[name] || null,
  checks: stageChecks[name],
  outside: name === "Human Decision",
}));

/* Brackets are grid rows on the slabs beside them, so a scope covers exactly
   the stages it names. Rows are 1-indexed; `to` is the line after the last. */
const scopes = [
  {
    label: "The whole file",
    span: "Intake → Report",
    from: 1,
    to: 8,
    proves:
      "A complete file prepared end to end, compared against the deal memo your underwriter wrote — including the exceptions they raised and the ones they decided not to.",
  },
  {
    label: "A run of stages",
    span: "Documents → Verification",
    from: 2,
    to: 5,
    proves:
      "Enough of the chain to show whether evidence survives the handoffs: what the documents produced feeding the financial analysis, and both feeding the verification checks.",
  },
  {
    label: "One stage",
    span: "Documents",
    from: 2,
    to: 3,
    proves:
      "The narrowest useful pilot, and the quickest to set up. Cevrynt reads intake packs your team has already worked through, and the comparison is simply whether the output matches the documents.",
  },
];

const scopeOutside = {
  tag: "Outside every scope",
  title: "No bracket reaches the last stage.",
  body:
    "A pilot evaluates the preparation, never the judgment. Cevrynt issues no approval or decline at any scope, your underwriters keep every call, and nothing in the evaluation asks them to hand that over.",
};

const scopeReadout = {
  trackK: "The workflow, stage by stage",
  scopesK: "Three scopes a pilot is commonly drawn around",
};

const scopeNote =
  "Illustrative scopes rather than a menu, and none of them needs an integration first — a pilot runs on representative historical files, so the evaluation does not start as an IT project.";

/* The order the pilot is set up in: the comparisons are fixed before anything
   is run, so the result cannot be judged against a target invented afterwards. */
const runOrder = ["Agree the comparisons", "Run the files", "Read both sides together"];

const ladderRails = {
  left: "What your team already found",
  centre: "Compared on",
  right: "What Cevrynt prepared",
};

const rungs = [
  {
    k: "Extracted values",
    yours: "The figures your reviewer keyed from the pack",
    ours: "The same figures, each carrying the page it came from",
  },
  {
    k: "Financial calculations",
    yours: "Averages, balances and debt totals your analyst worked out",
    ours: "The same calculations, shown with their inputs",
  },
  {
    k: "Source links",
    yours: "The statements your reviewer had to go back to",
    ours: "A link from every figure to its statement, page and line",
  },
  {
    k: "Conflicts surfaced",
    yours: "The mismatches your reviewers caught in the file",
    ours: "The mismatches raised — and anything raised that was not real",
  },
  {
    k: "Policy results",
    yours: "The passes and exceptions your team recorded",
    ours: "The same criteria applied, with the reading behind each result",
  },
  {
    k: "Missed flags",
    yours: "Anything your team found late, or only on a second pass",
    ours: "Whether it was surfaced on the first read",
  },
  {
    k: "Reviewer corrections",
    yours: "The time your reviewer spent rebuilding the file",
    ours: "What had to be corrected before the output could be used",
  },
];

const ladderCut = {
  k: "Approval rate",
  yours: "Your credit policy and risk appetite",
  ours: "No approval, no decline, at any scope",
  why:
    "The one rung a pilot will not run. A change in approval rate would measure your own lending decisions, not the work done on the file — which is why it is left out of the comparison rather than quietly counted in it.",
};

const ladderFigure = {
  src: "/media/placeholder/Exception-aware.png",
  w: 760,
  h: 520,
  alt: "Illustrative product view: a verification mismatch and an out-of-policy reading kept visible side by side, with the reviewer's resolution recorded against the deal.",
  caption:
    "Illustrative view of the two rungs in the middle of the ladder — conflicts kept visible rather than smoothed over, and the reviewer's resolution recorded against the file. Synthetic borrower data.",
};

const ladderNote =
  "Every rung is something both sides can check on a file that has already been reviewed. None of them is a claim about accuracy, and none is a guarantee.";

/* 03 — the criteria a pilot is configured with are the lender's own, and the
   only thing added is the reading behind each result. */
const criteriaInputs = [
  {
    k: "Your criteria, at the version they are written",
    body:
      "The rules your credit team already works to, taken as they stand rather than translated into somebody else's model. The version is recorded with the file, so a later change to policy does not quietly rewrite an earlier result.",
  },
  {
    k: "Your thresholds, at the numbers you set",
    body:
      "Minimums, maximums and windows exactly as your policy states them. A pilot does not propose different numbers, and nothing is tuned to make the comparison look better.",
  },
  {
    k: "Your exception paths, including who may override",
    body:
      "Which conditions need judgment rather than a pass or a fail, who is allowed to resolve them, and what has to be attached when they do.",
  },
];

const criteriaOutput = {
  k: "What Cevrynt adds",
  body:
    "The reading behind each result: the threshold, the borrower value, where the value came from, and the reasoning attached when a reviewer resolved it. Never a rule of its own.",
};

const criteriaRefusals = [
  "No generic score standing in for your policy.",
  "A policy break is not an automatic decline — it is an exception with reasoning attached, for a reviewer to settle.",
];

const criteriaFigure = {
  src: "/media/placeholder/outcame4.png",
  w: 1600,
  h: 650,
  alt: "Illustrative policy view: a borrower plotted against the lender's own configured rules, each with its threshold and the borrower's position, one rule needing judgment with the reviewer's action attached.",
  caption:
    "Illustrative view of the same criteria in use — each rule shown at its own threshold with the borrower's position against it, the policy version named, and the one rule needing judgment left for a reviewer. Synthetic borrower data.",
};

const criteriaReadout = {
  inK: "What goes in — all of it yours",
  outK: "What comes back",
};

const criteriaNote =
  "Configuring the criteria is part of setting the pilot up, not a separate project: they are read from how your team already writes them.";

/* 04 — everything agreed before a file moves, and who decides it. */
const settleLanes = [
  { id: "yours", label: "Your team" },
  { id: "both", label: "Together" },
  { id: "ours", label: "Cevrynt" },
];

const settleRows = [
  { k: "Which stages the pilot covers", owner: "both" },
  { k: "Which files it runs on, and how many", owner: "yours" },
  { k: "The criteria and thresholds it applies", owner: "yours" },
  { k: "Who may open the files, and from where", owner: "yours" },
  { k: "How long the files stay, and when they are removed", owner: "both" },
  { k: "What is recorded against each file as it is reviewed", owner: "ours" },
  { k: "What counts as a result worth acting on", owner: "both" },
  { k: "Whether anything goes further afterwards", owner: "yours" },
];

const settleTallyK = {
  settledK: "Settled before a file moves",
  countK: "Decided by",
  one: "of the eight",
  many: "of the eight",
};

const settleLink = {
  href: "/security",
  label: "Access, data handling and audit requirements in full",
};

const settleNote =
  "Nothing here is a security claim. It is the list of decisions a pilot cannot start without, and the side of the table each one is settled on.";

/* 05 — where the run ends, both ways. */
const afterAxis = { left: "The run ends", right: "The decision is yours" };

const afterBranches = [
  {
    k: "It earns a place in the workflow",
    body:
      "Then the production workflow is scoped around the systems already moving your deals — intake, your LOS or CRM, document sources, verification providers and downstream reporting — rather than the other way round. That scoping is its own conversation, and it starts from what the pilot showed.",
    link: { href: "/integrations", label: "How Cevrynt connects around a stack" },
  },
  {
    k: "It does not",
    body:
      "Then you have a file-by-file comparison against your own review, your criteria written down as your team actually applies them, and a workflow sitting exactly where it was. Knowing precisely where the output fell short of your underwriters is a result worth having.",
    link: null,
  },
];

const afterConstant = {
  k: "True on both paths",
  body:
    "Nothing was connected to find out. The run works from representative historical files your team has already reviewed, so the evaluation never depends on wiring Cevrynt into the systems your deals move through today.",
};

const afterNote =
  "Whether anything follows a pilot is the eighth row of the table above — decided by your team, on what the comparison actually showed.";

/* 06 — the limits, stated before anybody has to discover them. */
const limits = [
  {
    claim: "That your approval rate will go up.",
    truth:
      "Approval depends on your policy and your risk appetite, both of which stay exactly where they are. A pilot changes how a file arrives at that decision — not the decision, and not what you choose to fund.",
    link: null,
  },
  {
    claim: "That it holds for files you did not include.",
    truth:
      "A run answers for the stages you bracketed and the files you chose, and nothing beyond them. Messy packs, thin files and unusual document sets only count in the result if you put them in.",
    link: null,
  },
  {
    claim: "That your data handling requirements are satisfied.",
    truth:
      "A comparison of underwriting output proves nothing about access, retention or audit. Those are settled before a file moves, as their own review, against your own requirements.",
    link: { href: "/security", label: "What that review covers" },
  },
  {
    claim: "That your underwriters can stop reading.",
    truth:
      "The output still has to be read by somebody who knows the file. A pilot measures the preparation in front of the judgment; the judgment stays where it already was.",
    link: null,
  },
  {
    claim: "That another lender's result would be yours.",
    truth:
      "Every run is tied to one lender's criteria, thresholds and files. Nothing about it transfers to a different policy, which is also why this site publishes no accuracy figures to compare against.",
    link: null,
  },
];

const limitsReadout = { claimK: "What it will not tell you", truthK: "What is true instead" };

const limitsClose =
  "None of this is hedging. A pilot that claimed any of the five would be measuring something other than the work, and you would find out at the point it mattered rather than before you started.";

export default function PilotPage() {
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
            <RainbowCta href={calendlyUrl} label={page.cta || "Discuss a pilot"} />
          </div>
        </div>
        {/* The same illustrative workspace the homepage opens on, in the same
            folded frame. HeroMotion picks the figure up on its own — it looks
            for .hero-dashboard-wrap — so the entrance matches the homepage
            without anything extra here. */}
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

      {/* 01 — how much of the workflow a pilot is drawn around */}
      <section className="pi-scope band-light" aria-labelledby="scope-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">Choosing the scope</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="scope-heading"
              text="A pilot is a bracket drawn around part of the workflow, not a switch thrown across all of it."
            />
          </div>
          <p className="eg-lede t-lede">
            Every stage a file moves through, with what a pilot would compare at each one. The three scopes are
            drawn down the margin, each reaching exactly the stages it covers — and all three stopping short of
            the same row.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ScopeSlabs
              stages={scopeStages}
              scopes={scopes}
              outside={scopeOutside}
              readout={scopeReadout}
              note={scopeNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — the run, drawn as a comparison against the team's own review */}
      <section className="pi-measure band-deep" aria-labelledby="measure-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Deciding what better means</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="measure-heading"
              text="A pilot is judged against the review your team has already done, one rung at a time."
            />
          </div>
          <p className="eg-lede t-lede">
            Files your underwriters know, run again. Each rung joins what they found to what Cevrynt prepared,
            and every rung is agreed before the first file goes through — including the one drawn cut, which is
            the comparison this evaluation refuses to make.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ComparisonLadder
              order={runOrder}
              rails={ladderRails}
              rungs={rungs}
              cut={ladderCut}
              figure={ladderFigure}
              note={ladderNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — the criteria a pilot runs against are the lender's own */}
      <section className="pi-criteria band-light" aria-labelledby="criteria-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Whose rules it runs on</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="criteria-heading"
              text="Three things go in, and all three of them are yours."
            />
          </div>
          <p className="eg-lede t-lede">
            A pilot is configured against the policy your credit team already works to — at the version it is
            written, at the numbers you set, with your own exception paths. What comes back is the reading
            behind each result, never a rule Cevrynt decided on your behalf.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <CriteriaManifold
              inputs={criteriaInputs}
              output={criteriaOutput}
              refusals={criteriaRefusals}
              figure={criteriaFigure}
              readout={criteriaReadout}
              note={criteriaNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — what has to be settled first, and who settles it */}
      <section className="pi-settle band-deep" aria-labelledby="settle-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">Before a file moves</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="settle-heading"
              text="Eight things are settled before the first file is opened. Exactly one of them is settled by Cevrynt."
            />
          </div>
          <p className="eg-lede t-lede">
            Scope, files, criteria, access, how long anything stays, what gets recorded, what counts as a
            result, and whether it goes any further. The lane each one sits in is the point: four are yours
            outright, three are agreed together, and the only one that is ours is what the system writes down.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <SettleMatrix
              lanes={settleLanes}
              rows={settleRows}
              tallyK={settleTallyK}
              link={settleLink}
              note={settleNote}
            />
          </div>
        </div>
      </section>

      {/* 05 — what follows the run, both ways */}
      <section className="pi-after band-light" aria-labelledby="after-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">After the run</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="after-heading"
              text="Two ways this ends, and the page owes you both of them."
            />
          </div>
          <p className="eg-lede t-lede">
            A pilot that can only end one way is a demo. These two hang from the same line at the same width,
            because the comparison is run to answer the question either way — and one thing stays true down
            both of them.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <AfterSplit axis={afterAxis} branches={afterBranches} constant={afterConstant} note={afterNote} />
          </div>
        </div>
      </section>

      {/* 06 — the limits, said out loud */}
      <section className="pi-limits band-deep" aria-labelledby="limits-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">06</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">The limits</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="limits-heading"
              text="Five things a pilot will not tell you, said now rather than at the point they matter."
            />
          </div>
          <p className="eg-lede t-lede">
            Every evaluation has an edge, and a page that leaves you to find it is wasting your team&rsquo;s
            time. These are the questions a focused pilot cannot answer, each with what is actually true in
            its place.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <LimitsList items={limits} readout={limitsReadout} close={limitsClose} />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="07"
          kicker="Founder-led"
          heading="Bring the workflow you would want a pilot to prove."
          lede="Walk through how a deal moves through your team today. We'll agree which stages a focused pilot should cover, what it would be compared against, and what would count as a result worth acting on."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
