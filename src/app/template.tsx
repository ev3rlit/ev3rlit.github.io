"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/shared/config/motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            transition={pageTransition.transition}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}
