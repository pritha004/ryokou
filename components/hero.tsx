"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { geoUrl, locations } from "@/constants/hero-locations";
import { useImagePreloader } from "@/hooks/use-imagepreloader";
import { Skeleton } from "./ui/skeleton";
import { Plane } from "lucide-react";

export default function HeroSection() {
  const [hoveredLocation, setHoveredLocation] = useState<
    (typeof locations)[0] | null
  >(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (src: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [src]: true,
    }));
  };

  return (
    <section
      className={`relative h-[calc(100vh-60px)] bg-background text-white overflow-hidden`}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <ComposableMap
          projectionConfig={{ scale: 160 }}
          width={980}
          height={500}
          style={{ width: "100%", height: "100%", opacity: 0.4 }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1f2937"
                  stroke="#374151"
                  style={{
                    default: { outline: "none", pointerEvents: "none" },
                    hover: { outline: "none", pointerEvents: "none" },
                    pressed: { outline: "none", pointerEvents: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {locations.map((location) => (
            <Marker
              key={location.name}
              coordinates={location.coords}
              onMouseEnter={() => setHoveredLocation(location)}
              onMouseLeave={() => setHoveredLocation(null)}
              className="cursor-pointer"
            >
              <motion.circle
                cx={0}
                cy={0}
                r={5}
                fill="#38bdf8"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                whileHover={{ scale: 1.8 }}
              />
            </Marker>
          ))}
        </ComposableMap>

        {hoveredLocation && (
          <motion.div
            className="absolute z-30 bg-white text-black flex flex-col items-center border-4 border-white"
            style={{
              top: mousePos.y + 30,
              left: mousePos.x - 120,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="relative h-[160px] w-[110px] md:h-[200px] md:w-[150px] overflow-hidden">
              {!loadedImages[hoveredLocation.image] && (
                <Skeleton className="absolute inset-0 h-full w-full" />
              )}
              <Image
                src={hoveredLocation.image}
                alt={hoveredLocation.name}
                fill
                className="object-cover"
                priority
                onLoad={() => handleImageLoad(hoveredLocation.image)}
              />
            </div>

            <div className="text-center font-handwritten text-xs md:text-sm my-1 md:my-2 px-2">
              {hoveredLocation.trip}
            </div>
          </motion.div>
        )}
      </div>

      <div className="relative flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
        <h1 className="text-[calc(1rem+6vw)] md:text-[calc(1rem+8vw)] font-bold z-0 font-playfair">
          RYOKOU
        </h1>

        <p className="text-md md:text-lg xl:text-xl text-gray-200 font-extralight mb-8 max-w-xl font-lato">
          Travel planning made effortless with intelligent curation.
        </p>

        <Link
          href={"/login"}
          className="flex gap-1 border hover:bg-white hover:text-black border-white px-4 py-2 rounded-md pointer-events-auto animate-bounce"
        >
          Let's Go <Plane />
        </Link>
      </div>
    </section>
  );
}
