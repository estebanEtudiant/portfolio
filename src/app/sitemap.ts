import type { MetadataRoute } from "next";
import { articles } from "@/content/blog";
import { projects } from "@/content/projects";
import { siteUrl } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, "");
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({ url: `${base}/projets/${p.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...(articles.length ? [{ url: `${base}/blog/`, changeFrequency: "monthly" as const, priority: 0.6 }] : []),
    ...articles.map((a) => ({ url: `${base}/blog/${a.slug}/`, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
