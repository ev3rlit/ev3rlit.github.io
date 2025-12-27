"use client";

import { Card } from "@/shared/ui/Card";
import { Github, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { PROFILE_CONFIG } from "@/shared/config/profile";

export function IdentityWidget() {
    return (
        <Card className="relative flex flex-col items-center p-8 text-center" radius="lg" shadow="lg">
            <div className="absolute right-4 top-4">
                <motion.a
                    href={PROFILE_CONFIG.github}
                    target="_blank"
                    whileHover={{ rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="text-stone-400 hover:text-indigo-600"
                >
                    <Github size={20} />
                </motion.a>
            </div>

            <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-indigo-50 bg-indigo-100 shadow-inner">
                {/* Placeholder for Memoji/Avatar */}
                <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${PROFILE_CONFIG.nickname}`}
                    alt="Profile"
                    className="h-full w-full object-cover"
                />
            </div>

            <h2 className="text-xl font-bold tracking-tight text-stone-900">{PROFILE_CONFIG.name}</h2>
            <p className="font-medium text-indigo-500">{PROFILE_CONFIG.title}</p>

            <div className="mt-4 flex items-center gap-1 text-xs text-stone-400">
                <MapPin size={12} />
                <span>Seoul, KR</span>
            </div>
        </Card>
    );
}
