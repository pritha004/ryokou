"use client";

import { deleteTrip } from "@/actions/trip";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/use-fetch";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ItineraryCardProps {
  tripName: string;
  image: string;
  id: string;
  index: number;
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({
  tripName,
  image,
  id,
  index,
}) => {
  const router = useRouter();

  const [isLoaded, setIsLoaded] = useState(false);

  const {
    loading: deleteLoading,
    fn: deleteTripFn,
    data: deleteResult,
  } = useFetch(deleteTrip);

  useEffect(() => {
    if (deleteResult?.success && !deleteLoading) {
      toast.success("Trip deleted successfully!");
      router.refresh();
    }
  }, [deleteResult, deleteLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
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
        <div className="m-1 text-center font-montserrat leading-normal flex justify-center items-center gap-2">
          {/* <Button size={"sm"} className="cursor-pointer">
            <Share2 />
          </Button> */}
        </div>
      </div>
    </motion.div>
  );
};
