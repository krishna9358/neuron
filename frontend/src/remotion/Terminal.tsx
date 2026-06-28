import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

interface TerminalProps {
    children: React.ReactNode;
    title?: string;
}

export const Terminal: React.FC<TerminalProps> = ({
    children,
    title = "neuron-agent — zsh",
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Subtle organic float animation
    const y = Math.sin(frame / (fps * 2)) * 8;
    const rotateX = Math.sin(frame / (fps * 3)) * 0.5;
    const rotateY = Math.cos(frame / (fps * 3)) * 0.5;

    return (
        <div
            className="relative mx-auto rounded-xl perspective-1000"
            style={{
                width: '90%',  // Force width relative to container
                maxWidth: '1000px',
                transform: `translateY(${y}px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            }}
        >
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[80px] opacity-50 rounded-full pointer-events-none transform scale-90 translate-y-10" />

            {/* Main Terminal Window */}
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#09090b] shadow-2xl backdrop-blur-3xl ring-1 ring-white/5">

                {/* Top Bar */}
                <div className="relative flex items-center justify-between bg-white/[0.03] px-4 py-3 border-b border-white/5 z-20 h-10">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-sm border border-black/20" />
                        <div className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-sm border border-black/20" />
                        <div className="h-3 w-3 rounded-full bg-[#27C93F] shadow-sm border border-black/20" />
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 opacity-60">
                        <span className="text-xs font-medium text-zinc-400 font-mono tracking-wide flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>
                            {title}
                        </span>
                    </div>
                    <div className="w-10" />
                </div>

                {/* Content Area - Fixed minimum height to prevent layout shifts */}
                <div className="relative p-6 md:p-8 font-mono text-lg text-zinc-300 min-h-[480px] bg-gradient-to-b from-black/20 to-transparent z-10 antialiased leading-relaxed">
                    {children}

                    {/* Subtle Scanline/Texture Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)'
                        }}
                    />
                </div>

                {/* Glossy Reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-20" />
            </div>
        </div>
    );
};
