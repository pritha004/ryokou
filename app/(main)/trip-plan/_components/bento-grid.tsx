"use client";

import { ItineraryDay, TripDetails } from "@/app/lib/model";
import { motion } from "framer-motion";
import ItineraryCard from "./itinerary-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ExpenseChart from "./expense-chart";
import {
  WalletCards,
  Phone,
  LayoutGrid,
  Banknote,
  Download,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { saveTrip } from "@/actions/trip";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BentoGrid = ({ tripDetails }: any) => {
  const tripData: TripDetails = tripDetails;

  const { id, itineraries, image, trip_name, is_trip_saved } = tripData;

  const router = useRouter();

  const {
    loading: saveTripLoading,
    fn: saveTripFn,
    data: saveTripResult,
  } = useFetch(saveTrip);

  const handleSaveTrip = async (id: string, isSaved: boolean) => {
    try {
      await saveTripFn(id, isSaved);
    } catch (error) {
      console.error("Save trip error:", error);
    }
  };

  useEffect(() => {
    if (saveTripResult?.success && !saveTripLoading) {
      if (saveTripResult.trip.is_trip_saved) {
        toast.success("Trip saved successfully!");
      }
      router.push(`/trip-plan?id=${saveTripResult.trip.id}`);
      router.refresh();
    }
  }, [saveTripResult, saveTripLoading]);

  return (
    <div className="w-full min-h-screen md:max-h-screen mb-12 md:mb-0">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: "easeInOut",
        }}
        className="relative flex flex-col justify-center items-center gap-4 w-full h-screen text-center"
      >
        <Image
          src={image}
          alt="Background"
          fill
          className="object-cover z-0"
          priority
        />
        <h1 className="z-20 font-bold px-2 flex items-center text-[calc(1rem+4vw)] text-white uppercase font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {trip_name}
        </h1>
        <div className="absolute top-4 right-4 z-20 bg-black p-4 rounded-full flex justify-center items-center">
          <Bookmark
            className={`cursor-pointer hover:fill-white ${
              is_trip_saved ? "fill-white" : ""
            }`}
            onClick={() => {
              handleSaveTrip(id, !is_trip_saved);
            }}
          />
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4 w-full h-full">
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
                defaultValue={Object.entries(itineraries.itineraries).map(
                  ([date, value]) => date
                )}
                className="w-full"
              >
                {itineraries &&
                  Object.entries(itineraries.itineraries).map(
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

              <div>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value={"budget"}>
                    <AccordionTrigger className="cursor-pointer text-lg italic hover:no-underline font-medium">
                      Budget Breakdown
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4  text-gray-300 p-4 text-justify">
                      <div>
                        <div className="font-lato">
                          <table className="min-w-full ">
                            <tbody>
                              {Object.entries(itineraries.budget_breakdown).map(
                                ([key, value]) => (
                                  <tr key={key} className="border-b">
                                    <td className="px-4 py-2 capitalize">
                                      {key}
                                    </td>
                                    <td className="px-4 py-2">{value}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div>
                        <span className="italic text-xs font-bold">
                          (All expenses are in your set currency.)
                        </span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
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
                  <h1 className="text-lg italic hover:no-underline font-medium">
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

          {/* <motion.div
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
          </motion.div> */}
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
