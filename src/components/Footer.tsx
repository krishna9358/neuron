import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const footerLinks = [
  { label: "GitHub", badge: "60K", href: "https://github.com" },
  { label: "Docs", href: "/docs" },
  { label: "Changelog", href: "#changelog" },
  { label: "Discord", href: "https://discord.gg/k_krishna" },
  { label: "X", href: "https://x.com" },
];

const bottomLinks = [
  { label: "Brand", href: "#brand" },
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border">
      {/* Newsletter Section */}
      <ScrollReveal>
        <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-4 font-mono tracking-tight">
            Be the first to know when we release new products
          </h2>
          <p className="text-muted-foreground mb-10 font-mono">
            Join the waitlist for early access.
          </p>

          {/* Email Input with Subscribe Button */}
          <div className="w-full max-w-xl">
            <div className="flex p-1 border border-border bg-background rounded-md">
              <Input
                type="email"
                placeholder="Email address"
                className="flex-1 border-0 bg-transparent h-10 px-4 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground font-mono"
              />
              <Button
                type="submit"
                className="h-10 px-8 bg-foreground text-background hover:bg-foreground/90 font-mono font-medium rounded-sm"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Footer Links Grid */}
      <div className="border-y border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5">
            {footerLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`flex items-center justify-center gap-2 py-8 text-sm hover:bg-muted/50 transition-colors font-mono border-border
                  ${/* Mobile: Right border for odd items in 2-col grid (indices 0, 2) */ index % 2 === 0 && index !== 4 ? "max-md:border-r" : ""}
                  ${/* Mobile: Bottom border for all except last row */ index < 4 ? "max-md:border-b" : ""}
                  ${/* Desktop: Right border for all except last item */ index < 4 ? "md:border-r" : ""}
                  ${/* Desktop: No bottom border */ "md:border-b-0"}
                  ${/* Mobile: Last item spans full width */ index === 4 ? "max-md:col-span-2" : ""}
                `}
              >
                <span className="text-foreground">{link.label}</span>
                {link.badge && (
                  <span className="text-muted-foreground">[{link.badge}]</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 text-sm text-muted-foreground font-mono">
          <span>© {new Date().getFullYear()} neuron</span>
          <div className="flex gap-6">
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
      </div>
    </footer>
  );
};

export default Footer;
