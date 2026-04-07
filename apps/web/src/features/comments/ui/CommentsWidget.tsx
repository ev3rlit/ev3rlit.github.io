"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { GISCUS_CONFIG, isGiscusConfigured } from "@/shared/config/giscus";

export function CommentsWidget() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Determine giscus theme
    const giscusTheme = mounted && (resolvedTheme || theme) === "dark"
        ? "transparent_dark"
        : "light";

    return (
        <section className="border-t border-stone-200 pt-12 dark:border-stone-800">
            <p className="mb-7 text-[11px] font-bold uppercase tracking-[0.12em] text-stone-400 dark:text-stone-500">
                Comments
            </p>

            {isGiscusConfigured ? (
                <Giscus
                    id="comments"
                    repo={GISCUS_CONFIG.repo}
                    repoId={GISCUS_CONFIG.repoId}
                    category={GISCUS_CONFIG.category}
                    categoryId={GISCUS_CONFIG.categoryId}
                    mapping="pathname"
                    term="Welcome to @giscus/react component!"
                    reactionsEnabled={GISCUS_CONFIG.reactionsEnabled}
                    emitMetadata={GISCUS_CONFIG.emitMetadata}
                    inputPosition={GISCUS_CONFIG.inputPosition}
                    theme={giscusTheme}
                    lang={GISCUS_CONFIG.lang}
                    loading={GISCUS_CONFIG.loading}
                />
            ) : (
                <div className="rounded-[10px] bg-indigo-50 px-6 py-5 text-[15px] leading-[1.7] text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    Comments are not configured yet.
                </div>
            )}
        </section>
    );
}
