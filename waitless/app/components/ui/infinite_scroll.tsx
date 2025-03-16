"use client";

import React from "react";
import { InfiniteMovingImages } from "@/app/components/InfiniteMovingCard";

export function MovingCards() {
  return (
    <div className="py-4 h-[10rem] flex flex-col antialiased bg-white dark:bg-white dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingImages
        items={logos}
        direction="left"
        speed="slow"
      />
    </div>
  );
}

// Updated list of items to contain image sources and alt text
const logos = [
  { src: "/logos/adidas-logo.svg", alt: "Logo 1" },
  { src: "/logos/Champion_logo.png", alt: "Logo 2" },
  { src: "/logos/coca-cola-logo.svg", alt: "Logo 3" },
  { src: "/logos/ESPN-Logo.svg", alt: "Logo 4" },
  { src: "/logos/jordan-logo.svg", alt: "Logo 5" },
  { src: "/logos/Logo-Carlsberg.svg", alt: "Logo 6" },
  { src: "/logos/Logo-Heineken.svg", alt: "Logo 7" },
  { src: "/logos/Premier_league_logo.svg", alt: "Logo 8" },
  { src: "/logos/UEFA_Champions_League_logo.png", alt: "Logo 9" },
];