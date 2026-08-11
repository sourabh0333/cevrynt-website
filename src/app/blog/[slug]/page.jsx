import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, getRelatedPosts, getAllSlugs } from "@/content/blog";
import { ArticleRenderer } from "@/components/article-renderer";
import { ArticleFaq } from "@/components/article-faq";
import { WorkflowDiagram } from "@/components/workflow-diagram";
import { ArticleToc } from "@/components/article-toc";
import { BlogCard, formatDate } from "@/components/blog-card";
import { WalkthroughBand } from "@/components/walkthrough-band";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ["Cevrynt"],
    },
    twitter: {
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const tocItems = post.body
    .filter((b) => b.type === "h2" && b.id && b.text)
    .map((b) => ({ id: b.id, text: b.text }));
  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;
  const ogImageUrl = `${siteConfig.url}/blog/${post.slug}/opengraph-image`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${siteConfig.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: articleUrl },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: [ogImageUrl],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: "Cevrynt", url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: "Cevrynt",
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/brand/cevrynt-logo-v2.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  const faqJsonLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}

      <header className="article-header">
        <div className="article-header-inner section-shell">
          <p className="article-category">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="article-meta-row">
            Published {formatDate(post.publishedAt)} · {post.readingTime} min read
          </p>
          <p className="article-lede">{post.excerpt}</p>
        </div>

        <div className="article-hero-media section-shell">
          {post.heroImage ? (
            <Image src={post.heroImage.src} alt={post.heroImage.alt} width={1600} height={1000} sizes="(max-width: 900px) 100vw, 900px" priority={false} />
          ) : (
            <WorkflowDiagram stage={post.workflowStage} caption={`Where this fits in the Cevrynt underwriting workflow: ${post.workflowStage || "connected review"}.`} />
          )}
        </div>
      </header>

      <section className="article-content-shell section-shell">
        <aside className="article-sidebar">
          {tocItems.length > 0 && <ArticleToc items={tocItems} />}
        </aside>
        <div>
          <ArticleRenderer blocks={post.body} />
          <ArticleFaq items={post.faqs} />
        </div>
      </section>

      {related.length ? (
        <section className="article-related section-shell">
          <h2>Related reading</h2>
          <div className="article-related-grid">
            {related.map((item) => (
              <BlogCard post={item} key={item.slug} />
            ))}
          </div>
        </section>
      ) : null}

      <WalkthroughBand />
    </main>
  );
}
