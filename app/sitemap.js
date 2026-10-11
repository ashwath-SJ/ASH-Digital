export const dynamic = "force-dynamic";

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
