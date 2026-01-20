import Star from "lucide-react/dist/esm/icons/star";
import Users from "lucide-react/dist/esm/icons/users";
import GitCommit from "lucide-react/dist/esm/icons/git-commit";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const stats = [
  {
    icon: Star,
    value: "60K",
    label: "GitHub Stars",
    figure: "Fig 1.",
  },
  {
    icon: Users,
    value: "500",
    label: "Contributors",
    figure: "Fig 2.",
  },
  {
    icon: GitCommit,
    value: "650,000",
    label: "Monthly Devs",
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
              The open source AI coding agent
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              With over <span className="text-foreground font-semibold">60,000</span> GitHub stars,{" "}
              <span className="text-foreground font-semibold">500</span> contributors, and over{" "}
              <span className="text-foreground font-semibold">6,500</span> commits, neuron is used and trusted by over{" "}
              <span className="text-foreground font-semibold">650,000</span> developers every month.
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
