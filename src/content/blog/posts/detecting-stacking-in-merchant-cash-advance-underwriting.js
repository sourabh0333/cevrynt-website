export const post = {
  slug: "detecting-stacking-in-merchant-cash-advance-underwriting",
  title: "Detecting Stacking in Merchant Cash Advance Underwriting",
  metaTitle: "Detecting MCA Stacking: A Guide for Underwriters",
  metaDescription: "How MCA stacking works, why it's hard to catch manually, and what signals underwriters use to detect it during bank statement review.",
  keywords: ["MCA stacking detection", "cross platform application velocity fraud", "MCA fraud detection"],
  category: "Fraud Prevention",
  excerpt: "Stacking is one of the costliest risks in MCA underwriting and one of the easiest to miss without the right signals in view.",
  publishedAt: "2026-06-13",
  updatedAt: "2026-06-13",
  readingTime: 14,
  workflowStage: "Fraud",
  heroImage: null,
  relatedProductPaths: ["product/fraud-signals", "solutions/merchant-cash-advance"],
  relatedSlugs: ["fraud-signals-in-small-business-lending", "bust-out-fraud-in-mca-lending", "dscr-average-daily-balance-mca-underwriting-metrics"],
  body: [
    {
      type: "p",
      text: "Stacking — a business taking on multiple merchant cash advances simultaneously, often without disclosing the additional positions to each funder — is one of the most consequential and persistent risks in MCA underwriting. It directly erodes the cash flow a funder is counting on for repayment, and by the time it becomes obvious through missed payments, meaningful damage has often already occurred.",
    },
    {
      type: "p",
      text: "This piece explains how stacking typically happens, why it is genuinely difficult to catch through manual review alone, and what signals underwriters and fraud teams use to detect it earlier.",
    },
    {
      type: "h2",
      text: "Why stacking happens and why it's difficult to catch",
      id: "why-it-happens",
    },
    {
      type: "p",
      text: "Stacking is attractive to a cash-strapped business precisely because MCA approvals can move quickly, and disclosure requirements vary across funders and are not always independently verified. A business under financial pressure may take a second or third advance to cover payments on the first, creating a compounding cash flow burden that eventually becomes unsustainable.",
    },
    {
      type: "p",
      text: "From a funder's perspective, the challenge is that a single application, reviewed in isolation, often looks reasonable. The signals of stacking tend to live in the bank statement data itself — recurring debits, timing patterns, and account behavior — rather than in anything the applicant discloses directly.",
    },
    {
      type: "h2",
      text: "Signals that suggest possible stacking",
      id: "signals-of-stacking",
    },
    {
      type: "h3",
      text: "Multiple recurring daily or weekly debits with MCA-like characteristics",
      id: "multiple-recurring-debits",
    },
    {
      type: "p",
      text: "The clearest signal is the presence of more than one recurring debit pattern consistent with MCA repayment — fixed or near-fixed amounts debited daily or several times a week, often to different processor or funding company names. A single such pattern is expected if a business already has one active advance; multiple distinct patterns are a strong indicator of stacking.",
    },
    {
      type: "h3",
      text: "Deteriorating average daily balance despite stable revenue",
      id: "deteriorating-adb",
    },
    {
      type: "p",
      text: "A business whose deposit volume looks stable but whose **[average daily balance](/blog/dscr-average-daily-balance-mca-underwriting-metrics)** is declining may be servicing more fixed debits than its revenue comfortably supports — a pattern consistent with taking on additional obligations faster than cash flow can absorb them.",
    },
    {
      type: "h3",
      text: "Increasing NSF frequency clustered around debit dates",
      id: "increasing-nsf-frequency",
    },
    {
      type: "p",
      text: "As discussed in our guide to **[NSF patterns](/blog/nsf-patterns-overdrafts-underwriting-risk-signal)**, a rising trend of NSF events clustering around specific recurring debit dates can indicate a business is struggling to cover multiple existing obligations simultaneously.",
    },
    {
      type: "h3",
      text: "Cross-platform application velocity",
      id: "cross-platform-velocity",
    },
    {
      type: "p",
      text: "Beyond bank statement signals, a business applying to multiple funders or brokers within a compressed timeframe — sometimes visible through shared industry data sources or broker network patterns — correlates with higher stacking and fraud incidence. This signal typically requires data beyond a single funder's own application history to detect reliably.",
    },
    {
      type: "h2",
      text: "Why this is hard to catch manually",
      id: "why-hard-to-catch-manually",
    },
    {
      type: "p",
      text: "Manually reviewing bank statements for stacking requires an underwriter to correctly identify every recurring debit pattern, distinguish MCA-style debits from ordinary recurring business expenses (subscriptions, insurance, equipment leases), and track how these patterns change over the full lookback period — all while reviewing a stack of statements under time pressure. It is exactly the kind of pattern-recognition task that benefits from structured, consistent automated analysis, precisely because consistency, not cleverness, is what catches it reliably across every file.",
    },
    {
      type: "h2",
      text: "How a stacking scenario actually looks in the bank data",
      id: "what-stacking-looks-like-in-data",
    },
    {
      type: "p",
      text: "To make this concrete: imagine a business with average monthly deposits of $80,000. A manual underwriter reviewing the first page of statements sees a familiar pattern — deposits coming in regularly, a debit labeled something like 'ACH DEBIT BUSINESS FUNDING' pulling out $850 each weekday. That looks like one existing MCA position, which the business disclosed. But scrolling through additional months, a second recurring debit emerges: $620 every Monday and Thursday to a different processor name, with slightly irregular timing that doesn't immediately read as 'MCA' without looking at the amount-plus-frequency pattern across weeks.",
    },
    {
      type: "p",
      text: "Together, those two positions are pulling roughly $24,000 per month from an $80,000-deposit business — 30% of gross deposits committed to MCA repayment before any operating expenses. A new advance adding another $900 per day pushes that number close to 45%, a repayment burden that typically exceeds what the business's actual free cash flow can sustain. Each individual position might clear a DSCR threshold when evaluated alone; together, they represent a fundamentally different risk picture.",
    },
    {
      type: "h2",
      text: "The relationship between stacking and other MCA risk signals",
      id: "relationship-to-other-risk-signals",
    },
    {
      type: "p",
      text: "Stacking rarely appears in isolation in a deteriorating file. It tends to co-occur with other signals that compound each other. A business taking on multiple positions simultaneously often shows declining **[average daily balance](/blog/dscr-average-daily-balance-mca-underwriting-metrics)** as fixed debit commitments outpace deposit recovery. NSF events — covered in depth in our guide to **[NSF patterns](/blog/nsf-patterns-overdrafts-underwriting-risk-signal)** — often begin clustering around debit dates as the cash position tightens. And in the extreme cases that shade into **[bust-out fraud](/blog/bust-out-fraud-in-mca-lending)**, stacking is often one of the final phases of a longer escalation pattern rather than an isolated opportunistic decision.",
    },
    {
      type: "p",
      text: "Understanding these connections is why underwriting platforms designed for MCA present these signals together rather than as separate scores. A stacking flag that appears alongside a deteriorating ADB trend and rising NSF concentration tells a clearer story than any of those signals reviewed independently.",
    },
    {
      type: "h2",
      text: "Distinguishing MCA-style debits from ordinary recurring expenses",
      id: "distinguishing-mca-from-ordinary-expenses",
    },
    {
      type: "p",
      text: "One of the practical challenges in stacking detection is that MCA repayment debits don't come with a standard, recognizable label across all funders and processors. A debit might appear as a merchant name, a parent company name, a third-party processor name, or a generic ACH descriptor — all depending on how the funder or ISO has set up their payment processing. This means that correctly identifying MCA-style debits requires pattern-matching on amount, frequency, and timing, not just reading a label.",
    },
    {
      type: "p",
      text: "For comparison, ordinary recurring expenses typically have different characteristics: they're monthly rather than daily or near-daily, they often correspond to recognizable vendor categories (software subscriptions, insurance premiums, equipment leases), and their amounts are more varied. A $1,200 charge appearing once per month with a vendor name in the SaaS space is almost certainly not an MCA payment. A $475 charge appearing every business day for six weeks is almost certainly not a subscription service.",
    },
    {
      type: "h2",
      text: "How stacking risk evolves over the life of a funding relationship",
      id: "stacking-risk-over-relationship-life",
    },
    {
      type: "p",
      text: "For funders who run renewal programs, stacking risk doesn't stay static through a funding relationship. A business might take one advance responsibly, repay cleanly, and then face a cash flow crunch before renewal that leads it to seek bridging from a second funder. By the time the renewal application arrives, the bank statements reflect a materially different cash flow picture than when the original advance was underwritten — but if the renewal review isn't as rigorous as the initial application, that change can go undetected.",
    },
    {
      type: "p",
      text: "This is one reason why renewal and increase applications deserve the same structured bank statement review as initial applications, not an abbreviated process that leans on the prior approval history. The business's circumstances can change meaningfully between advance cycles, and the most useful signal is often the comparison between how the statements look now versus how they looked during the last review — a comparison that requires keeping the prior review's findings accessible alongside the current application.",
    },
    {
      type: "h2",
      text: "Industry data sharing and cross-funder visibility",
      id: "industry-data-sharing",
    },
    {
      type: "p",
      text: "Some stacking is invisible to any single funder's bank statement review because the additional position was funded just recently enough that it doesn't yet appear in the statements provided with the current application. A business that took on a second advance two weeks before applying might be in the middle of the initial honeymoon period — deposits still look healthy, no NSF events yet — while the new daily debit commitment has already been set in motion.",
    },
    {
      type: "p",
      text: "This is the gap that industry data-sharing initiatives attempt to address: giving participating funders visibility into recent advance activity across the network, not just what shows up in the statements at the moment of application. The coverage and quality of these data sources vary considerably, but for high-volume MCA lenders, they represent a meaningful additional layer of protection beyond individual file review. Cevrynt does not currently integrate with third-party MCA data networks, but this is a layer that complements rather than replaces thorough bank statement analysis.",
    },
    {
      type: "h2",
      text: "What to do when stacking is suspected",
      id: "what-to-do",
    },
    {
      type: "ul",
      items: [
        "**Flag, don't auto-decline.** A suspected stacking pattern warrants closer underwriter review, not an automatic rejection — some recurring debits resemble MCA payments without actually being one.",
        "**Verify against the source transactions directly.** Confirm the pattern by reviewing the actual statement lines, not just a summary flag, consistent with the evidence-linking principle covered in our guide on **[source-linked extraction](/blog/source-linked-extraction-underwriting-evidence)**.",
        "**Consider the full financial picture**, including whether the business's revenue could plausibly support the identified obligations even with a new advance added.",
        "**Document the finding and the underwriter's decision**, whether that's a decline, a reduced offer, or an approval with documented rationale for proceeding despite the signal.",
      ],
    },
    {
      type: "callout",
      title: "Key takeaways",
      items: [
        "Stacking is one of the more consequential and hardest-to-catch risks in MCA underwriting.",
        "The clearest signal is multiple recurring MCA-style debit patterns appearing in a single account.",
        "Deteriorating average daily balance and rising NSF frequency are supporting signals worth cross-referencing.",
        "Manual detection is genuinely difficult because it requires consistent pattern recognition across every file.",
        "A suspected stacking signal should prompt closer human review, not an automatic decision.",
      ],
    },
    {
      type: "h2",
      text: "How Cevrynt surfaces stacking signals",
      id: "cevrynt-approach",
    },
    {
      type: "p",
      text: "Cevrynt's **[Fraud Signals](/product/fraud-signals)** module identifies recurring debit patterns consistent with existing MCA-style obligations as part of bank statement analysis, surfacing them alongside average daily balance trends and NSF activity so underwriters can evaluate the full picture together. These findings link back to the specific transactions behind them, so an underwriter can verify a suspected stacking pattern in seconds rather than re-reviewing statements from scratch.",
    },
    {
      type: "p",
      text: "Consistent with Cevrynt's approach across the platform, these findings are signals for human review, not automated declines — the underwriter retains full decision authority. A **[qualified walkthrough](https://calendly.com/arin-cevrynt/cevrynt-demo)** shows how this looks in practice.",
    },
  ],
  faqs: [
    {
      q: "Is stacking always fraud?",
      a: "Not necessarily disclosed fraud in every case, but taking on multiple advances without disclosing existing positions to each funder is generally considered a material misrepresentation and a significant credit risk regardless of intent.",
    },
    {
      q: "Can stacking be detected from a single bank statement review?",
      a: "Often yes, if the analysis correctly identifies multiple distinct recurring MCA-style debit patterns within the same account, though a longer lookback period generally improves detection confidence.",
    },
    {
      q: "What should an underwriter do if stacking is suspected but not confirmed?",
      a: "Flag it for closer review rather than an automatic decline, verify the pattern against actual transactions, and consider the business's full cash flow picture before making a final call.",
    },
    {
      q: "Does Cevrynt make the final decision when stacking is detected?",
      a: "No. Cevrynt surfaces the signal and supporting evidence; the underwriter decides how to proceed. Cevrynt does not issue approvals, declines, or funding decisions.",
    },
    {
      q: "How many MCA positions does a business need to have for it to be considered stacking?",
      a: "More than one undisclosed or unaccounted-for active MCA position generally constitutes stacking. Even a second disclosed position changes the risk picture significantly and should be factored into the DSCR calculation before any new advance is approved.",
    },
    {
      q: "Do renewal applications get reviewed the same way as new applications for stacking risk?",
      a: "They should, but in practice they often get a lighter review, which is a meaningful gap. A business can take on additional external positions between the original advance and the renewal application, so the renewal bank statements can look quite different from the origination file.",
    },
    {
      q: "What percentage of deposits going to MCA repayment is considered excessive?",
      a: "There is no universal answer — this depends on the lender's credit policy and the specific business's operating cost structure. However, a business committing more than 30–35% of gross deposits to fixed MCA-style debits is typically operating with very little free cash flow margin, and adding more debt service at that level is generally considered high risk.",
    },
    {
      q: "Does a business always know it's stacking if it takes multiple advances?",
      a: "Not always. Some stacking happens when a business genuinely believes it can manage multiple positions, and the intent to default comes later as conditions deteriorate. Other stacking is premeditated from the start. Underwriting reviews typically cannot determine intent — they evaluate the cash flow impact and risk signals regardless.",
    },
  ],
};
