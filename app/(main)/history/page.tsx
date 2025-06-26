import { getTrips } from "@/actions/trip";
import React from "react";
import TripList from "./_components/trip-list";

const SavedTrips = async () => {
  const allTrips = await getTrips();

  return (
    <div className="w-full min-h-screen p-4">
      <div className="mt-4 p-4">
        <h1 className="text-[calc(1rem+2vw)] font-playfair">History</h1>
        <TripList trips={allTrips.trips} />
      </div>
    </div>
  );
};

export default SavedTrips;
