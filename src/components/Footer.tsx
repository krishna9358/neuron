import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const footerLinks = [
  { label: "GitHub", badge: "60K", href: "https://github.com" },
  { label: "Docs", href: "/docs" },
  { label: "Changelog", href: "#changelog" },
  { label: "Discord", href: "https://discord.gg/k_krishna." },
  { label: "X", href: "https://x.com" },
];

const bottomLinks = [
  { label: "Brand", href: "#brand" },
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
];

const Footer = () => {
  return (
    <footer className="">
      {/* Newsletter Section */}
      <ScrollReveal>
        <div className="container mx-auto max-w-4xl py-16 px-4">
          <h2 className="text-lg md:text-xl font-semibold mb-2 font-mono">
            Be the first to know when we release new products
          </h2>
          <p className="text-muted-foreground mb-8">
            Join the waitlist for early access.
          </p>

          {/* Email Input with Subscribe Button */}
          <div className="relative max-w-2xl">
            <div className="flex border border-border bg-background">
              <Input
                type="email"
                placeholder="Email address"
                className="flex-1 border-0 bg-transparent h-14 px-4 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                variant="outline"
                className="h-10 px-6 m-2 border-border bg-transparent hover:bg-accent"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Footer Links Grid */}
      <ScrollReveal>
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 border border-border">
            {footerLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`flex items-center justify-center gap-2 py-6 text-sm hover:bg-card/50 transition-colors ${index < footerLinks.length - 1 ? "border-r border-border" : ""
                  } ${index >= 2 && index < 5 ? "max-md:border-t max-md:border-border" : ""} ${index === 2 ? "max-md:border-r-0" : ""
                  } ${index === 3 ? "max-md:border-r" : ""} ${index === 4 ? "max-md:col-span-2 max-md:border-r-0" : ""
                  }`}
              >
                <span className="text-foreground">{link.label}</span>
                {link.badge && (
                  <span className="text-muted-foreground">[{link.badge}]</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Bottom Bar */}
      <div className="container mx-auto max-w-4xl py-10 px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <span>©{new Date().getFullYear()} neuron</span>
          {bottomLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
