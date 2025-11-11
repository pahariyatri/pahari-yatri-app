import SectionContainer from "./common/SectionContainer";
import { Button } from "@/components/ui/button";
import Link from "./common/Link";
import Image from "./common/Image";
import { getAllBooks } from "@/lib/keystatic/books";

export default async function BookCardLayout() {
  const books = await getAllBooks();

  return (
    <SectionContainer className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-brandSerif font-bold text-foreground mb-3">
          The Book of Journeys
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          Each edition is a season of the soul — a curated yatra through the
          Himalayas told in chapters, legends, and silence.
        </p>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {books.map((book) => (
          <div
            key={book?.title}
            className="group relative overflow-hidden rounded-2xl shadow-lg bg-card hover:shadow-xl transition-all duration-500"
          >
            {/* Cover Image */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={book.coverImage}
                alt={book.title}
                width={600}
                height={400}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold font-brandSerif">
                {book.title}
                {book.year && (
                  <span className="block text-primary/90 text-base font-normal">
                    {book.year}
                  </span>
                )}
              </h3>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col justify-between h-[280px]">
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-5">
                {book.invitation}
              </p>

              <p className="text-muted-foreground text-xs md:text-sm mt-3 line-clamp-3 italic">
                {book.excerpt}
              </p>

              <div className="mt-5">
                <Link href={`/books/${book.slug}`}>
                  <Button
                    variant="outline"
                    className="group border-primary text-primary hover:bg-primary/10 text-sm"
                  >
                    Explore Edition
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
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mountain Silhouette */}
            <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden opacity-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                className="absolute bottom-0 w-full"
              >
                <path
                  fill="currentColor"
                  className="text-himalayan-green"
                  d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
