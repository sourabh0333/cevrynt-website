import { post as whatIsDecisionIntelligence } from "./posts/what-is-decision-intelligence-in-underwriting";
import { post as fromDocumentsToDecisionReady } from "./posts/from-documents-to-decision-ready-underwriting";
import { post as humanInTheLoop } from "./posts/human-in-the-loop-ai-underwriting";
import { post as underwritingAuditTrails } from "./posts/underwriting-audit-trails-evidence-linked-decisions";
import { post as underwritingTurnaroundTime } from "./posts/underwriting-turnaround-time-fragmented-review";
import { post as documentIntelligenceForLenders } from "./posts/document-intelligence-for-lenders";
import { post as hiddenCostManualReview } from "./posts/hidden-cost-of-manual-document-review-mca";
import { post as sourceLinkedExtraction } from "./posts/source-linked-extraction-underwriting-evidence";
import { post as bankStatementAnalysisGuide } from "./posts/bank-statement-analysis-for-underwriting-guide";
import { post as cashFlowUnderwriting } from "./posts/cash-flow-underwriting-for-smb-loans";
import { post as nsfPatterns } from "./posts/nsf-patterns-overdrafts-underwriting-risk-signal";
import { post as dscrAverageDailyBalance } from "./posts/dscr-average-daily-balance-mca-underwriting-metrics";
import { post as detectingStacking } from "./posts/detecting-stacking-in-merchant-cash-advance-underwriting";
import { post as kybForLenders } from "./posts/kyb-for-lenders-business-verification-guide";
import { post as kybVsKyc } from "./posts/kyb-vs-kyc-alternative-lenders";
import { post as shellCompanies } from "./posts/shell-companies-synthetic-business-identities-smb-lending";
import { post as fraudSignalsSmallBusiness } from "./posts/fraud-signals-in-small-business-lending";
import { post as bustOutFraud } from "./posts/bust-out-fraud-in-mca-lending";
import { post as documentFraudDetection } from "./posts/document-fraud-detection-in-underwriting";
import { post as whatIsALoanPolicyEngine } from "./posts/what-is-a-loan-policy-engine";
import { post as decisionEngineVsUnderwritingEngine } from "./posts/decision-engine-vs-underwriting-engine";
import { post as policyExceptionsOverrides } from "./posts/policy-exceptions-overrides-audit-trail";
import { post as evidenceBackedReports } from "./posts/evidence-backed-underwriting-reports-documentation";
import { post as explainableAiCompliance } from "./posts/explainable-ai-in-underwriting-compliance";
import { post as buyersGuideMca } from "./posts/buyers-guide-merchant-cash-advance-underwriting-software";
import { post as brokersIsosCleanerDeals } from "./posts/how-brokers-isos-submit-cleaner-deals-faster-decisions";
import { post as ecommerceMerchantUnderwriting } from "./posts/ecommerce-merchant-underwriting-shopify-marketplace-sellers";
import { post as revenueBasedFinancing } from "./posts/revenue-based-financing-underwriting-vs-term-loans";

export const categoryMeta = {
  "Underwriting Workflow": { shortLabel: "Workflow", thumbClass: "blog-thumb-a" },
  "Document Intelligence": { shortLabel: "Documents", thumbClass: "blog-thumb-b" },
  "Financial Analysis": { shortLabel: "Financials", thumbClass: "blog-thumb-c" },
  "Business Verification": { shortLabel: "Verification", thumbClass: "blog-thumb-d" },
  "Fraud Prevention": { shortLabel: "Fraud", thumbClass: "blog-thumb-e" },
  "Policy & Decisioning": { shortLabel: "Policy", thumbClass: "blog-thumb-f" },
  "Reporting & Compliance": { shortLabel: "Reporting", thumbClass: "blog-thumb-g" },
  Solutions: { shortLabel: "Solutions", thumbClass: "blog-thumb-h" },
};

const allPosts = [
  whatIsDecisionIntelligence,
  fromDocumentsToDecisionReady,
  humanInTheLoop,
  underwritingAuditTrails,
  underwritingTurnaroundTime,
  documentIntelligenceForLenders,
  hiddenCostManualReview,
  sourceLinkedExtraction,
  bankStatementAnalysisGuide,
  cashFlowUnderwriting,
  nsfPatterns,
  dscrAverageDailyBalance,
  detectingStacking,
  kybForLenders,
  kybVsKyc,
  shellCompanies,
  fraudSignalsSmallBusiness,
  bustOutFraud,
  documentFraudDetection,
  whatIsALoanPolicyEngine,
  decisionEngineVsUnderwritingEngine,
  policyExceptionsOverrides,
  evidenceBackedReports,
  explainableAiCompliance,
  buyersGuideMca,
  brokersIsosCleanerDeals,
  ecommerceMerchantUnderwriting,
  revenueBasedFinancing,
];

export const posts = [...allPosts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

export const categories = Object.keys(categoryMeta).filter((category) => posts.some((post) => post.category === category));

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

export function getAllSlugs() {
  return posts.map((post) => post.slug);
}

export function getRelatedPosts(post, count = 3) {
  const bySlug = new Map(posts.map((item) => [item.slug, item]));
  const curated = (post.relatedSlugs || []).map((slug) => bySlug.get(slug)).filter(Boolean);
  if (curated.length >= count) return curated.slice(0, count);

  const fallback = posts.filter((item) => item.slug !== post.slug && item.category === post.category && !curated.includes(item));
  return [...curated, ...fallback].slice(0, count);
}
