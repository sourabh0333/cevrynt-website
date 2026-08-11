import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { workflow } from "@/content/site-pages";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/json-ld";
import { WalkthroughBand } from "@/components/walkthrough-band";

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

export function PageShell({ page }) {
  const ctaHref = page.ctaHref || calendlyUrl;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: page.group, item: `${siteConfig.url}/${page.path}` },
      { "@type": "ListItem", position: 3, name: page.title, item: `${siteConfig.url}/${page.path}` },
    ],
  };

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd} />
      <section className="page-hero">
        <div className="page-hero-inner">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{page.group}</span>
          </nav>
          <p className="eyebrow">{page.group}</p>
          <h1>{page.title}</h1>
          <p className="page-lede">{page.description}</p>
          {!page.legal && (
            <a className="primary-cta" href={ctaHref} target={ctaHref.startsWith("http") ? "_blank" : undefined} rel={ctaHref.startsWith("http") ? "noreferrer" : undefined}>
              {page.cta || "Book a walkthrough"}
              <span><ArrowUpRight /></span>
            </a>
          )}
        </div>
        <div className="page-hero-orb" aria-hidden="true" />
      </section>

      <section className="page-content section-shell">
        <div>
          <p className="section-kicker">What this page covers</p>
          <h2>Built for reviewable decisions</h2>
        </div>
        <div className="point-grid">
          {page.points.map((point, index) => (
            <article key={point}>
              <span>0{index + 1}</span>
              <h3>{point}</h3>
            </article>
          ))}
        </div>
        {page.notice && <p className="partner-notice">{page.notice}</p>}
      </section>

      {page.path === "partners/shopline" && (
        <section className="partner-band section-shell">
          <p className="section-kicker">Documented partnership</p>
          <div className="partner-logos">
            <Image src="/brand/cevrynt-logo-v2.png" alt="Cevrynt" width={1029} height={366} sizes="180px" />
            <span aria-hidden="true">×</span>
            <Image src="/brand/shopline-logo.png" alt="SHOPLINE" width={768} height={269} sizes="180px" />
          </div>
        </section>
      )}

      {!page.legal && (
        <section className="workflow-band">
          <div className="section-shell">
            <p className="section-kicker">Connected workflow</p>
            <h2>From intake to a human decision</h2>
            <ol className="workflow-list">
              {workflow.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
            </ol>
          </div>
        </section>
      )}

      <WalkthroughBand />
    </main>
  );
}
