import Shield from "lucide-react/dist/esm/icons/shield";
import Lock from "lucide-react/dist/esm/icons/lock";
import Eye from "lucide-react/dist/esm/icons/eye";
import Server from "lucide-react/dist/esm/icons/server";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const privacyFeatures = [
  {
    icon: Lock,
    title: "No data storage",
    description: "Your code never touches our servers",
  },
  {
    icon: Eye,
    title: "Full transparency",
    description: "Open source means auditable code",
  },
  {
    icon: Server,
    title: "Local first",
    description: "Everything runs on your machine",
  },
];

const PrivacySection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-0 border border-border">
          {/* Left side - Main content */}
          <ScrollReveal>
            <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center border border-border bg-background">
                  <Shield className="w-6 h-6 text-foreground" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Built for privacy first
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                neuron does not store any of your code or context data, so that it can operate in privacy sensitive environments.
              </p>
              <a
                href="#privacy"
                className="inline-flex items-center text-sm text-foreground hover:text-muted-foreground transition-colors story-link"
              >
                Learn more about privacy →
              </a>
            </div>
          </ScrollReveal>

          {/* Right side - Feature cards */}
          <div className="flex flex-col">
            {privacyFeatures.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 100}>
                <div
                  className={`flex items-start gap-4 p-6 hover:bg-card/50 transition-colors ${index < privacyFeatures.length - 1 ? "border-b border-border" : ""
                    }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-border bg-background">
                    <feature.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySection;
