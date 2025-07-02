"use client";

import HistoryRecommendationTrips from "../_components/historyRecommendations";
import AppRecommendationTrips from "../_components/appRecommendations";
import SurpriseRecommendationTrip from "../_components/surpriseRecommendation";
import Hero from "./hero";
import { Info } from "lucide-react";

const Recommendations = ({
  username,
  recommendations,
}: {
  username: string | null | undefined;
  recommendations: { success: boolean; tripRecommendation: any } | undefined;
}) => {
  return (
    <>
      <Hero
        username={username?.split(" ")[0]}
        image={recommendations?.tripRecommendation?.heroImage}
      />
      <div className="px-4 my-8">
        <p className="flex items-center gap-2 italic text-sm text-orange-100">
          <Info size={16} />
          Last updated:{" "}
          {new Date(
            recommendations?.tripRecommendation?.lastUpdated
          ).toLocaleDateString()}
        </p>
      </div>
      <div className="px-4">
        <div className="mt-8">
          <HistoryRecommendationTrips
            recommendations={
              recommendations?.tripRecommendation?.historyRecommendation
            }
          />
        </div>
        <div className="mt-8">
          <AppRecommendationTrips
            recommendations={
              recommendations?.tripRecommendation?.appRecommendation
            }
          />
        </div>
        <div className="mt-8">
          <SurpriseRecommendationTrip
            recommendations={
              recommendations?.tripRecommendation.surpriseRecommendation
            }
          />
        </div>
      </div>
    </>
  );
};

export default Recommendations;
