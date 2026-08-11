import { siteConfig } from "@/config/site";
import { sitePages } from "@/content/site-pages";
import { posts } from "@/content/blog";

export const revalidate = 3600;

function section(title, items) {
  if (!items.length) return "";
  const lines = items.map((item) => `- [${item.title}](${siteConfig.url}/${item.path}): ${item.description}`);
  return `## ${title}\n\n${lines.join("\n")}\n`;
}

export async function GET() {
  const productPages = sitePages.filter((page) => page.group === "Product");
  const solutionPages = sitePages.filter((page) => page.group === "Solutions");
  const platformPages = sitePages.filter((page) => ["Platform", "Why Cevrynt", "Trust", "Pilot"].includes(page.group));
  const companyPages = sitePages.filter((page) => page.group === "Company");
  const partnerPages = sitePages.filter((page) => page.group === "Partner");

  const blogLines = posts
    .slice(0, 40)
    .map((post) => `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.excerpt}`);

  const body = `# Cevrynt

> ${siteConfig.description}

Cevrynt is AI-assisted underwriting infrastructure for alternative lenders — merchant cash advance funders, alternative lenders and revenue-based finance companies, brokers/ISOs, and e-commerce merchant underwriting. Cevrynt is not a lender, does not make or guarantee funding offers, and does not replace lender judgment. Lenders retain final approval authority in every case.

The underwriting workflow Cevrynt structures: Intake → Documents → Financials → Verification → Fraud → Policy → Report → Human Decision.

${section("Platform", platformPages)}
${section("Product", productPages)}
${section("Solutions", solutionPages)}
${section("Partners", partnerPages)}
${section("Company", companyPages)}
## Insights (selected)

${blogLines.join("\n")}

## Contact

- Qualified walkthrough: ${siteConfig.url}/pilot and https://calendly.com/arin-cevrynt/cevrynt-demo
- Founder-led sales: arin@cevrynt.com
- Sales enquiries: sales@cevrynt.com
- Full site map: ${siteConfig.url}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
