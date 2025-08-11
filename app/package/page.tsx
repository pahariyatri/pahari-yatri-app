import PackageCard from "@/components/cards/PackageCard";
import SectionContainer from "@/components/common/SectionContainer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";

const reader = createReader(process.cwd(), keystaticConfig);
const ITEMS_PER_PAGE = 6;

interface PackageProps {
  searchParams: {
    page?: string;
  };
}

export default async function Package({ searchParams }: PackageProps) {
  try {
    const currentPage = parseInt(searchParams.page || "1", 10);

    // Fetch all package data with proper error handling
    const packageData = await reader.collections.packages.all();
    
    // Debug logging for production troubleshooting
    console.log("Package data fetched:", {
      count: packageData?.length || 0,
      hasData: !!packageData,
      firstPackage: packageData?.[0]?.entry || null
    });
    
    if (!packageData || packageData.length === 0) {
      return (
        <SectionContainer>
          <div className="pb-8">
            <h1 className="text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-4">
              Explore Packages
            </h1>
            <p className="text-lg leading-7 mb-8">
              No packages available at the moment. Please check back later.
            </p>
          </div>
        </SectionContainer>
      );
    }

    // Map the fetched data to a usable format with proper field access
    const packages = packageData.map((pkg) => ({
      title: pkg.entry.title || "Untitled Package",
      description: pkg.entry.excerpt || "No description available",
      imageSrc: pkg.entry.image || "/static/images/logo.png",
      href: `/package/${pkg.slug}`,
      price: pkg.entry.price || 0,
      location: pkg.entry.location || "Location not specified",
      duration: pkg.entry.duration || 0,
    }));

    // Pagination
    const totalPages = Math.ceil(packages.length / ITEMS_PER_PAGE);
    const paginatedPackages = packages.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return (
      <SectionContainer>
        <div className="pb-8">
          <h1 className="text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-4">
            Explore Packages
          </h1>
          <p className="text-lg leading-7 mb-8">
            Find your perfect adventure with our curated travel packages.
          </p>
        </div>

        {/* Package Cards Section */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-4">
          {paginatedPackages.map((packageItem, index) => (
            <PackageCard
              key={`${packageItem.title}-${index}`}
              title={packageItem.title}
              description={packageItem.description}
              imageSrc={packageItem.imageSrc}
              href={packageItem.href}
              price={packageItem.price}
              location={packageItem.location}
              duration={packageItem.duration}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`?page=${currentPage - 1}`} />
                </PaginationItem>
              )}

              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink 
                    href={`?page=${index + 1}`}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext href={`?page=${currentPage + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </SectionContainer>
    );
  } catch (error) {
    console.error("Error loading packages:", error);
    return (
      <SectionContainer>
        <div className="pb-8">
          <h1 className="text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-4">
            Explore Packages
          </h1>
          <p className="text-lg leading-7 mb-8">
            Unable to load packages at the moment. Please try again later.
          </p>
        </div>
      </SectionContainer>
    );
  }
}

// Generate static params for better performance and SEO
export async function generateStaticParams() {
  try {
    const reader = createReader(process.cwd(), keystaticConfig);
    const packages = await reader.collections.packages.all();
    
    // Return empty array to ensure the page is generated
    return [];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
