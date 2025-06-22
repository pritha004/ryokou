import Link from "next/link";
import { ItineraryCard } from "./trip-card";
import { Button } from "@/components/ui/button";

const TripList = ({ trips }: any) => {
  return (
    <section className="mt-8 mb-12 md:mb-0">
      {trips.length > 0 ? (
        <div className="grid justify-around lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14">
          {trips?.map(
            (
              trip: {
                id: string;
                createdAt: Date;
                trip_name: string;
                image: string;
              },
              index: number
            ) => (
              <Link
                href={`/trip-plan?id=${trip.id}`}
                key={trip.id}
                className="flex flex-1"
              >
                <ItineraryCard
                  tripName={trip.trip_name}
                  image={trip.image}
                  id={trip.id}
                  index={index}
                />
              </Link>
            )
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 h-[200px] justify-center items-center italic">
          <p>No trips in your Bucket List. </p>
          <Link
            href={"/search"}
            className="border border-white px-4 py-2 rounded-sm hover:bg-white hover:text-black cursor-pointer"
          >
            Let's add one!
          </Link>
        </div>
      )}
    </section>
  );
};

export default TripList;
