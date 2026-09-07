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
  { v: "6 statements", k: "normalised into a single twelve-month ledger." },
  { v: "$31.2K", k: "average daily balance, held across the whole of it." },
  { v: "14 months", k: "time in business, against a twelve-month policy floor." },
];

const lifeReadout = {
  figures: [
    { n: "14", k: "months the company has traded" },
    { n: "12", k: "of them inside the bank record" },
    { n: "02", k: "months older than the evidence", tone: "bare" },
  ],
  start: "First filing",
  now: "Today",
  before: "Before the record starts",
  covered: "Twelve months, read as one period",
  said:
    "A young merchant is usually read as a thin file. Turn it around: all but the opening weeks of this company's entire existence sit inside the evidence — a share of a business's life no fifteen-year-old borrower will ever hand a lender.",
};

const lifeNote =
  "Fourteen months and twelve months are both stated on screens for this file; the two months at the head are the difference between them, and they sit at the start because a record running to the present must have begun after the company did. This describes one illustrative borrower. It is not a claim about merchants in general, and nothing here predicts month fifteen. Illustrative deal · synthetic borrower data.";

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
  when: "19 April",
  what: "Deposit — Card Settlement",
  amount: "$24,850.00",
  source: "First Harbor Bank statement · p.4 · lines 28–31",
};

const redactionReadout = {
  figures: [
    { n: "05", k: "kinds of fact removed before the money moves" },
    { n: "01", k: "line that reaches the lender", tone: "left" },
  ],
  knows: "What the merchant's own systems hold",
  arrives: "What arrives in the bank",
  said:
    "The surviving line is net, batched, and carries nothing about what came back. Merchant context can be brought to an underwriter alongside the file — it cannot be extracted from a statement that never contained it.",
};

const redactionNote =
  "This is a property of the medium, not a gap in the product: no amount of reading a bank statement will produce an order book. Saying so plainly is the point of the section, because the alternative — implying that commerce detail can be recovered from a deposit line — is how merchant-financing pages usually oversell. Illustrative deal · synthetic borrower data.";

/* 03 — the relationship, set as a clause ---------------------------------- */

const partnerClause =
  "Cevrynt and SHOPLINE have a documented development and referral partnership exploring e-commerce merchant-underwriting workflows.";

const partnerQualifications = [
  "It is not a generally available live integration.",
  "It does not involve automatic data sharing between the two.",
  "It is not an investment by either party in the other.",
  "It is not exclusive on either side.",
  "It is not an endorsement of Cevrynt by SHOPLINE.",
  "It does not make every merchant on the platform eligible for anything.",
  "It does not guarantee funding, to anyone, in any amount.",
];

const partnerClauseReadout = {
  ref: "Cevrynt × SHOPLINE",
  of: "Stated in full",
  lead: "Qualifications",
  foot:
    "Set as a clause because that is how it should be read. Partnership copy gets skimmed and remembered generously, which is how a development and referral relationship becomes an implied data pipe in somebody's head.",
};

const partnerClauseNote =
  "Lending decisions, merchant eligibility and funding all remain with the lender. Cevrynt does not lend, does not originate, and is not a party to any credit decision made using its output.";

/* 04 — the instrument, complete, with no needle in it --------------------- */

const needleShot = {
  src: "/media/Steps/Policy Engine.png",
  alt: "The Cevrynt policy engine: a lender's own review criteria listed with the configured threshold, observed value, source and result, with exceptions and overrides kept visible, the policy version retained, and auto-decline switched off.",
};

const needleProduced = [
  { v: "10 / 12", k: "rules settled against the lender's own configured criteria" },
  { v: "02", k: "exceptions raised and held for a named reviewer" },
  { v: "01", k: "override recorded, with its reason code and timestamp" },
  { v: "v3.4", k: "policy version retained with the file" },
];

const needleReadout = {
  dialLabel:
    "A gauge drawn from zero to one hundred with every tick and its hub in place, and no needle on it — the merchant score Cevrynt does not issue.",
  dialK: "Merchant score",
  dialV:
    "The apparatus is perfectly buildable. The missing part is a choice: a number a lender can sort a queue on would quietly move the decision from them to us.",
  madeK: "What is produced instead",
};

const needleNote =
  "A merchant's platform activity does not become a score here, and no approval, decline or recommendation dressed as one is issued. What a lender gets is their own criteria applied the same way every time, the exceptions raised rather than smoothed over, and the evidence still attached — with the disposition, and the accountability that comes with it, staying where it belongs. Illustrative deal · synthetic borrower data.";

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
            <p className="hx-kicker">Time in business</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="life-heading"
              text="Fourteen months old. Twelve of them on the record."
            />
          </div>
          <p className="eg-lede t-lede">
            A young merchant reads as a thin file until you turn it around: almost the entire life of this
            company sits inside the evidence, which is a share no long-established borrower can offer.
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
            <p className="hx-kicker hx-kicker-invert">The deposit line</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="redact-heading"
              text="Everything a settlement lost on the way to the bank."
            />
          </div>
          <p className="eg-lede t-lede">
            A merchant&rsquo;s own systems hold every order, refund, fee and channel. None of it survives the
            trip. What reaches a lender is one net line — so here is the rest of it, going.
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
            <p className="hx-kicker">The partnership</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="partner-heading"
              text="One clause, and everything it does not say."
            />
          </div>
          <p className="eg-lede t-lede">
            Set the way a term sheet is set, because that is how it should be read — and because the readings
            it does not support are exactly the ones a merchant-financing page usually invites.
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
            <p className="hx-kicker hx-kicker-invert">The final call</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="needle-heading"
              text="A dial with no needle in it."
            />
          </div>
          <p className="eg-lede t-lede">
            The apparatus for scoring a merchant is perfectly buildable. Cevrynt does not build the last part
            of it, and the gauge below is drawn exactly as far as it goes.
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
          kicker="Founder-led walkthrough"
          heading="Bring a merchant file you were unsure about."
          lede="We will read it the way a lender would, show you exactly which questions the statements can settle and which ones they cannot, and leave the call where it belongs."
          calendlyUrl={calendlyUrl}
          email="arin@cevrynt.com"
        />
      </section>
    </main>
  );
}
