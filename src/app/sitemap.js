import { siteConfig } from "@/config/site";
import { sitePages } from "@/content/site-pages";

export default function sitemap() {
  const routes = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const page of sitePages) {
    if (page.legal) continue;
    routes.push({
      url: `${siteConfig.url}/${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.article ? "monthly" : "weekly",
      priority: page.group === "Product" || page.group === "Solutions" ? 0.8 : 0.7,
    });
  }

  return routes;
}
