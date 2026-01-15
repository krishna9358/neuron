import { useState } from "react";
import { Play, Pause, Maximize2 } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const DemoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 px-4 border-t border-border">
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
          <div className="relative border border-border bg-card overflow-hidden group">
            {/* Video header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  demo.mp4
                </span>
              </div>
              <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Video placeholder with terminal animation */}
            <div className="relative aspect-video bg-background">
              {/* Animated terminal content */}
              <div className="absolute inset-0 p-6 md:p-10 font-mono text-sm overflow-hidden">
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-foreground">$</span>
                    <span className="text-foreground typing-animation">neuron "Add a dark mode toggle to the header"</span>
                  </div>

                  <div className="pl-4 space-y-2 text-muted-foreground">
                    <p className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                      <span className="text-chart-3">→</span> Analyzing project structure...
                    </p>
                    <p className="animate-fade-in" style={{ animationDelay: "1s" }}>
                      <span className="text-chart-3">→</span> Found Header.tsx component
                    </p>
                    <p className="animate-fade-in" style={{ animationDelay: "1.5s" }}>
                      <span className="text-chart-3">→</span> Generating dark mode implementation...
                    </p>
                  </div>

                  <div className="mt-6 p-4 border border-border bg-card/50 animate-fade-in" style={{ animationDelay: "2s" }}>
                    <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 bg-muted text-foreground">DIFF</span>
                      <span>src/components/Header.tsx</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <p className="text-chart-3">+ import {"{"} Moon, Sun {"}"} from "lucide-react";</p>
                      <p className="text-chart-3">+ import {"{"} useTheme {"}"} from "next-themes";</p>
                      <p className="text-muted-foreground">  </p>
                      <p className="text-chart-3">+ const {"{"} theme, setTheme {"}"} = useTheme();</p>
                      <p className="text-chart-3">+ </p>
                      <p className="text-chart-3">+ {"<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>"}</p>
                      <p className="text-chart-3">+   {"{theme === 'dark' ? <Sun /> : <Moon />}"}</p>
                      <p className="text-chart-3">+ {"</button>"}</p>
                    </div>
                  </div>

                  <div className="mt-4 animate-fade-in" style={{ animationDelay: "2.5s" }}>
                    <p className="text-foreground">
                      <span className="text-chart-3">✓</span> Changes applied successfully. Dark mode toggle added to header.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-4 animate-fade-in" style={{ animationDelay: "3s" }}>
                    <span className="text-muted-foreground">›</span>
                    <span className="w-2 h-4 bg-foreground animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Play overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
              >
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 flex items-center justify-center border border-border bg-card hover:bg-accent transition-colors group-hover:scale-105 transition-transform duration-300"
                >
                  <Play className="w-8 h-8 text-foreground ml-1" />
                </button>
              </div>

              {/* Controls bar */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 px-4 py-3 bg-gradient-to-t from-background to-transparent">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>

                {/* Progress bar */}
                <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-foreground transition-all duration-[3000ms] ease-linear ${isPlaying ? "w-full" : "w-0"
                      }`}
                  />
                </div>

                <span className="text-xs text-muted-foreground font-mono">
                  {isPlaying ? "0:03" : "0:00"} / 0:03
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Video features */}
        <ScrollReveal delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { label: "Real-time code changes", value: "Instant" },
              { label: "Context-aware suggestions", value: "Smart" },
              { label: "Multi-file editing", value: "Powerful" },
            ].map((item, index) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-4 border border-border bg-card/30"
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
