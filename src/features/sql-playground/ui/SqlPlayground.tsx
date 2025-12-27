"use client";

import React, { useEffect, useState } from "react";
import { PGlite } from "@electric-sql/pglite";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";

interface SqlPlaygroundProps {
    setup?: string;
}

export function SqlPlayground({ setup }: SqlPlaygroundProps) {
    const [db, setDb] = useState<PGlite | null>(null);
    const [query, setQuery] = useState("SELECT * FROM users;");
    const [result, setResult] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const initRef = React.useRef(false);

    useEffect(() => {
        if (initRef.current) return;
        initRef.current = true;

        async function initDb() {
            const pg = new PGlite();
            if (setup) {
                try {
                    await pg.exec(setup);
                } catch (e) {
                    console.error("Setup failed:", e);
                }
            }
            setDb(pg);
        }
        initDb();
    }, [setup]);

    const runQuery = async () => {
        if (!db) return;
        setError(null);
        try {
            const res = await db.query(query);
            setResult(res.rows);
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <Card className="my-8 overflow-hidden bg-stone-50 dark:bg-stone-900/50 border-stone-200 dark:border-stone-800" padding="none">
            <div className="border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                SQL Playground
            </div>
            <div className="p-4">
                <textarea
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800/30 p-3 font-mono text-sm text-stone-800 dark:text-stone-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-500/30 transition-all"
                    rows={3}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="mt-3 flex justify-end">
                    <Button onClick={runQuery} size="sm">
                        Run Query
                    </Button>
                </div>
            </div>

            {(result.length > 0 || error) && (
                <div className="bg-white dark:bg-stone-900 p-4 pt-0">
                    {error ? (
                        <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-3 text-sm text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-stone-50 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400">
                                    <tr>
                                        {Object.keys(result[0] || {}).map((key) => (
                                            <th key={key} className="px-4 py-2 font-medium">
                                                {key}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                                    {result.map((row, i) => (
                                        <tr key={i}>
                                            {Object.values(row).map((val: any, j) => (
                                                <td key={j} className="px-4 py-2 text-stone-700 dark:text-stone-300">
                                                    {String(val)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
}
