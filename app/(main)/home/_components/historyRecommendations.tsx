import Link from "next/link";
import { ItineraryCard } from "./trip-card";
import { TripRecommendations } from "@/app/lib/model";

type Props = {
  recommendations: TripRecommendations[];
};

const HistoryRecommendationTrips = async ({ recommendations }: Props) => {
  return (
    <section className="">
      {recommendations?.length > 0 ? (
        <>
          <h1 className="text-[calc(1rem+2vw)] font-playfair">
            Recommendations based on your History
          </h1>
          <div className="mt-4 grid justify-around lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14">
            {recommendations?.map(
              (
                trip: {
                  destination: string;
                  trip_title: string;
                  image: string;
                },
                index: number
              ) => (
                <Link
                  href={`/search?destination=${trip.destination}`}
                  key={index}
                  className="flex flex-1"
                >
                  <ItineraryCard
                    tripName={trip.trip_title}
                    image={trip.image}
                    index={index}
                    destination={trip.destination}
                  />
                </Link>
              )
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default HistoryRecommendationTrips;
