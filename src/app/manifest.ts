import type { MetadataRoute } from "next";

import { company, seo } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.name} — ${company.segment}`,
    short_name: company.name,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "pt-BR",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
