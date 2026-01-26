"use client";

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { RotatingFlipText } from "@/components/ui/rotating-flip-text";
import { AnimatedButton } from "@/components/ui/animated-button";
import { NeutralHeroBackground } from "@/components/neutral-hero-background";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Download from "lucide-react/dist/esm/icons/download";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import InstallTabs from "./InstallTabs";

// Rotating taglines for the hero
const heroTaglines = [
  "Build faster with precision",
  "Ship code with confidence",
  "Debug smarter not harder",
  "Create without limits",
  "Code at the speed of thought",
];

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      {/* Background - Neutral Theme Adapts to Light/Dark */}
      <NeutralHeroBackground className="z-0" />

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center justify-center pt-20">
        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="text-center z-30 relative max-w-4xl"
        >
          {/* Badge - Adaptive Zinc/White Monochrome */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-100 mb-8 backdrop-blur-sm shadow-sm overflow-hidden"
          >
            <BorderBeam
              size={40}
              duration={3}
              delay={0}
              borderWidth={1.5}
              colorFrom="rgba(0, 0, 0, 0.5)"
              colorTo="transparent"
              className="dark:hidden"
            />
            <BorderBeam
              size={40}
              duration={3}
              delay={0}
              borderWidth={1.5}
              colorFrom="rgba(255, 255, 255, 0.5)"
              colorTo="transparent"
              className="hidden dark:block"
            />

            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-3 h-3 text-zinc-700 dark:text-zinc-300" />
            </motion.div>
            <span className="tracking-widest uppercase text-zinc-500 dark:text-zinc-400 z-10">
              Desktop App Available
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-4 text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-400 dark:from-white dark:via-white dark:to-zinc-500 drop-shadow-sm">
              The open source
              <br />
              AI coding agent
            </h1>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.2] text-zinc-700 dark:text-zinc-300">
              <RotatingFlipText
                texts={heroTaglines}
                duration={0.6}
                displayDuration={2.5}
                delay={1}
              />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-light"
          >
            Free models included or connect any model from any provider,
            including Claude, GPT, Gemini and more.
          </motion.p>

          {/* Install tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <InstallTabs />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <AnimatedButton className="text-sm px-8 py-4 gap-2">
              <Download className="w-4 h-4" />
              Download Free
            </AnimatedButton>
            <Link to="/docs">
              <AnimatedButton variant="outline" className="text-sm px-8 py-4 gap-2">
                Read Documentation
                <ArrowRight className="w-4 h-4" />
              </AnimatedButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Demo Preview */}
      <div className="mb-20"></div>
    </section>
  );
};

export default Hero;
