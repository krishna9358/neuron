import { useRef, useState, useEffect } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { DemoComposition } from "@/remotion/Composition";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import Maximize2 from "lucide-react/dist/esm/icons/maximize-2";

const DemoVideo = () => {
  const playerRef = useRef<PlayerRef>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See it in action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch how neuron transforms your coding workflow with AI-powered assistance.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="relative border border-border bg-card overflow-hidden group rounded-xl shadow-2xl">
            {/* Video header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30 z-10 relative">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  demo-mode.tsx
                </span>
              </div>
              <button
                onClick={() => playerRef.current?.toggle()}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Remotion Player */}
            <div className="relative aspect-video bg-black w-full">
              {isMounted && (
                <Player
                  ref={playerRef}
                  component={DemoComposition}
                  durationInFrames={650}
                  fps={30}
                  compositionWidth={1280}
                  compositionHeight={720}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Video features */}
        <ScrollReveal delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { label: "Tool-assisted reasoning", value: "read, write, grep, shell" },
              { label: "Multi-turn conversations", value: "Context-aware" },
              { label: "Session checkpointing", value: "Save & resume" },
            ].map((item, index) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-4 border border-border bg-card/30 rounded-lg hover:bg-card/50 transition-colors"
              >
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DemoVideo;
