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
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image / Video */}
      <div className="absolute inset-0 opacity-60">
        <Image
          src="/static/images/mountains-bg.jpg" // replace with video if needed
          alt="Mountains"
          fill
          className="object-cover animate-scale-up duration-[30s]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      </div>

      {/* Manifesto text */}
      <div ref={ref} className="relative z-10 px-6 sm:px-12 text-center max-w-5xl mx-auto">
        <div className="space-y-6 md:space-y-10">
          {[
            "We don’t just see the mountains.",
            "We walk with them.",
            "We listen to them.",
            "We surrender to them."
          ].map((text, index) => (
            <motion.h3
              key={index}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 1.2, delay: index * 0.4, ease: "easeOut" }}
              className={cn(
                "font-brandSerif font-bold",
                "text-3xl sm:text-4xl md:text-5xl lg:text-7xl",
                "leading-tight text-white drop-shadow-2xl",
                index === 3 ? "text-primary" : ""
              )}
            >
              {text}
            </motion.h3>
          ))}
        </div>
      </div>
    </section>
  );
}
