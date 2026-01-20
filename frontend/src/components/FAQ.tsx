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
      "neuron is an open source AI coding agent that helps you write code in your terminal, IDE, or desktop. It connects to various AI models to provide intelligent code assistance, debugging help, and automated coding tasks.",
  },
  {
    question: "How do I use neuron?",
    answer:
      "You can install neuron using curl, npm, bun, brew, or paru. Once installed, simply run 'neuron' in your terminal to start using it. The agent will automatically detect your project context and connect to your preferred AI model.",
  },
  {
    question: "Do I need extra AI subscriptions to use neuron?",
    answer:
      "No! neuron includes free models out of the box. However, if you want to use premium models like Claude Pro or ChatGPT Plus, you can connect your existing subscriptions for enhanced capabilities.",
  },
  {
    question: "Can I use my existing AI subscriptions with neuron?",
    answer:
      "Yes, absolutely! You can log in with your Anthropic account to use Claude Pro/Max, or with your OpenAI account to use ChatGPT Plus/Pro. neuron also supports 75+ other LLM providers through Models.dev.",
  },
  {
    question: "Can I only use neuron in the terminal?",
    answer:
      "No, neuron is available as a terminal interface, desktop application (available in beta for macOS, Windows, and Linux), and as IDE extensions. Choose whatever workflow suits you best.",
  },
  {
    question: "Is neuron really free?",
    answer:
      "Yes, neuron is completely free and open source. The core functionality and free AI models are available to everyone. Premium features that require paid AI subscriptions are optional.",
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
