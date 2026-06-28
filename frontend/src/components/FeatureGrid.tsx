import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Terminal from "lucide-react/dist/esm/icons/terminal";
import Wrench from "lucide-react/dist/esm/icons/wrench";
import BrainCircuit from "lucide-react/dist/esm/icons/brain-circuit";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Core Engine",
    icon: <Terminal className="w-5 h-5 text-zinc-500" />,
    items: [
      "Multi-turn conversation",
      "Interactive & single-run modes",
      "Streaming text responses",
      "Loop detection & prevention",
      "Feedback loop evaluation",
      "Prompt engineering support",
    ]
  },
  {
    title: "Built-in Tools",
    icon: <Wrench className="w-5 h-5 text-zinc-500" />,
    items: [
      "File operations (read, write, edit)",
      "Directory listing & Glob search",
      "Grep pattern matching",
      "Shell execution",
      "Web fetch & search",
      "Memory & Todo management",
    ]
  },
  {
    title: "Context Management",
    icon: <BrainCircuit className="w-5 h-5 text-zinc-500" />,
    items: [
      "Compaction & Compression",
      "Tool output pruning",
      "Session save & resume",
      "Checkpointing & Recovery",
      "Token usage tracking",
      "System & project-level config",
    ]
  },
  {
    title: "Advanced Capabilities",
    icon: <Sparkles className="w-5 h-5 text-zinc-500" />,
    items: [
      "MCP server integration",
      "Specialized subagents",
      "Automatic tool discovery",
      "Hook support (pre/post execution)",
      "Approval policies (auto, manual, yolo)",
      "Dangerous command detection",
    ]
  }
];

const FeatureGrid = () => {
  return (
    <section id="features" className="py-24 px-4 bg-zinc-50 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-zinc-900 dark:text-zinc-100">
              A comprehensive toolkit for AI Agents
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
              neuron provides all the necessary building blocks to create, manage, and scale autonomous AI agents directly in your workflow.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 150}>
              <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-4 flex-1">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-zinc-400 mt-1.5 text-xs">▶</span>
                      <span className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={600}>
          <div className="mt-16 text-center">
            <Link to="/docs">
              <Button
                className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 gap-2 rounded-full h-12 px-8 text-base shadow-lg"
              >
                Explore all features
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
