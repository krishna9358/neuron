import React from "react";
import { useCurrentFrame } from "remotion";

interface TypingTextProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    showCursor?: boolean;
    highlight?: boolean;
}

const KEYWORDS = ["import", "from", "const", "let", "var", "function", "return", "export", "default", "class", "interface", "type", "cva"];
const COMPONENTS = ["Button", "Card", "Header", "Footer", "DemoVideo", "motion", "div", "span", "Loader2"];
const PROPS = ["variant", "size", "className", "variants", "default", "destructive"];

const SyntaxHighlighter: React.FC<{ text: string }> = ({ text }) => {
    // Simpler split that keeps delimiters but groups words better
    const parts = text.split(/(\s+|[{}();.,<>"':])/g);

    return (
        <>
            {parts.map((part, i) => {
                if (!part) return null;
                if (KEYWORDS.includes(part)) return <span key={i} className="text-purple-400">{part}</span>;
                if (COMPONENTS.includes(part)) return <span key={i} className="text-yellow-300">{part}</span>;
                if (PROPS.includes(part)) return <span key={i} className="text-blue-300">{part}</span>;
                if (part.startsWith('"') || part.endsWith('"') || part.startsWith("'") || part.endsWith("'")) return <span key={i} className="text-green-400">{part}</span>;
                if (part === "neuron" || part === "agent") return <span key={i} className="text-blue-400 font-bold">{part}</span>;
                if (part.startsWith("<") && part.length > 1) return <span key={i} className="text-blue-300">{part}</span>;
                return <span key={i} className="text-zinc-100">{part}</span>;
            })}
        </>
    );
};

export const TypingText: React.FC<TypingTextProps> = ({
    text,
    speed = 1,
    delay = 0,
    className = "",
    showCursor = true,
    highlight = false
}) => {
    const frame = useCurrentFrame();

    const charsShown = Math.max(0, Math.floor((frame - delay) / speed));
    const textToShow = text.substring(0, charsShown);

    // Cursor only active if we are within the typing window PLUS a small buffer
    const isTyping = (frame - delay) < (text.length * speed) + 30;
    const cursorVisible = showCursor && ((frame - delay) >= 0) && isTyping;

    return (
        <span className={`${className} font-mono tracking-wide`}>
            {highlight ? <SyntaxHighlighter text={textToShow} /> : textToShow}
            {cursorVisible && (
                <span className="inline-block w-2.5 h-5 bg-blue-500 align-text-bottom ml-0.5 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            )}
        </span>
    );
};
