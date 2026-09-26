import Image from "next/image";
import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { RouterPanes } from "@/components/contact/router-panes";
import { DirectLines } from "@/components/contact/direct-lines";
import { PrepList } from "@/components/contact/prep-list";
import { JsonLd } from "@/components/json-ld";
import { pageByPath } from "@/content/site-pages";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";
const salesEmail = "sales@cevrynt.com";

const page = pageByPath.get("contact");

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
   A contact page is a routing problem, so it is built as one: section 01 sends
   you to the right channel for the reason you are writing, and section 02 puts
   the addresses themselves at display size instead of burying them under a
   form.

   Every address and link here comes from the site's own configuration — the
   Calendly URL, the two mailboxes, and the application URL. Nothing about
   response times, team size or availability is stated, because none of it is
   documented and a contact page is the worst place to start guessing.

   The "what will not happen" list in 02 is a set of commitments about how
   enquiries are handled rather than a claim about the product. They are
   promises the company has to be able to keep.
   -------------------------------------------------------------------------- */

/* 01 — who you are, and where that goes ---------------------------------- */

const routerReadout = {
  head: "Four reasons to get in touch · choose the closest fit",
};
const routerReasons = [
  {
    k: "You underwrite or fund SMB deals",
    channelK: "Channel · founder-led underwriting review",
    channel: "Review a deal your team already knows.",
    b: "See Cevrynt against a familiar underwriting case so your team can inspect the evidence, policy results, exceptions, and final review rather than judge a polished demo.",
    expect: [
      "A walkthrough across intake, financial analysis, verification, lender policy, and the deal memo.",
      "A comparison against a file or workflow your team already understands.",
      "A clear view of what Cevrynt handles today and where human judgment still remains.",
    ],
    action: "Book an underwriting review",
    href: calendlyUrl,
  },
  {
    k: "You broker deals or run a platform",
    channelK: "Channel · partnership conversation",
    channel: "Explore the workflow together.",
    b: "Talk through submission readiness, lender handoffs, commerce context, embedded underwriting, or a potential partnership without assuming another portal or integration is automatically the answer.",
    expect: [
      "Map what information moves today and where underwriting context gets lost.",
      "Explore how Cevrynt could fit around your existing workflow.",
      "Discuss partnership or integration scope before making technical assumptions.",
    ],
    action: `Email ${founderEmail}`,
    href: `mailto:${founderEmail}`,
  },
  {
    k: "You are evaluating Cevrynt as an investment",
    channelK: "Channel · investors page, then the founder",
    channel: "Start with the public thesis.",
    b: "The investor page covers the market entry, product, go-to-market motion, team, and assumptions already embedded in Cevrynt. A direct conversation can go deeper into the parts that belong in context.",
    expect: [
      "Current product and development status.",
      "Market-entry, distribution, and company-building approach.",
      "Fundraising context and investor materials shared directly where appropriate.",
    ],
    action: "Read the investors page",
    href: "/investors",
  },
  {
    k: "You have a product, integration, or technical question",
    channelK: "Channel · direct email",
    channel: "Start with the exact constraint.",
    b: "If the question is about data flow, lender configuration, integrations, security requirements, deployment, or whether Cevrynt can support a particular workflow, send the specifics first.",
    expect: [
      "Product and underwriting-workflow requirements.",
      "Integration and data-handling questions.",
      "Security, deployment, or technical evaluation context.",
    ],
    action: `Email ${founderEmail}`,
    href: `mailto:${founderEmail}`,
  },
];

const routerFoot = `If none of these fit, email ${founderEmail} with a short description of what you are trying to solve and it can be routed from there.`;

const routerNote =
  "Cevrynt provides AI-assisted underwriting infrastructure for business financing workflows. It is not a lender, and contacting Cevrynt does not constitute an application, approval, offer, or guarantee of financing.";

/* 02 — the addresses themselves ------------------------------------------ */

const linesReadout = { refusalsK: "What will not happen" };

const directLines = [
  {
    k: "Schedule an underwriting review",
    to: "calendly.com/arin-cevrynt",
    href: calendlyUrl,
    hint: "For lenders and underwriting teams that want to walk through a file, policy workflow, or product evaluation directly with the founder.",
  },
  {
    k: "Founder, directly",
    to: founderEmail,
    href: `mailto:${founderEmail}`,
    hint: "For lender conversations, partnerships, investor discussions, product questions, and anything that benefits from direct founder context.",
  },
  {
    k: "General enquiries",
    to: salesEmail,
    href: `mailto:${salesEmail}`,
    hint: "For general company, commercial, and inbound enquiries that do not need to begin with a meeting.",
  },
  {
    k: "Product workspace",
    to: "app.cevrynt.com",
    href: siteConfig.appUrl,
    hint: "The separate Cevrynt application for users who have already been provided access.",
  },
];

const refusals = [
  "Founder-led conversations for early lender, partnership, and investor discussions.",
  "No financing application or borrower marketplace on this page.",
  "No gated deck required before starting a relevant conversation.",
  "Product and integration questions can begin with the exact workflow or constraint.",
  "Commercial terms depend on workflow, policy, integration, and deployment scope.",
  "Product access is separate from this public website.",
];

const linesClose =
  "Start with the route that matches the question. The rest can move from there.";

const linesNote =
  "These contact details describe how to reach Cevrynt today. They do not imply guaranteed response times, product access, financing eligibility, or a commercial engagement.";

/* 03 — what makes the first call worth having ---------------------------- */

const prepReadout = {
  head: "Four things to bring · one thing to keep out of email",
  meterK: "ready",
};

const prepItems = [
  {
    k: "Your underwriting criteria.",
    b: "Bring the thresholds, eligibility rules, exception logic, repayment limits, or other criteria your team actually uses. Rough ranges are enough for a first conversation.",
  },
  {
    k: "What a normal file looks like.",
    b: "Describe the statements, supporting documents, common gaps, and where the package usually comes from so the walkthrough can focus on the parts that matter most.",
  },
  {
    k: "The case your process handles badly.",
    b: "Bring the exception, mismatch, missing evidence, or edge case that creates the most reviewer work. Difficult files are often more useful than clean ones for evaluating fit.",
  },
  {
    k: "Who needs to trust the result.",
    b: "Underwriting, credit, risk, operations, compliance, engineering, or leadership may each need different evidence from the same review. Knowing that early keeps the conversation focused.",
  },
];

const prepNone = {
  k: "What you do not need",

  items: [
    {
      k: "A live borrower file.",
      b: "The first walkthrough can use an illustrative case with synthetic borrower data. Real documents are not needed to understand the workflow.",
    },
    {
      k: "A finished integration plan.",
      b: "Start with how your team works today. APIs, deployment, and technical implementation can come later if the workflow is worth taking further.",
    },
    {
      k: "A buying decision.",
      b: "The first conversation is for evaluating fit. It does not commit either side to a pilot, integration, or commercial engagement.",
    },
  ],
};

const prepCaution = {
  k: "One request",

  h: "Please do not email unredacted borrower documents.",

  b: "A first conversation should not require sensitive borrower information to travel through ordinary email. Describe the file, use redacted examples, or bring screenshots with identifying information removed. If real documents are needed later, the data-handling and secure intake process should be agreed first.",
};

const prepClose =
  "Bring the policy, the normal file, the difficult case, and the people who need to trust the result. That context is enough to make the first conversation useful; Cevrynt can handle the walkthrough from there.";

const prepNote =
  "The checklist is only an on-page preparation aid. It is not a request to upload borrower data or submit underwriting information through this page.";
export default function ContactPage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cevrynt",
    url: siteConfig.url,
    description: page.description,
    email: founderEmail,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: salesEmail,
        url: `${siteConfig.url}/contact`,
      },
    ],
  };

  return (
    <main id="main-content">
      <JsonLd data={orgJsonLd} />

      {/* Hero unchanged — the same composition PageShell renders for this page. */}
      <HeroMotion>
        <div className="page-hero-dark-inner">
          <PageHeroCopy heading={page.title} lede={page.description} />
          <div className="hero-actions">
            <RainbowCta href={page.ctaHref || calendlyUrl} label={page.cta || "Book a walkthrough"} />
          </div>
        </div>
        {/* The same illustrative workspace the homepage opens on, in the same
            folded frame. */}
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

      {/* 01 — the router */}
      <section className="ct-router band-light" aria-labelledby="router-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">WHERE TO START</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="router-heading"
              text="Start with why you’re here."
            />
          </div>
          <p className="eg-lede t-lede">
            Different conversations need different context. Pick the closest reason for getting in touch and we will 
            start with the file, workflow, partnership, or company question that actually matters.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <RouterPanes
              reasons={routerReasons}
              foot={routerFoot}
              note={routerNote}
              readout={routerReadout}
            />
          </div>
        </div>
      </section>

      {/* 02 — the addresses */}
      <section className="ct-lines band-deep" aria-labelledby="lines-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">THE DIRECT LINES</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="lines-heading"
              text="Two inboxes, one calendar, one workspace."
            />
          </div>
          <p className="eg-lede t-lede">
            No contact form and no gated download before the conversation. Choose the route that matches what you need — underwriting review, a direct founder conversation, a general enquiry, or access to the product workspace.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <DirectLines
              lines={directLines}
              refusals={refusals}
              close={linesClose}
              note={linesNote}
              readout={linesReadout}
            />
          </div>
        </div>
      </section>

      {/* 03 — how to make the call worth having */}
      <section className="ct-prep band-light" aria-labelledby="prep-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">BEFORE THE CALL</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="prep-heading"
              text="Bring the workflow. Keep borrower data out of email."
            />
          </div>
          <p className="eg-lede t-lede">
            A useful first conversation does not need a live borrower file. Four pieces of context are enough
             to understand how your team underwrites today, where Cevrynt could fit, and what would need to be proven before going further.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PrepList
              items={prepItems}
              none={prepNone}
              caution={prepCaution}
              close={prepClose}
              note={prepNote}
              readout={prepReadout}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="04"
          kicker="FOUNDER-LED"
          heading="Bring the question that actually decides fit."
          lede="Ask about the messy file, the policy exception, the integration constraint, the security requirement, or the part of the workflow Cevrynt cannot handle yet. The useful conversation is the one that tests where the product holds up and where it does not."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
