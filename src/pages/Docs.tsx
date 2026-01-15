import { DocsLayout } from "@/components/DocsLayout";
import DocsHeader from "@/components/DocsHeader";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams, Link } from "react-router-dom";
import { getPage, navigation, NavItem } from "@/lib/source";
import { MDXProvider } from "@mdx-js/react";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import { useState } from "react";

// Custom MDX components for styling
const mdxComponents = {
    h1: (props: any) => (
        <h1 className="text-3xl font-bold tracking-tight mb-4 font-mono" {...props} />
    ),
    h2: (props: any) => (
        <h2 className="text-xl font-semibold mt-8 mb-4 font-mono" {...props} />
    ),
    h3: (props: any) => (
        <h3 className="text-lg font-semibold mt-6 mb-3 font-mono" {...props} />
    ),
    p: (props: any) => (
        <p className="text-muted-foreground leading-relaxed mb-4" {...props} />
    ),
    a: (props: any) => (
        <a className="text-foreground underline underline-offset-4 hover:text-primary" {...props} />
    ),
    ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-1" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />,
    li: (props: any) => <li className="text-muted-foreground" {...props} />,
    code: (props: any) => (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
    ),
    pre: (props: any) => (
        <div className="relative my-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-border rounded-t-lg">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-muted-foreground ml-2">Terminal</span>
            </div>
            <pre className="bg-zinc-900 border border-t-0 border-border rounded-b-lg p-4 overflow-x-auto" {...props} />
        </div>
    ),
    blockquote: (props: any) => (
        <blockquote className="border-l-2 border-border pl-4 italic text-muted-foreground my-4" {...props} />
    ),
};

// Collapsible nav section component
const NavSection = ({ item, currentUrl }: { item: NavItem; currentUrl: string }) => {
    const [isOpen, setIsOpen] = useState(true);
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
        return (
            <div className="mb-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <span className="font-medium">{item.title}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
                </button>
                {isOpen && (
                    <div className="ml-3 mt-1 space-y-0.5 border-l border-border pl-3">
                        {item.children!.map((child) => (
                            <Link
                                key={child.url}
                                to={child.url!}
                                className={`block py-1 text-sm transition-colors ${currentUrl === child.url
                                    ? "text-foreground font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {child.title}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            to={item.url!}
            className={`block py-1.5 text-sm transition-colors ${currentUrl === item.url
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
                }`}
        >
            {item.title}
        </Link>
    );
};

const Docs = () => {
    const params = useParams();
    const slugParam = params["*"] || "";
    const slug = slugParam.split("/").filter(Boolean).join("/");
    const page = getPage(slug);
    const currentUrl = "/docs" + (slug ? "/" + slug : "");

    if (!page) {
        return (
            <DocsLayout>
                <DocsHeader />
                <div className="container py-16 text-center">
                    <h1 className="text-2xl font-bold mb-4 font-mono">Page not found</h1>
                    <p className="text-muted-foreground">
                        The documentation page you are looking for does not exist.
                    </p>
                    <Link to="/docs" className="text-primary underline mt-4 inline-block">
                        Go to docs home
                    </Link>
                </div>
            </DocsLayout>
        );
    }

    const MDXContent = page.Component;

    // Mock table of contents (would be extracted from MDX in a real implementation)
    const tableOfContents = [
        { title: "Overview", id: "overview" },
        { title: "Install", id: "install" },
        { title: "Configure", id: "configure" },
        { title: "Initialize", id: "initialize" },
        { title: "Usage", id: "usage" },
    ];

    return (
        <DocsLayout>
            <DocsHeader />
            <div className="flex flex-1 w-full">
                {/* Left Sidebar - Navigation */}
                <aside className="w-56 border-r border-border hidden lg:block sticky top-16 h-[calc(100vh-4rem)] bg-background">
                    <ScrollArea className="h-full py-6 px-4">
                        <nav className="space-y-1">
                            {navigation.map((item) => (
                                <NavSection key={item.title} item={item} currentUrl={currentUrl} />
                            ))}
                        </nav>
                    </ScrollArea>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="max-w-3xl mx-auto py-12 px-6 lg:px-12">
                        {/* Page Title */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold tracking-tight font-mono mb-2">
                                {page.title}
                            </h1>
                            {page.description && (
                                <p className="text-muted-foreground text-lg">
                                    {page.description}
                                </p>
                            )}
                        </div>

                        {/* MDX Content */}
                        <div className="prose prose-invert max-w-none">
                            <MDXProvider components={mdxComponents}>
                                <MDXContent />
                            </MDXProvider>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar - Table of Contents */}
                <aside className="w-56 border-l border-border hidden xl:block sticky top-16 h-[calc(100vh-4rem)] bg-background">
                    <ScrollArea className="h-full py-6 px-4">
                        <div className="space-y-4">
                            <h4 className="font-medium text-sm text-muted-foreground">On this page</h4>
                            <nav className="space-y-2">
                                {tableOfContents.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {item.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </ScrollArea>
                </aside>
            </div>
        </DocsLayout>
    );
};

export default Docs;
