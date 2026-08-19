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
    metaTitle: "Document Intelligence for Loan Underwriting",
    metaDescription: "Turn mixed borrower files into structured, source-linked underwriting data. Classify, extract, and organize loan documents for faster human review.",
    keywords: ["document intelligence lending", "loan document automation software", "document classification underwriting"],
    points: ["Classify and organize submitted files", "Extract decision-relevant fields", "Keep analysis connected to source material"],
  },
  {
    path: "product/bank-statement-analysis",
    group: "Product",
    title: "Bank Statement Analysis",
    description: "Review cash flow, deposits, balances, and transaction patterns in a consistent underwriting workflow.",
    metaTitle: "Bank Statement Analysis Software for Lenders",
    metaDescription: "Review cash flow, deposits, balances, and transaction patterns in one consistent underwriting workflow built for alternative lenders.",
    keywords: ["bank statement analysis software", "cash flow underwriting", "NSF detection lending"],
    points: ["Structure statement activity", "Surface cash-flow patterns for review", "Give underwriters evidence for follow-up"],
  },
  {
    path: "product/business-verification",
    group: "Product",
    title: "Business Verification",
    description: "Bring business identity and operating signals into the same review used for underwriting.",
    metaTitle: "Business Verification (KYB) Software for Lenders",
    metaDescription: "Bring business identity, formation, and operating signals into underwriting review, with conflicts flagged for human verification.",
    keywords: ["business verification software", "KYB for lenders", "know your business lending"],
    points: ["Organize verification findings", "Highlight conflicts for human review", "Preserve sources and reviewer notes"],
  },
  {
    path: "product/fraud-signals",
    group: "Product",
    title: "Fraud Signals",
    description: "Surface document, identity, and transaction inconsistencies without removing lender judgment.",
    metaTitle: "Fraud Signals for Small Business Lending",
    metaDescription: "Surface document, identity, and transaction inconsistencies in loan applications without removing lender judgment from the decision.",
    keywords: ["fraud signals lending", "small business lending fraud detection", "MCA fraud detection"],
    points: ["Flag inconsistencies and unusual patterns", "Separate signals from final decisions", "Keep evidence available to reviewers"],
  },
  {
    path: "product/policy-engine",
    group: "Product",
    title: "Policy Engine",
    description: "Evaluate each deal against lender-defined policies while preserving notes, exceptions, and overrides.",
    metaTitle: "Loan Policy Engine for Alternative Lenders",
    metaDescription: "Evaluate every deal against lender-defined policy while preserving reviewer notes, exceptions, and documented overrides.",
    keywords: ["loan policy engine", "credit policy engine lending", "underwriting rules engine"],
    points: ["Apply lender-specific review criteria", "Show policy outcomes with context", "Support documented human overrides"],
  },
  {
    path: "product/underwriting-report",
    group: "Product",
    title: "Underwriting Report",
    description: "Bring financials, verification, fraud signals, and policy findings into one evidence-backed review.",
    metaTitle: "Evidence-Backed Underwriting Reports",
    metaDescription: "Bring financials, verification, fraud signals, and policy findings into one evidence-linked report built for human underwriting review.",
    keywords: ["underwriting report software", "evidence backed underwriting", "loan decision documentation"],
    points: ["Summarize the complete deal", "Link findings to supporting evidence", "Record reviewer notes and decisions"],
  },
];

const solutionPages = [
  {
    path: "solutions/merchant-cash-advance",
    group: "Solutions",
    title: "MCA Funders",
    description: "When files are moving fast, the hard part isn’t opening another application. It’s deciding whether the numbers, business, existing obligations and story behind the deal actually hold together.",
    metaTitle: "Merchant Cash Advance Underwriting Software",
    metaDescription: "A decision-intelligence workflow built for the document-heavy realities of MCA underwriting, from intake through human decision.",
    keywords: ["merchant cash advance underwriting software", "MCA underwriting automation", "MCA decision software"],
    points: ["Read bank activity without rebuilding it in a spreadsheet", "Surface revenue patterns, negative days and existing positions", "Apply your own policy without hiding exceptions", "Keep the evidence behind the final underwriter call"],
  },
  {
    path: "solutions/alternative-lenders",
    group: "Solutions",
    title: "Alternative Lenders",
    description: "Bring more structure to SMB underwriting without forcing every deal through a one-size-fits-all score.",
    metaTitle: "Underwriting Software for Alternative Lenders",
    metaDescription: "Standardize document review and decision preparation across fast-moving SMB finance teams with one connected underwriting workflow.",
    keywords: ["alternative lending software", "SMB underwriting automation", "alternative lender decision engine"],
    points: ["Create a repeatable review path", "Keep evidence and exceptions visible", "Support credit, risk, and operations teams"],
  },
  {
    path: "solutions/brokers-isos",
    group: "Solutions",
    title: "Brokers and ISOs",
    description: "Know what the lender is going to question before the submission leaves your desk.",
    metaTitle: "Submission Tools for MCA Brokers & ISOs",
    metaDescription: "Help brokers and ISOs prepare complete submissions and flag missing information before lender review, for faster funding decisions.",
    keywords: ["MCA broker software", "ISO submission software", "broker underwriting tools"],
    points: ["Organize submission packages", "Identify incomplete borrower information", "Support clearer lender handoffs"],
  },
  {
    path: "solutions/ecommerce-merchant-underwriting",
    group: "Solutions",
    title: "E-commerce Merchant Underwriting",
    description: "Merchant activity already tells part of the underwriting story. Cevrynt helps connect that operating context with documents, financial evidence and lender requirements.",
    metaTitle: "E-commerce Merchant Underwriting Software",
    metaDescription: "Bring commerce-context signals into evidence-backed underwriting for eligible e-commerce and marketplace merchant financing.",
    keywords: ["e-commerce merchant underwriting", "Shopify merchant underwriting", "marketplace seller financing underwriting"],
    points: ["Structure merchant underwriting inputs", "Combine documentary and business context", "Keep lender control at the final decision"],
  },
];

const corePages = [
  {
    path: "platform",
    group: "Platform",
    title: "Underwriting intelligence, connected end to end",
    description: "Cevrynt connects intake, analysis, verification, policy evaluation, and reporting in one lender-controlled workflow.",
    metaTitle: "AI Underwriting Platform for Alternative Lenders",
    metaDescription: "Cevrynt connects intake, document analysis, verification, fraud signals, and policy evaluation into one evidence-backed underwriting workflow.",
    keywords: ["AI underwriting platform", "underwriting workflow software", "decision intelligence lending"],
    points: ["Move from intake to evidence-backed report", "Keep sources, notes, and overrides together", "Support—not replace—human underwriting"],
  },
  {
    path: "why-cevrynt",
    group: "Why Cevrynt",
    title: "Make every review more consistent and explainable",
    description: "Give underwriting teams a shared process without forcing every lender into the same credit policy.",
    metaTitle: "Why Cevrynt | Explainable AI Underwriting for Lenders",
    metaDescription: "See why alternative lending teams choose Cevrynt for consistent, evidence-backed underwriting that keeps human decision authority in place.",
    keywords: ["explainable AI underwriting", "human in the loop underwriting"],
    points: ["Reduce fragmented review work", "Preserve lender-specific judgment", "Make findings easier to inspect and explain"],
  },
  {
    path: "integrations",
    group: "Platform",
    title: "Connect the underwriting workflow carefully",
    description: "Plan data and workflow connections around the systems your team already uses, without implying unverified availability.",
    metaTitle: "Underwriting Workflow Integrations",
    metaDescription: "Plan intake and data connections for your underwriting stack, and discuss integration requirements with the Cevrynt team.",
    keywords: ["lending software integrations", "underwriting workflow integration"],
    points: ["Map intake and document sources", "Define controlled workflow handoffs", "Evaluate integrations during a qualified walkthrough"],
  },
  {
    path: "security",
    group: "Trust",
    title: "Build underwriting workflows with security in mind",
    description: "Discuss access, data handling, audit needs, and deployment requirements directly with the Cevrynt team.",
    metaTitle: "Security & Data Handling for Underwriting Teams",
    metaDescription: "Review access controls, data handling, and audit requirements for AI-assisted underwriting before a pilot with the Cevrynt team.",
    keywords: ["underwriting data security", "lending software security"],
    points: ["Review access and data-flow requirements", "Plan auditability and reviewer accountability", "Validate requirements before a pilot"],
  },
  {
    path: "pilot",
    group: "Pilot",
    title: "Design a focused underwriting pilot",
    description: "Work with the founder to define a narrow workflow, representative files, review criteria, and clear evaluation goals.",
    metaTitle: "Start an Underwriting Pilot",
    metaDescription: "Design a focused underwriting pilot with representative files, clear review criteria, and defined evaluation goals with Cevrynt's founder.",
    keywords: ["underwriting software pilot", "MCA underwriting trial"],
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
    metaTitle: "Cevrynt × SHOPLINE Partnership",
    metaDescription: "A documented development and referral partnership exploring e-commerce merchant-underwriting workflows between Cevrynt and SHOPLINE.",
    keywords: ["Cevrynt SHOPLINE partnership", "e-commerce underwriting partnership"],
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
    metaTitle: "About Cevrynt | AI Underwriting Infrastructure",
    metaDescription: "Cevrynt builds AI-assisted underwriting infrastructure for alternative lenders, focused on evidence, explainability, and human decision control.",
    keywords: ["about Cevrynt", "AI underwriting infrastructure company"],
    points: ["Built around real underwriting workflows", "Focused on evidence and explainability", "Designed with human decision control"],
  },
  {
    path: "investors",
    group: "Company",
    title: "Investor information",
    description: "Connect directly with the founder for current company context, product progress, and the opportunity Cevrynt is pursuing.",
    metaTitle: "Investor Information",
    metaDescription: "Connect with Cevrynt's founder for company context, product progress, and the underwriting infrastructure opportunity in alternative lending.",
    keywords: ["Cevrynt investors", "fintech underwriting startup"],
    points: ["Early-stage underwriting infrastructure", "Focused U.S. alternative-lending entry market", "Founder-led investor conversations"],
    cta: "Contact the founder",
    ctaHref: "mailto:arin@cevrynt.com",
  },
  {
    path: "contact",
    group: "Company",
    title: "Talk with Cevrynt",
    description: "Book a product walkthrough or contact the team about underwriting, partnerships, pilots, or investment.",
    metaTitle: "Contact Cevrynt | Book a Walkthrough",
    metaDescription: "Book a product walkthrough or reach the Cevrynt team about underwriting workflows, partnerships, pilots, or investment.",
    keywords: ["contact Cevrynt", "book underwriting software demo"],
    points: ["Founder-led sales: arin@cevrynt.com", "Sales enquiries: sales@cevrynt.com", "Qualified walkthroughs via Calendly"],
  },
];

const resourcePages = [
  {
    path: "resources",
    group: "Resources",
    title: "Underwriting resources",
    description: "Practical perspectives on document review, financial analysis, fraud signals, policy evaluation, and explainable decisions.",
    metaTitle: "Underwriting Resources for Alternative Lenders",
    metaDescription: "Guides and perspectives on document review, financial analysis, fraud signals, policy evaluation, and explainable underwriting decisions.",
    keywords: ["underwriting resources", "alternative lending guides"],
    points: ["Underwriting workflow guides", "Product and policy perspectives", "Evidence-focused operating practices"],
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
