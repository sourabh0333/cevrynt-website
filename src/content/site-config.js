export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cevrynt.com";

export const siteClaims = [
  { id: "files-tested", text: "Tested across 200+ financial files", status: "confirmed" },
  { id: "analysis-time", text: "Approximately 2-4 minute analysis", status: "confirmed" },
  { id: "policy", text: "Organisation-specific underwriting policies", status: "confirmed" },
  { id: "reports", text: "Evidence-backed decision reports", status: "confirmed" },
  { id: "shopline", text: "Confirmed SHOPLINE ecosystem partnership", status: "confirmed" },
  { id: "decision-demo", text: "Conditional Approval - Score 82/100", status: "demonstrative" },
  { id: "embedded-eligibility", text: "Embedded eligibility", status: "roadmap-only" },
];

export const homepageSections = [
  { id: "hero", label: "Underwriting intelligence" },
  { id: "credibility", label: "Built for decision context" },
  { id: "workflow", label: "The broken workflow" },
  { id: "journey", label: "Document to decision" },
  { id: "workspace", label: "Underwriting workspace" },
  { id: "signals", label: "Financial signals" },
  { id: "bank-analysis", label: "Bank statement analysis" },
  { id: "policy", label: "Policy intelligence" },
  { id: "funder-sales", label: "Funder Sales" },
  { id: "funder-pricing", label: "Funder Pricing" },
  { id: "verification", label: "Business verification" },
  { id: "fraud", label: "Fraud evidence" },
  { id: "outcomes", label: "Operational outcomes" },
  { id: "report", label: "Explainable report" },
  { id: "shopline", label: "SHOPLINE partnership" },
  { id: "audiences", label: "Who Cevrynt serves" },
  { id: "integrations", label: "Integration workflow" },
  { id: "control", label: "Human control" },
  { id: "roadmap", label: "Platform evolution" },
  { id: "resources", label: "Resources" },
];

export const navigationGroups = [
  { label: "Platform", links: [
    { label: "Platform overview", href: "/platform", description: "Decision intelligence across the workflow." },
    { label: "Underwriting", href: "/underwriting", description: "Evidence organized for underwriting judgment." },
    { label: "Bank statement analysis", href: "/bank-statement-analysis", description: "Financial signals with supporting context." },
    { label: "Policy intelligence", href: "/policy-intelligence", description: "Organisation-specific policy application." },
    { label: "Fraud and verification", href: "/fraud-verification", description: "Evidence for confident review." },
    { label: "Reports", href: "/reports", description: "Explainable decision reports." },
    { label: "Integrations and API", href: "/integrations", description: "Connect intelligence to your workflow." },
  ] },
  { label: "Solutions", links: [
    { label: "For lenders", href: "/solutions/lenders", description: "Underwriting intelligence for lending teams." },
    { label: "For brokers and ISOs", href: "/solutions/brokers-isos", description: "A clearer path from submission to review." },
    { label: "For commerce platforms", href: "/solutions/commerce-platforms", description: "Decision-support infrastructure for embedded flows." },
    { label: "Funder Sales", href: "/solutions/funder-sales", description: "Qualify and route opportunities with more context." },
    { label: "Funder Pricing", href: "/solutions/funder-pricing", description: "Risk intelligence for policy-informed recommendations." },
  ] },
];

export const footerGroups = [
  { label: "Platform", links: navigationGroups[0].links.slice(0, 5) },
  { label: "Solutions", links: navigationGroups[1].links },
  { label: "Partnership", links: [{ label: "SHOPLINE partnership", href: "/partners/shopline" }, { label: "Embedded intake", href: "/embedded-intake" }] },
  { label: "Company", links: [{ label: "Company", href: "/company" }, { label: "Resources", href: "/resources" }, { label: "Security", href: "/security" }, { label: "Book a demo", href: "/contact" }] },
];

const routeDefinitions = [
  ["/", "Cevrynt | Underwriting decision intelligence", "Cevrynt turns financial documents, business data, and lender policy into evidence-backed underwriting intelligence.", true, "Underwriting intelligence for decisions that matter.", "Turn financial documents, business data, and lender policies into a more consistent path to explainable funding recommendations."],
  ["/platform", "Platform | Cevrynt", "Explore the Cevrynt underwriting intelligence platform.", false, "One intelligent foundation for underwriting teams.", "Cevrynt brings financial evidence, verification signals, policy application, and decision context into a single underwriting workflow."],
  ["/underwriting", "Underwriting | Cevrynt", "Explore Cevrynt underwriting intelligence.", false, "Bring more evidence to every underwriting judgment.", "Organise documents, financial signals, policy results, and analyst context so complex applications are easier to review."],
  ["/bank-statement-analysis", "Bank Statement Analysis | Cevrynt", "Explore bank-statement analysis with Cevrynt.", false, "See the financial signals behind the statement.", "Cevrynt is designed to help teams move from received documents to structured financial context with a clear evidence trail."],
  ["/policy-intelligence", "Policy Intelligence | Cevrynt", "Explore policy intelligence with Cevrynt.", false, "Policy intelligence that preserves human judgment.", "Apply organisation-specific policy consistently while keeping exceptions, notes, and final decisions in the hands of your team."],
  ["/fraud-verification", "Fraud and Verification | Cevrynt", "Explore fraud and verification intelligence with Cevrynt.", false, "Evidence for verification and investigation.", "Bring identity, business, document, and transaction context into review without presenting risk as a black-box outcome."],
  ["/embedded-intake", "Embedded Intake | Cevrynt", "Explore embedded underwriting intake with Cevrynt.", false, "A clearer start to every funding workflow.", "Create a structured path from consented information and documents to underwriting intelligence, without implying a live integration."],
  ["/reports", "Decision Reports | Cevrynt", "Explore explainable decision reports with Cevrynt.", false, "Decision reports built around supporting evidence.", "Give teams a clear record of financial context, policy outcomes, review notes, and the rationale behind a recommendation."],
  ["/integrations", "Integrations and API | Cevrynt", "Explore Cevrynt integration and API workflows.", false, "Intelligence that can fit the workflow around it.", "Cevrynt is designed as decision-support infrastructure for the systems and teams that already shape your underwriting process."],
  ["/solutions/lenders", "For Lenders | Cevrynt", "Underwriting intelligence for lenders.", false, "Decision intelligence for lending teams.", "Make evidence easier to evaluate, policy application easier to follow, and analyst time easier to focus on meaningful exceptions."],
  ["/solutions/brokers-isos", "For Brokers and ISOs | Cevrynt", "Underwriting intelligence for brokers and ISOs.", false, "Bring more clarity to each submission.", "Help brokers and ISOs understand information needs and route applications with a better shared view of the underlying evidence."],
  ["/solutions/commerce-platforms", "For Commerce Platforms | Cevrynt", "Underwriting intelligence for commerce platforms.", false, "Decision-support infrastructure for commerce workflows.", "Explore how evidence-backed underwriting intelligence can support future embedded-finance and commerce experiences."],
  ["/solutions/funder-sales", "Funder Sales | Cevrynt", "Cevrynt helps funder sales teams qualify and route funding opportunities with evidence-backed intelligence.", true, "Funder Sales, grounded in underwriting context.", "Create a clearer handoff between qualification, broker communication, exceptions, and underwriting review."],
  ["/solutions/funder-pricing", "Funder Pricing | Cevrynt", "Cevrynt supports evidence-backed, policy-informed funding recommendations and pricing intelligence.", true, "Funder Pricing, informed by evidence.", "Connect financial context, policy criteria, and human review to support better-informed funding recommendations."],
  ["/partners/shopline", "Cevrynt and SHOPLINE Partnership | Commerce Underwriting Intelligence", "Learn how Cevrynt and SHOPLINE are exploring faster, evidence-backed underwriting and financing experiences for commerce businesses and ecosystem partners.", true, "Cevrynt and SHOPLINE.", "A confirmed ecosystem partnership exploring how commerce businesses, platforms, and financing partners can connect through evidence-backed workflows."],
  ["/security", "Security | Cevrynt", "Cevrynt security information.", false, "Security information, presented with care.", "Cevrynt is preparing a clear security overview. Specific controls and compliance commitments are shared only when confirmed."],
  ["/company", "Company | Cevrynt", "Learn about Cevrynt.", false, "Building more defensible funding decisions.", "Cevrynt is focused on underwriting intelligence that strengthens the judgment of the teams responsible for funding decisions."],
  ["/resources", "Resources | Cevrynt", "Underwriting intelligence resources from Cevrynt.", false, "Practical thinking for alternative lending teams.", "Explore perspectives on underwriting automation, bank-statement analysis, policy application, fraud review, and responsible decision intelligence."],
  ["/contact", "Book a Demo | Cevrynt", "Contact Cevrynt to book a demonstration.", false, "See the evidence behind the decision.", "Book a conversation to explore how Cevrynt can support your underwriting workflow. A submission channel will be added when a contact system is configured."],
  ["/privacy", "Privacy Draft | Cevrynt", "Draft privacy information pending legal review.", false, "Privacy information - draft.", "This draft is intentionally limited to confirmed information and awaits founder and legal review before publication."],
  ["/terms", "Terms Draft | Cevrynt", "Draft terms pending legal review.", false, "Terms - draft.", "This draft is intentionally limited to confirmed information and awaits founder and legal review before publication."],
];

export const routes = routeDefinitions.map(([path, title, description, indexable, eyebrow, intro]) => ({ path, title, description, indexable, eyebrow, intro, robots: indexable ? "index, follow" : "noindex, follow" }));
export const indexableRoutes = routes.filter((route) => route.indexable).map((route) => route.path);
export function getRouteDefinition(path) { return routes.find((route) => route.path === path) || null; }
