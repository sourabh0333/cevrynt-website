import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { TimedDemoPopup } from "@/components/timed-demo-popup";
import { DevelopmentCacheReset } from "@/components/development-cache-reset";
import { DevelopmentHardRefreshButton } from "@/components/development-hard-refresh-button";
import { SmoothScroll } from "@/components/smooth-scroll";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/cevrynt-logo-v2.png`,
  description: siteConfig.description,
  email: "sales@cevrynt.com",
  contactPoint: {
    "@type": "ContactPoint",
    email: "sales@cevrynt.com",
    contactType: "sales",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: { "@type": "Organization", name: siteConfig.name },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "AI underwriting platform",
    "merchant cash advance underwriting software",
    "alternative lending software",
    "bank statement analysis software",
    "underwriting decision intelligence",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/brand/cevrynt-favicon.svg", type: "image/svg+xml" },
      { url: "/brand/cevrynt-favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/brand/cevrynt-favicon-v3.ico", sizes: "any" },
    ],
    shortcut: "/brand/cevrynt-favicon-v3.ico",
    apple: "/brand/cevrynt-apple-icon-v3.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {process.env.NODE_ENV === "development" ? <DevelopmentCacheReset /> : null}
        {process.env.NODE_ENV === "development" ? <DevelopmentHardRefreshButton /> : null}
        <SmoothScroll />
        <SiteHeader />
        {children}
        <SiteFooter />
        <TimedDemoPopup />
      </body>
    </html>
  );
}
