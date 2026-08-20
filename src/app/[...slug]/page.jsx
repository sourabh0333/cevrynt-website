import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { pageByPath, sitePages } from "@/content/site-pages";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  // "platform" has its own bespoke route at src/app/platform/page.jsx, which
  // Next always matches first for that path — this only avoids the catch-all
  // pre-rendering an unreachable duplicate at build time.
  return sitePages
    .filter((page) => page.path !== "platform")
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
