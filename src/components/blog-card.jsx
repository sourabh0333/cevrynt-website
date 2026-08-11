import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { categoryMeta } from "@/content/blog";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatCardDate(dateString) {
  return new Date(dateString)
    .toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" })
    .replace(/\//g, ".");
}

export function BlogThumb({ category, fold = false }) {
  const meta = categoryMeta[category] || { shortLabel: category, thumbClass: "blog-thumb-a" };
  return (
    <div className={`blog-thumb ${meta.thumbClass}${fold ? " blog-thumb-fold" : ""}`} aria-hidden="true">
      <span className="blog-thumb-word">{meta.shortLabel}</span>
    </div>
  );
}


export function BlogTags({ category, date, readingTime }) {
  return (
    <div className="blog-tags">
      <span className="blog-tag">{category}</span>
      <span className="blog-tag blog-tag-date">{formatCardDate(date)}</span>
      {readingTime ? <span className="blog-tag-plain">{readingTime} min read</span> : null}
    </div>
  );
}

export function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <Link href={`/blog/${post.slug}`} className="blog-card-media" tabIndex={-1} aria-hidden="true">
        <BlogThumb category={post.category} />
      </Link>
      <div className="blog-card-body">
        <BlogTags category={post.category} date={post.publishedAt} readingTime={post.readingTime} />
        <h3>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <Link className="blog-card-link" href={`/blog/${post.slug}`}>
          Read more <ArrowRight />
        </Link>
      </div>
    </article>
  );
}

export function BlogSideCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-side-card">
      <BlogThumb category={post.category} />
      <div>
        <BlogTags category={post.category} date={post.publishedAt} />
        <h3>{post.title}</h3>
      </div>
    </Link>
  );
}

export { formatDate };
