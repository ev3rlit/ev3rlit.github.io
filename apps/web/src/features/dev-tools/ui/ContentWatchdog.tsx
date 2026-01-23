"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function ContentWatchdog() {
    const router = useRouter();
    const lastMtimeRef = useRef<number>(0);

    useEffect(() => {
        // Only run in dev environment (client-side check strictly speaking needs env var, 
        // but usually we conditionally render this component from parent)

        const checkUpdates = async () => {
            try {
                const res = await fetch('/api/dev-hot-reload');
                if (!res.ok) return;
                const data = await res.json();
                const serverMtime = data.mtime;

                if (lastMtimeRef.current === 0) {
                    lastMtimeRef.current = serverMtime;
                } else if (serverMtime > lastMtimeRef.current) {
                    console.log("[ContentWatchdog] Content changed, refreshing...");
                    lastMtimeRef.current = serverMtime;
                    router.refresh();
                }
            } catch (error) {
                // Ignore polling errors
            }
        };

        const intervalId = setInterval(checkUpdates, 1500); // Check every 1.5s

        return () => clearInterval(intervalId);
    }, [router]);

    return null;
}
