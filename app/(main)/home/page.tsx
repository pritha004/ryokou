import { getRecommendedTrips } from "@/actions/trip";
import React from "react";
import HistoryRecommendationTrips from "./_components/historyRecommendations";
import AppRecommendationTrips from "./_components/appRecommendations";
import SurpriseRecommendationTrip from "./_components/surpriseRecommendation";
import { checkUser, getUserProfileCompleteStatus } from "@/actions/user";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await checkUser();

  const { isProfileComplete }: any = await getUserProfileCompleteStatus();

  if (!isProfileComplete) {
    redirect("/complete-profile");
  }

  const recommendations:
    | { success: boolean; tripRecommendation: any }
    | undefined = await getRecommendedTrips();

  return (
    <div className="w-full min-h-screen p-4 mb-12 md:mb-0">
      <div className="mt-4 p-4">
        <div className="mt-4">
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
    </div>
  );
};

export default Home;
