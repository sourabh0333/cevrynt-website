import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import { HeaderBehavior } from "@/components/header-behavior";
import { DesktopNavigation } from "@/components/desktop-navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <HeaderBehavior />
      <div className="header-shell">
        <Link className="brand-link" href="/" aria-label="Cevrynt home">
          <Image
            className="brand-wordmark"
            src="/brand/cevrynt-logo-v2.png"
            alt="Cevrynt"
            width={1029}
            height={366}
            priority
            loading="eager"
            sizes="124px"
          />
        </Link>
        <DesktopNavigation />
        <div className="header-actions">
          <a className="signin-link" href={siteConfig.appUrl}>Sign In</a>
          <a className="header-cta" href="https://calendly.com/arin-cevrynt/cevrynt-demo" target="_blank" rel="noreferrer">
            <span className="cta-swap cta-swap-base">Get Demo <ArrowUpRight /></span>
            <span className="cta-swap cta-swap-hover" aria-hidden="true">Get Demo <ArrowUpRight /></span>
          </a>
        </div>
        <MobileNavigation />
      </div>
    </header>
  );
}
