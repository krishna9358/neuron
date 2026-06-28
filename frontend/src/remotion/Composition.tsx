import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Terminal } from "./Terminal";
import { TypingText } from "./TypingText";
import Download from "lucide-react/dist/esm/icons/download";
import MousePointer2 from "lucide-react/dist/esm/icons/mouse-pointer-2";
import Check from "lucide-react/dist/esm/icons/check";

// Animated Cursor Component
const Cursor = ({ x, y, click, visible = true }: { x: number; y: number; click: boolean; visible?: boolean }) => {
    if (!visible) return null;
    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                transform: `scale(${click ? 0.9 : 1})`,
                transition: 'transform 0.1s',
                zIndex: 100
            }}
            className="pointer-events-none drop-shadow-2xl"
        >
            <MousePointer2
                className="w-12 h-12 text-black fill-white stroke-black stroke-[1.5]"
                style={{ transform: 'rotate(-15deg)' }}
            />
        </div>
    );
};

export const DemoComposition = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // ==========================================
    // ANIMATION ORCHESTRATION
    // ==========================================

    // Scene 1: Intro Fade In
    const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
    const scale = spring({ frame, fps, config: { damping: 200 } });

    // Scene 5: Cursor Download Interaction
    const cursorStartFrame = 580;

    const cursorX = interpolate(
        frame,
        [cursorStartFrame, cursorStartFrame + 40],
        [width * 0.7, width / 2],
        { extrapolateRight: "clamp" }
    );

    const cursorY = interpolate(
        frame,
        [cursorStartFrame, cursorStartFrame + 40],
        [height * 0.8, height * 0.75],
        { extrapolateRight: "clamp" }
    );

    const isClicking = frame > cursorStartFrame + 45 && frame < cursorStartFrame + 60;
    const buttonScale = isClicking ? 0.95 : 1;

    // Fade out analysis when tool calls start
    const analysisOpacity = interpolate(
        frame,
        [200, 210],
        [1, 0.5],
        { extrapolateRight: "clamp" }
    );

    return (
        <AbsoluteFill className="bg-black items-center justify-center font-sans overflow-hidden">
            {/* Background Texture - Dot Pattern */}
            <AbsoluteFill className="bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

            {/* Ambient Light/Gradient */}
            <AbsoluteFill className="overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </AbsoluteFill>

            {/* Main Content Container */}
            <div
                style={{ opacity, transform: `scale(${scale})` }}
                className="w-full h-full flex items-center justify-center p-4"
            >
                <Sequence from={0} durationInFrames={600}>
                    <Terminal title="neuron — session">
                        <div className="flex flex-col gap-5">
                            {/* STEP 1: USER INPUT */}
                            <div className="flex items-start gap-4">
                                <span className="text-green-500 font-bold mt-1 text-xl">➜</span>
                                <span className="text-blue-400 font-bold mt-1 text-xl">~</span>
                                <div className="flex-1 pt-1">
                                    <TypingText
                                        text='neuron "Find and fix the memory leak in the worker pool"'
                                        delay={30}
                                        speed={1}
                                        className="text-xl md:text-2xl font-medium text-white leading-relaxed"
                                        showCursor={frame < 130}
                                    />
                                </div>
                            </div>

                            {/* STEP 2: AGENT THINKING + TOOL CALLS */}
                            <Sequence from={130}>
                                <div style={{ opacity: analysisOpacity }} className="transition-opacity duration-500">
                                    <div className="flex items-center gap-3 text-zinc-400 mb-3">
                                        <div className="relative flex h-4 w-4">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600"></span>
                                        </div>
                                        <span className="text-base font-medium">Planning approach...</span>
                                    </div>
                                    <div className="pl-7 border-l-2 border-zinc-800 space-y-2">
                                        <TypingText text="⚡ tool:read_file → src/worker/pool.go" delay={10} speed={1} showCursor={false} className="text-sm text-cyan-400 block" />
                                        <TypingText text="⚡ tool:grep → 'defer|Close|Release' in src/worker/" delay={30} speed={1} showCursor={false} className="text-sm text-cyan-400 block" />
                                        <TypingText text="✓ Found unclosed connection in pool.Acquire()" delay={50} speed={1} showCursor={false} className="text-sm text-zinc-500 block" />
                                    </div>
                                </div>
                            </Sequence>

                            {/* STEP 3: CODE FIX (DIFF VIEW) */}
                            <Sequence from={220}>
                                <div className="bg-black/50 rounded-lg border border-white/10 overflow-hidden relative shadow-inner">
                                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
                                        <span className="text-zinc-500 text-xs font-mono">⚡ tool:edit_file → src/worker/pool.go</span>
                                        <span className="text-green-400 text-[10px] font-bold bg-green-900/40 px-2 py-0.5 rounded border border-green-900/50">DIFF VIEW</span>
                                    </div>

                                    <div className="p-4 space-y-1.5 font-mono text-sm md:text-base leading-relaxed">
                                        <div className="flex">
                                            <span className="text-zinc-600 w-6 select-none"> </span>
                                            <TypingText text="func (p *Pool) Acquire() (*Conn, error) {" speed={0.5} delay={0} showCursor={false} className="text-zinc-400" />
                                        </div>
                                        <div className="flex bg-red-950/30">
                                            <span className="text-red-500/70 w-6 select-none">-</span>
                                            <TypingText text="    conn := p.pool.Get()" speed={0.5} delay={10} highlight={true} showCursor={false} className="text-red-300/80" />
                                        </div>
                                        <div className="flex bg-red-950/30">
                                            <span className="text-red-500/70 w-6 select-none">-</span>
                                            <TypingText text="    return conn, nil" speed={0.5} delay={20} highlight={true} showCursor={false} className="text-red-300/80" />
                                        </div>
                                        <div className="flex bg-green-950/30">
                                            <span className="text-green-500/50 w-6 select-none">+</span>
                                            <TypingText text="    conn := p.pool.Get()" speed={0.5} delay={30} highlight={true} showCursor={false} className="text-green-300/90" />
                                        </div>
                                        <div className="flex bg-green-950/30">
                                            <span className="text-green-500/50 w-6 select-none">+</span>
                                            <TypingText text="    runtime.SetFinalizer(conn, (*Conn).Release)" speed={0.5} delay={50} highlight={true} showCursor={frame > 280 && frame < 350} className="text-green-300/90" />
                                        </div>
                                        <div className="flex bg-green-950/30">
                                            <span className="text-green-500/50 w-6 select-none">+</span>
                                            <TypingText text="    return conn, nil" speed={0.5} delay={70} highlight={true} showCursor={false} className="text-green-300/90" />
                                        </div>
                                        <div className="flex">
                                            <span className="text-zinc-600 w-6 select-none"> </span>
                                            <TypingText text="}" speed={0.5} delay={80} showCursor={false} className="text-zinc-400" />
                                        </div>
                                    </div>
                                </div>
                            </Sequence>

                            {/* STEP 4: SUCCESS */}
                            <Sequence from={420}>
                                <div className="mt-1 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 text-green-400 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div className="bg-green-500/20 p-1 rounded-full"><Check className="w-4 h-4" /></div>
                                    <span className="font-bold tracking-wide">Fix applied. Memory leak resolved in pool.Acquire().</span>
                                </div>
                            </Sequence>
                        </div>
                    </Terminal>
                </Sequence>

                {/* FINAL SCREEN OVERLAY */}
                <Sequence from={540}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
                        style={{
                            backdropFilter: `blur(${interpolate(frame, [540, 560], [0, 12])}px)`,
                            backgroundColor: `rgba(0,0,0,${interpolate(frame, [540, 560], [0, 0.7])})`
                        }}>

                        <div
                            style={{
                                opacity: interpolate(frame, [550, 570], [0, 1]),
                                transform: `translateY(${interpolate(frame, [550, 570], [30, 0])}px) scale(${interpolate(frame, [550, 570], [0.95, 1])})`
                            }}
                            className="text-center p-8 rounded-2xl bg-black/40 border border-white/10 shadow-2xl backdrop-blur-md"
                        >
                            <h1 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl font-inter-tight">
                                Ship <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Fearlessly</span>
                            </h1>
                            <p className="text-zinc-400 text-2xl mb-10 font-light tracking-wide">The AI Agent that executes with tools.</p>

                            <button
                                className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-xl flex items-center gap-3 hover:bg-zinc-100 transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] mx-auto"
                                style={{ transform: `scale(${buttonScale})` }}
                            >
                                <Download className="w-6 h-6 group-hover:animate-bounce" />
                                Get Started
                            </button>
                        </div>
                    </div>
                </Sequence>

                {/* Floating Cursor for the end interaction */}
                <Sequence from={cursorStartFrame}>
                    <Cursor
                        x={cursorX}
                        y={cursorY}
                        click={isClicking}
                        visible={frame < cursorStartFrame + 100}
                    />
                </Sequence>
            </div>
        </AbsoluteFill>
    );
};

