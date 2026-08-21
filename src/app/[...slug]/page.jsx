import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { pageByPath, sitePages } from "@/content/site-pages";

export const revalidate = 3600;
export const dynamicParams = false;

/** Paths with their own bespoke route under src/app/. */
const bespoke = new Set(["platform", "why-cevrynt"]);

export function generateStaticParams() {
  // Next always matches a literal segment before this catch-all, so filtering
  // only avoids pre-rendering an unreachable duplicate at build time.
  return sitePages
    .filter((page) => !bespoke.has(page.path))
    .map((page) => ({ slug: page.path.split("/") }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const path = slug.join("/");
  const page = pageByPath.get(path);

  if (!page) return {};

  const title = page.metaTitle || page.title;
  const description = page.metaDescription || page.description;

  return {
    title,
    description,
    keywords: page.keywords,
    alternates: { canonical: `/${page.path}` },
    openGraph: {
      title,
      description,
      url: `/${page.path}`,
    },
    twitter: {
      title,
      description,
    },
    robots: page.legal ? { index: false, follow: true } : undefined,
  };
}

export default async function MarketingPage({ params }) {
  const { slug } = await params;
  const page = pageByPath.get(slug.join("/"));

  if (!page) notFound();

  return <PageShell page={page} />;
}
