"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/common/SectionContainer";
import Link from "@/components/common/Link";
import Image from "@/components/common/Image";

interface Book {
  title: string;
  description: string;
  coverImage: string;
  href: string;
  chapterCount?: number;
  completedChapters?: number;
}

interface BooksClientPageProps {
  books: Book[];
}

export default function BooksClientPage({ books }: BooksClientPageProps) {
  if (!books?.length) {
    return (
      <SectionContainer className="py-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          The Library Opens Soon
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
          Our journeys are being written. The first editions will open soon.
        </p>
      </SectionContainer>
    );
  }

  return (
    <>
      {/* Banner */}
      <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] overflow-hidden">
        <Image
          src="/static/images/library-banner.jpg"
          alt="Himalayan Library Banner"
          fill
          priority
          className="object-cover scale-105 transition-transform duration-[10000ms] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            The Yatra Library
          </motion.h1>
          <motion.p
            className="mt-3 text-base sm:text-lg text-gray-300 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Every edition is a book — each chapter, a journey through the
            Himalayas. Choose the one that calls you.
          </motion.p>
        </div>
      </div>

      {/* Library Grid */}
      <SectionContainer className="py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.map((book, index) => (
            <motion.div
              key={book.title || `${book.href}-${index}`} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-background border rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition"
            >
              {/* Book Cover */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={book.coverImage    }
                  alt={book.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-xl font-serif font-bold">{book.title}</h2>
                  <p className="text-sm opacity-80">
                    {book.chapterCount
                      ? `${book.chapterCount} Chapters`
                      : "New Edition"}
                  </p>
                </div>
              </div>

              {/* Book Description */}
              <div className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {book.description}
                </p>

                {/* Progress Bar (optional if you track chapter completion) */}
                {book.chapterCount && book.completedChapters !== undefined && (
                  <div>
                    <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>
                        {Math.round(
                          (book.completedChapters / book.chapterCount) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-primary transition-all duration-700"
                        style={{
                          width: `${(book.completedChapters / book.chapterCount) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <Link
                    href={book.href}
                    className="inline-flex items-center gap-2 bg-primary text-background font-semibold py-2.5 px-5 rounded-lg hover:bg-primary/90 transition"
                  >
                    Open Book
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
