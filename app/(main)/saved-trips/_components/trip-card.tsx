"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Delete } from "lucide-react";
import Image from "next/image";

interface ItineraryCardProps {
  destination: string;
  index: number;
}

const barcodelinesH = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  height: "h-10",
  width: Math.random() > 0.7 ? "w-1.5" : "w-0.5",
}));

const barcodelinesV = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  height: Math.random() > 0.7 ? "h-10" : "h-6",
  width: "w-10",
}));

export const ItineraryCard: React.FC<ItineraryCardProps> = ({
  destination,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      className="w-[600px] lg:w-[800px] mx-auto rounded-sm shadow-xl flex overflow-hidden font-sans h-[200px] lg:h-[240px]"
    >
      <div className="bg-gray-50 w-1/6 flex justify-center items-center p-4">
        <div className="flex flex-col justify-center items-center space-y-[2px] h-full">
          {barcodelinesV.map(({ id, height, width }) => (
            <div key={id} className={`bg-black ${height} ${width}`} />
          ))}
        </div>
      </div>

      <div className="bg-gray-50 text-black w-3/6 p-4 flex flex-col">
        <div className="mb-6">
          <p className="text-2xl font-semibold font-mono mb-4 leading-3 tracking-tighter">
            BOARDING PASS
          </p>
        </div>
        <div className="flex justify-between mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">PASSENGER</p>
            <p className="text-sm">Test</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">DATE</p>
            <p className="text-sm">--</p>
          </div>
        </div>
        <div className="flex justify-between items-center uppercase ">
          <p className="text-[calc(1rem+0.4vw)] md:text-[calc(1rem+0.6vw)] font-bold">
            HOME
          </p>
          <Image
            src={"/images/plane.png"}
            alt="Airplane"
            width={60}
            height={60}
          />
          <p className="text-[calc(1rem+0.4vw)] md:text-[calc(1rem+0.6vw)] font-bold max-w-[100px] break-words">
            {destination}
          </p>
        </div>
      </div>

      <div className="relative w-2/6 bg-gray-50 flex flex-col justify-between items-center px-6 border-l-2 border-black border-dashed py-4 ">
        <div className="flex flex-col gap-2 text-xs text-black mt-4 w-full">
          <p className="text-sm">PASSENGER</p>
          <p className="text-sm">Test</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-center text-gray-600 mt-4 w-full">
          <p>Already boarded?</p>
          <Delete className="cursor-pointer hover:text-red-500" />
        </div>
        <div className="flex items-center gap-2 text-xs text-center mt-4 w-full">
          <div className="flex justify-center space-x-[1px]">
            {barcodelinesH.map(({ id, height, width }) => (
              <div key={id} className={`bg-black ${height} ${width}`} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
