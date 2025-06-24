"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { useRouter } from "next/navigation";

interface ItineraryCardProps {
  tripName: string;
  image: string;
  index: number;
  destination: string;
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({
  tripName,
  image,
  index,
  destination,
}) => {
  const router = useRouter();

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
      className="flex flex-1 flex-col w-full rounded-md border max-sm:w-full shadow-lg bg-[#000000] border-black"
    >
      <div className="relative overflow-hidden rounded-t-md">
        {!isLoaded && (
          <Skeleton className="absolute top-0 left-0 z-10 h-[200px] w-full" />
        )}
        <Image
          src={image}
          alt={`${tripName}_image`}
          height={200}
          width={200}
          className={`h-[200px] w-full border rounded-t-md object-cover hover:scale-125 hover:transition-all hover:duration-200 hover:delay-75 ease-linear ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsLoaded(true);
          }}
        />
      </div>

      <div className="flex justify-between items-center mt-2 p-2 gap-2">
        <h3 className="text-md text-center leading-normal font-semibold font-lato">
          {tripName}
        </h3>
      </div>
    </motion.div>
  );
};
