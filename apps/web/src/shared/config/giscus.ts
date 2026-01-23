import blogConfig from "./config.json";

export const GISCUS_CONFIG = {
    repo: blogConfig.giscus.repo as `${string}/${string}`,
    repoId: blogConfig.giscus.repoId,
    category: blogConfig.giscus.category,
    categoryId: blogConfig.giscus.categoryId,
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    lang: "en",
    loading: "lazy",
} as const;

export const isGiscusConfigured = GISCUS_CONFIG.repoId !== "R_kgDONn5R4w";
