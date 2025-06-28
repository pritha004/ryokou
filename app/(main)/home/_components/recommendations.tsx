"use client";

import HistoryRecommendationTrips from "../_components/historyRecommendations";
import AppRecommendationTrips from "../_components/appRecommendations";
import SurpriseRecommendationTrip from "../_components/surpriseRecommendation";
import Image from "next/image";
import { motion } from "framer-motion";
import Hero from "./hero";

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
      <div className="px-4">
        <div className="">
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
