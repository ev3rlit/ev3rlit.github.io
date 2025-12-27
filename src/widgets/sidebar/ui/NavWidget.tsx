"use client";

import { Card } from "@/shared/ui/Card";
import { Search, Home, BookOpen, PenTool } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { useSearchStore } from "@/features/search-menu/model/useSearchStore";

const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: BookOpen, label: "Series", href: "/series" },
    { icon: PenTool, label: "Guestbook", href: "/guestbook" },
];

const tags = ["Next.js", "React", "FSD", "PostgreSQL", "Design"];

export function NavWidget() {
    return (
        <Card className="flex-1 flex flex-col gap-6" radius="lg" padding="lg">
            {/* Search Trigger */}
            <button onClick={() => useSearchStore.getState().toggle()} className="group flex w-full items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-400 transition-colors hover:border-indigo-300 hover:bg-white hover:text-indigo-500">
                <Search size={16} />
                <span>Search...</span>
                <kbd className="ml-auto rounded bg-stone-200 px-1.5 py-0.5 text-xs font-bold text-stone-500 group-hover:bg-indigo-100 group-hover:text-indigo-600">CMD K</kbd>
            </button>

            {/* Menu */}
            <nav className="flex flex-col gap-2">
                {menuItems.map((item) => (
                    <Link key={item.label} href={item.href}>
                        <Button intent="ghost" className="w-full justify-start gap-3 px-4 text-base font-medium text-stone-600 hover:text-indigo-600">
                            <item.icon size={18} />
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </nav>

            <div className="my-2 h-px bg-stone-100" />

            {/* Tag Cloud */}
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <span key={tag} className="cursor-pointer rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500 transition-colors hover:bg-pink-100 hover:text-pink-500">
                        #{tag}
                    </span>
                ))}
            </div>
        </Card>
    );
}
