import Link from "next/link";
import ResponsiveImage from "../common/ResponsiveImage";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";

export interface AccommodationCardProps {
  name: string;
  description: string;
  imageSrc: string;
  href: string;
  location: string;
}

const AccommodationCard = ({
  name,
  description,
  imageSrc,
  href,
  location,
}: AccommodationCardProps) => {
  const isLong = description.length > 300;
  const shortDescription = isLong
    ? description.slice(0, 200).trimEnd() + "..."
    : description;

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
      <CardHeader className="relative">
        <ResponsiveImage
          src={imageSrc}
          alt={name}
          className="w-full h-48"
          aspectRatio="16:9"
          overlay={true}
          overlayOpacity={0.2}
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-start">
          <div className="flex items-center">
            <p className="text-sm font-semibold">{location}</p>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {name}
          </CardTitle>
          <CardDescription className="mt-2 text-gray-700 dark:text-gray-300">
            {shortDescription}{" "}
            {isLong && (
              <Link
                href={href}
                className="text-blue-600 hover:underline ml-1"
              >
                Read more
              </Link>
            )}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={href}
          className="block w-full mt-6 transition duration-300"
        >
          <Button className="font-bold py-3 px-6 rounded-lg w-full transition duration-300">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AccommodationCard;
