import { AppLayout } from "@/components/AppLayout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const Docs = () => {
    return (
        <AppLayout>
            <Header />
            <div className="flex flex-1 w-full">
                <aside className="w-64 border-r border-border/40 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] bg-background/50 backdrop-blur-sm">
                    <ScrollArea className="h-full py-8 pl-6 pr-4">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h4 className="font-semibold tracking-tight text-foreground">Getting Started</h4>
                                <div className="flex flex-col space-y-1">
                                    <Button variant="ghost" className="justify-start h-8 px-2 text-sm font-normal bg-accent text-accent-foreground">Introduction</Button>
                                    <Button variant="ghost" className="justify-start h-8 px-2 text-sm font-normal text-muted-foreground">Installation</Button>
                                    <Button variant="ghost" className="justify-start h-8 px-2 text-sm font-normal text-muted-foreground">Quick Start</Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold tracking-tight text-foreground">Core Concepts</h4>
                                <div className="flex flex-col space-y-1">
                                    <Button variant="ghost" className="justify-start h-8 px-2 text-sm font-normal text-muted-foreground">Agents</Button>
                                    <Button variant="ghost" className="justify-start h-8 px-2 text-sm font-normal text-muted-foreground">Workflows</Button>
                                    <Button variant="ghost" className="justify-start h-8 px-2 text-sm font-normal text-muted-foreground">Memory</Button>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </aside>
                <main className="flex-1 py-10 px-6 lg:px-12">
                    <div className="max-w-3xl space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight mb-4">Introduction to Neuron</h1>
                            <p className="text-lg text-muted-foreground">
                                Neuron is an open-source AI coding agent designed to help developers build software faster and more efficiently.
                                It integrates seamlessly with your existing workflow and tools.
                            </p>
                        </div>

                        <div className="p-4 border border-border rounded-lg bg-card">
                            <h3 className="text-lg font-semibold mb-2">Why Neuron?</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                <li>Privacy-first architecture</li>
                                <li>Support for any LLM (Claude, GPT-4, Llama)</li>
                                <li>Full codebase context awareness</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                            <p className="text-muted-foreground">
                                Get started by installing the Neuron CLI tool via npm or curl.
                            </p>
                            <div className="bg-muted/50 p-4 rounded-md font-mono text-sm border border-border">
                                npm install -g @neuron/cli
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </AppLayout>
    );
};

export default Docs;
