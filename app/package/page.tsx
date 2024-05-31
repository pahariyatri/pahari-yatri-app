'use client'
import PackageCard from "@/components/cards/PackageCard";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

// Dummy data for package cards
const packageData = [
  {
    id: 1,
    title: "Adventure in the Alps",
    description: "Explore the breathtaking Alps with our guided adventure tour.",
    imageSrc: "/images/alps.jpg",
    href: "#",
    price: '1500',
    duration: '7',
    location: "Switzerland"
  },
  {
    id: 2,
    title: "Tropical Paradise Getaway",
    description: "Relax and unwind in a luxurious tropical paradise.",
    imageSrc: "/images/tropical.jpg",
    href: "#",
    price: '2000',
    duration: '10',
    location: "Maldives"
  },
  {
    id: 3,
    title: "Cultural Tour of Asia",
    description: "Immerse yourself in the rich cultural heritage of Asia.",
    imageSrc: "/images/asia.jpg",
    href: "#",
    price: '1800',
    duration: '14',
    location: "Various"
  },
  // Add more dummy data as needed
];

export default function Package() {
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100]);
  return (
    <>
      <div className="pb-8">
        <h1 className="text-3xl font-extrabold leading-9 text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-4">
          Explore Packages
        </h1>
        <p className="text-lg leading-7 text-gray-500 mb-8">
          Find your perfect adventure with our curated travel packages.
        </p>
      </div>
      <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row">

        {/* Filter section */}
        <div className="md:w-1/4 pr-4">
          <div className="pb-8">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            {/* Location filter */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Location</label>
              <input
                type="text"
                className="block w-full mt-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                placeholder="Search by location"
              />
            </div>

            {/* Price filter */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Price Range</label>
              <div className="flex items-center">
                <Slider defaultValue={[330]} max={5000} step={300} onValueChange={value => setSelectedPriceRange(value)} />
                <span className="ml-2">{`$${selectedPriceRange[0]} - $${selectedPriceRange[1]}`}</span>
              </div>
            </div>

            {/* Duration filter */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Duration (Days)</label>
              <input
                type="number"
                className="block w-full mt-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                placeholder="Enter duration"
              />
            </div>

            {/* Activities filter */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Activities</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Activities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Activities</SelectLabel> */}
                    <SelectItem value="Hiking">Hiking</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Sightseeing">Sightseeing</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <select
                className="block w-full mt-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
              >
                <option value="">Any</option>
                <option value="Hiking">Hiking</option>
                <option value="Sightseeing">Sightseeing</option>
                <option value="Adventure">Adventure</option>
              </select> */}
            </div>

            {/* Add more filter options if required */}
          </div>
        </div>

        {/* Package listing section */}
        <div className="md:w-3/4">
          {/* Package cards section */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Render Package cards */}
            {packageData.map((packageItem) => (
              <PackageCard
                key={packageItem.id}
                title={packageItem.title}
                description={packageItem.description}
                imageSrc={packageItem.imageSrc}
                href={packageItem.href}
                price={packageItem.price}
                duration={packageItem.duration}
                location={packageItem.location}
              />
            ))}
          </div>
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
