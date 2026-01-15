import {
  Braces,
  Layers,
  Share2,
  Sparkles,
  MessageSquare,
  Boxes,
  Monitor,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Braces,
    title: "LSP enabled",
    description: "Automatically loads the right LSPs for the LLM to understand your codebase",
  },
  {
    icon: Layers,
    title: "Multi-session",
    description: "Start multiple agents in parallel on the same project",
  },
  {
    icon: Share2,
    title: "Share links",
    description: "Share a link to any session for reference or to debug",
  },
  {
    icon: Sparkles,
    title: "Claude Pro",
    description: "Log in with Anthropic to use your Claude Pro or Max account",
  },
  {
    icon: MessageSquare,
    title: "ChatGPT Plus/Pro",
    description: "Log in with OpenAI to use your ChatGPT Plus or Pro account",
  },
  {
    icon: Boxes,
    title: "Any model",
    description: "75+ LLM providers through Models.dev, including local models",
  },
  {
    icon: Monitor,
    title: "Any editor",
    description: "Available as a terminal interface, desktop app, and IDE extension",
  },
];

const FeatureGrid = () => {
  return (
    <section id="features" className="py-24 px-4 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What is neuron?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              neuron is an open source agent that helps you write code in your terminal, IDE, or desktop.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento grid with proper borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100}>
              <div
                className={`group relative p-6 bg-card/30 hover:bg-card/60 transition-all duration-300 border-b border-r border-border last:border-r-0 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 ${index >= features.length - (features.length % 3 || 3) ? "border-b-0" : ""
                  } ${index === 0 ? "lg:col-span-2" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-border bg-background group-hover:border-muted-foreground/50 transition-colors">
                    <feature.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={700}>
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="gap-2 border-border hover:border-muted-foreground/50">
              Read docs
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeatureGrid;
