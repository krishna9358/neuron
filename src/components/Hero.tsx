import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import InstallTabs from "./InstallTabs";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30 pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-border bg-card/50 backdrop-blur-sm animate-fade-up">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5">New</span>
          <span className="text-sm text-muted-foreground">Desktop app available in beta</span>
          <a href="#download" className="text-sm text-foreground hover:underline flex items-center gap-1">
            Download now <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          The open source
          <br />
          <span className="text-gradient">AI coding agent</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Free models included or connect any model from any provider, including Claude, GPT, Gemini and more.
        </p>

        {/* Install tabs */}
        <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <InstallTabs />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <Button size="lg" className="gap-2">
            <Download className="w-4 h-4" />
            Download Free
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            Read Documentation
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Demo Preview */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 px-4 animate-fade-up" style={{ animationDelay: '0.5s' }}>
        <div className="relative border border-border bg-card/80 backdrop-blur-sm overflow-hidden glow-box">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/50" />
              <div className="w-3 h-3 rounded-full bg-muted" />
              <div className="w-3 h-3 rounded-full bg-muted" />
            </div>
            <span className="text-xs text-muted-foreground font-mono ml-2">neuron</span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground">$</span>
                <span className="text-foreground">neuron</span>
              </div>
              <div className="text-muted-foreground pl-4">
                <p className="mb-2">✓ Loading project context...</p>
                <p className="mb-2">✓ Connected to Claude 3.5 Sonnet</p>
                <p className="mb-2">✓ LSP initialized for TypeScript</p>
                <p className="text-foreground">Ready! What would you like to build?</p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-muted-foreground">›</span>
                <span className="text-foreground">Create a beautiful landing page with dark mode</span>
                <span className="w-2 h-4 bg-foreground animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
