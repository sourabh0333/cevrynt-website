export const application = { business: "Harbor & Pine Supply Co.", requested: "$185,000", owner: "Elena Torres", status: "Demonstration data" };
export const financialSignals = [
  ["Monthly revenue", "$284k", "Stable", "green"], ["Average daily balance", "$41.8k", "Healthy", "green"], ["NSF activity", "2 events", "Review", "amber"], ["Existing obligations", "2 positions", "Context", "blue"],
];
export const policyRules = [
  ["Monthly revenue", ">= $75,000", "$284,000", "Pass"], ["NSF count", "<= 3", "2", "Pass"], ["Existing positions", "<= 1", "2", "Exception"], ["Average daily balance", ">= $20,000", "$41,800", "Pass"],
];
export const verificationChecks = [
  ["Business identity", "Matched", "green"], ["Registered address", "Confirmed", "green"], ["Owner verification", "Matched", "green"], ["Website presence", "Observed", "blue"], ["Watchlist review", "No match", "green"],
];
export const reportSections = ["Executive recommendation", "Financial summary", "Policy outcomes", "Verification evidence", "Existing obligations", "Analyst notes", "Audit trail"];
export const resources = [
  ["Bank statement analysis", "What underwriting teams should look for beyond revenue totals."], ["Policy automation", "Applying lender criteria consistently while preserving exceptions."], ["Fraud review", "Connecting discrepancy signals back to source evidence."],
];
