import { ArticleFaq } from "@/components/article-faq";
import { WalkthroughBand } from "@/components/walkthrough-band";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Straightforward answers about what Cevrynt does, who it is for, how lender control is preserved, and how a pilot works.",
  keywords: ["Cevrynt FAQ", "AI underwriting platform questions", "MCA underwriting software FAQ"],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Cevrynt",
    description: "Straightforward answers about what Cevrynt does, who it is for, and how lender control is preserved.",
    url: "/faq",
  },
};

const faqGroups = [
  {
    title: "About Cevrynt",
    items: [
      {
        q: "What is Cevrynt?",
        a: "Cevrynt is an AI-assisted underwriting infrastructure platform for alternative lenders and SMB finance teams. It structures borrower documents and business signals into evidence-linked analysis that human underwriters use to make faster, more consistent decisions.",
      },
      {
        q: "Is Cevrynt a lender?",
        a: "No. Cevrynt is not a lender and does not make or guarantee funding offers. Cevrynt supports the underwriting process; lenders retain final approval authority in every case.",
      },
      {
        q: "Who is Cevrynt built for?",
        a: "Cevrynt is built primarily for merchant cash advance funders, alternative lenders, and revenue-based finance companies, along with the underwriting, credit, risk, and operations teams inside those organizations. Brokers, ISOs, and commerce platforms are also part of the audience Cevrynt supports.",
      },
      {
        q: "Does Cevrynt replace human underwriters?",
        a: "No. Cevrynt is designed to give underwriters a more complete, evidence-linked picture of a deal faster — not to replace their judgment. Every workflow keeps a human decision-maker in the loop for the final approve, decline, or counter-offer call.",
      },
    ],
  },
  {
    title: "The underwriting workflow",
    items: [
      {
        q: "What does Cevrynt's underwriting workflow actually cover?",
        a: "Cevrynt connects intake, document structuring, bank-statement and financial analysis, business verification, fraud and risk signals, lender-specific policy evaluation, and evidence-linked reporting into one workflow that ends with a human decision.",
      },
      {
        q: "Can Cevrynt work with our existing credit policy?",
        a: "Cevrynt is designed to evaluate deals against a lender's own policy, including specific exceptions and override rules, rather than imposing a generic scoring model. Policy configuration is discussed directly during a walkthrough or pilot.",
      },
      {
        q: "What happens when an underwriter disagrees with a finding?",
        a: "Underwriters can apply a documented override at the policy stage. Reviewer notes, overrides, and audit history are part of the workflow rather than something handled outside the system.",
      },
      {
        q: "Does Cevrynt provide approval rates, accuracy metrics, or performance guarantees?",
        a: "No. Cevrynt does not publish approval rates, accuracy percentages, or performance guarantees, and does not guarantee universal borrower eligibility. Fit and expected value are best assessed against your own file mix during a walkthrough or pilot.",
      },
    ],
  },
  {
    title: "Security, data, and integrations",
    items: [
      {
        q: "How does Cevrynt handle access and data security?",
        a: "Access controls, data handling, audit requirements, and deployment requirements are reviewed directly with the Cevrynt team before a pilot. See the [security page](/security) for what to bring to that conversation.",
      },
      {
        q: "Does Cevrynt integrate with our existing loan origination system?",
        a: "Integration needs are mapped on a case-by-case basis during a qualified walkthrough. Cevrynt does not claim live integrations that have not been documented and verified for a specific lender's stack. See [integrations](/integrations) for how this is scoped.",
      },
      {
        q: "Is the Cevrynt × SHOPLINE partnership a live integration?",
        a: "No. It is a documented development and referral partnership exploring e-commerce merchant-underwriting workflows. It does not imply a generally available live integration, automatic data sharing, universal merchant eligibility, or guaranteed funding. See the [partnership page](/partners/shopline) for details.",
      },
    ],
  },
  {
    title: "Getting started",
    items: [
      {
        q: "Does Cevrynt publish pricing?",
        a: "No. Cevrynt does not publish public pricing. The website is built around qualified walkthroughs and pilot conversations rather than self-serve signup, so pricing and scope are discussed directly with your team.",
      },
      {
        q: "What happens during a pilot?",
        a: "A pilot starts with a focused, bounded workflow: representative files, lender-specific review criteria, and clear evaluation goals defined directly with the founder. Human approval authority stays explicit throughout. See [pilot](/pilot) for more detail.",
      },
      {
        q: "How do I book a walkthrough?",
        a: "You can [book a walkthrough directly on Calendly](https://calendly.com/arin-cevrynt/cevrynt-demo), reach founder-led sales at arin@cevrynt.com, or contact sales@cevrynt.com for other enquiries.",
      },
      {
        q: "What is the 'Cedar & Stone LLC' deal referenced across the site?",
        a: "It is a single, persistent illustrative deal used across Cevrynt's product storytelling to demonstrate how the workflow behaves on a representative file. It is clearly labeled as illustrative and does not represent a real borrower, customer, or completed transaction.",
      },
      {
        q: "How is Sign In different from booking a demo?",
        a: "Sign In links to the separate Cevrynt application for existing users. Booking a demo or walkthrough is for prospective lenders evaluating the platform for the first time.",
      },
    ],
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") },
      }))
    ),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${siteConfig.url}/faq` },
    ],
  };

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="blog-page-intro section-shell">
        <p className="eyebrow">Resources</p>
        <h1>Frequently asked questions</h1>
        <p className="page-lede">
          Straightforward answers about what Cevrynt does, who it is for, and how lender control is preserved
          throughout the underwriting workflow.
        </p>
      </section>

      <section className="article-content-shell section-shell faq-page-groups">
        {faqGroups.map((group) => (
          <ArticleFaq title={group.title} items={group.items} key={group.title} />
        ))}
      </section>

      <WalkthroughBand />
    </main>
  );
}
