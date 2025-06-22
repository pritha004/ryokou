import { generateRecommendationTrips } from "@/actions/trip";
import React from "react";
import HistoryRecommendationTrips from "./_components/historyRecommendations";
import AppRecommendationTrips from "./_components/appRecommendations";
import SurpriseRecommendationTrip from "./_components/surpriseRecommendation";

const Home = () => {
  return (
    <div className="w-full min-h-screen p-4 mb-12 md:mb-0">
      <div className="mt-4 p-4">
        <div className="mt-4">
          <HistoryRecommendationTrips />
        </div>
        <div className="mt-8">
          <AppRecommendationTrips />
        </div>
        <div className="mt-8">
          <SurpriseRecommendationTrip />
        </div>
      </div>
    </div>
  );
};

export default Home;
