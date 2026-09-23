/* --------------------------------------------------------------------------
   Illustrative product views, keyed by the product page they belong to.

   One source for every page that shows "the part of Cevrynt this is about":
   the blog's lead story and topic desks, and each article's product section.
   A page is only given a view when the picture genuinely shows that part of
   the product AND agrees with the canonical illustrative file.

   Deliberately absent:
   - product/business-verification — the only available view names the
     illustrative file with bank account ····7123, contradicting the canonical
     operating account ··2208 used everywhere else.
   - product/document-intelligence — the available view dates its statement
     "August", after the file's 19 Aug application and outside its Feb–Jul
     statements.
   -------------------------------------------------------------------------- */

export const productViews = {
  "product/bank-statement-analysis": {
    label: "Bank Statement Analysis",
    image: {
      src: "/media/placeholder/outcame1.png",
      w: 1600,
      h: 650,
      alt: "Illustrative product view: a bank statement pack read once into a reusable cash-flow view, with deposits, balance health, debt rhythm and exceptions each linked to the source.",
    },
  },
  "product/policy-engine": {
    label: "Policy Engine",
    image: {
      src: "/media/placeholder/policy-led.png",
      w: 760,
      h: 520,
      alt: "Illustrative policy view: a borrower plotted against the lender's own thresholds, with one item needing judgment.",
    },
  },
  "product/fraud-signals": {
    label: "Fraud Signals",
    image: {
      src: "/media/placeholder/Exception-aware.png",
      w: 760,
      h: 520,
      alt: "Illustrative exception view: a verification mismatch and an out-of-policy reading kept visible until a reviewer resolves them.",
    },
  },
  "product/underwriting-report": {
    label: "Underwriting Report",
    image: {
      src: "/media/placeholder/Human-owned.png",
      w: 760,
      h: 520,
      alt: "Illustrative reviewer view: findings prepared for the call, a named decision owner, and the recorded outcome and override reason.",
    },
  },
};

/* The first of a post's related product pages that has a view, or null. */
export function productViewOf(post) {
  const path = (post.relatedProductPaths || []).find((p) => productViews[p]);
  return path ? { ...productViews[path], href: `/${path}` } : null;
}
