export const workflow = [
  "Intake",
  "Documents",
  "Financials",
  "Verification",
  "Fraud",
  "Policy",
  "Report",
  "Human Decision",
];

const productPages = [
  {
    path: "product/document-intelligence",
    group: "Product",
    title: "Document Intelligence",
    description: "Turn mixed borrower files into structured underwriting inputs with source-linked evidence.",
    points: ["Classify and organize submitted files", "Extract decision-relevant fields", "Keep analysis connected to source material"],
  },
  {
    path: "product/bank-statement-analysis",
    group: "Product",
    title: "Bank Statement Analysis",
    description: "Review cash flow, deposits, balances, and transaction patterns in a consistent underwriting workflow.",
    points: ["Structure statement activity", "Surface cash-flow patterns for review", "Give underwriters evidence for follow-up"],
  },
  {
    path: "product/business-verification",
    group: "Product",
    title: "Business Verification",
    description: "Bring business identity and operating signals into the same review used for underwriting.",
    points: ["Organize verification findings", "Highlight conflicts for human review", "Preserve sources and reviewer notes"],
  },
  {
    path: "product/fraud-signals",
    group: "Product",
    title: "Fraud Signals",
    description: "Surface document, identity, and transaction inconsistencies without removing lender judgment.",
    points: ["Flag inconsistencies and unusual patterns", "Separate signals from final decisions", "Keep evidence available to reviewers"],
  },
  {
    path: "product/policy-engine",
    group: "Product",
    title: "Policy Engine",
    description: "Evaluate each deal against lender-defined policies while preserving notes, exceptions, and overrides.",
    points: ["Apply lender-specific review criteria", "Show policy outcomes with context", "Support documented human overrides"],
  },
  {
    path: "product/underwriting-report",
    group: "Product",
    title: "Underwriting Report",
    description: "Bring financials, verification, fraud signals, and policy findings into one evidence-backed review.",
    points: ["Summarize the complete deal", "Link findings to supporting evidence", "Record reviewer notes and decisions"],
  },
];

const solutionPages = [
  {
    path: "solutions/merchant-cash-advance",
    group: "Solutions",
    title: "Merchant Cash Advance",
    description: "A decision-intelligence workflow designed around the document-heavy realities of MCA underwriting.",
    points: ["Review bank statements and borrower files", "Evaluate lender-specific policies", "Move qualified files toward human decisions"],
  },
  {
    path: "solutions/alternative-lenders",
    group: "Solutions",
    title: "Alternative Lenders",
    description: "Standardize document review and decision preparation across fast-moving SMB finance teams.",
    points: ["Create a repeatable review path", "Keep evidence and exceptions visible", "Support credit, risk, and operations teams"],
  },
  {
    path: "solutions/brokers-isos",
    group: "Solutions",
    title: "Brokers and ISOs",
    description: "Prepare more complete submissions and make missing information easier to identify before lender review.",
    points: ["Organize submission packages", "Identify incomplete borrower information", "Support clearer lender handoffs"],
  },
  {
    path: "solutions/ecommerce-merchant-underwriting",
    group: "Solutions",
    title: "E-commerce Merchant Underwriting",
    description: "Bring commerce-context workflows into evidence-backed underwriting for eligible merchant finance use cases.",
    points: ["Structure merchant underwriting inputs", "Combine documentary and business context", "Keep lender control at the final decision"],
  },
];

const corePages = [
  {
    path: "platform",
    group: "Platform",
    title: "Underwriting intelligence, connected end to end",
    description: "Cevrynt connects intake, analysis, verification, policy evaluation, and reporting in one lender-controlled workflow.",
    points: ["Move from intake to evidence-backed report", "Keep sources, notes, and overrides together", "Support—not replace—human underwriting"],
  },
  {
    path: "why-cevrynt",
    group: "Why Cevrynt",
    title: "Make every review more consistent and explainable",
    description: "Give underwriting teams a shared process without forcing every lender into the same credit policy.",
    points: ["Reduce fragmented review work", "Preserve lender-specific judgment", "Make findings easier to inspect and explain"],
  },
  {
    path: "integrations",
    group: "Platform",
    title: "Connect the underwriting workflow carefully",
    description: "Plan data and workflow connections around the systems your team already uses, without implying unverified availability.",
    points: ["Map intake and document sources", "Define controlled workflow handoffs", "Evaluate integrations during a qualified walkthrough"],
  },
  {
    path: "security",
    group: "Trust",
    title: "Build underwriting workflows with security in mind",
    description: "Discuss access, data handling, audit needs, and deployment requirements directly with the Cevrynt team.",
    points: ["Review access and data-flow requirements", "Plan auditability and reviewer accountability", "Validate requirements before a pilot"],
  },
  {
    path: "pilot",
    group: "Pilot",
    title: "Design a focused underwriting pilot",
    description: "Work with the founder to define a narrow workflow, representative files, review criteria, and clear evaluation goals.",
    points: ["Choose a bounded use case", "Align on lender-specific review needs", "Keep human approval authority explicit"],
    cta: "Discuss a pilot",
  },
];

const partnerPages = [
  {
    path: "partners/shopline",
    group: "Partner",
    title: "Cevrynt × SHOPLINE",
    description: "A documented development and referral partnership around e-commerce merchant-underwriting workflows.",
    points: ["Explore relevant merchant-underwriting workflows", "Coordinate development and qualified referrals", "Keep lender eligibility and decisions independent"],
    notice: "This partnership does not imply a generally available live integration, automatic data sharing, universal merchant eligibility, or guaranteed funding.",
  },
];

const companyPages = [
  {
    path: "about",
    group: "Company",
    title: "Building infrastructure for clearer underwriting decisions",
    description: "Cevrynt is developing AI-assisted underwriting intelligence for alternative lenders and SMB finance teams.",
    points: ["Built around real underwriting workflows", "Focused on evidence and explainability", "Designed with human decision control"],
  },
  {
    path: "investors",
    group: "Company",
    title: "Investor information",
    description: "Connect directly with the founder for current company context, product progress, and the opportunity Cevrynt is pursuing.",
    points: ["Early-stage underwriting infrastructure", "Focused U.S. alternative-lending entry market", "Founder-led investor conversations"],
    cta: "Contact the founder",
    ctaHref: "mailto:arin@cevrynt.com",
  },
  {
    path: "contact",
    group: "Company",
    title: "Talk with Cevrynt",
    description: "Book a product walkthrough or contact the team about underwriting, partnerships, pilots, or investment.",
    points: ["Founder-led sales: arin@cevrynt.com", "Sales enquiries: sales@cevrynt.com", "Qualified walkthroughs via Calendly"],
  },
];

const resourcePages = [
  {
    path: "resources",
    group: "Resources",
    title: "Underwriting resources",
    description: "Practical perspectives on document review, financial analysis, fraud signals, policy evaluation, and explainable decisions.",
    points: ["Underwriting workflow guides", "Product and policy perspectives", "Evidence-focused operating practices"],
  },
  {
    path: "blog",
    group: "Resources",
    title: "Cevrynt insights",
    description: "Notes for alternative-lending teams building more consistent, evidence-backed underwriting operations.",
    points: ["MCA and SMB underwriting", "Decision-intelligence infrastructure", "Human-controlled AI workflows"],
  },
  {
    path: "blog/from-documents-to-decision-ready-underwriting",
    group: "Article",
    title: "From documents to decision-ready underwriting",
    description: "A practical framework for connecting intake, analysis, verification, fraud review, policy, and human decisions.",
    points: ["Create a consistent intake path", "Keep every finding linked to evidence", "Make policy outcomes reviewable by people"],
    article: true,
  },
  {
    path: "faq",
    group: "Resources",
    title: "Frequently asked questions",
    description: "Straightforward answers about what Cevrynt does, who it is for, and how lender control is preserved.",
    points: ["Cevrynt is not a lender", "Cevrynt assists human underwriting teams", "A walkthrough is the best way to assess fit"],
  },
];

const legalPages = [
  { path: "privacy", group: "Legal", title: "Privacy Policy", description: "Cevrynt privacy information and data-handling disclosures.", points: ["This page is reserved for reviewed legal text", "Do not treat this placeholder as legal advice", "Contact sales@cevrynt.com with questions"], legal: true },
  { path: "terms", group: "Legal", title: "Terms of Use", description: "Terms governing use of the Cevrynt website and services.", points: ["This page is reserved for reviewed legal text", "Product terms should be approved before publication", "Contact sales@cevrynt.com with questions"], legal: true },
  { path: "cookie-policy", group: "Legal", title: "Cookie Policy", description: "Information about cookies and similar technologies used by Cevrynt.", points: ["This page is reserved for reviewed legal text", "Cookie disclosures should match deployed tooling", "Contact sales@cevrynt.com with questions"], legal: true },
];

export const sitePages = [
  ...corePages,
  ...productPages,
  ...solutionPages,
  ...partnerPages,
  ...companyPages,
  ...resourcePages,
  ...legalPages,
];

export const pageByPath = new Map(sitePages.map((page) => [page.path, page]));

export const navGroups = [
  {
    label: "Platform",
    href: "/platform",
    items: [
      ["Platform overview", "/platform"],
      ["Why Cevrynt", "/why-cevrynt"],
      ["Integrations", "/integrations"],
      ["Security", "/security"],
    ],
  },
  {
    label: "Product",
    items: productPages.map((page) => [page.title, `/${page.path}`]),
  },
  {
    label: "Solutions",
    items: solutionPages.map((page) => [page.title, `/${page.path}`]),
  },
  {
    label: "Partners",
    href: "/partners/shopline",
  },
  {
    label: "Company",
    items: companyPages.map((page) => [page.title, `/${page.path}`]),
  },
  {
    label: "Resources",
    items: [
      ["Resources", "/resources"],
      ["Blog", "/blog"],
      ["FAQ", "/faq"],
    ],
  },
];
