"use client";

import { ItineraryDay, TripDetails } from "@/app/lib/model";
import { motion } from "framer-motion";
import ItineraryCard from "./itinerary-card";
import { Accordion } from "@/components/ui/accordion";
import ExpenseChart from "./expense-chart";
import {
  WalletCards,
  Phone,
  LayoutGrid,
  Banknote,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const BentoGrid = ({ tripDetails }: any) => {
  const tripData: TripDetails = tripDetails;

  const { itineraries } = tripData;

  return (
    <div className="w-full min-h-screen md:max-h-screen p-4 mb-12 md:mb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
        {/* Itinerary */}
        <motion.div
          className="rounded-lg border-[1px] border-gray-400 w-full h-full min-h-[300px] flex md:overflow-y-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full p-4">
            <h1 className="text-3xl lg:text-4xl text-center font-playfair font-bold uppercase">
              Itinerary
            </h1>

            <div className="w-full mt-4 space-y-4">
              <Accordion
                type="multiple"
                defaultValue={Object.entries(itineraries.itinenaries).map(
                  ([date, value]) => date
                )}
                className="w-full"
              >
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

        <div className="flex flex-col gap-4 w-full">
          {/* Expenses */}
          <motion.div
            className="rounded-lg border border-gray-400 w-full flex items-center justify-center p-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0, duration: 0.5 }}
          >
            <div className="w-full">
              <ExpenseChart budget={itineraries.budget_breakdown} />
              <h1 className="text-base text-center font-lato uppercase mb-2">
                Expenses
              </h1>
            </div>
          </motion.div>

          {/* Basic Info  */}
          {itineraries.basic_info &&
            Object.keys(itineraries.basic_info).length > 0 && (
              <motion.div
                className="rounded-lg border border-gray-400 w-full flex items-center justify-center p-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0, duration: 0.5 }}
              >
                <div className="w-full">
                  <h1 className="text-base text-center font-lato uppercase">
                    Need-to-Know Basics
                  </h1>
                  <div className="p-2 h-full w-full space-y-4 font-lato text-gray-300">
                    {itineraries.basic_info?.currency && (
                      <p>
                        <span className="flex items-center gap-2">
                          <span>
                            <Banknote className="text-white" />
                          </span>
                          <span className="italic">Currency</span>
                        </span>
                        <span className="ml-[32px] block">
                          {itineraries.basic_info?.currency}
                        </span>
                      </p>
                    )}
                    {itineraries.basic_info?.sim_card_details && (
                      <p>
                        <span className="flex items-center gap-2">
                          <span>
                            <WalletCards className="text-white" />
                          </span>
                          <span className="italic">SIM Card Details</span>
                        </span>
                        <span className="ml-[32px] block">
                          {itineraries.basic_info?.sim_card_details}
                        </span>
                      </p>
                    )}
                    {itineraries.basic_info?.useful_apps && (
                      <p>
                        <span className="flex items-center gap-2">
                          <span>
                            <LayoutGrid className="text-white" />
                          </span>
                          <span className="italic">Useful Apps</span>
                        </span>
                        <span className="ml-[32px] block">
                          {itineraries.basic_info?.useful_apps}
                        </span>
                      </p>
                    )}
                    {itineraries.basic_info?.emergency_contacts && (
                      <p>
                        <span className="flex items-center gap-2">
                          <span>
                            <Phone className="text-white" />
                          </span>
                          <span className="italic">Emergency Contacts</span>
                        </span>
                        <span className="ml-[32px] block">
                          {itineraries.basic_info?.emergency_contacts}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

          <motion.div
            className="rounded-lg border border-gray-400 w-full flex items-center justify-center p-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0, duration: 0.5 }}
          >
            <div className="w-full flex justify-end">
              <Button variant="outline" size="sm" className="cursor-pointer ">
                <Download /> Download Itinerary
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
