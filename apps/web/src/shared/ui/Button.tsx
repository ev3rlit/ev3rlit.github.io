"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/lib/cn";

import { spring } from "@/shared/config/motion";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            intent: {
                primary:
                    "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-600",
                secondary:
                    "bg-indigo-50 text-indigo-900 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-200 dark:hover:bg-indigo-900/50",
                ghost: "hover:bg-black/5 dark:hover:bg-white/5 text-stone-700 dark:text-stone-300",
                outline:
                    "border-2 border-stone-200 dark:border-stone-800 bg-transparent shadow-sm hover:bg-stone-50 dark:hover:bg-stone-900 hover:text-stone-900 dark:hover:text-stone-100",
                danger:
                    "bg-rose-500 text-white shadow-lg shadow-rose-500/30 hover:bg-rose-600",
            },
            size: {
                sm: "h-9 px-4 text-xs rounded-xl",
                md: "h-11 px-6 py-2 rounded-2xl",
                lg: "h-14 px-8 text-lg rounded-3xl",
                icon: "h-10 w-10 rounded-xl",
            },
        },
        defaultVariants: {
            intent: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends Omit<HTMLMotionProps<"button">, "ref">,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, intent, size, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                className={cn(buttonVariants({ intent, size, className }))}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={spring.bouncy}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
