import PackageCard from "@/components/cards/PackageCard";
import SectionContainer from "@/components/common/SectionContainer";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";

// Setup the Keystatic reader
const reader = createReader(process.cwd(), keystaticConfig);

// Define how many items per page
const ITEMS_PER_PAGE = 6;

interface PackageProps {
  searchParams: {
    location?: string;
    duration?: string;
    price?: string;
    page?: string;
  };
}

// Server-side function to fetch paginated and filtered packages
export default async function Package({ searchParams }: PackageProps) {
  // Get the current page from the query parameters or default to 1
  const currentPage = parseInt(searchParams.page || '1', 10);

  // Get filters from query params
  const locationFilter = searchParams.location || "";
  const durationFilter = parseInt(searchParams.duration || "0", 10);
  const priceFilter = parseInt(searchParams.price || "0", 10);

  // Fetch all package data
  const packageData = await reader.collections.packages.all();

  // Map the fetched data to a usable format
  let packages = packageData.map(pkg => ({
    title: pkg.entry.title,
    description: pkg.entry.excerpt,
    imageSrc: pkg.entry.image,
    href: `/package/${pkg.slug}`,
    price: pkg.entry.price ?? 0,
    location: pkg.entry.location,
    duration: pkg.entry.duration,
  }));

  // Apply filters
  if (locationFilter) {
    packages = packages.filter(pkg => pkg.location.toLowerCase().includes(locationFilter.toLowerCase()));
  }
  if (durationFilter > 0) {
    packages = packages.filter(pkg => pkg.duration !== null && pkg.duration <= durationFilter);
  }

  if (priceFilter > 0) {
    packages = packages.filter(pkg => pkg.price <= priceFilter);
  }

  // Get unique options for the filters
  const uniqueLocations = [...new Set(packages.map(pkg => pkg.location))];
  const uniqueDurations = [...new Set(packages.map(pkg => pkg.duration))];
  const uniquePrices = [...new Set(packages.map(pkg => pkg.price))].sort((a, b) => a - b);

  // Calculate the total number of pages
  const totalPages = Math.ceil(packages.length / ITEMS_PER_PAGE);

  // Slice the packages for the current page
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

      {/* Filter Section */}
      <form method="GET" className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Location Filter */}
        <div className="flex-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <select
            name="location"
            id="location"
            defaultValue={locationFilter}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Location</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Duration Filter */}
        <div className="flex-1">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Max Duration (Days)</label>
          <select
            name="duration"
            id="duration"
            defaultValue={durationFilter || ""}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Duration</option>
            {uniqueDurations.map((duration) => (
              <option key={duration} value={duration || 0}>
                {duration} Days
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="flex-1">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Max Price</label>
          <select
            name="price"
            id="price"
            defaultValue={priceFilter || ""}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Price</option>
            {uniquePrices.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="self-end">
          <button
            type="submit"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Apply Filters
          </button>

        </div>
      </form>

      {/* Package Cards Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPackages.map((packageItem) => (
          <PackageCard
            key={packageItem.title}
            title={packageItem.title}
            description={packageItem.description}
            imageSrc={packageItem.imageSrc}
            href={packageItem.href}
            price={packageItem.price}
            location={packageItem.location}
            duration={packageItem.duration ?? 0}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination>
        <PaginationContent>
          {/* Previous Page */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`?page=${currentPage - 1}&location=${locationFilter}&duration=${durationFilter}&price=${priceFilter}`} />
            </PaginationItem>
          )}

          {/* Pagination Links */}
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink href={`?page=${index + 1}&location=${locationFilter}&duration=${durationFilter}&price=${priceFilter}`}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next Page */}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={`?page=${currentPage + 1}&location=${locationFilter}&duration=${durationFilter}&price=${priceFilter}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </SectionContainer >

  );
}
