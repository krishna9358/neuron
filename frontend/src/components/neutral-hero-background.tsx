"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const NeutralHeroBackground = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDark, setIsDark] = useState(false);

    // Watch for theme changes
    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains("dark"));
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let particleCount = 0;

        const calculateParticleCount = () => {
            return Math.floor((window.innerWidth * window.innerHeight) / 15000);
        };

        class Particle {
            x: number = 0;
            y: number = 0;
            speed: number = 0;
            opacity: number = 1;
            fadeDelay: number = 0;
            fadeStart: number = 0;
            fadingOut: boolean = false;

            constructor() {
                this.reset();
                this.y = Math.random() * canvas!.height;
                this.fadeDelay = Math.random() * 600 + 100;
                this.fadeStart = Date.now() + this.fadeDelay;
                this.fadingOut = false;
            }

            reset() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.speed = Math.random() / 5 + 0.1;
                this.opacity = 1;
                this.fadeDelay = Math.random() * 600 + 100;
                this.fadeStart = Date.now() + this.fadeDelay;
                this.fadingOut = false;
            }

            update() {
                this.y -= this.speed;
                if (this.y < 0) {
                    this.reset();
                }

                if (!this.fadingOut && Date.now() > this.fadeStart) {
                    this.fadingOut = true;
                }

                if (this.fadingOut) {
                    this.opacity -= 0.008;
                    if (this.opacity <= 0) {
                        this.reset();
                    }
                }
            }

            draw(isDarkMode: boolean) {
                if (!ctx) return;

                if (isDarkMode) {
                    // Dark mode: light particles
                    const brightness = Math.random() * 100 + 155;
                    ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${this.opacity * 0.6})`;
                } else {
                    // Light mode: very subtle dark particles
                    const brightness = Math.random() * 50 + 150;
                    ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${this.opacity * 0.3})`;
                }

                ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1);
            }
        }

        const initParticles = () => {
            particleCount = calculateParticleCount();
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            const isDarkMode = document.documentElement.classList.contains("dark");

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update();
                particle.draw(isDarkMode);
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        window.addEventListener("resize", onResize);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!animationFrameId) {
                            animate();
                        }
                    } else {
                        if (animationFrameId) {
                            cancelAnimationFrame(animationFrameId);
                            animationFrameId = 0 as unknown as number;
                        }
                    }
                });
            },
            { threshold: 0 }
        );

        if (canvas) observer.observe(canvas);

        return () => {
            window.removeEventListener("resize", onResize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);

    return (
        <div
            className={cn(
                "absolute inset-0 overflow-hidden pointer-events-none select-none",
                className
            )}
        >
            {/* Clean Background - No dark gradients in light mode */}
            <div className="absolute inset-0 bg-white dark:bg-black -z-10 transition-colors duration-300" />

            {/* Only show spotlight effects in dark mode */}
            {isDark && (
                <>
                    <div className="spotlight">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    <div className="accent-lines">
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>

                    <div className="mountains">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </>
            )}

            {/* Particles - work in both modes */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
            />
        </div>
    );
};

export default NeutralHeroBackground;
