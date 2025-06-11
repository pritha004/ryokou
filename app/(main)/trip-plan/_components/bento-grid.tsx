"use client";

import { ItineraryDay, TripDetails } from "@/app/lib/model";
import { motion } from "framer-motion";
import ItineraryCard from "./itinerary-card";
import { Accordion } from "@/components/ui/accordion";

const BentoGrid = ({ tripDetails }: any) => {
  const tripData: TripDetails = tripDetails;

  const { itineraries } = tripData;

  return (
    <div className="w-full min-h-screen p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
        {/* Itinerary */}
        <motion.div
          className="rounded-lg border-[1px] border-gray-400 w-full h-full min-h-[300px] flex"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full p-4">
            <h1 className="text-3xl lg:text-4xl text-center font-playfair font-bold">
              Itinerary
            </h1>

            <div className="w-full mt-4 space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {itineraries &&
                  Object.entries(itineraries.itinenaries).map(
                    ([date, details]: [string, ItineraryDay]) => (
                      <ItineraryCard
                        key={date}
                        date={date}
                        itinerary={details}
                      />
                    )
                  )}
              </Accordion>
            </div>
          </div>
        </motion.div>

        {/* Right Column with 3 vertical boxes */}
        <div className="grid grid-rows-4 gap-4 w-full h-full min-h-[300px]">
          <motion.div
            className="bg-green-500 rounded-lg w-full flex-1 flex items-center justify-center text-white text-lg font-semibold"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * 0, duration: 0.5 }}
          >
            Expense Pie Chart
          </motion.div>
          <motion.div
            className="bg-green-500 rounded-lg w-full flex-1 flex items-center justify-center text-white text-lg font-semibold"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * 1, duration: 0.5 }}
          >
            Basic Info
          </motion.div>
          <motion.div
            className="bg-green-500 rounded-lg w-full flex-1 flex items-center justify-center text-white text-lg font-semibold"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * 2, duration: 0.5 }}
          >
            Weather
          </motion.div>
          <motion.div
            className="bg-green-500 rounded-lg w-full flex-1 flex items-center justify-center text-white text-lg font-semibold"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * 2, duration: 0.5 }}
          >
            Visa Info
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
