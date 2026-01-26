import { ReactNode } from "react";

export const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center selection:bg-primary/20 transition-colors duration-300">
            {/* Ambient Background Grid - subtle in both modes */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Main Content Container with Borders */}
            <div className="relative z-10 w-full max-w-[1100px] border-x border-border/40 min-h-screen flex flex-col bg-white/80 dark:bg-black/80 backdrop-blur-[2px] shadow-xl shadow-zinc-200/50 dark:shadow-black/50 transition-colors duration-300">
                {children}
            </div>
        </div>
    );
};
