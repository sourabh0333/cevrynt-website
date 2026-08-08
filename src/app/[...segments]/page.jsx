import { notFound } from "next/navigation";
import { FoundationPage } from "@/components/ui/site-shell";
import { getRouteDefinition, siteUrl } from "@/content/site-config";

export async function generateMetadata({ params }) {
  const { segments } = await params;
  const path = `/${segments.join("/")}`;
  const route = getRouteDefinition(path);
  if (!route) return {};
  return { title: route.title, description: route.description, alternates: { canonical: path }, robots: route.robots, metadataBase: new URL(siteUrl) };
}

export default async function SupportingRoute({ params }) {
  const { segments } = await params;
  const route = getRouteDefinition(`/${segments.join("/")}`);
  if (!route) notFound();
  return <FoundationPage route={route} />;
}
