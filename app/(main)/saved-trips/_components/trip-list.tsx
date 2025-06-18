import Link from "next/link";
import { ItineraryCard } from "./trip-card";

const TripList = ({ trips }: any) => {
  return (
    <section className="mt-8">
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
            <Link href={`/trip-plan?id=${trip.id}`} key={trip.id}>
              <ItineraryCard
                tripName={trip.trip_name}
                date={trip.createdAt}
                image={trip.image}
                index={index}
              />
            </Link>
          )
        )}
      </div>
    </section>
  );
};

export default TripList;
