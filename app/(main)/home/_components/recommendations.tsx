"use client";

import HistoryRecommendationTrips from "../_components/historyRecommendations";
import AppRecommendationTrips from "../_components/appRecommendations";
import SurpriseRecommendationTrip from "../_components/surpriseRecommendation";
import Image from "next/image";
import { motion } from "framer-motion";

const Recommendations = ({
  username,
  recommendations,
}: {
  username: string | null | undefined;
  recommendations: { success: boolean; tripRecommendation: any } | undefined;
}) => {
  return (
    <>
      <div className="relative w-full h-[60vh] flex items-center justify-center text-white">
        <Image
          src={recommendations?.tripRecommendation?.heroImage}
          alt="Background"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5, ease: "easeOut" }}
            className="text-[calc(1rem+4vw)] font-playfair font-bold drop-shadow-[0_4px_4px_rgba(1,1,1,1)]"
          >
            Welcome {username?.split(" ")[0]}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.5, ease: "easeOut" }}
            className="text-[calc(1rem+1vw)] mt-2 italic font-mono drop-shadow-[0_4px_4px_rgba(1,1,1,1)]"
          >
            Your next adventure awaits...
          </motion.p>
        </div>
      </div>
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
