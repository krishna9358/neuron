import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Github from "lucide-react/dist/esm/icons/github";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import Search from "lucide-react/dist/esm/icons/search";

const DocsHeader = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4 lg:px-6">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 mr-6">
                    <span className="font-mono font-bold text-lg tracking-tight">
                        <img src="/logo.png" alt="Neuron" className="w-52 h-12" />
                    </span>
                </Link>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Right side actions */}
                <div className="flex items-center gap-2">
                    {/* Search */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden md:flex items-center gap-2 text-muted-foreground h-8 px-3 border-border"
                    >
                        <Search className="w-4 h-4" />
                        <span className="text-sm">Search</span>
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2">
                            ⌘K
                        </kbd>
                    </Button>

                    {/* GitHub */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                    >
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    </Button>

                    {/* Discord */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                    >
                        <a
                            href="https://discord.gg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MessageCircle className="w-4 h-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default DocsHeader;
