import blogConfig from "./config.json";

export const SITE_CONFIG = {
    title: blogConfig.site.title,
    description: blogConfig.site.description,
    exclude: blogConfig.site.exclude || [],
} as const;
