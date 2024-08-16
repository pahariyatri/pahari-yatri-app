// 'use client'
import PackageCard from "@/components/cards/PackageCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Package() {
  const packageData = await reader.collections.packages.all();
  const packages = packageData.map(pkg => ({
    title: pkg.entry.title,
    description: pkg.entry.excerpt,
    imageSrc: pkg.entry.image,
    href: `/package/${pkg.slug}`,
    price: pkg.entry.price ?? 0,
    location: pkg.entry.location,
  }));

  // const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100]);
  return (
    <>
      <div className="pb-8">
        <h1 className="text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-4">
          Explore Packages
        </h1>
        <p className="text-lg leading-7 mb-8">
          Find your perfect adventure with our curated travel packages.
        </p>
      </div>
      <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row">

        {/* Filter section */}
        {/* <div className="md:w-1/4 pr-4">
          <div className="pb-8">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="mb-4">
              <Label htmlFor="picture">Location</Label>
              <Input type="text" placeholder="Search by location" />
            </div>


            <div className="mb-4">
              <Label htmlFor="picture">Duration (Days)</Label>
              <Input type="number" placeholder="Enter duration" />
            </div>

            <div className="mb-4">
              <Label htmlFor="picture">Activities</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Activities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Hiking">Hiking</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Sightseeing">Sightseeing</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div> */}

        {/* Package listing section */}
        {/* <div className="md:w-3/4"> */}
          {/* Package cards section */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Render Package cards */}
            {packages.map((packageItem) => (
              <PackageCard
                key={packageItem.title}
                title={packageItem.title}
                description={packageItem.description}
                imageSrc={packageItem.imageSrc}
                href={''}
                price={packageItem.price || 0}
                location={packageItem.location}
              />
            ))}
          </div>
        </div>
      {/* </div> */}
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
