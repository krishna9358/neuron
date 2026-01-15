import { useState } from "react";
import { Check, Copy } from "lucide-react";

const installCommands = [
  { name: "curl", command: "curl -fsSL https://neuron.ai/install | bash" },
  { name: "npm", command: "npm install -g neuron" },
  { name: "bun", command: "bun install -g neuron" },
  { name: "brew", command: "brew install neuron" },
  { name: "paru", command: "paru -S neuron" },
];

const InstallTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommands[activeTab].command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border mb-0">
        {installCommands.map((item, index) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === index
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            {item.name}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
            )}
          </button>
        ))}
      </div>

      {/* Command display */}
      <div className="relative bg-card border border-border border-t-0">
        <div className="flex items-center justify-between px-4 py-3">
          <code className="text-sm font-mono text-muted-foreground">
            <span className="text-foreground">{installCommands[activeTab].command}</span>
          </code>
          <button
            onClick={handleCopy}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-chart-3" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallTabs;
