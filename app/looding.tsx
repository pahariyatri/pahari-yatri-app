import SectionContainer from "@/components/common/SectionContainer";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Loading Himalayan stories..." }: LoadingProps) {
  return (
    <SectionContainer>
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <svg
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary opacity-70"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
          </svg>
        </div>
        <p className="mt-4 text-sm text-muted-foreground animate-pulse">{message}</p>
      </div>
    </SectionContainer>
  )
}