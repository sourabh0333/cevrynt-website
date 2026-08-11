import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { TimedDemoPopup } from "@/components/timed-demo-popup";
import { DevelopmentCacheReset } from "@/components/development-cache-reset";
import { DevelopmentHardRefreshButton } from "@/components/development-hard-refresh-button";
import "./globals.css";

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
        {process.env.NODE_ENV === "development" ? <DevelopmentCacheReset /> : null}
        {process.env.NODE_ENV === "development" ? <DevelopmentHardRefreshButton /> : null}
        <SiteHeader />
        {children}
        <SiteFooter />
        <TimedDemoPopup />
      </body>
    </html>
  );
}
