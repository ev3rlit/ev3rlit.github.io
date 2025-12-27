import blogConfig from "./config.json";

export const PROFILE_CONFIG = {
    name: blogConfig.profile.name,
    nickname: blogConfig.profile.nickname,
    title: blogConfig.profile.title,
    email: blogConfig.profile.email,
    github: blogConfig.profile.github,
    location: blogConfig.profile.location,
    company: blogConfig.profile.company,
    phone: blogConfig.profile.phone,
} as const;
