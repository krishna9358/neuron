import { ReactNode } from "react";

export const DocsLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20">
            {/* Subtle Background Grid */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
                    backgroundSize: "80px 80px",
                    opacity: 0.02,
                }}
            />

            {/* Full Width Content */}
            <div className="relative z-10 w-full min-h-screen flex flex-col">
                {children}
            </div>
        </div>
    );
};
