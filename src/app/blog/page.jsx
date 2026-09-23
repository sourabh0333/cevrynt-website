import { posts, categories, categoryMeta } from "@/content/blog";
import { HeroMotion } from "@/components/hero-motion";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import { PageHeroCopy } from "@/components/page-hero-copy";
import { RevealLines } from "@/components/home/reveal-lines";
import { FounderClose } from "@/components/home/founder-close";
import { LatestDesk } from "@/components/blog/latest-desk";
import { PublishingCalendar } from "@/components/blog/publishing-calendar";
import { ArticleAnatomy } from "@/components/blog/article-anatomy";
import { TopicDesks } from "@/components/blog/topic-desks";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/config/site";
import { productViews, productViewOf } from "@/content/product-views";

export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";
const founderEmail = "arin@cevrynt.com";

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

/* --------------------------------------------------------------------------
   The blog index, same architecture as the product pages: the shared dark
   hero, then the band-light / band-deep sequence. Everything below is derived
   from the articles themselves — order, dates, months, topics, reading time
   and the lead's picture — so publishing a new article updates the page with
   nothing to edit here.

   01 sets the newest article as a lead story beside a dated rail of the six
      before it.
   02 lays every article on a calendar of the day it was published, one strip
      per month, with that month's full list beneath it.
   03 draws every article as a bar of its sections, measured from its text,
      with the one section about Cevrynt in amber — always one, always last.
   04 gives each topic a desk: a brief, its articles, its product page, and a
      product view only where one genuinely matches the topic.
   -------------------------------------------------------------------------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/* Dates are read from the "YYYY-MM-DD" string, never through a timezone. */
function ymd(date) {
  const [y, m, d] = date.split("-").map(Number);
  return { y, m, d };
}

/* Product views come from the shared map, so the blog and the articles agree. */
const productOf = productViewOf;

/* 01 — the lead and the rail ------------------------------------------------ */

const [newest, ...older] = posts;
const leadDate = ymd(newest.publishedAt);
const leadProduct = productOf(newest);

const lead = {
  slug: newest.slug,
  title: newest.title,
  excerpt: newest.excerpt,
  category: newest.category,
  minutes: newest.readingTime,
  date: `${MONTHS[leadDate.m - 1]} ${leadDate.d}, ${leadDate.y}`,
  image: leadProduct ? leadProduct.image : null,
  product: leadProduct ? { label: leadProduct.label, href: leadProduct.href } : null,
};

const recent = older.slice(0, 6).map((p) => {
  const { m, d } = ymd(p.publishedAt);
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    minutes: p.readingTime,
    dateShort: `${MONTHS[m - 1]} ${String(d).padStart(2, "0")}`,
  };
});

const totals = {
  all: posts.length,
  categories: categories.length,
  minutes: posts.reduce((n, p) => n + p.readingTime, 0),
  // The blog has no gate: every article is public, with no form in front of it.
  gated: 0,
};

const deskReadout = {
  figures: [
    { of: "all", k: "Articles published" },
    { of: "categories", k: "Topics they cover" },
    { of: "minutes", k: "Minutes of reading in all" },
    { of: "gated", k: "Behind a sign-up form", tone: "none" },
  ],
  leadK: "Newest",
  recentK: "Before that",
  captionK: "Illustrative product view · synthetic data",
  minK: "min",
  readK: "Read the article",
  productK: "In the product:",
  moreK: "Every article, by date",
  saidK: "Why the newest article leads on its own",
  saidB: [
    "A blog index that opens on a grid of equal cards asks the reader to do the sorting. This one opens the way a front page does: the newest article, set large in its own words, and the six before it on a dated rail so it is clear what is recent and what came before.",
    "The picture beside the lead is the product view for the part of Cevrynt the article relates to, chosen from the article's own links rather than by hand — so the page stays right when a newer article takes the lead.",
  ],
};

const deskAside = {
  title: "How the front page is set",
  items: [
    { k: "The lead", v: "The newest article" },
    { k: "The rail", v: "The six before it" },
    { k: "The picture", v: "Its related product" },
    { k: "Updated", v: "On publish" },
  ],
  note: "Articles are general perspectives on underwriting practice for lending teams. They are not legal, compliance or credit advice, and product views are illustrative, on synthetic data.",
};

const deskClose =
  "One lead, six before it, and nothing typed by hand: publish a new article and it takes the lead, with the picture that matches it.";

const deskNote =
  "Dates, topics and reading times come from each article. Reading times are the estimates shown on the articles themselves.";

/* 02 — the publishing calendar ---------------------------------------------- */

const monthMap = new Map();
posts.forEach((p) => {
  const { y, m, d } = ymd(p.publishedAt);
  const key = `${y}-${String(m).padStart(2, "0")}`;
  if (!monthMap.has(key)) {
    monthMap.set(key, {
      key,
      label: `${MONTHS_LONG[m - 1]} ${y}`,
      days: new Date(Date.UTC(y, m, 0)).getUTCDate(),
      posts: [],
    });
  }
  monthMap
    .get(key)
    .posts.push({ slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, minutes: p.readingTime, day: d });
});
const calendarMonths = [...monthMap.values()];

const dayNumber = (date) => {
  const { y, m, d } = ymd(date);
  return Date.UTC(y, m - 1, d) / 86400000;
};
const span = dayNumber(posts[0].publishedAt) - dayNumber(posts[posts.length - 1].publishedAt);
const cadence = posts.length > 1 ? (span / (posts.length - 1)).toFixed(1) : "0";

const calendarReadout = {
  figures: [
    { of: "all", k: "Articles" },
    { of: "months", k: "Months of publishing" },
    { of: "cadence", k: "Days between articles, on average" },
    { of: "showing", k: "Showing now" },
  ],
  searchK: "Search every article",
  placeholder: "Try stacking, KYB, overrides or NSF",
  clearK: "Clear",
  topicsK: "Filter by topic",
  allK: "All topics",
  oneK: "article",
  manyK: "articles",
  minK: "min",
  noneK: "Nothing matches this month.",
  saidK: "Why the archive is a calendar",
  saidB: [
    "A grid of identical cards hides the one thing an archive can show at a glance: how the writing has actually been published. Laid on a calendar, each month's marks show the rhythm — and choosing a topic shows when that subject was covered, not just that it was.",
    "Nothing is hidden by the design. Every article is listed under its month, newest first, with its topic and reading time, and every title is a link.",
  ],
};

const calendarAside = {
  title: "Reading the calendar",
  items: [
    { k: "A mark", v: "One article, on its day" },
    { k: "A strip", v: "One month" },
    { k: "A topic", v: "Lights its marks" },
    { k: "Every title", v: "A link" },
  ],
  note: "For a guided start rather than a date order, the resources page shelves these same articles by workflow stage and lays out reading routes by role.",
};

const calendarClose = `${posts.length} articles over ${calendarMonths.length} months, one every ${cadence} days on average — each on the day it was published, and each a click away.`;

const calendarNote = "Dates are each article's publication date. Topics are the categories the articles are filed under.";

/* 03 — the anatomy of every article ----------------------------------------- */

/* Every string in a block counts toward its section's length, whatever the
   block type (paragraphs, lists, callouts, workflows). */
function wordsIn(value, key) {
  if (key === "type" || key === "id") return 0;
  if (typeof value === "string") return value.split(/\s+/).filter(Boolean).length;
  if (Array.isArray(value)) return value.reduce((n, v) => n + wordsIn(v), 0);
  if (value && typeof value === "object") return Object.entries(value).reduce((n, [k, v]) => n + wordsIn(v, k), 0);
  return 0;
}

const shortName = (title) => title.split(/[:?(]/)[0].trim();

const anatomy = posts.map((p) => {
  const sections = [];
  let cur = { id: "introduction", title: "Introduction", words: 0 };
  p.body.forEach((b) => {
    if (b.type === "h2") {
      sections.push(cur);
      cur = { id: b.id, title: b.text, words: 0 };
    } else {
      cur.words += wordsIn(b);
    }
  });
  sections.push(cur);
  const total = sections.reduce((n, s) => n + s.words, 0) || 1;
  const cevryntAt = sections.findIndex((s) => /cevrynt/i.test(s.title));
  const cevrynt = sections[cevryntAt] || null;
  return {
    slug: p.slug,
    title: p.title,
    short: shortName(p.title),
    sections: sections.map((s, i) => ({ id: s.id, share: s.words / total, cevrynt: i === cevryntAt })),
    cevryntId: cevrynt ? cevrynt.id : "",
    cevryntTitle: cevrynt ? cevrynt.title : "",
    cevryntShare: cevrynt ? Math.round((100 * cevrynt.words) / total) : 0,
    cevryntLast: cevryntAt === sections.length - 1 && sections.filter((s) => /cevrynt/i.test(s.title)).length === 1,
  };
});

const anatomyReadout = {
  figures: [
    { of: "all", k: "Articles" },
    { of: "last", k: "End with one Cevrynt section" },
    { of: "avg", k: "Of an article, on average", unit: "%" },
    { of: "before", k: "Where Cevrynt comes earlier", tone: "none" },
  ],
  articleK: "Article",
  startK: "First section",
  endK: "Last section",
  shareK: "Cevrynt",
  legendGuideK: "A section of general guidance",
  legendCevryntK: "The section about Cevrynt",
  sectionsK: "sections",
  cevryntIsK: "Cevrynt section:",
  lastK: "Last section:",
  restK: "Every bar is one article, start to finish",
  restB:
    "Each article is divided into its sections by length. Point at one to see its Cevrynt section by name; choose it to jump straight to that section in the article.",
  saidK: "Why the blog shows how much of it is a pitch",
  saidB: [
    "The fair question to ask of any vendor's blog is how much of it is selling. So the answer is drawn for every article at once: each bar is one article split into its sections, and the one section about Cevrynt is drawn in amber.",
    "In every article it is a single section, it is always the last, and on average it runs to under a tenth of the whole. Everything before it is general guidance that stands on its own whether or not you ever speak to us — which is why the amber lines up in one narrow column at the right-hand edge.",
  ],
};

const anatomyAside = {
  title: "How the bars are measured",
  items: [
    { k: "A segment", v: "One section" },
    { k: "Its width", v: "Its share of the words" },
    { k: "Amber", v: "The Cevrynt section" },
    { k: "Measured", v: "From the article" },
  ],
  note: "Section lengths are counted from each article's own text, including lists and callouts. Frequently asked questions and related links after the article are not included.",
};

const anatomyClose = `${anatomy.length} articles, one Cevrynt section each, always last. The guidance comes first and stands on its own.`;

const anatomyNote =
  "Counted from the published text of each article. Articles are general perspectives on underwriting practice, not legal, compliance or credit advice.";

/* 04 — one desk per topic ---------------------------------------------------- */

/* Briefs describe what a topic covers; `product` is where it becomes product;
   `view` names a product view only where one genuinely matches the topic. */
const deskSpecs = {
  "Underwriting Workflow": { brief: "How the stages of a review connect, and where speed is actually lost between them.", product: "platform", label: "The platform" },
  "Document Intelligence": { brief: "Turning messy borrower files into structured data an underwriter can check against the page.", product: "product/document-intelligence", label: "Document Intelligence" },
  "Financial Analysis": { brief: "Reading bank statements for what cash flow, balances and obligations actually say.", product: "product/bank-statement-analysis", label: "Bank Statement Analysis" },
  "Business Verification": { brief: "Confirming the business and the people behind it are who the application says.", product: "product/business-verification", label: "Business Verification" },
  "Fraud Prevention": { brief: "The patterns worth a second look — stacking, bust-outs, altered documents, synthetic identities.", product: "product/fraud-signals", label: "Fraud Signals", view: "product/fraud-signals" },
  "Policy & Decisioning": { brief: "Applying a lender's own criteria consistently, and documenting the exceptions honestly.", product: "product/policy-engine", label: "Policy Engine", view: "product/policy-engine" },
  "Reporting & Compliance": { brief: "Decisions that can be reconstructed later, with the evidence and the reasoning attached.", product: "product/underwriting-report", label: "Underwriting Report", view: "product/underwriting-report" },
  Solutions: { brief: "Underwriting for specific lenders and sellers — MCA, revenue-based financing, brokers, e-commerce.", product: null },
};

const topicDesks = categories.map((c) => {
  const spec = deskSpecs[c] || { brief: "", product: null };
  const view = spec.view ? productViews[spec.view] : null;
  return {
    k: c,
    brief: spec.brief,
    plate: categoryMetaLabel(c),
    image: view ? { ...view.image, wide: view.image.w / view.image.h > 2 } : null,
    product: spec.product ? { label: spec.label, href: `/${spec.product}` } : null,
    articles: posts
      .filter((p) => p.category === c)
      .map((p) => {
        const { y, m, d } = ymd(p.publishedAt);
        return { slug: p.slug, title: p.title, minutes: p.readingTime, date: `${MONTHS[m - 1]} ${d}, ${y}` };
      }),
  };
});

function numberWord(n) {
  const w = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"][n];
  return w || String(n);
}

function categoryMetaLabel(c) {
  return (categoryMeta[c] && categoryMeta[c].shortLabel) || c;
}

/* Open on the first topic that has a matching product view. */
const firstDesk = Math.max(0, topicDesks.findIndex((d) => d.image));

const desksReadout = {
  figures: [
    { of: "topics", k: "Topics" },
    { of: "views", k: "With a matching product view" },
    { of: "all", k: "Articles filed under them" },
  ],
  topicsK: "Topics",
  deskK: "The desk",
  articlesK: "articles",
  captionK: "Illustrative product view · synthetic data",
  minK: "min",
  productK: "Where this becomes product:",
  saidK: "Why some desks have a picture and some do not",
  saidB: [
    "A topic page is where a blog is usually read the old way: pick a subject, see everything written about it. Each desk here gives the subject in a line, every article filed under it, and the page on this site where the topic turns into product.",
    `${numberWord(topicDesks.filter((d) => d.image).length)} topics have an illustrative product view that genuinely shows what they are about. The others get a typeset plate instead of a borrowed picture — an image that did not match its topic, or contradicted the rest of the site, would be decoration pretending to be evidence.`,
  ],
};

const desksAside = {
  title: "What a desk holds",
  items: [
    { k: "The brief", v: "What the topic covers" },
    { k: "The articles", v: "Newest first" },
    { k: "The picture", v: "Only if it matches" },
    { k: "The link", v: "Where it becomes product" },
  ],
  note: "Solutions articles are written for particular kinds of lender or seller, so their desk has no single product page; each article links to the ones it relates to.",
};

const desksClose = "Eight topics, each with its own desk, and a picture only where the picture is true to the topic.";

const desksNote =
  "Product views are illustrative, on synthetic data. Topics are the categories the articles are filed under.";

export default function BlogIndexPage() {
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

      {/* The same hero composition as the product, solution, partner and FAQ pages. */}
      <HeroMotion>
        <div className="page-hero-dark-inner">
          <PageHeroCopy
            heading="Underwriting insights for alternative lenders"
            lede="Practical guides on documents, bank statements, verification, fraud and policy for lending teams."
          />
          <div className="hero-actions">
            <RainbowCta href={calendlyUrl} label="Book a walkthrough" />
          </div>
        </div>
      </HeroMotion>

      {/* 01 — the newest article, and the six before it */}
      <section className="bg-desk band-light" aria-labelledby="desk-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">01</span>
          <div className="eg-head">
            <p className="hx-kicker">Newest first</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="desk-heading"
              text="The newest article leads. The six before it run down the rail beside it."
            />
          </div>
          <p className="eg-lede t-lede">
            Set the way a front page is: one lead in its own words, with the product view that matches it, and what
            came before it in date order.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <LatestDesk
              lead={lead}
              recent={recent}
              totals={totals}
              readout={deskReadout}
              aside={deskAside}
              close={deskClose}
              note={deskNote}
            />
          </div>
        </div>
      </section>

      {/* 02 — every article, on the day it was published */}
      <section className="bg-calendar band-deep" aria-labelledby="calendar-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">02</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">The archive</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="calendar-heading"
              text="Every article, on the day it was published, with each month's list beneath it."
            />
          </div>
          <p className="eg-lede t-lede">
            One strip per month and one mark per article. Search, or choose a topic, to see when it was covered;
            every title below is a link.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <PublishingCalendar
              months={calendarMonths}
              categories={categories}
              cadence={cadence}
              readout={calendarReadout}
              aside={calendarAside}
              close={calendarClose}
              note={calendarNote}
            />
          </div>
        </div>
      </section>

      {/* 03 — how much of each article is about Cevrynt, and where */}
      <section className="bg-anatomy band-light" aria-labelledby="anatomy-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">03</span>
          <div className="eg-head">
            <p className="hx-kicker">Where the article ends and the product begins</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="anatomy-heading"
              text="Every article, section by section. The one about Cevrynt is short, and always last."
            />
          </div>
          <p className="eg-lede t-lede">
            Each bar is an article divided into its sections by length, with the Cevrynt section in amber — so how
            much of this blog is a pitch is visible at a glance.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <ArticleAnatomy
              articles={anatomy}
              readout={anatomyReadout}
              aside={anatomyAside}
              close={anatomyClose}
              note={anatomyNote}
            />
          </div>
        </div>
      </section>

      {/* 04 — a desk for each topic */}
      <section className="bg-desks band-deep" aria-labelledby="desks-heading">
        <div className="eg sec-head">
          <span className="eg-rail hx-mono">04</span>
          <div className="eg-head">
            <p className="hx-kicker hx-kicker-invert">By topic</p>
            <RevealLines
              as="h2"
              className="t-display-2"
              id="desks-heading"
              text="Eight topics, each with its own desk: the brief, the articles, and where it becomes product."
            />
          </div>
          <p className="eg-lede t-lede">
            Choose a topic to see everything filed under it, with the product view that matches it where one does.
          </p>
        </div>

        <div className="eg">
          <div className="eg-full">
            <TopicDesks
              desks={topicDesks}
              initial={firstDesk}
              readout={desksReadout}
              aside={desksAside}
              close={desksClose}
              note={desksNote}
            />
          </div>
        </div>
      </section>

      <section className="fn band-white" aria-labelledby="cta-heading">
        <div className="fn-glow" aria-hidden="true" />
        <FounderClose
          index="05"
          kicker="Founder-led"
          heading="See what these articles look like on your own files."
          lede="If an article describes a problem your team knows well, a walkthrough shows how Cevrynt handles it — against your criteria, with your underwriters making every decision."
          calendlyUrl={calendlyUrl}
          email={founderEmail}
        />
      </section>
    </main>
  );
}
