import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { Lifeline } from "@/components/ecommerce/lifeline";
import { SettlementRedaction } from "@/components/ecommerce/settlement-redaction";
import { PartnerClause } from "@/components/ecommerce/partner-clause";
import { NoNeedle } from "@/components/ecommerce/no-needle";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

const page = pageByPath.get("solutions/ecommerce-merchant-underwriting");

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
   Every figure on this page is read off a Cevrynt product screen for the same
   illustrative borrower this site uses throughout. A merchant's operating
   context is an input to underwriting here, never a substitute for the
   documents and never a decision — so this page is as much about the edge of
   what can be read as about what can.
   -------------------------------------------------------------------------- */

/* 01 — the company's life, and the part of it that is on the record -------- */

/**
 * Fourteen months is the time-in-business the policy screen evaluates; twelve
 * months is the period the financial analysis normalises into one ledger. Both
 * are stated for this borrower. The ratio is arithmetic on the two.
 */
const lifeMonths = 14;
const evidencedMonths = 12;

const lifeMarks = [
  {
    v: "12 months",
    k: "commerce activity available across the merchant’s operating history.",
  },
  {
    v: "6 months",
    k: "bank statements reviewed for cash flow, liquidity, and repayment obligations.",
  },
  {
    v: "14 months",
    k: "time in business compared with the lender-defined operating-history requirement.",
  },
];

const lifeReadout = {
  figures: [
    {
      n: "14",
      k: "months in business",
    },
    {
      n: "12",
      k: "months of commerce activity available",
    },
    {
      n: "86%",
      k: "of operating history covered",
      tone: "bare",
    },
  ],

  start: "First recorded activity",

  now: "Today",

  before: "Limited operating history",

  covered: "Twelve months of merchant activity",

  said:
    "Time in business shows how long the merchant has existed. The operating record shows how the business behaved during that time — including sales cadence, orders, payouts, refunds, disputes, and changes in performance across the observed period.",
};

const lifeNote =
  "This illustrative merchant has 14 months in business, 12 months of commerce activity, and 6 months of bank evidence. Cevrynt keeps those evidence windows distinct and brings them into one underwriting review so the lender can compare operating history, cash-flow behavior, and policy requirements without treating them as the same thing. Illustrative merchant · synthetic data.";

/* 02 — what a settlement has already had taken out of it ------------------- */

const redactionShot = {
  src: "/media/Steps/analysis.png",
  alt: "The Cevrynt financial analysis view: six bank statements normalised into one twelve-month ledger, with average monthly deposits, average daily balance, net cash flow and negative days shown together, and a pattern panel describing deposit consistency, payroll rhythm, existing debt positions and overdraft pressure.",
};

/**
 * Categories, never invented values. Nothing here fabricates an order book in
 * order to take it away; these are the kinds of fact a commerce business holds,
 * and none of them survives into a bank statement.
 */
const redactionRemoved = [
  "Every individual order",
  "Refunds and chargebacks",
  "Platform fees, taken before payout",
  "Which channel the sale came through",
  "What the stock cost to buy",
];

const redactionSurvives = {
  when: "19 Apr",
  what: "Card settlement",
  amount: "$24,850.00",
  source: "First Harbor Bank statement · p.4 · lines 28–31",
};

const redactionReadout = {
  figures: [
    {
      n: "06",
      k: "commerce signals behind the payout",
    },
    {
      n: "01",
      k: "net settlement in the bank",
      tone: "left",
    },
  ],

  knows: "What the commerce record can show",

  arrives: "What the bank shows",

  said:
    "A bank settlement shows what reached the account, not the operating activity that produced it. When approved commerce data is available, Cevrynt can bring sales, orders, refunds, disputes, fees, and payout adjustments alongside the bank evidence so the underwriter can see both sides of the transaction.",
};

const redactionNote =
  "The bank record and the commerce record answer different underwriting questions. Cevrynt keeps the settlement as financial evidence and, when approved commerce data is available, adds the operating context behind it rather than pretending that orders, refunds, disputes, fees, or payout adjustments can be inferred from a net deposit alone. Illustrative merchant · synthetic data.";

/* 03 — the relationship, set as a clause ---------------------------------- */

const partnerClause =
  "Cevrynt and SHOPLINE are working together to explore e-commerce merchant underwriting and financing workflows that bring approved commerce context closer to lender review.";

const partnerQualifications = [
  "Not a claim of universal live integration. Availability depends on the workflow, merchant authorization, data scope, and implementation agreed for the use case.",

  "Not automatic data access. Commerce data is only used when the required access and permissions are available for the approved workflow.",

  "Not merchant eligibility or guaranteed funding. Being on a commerce platform does not determine whether a lender will finance the business.",

  "Not lender decision-making. Cevrynt can bring commerce context into the underwriting review, while eligibility, pricing, approval, and final credit authority remain with the lender.",
];

const partnerClauseReadout = {
  ref: "Cevrynt × SHOPLINE",
  of: "Partnership scope",
  lead: "Current boundaries",
  foot:
    "The partnership explores how approved commerce context can support e-commerce merchant underwriting. It does not imply universal integration, automatic data access, merchant eligibility, or lender decision-making.",
};

const partnerClauseNote =
  "Merchant eligibility, pricing, approval, and funding remain with the participating lender. Cevrynt provides underwriting evidence and workflow support; it does not make or guarantee the credit decision.";

/* 04 — the instrument, complete, with no needle in it --------------------- */

const needleShot = {
  src: "/media/Steps/Policy Engine.png",
  alt: "The Cevrynt policy engine: a lender's own review criteria listed with the configured threshold, observed value, source and result, with exceptions and overrides kept visible, the policy version retained, and auto-decline switched off.",
};

const needleProduced = [
  {
    v: "10 / 12",
    k: "policy checks resolved against the lender's configured criteria",
  },
  {
    v: "02",
    k: "exceptions kept open with the observed value, threshold, and supporting evidence",
  },
  {
    v: "v3.4",
    k: "policy version retained with the underwriting review",
  },
  {
    v: "00",
    k: "credit decisions issued by Cevrynt — approval, pricing, and funding remain with the lender",
  },
];

const needleReadout = {
  dialLabel:
    "A zero-to-one-hundred gauge with every mark in place and no needle — representing the universal merchant score Cevrynt does not issue.",

  dialK: "Universal merchant score",

  dialV:
    "Cevrynt does not collapse commerce activity, bank evidence, verification, and policy results into one number that becomes the credit decision. The signals stay visible, the lender's rules stay explicit, and final judgment remains with the lender.",

  madeK: "What Cevrynt produces instead",
};

const needleNote =
  "Commerce activity can strengthen the underwriting record without becoming a universal merchant score. Cevrynt applies the lender's configured criteria, keeps exceptions and supporting evidence visible, and preserves the policy context used for the review. Approval, decline, pricing, and funding decisions remain with the lender. Illustrative merchant · synthetic data.";

export default function EcommerceMerchantUnderwritingPage() {
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

      {/* 01 — the company's life, and the part of it that is on the record */}
      <section className="em-life band-light" aria-labelledby="life-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">OPERATING HISTORY</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="life-heading"
              text="Fourteen months in business. Twelve months of behavior to inspect."
            />
          </div>
          <p className="eg-lede t-lede">
            For an e-commerce merchant, age is only one signal. Commerce activity can show how the business has actually operated across most of its life — sales cadence, order activity, refunds, disputes, payouts, and changes in performance over time.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <Lifeline
              life={lifeMonths}
              evidenced={evidencedMonths}
              marks={lifeMarks}
              readout={lifeReadout}
              note={lifeNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — the loss performed rather than listed */}
      <section className="em-redact band-deep" aria-labelledby="redact-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">COMMERCE-TO-BANK CONTEXT</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="redact-heading"
              text="The bank shows the payout. Commerce activity explains it."
            />
          </div>
          <p className="eg-lede t-lede">
            
            A $24,850 settlement tells an underwriter what reached the bank. When approved commerce data is available, Cevrynt can bring the activity behind that settlement into the same review — sales, orders, refunds, disputes, fees, and payout adjustments.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <SettlementRedaction
              shot={redactionShot}
              removed={redactionRemoved}
              survives={redactionSurvives}
              readout={redactionReadout}
              note={redactionNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — the relationship, in the register it should be read in */}
      <section className="em-partner band-light" aria-labelledby="partner-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Cevrynt × SHOPLINE</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="partner-heading"
              text="An underwriting partnership built around where merchants already operate."
            />
          </div>
          <p className="eg-lede t-lede">
            Cevrynt and SHOPLINE are exploring merchant-financing infrastructure that brings approved commerce context
    closer to borrower documents, financial evidence, verification, and lender-defined underwriting policy.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PartnerClause
              clause={partnerClause}
              qualifications={partnerQualifications}
              readout={partnerClauseReadout}
              note={partnerClauseNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — the instrument, complete, with no needle in it */}
      <section className="em-needle band-deep" aria-labelledby="needle-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">LENDER CONTROL</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="needle-heading"
              text="Commerce signals inform the review. They do not decide the merchant."
            />
          </div>
          <p className="eg-lede t-lede">
            Sales performance, operating history, refunds, disputes, payout behavior, bank evidence, and verification can all matter. Cevrynt brings those signals into the lender’s own underwriting criteria instead of collapsing them into one universal merchant score.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <NoNeedle
              shot={needleShot}
              produced={needleProduced}
              readout={needleReadout}
              note={needleNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="05"
          kicker="FOUNDER-LED E-COMMERCE UNDERWRITING REVIEW"
          heading="Bring an e-commerce merchant your team already knows."
          lede="Walk through the merchant’s commerce activity, bank settlements, borrower documents, business verification, existing obligations, and lender policy in one evidence-linked review. See what the evidence supports, what still needs judgment, and where the final decision stays with your team."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
