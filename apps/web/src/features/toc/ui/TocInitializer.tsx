"use client";

import { useEffect } from 'react';
import { useTocStore, TocHeading } from '../model/useTocStore';
import { MobileTocDrawer } from './MobileTocDrawer';

export function TocInitializer() {
    const { setHeadings, setActiveId } = useTocStore();

    useEffect(() => {
        // 1. Extract Headings from DOM (Client-side)
        // Note: mdx-remote with rehype-slug will generate IDs on h1, h2, h3
        const headingElements = Array.from(document.querySelectorAll('article h1, article h2, article h3'));

        const extractedHeadings: TocHeading[] = headingElements.map((el) => ({
            id: el.id,
            text: (el as HTMLElement).innerText,
            level: Number(el.tagName.substring(1)),
        })).filter(h => h.id); // Valid ONLY if they have an ID

        setHeadings(extractedHeadings);

        // 2. Setup Intersection Observer for Scroll Spy
        const observerCallback: IntersectionObserverCallback = (entries) => {
            // Find the intersecting heading that is highest up in the viewport
            // or the one that just exited the top.
            // Simplified: Find the first visible heading.
            const visibleEntry = entries.find((entry) => entry.isIntersecting);

            if (visibleEntry) {
                setActiveId(visibleEntry.target.id);
            } else {
                // Check if we are below a heading (scrolled past it)
                // This logic can be tricky. A simpler standard approach:
                // "Highlight the last heading that is above the viewport center"
            }
        };

        const observerOptions = {
            rootMargin: '-10% 0px -80% 0px', // Trigger when heading is near top (10% from top)
            threshold: 0
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        headingElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [setHeadings, setActiveId]);

    // Renders the Mobile Drawer (Portal)
    return <MobileTocDrawer />;
}
