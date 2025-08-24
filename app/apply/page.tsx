'use client';

import SectionContainer from "@/components/common/SectionContainer";
import TitleCover from "@/components/common/TitleCover";
import ApplicationForm from "@/components/application/ApplicationForm";
import { useEffect, useState } from "react";

export default function Apply() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    // <SectionContainer>
      <div className="max-w-3xl mx-auto mb-16 md:mb-20 px-4 sm:px-0">
        <ApplicationForm />
      </div>
    // </SectionContainer>
  );
}