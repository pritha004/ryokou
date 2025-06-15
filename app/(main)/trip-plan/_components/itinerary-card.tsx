import { ItineraryDay } from "@/app/lib/model";
import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Map, House, Car } from "lucide-react";

type Prop = {
  date: string;
  itinerary: ItineraryDay;
};

const ItinenaryCard = ({ date, itinerary }: Prop) => {
  const { title, summary, attractions, transportation, accomodations } =
    itinerary;
  return (
    <AccordionItem value={date}>
      <AccordionTrigger className="cursor-pointer text-lg italic hover:no-underline font-medium">
        {date}: {title}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col font-lato text-gray-300 p-4 text-justify">
        <div>
          <div className="">
            <p className="text-base">{summary}</p>
          </div>
          <div className="mt-4 p-2 space-y-2">
            {accomodations && (
              <p className="flex gap-4 text-base">
                <span>
                  <House className="text-white" />
                </span>
                <span>{accomodations}</span>
              </p>
            )}
            {transportation && (
              <p className="flex gap-4 text-base">
                <span>
                  <Car className="text-white" />
                </span>
                <span>{transportation}</span>
              </p>
            )}
            {attractions && (
              <p className="flex gap-4 text-base">
                <span>
                  <Map className="text-white" />
                </span>
                <span>{attractions}</span>
              </p>
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ItinenaryCard;
