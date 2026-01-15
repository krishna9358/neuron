import { ReactNode } from "react";

export const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center selection:bg-primary/20">
            {/* Ambient Background Grid */}
            <div className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                    opacity: 0.03,
                }}
            />

            {/* Radial Gradient Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

            {/* Main Content Container with Borders */}
            <div className="relative z-10 w-full max-w-[1400px] border-x border-border/40 min-h-screen flex flex-col bg-background/30 backdrop-blur-[2px] shadow-2xl shadow-black">
                {children}
            </div>
        </div>
    );
};
