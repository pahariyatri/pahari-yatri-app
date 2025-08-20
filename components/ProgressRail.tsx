"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";

type Props = { sections: string[] };

export default function ProgressRail({ sections }: Props) {
    const [active, setActive] = useState<string | null>(null);
    const scrollY = useMotionValue(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Track active section
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
        );

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });

        return () => obs.disconnect();
    }, [sections]);

    // Track scroll progress for mobile thin bar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            setScrollProgress(Math.min(Math.max(scrollTop / docHeight, 0), 1));
            scrollY.set(scrollTop);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollY]);

    return (
        <>
            {/* Desktop Vertical Rail */}
            <nav
                aria-label="Page progress"
                className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-6"
            >
                {sections.map((id, idx) => {
                    const isActive = active === id;
                    return (
                        <Link key={id} href={`#${id}`} scroll>
                            <motion.div
                                className="relative flex items-center justify-center"
                                initial={false}
                                animate={isActive ? "active" : "inactive"}
                                variants={{
                                    inactive: { scale: 1, opacity: 0.4 },
                                    active: { scale: 1.4, opacity: 1 },
                                }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <motion.span
                                    className="absolute w-10 h-10 rounded-full bg-emerald-400/20 blur-lg"
                                    animate={isActive ? { scale: [1, 1.6, 1], opacity: [0.4, 0.8, 0.4] } : { opacity: 0 }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <motion.span
                                    className="relative block w-3.5 h-3.5 rounded-full border-2 border-emerald-400"
                                    animate={isActive ? { backgroundColor: "#34d399", scale: 1.2 } : { backgroundColor: "transparent", scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                />
                                {idx !== sections.length - 1 && (
                                    <span className="absolute left-1/2 top-full w-0.5 h-6 bg-gradient-to-b from-emerald-500/50 to-transparent -translate-x-1/2" />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Mobile Thin Scroll Progress */}
            <motion.div
                className="lg:hidden fixed top-0 left-0 h-1 bg-emerald-400 z-50"
                style={{ width: `${scrollProgress * 100}%` }}
            />
        </>
    );
}
