import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Underwriting Insights for Alternative Lenders — Cevrynt";

export default async function Image() {
  return renderOgImage({
    eyebrow: "Cevrynt Insights",
    title: "Underwriting insights for alternative lenders",
    subtitle: "Guides on documents, financials, verification, fraud, and policy.",
  });
}
