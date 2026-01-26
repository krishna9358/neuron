"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "outline" | "ghost";
}

export function AnimatedButton({
    children,
    className,
    variant = "default",
    ...props
}: AnimatedButtonProps) {
    const baseStyles =
        "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
        default:
            "bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:shadow-xl",
        outline:
            "border-2 border-foreground/20 bg-transparent hover:border-foreground/40 hover:bg-foreground/5",
        ghost: "bg-transparent hover:bg-foreground/10",
    };

    return (
        <motion.button
            className={cn(
                baseStyles,
                variantStyles[variant],
                "px-6 py-3 rounded-lg overflow-hidden group",
                className
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            {...props}
        >
            {/* Shine effect */}
            <span className="absolute inset-0 overflow-hidden rounded-lg">
                <span className="absolute inset-0 -translate-x-full group-hover:animate-[shine_0.5s_ease-in-out_forwards] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </span>

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">{children}</span>

            {/* Bottom glow */}
            <span
                className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    variant !== "default" && "via-foreground/30"
                )}
            />
        </motion.button>
    );
}

export default AnimatedButton;
