import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, getAllSlugs } from "@/content/blog";
import { anatomyOf } from "@/content/article-anatomy";
import { productViewOf } from "@/content/product-views";
import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { FounderClose } from "@/components/home/founder-close";
import { ArticleRenderer } from "@/components/article-renderer";
import { ArticleFaq } from "@/components/article-faq";
import { ArticleIndex } from "@/components/article/article-index";
import { ReadNext } from "@/components/article/read-next";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;
export const dynamicParams = false;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

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

/* --------------------------------------------------------------------------
   The article page. The read carries on in the same green the hero is painted
   in, so the two are one field rather than two sections.

     left    the index, held in view for the whole read: every chapter at its
             real length, a lit dot travelling the spine as the article is
             read, and each chapter lighting up as the dot passes it
     centre  the text, opening on a raised initial, its chapters announced by
             an outsized outlined numeral
     right   read next, the label set on its side against a rule

   The motion is deliberate and cheap: one passive scroll listener coalesced
   into a frame for the dot, one staggered entrance each for the index and the
   suggestions, and arrival lifts drawn by the browser's own scroll timeline
   where it exists. Everything animates transform and opacity only, every piece
   renders finished on the server, and reduced motion turns all of it off.
   -------------------------------------------------------------------------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* Read "YYYY-MM-DD" directly, never through a timezone. */
function formatDay(date) {
  const [y, m, d] = date.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/* Chapters are mostly shorter than a minute each, so their own length says
   nothing useful. The contents carries page numbers instead: the minute of the
   read each chapter opens on, counted at the same rate as the article's own
   reading time. */
function startMinutes(sections) {
  let run = 0;
  return sections.map((s) => {
    const page = Math.floor(run) + 1;
    run += s.minutes;
    return page;
  });
}

const nextReadout = { headingK: "Read next", minK: "min", allK: "Every article" };

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const anatomy = anatomyOf(post);
  const view = productViewOf(post);
  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;
  const ogImageUrl = `${siteConfig.url}/blog/${post.slug}/opengraph-image`;

  /* The index: every chapter that has words, its share of the article, and
     the minute it opens on. The opening has no heading of its own, so it is
     left out of the list. */
  const h2Ids = anatomy.sections.filter((s) => s.id).map((s) => s.id);
  const pages = startMinutes(anatomy.sections);
  const indexItems = anatomy.sections
    .map((s, i) => ({ ...s, page: pages[i] }))
    .filter((s) => s.words > 0 && s.id)
    .map((s) => ({
      id: s.id,
      title: s.title,
      number: String(h2Ids.indexOf(s.id) + 1).padStart(2, "0"),
      page: String(s.page),
      share: Number(s.share.toFixed(4)),
      cevrynt: s.cevrynt,
    }));

  const nextItems = related.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    minutes: p.readingTime,
  }));

  const boundary = anatomy.cevrynt
    ? {
        id: anatomy.cevrynt.id,
        label: "From here, this article is about Cevrynt",
        figure: view
          ? {
              image: view.image,
              caption: `Illustrative view of ${view.label} · synthetic data`,
              link: { href: view.href, label: `See ${view.label}` },
            }
          : null,
      }
    : null;

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

      {/* The same hero composition as every other page, with the article's own
          title, summary and details. */}
      <HeroMotion>
        <div className="page-hero-dark-inner">
          <PageHeroCopy heading={post.title} lede={post.excerpt} />
          <p className="ar-hero-meta hx-mono">
            <Link className="ar-hero-back" href="/blog">
              Insights
            </Link>
            <span>{post.category}</span>
            <span>{formatDay(post.publishedAt)}</span>
            <span>{post.readingTime} min read</span>
          </p>
          <div className="hero-actions">
            <RainbowCta href={calendlyUrl} label="Book a walkthrough" />
          </div>
        </div>
      </HeroMotion>

      {/* The article: the index, the text column, read next. */}
      <article className="ar-read" id="article-start" aria-label={post.title}>
        <div className="eg ar-read-shell">
          <div className="ar-read-left">
            <div className="ar-read-stick">
              <ArticleIndex
                items={indexItems}
                faqLabel={post.faqs?.length ? "Questions" : null}
                label="Contents"
                targetId="article-start"
              />
            </div>
          </div>
          <div className="ar-read-body">
            <ArticleRenderer blocks={post.body} boundary={boundary} numbered />
            <ArticleFaq items={post.faqs} />
          </div>
          {nextItems.length ? (
            <div className="ar-read-right">
              <div className="ar-read-stick">
                <ReadNext items={nextItems} readout={nextReadout} />
              </div>
            </div>
          ) : null}
        </div>
      </article>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="→"
          kicker="Founder-led"
          heading="See how this works on your own files."
          lede="If this article describes something your team deals with, a walkthrough shows how Cevrynt handles it — against your criteria, with your underwriters making every decision."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
