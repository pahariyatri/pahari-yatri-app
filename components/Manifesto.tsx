"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "./common/Image";

export default function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.4, once: false });

  return (
    <section
      id="manifesto"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image / Video */}
      <div className="absolute inset-0">
        <Image
          src="/static/images/mountains-bg.jpg" // replace with video if needed
          alt="Mountains"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" > {/* dark overlay */}

        </div>

      </div>

      {/* Optional subtle mandala / outline */}
      {/* <div className="absolute inset-0 flex items-center justify-center ">
        <svg
            className="absolute inset-0 w-full h-full opacity-10"
            viewBox="0 0 500 500"
            fill="none"
          >
            <circle cx="250" cy="250" r="200" stroke="white" strokeWidth="2" />
          </svg>
      </div> */}

      {/* Manifesto text */}
      <div ref={ref} className="relative z-10 px-6 sm:px-12 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "font-brandSerif font-bold",
            "text-2xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl",
            "leading-snug text-white drop-shadow-lg"
          )}
        >
          We don’t just see the mountains. <br /> 
          We walk with them.<br/> We listen to them. <br /> 
          We surrender to them.
        </motion.h3>
      </div>
    </section>
  );
}
