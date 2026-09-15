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

const routerReadout = { head: "Four reasons people write · pick one" };

const routerReasons = [
  {
    k: "You lend, and want to see it on a real file",
    channelK: "Channel · a booked walkthrough",
    channel: "Book a walkthrough.",
    b: "Half an hour on the workflow itself rather than a slide deck — intake through to a report, with the evidence staying attached at every stage.",
    expect: [
      "A run through the product on an illustrative file, using synthetic borrower data.",
      "Straight answers about what it cannot do yet, which is usually the more useful half.",
      "No obligation to bring a real file to a first call, and no pressure to.",
    ],
    action: "Open the calendar",
    href: calendlyUrl,
  },
  {
    k: "You broker deals, or you run a platform",
    channelK: "Channel · the founder, directly",
    channel: "Write to the founder.",
    b: "Brokers, ISOs, commerce platforms and embedded-finance partners all sit at a different point in the file's life, so the first conversation is about the shape of the workflow on your side.",
    expect: [
      "A conversation about where your submissions go and what the funder on the other end will accept.",
      "An honest read on whether there is anything here for you yet.",
      "Partnership language kept precise: nothing is described as an integration or an endorsement unless it is one.",
    ],
    action: `Email ${founderEmail}`,
    href: `mailto:${founderEmail}`,
  },
  {
    k: "You are looking at this as an investment",
    channelK: "Channel · the investors page, then a call",
    channel: "Start with what is published.",
    b: "The market, what is built, how it reaches a lender, who is behind it and the assumptions underneath are all set out already. Read those first and the call can be about the parts that are not.",
    expect: [
      "Five sections of context that do not need a meeting to access.",
      "Revenue, pipeline, ownership and any raise are not published, and are answered in person.",
      "No deck link, and no gated download standing between you and the detail.",
    ],
    action: "Read the investors page",
    href: "/investors",
  },
  {
    k: "You already use it and need the application",
    channelK: "Channel · the product itself",
    channel: "Sign in.",
    b: "This site is the marketing surface. The workspace where files are actually worked lives somewhere else, and that is where you want to be.",
    expect: [
      "The application is a separate sign-in, not part of this site.",
      "Nothing on this page is needed to get to it.",
    ],
    action: "Go to the application",
    href: siteConfig.appUrl,
  },
];

const routerFoot = `If none of those fit, ${salesEmail} reaches the general enquiries mailbox and is read. It is the slower of the two addresses on this page, and the founder's is the faster one.`;

const routerNote =
  "Cevrynt is AI-assisted infrastructure and is not a lender. Nothing on this page is an offer of finance, and no eligibility, approval or funding outcome is implied by getting in touch.";

/* 02 — the addresses themselves ------------------------------------------ */

const linesReadout = { refusalsK: "What will not happen" };

const directLines = [
  {
    k: "Book a walkthrough",
    to: "calendly.com/arin-cevrynt",
    href: calendlyUrl,
    hint: "The founder's own calendar. Pick a slot and it is confirmed — nobody screens it first.",
  },
  {
    k: "Founder, directly",
    to: founderEmail,
    href: `mailto:${founderEmail}`,
    hint: "Product questions, partnerships, pilots and investment all land here, and the person who replies is the person who built it.",
  },
  {
    k: "General enquiries",
    to: salesEmail,
    href: `mailto:${salesEmail}`,
    hint: "For anything that does not obviously belong to the founder's inbox. Read, but slower.",
  },
  {
    k: "The application",
    to: "app.cevrynt.com",
    href: siteConfig.appUrl,
    hint: "Existing users only. Separate sign-in, and nothing to do with this site.",
  },
];

const refusals = [
  "No qualification call before the real one.",
  "No automated sequence after you write.",
  "No gated deck in exchange for your address.",
  "No chatbot standing in for an answer.",
  "No handing you to an account manager, because there is not one.",
  "No pricing quoted before anyone has seen your workflow.",
];

const linesClose =
  "Two mailboxes and a calendar. The whole of the contact surface, because founder-led means there is nothing else for it to be.";

const linesNote =
  "These are commitments about how enquiries are handled. Nothing here states a response time, and no availability is guaranteed.";

/* 03 — what makes the first call worth having ---------------------------- */

const prepReadout = { head: "Four things that help · tick as you go", meterK: "ready" };

const prepItems = [
  {
    k: "Your thresholds, even roughly.",
    b: "Minimum monthly revenue, average daily balance, how many negative days you tolerate. Approximate numbers are enough to make the policy engine concrete instead of hypothetical.",
  },
  {
    k: "What a typical file looks like on your side.",
    b: "How many months of statements, how many documents, and where they usually arrive from. It decides which half of the workflow is worth the time.",
  },
  {
    k: "The part you are most sceptical about.",
    b: "Whichever claim on this site you least believe. That is the useful half of the call, and getting to it early saves a second one.",
  },
  {
    k: "Who else has to be convinced.",
    b: "Credit, risk, operations, and whoever signs. Knowing that up front stops the walkthrough being aimed at the wrong person.",
  },
];

const prepNone = {
  k: "What you do not need",
  items: [
    {
      k: "A real borrower file.",
      b: "The walkthrough runs on an illustrative one with synthetic data, and it shows the same behaviour.",
    },
    {
      k: "A procurement process.",
      b: "A slot on the calendar is the whole of it. There is nothing to route through purchasing to get a first look.",
    },
    {
      k: "A decision.",
      b: "Nothing about a first call commits anyone to a second, and nothing is quoted in it.",
    },
  ],
};

const prepCaution = {
  k: "One request",
  h: "Please do not email borrower documents.",
  b: "A first call does not need them, and real borrower paperwork should not travel to a vendor by email before anyone has agreed how it will be handled. Describe the shape of a file, or bring redacted screenshots — that is enough to have the whole conversation.",
};

const prepClose =
  "Half an hour with those four things to hand covers more ground than an hour without them. Everything else about the call is our side of the work, not yours.";

const prepNote =
  "The ticks are a reading aid and are not stored or sent anywhere. Nothing on this page asks for or collects any information about you.";

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
      </HeroMotion>

      {/* 01 — the router */}
      <section className="ct-router band-light" aria-labelledby="router-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">Where to start</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="router-heading"
              text="Tell it why you are writing. It will point you at the right door."
            />
          </div>
          <p className="eg-lede t-lede">
            Four reasons people get in touch, and a different answer for each — the channel, what that
            conversation actually covers, and the one thing worth clicking.
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
            <p className="hx-kicker hx-kicker-invert">The direct lines</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="lines-heading"
              text="Two mailboxes and a calendar. That is the whole switchboard."
            />
          </div>
          <p className="eg-lede t-lede">
            No form, and nothing behind a gate. The addresses are the point of the page, so they are set at
            the size the point deserves.
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
            <p className="hx-kicker">Before the call</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="prep-heading"
              text="Four things to bring. One thing not to send."
            />
          </div>
          <p className="eg-lede t-lede">
            A walkthrough held without your own numbers to hand turns into a demo. These are the four things
            that make it a working session instead — and the one thing to keep out of your outbox.
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
          kicker="Founder-led"
          heading="Ask the hard version of the question."
          lede="What it cannot do yet, what happens when the submission is a mess, and where the boundary actually sits. Those are the conversations worth booking at this stage, and you will be having them with the person who built it."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
