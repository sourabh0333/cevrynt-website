import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Cevrynt — AI Underwriting Infrastructure for Alternative Lenders";

export default async function Image() {
  return renderOgImage({
    eyebrow: "AI Underwriting Infrastructure",
    title: "From borrower documents to decision-ready underwriting.",
    subtitle: "For alternative lenders and SMB finance teams.",
  });
}
