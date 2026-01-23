"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/lib/cn";

import { spring } from "@/shared/config/motion";

const cardVariants = cva(
    "block bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-white/50 dark:border-stone-800/50 overflow-hidden",
    {
        variants: {
            radius: {
                full: "rounded-full",
                lg: "rounded-[32px]",
                md: "rounded-3xl",
                sm: "rounded-2xl",
            },
            padding: {
                none: "p-0",
                sm: "p-4",
                md: "p-6",
                lg: "p-8",
            },
            shadow: {
                none: "shadow-none",
                sm: "shadow-sm",
                md: "shadow-lg shadow-indigo-500/5 dark:shadow-indigo-900/5",
                lg: "shadow-xl shadow-indigo-500/10 dark:shadow-indigo-900/10",
            },
        },
        defaultVariants: {
            radius: "lg",
            padding: "md",
            shadow: "md",
        },
    }
);

export interface CardProps
    extends Omit<HTMLMotionProps<"div">, "ref">,
    VariantProps<typeof cardVariants> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, radius, padding, shadow, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(cardVariants({ radius, padding, shadow, className }))}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={spring.soft}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

export { Card, cardVariants };
