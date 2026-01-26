"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface RotatingFlipTextProps {
    /**
     * Additional CSS classes for the wrapper
     */
    className?: string;

    /**
     * Array of text phrases to cycle through
     */
    texts: string[];

    /**
     * Duration of the flip animation in seconds
     * @default 0.5
     */
    duration?: number;

    /**
     * Time to display each phrase before switching (in seconds)
     * @default 3
     */
    displayDuration?: number;

    /**
     * Initial delay before animation starts in seconds
     * @default 0
     */
    delay?: number;
}

export function RotatingFlipText({
    className,
    texts,
    duration = 0.5,
    displayDuration = 3,
    delay = 0,
}: RotatingFlipTextProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Initial delay
        const initialTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % texts.length);
            }, displayDuration * 1000);

            return () => clearInterval(interval);
        }, delay * 1000);

        return () => clearTimeout(initialTimeout);
    }, [texts.length, displayDuration, delay]);

    const currentText = texts[currentIndex];

    return (
        <div
            className={cn("relative inline-block overflow-hidden", className)}
            style={{ perspective: "1000px" }}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    initial={{
                        rotateX: 90,
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        rotateX: 0,
                        opacity: 1,
                        y: 0,
                    }}
                    exit={{
                        rotateX: -90,
                        opacity: 0,
                        y: -20,
                    }}
                    transition={{
                        duration: duration,
                        ease: "easeOut",
                    }}
                    className="inline-block origin-bottom"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {currentText}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

export default RotatingFlipText;
