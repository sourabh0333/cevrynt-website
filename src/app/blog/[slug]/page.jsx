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
import { ArticleContents } from "@/components/article/contents";
import { ReadProgress } from "@/components/article/read-progress";
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
   The article page: the read carries on in the dark, straight out of the hero,
   instead of dropping onto a white page.

     outer rail  the gauge — how far through the article, which chapter, drawn
                 as a lit line with a tick for every chapter
     centre      the text: a raised initial in brand yellow, a contents with
                 leaders, then chapters that open against an outsized outlined
                 numeral standing in the margin
     right       the suggestions, in view while reading rather than at the end

   The motion is deliberate and cheap. The gauge is one passive scroll listener
   coalesced into a frame, writing one custom property; the contents and the
   suggestions play a single staggered entrance the first time they are
   reached; chapter numerals and figures lift on arrival through the browser's
   own scroll timeline where it exists. Everything animates transform and
   opacity only, every piece renders finished on the server, and reduced motion
   turns all of it off.
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

/* Where each chapter opens as a share of the whole article, which is where its
   tick sits on the gauge. */
function openingShares(sections) {
  let run = 0;
  return sections.map((s) => {
    const at = run;
    run += s.share;
    return at;
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

  /* The contents: every chapter that has words, against the minute it opens
     on. The opening has no heading of its own, so it is left out of the list. */
  const h2Ids = anatomy.sections.filter((s) => s.id).map((s) => s.id);
  const pages = startMinutes(anatomy.sections);
  const openings = openingShares(anatomy.sections);
  const contentsItems = anatomy.sections
    .map((s, i) => ({ ...s, page: pages[i], at: openings[i] }))
    .filter((s) => s.words > 0 && s.id)
    .map((s) => ({
      id: s.id,
      title: s.title,
      number: String(h2Ids.indexOf(s.id) + 1).padStart(2, "0"),
      page: String(s.page),
      at: Number(s.at.toFixed(4)),
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

      {/* The article: the gauge, the text column, the suggestions. */}
      <article className="ar-read band-deep" id="article-start" aria-label={post.title}>
        <div className="ar-read-glow" aria-hidden="true" />
        <div className="eg ar-read-shell">
          <div className="ar-read-rail">
            <div className="ar-read-stick">
              <ReadProgress targetId="article-start" chapters={contentsItems} />
            </div>
          </div>
          <div className="ar-read-body">
            <ArticleRenderer
              blocks={post.body}
              boundary={boundary}
              numbered
              contents={
                contentsItems.length > 2 ? (
                  <ArticleContents
                    items={contentsItems}
                    faqLabel={post.faqs?.length ? "Questions" : null}
                    label="Contents"
                  />
                ) : null
              }
            />
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
