import { ItineraryCard } from "./trip-card";

const TripList = ({ trips }: any) => {
  return (
    <section className="">
      <div className="space-y-4">
        {trips?.map((trip, index) => (
          <ItineraryCard
            key={trip.destination}
            destination={trip.destination}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default TripList;
