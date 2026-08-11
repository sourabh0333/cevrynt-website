import Link from "next/link";
import { posts, categories } from "@/content/blog";
import { BlogThumb, BlogSideCard, BlogTags } from "@/components/blog-card";
import { BlogExplorer } from "@/components/blog-explorer";
import { JsonLd } from "@/components/json-ld";
import { ArrowRight } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

export const metadata = {
  title: "Underwriting Insights for Alternative Lenders",
  description:
    "Practical guides on document intelligence, bank statement analysis, business verification, fraud signals, and policy for alternative lending underwriting teams.",
  keywords: ["AI underwriting insights", "alternative lending blog", "MCA underwriting guides"],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Underwriting Insights for Alternative Lenders | Cevrynt",
    description:
      "Practical guides on document intelligence, bank statement analysis, business verification, fraud signals, and policy for alternative lending underwriting teams.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const [featured, ...restPosts] = posts;
  const sideList = restPosts.slice(0, 3);
  const gridPosts = restPosts.slice(3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${siteConfig.url}/blog` },
    ],
  };

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd} />

      <section className="blog-page-intro section-shell">
        <p className="eyebrow">Resources</p>
        <h1>Underwriting insights for alternative lenders</h1>
        <p className="page-lede">
          Practical guides on document review, bank statement analysis, business verification, fraud signals, and
          policy evaluation for MCA funders, alternative lenders, brokers, and SMB finance teams.
        </p>

        {featured ? (
          <div className="blog-featured">
            <Link href={`/blog/${featured.slug}`} className="blog-featured-main">
              <BlogThumb category={featured.category} fold />
              <BlogTags category={featured.category} date={featured.publishedAt} readingTime={featured.readingTime} />
              <div className="blog-featured-row">
                <h2>{featured.title}</h2>
                <span className="blog-featured-link">
                  Read article <ArrowRight />
                </span>
              </div>
            </Link>

            {sideList.length ? (
              <div className="blog-featured-side">
                {sideList.map((post) => (
                  <BlogSideCard post={post} key={post.slug} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="blog-explore section-shell">
        <div className="blog-explore-heading">
          <p className="section-kicker">Explore more articles</p>
          <h2>Every stage of the underwriting workflow, explained</h2>
        </div>
        <BlogExplorer posts={gridPosts.length ? gridPosts : restPosts} categories={categories} />
      </section>

      <section className="blog-cta-band">
        <div className="section-shell">
          <h2>See how Cevrynt fits your underwriting process.</h2>
          <a className="cta-light" href="https://calendly.com/arin-cevrynt/cevrynt-demo" target="_blank" rel="noreferrer">
            Book a walkthrough <span><ArrowRight /></span>
          </a>
        </div>
      </section>
    </main>
  );
}
