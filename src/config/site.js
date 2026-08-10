const fallbackUrl = "https://cevrynt.com";

export const siteConfig = {
  name: "Cevrynt",
  description:
    "From borrower documents to decision-ready underwriting for alternative lenders and SMB finance teams.",
  url: process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl,
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://app.cevrynt.com",
};
