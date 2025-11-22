import SectionContainer from "./common/SectionContainer";
import { getAllBooks } from "@/lib/keystatic/books";
import BookCarousel from "./BookCarousel";

export default async function BookCardLayout() {
  const books = await getAllBooks();
  const validBooks = books.filter((book): book is NonNullable<typeof book> => Boolean(book));

  return (
    <SectionContainer className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Texture/Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4 block animate-fade-in">
          Library of Experiences
        </span>
        <h2 className="text-4xl md:text-6xl font-brandSerif font-bold text-foreground mb-6 animate-fade-in-up">
          The Book of Journeys
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up [animation-delay:200ms]">
          Each edition is a season of the soul — a curated yatra through the
          Himalayas told in chapters, legends, and silence.
        </p>
      </div>

      {/* Book Carousel */}
      <div className="max-w-[1400px] mx-auto">
        <BookCarousel books={validBooks} />
      </div>
    </SectionContainer>
  );
}
