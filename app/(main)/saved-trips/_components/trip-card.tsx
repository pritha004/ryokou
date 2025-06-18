"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Delete, Share, Share2, SquareX, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ItineraryCardProps {
  tripName: string;
  date: Date;
  image: string;
  index: number;
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({
  tripName,
  date,
  image,
  index,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      className="flex flex-1 flex-col w-full rounded-md border max-sm:w-full shadow-lg bg-[#000000] border-black"
    >
      <div className="relative overflow-hidden rounded-t-md">
        <Image
          src={image}
          alt={`${tripName}_image`}
          height={200}
          width={200}
          className="h-[200px] w-full border rounded-t-md object-cover hover:scale-125 hover:transition-all hover:duration-200 hover:delay-75 ease-linear"
        />
      </div>

      <div className="flex justify-between mt-2 p-2">
        <h3 className="text-md text-center leading-normal font-semibold font-lato">
          {tripName}
        </h3>
        <div className="m-1 text-center font-montserrat leading-normal flex justify-center gap-2">
          <Button size={"sm"} className="cursor-pointer">
            <X />
          </Button>
          <Button size={"sm"} className="cursor-pointer">
            <Share2 />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
