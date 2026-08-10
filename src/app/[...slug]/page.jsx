import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { pageByPath, sitePages } from "@/content/site-pages";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return sitePages.map((page) => ({ slug: page.path.split("/") }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const path = slug.join("/");
  const page = pageByPath.get(path);

  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.path}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/${page.path}`,
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
