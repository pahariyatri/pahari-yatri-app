"use client";

import { Button } from "./ui/button";
import Link from "./common/Link";
import SectionContainer from "./common/SectionContainer";

type Props = { id?: string };

export function HiddenTrails({ id }: Props) {
    return (
        <SectionContainer id={id} className="py-16 sm:py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Split-Screen Layout: Mobile stacks, Desktop side-by-side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left: Text Content */}
                    <div className="animate-fade-in-left">
                        {/* Decorative line */}
                        <div className="w-16 h-1 bg-gradient-to-r from-himalayan-green/40 via-himalayan-saffron to-himalayan-green/40 rounded-full mb-6 sm:mb-8 animate-pulse-slow"></div>

                        {/* Headline */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-brandSerif mb-6 leading-snug sm:leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 dark:from-foreground dark:via-foreground/90 dark:to-foreground/80">
                                Secret valleys. Forgotten trails. Only a Yatri knows.
                            </span>
                        </h2>

                        {/* Supporting micro-copy for mobile storytelling */}
                        <p className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed mb-6 max-w-md">
                            Step into raw Himalayan life. Meet villages, mountains, and moments that awaken the Yatri within.
                        </p>

                        {/* CTA Button */}
                        <Link href="/customize-trip">
                            <Button
                                variant="outline"
                                className="group relative overflow-hidden border-himalayan-green hover:border-himalayan-saffron hover:bg-himalayan-green/5
                           text-sm sm:text-base md:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-500 transform hover:-translate-y-1
                           shadow-sm hover:shadow-md w-full sm:w-auto"
                            >
                                <span className="relative z-10 font-medium tracking-wide">Discover Hidden Trails</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-himalayan-green to-himalayan-saffron group-hover:w-full transition-all duration-500 ease-in-out"></span>
                            </Button>
                        </Link>
                    </div>

                    {/* Right: Image / Video */}
                    <div className="relative h-64 sm:h-80 md:h-96 lg:h-[600px] overflow-hidden rounded-2xl md:rounded-3xl shadow-lg dark:shadow-xl animate-fade-in-right">
                        {/* Border effect */}
                        <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-himalayan-green/10 dark:border-himalayan-green/20 z-10"></div>

                        {/* Background image */}
                        <div
                            className="absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl bg-cover bg-center"
                            style={{ backgroundImage: "url('/static/images/hidden-trails-poster.jpg')" }}
                        ></div>

                        {/* Gradient overlay for readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-transparent rounded-2xl md:rounded-3xl"></div>

                        {/* Play indicator */}
                        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-himalayan-green/20 backdrop-blur-md p-2 sm:p-3 rounded-full shadow-lg transform transition-transform duration-500 hover:scale-110 cursor-pointer group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-himalayan-saffron transition-colors duration-300">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        </div>

                        {/* Premium badge */}
                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-himalayan-saffron/90 backdrop-blur-md px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-medium text-white shadow-lg">
                            Premium Experience
                        </div>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
