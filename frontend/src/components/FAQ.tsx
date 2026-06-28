import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "What is neuron?",
    answer:
      "neuron is an open source AI agent that executes tasks using built-in tools. It can read, write, and edit files, run shell commands, search the web, and manage memory — all through a conversational interface in your terminal.",
  },
  {
    question: "What tools does neuron have?",
    answer:
      "neuron includes 12+ built-in tools: read_file, write_file, edit_file, list_dir, grep, glob, shell execution, web_fetch, web_search, memory, and todos. You can also extend it with MCP servers for custom tooling.",
  },
  {
    question: "What are approval policies?",
    answer:
      "neuron supports 4 approval policies to control tool execution safety: 'on-request' (ask before each action), 'auto' (auto-approve safe operations), 'never' (block all mutations), and 'yolo' (auto-approve everything). It also detects and blocks dangerous commands.",
  },
  {
    question: "What is MCP and how does it work?",
    answer:
      "MCP (Model Context Protocol) lets you connect external tool servers to neuron. This means you can add custom tools from any MCP-compatible server. neuron supports both stdio and HTTP/SSE transport protocols.",
  },
  {
    question: "Can neuron manage long-running sessions?",
    answer:
      "Yes. neuron supports full session management including save, resume, checkpointing, and restore. It also automatically compresses context when approaching token limits and prunes tool outputs to manage context size.",
  },
  {
    question: "What are subagents?",
    answer:
      "Subagents are specialized agents that neuron can delegate tasks to. Built-in subagents include a codebase investigator and code reviewer. You can also define custom subagents with specific tools and limits.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            FAQ
          </h2>
        </ScrollReveal>

        <div className="border border-border">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 50}>
                <AccordionItem
                  value={`item-${index}`}
                  className={`px-6 ${index < faqs.length - 1 ? "border-b border-border" : ""
                    }`}
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5 hover:text-muted-foreground transition-colors">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
