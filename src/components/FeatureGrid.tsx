import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const features = [
  {
    title: "LSP enabled",
    description: "Automatically loads the right LSPs for the LLM",
  },
  {
    title: "Multi-session",
    description: "Start multiple agents in parallel on the same project",
  },
  {
    title: "Share links",
    description: "Share a link to any session for reference or to debug",
  },
  {
    title: "Claude Pro",
    description: "Log in with Anthropic to use your Claude Pro or Max account",
  },
  {
    title: "ChatGPT Plus/Pro",
    description: "Log in with OpenAI to use your ChatGPT Plus or Pro account",
  },
  {
    title: "Any model",
    description: "75+ LLM providers through Models.dev, including local models",
  },
  {
    title: "Any editor",
    description: "Available as a terminal interface, desktop app, and IDE extension",
  },
];

const FeatureGrid = () => {
  return (
    <section id="features" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6 font-mono text-foreground">
              What is neuron?
            </h2>
            <p className="text-muted-foreground font-mono text-sm md:text-base leading-relaxed max-w-3xl">
              neuron is an open source agent that helps you write code in your terminal, IDE, or desktop.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-6 font-mono">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100}>
              <div className="flex items-start gap-4">
                <span className="text-muted-foreground whitespace-nowrap">[*]</span>
                <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
                  <span className="font-semibold text-foreground whitespace-nowrap min-w-[140px]">
                    {feature.title}
                  </span>
                  <span className="text-muted-foreground">
                    {feature.description}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={700}>
          <div className="mt-12">
            <Link to="/docs">
              <Button
                className="bg-foreground text-background hover:bg-foreground/90 font-mono gap-2 rounded-md h-10 px-6"
              >
                Read docs
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeatureGrid;
