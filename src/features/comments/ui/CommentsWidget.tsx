"use client";

import Giscus from "@giscus/react";
import { Construction } from "lucide-react";
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
        <section className="relative overflow-hidden rounded-[2rem] bg-white/95 dark:bg-stone-900/95 p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] ring-1 ring-slate-200/60 dark:ring-white/10 backdrop-blur-md md:p-12">
            <h3 className="mb-8 text-2xl font-black tracking-tight text-slate-800 dark:text-stone-100">
                Comments
            </h3>

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
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500">
                        <Construction size={32} />
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-slate-700 dark:text-stone-200">
                        Comments are under construction
                    </h4>
                    <p className="max-w-md text-sm text-slate-500 dark:text-stone-400">
                        We are currently wiring up the comment system.
                        <br />
                        Please check back later to join the discussion!
                    </p>
                </div>
            )}
        </section>
    );
}
