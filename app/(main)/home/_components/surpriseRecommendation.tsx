import Link from "next/link";
import { ItineraryCard } from "./trip-card";
import { generateRecommendationTrips } from "@/actions/trip";

const SurpriseRecommendationTrip = async () => {
  const { trips } = await generateRecommendationTrips("SURPRISE", 4);

  return (
    <section className="">
      <h1 className="text-[calc(1rem+2vw)] font-playfair">Surprise Me!</h1>
      <div className="mt-4 grid justify-around lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14">
        {trips?.map(
          (
            trip: {
              destination: string;
              trip_title: string;
              image: string;
            },
            index: number
          ) => (
            <Link href={`/`} key={index} className="flex flex-1">
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
    </section>
  );
};

export default SurpriseRecommendationTrip;
