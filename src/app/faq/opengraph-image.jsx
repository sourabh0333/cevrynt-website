import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Frequently Asked Questions — Cevrynt";

export default async function Image() {
  return renderOgImage({
    eyebrow: "FAQ",
    title: "Frequently asked questions about Cevrynt",
    subtitle: "What Cevrynt does, who it's for, and how lender control is preserved.",
  });
}
