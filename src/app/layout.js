import { Geist } from "next/font/google";
import "./globals.css";
import "./refinement.css";
import "./art-direction.css";
import { SiteFooter } from "@/components/ui/site-shell";
import SiteNavigation from "@/components/navigation/site-navigation";
import MotionProvider from "@/components/motion/motion-provider";
import { siteUrl } from "@/content/site-config";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Cevrynt | Underwriting decision intelligence", template: "%s | Cevrynt" },
  description: "Cevrynt turns financial documents, business data, and lender policy into evidence-backed underwriting intelligence.",
  alternates: { canonical: "/" },
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return <html lang="en" className={`${geistSans.variable} h-full antialiased`}><body className="min-h-full"><a className="skip-link" href="#main-content">Skip to content</a><SiteNavigation /><MotionProvider />{children}<SiteFooter /></body></html>;
}
