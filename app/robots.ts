import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { localizedPath } from "@/lib/meta";
import { siteMeta } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/studio",
        "/lab",
        ...locales.map((l) => localizedPath("/success", l)),
      ],
    },
    sitemap: `${siteMeta.url}/sitemap.xml`,
  };
}
