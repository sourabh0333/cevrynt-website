import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { FounderClose } from "@/components/home/founder-close";
import { RevealLines } from "@/components/home/reveal-lines";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { PackageStacks } from "@/components/integrations/package-stacks";
import { HandoffLog } from "@/components/integrations/handoff-log";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

const page = pageByPath.get("integrations");

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
 * What a broker package actually contains, read from the intake export rendered
 * beneath it. The ranges there are 1–6, 7–126, 127–128, 129 and 130–143, so the
 * total is the last page of the last document rather than a figure anybody
 * chose, and the height of every stack below is its real page count.
 *
 * Each `reads` list describes what the product structures from that document.
 * None of it claims an accuracy, a rate or an outcome.
 */
const PACKAGE_TOTAL = 143;

const packageDocuments = [
  {
    name: "Business application",
    range: "pp. 1–6",
    pages: 6,
    summary:
      "The starting point for the deal. Cevrynt captures the borrower’s stated business details here, then carries those fields forward so later documents and verification checks can confirm or challenge them.",
    reads: [
      "Legal name",
      "EIN",
      "Entity type",
      "Ownership split",
      "Amount requested",
    ],
  },

  {
    name: "Bank statements",
    range: "pp. 7–126",
    pages: 120,
    summary:
      "The core financial evidence. Cevrynt structures six months of statement activity so underwriters can review deposits, liquidity, NSF activity, negative days, transfers, and recurring obligations without rebuilding the file manually.",
    reads: [
      "Deposits",
      "Average daily balance",
      "NSF activity",
      "Negative days",
      "Inter-account transfers",
    ],
  },

  {
    name: "Owner identity",
    range: "pp. 127–128",
    pages: 2,
    summary:
      "Identity evidence is checked against the borrower application so mismatches in names, dates, or document details can be surfaced before the file moves deeper into underwriting.",
    reads: [
      "Legal name",
      "Date of birth",
      "Document expiry",
      "Match to application",
    ],
  },

  {
    name: "Bank proof",
    range: "p. 129",
    pages: 1,
    summary:
      "Cevrynt uses bank proof to connect the submitted statements to the business and account being underwritten, while keeping the account details available for reviewer verification.",
    reads: [
      "Account number",
      "Routing number",
      "Account holder",
      "Match to statements",
    ],
  },

  {
    name: "Existing MCA agreement",
    range: "pp. 130–143",
    pages: 14,
    summary:
      "Existing funding obligations are brought into the same deal record so the underwriter can compare stated positions with recurring bank activity and understand the repayment load already on the business.",
    reads: [
      "Funder",
      "Outstanding balance",
      "Remittance amount",
      "Remittance frequency",
    ],
  },
];

const intakeShot = {
  src: "/media/Steps/intake.png",
  alt: "Cevrynt intake view of an illustrative broker package: mixed borrower files on the left, the document map and structured borrower schema in the centre, and every structured field carrying the page and line it was read from on the right",
  caption: "Illustrative workspace · synthetic borrower data",
};

/**
 * One deal, step by step, exactly as it runs now.
 *
 * `manual` marks a step a person performs only because two systems do not
 * speak: downloading, renaming, copying a reference, retyping a finding. Those
 * are the rows a connection would remove.
 *
 * Nothing judgemental is marked. The review, the notes and the approval are not
 * hand-offs, they are the work, and they stand in both trails — which is the
 * half of this argument that matters most.
 */
const dealTrail = [
  {
    actor: "Intake",
    text: "A broker submission arrives through the existing inbox, form, CRM, or portal.",
  },
  {
    actor: "Operations",
    text: "Downloads the borrower package and adds the files to Cevrynt.",
    manual: true,
  },
  {
    actor: "Cevrynt",
    text: "Classifies the files, structures the underwriting data, and keeps material findings linked to their source.",
  },
  {
    actor: "Operations",
    text: "Creates or locates the matching deal in the CRM or LOS.",
    manual: true,
  },
  {
    actor: "Operations",
    text: "Matches borrower details, deal references, and workflow status between the two systems.",
    manual: true,
  },
  {
    actor: "Cevrynt",
    text: "Runs bank analysis, KYB/KYC, fraud review, and lender-defined policy checks against the same deal.",
  },
  {
    actor: "Underwriter",
    text: "Reviews the findings, source evidence, policy exceptions, and anything that still requires judgment.",
  },
  {
    actor: "Operations",
    text: "Enters key findings, memo details, and status back into the system of record.",
    manual: true,
  },
  {
    actor: "Credit team",
    text: "Approves, declines, counters, requests more information, or escalates the file.",
  },
];

/**
 * The access boundary. Everything on the left is the least a connection could
 * need; everything on the right is a thing this product should never do, and
 * saying so before anybody asks is the cheapest credibility on the page.
 */
const accessTerms = [
  {
    asks: "Deal-scoped access to borrower data and submitted files",
    never: "Broad access to your entire customer or loan book",
  },
  {
    asks: "A stable deal or borrower identifier",
    never: "Administrative control of your CRM or LOS",
  },
  {
    asks: "An approved destination for underwriting outputs",
    never: "Authority over credit policy or funding decisions",
  },
  {
    asks: "Agreed access, retention, and deletion rules",
    never: "Indefinite access to data after the agreed purpose ends",
  },
];

/**
 * The finished record, read from the Deal Memo export rendered beneath it.
 *
 * Every figure here is in that image — requested amount, deposits, balance,
 * positions, the open exception — so a reader can find each one in the picture.
 * Cedar & Stone LLC is the persistent illustrative deal used across the site.
 *
 * The dispositions are listed, not offered. The memo itself states that no
 * automated approval or decline has been issued, and this section says the same
 * thing rather than softening it.
 */
const memoFigures = [
  { k: "Requested", v: "$20,000" },
  { k: "Avg monthly deposits", v: "$91.3K" },
  { k: "Avg daily balance", v: "$34.8K" },
  { k: "Active MCA positions", v: "1" },
];

const memoFindings = [
  {
    title: "Business & identity",
    body: "Entity, standing and officer records align. One address detail remains open.",
    source: "Application p.1–2 · Registry record",
  },
  {
    title: "Financial position",
    body: "Average monthly deposits of $91.3K against an average daily balance of $34.8K, with recent NSF frequency improving.",
    source: "Bank statements · 12 months",
  },
  {
    title: "Debt & risk observations",
    body: "One active MCA position remains after corrected agreement review. Fraud signals were resolved as review items, not automatic determinations.",
    source: "Agreement p.1–14 · Fraud queue",
  },
];

const memoDispositions = ["Approve", "Conditional", "Request info", "Decline"];

const memoShot = {
  src: "/media/Steps/Deal Memo.png",
  alt: "Cevrynt deal memo for the illustrative Cedar & Stone LLC file: a deal snapshot with requested amount and deposit figures, a review-ready memo whose findings each cite their source document and page, and a decision summary whose approve, conditional, request-info and decline outcomes are marked as owned by the lender team",
  caption: "Illustrative deal · Cedar & Stone LLC · synthetic borrower data",
};

const scopeSteps = [
  {
    marker: "Map the workflow",
    title: "Follow one deal through the systems it already touches",
    body:
      "Identify where the package arrives, where the deal record lives, which files and fields move between systems, and where underwriters review and record the outcome.",
  },
  {
    marker: "Prove the underwriting",
    title: "Test Cevrynt before turning the pilot into an integration project",
    body:
      "Run representative files through the agreed workflow and validate extraction, bank analysis, verification, policy results, exceptions, and review outputs before automating the handoffs.",
  },
  {
    marker: "Connect what matters",
    title: "Build the smallest connection that removes a real handoff",
    body:
      "Once the workflow is proven, connect only the approved inputs and outputs through the appropriate API, webhook, CRM, LOS, inbox, or file-source path.",
  },
];

export default function IntegrationsPage() {
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

      {/* Film grain over the whole page. One fixed layer, so it never repaints
          on scroll, and it runs continuously across section boundaries the way
          grain on film would — which is the point: it ties the bands together
          instead of leaving each one a flat panel. */}
      <div className="ig-grain" aria-hidden="true" />

      {/* Hero unchanged — the same composition PageShell renders for this page. */}
      <HeroMotion>
        <div className="page-hero-dark-inner">
          <PageHeroCopy heading={page.title} lede={page.description} />
          <div className="hero-actions">
            <RainbowCta href={calendlyUrl} label={page.cta || "Book a walkthrough"} />
          </div>
        </div>
      </HeroMotion>

      {/* 01 — The honest opening, drawn as the file itself */}
      <section className="ig-arrive band-light" aria-labelledby="arrive-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">START WITH THE FILE</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="arrive-heading"
              text="Start with the borrower package you already receive."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt can begin from the files already entering your underwriting process. 
            Applications, bank statements, identity documents, bank proof, and existing
             MCA agreements are grouped into one deal and structured before any deeper system integration is required.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PackageStacks documents={packageDocuments} total={PACKAGE_TOTAL} shot={intakeShot} />
          </div>
        </div>
      </section>

      {/* 02 — The same deal, twice */}
      <section className="ig-points band-deep" aria-labelledby="points-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">WHERE CONNECTIONS HELP</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="points-heading"
              text="Connect the handoffs. Keep the underwriting judgment."
            />
          </div>
          <p className="eg-lede t-lede">
           Cevrynt can sit between the systems that receive a deal and the system your team uses to manage it. 
           A scoped connection can remove file moving, duplicate entry, and result re-keying — while review, exceptions,
            and the final decision stay with your underwriters.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <HandoffLog
              steps={dealTrail}
              caveat="Illustrative workflow. The exact connection depends on your existing systems and implementation scope."
            />
          </div>
        </div>
      </section>

      {/* 03 — The access boundary */}
      <section className="ig-access band-light" aria-labelledby="access-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">ACCESS & CONTROL</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="access-heading"
              text="Connect only what the underwriting workflow needs."
            />
          </div>
          <p className="eg-lede t-lede">
            A Cevrynt connection is scoped around a defined job — receive the deal, read the approved evidence, return agreed underwriting outputs, and nothing broader than the workflow requires.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            {/* Still a real table — this is two columns of terms compared row by
                row — but drawn as the boundary it describes: a permitted side,
                a sealed side, and a lit seam between them. */}
            <div className="ac">
              <span className="ac-glow" aria-hidden="true" />
              <table className="ac-terms">
                <caption className="sr-only">
                  What a connection would require, set against what it would never do.
                </caption>
                <thead>
                  <tr>
                    <th scope="col"><span className="ac-h">CEVRYNT MAY NEED</span></th>
                    <th scope="col"><span className="ac-h ac-h-never">Would never</span></th>
                  </tr>
                </thead>
                <tbody>
                  {accessTerms.map((term) => (
                    <tr className="ac-term" key={term.asks}>
                      <td className="ac-asks">{term.asks}</td>
                      <td className="ac-never">{term.never}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Why there is no logo wall */}
      <section className="ig-scope band-deep" aria-labelledby="scope-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">HOW CEVRYNT CONNECTS</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="scope-heading"
              text="We don’t start with the API. We start with the workflow."
            />
          </div>
          <p className="eg-lede t-lede">
            Before anything is integrated, Cevrynt maps where the deal enters, what underwriting data is actually needed,
             where the reviewed output belongs, and which system remains the source of truth.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            {/* Driven entirely by CSS scroll timelines: the rail fills and each
                step arrives as you read past it, with no JavaScript involved at
                all. Where scroll timelines are unsupported every step is simply
                already there. */}
            <div className="sc">
              <ol className="sc-steps">
                <span className="sc-rail" aria-hidden="true">
                  <span className="sc-rail-fill" />
                </span>
                {scopeSteps.map((step, index) => (
                  <li className="sc-step" key={step.title}>
                    <span className="sc-node" aria-hidden="true">
                      <span className="sc-node-glow" />
                      <span className="hx-mono sc-node-n">{String(index + 1).padStart(2, "0")}</span>
                    </span>
                    <div className="sc-card">
                      <span className="hx-mono sc-marker">{step.marker}</span>
                      <h3 className="sc-title">{step.title}</h3>
                      <p className="sc-body">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="sc-note">
                If a connection does not remove a real handoff, preserve the source of truth, or
                 improve the review, there is no reason to build it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — What crosses back */}
      <section className="ig-memo band-light" aria-labelledby="memo-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">05</span>
          <div className="eg-head">
            <p className="hx-kicker">What crosses back</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="memo-heading"
              text="What leaves is a memo, not a decision."
            />
          </div>
          <p className="eg-lede t-lede">
            The same file after review: findings consolidated, every conclusion still carrying the document and
            page it came from, and the call itself left where it belongs.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            {/* Positioned rather than stacked: the document sits to one side and
                holds still while its findings are read past it. The picture is
                cropped to the memo’s own findings column — a near-square region
                of the export — so it is narrow and shown close to native size
                instead of a full-width letterbox band. */}
            <div className="mm">
              <figure className="mm-visual">
                <div className="mm-win">
                  <Image
                    src={memoShot.src}
                    alt={memoShot.alt}
                    width={1600}
                    height={760}
                    sizes="(max-width: 900px) 280vw, 1240px"
                    loading="lazy"
                  />
                </div>
                <figcaption className="hx-mono mm-caption">{memoShot.caption}</figcaption>
              </figure>

              <div className="mm-body">
                <dl className="mm-figures">
                  {memoFigures.map((f) => (
                    <div className="mm-figure" key={f.k}>
                      <dt className="hx-mono mm-figure-k">{f.k}</dt>
                      <dd className="mm-figure-v">{f.v}</dd>
                    </div>
                  ))}
                </dl>

                <ol className="mm-findings">
                  {memoFindings.map((f, i) => (
                    <li className="mm-finding" key={f.title} style={{ "--i": i }}>
                      <h3 className="mm-finding-title">{f.title}</h3>
                      <p className="mm-finding-body">{f.body}</p>
                      {/* The citation is the point of the section: a finding
                          that cannot be traced is just an assertion. */}
                      <p className="hx-mono mm-source">
                        <span className="mm-source-k">Traced to</span>
                        {f.source}
                      </p>
                    </li>
                  ))}
                </ol>

                {/* Listed, never offered. The product does not press these. */}
                <div className="mm-decide">
                  <p className="hx-mono mm-decide-k">Your team decides</p>
                  <ul className="mm-outcomes">
                    {memoDispositions.map((d, i) => (
                      <li className="mm-outcome" key={d} style={{ "--i": i }}>{d}</li>
                    ))}
                  </ul>
                  <p className="mm-decide-note">
                    No automated approval or decline is issued. The memo is ready for a reviewer to resolve the
                    open exception and make the final call.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="06"
          kicker="Founder-led walkthrough"
          heading="Bring the systems the file actually touches."
          lede="Map the intake you have today, agree what a connection would need, and decide whether one is worth building at all."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
