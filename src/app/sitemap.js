import { siteConfig } from "@/config/site";
import { sitePages } from "@/content/site-pages";
import { posts } from "@/content/blog";

export default function sitemap() {
  const routes = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: posts[0]?.publishedAt ? new Date(posts[0].publishedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  for (const page of sitePages) {
    if (page.legal) continue;
    routes.push({
      url: `${siteConfig.url}/${page.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: page.group === "Product" || page.group === "Solutions" ? 0.8 : 0.7,
    });
  }

  for (const post of posts) {
    routes.push({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  return routes;
}
