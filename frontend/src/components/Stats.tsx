import Wrench from "lucide-react/dist/esm/icons/wrench";
import Shield from "lucide-react/dist/esm/icons/shield";
import Plug from "lucide-react/dist/esm/icons/plug";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const stats = [
  {
    icon: Wrench,
    value: "12+",
    label: "Built-in Tools",
    figure: "Fig 1.",
  },
  {
    icon: Shield,
    value: "4",
    label: "Approval Policies",
    figure: "Fig 2.",
  },
  {
    icon: Plug,
    value: "2",
    label: "MCP Transports",
    figure: "Fig 3.",
  },
];

const Stats = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built to ship, not just chat
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              neuron comes with{" "}
              <span className="text-foreground font-semibold">12+ built-in tools</span> for file operations,
              shell execution, web access, and memory.{" "}
              <span className="text-foreground font-semibold">4 approval policies</span> give you full control,
              and{" "}
              <span className="text-foreground font-semibold">MCP support</span> lets you connect external tool servers.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-border">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 150}>
              <div
                className={`relative p-8 text-center group hover:bg-card/50 transition-all duration-300 ${index < stats.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : ""
                  }`}
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center border border-border bg-background group-hover:border-muted-foreground/50 transition-colors">
                    <stat.icon className="w-8 h-8 text-foreground" />
                  </div>
                </div>

                {/* Value */}
                <div className="text-5xl md:text-6xl font-bold mb-2 text-gradient">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-muted-foreground">
                  {stat.label}
                </div>

                {/* Figure label */}
                <div className="absolute bottom-4 left-4 text-xs text-muted-foreground/50 font-mono">
                  {stat.figure}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

