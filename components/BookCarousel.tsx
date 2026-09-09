"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import Link from "./common/Link";
import Image from "./common/Image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Book {
    title: string;
    slug: string;
    coverImage: string;
    year?: number | null;
    invitation?: string | null;
    excerpt?: string | null;
}

interface BookCarouselProps {
    books: Book[];
}

export default function BookCarousel({ books }: BookCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "center",
        skipSnaps: false,
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative group">
            {/* Carousel Viewport */}
            <div className="overflow-hidden px-4 sm:px-0" ref={emblaRef}>
                <div className="flex touch-pan-y -ml-4 sm:-ml-8">
                    {books.map((book, index) => (
                        <div
                            key={book.slug}
                            className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4 sm:pl-8 py-10"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative h-full [perspective:1400px]"
                            >
                                <Link
                                    href={`/books/${book.slug}`}
                                    className="relative block h-full group/card [transform-style:preserve-3d]"
                                >
                                    {/* Soft contact shadow the "book" casts on the shelf below it —
                                        grows and softens on hover, like it's lifting off the surface */}
                                    <div className="absolute -bottom-3 left-3 right-6 h-6 bg-black/30 blur-lg rounded-full transition-all duration-500 group-hover/card:-bottom-5 group-hover/card:blur-xl group-hover/card:bg-black/40" />

                                    {/* 📖 The Book Card — a cover and a page block sitting side by
                                        side as one rigid unit, so it reads as a physical hardback
                                        with thickness rather than a photo with text laid over it */}
                                    <div className="relative aspect-[2/3] flex shadow-xl transition-all duration-500 transform-gpu [transform-origin:left_center] group-hover/card:[transform:translateY(-10px)_rotateY(-8deg)] group-hover/card:shadow-[8px_18px_40px_rgba(0,0,0,0.45)]">

                                        {/* Cover */}
                                        <div className="relative flex-1 rounded-l-[2px] bg-card overflow-hidden">
                                            {/* Cover Image */}
                                            <div className="absolute inset-0">
                                                <Image
                                                    src={book.coverImage}
                                                    alt={book.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                                            </div>

                                            {/* Cloth-bound spine: dark gradient plus a thin highlight
                                                crease where a real hardback catches the light */}
                                            <div className="absolute left-0 top-0 bottom-0 w-5 sm:w-6 bg-gradient-to-r from-black/60 via-black/25 to-transparent z-10" />
                                            <div className="absolute left-[3px] sm:left-1 top-0 bottom-0 w-px bg-white/20 z-10" />

                                            {/* Inner shadow where the cover meets the page block, so
                                                the pages read as recessed rather than pasted on */}
                                            <div className="absolute inset-0 shadow-[inset_-4px_0_6px_rgba(0,0,0,0.35)] z-10 pointer-events-none" />

                                            {/* Content Overlay */}
                                            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-20">
                                                <div className="transform transition-transform duration-500 group-hover/card:translate-y-0 translate-y-2">
                                                    {book.year && (
                                                        <p className="text-secondary text-sm font-medium mb-2 tracking-widest uppercase">
                                                            Edition {book.year}
                                                        </p>
                                                    )}
                                                    <h3 className="text-2xl sm:text-3xl font-brandSerif font-bold leading-tight mb-3 text-shadow-sm">
                                                        {book.title}
                                                    </h3>
                                                    <p className="text-white/85 text-sm line-clamp-2 sm:line-clamp-3 font-light leading-relaxed">
                                                        {book.invitation || book.excerpt}
                                                    </p>

                                                    <div className="mt-4 inline-flex items-center text-sm font-medium text-white group-hover/card:text-primary-foreground transition-colors">
                                                        Open Edition
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform duration-300 group-hover/card:translate-x-1">
                                                            <path d="M5 12h14"></path>
                                                            <path d="m12 5 7 7-7 7"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Page block — the paper edge of a closed book, viewed
                                            from the side. Thin horizontal bands in a paper tone. */}
                                        <div
                                            className="relative w-[7px] sm:w-2 rounded-r-[3px] shadow-[inset_2px_0_3px_rgba(0,0,0,0.3),inset_-1px_0_1px_rgba(255,255,255,0.5)]"
                                            style={{
                                                backgroundImage:
                                                    "repeating-linear-gradient(to bottom, #efe7d6 0px, #efe7d6 2px, #d8cdb4 2px, #d8cdb4 3px)",
                                            }}
                                        />
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="hidden sm:flex justify-center gap-4 mt-8">
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Previous book"
                    className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={scrollPrev}
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Next book"
                    className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={scrollNext}
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
