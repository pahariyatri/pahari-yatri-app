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
                                className="relative h-full"
                            >
                                <Link href={`/books/${book.slug}`} className="block h-full group/card">
                                    {/* 📖 The Book Card */}
                                    <div className="relative aspect-[2/3] rounded-r-2xl rounded-l-sm shadow-xl transition-all duration-500 transform group-hover/card:-translate-y-2 group-hover/card:shadow-2xl bg-card border-l-4 border-l-primary/20 overflow-hidden">

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

                                        {/* Spine Shadow Effect */}
                                        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/50 to-transparent z-10" />

                                        {/* Content Overlay */}
                                        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-20">
                                            <div className="transform transition-transform duration-500 group-hover/card:translate-y-0 translate-y-2">
                                                {book.year && (
                                                    <p className="text-himalayan-saffron text-sm font-medium mb-2 tracking-widest uppercase">
                                                        Edition {book.year}
                                                    </p>
                                                )}
                                                <h3 className="text-2xl sm:text-3xl font-brandSerif font-bold leading-tight mb-3 text-shadow-sm">
                                                    {book.title}
                                                </h3>
                                                <p className="text-white/80 text-sm line-clamp-3 font-light leading-relaxed opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100">
                                                    {book.invitation || book.excerpt}
                                                </p>

                                                <div className="mt-4 flex items-center text-sm font-medium text-white/90 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-200">
                                                    Open Book
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
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
                    className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={scrollPrev}
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={scrollNext}
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
