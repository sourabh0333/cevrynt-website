import { indexableRoutes, siteUrl } from "@/content/site-config";

export default function sitemap() {
  return indexableRoutes.map((path) => ({ url: new URL(path, siteUrl).toString(), lastModified: new Date() }));
}
